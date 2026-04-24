const fs = require('fs');
const path = require('path');
const XLSX = require('../alohaandco_platform/node_modules/xlsx');

const root = path.resolve(__dirname, '..');
const generatedPath = path.join(root, 'src/data/alohaCatalogProducts.generated.ts');
const promptPath = path.join(root, 'docs/image-prompts/4.8-aloha-catalog-prompts.json');
const workbookPath = path.join(root, '4.8aloha_catalogs.xlsx');

function extractArray(source, exportName) {
  const exportStart = source.indexOf(`export const ${exportName}`);
  if (exportStart === -1) throw new Error(`Missing export ${exportName}`);
  const arrStart = source.indexOf('[', source.indexOf('=', exportStart));
  const arrEnd = source.indexOf('\n];', arrStart) + 2;
  return JSON.parse(source.slice(arrStart, arrEnd));
}

function titleCase(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase());
}

function normalizeCategory(value, productName) {
  const raw = String(value || '').toLowerCase();
  if (raw.includes('women')) return "Women's";
  if (raw.includes('girl')) return 'Girls';
  if (raw.includes('boy')) return 'Boys';
  if (raw.includes('men')) return "Men's";
  if (/bag/i.test(productName)) return 'Accessories';
  return 'Unisex';
}

function normalizeStyle(value, productName) {
  const raw = String(value || '').trim();
  const name = String(productName || '').toLowerCase();

  if (/full\s+bottom\s+shirt/i.test(raw)) return 'Full Button Shirt';
  if (raw) return titleCase(raw);
  if (name.includes('swimwear')) return 'Swimwear';
  if (name.includes('dress')) return 'Dresses';
  if (name.includes('pants')) return 'Bottoms';
  if (name.includes('t-shirt') || name.includes('shirt')) return 'T-Shirts';
  if (name.includes('top')) return 'Tops';
  if (name.includes('bag')) return 'Bags';
  return 'Core Styles';
}

function replaceDetail(details, label, value) {
  const prefix = `${label}: `;
  const next = details.map((detail) => detail.startsWith(prefix) ? `${prefix}${value}` : detail);
  if (!next.some((detail) => detail.startsWith(prefix))) next.push(`${prefix}${value}`);
  return next;
}

function extractPromptLine(prompt, label, fallback) {
  const match = String(prompt || '').match(new RegExp(`${label}: ([^\\n]+)`));
  return match ? match[1].trim() : fallback;
}

function modelSubject(category, style) {
  if (category === "Men's") return 'adult male headless model wearing the product sample as the hero garment';
  if (category === "Women's") return 'adult female headless model wearing the product sample as the hero garment';
  if (category === 'Boys' || category === 'Girls') {
    return 'child headless model, fully clothed, age-appropriate neutral catalog pose, wearing the product sample as the hero garment';
  }
  if (style === 'Bags') return 'adult headless model holding or wearing the bag naturally at torso level as the hero accessory';
  return 'adult headless model wearing or holding the product sample as the hero item';
}

function buildPrompts(product, meta) {
  const oldFlat = product.imagePrompts?.flat || '';
  const baseSilhouette = extractPromptLine(oldFlat, 'Base silhouette from Excel', 'relaxed resort garment sample with clean wholesale construction');
  const printDirection = extractPromptLine(oldFlat, 'Color/pattern direction from Excel template', 'custom tropical resort print direction inspired by the Excel template');
  const subject = modelSubject(meta.category, meta.style);

  const shared = [
    'Use case: product-mockup',
    'Primary request: Regenerate a clean ecommerce asset from the Excel product template details. Do not reuse, copy, trace, or preserve any original Excel image pixels.',
    `Product: ${product.id} ${product.name}`,
    `Excel row: ${meta.excelRow}`,
    `Category: ${meta.category}`,
    `Style: ${meta.style}`,
    `Fabric: ${meta.fabric}`,
    `Fit: ${meta.fit}`,
    `Sizes: ${meta.sizes}`,
    `Base silhouette from Excel: ${baseSilhouette}`,
    `Color/pattern direction from Excel template: ${printDirection}`,
    'No brand text, no SKU badge, no watermark, no logos, no props.',
  ];

  const flat = [
    'Use case: product-mockup',
    'Asset type: product flat-lay image for ecommerce category card, 4:5 vertical crop',
    ...shared.slice(1),
    'Scene/backdrop: pure white studio background with very soft grounding shadow.',
    'Composition/framing: product only, centered, front-facing, no mannequin and no human body; product fills 68-76% of the frame with generous white space like the reference flat product page.',
    'Style/medium: photorealistic wholesale apparel sample photography, crisp garment edges, accurate fabric texture and construction.',
    'Avoid: lifestyle scene, hanger, folded garment, text labels, duplicate products, cropped hems or sleeves.',
  ].join('\n');

  const model = [
    'Use case: product-mockup',
    'Asset type: headless model hover image for ecommerce category card, 4:5 vertical crop',
    ...shared.slice(1),
    `Subject: ${subject}.`,
    'Scene/backdrop: pure white studio background.',
    'Composition/framing: headless crop like the reference: top edge at the lower neck only, no chin, no jaw, no mouth and no face; shoulders/body straight to camera, arms relaxed down near hips or thighs, garment fully visible.',
    'Style/medium: photorealistic ecommerce apparel photography, clean commercial catalog pose, natural body proportions, fabric drape and print scale consistent with the flat image.',
    'Lighting/mood: soft even studio lighting, neutral white balance, crisp edges.',
    'Avoid: visible head or face, expressive fashion pose, crossed arms, sitting, beach background, sunglasses, jewelry, text, logo, watermark, props.',
  ].join('\n');

  return { flat, model, detail: flat };
}

