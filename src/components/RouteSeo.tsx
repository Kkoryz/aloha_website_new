import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Product } from '../data/products';

const SITE_NAME = 'Aloha & Co';
const SITE_URL = 'https://alohaandco.com';
const DEFAULT_IMAGE = '/site-images/optimized/home-hero.jpg';
const DEFAULT_DESCRIPTION =
  'Factory-direct resort wear manufacturer for aloha shirts, resort dresses, swimwear, matching sets, and private label development with low MOQ (50 pcs/style/color).';
const DEFAULT_KEYWORDS = [
  'resort wear manufacturer',
  'aloha shirt manufacturer',
  'custom resort wear',
  'private label swimwear',
  'low MOQ clothing manufacturer',
  'Shaoxing apparel factory',
  'tropical apparel factory',
  'resort wear OEM ODM',
];
const categoryLabels: Record<string, string> = {
  'aloha-shirts': 'Aloha Shirts',
  'tshirts-tops': 'T-Shirts & Tops',
  'resort-dresses': 'Resort Dresses',
  'swimwear': 'Swimwear',
  'matching-sets': 'Matching Sets',
  'accessories': 'Accessories',
};

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'Aloha and Co',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: 'korey@alohaandco.com',
  telephone: '+1-647-514-0926',
  areaServed: ['United States', 'Canada', 'Hawaii', 'Australia', 'Caribbean'],
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+1-647-514-0926',
    email: 'korey@alohaandco.com',
    availableLanguage: ['en'],
    areaServed: ['US', 'CA', 'Worldwide'],
  }],
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Toronto', addressCountry: 'CA' },
    { '@type': 'PostalAddress', addressLocality: 'Shaoxing', addressCountry: 'CN' },
  ],
  sameAs: ['https://www.instagram.com/alohaandco.hi'],
};

const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  { q: 'What is your minimum order quantity (MOQ)?', a: 'Standard MOQ is 50 pieces per style per color. Many brands test 5 prints at 250 total units instead of the 1,500+ units many generalist factories require.' },
  { q: 'How long does sampling take?', a: 'Custom print sampling usually takes 10–15 days after artwork and fabric direction are confirmed.' },
  { q: 'How long is bulk production?', a: 'Bulk production is typically 30–35 days after sample approval.' },
  { q: 'How do I start?', a: 'Browse our 64+ base styles, choose a category, then send your artwork, references, or tech pack. We confirm fabric, print method, quote, sample fee, and production path before sampling begins.' },
  { q: 'Can I develop fully custom designs?', a: 'Yes. You can start from our base styles or develop custom pieces. Our in-house designers support repeat artwork, print scaling, color matching, labels, trims, and packaging.' },
  { q: 'What are your payment terms?', a: 'Standard terms are 30% deposit to begin bulk production and 70% before shipment. Sample and pattern fees are refundable against the approved bulk order for that style.' },
  { q: 'What are sample and pattern fees?', a: 'Sample fee is $50/pc and pattern fee is $50/design. Both are refundable on bulk when the style moves forward.' },
  { q: 'Do you ship FOB, CIF, and DDP?', a: 'Yes. We support FOB and CIF if you have your own freight partner. DDP is recommended when you want one landed quote with tariff, customs, and door-to-door delivery included.' },
  { q: 'Where are your teams based?', a: 'Client operations are in Toronto, Canada. Design, sourcing, and production teams work from Shaoxing, China, near China Textile City. The dual-timezone setup helps us respond within 24 hours.' },
  { q: 'How are my designs protected?', a: 'Your custom artwork and tech packs remain confidential. We can sign an NDA, and exclusive custom prints are not sold to other clients.' },
];

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

function upsertLink(rel: string, href: string, attrs?: Record<string, string>) {
  const matchAttr = attrs?.type ? `[type="${attrs.type}"]` : '';
  let link = document.head.querySelector(
    `link[rel="${rel}"]${matchAttr}`,
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) link.setAttribute(k, v);
  }
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

function breadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

function serviceJsonLd(name: string, description: string, urlPath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name: `${name} | ${SITE_NAME}`,
    description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: ['United States', 'Canada', 'Hawaii', 'Australia', 'Caribbean'],
    url: `${SITE_URL}${urlPath}`,
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Resort wear brands, swimwear brands, boutique apparel buyers',
    },
  };
}

function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

function buildDefaultPayload(): SeoPayload {
  return {
    title: `${SITE_NAME} | Resort Wear Manufacturer for Low MOQ Private Label Production`,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    keywords: DEFAULT_KEYWORDS,
    type: 'website',
    jsonLd: [
      ORG_JSONLD,
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
    ],
  };
}

function buildProductPayload(product: Product & { category: string }): SeoPayload {
  const numericPrice = product.price?.match(/\d+(?:\.\d+)?/)?.[0];
  const description = `${product.name} in ${product.fabric}. ${product.moq}${product.sizeRange ? `, ${product.sizeRange}` : ''}. Custom print, labeling, and bulk production available.`;
  const categoryLabel = categoryLabels[product.category] || product.category;

  return {
    title: `${product.name} (${product.id}) | ${categoryLabel} | ${SITE_NAME}`,
    description,
    image: product.hoverImage || product.image,
    keywords: [
      product.name,
      categoryLabel,
      product.fabric,
      'custom resort wear manufacturer',
      'private label apparel',
      `style ${product.id}`,
    ],
    type: 'product',
    jsonLd: [
      {
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
        category: categoryLabel,
        manufacturer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
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
                availability: 'https://schema.org/InStock',
                seller: { '@type': 'Organization', name: SITE_NAME },
              },
            }
          : {}),
      },
      breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'Base Styles', url: '/shop' },
        { name: categoryLabel, url: `/shop?category=${product.category}` },
        { name: product.id, url: `/product/${product.id}` },
      ]),
    ],
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
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description,
        image: [toAbsoluteUrl(article.image)],
        datePublished: article.date,
        dateModified: article.date,
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
        keywords: (article.topics || []).join(', '),
      },
      breadcrumb([
        { name: 'Home', url: '/' },
        { name: 'News', url: '/news' },
        { name: article.title, url: `/news/${article.slug}` },
      ]),
    ],
  };
}

