const fs = require('fs');
const path = require('path');
const XLSX = require('../alohaandco_platform/node_modules/xlsx');

const root = path.resolve(__dirname, '..');
const generatedPath = path.join(root, 'src/data/alohaCatalogProducts.generated.ts');
const promptPath = path.join(root, 'docs/image-prompts/4.8-aloha-catalog-prompts.json');
const sourceMapPath = path.join(root, 'docs/image-prompts/aloha-source-image-map.json');
const workbookPath = path.join(root, '4.8aloha_catalogs.xlsx');
const worksheetName = 'Website Page (~20 shown)';
const imageVersion = 'v=20260422-clean2';

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

function normalizeSizeRange(value) {
  return String(value || '').replace(/[–—−]/g, '-').replace(/\s+/g, ' ').trim();
}

function formatMoney(value) {
  if (!Number.isFinite(value)) return '';
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

function numericValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const text = String(value || '').replace(/,/g, '');
  if (/contact/i.test(text)) return null;
  const match = text.match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function tierLabel(value) {
  return String(value || '').replace(/PCS/i, ' pcs').replace(/\s+/g, ' ').trim();
}

function readWorkbookMeta() {
  const workbook = XLSX.readFile(workbookPath);
  const worksheet = workbook.Sheets[worksheetName];
  if (!worksheet) throw new Error(`Missing worksheet ${worksheetName}`);

  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
  const priceLabels = rows[1] || [];
  const metaByRow = new Map();

  rows.forEach((row, index) => {
    const productName = row[3];
    if (!productName) return;

    const excelRow = index + 1;
    const fobTiers = [13, 14, 15, 16]
      .map((col) => ({ label: tierLabel(priceLabels[col]), value: numericValue(row[col]) }))
      .filter((tier) => tier.label && tier.value !== null);
    const ddpTiers = [17, 18, 19, 20]
      .map((col) => ({ label: tierLabel(priceLabels[col]), value: numericValue(row[col]) }))
      .filter((tier) => tier.label && tier.value !== null);
    const minFob = Math.min(...fobTiers.map((tier) => tier.value));
    const minDdp = Math.min(...ddpTiers.map((tier) => tier.value));

    metaByRow.set(excelRow, {
      excelRow,
      sku: String(row[0] || '').trim(),
      category: normalizeCategory(row[1], productName),
      style: normalizeStyle(row[2], productName),
      productLine: `${normalizeCategory(row[1], productName)} / ${normalizeStyle(row[2], productName)}`,
      fabric: [row[5], row[7] ? `${row[7]}GSM` : '', row[6]]
        .filter(Boolean)
        .join(' / ')
        .replace(/\s+/g, ' ')
        .trim(),
      fit: titleCase(row[8]) || 'Regular',
      sizes: normalizeSizeRange(row[9]),
      moq: numericValue(row[10]) || 50,
      fobTiers,
      ddpTiers,
      minFob: Number.isFinite(minFob) ? minFob : null,
      minDdp: Number.isFinite(minDdp) ? minDdp : null,
    });
  });

  return metaByRow;
}

function extractLine(prompt, label, fallback = '') {
  const match = String(prompt || '').match(new RegExp(`${label}: ([^\\n]+)`));
  return match ? match[1].trim() : fallback;
}

function detailValue(product, label, fallback = '') {
  const prefix = `${label}: `;
  const value = product.details?.find((detail) => detail.startsWith(prefix));
  return value ? value.slice(prefix.length).trim() : fallback;
}

function modelSubject(category, style) {
  if (category === "Men's") return 'same male catalog model profile';
  if (category === "Women's") return 'same female catalog model profile';
  if (category === 'Boys' || category === 'Girls') return 'same age-appropriate child catalog model profile';
  if (style === 'Bags') return 'same neutral adult torso crop holding or wearing the accessory consistently';
  return 'same neutral catalog model profile';
}

function fallbackSilhouette(meta) {
  const style = `${meta.style} ${meta.name}`.toLowerCase();
  if (style.includes('polo')) return 'short-sleeve aloha polo with soft collar, half placket, relaxed commercial fit';
  if (style.includes('shirt')) return 'short-sleeve aloha shirt with structured collar, front placket, relaxed commercial fit';
  if (style.includes('dress')) return 'resort dress with clean garment construction and straight ecommerce presentation';
  if (style.includes('swimwear')) return 'swimwear garment with commercial modest fit and clean sample-room construction';
  if (style.includes('pants')) return 'resort beach pants or shorts with relaxed fit';
  return 'relaxed resort garment sample with clean wholesale construction';
}

function readSourceMap() {
  if (!fs.existsSync(sourceMapPath)) return new Map();
  const items = JSON.parse(fs.readFileSync(sourceMapPath, 'utf8'));
  return new Map(items.map((item) => [item.id, item]));
}

function isIgnoredBag(product, meta) {
  return /^XLSX-5[1-4]$/.test(product.id)
    || /bag/i.test(product.name)
    || meta.style === 'Bags'
    || /\/\s*Bags/i.test(meta.productLine || '');
}

function priceDetails(meta) {
  const details = [];
  if (meta.minFob !== null) details.push(`FOB as low as: ${formatMoney(meta.minFob)}`);
  meta.fobTiers.forEach((tier) => {
    details.push(`FOB ${tier.label}: ${formatMoney(tier.value)}`);
  });
  if (meta.minDdp !== null) details.push(`DDP as low as: ${formatMoney(meta.minDdp)}`);
  meta.ddpTiers.forEach((tier) => {
    details.push(`DDP ${tier.label}: ${formatMoney(tier.value)}`);
  });
  return details;
}

function getMeta(product, workbookMeta, sourceMeta) {
  const flat = product.imagePrompts?.flat || '';
  const sourceExcelRow = Number(sourceMeta?.excelRow || 0);
  const detailExcelRow = Number(detailValue(product, 'Excel Row', extractLine(flat, 'Excel row')));
  const excelRow = sourceExcelRow || detailExcelRow;
  const rowMeta = workbookMeta.get(excelRow) || {};

  const meta = {
    id: product.id,
    name: product.name,
    excelRow,
    category: rowMeta.category || detailValue(product, 'Category', extractLine(flat, 'Category')),
    style: rowMeta.style || detailValue(product, 'Style', extractLine(flat, 'Style')),
    fabric: rowMeta.fabric || product.fabric || detailValue(product, 'Fabric', extractLine(flat, 'Fabric')),
    fit: rowMeta.fit || detailValue(product, 'Fit', extractLine(flat, 'Fit')),
    sizes: rowMeta.sizes || product.sizeRange || detailValue(product, 'Size Range', extractLine(flat, 'Sizes')),
    productLine: rowMeta.productLine || product.productLine || '',
    moq: rowMeta.moq || Number(String(product.moq || '').match(/\d+/)?.[0]) || 50,
    fobTiers: rowMeta.fobTiers || [],
    ddpTiers: rowMeta.ddpTiers || [],
    minFob: rowMeta.minFob ?? null,
    minDdp: rowMeta.minDdp ?? null,
    sourceImage: sourceMeta?.sourceImage || '',
    sourceImagePath: sourceMeta?.sourceImagePath || '',
    silhouette: extractLine(flat, 'Garment construction', fallbackSilhouette({
      style: rowMeta.style || product.productLine || product.name,
      name: product.name,
    })),
    pattern: extractLine(flat, 'Color and print direction', 'tropical resort palette based on the Excel photo-column reference image'),
  };

  if (product.id === 'AL1212') {
    meta.style = 'Knitted DTY T-Shirt';
    meta.productLine = "Men's / T-Shirts";
    meta.silhouette = 'short-sleeve crew neck T-shirt, no collar, no placket, no buttons, smooth rib crew neck, regular performance tee fit';
    meta.pattern = 'deep dark teal knitted DTY T-shirt with muted blue hand-drawn resort chest graphic inspired by the provided FOUND AT SEA reference';
  }

  return meta;
}

function flatPrompt(meta) {
  const sourceReference = meta.sourceImage || 'provided Excel photo-column product image for this row';
  return [
    'Use case: ecommerce product image for Aloha catalog.',
    'Asset type: default product-only flat lay / packshot image, vertical 4:5.',
    '',
    `Product: ${meta.id} ${meta.name}`,
    `Excel row: ${meta.excelRow}`,
    `Category: ${meta.category}`,
    `Style: ${meta.style}`,
    `Fabric: ${meta.fabric}`,
    `Fit: ${meta.fit}`,
    `Sizes: ${meta.sizes}`,
    `Source reference image: ${sourceReference}`,
    '',
    `Garment construction: ${meta.silhouette}`,
    `Color and print direction: ${meta.pattern}`,
    '',
    'Reference method: use the provided Excel photo-column product image for this row as the style, silhouette, print, trim, and construction reference. Regenerate it as a new clean ecommerce asset; do not copy the original photo pixels, background, shadows, labels, or layout. Mimic a clean wholesale ecommerce product tile like Baliswim.',
    'Flat image rule: single front-facing product-only flat lay / packshot. No model, no mannequin, no hanger. For two-piece sets, lay the complete set neatly as one product.',
    '',
    'Scene and background: seamless studio background exactly #fbfaf7, matching the website product media background. No border, no black outline, no paper texture.',
    'Composition: centered product, front-facing, product fills 58-70% of the vertical frame, generous empty space above and below for the website UI to place SKU, title, and price. Natural soft shadow only.',
    'Photography style: photorealistic apparel product photography, crisp fabric edge, accurate seams, collar/placket/hem/strap construction, realistic fabric texture and print scale.',
    '',
    'Strict exclusions: no text, no SKU badge, no logo, no watermark, no price, no UI labels, no props, no lifestyle scene, no duplicate product, no back view unless explicitly requested for that SKU.',
  ].join('\n');
}

function modelPrompt(meta) {
  const sourceReference = meta.sourceImage || 'provided Excel photo-column product image for this row';
  return [
    'Use case: ecommerce hover image for Aloha catalog.',
    'Asset type: headless model image, vertical 4:5.',
    '',
    `Product: ${meta.id} ${meta.name}`,
    `Excel row: ${meta.excelRow}`,
    `Category: ${meta.category}`,
    `Style: ${meta.style}`,
    `Fabric: ${meta.fabric}`,
    `Fit: ${meta.fit}`,
    `Sizes: ${meta.sizes}`,
    `Source reference image: ${sourceReference}`,
    '',
    `Garment construction: ${meta.silhouette}`,
    `Color and print direction: ${meta.pattern}`,
    '',
    'Model consistency system:',
    "- Adult menswear uses the same male catalog model profile across every menswear SKU: medium-tan skin, average athletic build, straight shoulders, relaxed arms, neutral torso stance.",
    "- Adult womenswear uses the same female catalog model profile across every womenswear SKU: medium-tan skin, balanced commercial fit-model proportions, straight shoulders, relaxed arms, neutral torso stance.",
    "- Kids products use the same age-appropriate child catalog model profile for boys/girls products, fully clothed and neutral.",
    "- Accessories use the same neutral adult torso crop holding or wearing the item consistently.",
    '',
    `Reference method: use the provided Excel photo-column product image for this row as the style, silhouette, print, trim, and construction reference. Regenerate the same garment on the model as a new clean ecommerce asset; do not copy the original photo pixels, background, shadows, labels, or layout. Mimic the Baliswim hover image. The same garment from the flat image is worn on the model, front-facing, centered, clean catalog posture. Use ${modelSubject(meta.category, meta.style)}.`,
    'Headless crop: crop at the lower neck/base of neck only. Do not show chin, jaw, mouth, nose, eyes, hair, or face.',
    'Scene and background: seamless studio background exactly #fbfaf7, matching the website product media background. No border, no black outline, no paper texture.',
    'Composition: product and torso centered; front-facing standing pose; shoulders level; arms relaxed near hips or thighs; garment fully visible; product fills 70-84% of the vertical frame. Non-sexualized catalog presentation for swimwear.',
    'Photography style: photorealistic ecommerce model photography, soft even studio lighting, realistic fabric drape, exact same color/pattern scale as the flat image.',
    '',
    'Strict exclusions: no visible face, no expressive fashion pose, no crossed arms, no sitting, no text, no SKU badge, no logo, no watermark, no price, no props, no lifestyle background.',
  ].join('\n');
}

function productDetails(meta) {
  return [
    `Excel Row: ${meta.excelRow}`,
    `Style: ${meta.style}`,
    `Category: ${meta.category}`,
    `Fabric: ${meta.fabric}`,
    `Fit: ${meta.fit}`,
    `Size Range: ${meta.sizes}`,
    `MOQ: ${meta.moq} pcs`,
    ...priceDetails(meta),
    'Customization: custom print, private label, woven tag, hang tag and packaging available',
  ];
}

function sizeTokens(sizeRange) {
  const parts = String(sizeRange || '').split('-').map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts;
}

function generatedImagePath(id, kind) {
  return `/product-images/aloha-generated/${id}-${kind}.png?${imageVersion}`;
}

const source = fs.readFileSync(generatedPath, 'utf8');
const workbookMeta = readWorkbookMeta();
const sourceMap = readSourceMap();
const sourceProducts = extractArray(source, 'alohaCatalogProducts');
const preparedProducts = sourceProducts
  .map((product) => {
    const meta = getMeta(product, workbookMeta, sourceMap.get(product.id));
    return { product, meta };
  })
  .filter(({ product, meta }) => !isIgnoredBag(product, meta))
  .map(({ product, meta }) => {
    const flat = flatPrompt(meta);
    const model = modelPrompt(meta);
    const price = meta.minFob !== null ? `as low as ${formatMoney(meta.minFob)}` : product.price;
    const samplePrice = meta.ddpTiers[0]?.value !== undefined ? formatMoney(meta.ddpTiers[0].value) : product.samplePrice;

    const nextProduct = {
      ...product,
      fabric: meta.fabric,
      moq: `MOQ ${meta.moq}`,
      price,
      samplePrice,
      sizeRange: meta.sizes,
      productLine: meta.productLine,
      image: generatedImagePath(product.id, 'flat'),
      hoverImage: generatedImagePath(product.id, 'model'),
      detailImage: generatedImagePath(product.id, 'flat'),
      sizes: sizeTokens(meta.sizes),
      details: productDetails(meta),
      imagePrompts: {
        sourceImage: meta.sourceImage,
        flat,
        model,
        detail: flat,
      },
    };

    return {
      product: nextProduct,
      promptEntry: {
        sourceImage: meta.sourceImage,
        sourceImagePath: meta.sourceImagePath,
        id: nextProduct.id,
        name: nextProduct.name,
        excelRow: meta.excelRow,
        flat,
        model,
      },
    };
  });

const products = preparedProducts.map((item) => item.product);

const productIds = new Set(products.map((product) => product.id));
const featuredIds = extractArray(source, 'alohaCatalogFeaturedIds').filter((id) => productIds.has(id));
const capabilities = extractArray(source, 'alohaCatalogCapabilities').map((capability) => {
  if (capability.title === 'Image System') {
    return {
      ...capability,
      value: 'Excel photo-column images used as per-row style references; regenerated flat product images and headless model hover images; no direct reuse of Excel embedded image pixels',
    };
  }
  if (capability.title === 'Size Range') {
    return {
      ...capability,
      value: [...new Set(products.map((product) => product.sizeRange).filter(Boolean))].join(' / '),
    };
  }
  return capability;
});

const sectionMap = new Map();
for (const product of products) {
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

export const alohaCatalogProducts: Product[] = ${JSON.stringify(products, null, 2)};

export const alohaCatalogFeaturedIds: string[] = ${JSON.stringify(featuredIds, null, 2)};

export const alohaCatalogProductLineSections: ProductLineSection[] = ${JSON.stringify(sections, null, 2)};

export const alohaCatalogCapabilities: CategoryCapability[] = ${JSON.stringify(capabilities, null, 2)};
`;

fs.writeFileSync(generatedPath, ts);
fs.writeFileSync(
  promptPath,
  `${JSON.stringify(preparedProducts.map((item) => item.promptEntry), null, 2)}\n`,
);

console.log(`Applied unified image prompt template to ${products.length} products.`);
