import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Product } from '../data/products';

const SITE_NAME = 'Aloha & Co';
const SITE_URL = 'https://alohaandco.com';
const DEFAULT_IMAGE = '/hero.png';
const DEFAULT_DESCRIPTION =
  'Factory-direct resort wear manufacturer for aloha shirts, resort dresses, swimwear, matching sets, and private label development with low MOQ.';
const DEFAULT_KEYWORDS = [
  'resort wear manufacturer',
  'aloha shirt manufacturer',
  'custom resort wear',
  'private label swimwear',
  'low MOQ clothing manufacturer',
  'Shaoxing apparel factory',
];
const categoryLabels: Record<string, string> = {
  'aloha-shirts': 'Aloha Shirts',
  'tshirts-tops': 'T-Shirts & Tops',
  'resort-dresses': 'Resort Dresses',
  'swimwear': 'Swimwear',
  'matching-sets': 'Matching Sets',
  'accessories': 'Accessories',
};

type SeoPayload = {
  description: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  keywords?: string[];
  title: string;
  type?: 'article' | 'product' | 'website';
};

function toAbsoluteUrl(pathOrUrl?: string) {
  if (!pathOrUrl) return `${SITE_URL}${DEFAULT_IMAGE}`;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  return new URL(pathOrUrl, SITE_URL).href;
}

function upsertMeta(
  selector: { attr: 'name' | 'property'; key: string },
  content: string,
) {
  let meta = document.head.querySelector(
    `meta[${selector.attr}="${selector.key}"]`,
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(selector.attr, selector.key);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

function upsertJsonLd(data?: Record<string, unknown> | Record<string, unknown>[]) {
  const scriptId = 'route-seo-jsonld';
  const existing = document.getElementById(scriptId);

  if (!data) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement('script');
  script.id = scriptId;
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(data);

  if (!existing) {
    document.head.appendChild(script);
  }
}

function buildDefaultPayload(): SeoPayload {
  return {
    title: `${SITE_NAME} | Resort Wear Manufacturer for Low MOQ Private Label Production`,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    keywords: DEFAULT_KEYWORDS,
    type: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: toAbsoluteUrl('/logo.png'),
        email: 'korey@alohaandco.com',
        telephone: '+1-647-514-0926',
        areaServed: ['United States', 'Canada', 'Hawaii'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: DEFAULT_DESCRIPTION,
      },
    ],
  };
}

function buildProductPayload(product: Product & { category: string }): SeoPayload {
  const numericPrice = product.price?.match(/\d+(?:\.\d+)?/)?.[0];
  const description = `${product.name} in ${product.fabric}. ${product.moq}${product.sizeRange ? `, ${product.sizeRange}` : ''}. Custom print, labeling, and bulk production available.`;

  return {
    title: `${product.name} | ${SITE_NAME}`,
    description,
    image: product.hoverImage || product.image,
    keywords: [
      product.name,
      categoryLabels[product.category] || product.category,
      product.fabric,
      'custom resort wear manufacturer',
      'private label apparel',
    ],
    type: 'product',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.id,
      description,
      image: [toAbsoluteUrl(product.hoverImage || product.image)],
      brand: {
        '@type': 'Brand',
        name: SITE_NAME,
      },
      category: categoryLabels[product.category] || product.category,
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Fabric', value: product.fabric },
        { '@type': 'PropertyValue', name: 'MOQ', value: product.moq },
        ...(product.sizeRange
          ? [{ '@type': 'PropertyValue', name: 'Size Range', value: product.sizeRange }]
          : []),
      ],
      ...(numericPrice
        ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: numericPrice,
            },
          }
        : {}),
    },
  };
}

function buildNewsArticlePayload(article: {
  title: string;
  summary: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  slug: string;
  topics: string[];
}): SeoPayload {
  const description = article.summary || article.excerpt;

  return {
    title: `${article.title} | ${SITE_NAME}`,
    description,
    image: article.image,
    keywords: [...article.topics, 'resort wear news', 'resort market insights'],
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description,
      image: [toAbsoluteUrl(article.image)],
      datePublished: article.date,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: toAbsoluteUrl('/logo.png'),
        },
      },
      mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
    },
  };
}