const workbook = XLSX.readFile(workbookPath);
const worksheet = workbook.Sheets['Website Page (~20 shown)'];
const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

const rowMeta = new Map();
rows.forEach((row, index) => {
  const productName = row[3];
  if (!productName) return;

  const excelRow = index + 1;
  const category = normalizeCategory(row[1], productName);
  const style = normalizeStyle(row[2], productName);
  rowMeta.set(excelRow, {
    excelRow,
    category,
    style,
    productLine: `${category} / ${style}`,
    fabric: [row[5], row[7] ? `${row[7]}GSM` : '', row[6]].filter(Boolean).join(' / ').replace(/\s+/g, ' ').trim(),
    fit: titleCase(row[8]) || 'Regular',
    sizes: String(row[9] || '').replace(/[–—]/g, '-'),
  });
});

const source = fs.readFileSync(generatedPath, 'utf8');
const products = extractArray(source, 'alohaCatalogProducts');
const featuredIds = extractArray(source, 'alohaCatalogFeaturedIds');
const capabilities = extractArray(source, 'alohaCatalogCapabilities');

const normalizedProducts = products.map((product) => {
  const excelRowDetail = (product.details || []).find((detail) => detail.startsWith('Excel Row: '));
  const excelRow = Number(excelRowDetail?.replace('Excel Row: ', ''));
  const meta = rowMeta.get(excelRow);
  if (!meta) return product;

  let details = [...(product.details || [])];
  details = replaceDetail(details, 'Style', meta.style);
  details = replaceDetail(details, 'Category', meta.category);
  details = replaceDetail(details, 'Fabric', meta.fabric);
  details = replaceDetail(details, 'Fit', meta.fit);
  details = replaceDetail(details, 'Size Range', meta.sizes);

  return {
    ...product,
    fabric: meta.fabric,
    sizeRange: meta.sizes,
    productLine: meta.productLine,
    details,
    imagePrompts: buildPrompts(product, meta),
  };
});

const sectionMap = new Map();
for (const product of normalizedProducts) {
  if (!sectionMap.has(product.productLine)) {
    sectionMap.set(product.productLine, {
      title: product.productLine,
      subtitle: `Excel template styles from ${product.productLine}`,
      productIds: [],
    });
  }
  sectionMap.get(product.productLine).productIds.push(product.id);
}

const sections = [...sectionMap.values()];

const ts = `import type { CategoryCapability, Product, ProductLineSection } from './products';

export const alohaCatalogProducts: Product[] = ${JSON.stringify(normalizedProducts, null, 2)};

export const alohaCatalogFeaturedIds: string[] = ${JSON.stringify(featuredIds, null, 2)};

export const alohaCatalogProductLineSections: ProductLineSection[] = ${JSON.stringify(sections, null, 2)};

export const alohaCatalogCapabilities: CategoryCapability[] = ${JSON.stringify(capabilities, null, 2)};
`;

fs.writeFileSync(generatedPath, ts);
fs.writeFileSync(
  promptPath,
  `${JSON.stringify(normalizedProducts.map((product) => ({
    id: product.id,
    name: product.name,
    excelRow: Number(product.details.find((detail) => detail.startsWith('Excel Row: ')).replace('Excel Row: ', '')),
    flat: product.imagePrompts.flat,
    model: product.imagePrompts.model,
  })), null, 2)}\n`,
);

console.log(`Normalized ${normalizedProducts.length} products and ${sections.length} product-line sections.`);