async function buildRoutePayload(pathname: string, search: string): Promise<SeoPayload> {
  if (pathname === '/') {
    return buildDefaultPayload();
  }

  if (pathname === '/catalog') {
    return {
      title: `Resort Wear Catalog 2026 (PDF) | ${SITE_NAME}`,
      description:
        'Browse the Aloha & Co 2026 resort wear catalog with 64+ base styles across aloha shirts, resort dresses, swimwear, matching sets, T-shirts/tops, and accessories. Low MOQ, custom prints, private label production.',
      image: '/site-images/optimized/catalog-hero.jpg',
      keywords: [
        'resort wear catalog pdf',
        'aloha shirt catalog',
        'swimwear catalog',
        'resort dress catalog',
        'private label catalog',
        '2026 resort catalog',
      ],
      type: 'website',
      jsonLd: [
        {
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
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Catalog', url: '/catalog' },
        ]),
      ],
    };
  }

  if (pathname === '/shop') {
    const category = new URLSearchParams(search).get('category');
    const categoryLabel = category ? categoryLabels[category] : null;

    return {
      title: categoryLabel
        ? `${categoryLabel} — Resort Wear Base Styles | ${SITE_NAME}`
        : `Resort Wear Base Styles (64+ styles) | ${SITE_NAME}`,
      description: categoryLabel
        ? `Browse ${categoryLabel.toLowerCase()} base styles ready for custom prints, labels, packaging, and low MOQ resort wear production.`
        : 'Browse 64+ resort wear base styles ready for custom print, private label, and low MOQ sampling across 6 product categories.',
      image: '/heroes/shop_hero.webp',
      keywords: [
        'resort wear base styles',
        'low MOQ resort styles',
        categoryLabel || 'ready development apparel',
        'factory-ready clothing styles',
        'wholesale resort wear',
      ],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: categoryLabel
            ? `${categoryLabel} Base Styles`
            : 'Resort Wear Base Styles',
          url: `${SITE_URL}/shop${category ? `?category=${category}` : ''}`,
          description: 'Factory-ready resort wear styles available for custom prints, labels, and low MOQ production.',
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
        breadcrumb(
          categoryLabel
            ? [
                { name: 'Home', url: '/' },
                { name: 'Base Styles', url: '/shop' },
                { name: categoryLabel, url: `/shop?category=${category}` },
              ]
            : [
                { name: 'Home', url: '/' },
                { name: 'Base Styles', url: '/shop' },
              ],
        ),
      ],
    };
  }

  if (pathname === '/products') {
    return {
      title: `Resort Wear Product Lines (6 Categories) | ${SITE_NAME}`,
      description:
        'Explore Aloha shirts, resort dresses, swimwear, matching sets, tops, and accessories built for low MOQ private label production. UPF50+ swim, family programs, custom prints.',
      image: '/heroes/products_hero.webp',
      keywords: [
        'resort wear product lines',
        'aloha shirts wholesale',
        'resort dresses manufacturer',
        'swimwear manufacturer',
        'matching sets factory',
        'UPF50+ swim manufacturer',
      ],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Resort Wear Product Lines',
          url: `${SITE_URL}/products`,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
          hasPart: Object.entries(categoryLabels).map(([slug, label]) => ({
            '@type': 'CollectionPage',
            name: label,
            url: `${SITE_URL}/shop?category=${slug}`,
          })),
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products' },
        ]),
      ],
    };
  }

  if (pathname === '/starter-kits') {
    return {
      title: `Starter Kit for Resort Wear Brands | ${SITE_NAME}`,
      description:
        'Request a resort wear starter kit with fabric swatches, catalog access, sample planning support, $50 sample voucher, and in-house custom print guidance for your first collection.',
      image: '/heroes/starter_kit_hero.webp',
      keywords: [
        'resort wear starter kit',
        'fabric swatches',
        'custom print development',
        'apparel sampling starter pack',
        'first resort wear collection',
      ],
      type: 'website',
      jsonLd: [
        serviceJsonLd(
          'Resort Wear Starter Kit',
          'Compact starting pack for brands planning their first resort wear collection: fabric swatches, catalog, $50 sample voucher, and custom print guidance.',
          '/starter-kits',
        ),
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Starter Kits', url: '/starter-kits' },
        ]),
      ],
    };
  }

  if (pathname === '/contact') {
    return {
      title: `Contact the Resort Wear Factory Team | ${SITE_NAME}`,
      description:
        'Talk with Aloha & Co about custom resort wear production, sampling, MOQ, artwork, and FOB or DDP shipping. 24-hour response from Toronto + Shaoxing.',
      image: '/heroes/contact_hero.webp',
      keywords: [
        'contact clothing manufacturer',
        'resort wear factory contact',
        'private label production quote',
        'apparel sampling inquiry',
      ],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: `${SITE_NAME} Contact`,
          url: `${SITE_URL}/contact`,
          mainEntity: ORG_JSONLD,
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]),
      ],
    };
  }

  if (pathname === '/help') {
    return {
      title: `Help Center for Resort Wear Brands | ${SITE_NAME}`,
      description:
        'Get help with MOQ, sampling, print preparation, shipping, and the best next step for your resort wear project. Pre-flight checks before you sample, approve, or ship.',
      image: '/site-images/optimized/home-guides.jpg',
      keywords: [
        'resort wear help center',
        'sampling help',
        'shipping guidance',
        'apparel production support',
        'pre-sample checklist',
      ],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${SITE_NAME} Help Center`,
          url: `${SITE_URL}/help`,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Help', url: '/help' },
        ]),
      ],
    };
  }

  if (pathname === '/guidance') {
    return {
      title: `Production Guidance for Resort Brands | ${SITE_NAME}`,
      description:
        'Operational guidance for launch planning, custom prints, sampling approvals, and shipping choices for resort wear brands. Practical steps before you place the order.',
      image: '/site-images/optimized/home-fabrics.jpg',
      keywords: [
        'resort wear guidance',
        'custom print guidance',
        'sampling workflow',
        'FOB and DDP guidance',
        'first collection planning',
      ],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Practical guidance before placing a resort wear order',
          description: 'Build a tighter first range, prepare prints properly, sample before bulk, and pick the right shipping path.',
          step: [
            { '@type': 'HowToStep', name: 'Build a tighter first range', text: 'Pick a lead category, use MOQ math, and shortlist styles directly from the base library.' },
            { '@type': 'HowToStep', name: 'Prepare custom prints properly', text: 'Send vector files, share references, and approve print scale by silhouette before samples are cut.' },
            { '@type': 'HowToStep', name: 'Use samples to de-risk bulk', text: 'Review fit, drape, trims, and finishing on body. Lock corrections before bulk approval.' },
            { '@type': 'HowToStep', name: 'Choose the right shipping path', text: 'Use DDP for one landed quote, or FOB/CIF with your own freight partner.' },
          ],
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Guidance', url: '/guidance' },
        ]),
      ],
    };
  }

  if (pathname === '/news') {
    return {
      title: `Resort Wear News & Market Signals | ${SITE_NAME}`,
      description:
        'Read recent resort wear market signals, sourcing observations, swimwear trend reports, tariff/landed-cost notes, and category news from the Aloha & Co team.',
      image: '/site-images/optimized/catalog-hero.jpg',
      keywords: [
        'resort wear news',
        'swimwear market signals',
        'apparel sourcing news',
        'resort market insights',
        'tariff DDP shipping news',
      ],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${SITE_NAME} News`,
          url: `${SITE_URL}/news`,
          description: 'Recent market signals, sourcing notes, and category reads for resort wear brands.',
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'News', url: '/news' },
        ]),
      ],
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

  if (pathname === '/services/sampling') {
    return {
      title: `Resort Wear Sampling Service | ${SITE_NAME}`,
      description:
        'Test fit, fabric, and print scale before bulk. Custom print samples in 10–15 days, $50/pc + $50/design pattern fee, both refundable on approved bulk. No sample MOQ.',
      image: '/heroes/Sampling.webp',
      keywords: [
        'resort wear sampling',
        'custom print sampling',
        'aloha shirt sample',
        'swimwear sample',
        'apparel sample fee',
      ],
      type: 'website',
      jsonLd: [
        serviceJsonLd(
          'Resort Wear Sampling',
          'Sampling service for resort wear brands. Lead time 10–15 days, no sample MOQ, sample and pattern fees refundable on approved bulk.',
          '/services/sampling',
        ),
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Sampling', url: '/services/sampling' },
        ]),
      ],
    };
  }

  if (pathname === '/services/bulk-production') {
    return {
      title: `Resort Wear Bulk Production Service (Low MOQ) | ${SITE_NAME}`,
      description:
        'Bulk resort wear production from 50 pcs per style per color, 30–35 day lead time after sample approval, 30% deposit + 70% before shipment. FOB / CIF / DDP.',
      image: '/heroes/bulk production.webp',
      keywords: [
        'low MOQ bulk production',
        'resort wear bulk',
        'apparel manufacturing 50 MOQ',
        'aloha shirt bulk',
        'swimwear bulk',
      ],
      type: 'website',
      jsonLd: [
        serviceJsonLd(
          'Resort Wear Bulk Production',
          'Bulk production from 50 pcs per style per color, 30–35 day lead time after sample approval, factory-direct QC, FOB/CIF/DDP shipping.',
          '/services/bulk-production',
        ),
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Bulk Production', url: '/services/bulk-production' },
        ]),
      ],
    };
  }

  if (pathname === '/services/private-label') {
    return {
      title: `Private Label Resort Wear Manufacturing | ${SITE_NAME}`,
      description:
        'Build a complete private-label resort collection with custom labels, hang tags, woven trims, packaging, exclusive prints, and production-ready artwork.',
      image: '/heroes/Private Label.webp',
      keywords: [
        'private label resort wear',
        'custom labels and tags',
        'private label swimwear',
        'custom prints private label',
        'OEM ODM resort wear',
      ],
      type: 'website',
      jsonLd: [
        serviceJsonLd(
          'Private Label Resort Wear',
          'Private label development including custom prints, labels, hang tags, trims, and packaging for resort wear brands.',
          '/services/private-label',
        ),
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Private Label', url: '/services/private-label' },
        ]),
      ],
    };
  }

  if (pathname === '/services') {
    return {
      title: `Sampling, Bulk Production, and Private Label Services | ${SITE_NAME}`,
      description:
        'Resort-wear-only manufacturing: sampling (10–15 days), bulk production from 50 pcs MOQ (30–35 days), and private label with custom labels, prints, and packaging.',
      image: '/heroes/services_hero.webp',
      keywords: [
        'private label apparel services',
        'sampling service',
        'bulk production service',
        'resort wear OEM',
        'custom apparel manufacturer',
      ],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Resort Wear Manufacturing Services',
          url: `${SITE_URL}/services`,
          hasPart: [
            { '@type': 'Service', name: 'Sampling', url: `${SITE_URL}/services/sampling` },
            { '@type': 'Service', name: 'Bulk Production', url: `${SITE_URL}/services/bulk-production` },
            { '@type': 'Service', name: 'Private Label', url: `${SITE_URL}/services/private-label` },
          ],
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
        ]),
      ],
    };
  }

  if (pathname === '/privacy') {
    return {
      title: `Privacy Policy | ${SITE_NAME}`,
      description: 'How Aloha & Co handles inquiry data, contact form submissions, and standard server logs from alohaandco.com.',
      image: DEFAULT_IMAGE,
      keywords: ['privacy policy', 'data handling', 'GDPR', 'PIPEDA', 'CCPA'],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${SITE_NAME} Privacy Policy`,
          url: `${SITE_URL}/privacy`,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Privacy', url: '/privacy' },
        ]),
      ],
    };
  }

  if (pathname === '/terms') {
    return {
      title: `Terms of Service | ${SITE_NAME}`,
      description: 'Terms governing use of alohaandco.com — site usage, quote/sample/order practices, IP, confidentiality, and limitation of liability.',
      image: DEFAULT_IMAGE,
      keywords: ['terms of service', 'terms and conditions', 'MOQ terms', 'sampling terms'],
      type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${SITE_NAME} Terms of Service`,
          url: `${SITE_URL}/terms`,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        },
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'Terms', url: '/terms' },
        ]),
      ],
    };
  }

  if (pathname === '/faq') {
    return {
      title: `Resort Wear FAQ — MOQ, Sampling, Shipping | ${SITE_NAME}`,
      description:
        'Get answers on fabrics, sampling, MOQ (50 pcs/style/color), custom prints, shipping terms (FOB/CIF/DDP), payment, and private label production for resort wear brands.',
      image: '/heroes/FAQ.webp',
      keywords: [
        'resort wear faq',
        'shipping and MOQ help',
        'custom print development faq',
        'apparel manufacturer faq',
        'private label faq',
      ],
      type: 'website',
      jsonLd: [
        faqJsonLd(),
        breadcrumb([
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]),
      ],
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
      upsertMeta({ attr: 'name', key: 'robots' }, 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
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
      upsertMeta({ attr: 'property', key: 'og:locale' }, 'en_US');
      upsertLink('canonical', canonical);
      upsertJsonLd(payload.jsonLd);
    })();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search]);

  return null;
}
