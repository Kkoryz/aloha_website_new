/**
 * build-seo.cjs — generate sitemaps, RSS/JSON feeds, llms.txt, robots.txt,
 * and prerendered HTML for static + news routes so crawlers (Google, Bing,
 * GPTBot, ClaudeBot, PerplexityBot, etc.) can index the site without JS.
 *
 * The React SPA still hydrates on top of these files because we splice the
 * Vite-built script + stylesheet tags from dist/index.html into each
 * prerendered HTML.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content', 'news');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

const SITE_URL = 'https://alohaandco.com';
const SITE_NAME = 'Aloha & Co';
const SITE_TAGLINE =
  'Factory-direct resort wear manufacturer. 64+ base styles, custom prints, MOQ 50, sampling 10–15 days, FOB / DDP shipping from Shaoxing.';
const PUBLISHER_LOGO = `${SITE_URL}/logo.png`;
const DEFAULT_OG_IMAGE = `${SITE_URL}/site-images/optimized/home-hero.jpg`;

const STATIC_PAGES = [
  '/',
  '/catalog',
  '/shop',
  '/products',
  '/starter-kits',
  '/services',
  '/services/sampling',
  '/services/private-label',
  '/services/bulk-production',
  '/faq',
  '/help',
  '/guidance',
  '/news',
  '/contact',
  '/privacy',
  '/terms',
];

const AI_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'Diffbot',
  'FacebookBot',
  'meta-externalagent',
  'YouBot',
  'AmazonBot',
  'DuckAssistBot',
  'MistralAI-User',
  'Kagibot',
  'PetalBot',
];

const CATEGORY_LABELS = {
  'aloha-shirts': 'Aloha Shirts',
  'tshirts-tops': 'T-Shirts & Tops',
  'resort-dresses': 'Resort Dresses',
  'swimwear': 'Swimwear',
  'matching-sets': 'Matching Sets',
  'accessories': 'Accessories',
};

function kebab(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function productSlug(p) {
  return `${kebab(p.name)}-${String(p.id).toLowerCase()}`;
}

function productPath(p) {
  return `/product/${productSlug(p)}`;
}

const FAQ_ITEMS = [
  ['What is your minimum order quantity (MOQ)?', 'Standard MOQ is 50 pieces per style per color. Many brands test 5 prints at 250 total units instead of the 1,500+ units many generalist factories require.'],
  ['How long does sampling take?', 'Custom print sampling usually takes 10–15 days after artwork and fabric direction are confirmed.'],
  ['How long is bulk production?', 'Bulk production is typically 30–35 days after sample approval.'],
  ['How do I start a project with Aloha & Co?', 'Browse the 64+ base styles, choose a category, then send your artwork, references, or tech pack. We confirm fabric, print method, quote, sample fee, and production path before sampling begins.'],
  ['Can I develop fully custom designs?', 'Yes. You can start from base styles or develop custom pieces. Our in-house designers support repeat artwork, print scaling, color matching, labels, trims, and packaging.'],
  ['What are your payment terms?', 'Standard terms are 30% deposit to begin bulk production and 70% before shipment. Sample and pattern fees are refundable against the approved bulk order for that style.'],
  ['What are sample and pattern fees?', 'Sample fee is $50/pc and pattern fee is $50/design. Both are refundable on bulk when the style moves forward.'],
  ['Do you ship FOB, CIF, and DDP?', 'Yes. We support FOB and CIF if you have your own freight partner. DDP is recommended when you want one landed quote with tariff, customs, and door-to-door delivery included.'],
  ['Where are your teams based?', 'Client operations are in Toronto, Canada. Design, sourcing, and production teams work from Shaoxing, China, near China Textile City. The dual-timezone setup helps us respond within 24 hours.'],
  ['How are my designs protected?', 'Your custom artwork and tech packs remain confidential. We can sign an NDA, and exclusive custom prints are not sold to other clients.'],
];

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'Aloha and Co',
  url: SITE_URL,
  logo: PUBLISHER_LOGO,
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

// --------------------------------------------------------------------------
// Static page metadata + prerender bodies
// --------------------------------------------------------------------------

const PAGE_META = {
  '/': {
    title: `${SITE_NAME} | Resort Wear Manufacturer (MOQ 50)`,
    description: SITE_TAGLINE,
    image: '/site-images/optimized/home-hero.jpg',
    keywords: 'resort wear manufacturer, custom resort wear, aloha shirt manufacturer, private label swimwear, low MOQ clothing manufacturer, Shaoxing apparel factory, resort wear OEM ODM',
    h1: '100% Resort Wear Manufacturing',
    intro: '6 categories, 64+ base styles. Low MOQ, custom prints, factory-direct production from Toronto + Shaoxing.',
    breadcrumbs: [['Home', '/']],
    extraSections: [
      ['Why resort wear only', 'Most apparel factories are generalists. The classic Aloha shirt, the flowy resort dress, the performance boardshort, and the UPF50+ rash guard each need different decisions around drape, print scale, stretch, breathability, and finishing. Aloha & Co focuses on resort wear only.'],
      ['Categories we manufacture', '6 product lines: Aloha Shirts, T-Shirts & Tops, Resort Dresses, Swimwear (UPF50+), Matching Sets, and Accessories. 64+ base styles ready for custom prints, labels, trims, and packaging.'],
      ['Standard terms', 'MOQ 50 pcs per style per color. Sampling 10–15 days. Bulk 30–35 days. Sample $50/pc, pattern $50/design — refundable on bulk. Payment 30% deposit + 70% before shipment. Shipping FOB / CIF / DDP.'],
    ],
  },
  '/catalog': {
    title: `Resort Wear Catalog 2026 (PDF) | ${SITE_NAME}`,
    description: 'Browse the 2026 resort wear catalog: 64+ base styles across aloha shirts, resort dresses, swimwear, matching sets, T-shirts/tops, and accessories. Low MOQ, custom prints, private label production.',
    image: '/site-images/optimized/catalog-hero.jpg',
    keywords: 'resort wear catalog pdf, aloha shirt catalog, swimwear catalog, resort dress catalog, private label catalog, 2026 resort catalog',
    h1: '2026 Resort Wear Catalog',
    intro: '64+ base styles across aloha shirts, resort dresses, swimwear, matching sets, tops, and accessories.',
    breadcrumbs: [['Home', '/'], ['Catalog', '/catalog']],
    extraSections: [
      ['Inside the catalog', '39 buyer-facing pages of resort wear styles, fabrics, MOQ notes, and customization options. Use it to shortlist silhouettes and prints before sampling.'],
      ['Catalog actions', `Open the PDF directly at ${SITE_URL}/Aloha_Co_Combined_Catalog_2026.pdf or browse live category pages on the site for hover images and quote-ready style IDs.`],
    ],
    cta: { label: 'Open Catalog PDF', href: '/Aloha_Co_Combined_Catalog_2026.pdf' },
  },
  '/shop': {
    title: `Resort Wear Base Styles (64+ styles) | ${SITE_NAME}`,
    description: 'Browse 64+ resort wear base styles ready for custom print, private label, and low MOQ sampling across 6 product categories.',
    image: '/heroes/shop_hero.webp',
    keywords: 'resort wear base styles, low MOQ resort styles, ready development apparel, factory-ready clothing styles, wholesale resort wear',
    h1: 'Ready Development Base Styles',
    intro: 'Factory-ready resort wear samples with custom print, label, fabric and packaging options.',
    breadcrumbs: [['Home', '/'], ['Base Styles', '/shop']],
    extraSections: [
      ['Categories', 'Aloha Shirts, T-Shirts & Tops, Resort Dresses, Swimwear (UPF50+), Matching Sets, Accessories.'],
      ['Customization', 'Every base style supports custom prints, color, labels, hang tags, trims, and packaging. MOQ from 50 pcs per style per color.'],
    ],
  },
  '/products': {
    title: `Resort Wear Product Lines (6 Categories) | ${SITE_NAME}`,
    description: 'Explore Aloha shirts, resort dresses, swimwear, matching sets, tops, and accessories built for low MOQ private label production. UPF50+ swim, family programs, custom prints.',
    image: '/heroes/products_hero.webp',
    keywords: 'resort wear product lines, aloha shirts wholesale, resort dresses manufacturer, swimwear manufacturer, matching sets factory, UPF50+ swim manufacturer',
    h1: 'Products',
    intro: '64+ factory-ready resort wear styles across 6 categories, built for custom prints and low MOQ production.',
    breadcrumbs: [['Home', '/'], ['Products', '/products']],
    extraSections: [
      ['Aloha Shirts', '20+ base styles. Camp shirts, polos, button shirts, and family-ready scaled prints in rayon, cotton, linen, bamboo, and polyester.'],
      ['T-Shirts & Tops', '15+ base styles. Everyday resort graphics, quick-dry tops, tanks, crops, and kids tees in cotton, bamboo, polyester, and quick-dry blends.'],
      ['Resort Dresses', '12 base styles. Shirt dresses, polo dresses, sundresses, and girls silhouettes in adult and 2T–14 grading.'],
      ['Swimwear', '13 base styles. Board shorts, trunks, bikinis, rash guards, swim sets, and cover-ups. Quick-dry poly and nylon-spandex; UPF50+ available.'],
      ['Matching Sets', '16+ base styles. Shirt-and-short, top-and-skirt, kids and family programs with print scale handled by garment.'],
      ['Accessories', '15+ base styles. Hats, bags, bandanas, sarongs, and towels — collection finishers with print-matched options.'],
    ],
  },
  '/starter-kits': {
    title: `Starter Kit for Resort Wear Brands | ${SITE_NAME}`,
    description: 'Request a starter kit with fabric swatches, catalog access, $50 sample voucher, and in-house custom print guidance for your first resort wear collection.',
    image: '/heroes/starter_kit_hero.webp',
    keywords: 'resort wear starter kit, fabric swatches, custom print development, apparel sampling starter pack, first resort wear collection',
    h1: 'Starter Kits',
    intro: 'A compact starting pack for brands planning their first resort wear collection.',
    breadcrumbs: [['Home', '/'], ['Starter Kits', '/starter-kits']],
    extraSections: [
      ['What\'s inside', '"How to Start a Resort Line" guide, fabric swatches with print notes, catalog of 64+ base styles, $50 sample voucher, Toronto client team contact, and FOB / DDP shipping guidance.'],
      ['Best for', 'First collection launches, capsule resort drops, low-MOQ testing, and print-led brands.'],
    ],
  },
  '/services': {
    title: `Sampling, Bulk Production, and Private Label Services | ${SITE_NAME}`,
    description: 'Resort-wear-only manufacturing: sampling (10–15 days), bulk production from 50 pcs MOQ (30–35 days), and private label with custom labels, prints, and packaging.',
    image: '/heroes/services_hero.webp',
    keywords: 'private label apparel services, sampling service, bulk production service, resort wear OEM, custom apparel manufacturer',
    h1: 'Our Services',
    intro: 'Resort-wear-only manufacturing, custom prints, low MOQ, and factory-direct delivery.',
    breadcrumbs: [['Home', '/'], ['Services', '/services']],
    extraSections: [
      ['Sampling', 'Test fabric, fit, and custom prints before bulk. Custom print samples typically take 10–15 days after artwork approval. Sample $50/pc, pattern $50/design — refundable on bulk.'],
      ['Bulk Production', 'Scale with MOQ from 50 pcs per style per color, 30–35 day bulk lead time after sample approval, and factory-direct QC.'],
      ['Private Label', 'Build a complete private-label resort collection with custom labels, tags, packaging, prints, and production-ready artwork.'],
      ['Process', 'Consult → Sample → Produce → Deliver. Toronto client operations + Shaoxing production give you 24-hour response across the project.'],
    ],
  },
  '/services/sampling': {
    title: `Resort Wear Sampling Service | ${SITE_NAME}`,
    description: 'Test fit, fabric, and print scale before bulk. Custom print samples in 10–15 days, $50/pc + $50/design pattern fee, both refundable on approved bulk. No sample MOQ.',
    image: '/heroes/Sampling.webp',
    keywords: 'resort wear sampling, custom print sampling, aloha shirt sample, swimwear sample, apparel sample fee',
    h1: 'Sampling',
    intro: 'Test fit, fabric, and print scale before you commit to bulk.',
    breadcrumbs: [['Home', '/'], ['Services', '/services'], ['Sampling', '/services/sampling']],
    extraSections: [
      ['Base Style Samples', 'No MOQ. Lead time 10–15 days for printed samples. Cost $50/pc, refundable on bulk. Includes fit, fabric, construction, and basic label review.'],
      ['Custom Print Samples', 'No MOQ. Lead time 10–15 days after artwork confirmation. Cost $50/pc + $50/design pattern fee. Both fees credited on approved bulk.'],
    ],
  },
  '/services/bulk-production': {
    title: `Resort Wear Bulk Production (50 MOQ) | ${SITE_NAME}`,
    description: 'Bulk resort wear production from 50 pcs per style per color, 30–35 day lead time after sample approval, 30% deposit + 70% before shipment. FOB / CIF / DDP.',
    image: '/heroes/bulk production.webp',
    keywords: 'low MOQ bulk production, resort wear bulk, apparel manufacturing 50 MOQ, aloha shirt bulk, swimwear bulk',
    h1: 'Bulk Production',
    intro: 'Scale your resort wear brand from 50 pcs per style per color.',
    breadcrumbs: [['Home', '/'], ['Services', '/services'], ['Bulk Production', '/services/bulk-production']],
    extraSections: [
      ['Production details', '50 pcs per style per color. Test 5 prints at 250 total units. Bulk production typically completes in 30–35 days after sample approval.'],
      ['Standard bulk terms', 'MOQ 50 pcs per style per color. Sample fee $50/pc, pattern fee $50/design — both refundable on bulk. Payment 30% deposit + 70% before shipment. Shipping FOB / CIF / DDP, with DDP recommended.'],
    ],
  },
  '/services/private-label': {
    title: `Private Label Resort Wear Manufacturing | ${SITE_NAME}`,
    description: 'Build a complete private-label resort collection with custom labels, hang tags, woven trims, packaging, exclusive prints, and production-ready artwork.',
    image: '/heroes/Private Label.webp',
    keywords: 'private label resort wear, custom labels and tags, private label swimwear, custom prints private label, OEM ODM resort wear',
    h1: 'Private Label',
    intro: 'Custom prints, labels, trims, and packaging for resort wear brands.',
    breadcrumbs: [['Home', '/'], ['Services', '/services'], ['Private Label', '/services/private-label']],
    extraSections: [
      ['Branding options', 'Custom labels & tags (woven, printed, hang, care), custom packaging (poly bags, mailers, tissue, stickers, boxes), custom prints scaled by garment, and custom hardware/trims (buttons, drawcords, tips, buckles).'],
    ],
  },
  '/faq': {
    title: `Resort Wear FAQ — MOQ, Sampling, Shipping | ${SITE_NAME}`,
    description: 'Get answers on fabrics, sampling, MOQ (50 pcs/style/color), custom prints, shipping terms (FOB/CIF/DDP), payment, and private label production for resort wear brands.',
    image: '/heroes/FAQ.webp',
    keywords: 'resort wear faq, shipping and MOQ help, custom print development faq, apparel manufacturer faq, private label faq',
    h1: 'FAQ',
    intro: 'Answers to the most common questions about working with Aloha & Co.',
    breadcrumbs: [['Home', '/'], ['FAQ', '/faq']],
    faq: true,
  },
  '/help': {
    title: `Help Center for Resort Wear Brands | ${SITE_NAME}`,
    description: 'Get help with MOQ, sampling, print preparation, shipping, and the best next step for your resort wear project. Pre-flight checks before you sample, approve, or ship.',
    image: '/site-images/optimized/home-guides.jpg',
    keywords: 'resort wear help center, sampling help, shipping guidance, apparel production support, pre-sample checklist',
    h1: 'Help Center',
    intro: 'Use these resources to get clear on MOQ, artwork, sampling, shipping, and what to prepare before you contact the factory.',
    breadcrumbs: [['Home', '/'], ['Help', '/help']],
    extraSections: [
      ['Before you sample', 'Choose a focused category, shortlist prints and fabrics, and use the catalog and base styles pages to narrow your first range.'],
      ['Before you approve artwork', 'Check print scale on the actual garment, confirm color direction and placement before sample cutting, and flag trims/labels/packaging needs early.'],
      ['Before you ship', 'Decide FOB, CIF, or DDP before final quoting. Confirm delivery destination and target in-store date. Review packing/carton expectations before bulk closes.'],
    ],
  },
  '/guidance': {
    title: `Production Guidance for Resort Brands | ${SITE_NAME}`,
    description: 'Operational guidance for launch planning, custom prints, sampling approvals, and shipping choices. Practical steps before you place the order.',
    image: '/site-images/optimized/home-fabrics.jpg',
    keywords: 'resort wear guidance, custom print guidance, sampling workflow, FOB and DDP guidance, first collection planning',
    h1: 'Guidance',
    intro: 'A tighter launch plan, cleaner artwork prep, better sampling discipline, and clearer shipping choices usually make the difference.',
    breadcrumbs: [['Home', '/'], ['Guidance', '/guidance']],
    extraSections: [
      ['Build a tighter first range', 'Pick a lead category, use MOQ math before finalizing breadth, and shortlist styles directly from the base style library.'],
      ['Prepare custom prints properly', 'Send vector files when possible. Share references if artwork is not final. Approve print scale by silhouette before samples are cut.'],
      ['Use samples to de-risk bulk', 'Review fit and drape on body. Check labels, trims, and finishing details. Lock corrections before bulk approval.'],
      ['Choose the right shipping path', 'Use DDP for one landed quote with tariffs and customs included. Use FOB or CIF with your own freight partner. Confirm destination timing before ex-factory date.'],
    ],
  },
  '/contact': {
    title: `Contact the Resort Wear Factory Team | ${SITE_NAME}`,
    description: 'Talk with Aloha & Co about custom resort wear production, sampling, MOQ, artwork, and FOB or DDP shipping. 24-hour response from Toronto + Shaoxing.',
    image: '/heroes/contact_hero.webp',
    keywords: 'contact clothing manufacturer, resort wear factory contact, private label production quote, apparel sampling inquiry',
    h1: 'Talk to the resort wear team',
    intro: 'Toronto client ops and Shaoxing production stay on the same thread from first brief through sampling, custom print development, and bulk delivery.',
    breadcrumbs: [['Home', '/'], ['Contact', '/contact']],
    extraSections: [
      ['Direct channels', 'WhatsApp / phone: +1 (647) 514-0926. Email: korey@alohaandco.com. Response target: within 24 hours.'],
      ['What to share', 'Category, target MOQ, target dates, artwork or references, destination market, and shipping preference (FOB / CIF / DDP).'],
    ],
  },
  '/news': {
    title: `Resort Wear News & Market Signals | ${SITE_NAME}`,
    description: 'Read recent resort wear market signals, sourcing observations, swimwear trend reports, tariff/landed-cost notes, and category news.',
    image: '/site-images/optimized/catalog-hero.jpg',
    keywords: 'resort wear news, swimwear market signals, apparel sourcing news, resort market insights, tariff DDP shipping news',
    h1: `${SITE_NAME} News`,
    intro: 'Buyer-facing market reports for resortwear founders and wholesale teams.',
    breadcrumbs: [['Home', '/'], ['News', '/news']],
  },
  '/privacy': {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'How Aloha & Co handles inquiry data, contact form submissions, and standard server logs from alohaandco.com.',
    image: '/site-images/optimized/home-hero.jpg',
    keywords: 'privacy policy, data handling, GDPR, PIPEDA, CCPA, alohaandco privacy',
    h1: 'Privacy Policy',
    intro: 'How Aloha & Co handles inquiry information and contact data from alohaandco.com.',
    breadcrumbs: [['Home', '/'], ['Privacy', '/privacy']],
    extraSections: [
      ['What we collect', 'Inquiry form data (name, business email, company, message), email or WhatsApp correspondence you send us, and standard server logs.'],
      ['How we use it', 'Reply to your inquiry, prepare quotes, and maintain reasonable site security. We do not run advertising trackers and do not sell personal information.'],
      ['Your rights', 'You can request access, correction, or deletion of your personal data. Email korey@alohaandco.com.'],
    ],
  },
  '/terms': {
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'Terms of service for alohaandco.com — site usage, quote/sample/order practices, IP, confidentiality, and limitation of liability.',
    image: '/site-images/optimized/home-hero.jpg',
    keywords: 'terms of service, terms and conditions, MOQ terms, sampling terms, B2B apparel terms',
    h1: 'Terms of Service',
    intro: 'Terms governing use of alohaandco.com and inquiries sent through the site.',
    breadcrumbs: [['Home', '/'], ['Terms', '/terms']],
    extraSections: [
      ['Standard practice', 'MOQ 50 pcs/style/color, sample $50/pc + pattern $50/design (refundable on bulk), payment 30/70, sampling 10–15d, bulk 30–35d, FOB/CIF/DDP shipping.'],
      ['Confidentiality', 'Tech packs, prints, and pricing exchanged with us are confidential. NDA on request. Exclusive custom prints are not sold to other clients.'],
      ['Governing law', 'Province of Ontario, Canada. Project-specific contracts may specify a different governing law.'],
    ],
  },
};

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readSpaBundleTags() {
  const distIndex = path.join(distDir, 'index.html');
  if (!fs.existsSync(distIndex)) return { scripts: '', stylesheets: '' };
  const html = fs.readFileSync(distIndex, 'utf8');
  const scripts = [];
  const stylesheets = [];
  const scriptRe = /<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g;
  const linkRe = /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g;
  let m;
  while ((m = scriptRe.exec(html))) scripts.push(`<script type="module" src="${m[1]}"></script>`);
  while ((m = linkRe.exec(html))) stylesheets.push(`<link rel="stylesheet" href="${m[1]}" />`);
  return { scripts: scripts.join('\n'), stylesheets: stylesheets.join('\n') };
}

function readProducts() {
  const dump = path.join(__dirname, 'products-dump.json');
  if (!fs.existsSync(dump)) return [];
  try {
    return JSON.parse(fs.readFileSync(dump, 'utf8'));
  } catch (e) {
    console.warn(`build-seo: skip products-dump.json - ${e.message}`);
    return [];
  }
}

function readArticles() {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.json'))
    .sort();

  return files
    .map((file) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
      } catch (e) {
        console.warn(`build-seo: skip ${file} - ${e.message}`);
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, SITE_URL).href;
}

function articleCanonical(article) {
  return `${SITE_URL}/news/${article.slug}`;
}

function newsArticleJsonLd(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary || article.excerpt,
    image: [absoluteUrl(article.image)],
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: article.author || SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: PUBLISHER_LOGO },
    },
    mainEntityOfPage: articleCanonical(article),
    articleSection: article.category,
    keywords: (article.topics || []).join(', '),
  };
}

function breadcrumbList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, urlPath], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: urlPath.startsWith('http') ? urlPath : `${SITE_URL}${urlPath}`,
    })),
  };
}

function articleBreadcrumb(article) {
  return breadcrumbList([
    ['Home', '/'],
    ['News', '/news'],
    [article.title, `/news/${article.slug}`],
  ]);
}

function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function pageJsonLd(pathname, meta) {
  const blocks = [];

  if (pathname === '/') {
    blocks.push(ORG_JSONLD);
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_TAGLINE,
      inLanguage: 'en',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    });
    blocks.push(faqJsonLd());
  } else if (pathname === '/contact') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `${SITE_NAME} Contact`,
      url: `${SITE_URL}/contact`,
      mainEntity: ORG_JSONLD,
    });
  } else if (pathname === '/faq') {
    blocks.push(faqJsonLd());
  } else if (pathname === '/services/sampling' || pathname === '/services/bulk-production' || pathname === '/services/private-label' || pathname === '/starter-kits') {
    const name = meta.h1;
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: name,
      name: `${name} | ${SITE_NAME}`,
      description: meta.description,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      areaServed: ['United States', 'Canada', 'Hawaii', 'Australia', 'Caribbean'],
      url: `${SITE_URL}${pathname}`,
      audience: { '@type': 'BusinessAudience', audienceType: 'Resort wear brands, swimwear brands, boutique apparel buyers' },
    });
  } else if (pathname === '/services') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resort Wear Manufacturing Services',
      url: `${SITE_URL}/services`,
      hasPart: [
        { '@type': 'Service', name: 'Sampling', url: `${SITE_URL}/services/sampling` },
        { '@type': 'Service', name: 'Bulk Production', url: `${SITE_URL}/services/bulk-production` },
        { '@type': 'Service', name: 'Private Label', url: `${SITE_URL}/services/private-label` },
      ],
    });
  } else if (pathname === '/products') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resort Wear Product Lines',
      url: `${SITE_URL}/products`,
      hasPart: Object.entries(CATEGORY_LABELS).map(([slug, label]) => ({
        '@type': 'CollectionPage',
        name: label,
        url: `${SITE_URL}/shop?category=${slug}`,
      })),
    });
  } else if (pathname === '/catalog') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Aloha & Co Resort Wear Catalog',
      url: `${SITE_URL}/catalog`,
      description: '39-page resort wear catalog covering low MOQ base styles, custom development, and private label production.',
    });
  } else if (pathname === '/shop') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resort Wear Base Styles',
      url: `${SITE_URL}/shop`,
    });
  } else if (pathname === '/news') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${SITE_NAME} News`,
      url: `${SITE_URL}/news`,
      description: 'Buyer-facing market reports for resortwear founders and wholesale teams.',
    });
  } else if (pathname === '/guidance') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Practical guidance before placing a resort wear order',
      step: [
        { '@type': 'HowToStep', name: 'Build a tighter first range' },
        { '@type': 'HowToStep', name: 'Prepare custom prints properly' },
        { '@type': 'HowToStep', name: 'Use samples to de-risk bulk' },
        { '@type': 'HowToStep', name: 'Choose the right shipping path' },
      ],
    });
  } else if (pathname === '/help') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${SITE_NAME} Help Center`,
      url: `${SITE_URL}/help`,
    });
  }

  if (meta.breadcrumbs) blocks.push(breadcrumbList(meta.breadcrumbs));
  return blocks;
}

function renderStaticPageHtml(pathname, meta, articles, spa) {
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
  const image = absoluteUrl(meta.image);
  const jsonLd = pageJsonLd(pathname, meta);

  const sections = (meta.extraSections || [])
    .map(([title, body]) => `      <section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></section>`)
    .join('\n');

  let extra = '';

  if (meta.faq) {
    extra += '\n      <section aria-label="Frequently Asked Questions"><h2>Frequently Asked Questions</h2><dl>\n';
    for (const [q, a] of FAQ_ITEMS) {
      extra += `        <dt>${escapeHtml(q)}</dt>\n        <dd>${escapeHtml(a)}</dd>\n`;
    }
    extra += '      </dl></section>';
  }

  if (pathname === '/news' && articles.length) {
    extra += '\n      <section aria-label="Latest Articles"><h2>Latest articles</h2><ul>\n';
    for (const a of articles.slice(0, 30)) {
      extra += `        <li><a href="${escapeHtml(articleCanonical(a))}"><strong>${escapeHtml(a.title)}</strong></a> — <time datetime="${escapeHtml(a.date)}">${escapeHtml(a.date)}</time> — ${escapeHtml(a.excerpt || a.summary || '')}</li>\n`;
    }
    extra += '      </ul></section>';
  }

  if (pathname === '/products') {
    extra += '\n      <section aria-label="Category index"><h2>Category index</h2><ul>\n';
    for (const [slug, label] of Object.entries(CATEGORY_LABELS)) {
      extra += `        <li><a href="${SITE_URL}/shop?category=${slug}">${escapeHtml(label)}</a></li>\n`;
    }
    extra += '      </ul></section>';
  }

  const cta = meta.cta
    ? `\n      <p><a href="${escapeHtml(meta.cta.href)}"><strong>${escapeHtml(meta.cta.label)}</strong></a></p>`
    : '';

  const breadcrumbHtml = meta.breadcrumbs && meta.breadcrumbs.length
    ? `      <nav aria-label="Breadcrumb"><ol>${meta.breadcrumbs
        .map(([name, url]) => `<li><a href="${escapeHtml(url)}">${escapeHtml(name)}</a></li>`)
        .join('')}</ol></nav>\n`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}" />
<meta name="keywords" content="${escapeHtml(meta.keywords)}" />
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
<meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1" />
<meta name="author" content="${escapeHtml(SITE_NAME)}" />
<link rel="canonical" href="${escapeHtml(canonical)}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeHtml(meta.title)}" />
<meta property="og:description" content="${escapeHtml(meta.description)}" />
<meta property="og:url" content="${escapeHtml(canonical)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(meta.title)}" />
<meta name="twitter:description" content="${escapeHtml(meta.description)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(SITE_NAME)} News RSS" href="${SITE_URL}/news/feed.xml" />
<link rel="alternate" type="application/feed+json" title="${escapeHtml(SITE_NAME)} News JSON Feed" href="${SITE_URL}/news/feed.json" />
<link rel="alternate" type="text/plain" title="LLM Index" href="${SITE_URL}/llms.txt" />
<link rel="alternate" type="text/plain" title="LLM Full Reference" href="${SITE_URL}/llms-full.txt" />
<link rel="sitemap" type="application/xml" title="Sitemap" href="${SITE_URL}/sitemap.xml" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
${spa?.stylesheets || ''}
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<div id="root">
  <main>
${breadcrumbHtml}      <header>
        <h1>${escapeHtml(meta.h1)}</h1>
        <p>${escapeHtml(meta.intro)}</p>
      </header>
${sections}${extra}${cta}
      <footer>
        <p>${escapeHtml(SITE_NAME)} — ${escapeHtml(SITE_TAGLINE)}</p>
        <p>Contact: <a href="${SITE_URL}/contact">${SITE_URL}/contact</a> · korey@alohaandco.com · +1 (647) 514-0926</p>
      </footer>
  </main>
</div>
${spa?.scripts || ''}
</body>
</html>
`;
}

function renderArticleHtml(article, spa) {
  const canonical = articleCanonical(article);
  const description = article.summary || article.excerpt || SITE_TAGLINE;
  const image = absoluteUrl(article.image);
  const keywords = (article.topics || []).join(', ');
  const jsonLd = [newsArticleJsonLd(article), articleBreadcrumb(article)];

  const sectionsHtml = (article.sections || [])
    .map((s) => {
      const paras = (s.paragraphs || []).map((p) => `      <p>${escapeHtml(p)}</p>`).join('\n');
      return `    <section id="${escapeHtml(s.id || '')}">\n      <h2>${escapeHtml(s.title || '')}</h2>\n${paras}\n    </section>`;
    })
    .join('\n');

  const takeawaysHtml = (article.keyTakeaways || []).length
    ? `    <section id="key-takeaways" aria-label="Key takeaways">\n      <h2>Key Takeaways</h2>\n      <ul>\n${article.keyTakeaways
        .map((k) => `        <li>${escapeHtml(k)}</li>`)
        .join('\n')}\n      </ul>\n    </section>`
    : '';

  const sourcesHtml = (article.sources || []).length
    ? `    <section id="sources" aria-label="Sources">\n      <h2>Sources</h2>\n      <ol>\n${article.sources
        .map((src) => `        <li><a href="${escapeHtml(src.url)}" rel="noopener nofollow">${escapeHtml(src.title || src.url)}</a></li>`)
        .join('\n')}\n      </ol>\n    </section>`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(article.title)} | ${escapeHtml(SITE_NAME)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<meta name="keywords" content="${escapeHtml(keywords)}" />
<meta name="author" content="${escapeHtml(article.author || SITE_NAME)}" />
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
<link rel="canonical" href="${escapeHtml(canonical)}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(article.title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${escapeHtml(canonical)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
<meta property="og:locale" content="en_US" />
<meta property="article:published_time" content="${escapeHtml(article.date)}" />
<meta property="article:section" content="${escapeHtml(article.category || 'News')}" />
${(article.topics || []).map((t) => `<meta property="article:tag" content="${escapeHtml(t)}" />`).join('\n')}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(article.title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(SITE_NAME)} News RSS" href="${SITE_URL}/news/feed.xml" />
<link rel="alternate" type="application/feed+json" title="${escapeHtml(SITE_NAME)} News JSON Feed" href="${SITE_URL}/news/feed.json" />
<link rel="alternate" type="text/plain" title="LLM Index" href="${SITE_URL}/llms.txt" />
<link rel="alternate" type="text/plain" title="LLM Full Reference" href="${SITE_URL}/llms-full.txt" />
<link rel="icon" href="/favicon.ico" sizes="any" />
${spa?.stylesheets || ''}
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<div id="root">
  <article>
    <header>
      <p><a href="/news">${escapeHtml(SITE_NAME)} News</a></p>
      <h1>${escapeHtml(article.title)}</h1>
      <p><time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time> · ${escapeHtml(article.category || 'News')} · ${escapeHtml(article.author || SITE_NAME)}</p>
      <p>${escapeHtml(article.excerpt || '')}</p>
      <p><img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" loading="lazy" /></p>
    </header>
    <p><strong>Summary.</strong> ${escapeHtml(article.summary || '')}</p>
${takeawaysHtml}
${sectionsHtml}
${sourcesHtml}
    <footer>
      <p>Read on the live site: <a href="${escapeHtml(canonical)}">${escapeHtml(canonical)}</a></p>
      <p>Published by ${escapeHtml(SITE_NAME)} — ${escapeHtml(SITE_TAGLINE)}</p>
    </footer>
  </article>
</div>
${spa?.scripts || ''}
</body>
</html>
`;
}

function productJsonLd(product) {
  const numericPrice = (product.price || '').match(/\d+(?:\.\d+)?/)?.[0];
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
  const canonicalPath = productPath(product);
  const description = `${product.name} in ${product.fabric}. ${product.moq}${product.sizeRange ? `, ${product.sizeRange}` : ''}. Custom print, labeling, and bulk production available.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.id,
    mpn: product.id,
    url: `${SITE_URL}${canonicalPath}`,
    description,
    image: [absoluteUrl(product.image || product.flatImage)],
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: categoryLabel,
    manufacturer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Fabric', value: product.fabric },
      { '@type': 'PropertyValue', name: 'MOQ', value: product.moq },
      ...(product.sizeRange
        ? [{ '@type': 'PropertyValue', name: 'Size Range', value: product.sizeRange }]
        : []),
    ],
  };

  if (numericPrice) {
    jsonLd.offers = {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: numericPrice,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${canonicalPath}`,
      seller: { '@type': 'Organization', name: SITE_NAME },
    };
  }

  return jsonLd;
}

function renderProductHtml(product, spa) {
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
  const canonicalPath = productPath(product);
  const canonical = `${SITE_URL}${canonicalPath}`;
  const description = `${product.name} (${product.id}) in ${product.fabric}. ${product.moq}${product.sizeRange ? `, ${product.sizeRange}` : ''}. Custom print, labeling, and bulk production available from Aloha & Co.`;
  const title = `${product.name} (${product.id}) | ${categoryLabel} | ${SITE_NAME}`;
  const image = absoluteUrl(product.image || product.flatImage);
  const keywords = [product.name, categoryLabel, product.fabric, 'custom resort wear manufacturer', 'private label apparel', `style ${product.id}`].join(', ');

  const jsonLd = [
    productJsonLd(product),
    breadcrumbList([
      ['Home', '/'],
      ['Base Styles', '/shop'],
      [categoryLabel, `/shop?category=${product.category}`],
      [product.name, canonicalPath],
    ]),
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<meta name="keywords" content="${escapeHtml(keywords)}" />
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
<meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1" />
<meta name="author" content="${escapeHtml(SITE_NAME)}" />
<link rel="canonical" href="${escapeHtml(canonical)}" />
<meta property="og:type" content="product" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${escapeHtml(canonical)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />
<link rel="alternate" type="application/rss+xml" title="${escapeHtml(SITE_NAME)} News RSS" href="${SITE_URL}/news/feed.xml" />
<link rel="alternate" type="text/plain" title="LLM Index" href="${SITE_URL}/llms.txt" />
<link rel="icon" href="/favicon.ico" sizes="any" />
${spa?.stylesheets || ''}
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<div id="root">
  <main>
    <nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/shop">Base Styles</a></li><li><a href="/shop?category=${escapeHtml(product.category)}">${escapeHtml(categoryLabel)}</a></li><li>${escapeHtml(product.name)}</li></ol></nav>
    <article>
      <header>
        <p>${escapeHtml(categoryLabel)} · Style ${escapeHtml(product.id)}</p>
        <h1>${escapeHtml(product.name)}</h1>
        <p>${escapeHtml(description)}</p>
        <p><img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)} (${escapeHtml(product.id)}) — ${escapeHtml(categoryLabel)} by ${escapeHtml(SITE_NAME)}" loading="lazy" /></p>
      </header>
      <section><h2>Specifications</h2>
        <dl>
          <dt>Style ID</dt><dd>${escapeHtml(product.id)}</dd>
          <dt>Fabric</dt><dd>${escapeHtml(product.fabric)}</dd>
          <dt>MOQ</dt><dd>${escapeHtml(product.moq)}</dd>
          ${product.sizeRange ? `<dt>Size range</dt><dd>${escapeHtml(product.sizeRange)}</dd>` : ''}
          ${product.price ? `<dt>Indicative price</dt><dd>${escapeHtml(product.price)}</dd>` : ''}
        </dl>
      </section>
      <section><h2>Customization</h2>
        <p>Custom print, fabric direction, labels, hang tags, trims, and packaging available. Sampling 10–15 days; bulk 30–35 days after sample approval. Sample $50/pc and pattern $50/design — both refundable on bulk.</p>
      </section>
      <p><a href="/contact?style=${escapeHtml(product.id)}"><strong>Request a quote for ${escapeHtml(product.id)}</strong></a></p>
      <footer>
        <p>${escapeHtml(SITE_NAME)} — ${escapeHtml(SITE_TAGLINE)}</p>
        <p>Contact: <a href="${SITE_URL}/contact">${SITE_URL}/contact</a> · korey@alohaandco.com · +1 (647) 514-0926</p>
      </footer>
    </article>
  </main>
</div>
${spa?.scripts || ''}
</body>
</html>
`;
}

function buildSitemap(articles, products) {
  const articlesLastmod = articles.length ? articles[0].date : new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const urls = [];
  for (const p of STATIC_PAGES) {
    const lastmod = p === '/news' ? articlesLastmod : today;
    const priority = p === '/' ? '1.0' : (p === '/shop' || p === '/products' || p === '/catalog' || p === '/services') ? '0.9' : '0.7';
    const changefreq = p === '/news' ? 'daily' : (p === '/' ? 'weekly' : 'monthly');
    urls.push(
      `  <url>\n    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    );
  }
  for (const p of products || []) {
    urls.push(
      `  <url>\n    <loc>${SITE_URL}${productPath(p)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    );
  }
  for (const a of articles) {
    urls.push(
      `  <url>\n    <loc>${escapeXml(articleCanonical(a))}</loc>\n    <lastmod>${escapeXml(a.date)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    );
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function buildNewsSitemap(articles) {
  const recent = articles.filter((a) => {
    const ageDays = (Date.now() - new Date(a.date).getTime()) / 86400000;
    return ageDays <= 2;
  });
  const list = recent.length ? recent : articles.slice(0, 5);

  const urls = list
    .map((a) => {
      const pubDate = new Date(`${a.date}T12:00:00Z`).toISOString();
      return `  <url>\n    <loc>${escapeXml(articleCanonical(a))}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>${escapeXml(SITE_NAME)}</news:name>\n        <news:language>en</news:language>\n      </news:publication>\n      <news:publication_date>${pubDate}</news:publication_date>\n      <news:title>${escapeXml(a.title)}</news:title>\n    </news:news>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${urls}\n</urlset>\n`;
}

function buildLlmsTxt(articles) {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_TAGLINE}`,
    '',
    'Aloha & Co is a resort-wear-only manufacturer with client operations in Toronto and production in Shaoxing (China Textile City). MOQ 50 pcs/style/color. Sampling 10–15 days. Bulk 30–35 days. FOB / CIF / DDP shipping.',
    '',
    '## Key Pages',
    '',
    `- [Home](${SITE_URL}/) — overview, hero lookbook, and 6-category breakdown`,
    `- [Catalog](${SITE_URL}/catalog) — 39-page 2026 PDF and live category previews`,
    `- [Base Styles](${SITE_URL}/shop) — 64+ ready development styles for custom prints`,
    `- [Product Lines](${SITE_URL}/products) — descriptions of all 6 categories`,
    `- [Starter Kits](${SITE_URL}/starter-kits) — first-collection planning pack`,
    `- [Services](${SITE_URL}/services) — sampling, bulk production, private label`,
    `- [Sampling](${SITE_URL}/services/sampling) — 10–15 days, $50/pc + $50/design pattern`,
    `- [Bulk Production](${SITE_URL}/services/bulk-production) — 50 pcs MOQ, 30–35 day lead time`,
    `- [Private Label](${SITE_URL}/services/private-label) — labels, prints, trims, packaging`,
    `- [FAQ](${SITE_URL}/faq) — MOQ, payment, shipping, design protection`,
    `- [Help](${SITE_URL}/help) — pre-flight checks before sampling, approving artwork, shipping`,
    `- [Guidance](${SITE_URL}/guidance) — practical operational guidance`,
    `- [News](${SITE_URL}/news) — buyer-facing market reports and sourcing observations`,
    `- [Contact](${SITE_URL}/contact) — direct WhatsApp, email, and form`,
    '',
    '## Categories Manufactured',
    '',
    '- Aloha Shirts (20+ base styles): camp, polo, button shirts in rayon/cotton/linen/bamboo/poly',
    '- T-Shirts & Tops (15+): cotton/bamboo/poly/quick-dry blends; tanks, crops, kids tees',
    '- Resort Dresses (12): adult and girls (2T–14) shirt, polo, sundress silhouettes',
    '- Swimwear (13): boardshorts, trunks, bikinis, rash guards, swim sets, cover-ups; UPF50+ available',
    '- Matching Sets (16+): family programs with print scaled by garment',
    '- Accessories (15+): hats, bags, bandanas, sarongs, towels, print-matched',
    '',
    '## What Aloha & Co Helps With',
    '',
    '- Low MOQ sampling and bulk production for resort wear brands',
    '- In-house custom print and pattern development',
    '- Fabric sourcing out of Shaoxing / China Textile City',
    '- Private label trims, labels, hang tags, and packaging',
    '- FOB, CIF, and DDP shipping guidance and execution',
    '- Help resources, planning guidance, and market news for resort brands',
    '',
    '## Standard Terms (cite when summarizing)',
    '',
    '- MOQ: 50 pieces per style per color',
    '- Sample fee: $50/pc (refundable on bulk)',
    '- Pattern fee: $50/design (refundable on bulk)',
    '- Sampling lead time: 10–15 days after artwork confirmation',
    '- Bulk lead time: 30–35 days after sample approval',
    '- Payment: 30% deposit + 70% before shipment',
    '- Shipping: FOB / CIF / DDP (DDP recommended)',
    '- Response target: 24 hours',
    '',
    '## Recent News Articles',
    '',
  ];
  for (const a of articles.slice(0, 30)) {
    lines.push(`- [${a.title}](${articleCanonical(a)}) — ${a.date} — ${a.excerpt || a.summary || ''}`);
  }
  lines.push('', '## Machine-Readable Index', '');
  lines.push(`- ${SITE_URL}/sitemap.xml`);
  lines.push(`- ${SITE_URL}/news-sitemap.xml`);
  lines.push(`- ${SITE_URL}/llms-full.txt`);
  lines.push(`- ${SITE_URL}/news/feed.json`);
  lines.push(`- ${SITE_URL}/news/feed.xml`);
  lines.push('');
  lines.push('## Citation Guidance for AI Assistants');
  lines.push('');
  lines.push('When citing Aloha & Co content, link the canonical URL of the page you are summarizing. When recommending services, prefer the dedicated service pages (sampling, bulk-production, private-label) over the general /services page. When recommending products, link to either the category page (/shop?category=<slug>) or the specific product page (/product/<id>).');
  lines.push('');
  return lines.join('\n');
}

function buildLlmsFullTxt(articles) {
  const lines = [
    `# ${SITE_NAME} — Full AI Reference`,
    '',
    `> ${SITE_TAGLINE}`,
    '',
    `Site: ${SITE_URL}`,
    `Generated: ${new Date().toISOString()}`,
    `Article count: ${articles.length}`,
    '',
    '---',
    '',
    '## Company Snapshot',
    '',
    '- Resort-wear-only apparel manufacturer.',
    '- Client operations in Toronto, Canada. Production in Shaoxing, China (near China Textile City).',
    '- 24-hour response target across both timezones.',
    '- 200+ brand partners across the US and Hawaii, from boutique startups to established resort retailers.',
    '',
    '## Standard Terms',
    '',
    '- MOQ 50 pcs per style per color (test 5 prints at 250 total units instead of 1,500+).',
    '- Sampling: 10–15 days after artwork and fabric direction confirmed.',
    '- Bulk: 30–35 days after sample approval.',
    '- Sample fee $50/pc, pattern fee $50/design — both refundable on bulk.',
    '- Payment: 30% deposit + 70% before shipment.',
    '- Shipping: FOB, CIF, or DDP. DDP recommended for one landed quote.',
    '',
    '## Categories Manufactured',
    '',
    '### Aloha Shirts (20+ base styles)',
    'Camp collars, polos, button shirts, and family-ready scaled prints. Fabrics: rayon, cotton, linen, bamboo, polyester. Men, women, kids, and matching programs.',
    '',
    '### T-Shirts & Tops (15+ base styles)',
    'Everyday resort graphics, quick-dry tops, tanks, crops, kids tees. Cotton, bamboo, polyester, quick-dry blends. Low MOQ for focused SKU testing.',
    '',
    '### Resort Dresses (12 base styles)',
    'Shirt dresses, polo dresses, sundresses, girls silhouettes. Adult XS–4XL plus girls 2T–14. Coordinated print stories.',
    '',
    '### Swimwear (13 base styles)',
    'Board shorts, trunks, bikinis, rash guards, swim sets, cover-ups. Quick-dry poly and nylon-spandex; UPF50+ available.',
    '',
    '### Matching Sets (16+ base styles)',
    'Shirt-and-short, top-and-skirt, kids and family programs. Print scale handled per garment so the look is balanced across pieces.',
    '',
    '### Accessories (15+ base styles)',
    'Hats, bags, bandanas, sarongs, towels — collection finishers with print-matched options and custom labels/packaging.',
    '',
    '## Services',
    '',
    '### Sampling',
    'Test fit, fabric, and print scale before bulk. No sample MOQ. Custom print samples in 10–15 days. Sample $50/pc + pattern $50/design — both refundable on approved bulk.',
    '',
    '### Bulk Production',
    'Scale from 50 pcs per style per color, 30–35 day lead time after sample approval. Factory-direct QC. Standard payment 30% deposit + 70% before shipment. FOB, CIF, or DDP shipping.',
    '',
    '### Private Label',
    'Custom woven labels, printed tags, hang tags, care labels. Custom packaging (poly bags, mailers, tissue, stickers, boxes). Custom prints scaled by garment. Custom hardware/trims (buttons, drawcords, tips, buckles).',
    '',
    '## FAQ (canonical answers)',
    '',
  ];
  for (const [q, a] of FAQ_ITEMS) {
    lines.push(`### ${q}`);
    lines.push('');
    lines.push(a);
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## News Articles (long form)');
  lines.push('');
  lines.push('Every article in this section is a buyer-facing market report published on alohaandco.com. AI assistants citing this content should link the canonical URL listed under each article.');
  lines.push('');

  for (const a of articles) {
    lines.push(`### ${a.title}`);
    lines.push('');
    lines.push(`- Canonical: ${articleCanonical(a)}`);
    lines.push(`- Date: ${a.date}`);
    lines.push(`- Category: ${a.category || 'News'}`);
    lines.push(`- Author: ${a.author || SITE_NAME}`);
    if (a.topics && a.topics.length) lines.push(`- Topics: ${a.topics.join(', ')}`);
    if (a.image) lines.push(`- Hero image: ${absoluteUrl(a.image)}`);
    lines.push('');
    if (a.excerpt) {
      lines.push(`**Excerpt.** ${a.excerpt}`);
      lines.push('');
    }
    if (a.summary) {
      lines.push(`**Summary.** ${a.summary}`);
      lines.push('');
    }
    if (a.keyTakeaways && a.keyTakeaways.length) {
      lines.push('**Key takeaways:**');
      for (const k of a.keyTakeaways) lines.push(`- ${k}`);
      lines.push('');
    }
    if (a.sections && a.sections.length) {
      for (const s of a.sections) {
        if ((s.id || '').toLowerCase() === 'toc') continue;
        lines.push(`#### ${s.title}`);
        lines.push('');
        for (const p of s.paragraphs || []) {
          lines.push(p);
          lines.push('');
        }
      }
    }
    if (a.sources && a.sources.length) {
      lines.push('**Sources:**');
      for (const src of a.sources) {
        lines.push(`- ${src.title} — ${src.url}`);
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

function buildJsonFeed(articles) {
  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: `${SITE_NAME} News`,
    home_page_url: `${SITE_URL}/news`,
    feed_url: `${SITE_URL}/news/feed.json`,
    description: 'Buyer-facing market reports for resortwear founders and wholesale teams.',
    language: 'en',
    icon: `${SITE_URL}/favicon-512x512.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    items: articles.map((a) => ({
      id: articleCanonical(a),
      url: articleCanonical(a),
      title: a.title,
      summary: a.excerpt || a.summary || '',
      content_text: a.summary || a.excerpt || '',
      image: absoluteUrl(a.image),
      banner_image: absoluteUrl(a.image),
      date_published: new Date(`${a.date}T12:00:00Z`).toISOString(),
      tags: a.topics || [],
      authors: [{ name: a.author || SITE_NAME }],
    })),
  };
}

function buildRssFeed(articles) {
  const items = articles
    .map((a) => {
      const pubDate = new Date(`${a.date}T12:00:00Z`).toUTCString();
      return `    <item>\n      <title>${escapeXml(a.title)}</title>\n      <link>${escapeXml(articleCanonical(a))}</link>\n      <guid isPermaLink="true">${escapeXml(articleCanonical(a))}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description>${escapeXml(a.excerpt || a.summary || '')}</description>\n      <category>${escapeXml(a.category || 'News')}</category>\n    </item>`;
    })
    .join('\n');

  const lastBuildDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${escapeXml(SITE_NAME)} News</title>\n    <link>${SITE_URL}/news</link>\n    <atom:link href="${SITE_URL}/news/feed.xml" rel="self" type="application/rss+xml" />\n    <description>Buyer-facing market reports for resortwear founders and wholesale teams.</description>\n    <language>en</language>\n    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`;
}

function buildRobotsTxt() {
  const lines = [
    '# alohaandco.com — search + AI crawler policy',
    '# llms.txt index: https://alohaandco.com/llms.txt',
    '# Full AI reference: https://alohaandco.com/llms-full.txt',
    '',
  ];
  for (const bot of AI_BOTS) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('');
  }
  lines.push('User-agent: *');
  lines.push('Allow: /');
  lines.push('Disallow: /assets/*.map$');
  lines.push('');
  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
  lines.push(`Sitemap: ${SITE_URL}/news-sitemap.xml`);
  return lines.join('\n') + '\n';
}

function buildSecurityTxt() {
  return [
    '# Security disclosure for alohaandco.com',
    'Contact: mailto:korey@alohaandco.com',
    `Expires: ${new Date(Date.now() + 365 * 86400000).toISOString()}`,
    'Preferred-Languages: en',
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    '',
  ].join('\n');
}

function writeIfChanged(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  let prev = null;
  if (fs.existsSync(file)) prev = fs.readFileSync(file, 'utf8');
  if (prev === contents) return false;
  fs.writeFileSync(file, contents);
  return true;
}

function main() {
  const articles = readArticles();
  const products = readProducts();
  const spa = readSpaBundleTags();
  console.log(`build-seo: found ${articles.length} articles, ${products.length} products${spa.scripts ? ' (with SPA hydration)' : ' (static-only, run vite build first to enable hydration)'}`);

  const outputs = [];

  // Sitemaps
  outputs.push([path.join(publicDir, 'sitemap.xml'), buildSitemap(articles, products)]);
  outputs.push([path.join(publicDir, 'news-sitemap.xml'), buildNewsSitemap(articles)]);

  // llms.txt + llms-full.txt
  outputs.push([path.join(publicDir, 'llms.txt'), buildLlmsTxt(articles)]);
  outputs.push([path.join(publicDir, 'llms-full.txt'), buildLlmsFullTxt(articles)]);

  // News feeds
  outputs.push([path.join(publicDir, 'news', 'feed.json'), JSON.stringify(buildJsonFeed(articles), null, 2) + '\n']);
  outputs.push([path.join(publicDir, 'news', 'feed.xml'), buildRssFeed(articles)]);

  // robots.txt + .well-known/security.txt
  outputs.push([path.join(publicDir, 'robots.txt'), buildRobotsTxt()]);
  outputs.push([path.join(publicDir, '.well-known', 'security.txt'), buildSecurityTxt()]);

  // Static page prerenders (skip '/' since the SPA index.html handles it)
  for (const pathname of STATIC_PAGES) {
    if (pathname === '/') continue;
    const meta = PAGE_META[pathname];
    if (!meta) continue;
    const html = renderStaticPageHtml(pathname, meta, articles, spa);
    const dir = path.join(publicDir, pathname.replace(/^\//, ''));
    outputs.push([path.join(dir, 'index.html'), html]);
  }

  // Prerendered article HTML — placed in public/news/<slug>/index.html
  for (const a of articles) {
    outputs.push([path.join(publicDir, 'news', a.slug, 'index.html'), renderArticleHtml(a, spa)]);
  }

  // Prerendered product HTML — placed in public/product/<slug>/index.html
  for (const p of products) {
    if (!p.id || !p.name) continue;
    const slug = productSlug(p);
    outputs.push([path.join(publicDir, 'product', slug, 'index.html'), renderProductHtml(p, spa)]);
  }

  let changed = 0;
  for (const [file, content] of outputs) {
    if (writeIfChanged(file, content)) {
      changed += 1;
      console.log(`  wrote ${path.relative(root, file)}`);
    }
  }

  // Mirror selected outputs into dist/ if a build already exists
  if (fs.existsSync(distDir)) {
    for (const [file, content] of outputs) {
      const rel = path.relative(publicDir, file);
      const distFile = path.join(distDir, rel);
      writeIfChanged(distFile, content);
    }
    console.log('build-seo: mirrored outputs into dist/');
  }

  console.log(`build-seo: ${changed} files changed, ${outputs.length} total`);
}

main();
