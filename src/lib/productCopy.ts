// Single source of truth for the buyer-facing product description paragraph.
// Used by ProductDetail.tsx (visible copy), RouteSeo.tsx (meta + JSON-LD),
// and the prerender in scripts/build-seo.cjs (mirrored implementation —
// keep the two in sync if you change either).

export type ProductCopySource = {
  name: string;
  fabric: string;
  moq?: string;
  sizeRange?: string;
  productLine?: string;
  category: string;
};

const AUDIENCE_BY_CATEGORY: Record<string, string> = {
  'aloha-shirts': 'aloha programs, resort retail, and corporate uniform buyers',
  'tshirts-tops': 'lifestyle, beach club, and resort merch programs',
  'resort-dresses': 'boutique resort and beachwear labels',
  'swimwear': 'swim brands, hotel merch, and beach club programs',
  'matching-sets': 'family matching, twinning, and gift programs',
  'accessories': 'resort merchandising and gift programs',
};

const DEFAULT_AUDIENCE = 'resort wear brands and private-label buyers';

function moqCount(moq?: string): string {
  const match = (moq || '').match(/\d+/);
  return match ? match[0] : '50';
}

export function buildProductDescription(p: ProductCopySource): string {
  const audience = AUDIENCE_BY_CATEGORY[p.category] || DEFAULT_AUDIENCE;
  const sizes = p.sizeRange ? ` Sized ${p.sizeRange}.` : '';
  const lineHint = p.productLine ? ` ${p.productLine.trim()}.` : '';

  return `${p.name} for ${audience}.${lineHint} ${p.fabric}.${sizes} MOQ ${moqCount(p.moq)} pcs per style per color. Customizable prints, fabrics, woven labels, hang tags, trims, and packaging. Sampling 10–15 days; bulk 30–35 days after sample approval.`
    .replace(/\s+/g, ' ')
    .trim();
}

// Short single-sentence form used in <meta name="description"> where the
// long paragraph would push past Google's 155–160 char render limit.
export function buildProductMetaDescription(p: ProductCopySource): string {
  const audience = AUDIENCE_BY_CATEGORY[p.category] || DEFAULT_AUDIENCE;
  const sizes = p.sizeRange ? `, ${p.sizeRange}` : '';
  return `${p.name} in ${p.fabric}${sizes}. MOQ ${moqCount(p.moq)} for ${audience}. Custom prints, labels, and bulk production from Aloha & Co.`;
}