async function buildRoutePayload(pathname: string, search: string): Promise<SeoPayload> {
  if (pathname === '/') {
    return buildDefaultPayload();
  }

  if (pathname === '/catalog') {
    return {
      title: `Resort Wear Catalog PDF | ${SITE_NAME}`,
      description:
        'Browse the Aloha & Co resort wear catalog with 64+ base styles across aloha shirts, resort dresses, swimwear, matching sets, tops, and accessories.',
      image: '/site-images/optimized/catalog-hero.jpg',
      keywords: [
        'resort wear catalog pdf',
        'aloha shirt catalog',
        'swimwear catalog',
        'resort dress catalog',
        'private label catalog',
      ],
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Aloha & Co Resort Wear Catalog',
        url: `${SITE_URL}/catalog`,
        description:
          '39-page resort wear catalog covering low MOQ base styles, custom development, and private label production.',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    };
  }

  if (pathname === '/shop') {
    const category = new URLSearchParams(search).get('category');
    const categoryLabel = category ? categoryLabels[category] : null;

    return {
      title: categoryLabel
        ? `${categoryLabel} Base Styles | ${SITE_NAME}`
        : `Resort Wear Base Styles | ${SITE_NAME}`,
      description: categoryLabel
        ? `Browse ${categoryLabel.toLowerCase()} base styles ready for custom prints, labels, packaging, and low MOQ resort wear production.`
        : 'Browse resort wear base styles ready for custom print, private label, and low MOQ sampling across 6 product categories.',
      image: '/shop_hero.png',
      keywords: [
        'resort wear base styles',
        'low MOQ resort styles',
        categoryLabel || 'ready development apparel',
        'factory-ready clothing styles',
      ],
      type: 'website',
    };
  }

  if (pathname === '/products') {
    return {
      title: `Resort Wear Product Lines | ${SITE_NAME}`,
      description:
        'Explore Aloha shirts, resort dresses, swimwear, matching sets, tops, and accessories built for low MOQ private label production.',
      image: '/products_hero.png',
      keywords: [
        'resort wear product lines',
        'aloha shirts wholesale',
        'resort dresses manufacturer',
        'swimwear manufacturer',
      ],
      type: 'website',
    };
  }

  if (pathname === '/starter-kits') {
    return {
      title: `Starter Kits for Resort Wear Brands | ${SITE_NAME}`,
      description:
        'Request a resort wear starter kit with fabric swatches, catalog access, sample planning support, and in-house custom print guidance for your first collection.',
      image: '/starter_kit_hero.png',
      keywords: [
        'resort wear starter kit',
        'fabric swatches',
        'custom print development',
        'apparel sampling starter pack',
      ],
      type: 'website',
    };
  }

  if (pathname === '/contact') {
    return {
      title: `Contact Resort Wear Factory Team | ${SITE_NAME}`,
      description:
        'Talk with Aloha & Co about custom resort wear production, sampling, MOQ, artwork, and FOB or DDP shipping.',
      image: '/contact_hero.png',
      keywords: [
        'contact clothing manufacturer',
        'resort wear factory contact',
        'private label production quote',
      ],
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `${SITE_NAME} Contact`,
        url: `${SITE_URL}/contact`,
      },
    };
  }

  if (pathname === '/help') {
    return {
      title: `Help Center | ${SITE_NAME}`,
      description:
        'Get help with MOQ, sampling, print preparation, shipping, and the best next step for your resort wear project.',
      image: '/site-images/optimized/home-guides.jpg',
      keywords: [
        'resort wear help center',
        'sampling help',
        'shipping guidance',
        'apparel production support',
      ],
      type: 'website',
    };
  }

  if (pathname === '/guidance') {
    return {
      title: `Production Guidance | ${SITE_NAME}`,
      description:
        'Operational guidance for launch planning, custom prints, sampling approvals, and shipping choices for resort wear brands.',
      image: '/site-images/optimized/home-fabrics.jpg',
      keywords: [
        'resort wear guidance',
        'custom print guidance',
        'sampling workflow',
        'FOB and DDP guidance',
      ],
      type: 'website',
    };
  }

  if (pathname === '/news') {
    return {
      title: `Resort Wear News & Market Signals | ${SITE_NAME}`,
      description:
        'Read recent resort wear market signals, sourcing observations, and category news from the Aloha & Co team.',
      image: '/site-images/optimized/catalog-hero.jpg',
      keywords: [
        'resort wear news',
        'swimwear market signals',
        'apparel sourcing news',
        'resort market insights',
      ],
      type: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${SITE_NAME} News`,
        url: `${SITE_URL}/news`,
        description:
          'Recent market signals, sourcing notes, and category reads for resort wear brands.',
      },
    };
  }

  if (pathname.startsWith('/news/')) {
    const slug = decodeURIComponent(pathname.split('/').at(-1) || '');
    const {getNewsArticleBySlug} = await import('../data/news');
    const article = getNewsArticleBySlug(slug);

    if (article) {
      return buildNewsArticlePayload(article);
    }
  }

  if (pathname.startsWith('/product/')) {
    const productId = decodeURIComponent(pathname.split('/').at(-1) || '');
    const {productsData} = await import('../data/products');
    const product = Object.entries(productsData)
      .flatMap(([category, items]) => items.map((item) => ({...item, category})))
      .find((item) => item.id === productId);
    if (product) {
      return buildProductPayload(product);
    }
  }

  if (pathname === '/services' || pathname.startsWith('/services/')) {
    return {
      title: `Sampling, Bulk Production, and Private Label Services | ${SITE_NAME}`,
      description:
        'Review sampling, bulk production, custom artwork, labeling, and shipping support for resort wear brands.',
      image: '/services_hero.png',
      keywords: [
        'private label apparel services',
        'sampling service',
        'bulk production service',
      ],
      type: 'website',
    };
  }

  if (pathname === '/faq') {
    return {
      title: `Resort Wear FAQ | ${SITE_NAME}`,
      description:
        'Get answers on fabrics, sampling, MOQ, custom prints, shipping terms, and private label production for resort wear brands.',
      image: '/FAQ.png',
      keywords: [
        'resort wear faq',
        'shipping and MOQ help',
        'custom print development faq',
      ],
      type: 'website',
    };
  }

  return buildDefaultPayload();
}

export default function RouteSeo() {
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const payload = await buildRoutePayload(location.pathname, location.search);
      if (cancelled) return;

      const canonical = new URL(`${location.pathname}${location.search}`, SITE_URL).href;
      const imageUrl = toAbsoluteUrl(payload.image);
      const keywords = (payload.keywords?.length ? payload.keywords : DEFAULT_KEYWORDS).join(', ');

      document.title = payload.title;
      document.documentElement.lang = 'en';

      upsertMeta({ attr: 'name', key: 'description' }, payload.description);
      upsertMeta({ attr: 'name', key: 'keywords' }, keywords);
      upsertMeta({ attr: 'name', key: 'robots' }, 'index,follow,max-image-preview:large');
      upsertMeta({ attr: 'name', key: 'twitter:card' }, 'summary_large_image');
      upsertMeta({ attr: 'name', key: 'twitter:title' }, payload.title);
      upsertMeta({ attr: 'name', key: 'twitter:description' }, payload.description);
      upsertMeta({ attr: 'name', key: 'twitter:image' }, imageUrl);
      upsertMeta({ attr: 'property', key: 'og:site_name' }, SITE_NAME);
      upsertMeta({ attr: 'property', key: 'og:title' }, payload.title);
      upsertMeta({ attr: 'property', key: 'og:description' }, payload.description);
      upsertMeta({ attr: 'property', key: 'og:type' }, payload.type || 'website');
      upsertMeta({ attr: 'property', key: 'og:url' }, canonical);
      upsertMeta({ attr: 'property', key: 'og:image' }, imageUrl);
      upsertLink('canonical', canonical);
      upsertJsonLd(payload.jsonLd);
    })();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search]);

  return null;
}
