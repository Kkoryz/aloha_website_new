import {
  buildAlohaImagePrompts,
  buildResortProductImagePrompts,
  type AlohaImagePromptInput,
  type ProductImagePrompts,
  type ResortImagePromptInput,
} from './productImagePrompts';
import {
  alohaCatalogCapabilities,
  alohaCatalogProducts,
} from './alohaCatalogProducts.generated';

export interface Product {
  id: string;
  name: string;
  fabric: string;
  moq: string;
  image: string;
  hoverImage?: string;
  detailImage?: string;
  price?: string;
  samplePrice?: string;
  subtitle?: string;
  sizeRange?: string;
  productLine?: string;
  alsoAvailable?: string;
  colors?: string[];
  sizes?: string[];
  details?: string[];
  imagePrompts?: ProductImagePrompts;
}

export const categoryLabels: Record<string, string> = {
  'aloha-shirts': 'Aloha Shirts',
  'tshirts-tops': 'T-Shirts & Tops',
  'resort-dresses': 'Resort Dresses',
  'swimwear': 'Swimwear',
  'matching-sets': 'Matching Sets',
  'accessories': 'Accessories',
};

export interface ProductLineSection {
  title: string;
  subtitle: string;
  alsoAvailable?: string;
  productIds: string[];
}

export interface CategoryCapability {
  title: string;
  value: string;
}

export const categorySummaries: Record<string, string> = {
  'aloha-shirts': '20+ base styles | Rayon, cotton, linen, bamboo, polyester blends',
  'tshirts-tops': '15+ base styles | Cotton, bamboo, polyester, quick-dry blends',
  'resort-dresses': '12 base styles | Adult + girls shirt, polo, and sundress silhouettes',
  'swimwear': '19+ base styles | Quick-dry poly, nylon-spandex, UPF50+',
  'matching-sets': '16+ base styles | Coordinated family, couple and kids sets',
  'accessories': '15+ base styles | Hats, bags, bandanas, sarongs, towels',
};

export const featuredProductIds: Record<string, string[]> = {
  'aloha-shirts': [],
};

type MatchingSetPatternBase = {
  baseId: string;
  printDirection: string;
  palette: string;
};

const matchingSetPatternBases: Record<string, MatchingSetPatternBase> = {
  MS1001: {
    baseId: 'matching11.png',
    printDirection: 'soft watercolor palm-and-botanical wash with airy overlap; keep the exact same print across the shirt and shorts',
    palette: 'soft ivory, sea-glass blue, faded aqua, and warm sand',
  },
  MS1002: {
    baseId: 'matching5.png',
    printDirection: 'washed stripe-and-leaf tropical print with relaxed vertical rhythm; keep the exact same print across the shirt and shorts',
    palette: 'powder blue, ivory, pale sage, and warm sand',
  },
  MS1003: {
    baseId: 'matching8.png',
    printDirection: 'bold tropical collage blocks with layered leaves and postcard panels; keep the exact same print across the shirt and shorts',
    palette: 'deep navy, coral, peach, ochre, and soft cream',
  },
  MS1101: {
    baseId: 'matching3.png',
    printDirection: 'subtle tonal micro-botanical repeat suited to knitted DTY fabric; keep the exact same print across the polo and shorts',
    palette: 'muted sage, olive, and stone',
  },
  MSW2001: {
    baseId: 'matching1.png',
    printDirection: 'soft pastel botanical watercolor with open spacing; keep the exact same print across the top and shorts',
    palette: 'ivory, aqua, blush, and pale sand',
  },
  MSW2002: {
    baseId: 'matching9.png',
    printDirection: 'airy aqua-and-sand botanical watercolor with light spacing; keep the exact same print across the top and shorts',
    palette: 'ivory, seafoam, dusty aqua, and warm beige',
  },
  MSW2101: {
    baseId: 'matching10.png',
    printDirection: 'warm floral-botanical resort print with terracotta and olive foliage; keep the exact same print across the top and skirt',
    palette: 'warm ivory, terracotta, olive, muted gold, and soft peach',
  },
  MSW2102: {
    baseId: 'matching4.png',
    printDirection: 'blue coral-and-botanical resort print with open spacing; keep the exact same print across the top and wrap skirt',
    palette: 'ocean blue, coral, ivory, and soft leaf green',
  },
  MSK7001: {
    baseId: 'matching2.png',
    printDirection: 'playful blue tropical leaf print scaled down for childrenswear; keep the exact same print across the shirt and shorts',
    palette: 'cobalt blue, aqua, ivory, and leaf green',
  },
  MSK7002: {
    baseId: 'matching5.png',
    printDirection: 'washed stripe-and-leaf tropical print scaled for a kids quick-dry set; keep the exact same print across the shirt and shorts',
    palette: 'powder blue, ivory, pale sage, and warm sand',
  },
  MSF9001: {
    baseId: 'matching11.png',
    printDirection: 'soft watercolor family print with airy palms and botanical silhouettes carried consistently across mens, womens, and kids pieces',
    palette: 'soft ivory, sea-glass blue, faded aqua, and warm sand',
  },
  MSF9002: {
    baseId: 'matching8.png',
    printDirection: 'navy tropical collage print translated into one coordinated family print story across all pieces',
    palette: 'deep navy, coral, peach, ochre, and soft cream',
  },
};

export const productLineSections: Record<string, ProductLineSection[]> = {
  'aloha-shirts': [
    {
      title: "Men's Hawaiian Shirts",
      subtitle: 'Camp collar, full button, classic resort styles',
      alsoAvailable: 'Also available in 8+ fabrics',
      productIds: ['XLSX-06', 'XLSX-09', 'XLSX-10', 'XLSX-05'],
    },
    {
      title: "Men's Shirt Collar",
      subtitle: 'Structured collar with stand, from smart casual to business resort',
      alsoAvailable: 'Also available in 4+ fabrics',
      productIds: ['XLSX-24', 'XLSX-25', 'XLSX-27', 'XLSX-33'],
    },
    {
      title: "Men's Polo",
      subtitle: 'Aloha print polo for golf, corporate, and resort programs',
      alsoAvailable: 'Also available in 3+ fabrics',
      productIds: ['XLSX-03', 'XLSX-31'],
    },
    {
      title: 'Kids Shirts & Polos',
      subtitle: 'Family matching with scaled prints and kid-friendly fits',
      alsoAvailable: 'Also available in 2+ fabrics',
      productIds: ['XLSX-04', 'XLSX-26', 'XLSX-32'],
    },
  ],
  'tshirts-tops': [
    {
      title: "Men's T-Shirts",
      subtitle: 'Crew neck, V-neck, Henley, long sleeve',
      alsoAvailable: 'Also available in 12+ styles',
      productIds: ['TS1001', 'TS1006', 'TS1401', 'TS1301'],
    },
    {
      title: "Women's T-Shirts & Tanks",
      subtitle: 'Tees, crops, tanks, racerbacks',
      alsoAvailable: 'Also available in 5+ styles',
      productIds: ['TSW2001', 'TSW2002', 'TSW2003', 'TSW2202'],
    },
    {
      title: 'Kids T-Shirts',
      subtitle: 'Cotton and quick-dry options',
      productIds: ['TSK7001', 'TSK7002', 'TSK7003'],
    },
  ],
  'resort-dresses': [
    {
      title: 'Shirt Dresses',
      subtitle: 'Camp-collar silhouettes with clean plackets, belts, and easy resort drape',
      alsoAvailable: 'Also available in rayon, polyester and stretch poplin',
      productIds: ['RD1003', 'RD1001', 'RD1004'],
    },
    {
      title: 'Polo Dresses',
      subtitle: 'Sporty knit and rayon polo dresses with short and midi proportions',
      alsoAvailable: 'Also available in DTY, stretch knit and rayon',
      productIds: ['RD1102', 'RD1103', 'RD1101', 'RD1401'],
    },
    {
      title: "Girls' Dresses",
      subtitle: 'Girls shirt, polo, and sundress shapes aligned to the adult collection',
      alsoAvailable: 'Also available in matching print programs',
      productIds: ['RDK7002', 'RDK7101', 'RDK7201', 'RDK7102', 'RDK7001'],
    },
  ],
  'swimwear': [
    {
      title: "Men's Swim",
      subtitle: 'Board shorts, trunks, rash guards',
      alsoAvailable: 'Also available in 5+ styles',
      productIds: ['SW1001', 'SW1002', 'SW1101', 'SW1201'],
    },
    {
      title: "Women's Swim",
      subtitle: 'Swimsuits, bikinis, cover-ups, rash guards',
      alsoAvailable: 'Also available in 5+ styles',
      productIds: ['SWW2001', 'SWW2101', 'SWW2201', 'SWW2301'],
    },
    {
      title: 'Kids Swim',
      subtitle: 'Board shorts, rash guards, swim sets',
      productIds: ['SWK7001', 'SWK7002', 'SWK7003'],
    },
  ],
  'matching-sets': [
    {
      title: "Men's Sets",
      subtitle: 'Shirt+shorts, polo+shorts',
      alsoAvailable: 'Also available in 3+ combos',
      productIds: ['MS1001', 'MS1003', 'MS1101', 'MS1002'],
    },
    {
      title: "Women's Sets",
      subtitle: 'Top+shorts, top+skirt',
      alsoAvailable: 'Also available in 3+ combos',
      productIds: ['MSW2001', 'MSW2002', 'MSW2101', 'MSW2102'],
    },
    {
      title: 'Family & Kids',
      subtitle: 'Complete family matching',
      alsoAvailable: 'Also available in 2+ fabric options',
      productIds: ['MSF9001', 'MSK7001', 'MSF9002', 'MSK7002'],
    },
  ],
  'accessories': [
    {
      title: 'Headwear',
      subtitle: 'Bucket hats, baseball caps',
      alsoAvailable: 'Also available in 3+ styles',
      productIds: ['AC1001', 'AC1003', 'AC1101', 'AC1002'],
    },
    {
      title: 'Bags & Others',
      subtitle: 'Totes, pouches, scarves, scrunchies',
      alsoAvailable: 'Also available in 4+ items',
      productIds: ['AC1201', 'AC1301', 'AC1401', 'AC1302'],
    },
  ],
};

export const categoryCapabilities: Record<string, CategoryCapability[]> = {
  'aloha-shirts': alohaCatalogCapabilities,
};

type AlohaProductInput = Product & Omit<AlohaImagePromptInput, 'id' | 'name' | 'fabric'>;

const alohaColors = [
  '#111827',
  '#f8fafc',
  '#e2533f',
  '#2a8f8f',
  '#f2b84b',
  '#4f6f52',
  '#b35d35',
  '#7b2f55',
  '#d8c7a5',
  '#1f4f8f',
  '#171717',
  '#c8d8d5',
];

const mensAlohaSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL'];
const womensAlohaSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
const kidsAlohaSizes = ['2T', '3T', '4T', '5', '6', '8', '10', '12', '14'];

type AlohaPromptSpec = Omit<AlohaImagePromptInput, 'id' | 'name' | 'fabric'>;

const defaultAlohaPromptSpec: AlohaPromptSpec = {
  audience: 'mens',
  silhouette: 'short-sleeve aloha camp shirt, open collar, straight hem, relaxed resort fit',
  printDirection: 'balanced all-over tropical print, matched cleanly across the placket',
  palette: 'navy ground with ivory, coral, muted green, and warm yellow accents',
};

const alohaPromptSpecs: Record<string, AlohaPromptSpec> = {
  AL1001: {
    audience: 'mens',
    silhouette: 'classic short-sleeve camp shirt, open collar, straight hem, relaxed resort fit',
    printDirection: 'large tropical hibiscus and palm print, balanced repeat, matched across placket',
    palette: 'navy ground with ivory, coral, and muted green accents',
  },
  AL1101: {
    audience: 'mens',
    silhouette: 'lightweight short-sleeve Hawaiian shirt, camp collar, easy straight cut',
    printDirection: 'dense all-over tropical leaf print with clean digital edges',
    palette: 'deep ocean blue, teal, white, and warm sunset orange',
  },
  AL1201: {
    audience: 'mens',
    silhouette: 'short-sleeve polo with soft collar, three-button placket, athletic resort fit',
    printDirection: 'smaller engineered tropical micro print, clean scale for polo fabric',
    palette: 'white base with navy, aqua, and muted lime details',
  },
  ALW3001: {
    audience: 'womens',
    silhouette: 'short-sleeve button-front shirt dress, camp collar, relaxed waist, mid-thigh hem',
    printDirection: 'large-scale resort botanical print placed evenly across body and sleeves',
    palette: 'cream base with black, sage, terracotta, and soft yellow accents',
  },
  AL1002: {
    audience: 'mens',
    silhouette: 'structured camp shirt, sharper collar, crisp sleeves, straight hem',
    printDirection: 'vintage island postcard floral print with controlled repeat',
    palette: 'off-white base, black linework, faded red, olive, and tan',
  },
  AL1010: {
    audience: 'mens',
    silhouette: 'smooth woven camp shirt, soft open collar, boxy relaxed fit',
    printDirection: 'minimal tropical foliage repeat with moderate negative space',
    palette: 'black ground with ivory, dusty blue, and muted rust accents',
  },
  AL1006: {
    audience: 'mens',
    silhouette: 'soft drape camp shirt with breathable relaxed fit',
    printDirection: 'organic hand-painted palm and hibiscus repeat, natural imperfect edges',
    palette: 'warm ivory, moss green, clay, charcoal, and muted sky blue',
  },
  AL1110: {
    audience: 'womens',
    silhouette: 'button-front short-sleeve resort dress, straight relaxed cut, camp collar',
    printDirection: 'soft tropical vine print aligned vertically for dress length',
    palette: 'navy base with ivory, seafoam, and warm coral accents',
  },
  AL1111: {
    audience: 'womens',
    silhouette: 'stretch shirt dress, camp collar, short sleeves, clean fitted shoulder with easy body',
    printDirection: 'crisp tropical floral repeat with light stretch-friendly spacing',
    palette: 'white base, saturated red, teal, forest green, and black accents',
  },
  AL1102: {
    audience: 'womens',
    silhouette: 'structured cotton poplin shirt dress, short sleeves, button front, crisp hem',
    printDirection: 'retro Hawaiian flower print with clear motif separation',
    palette: 'pale blue base with white, navy, melon, and leaf green',
  },
  AL1212: {
    audience: 'mens',
    silhouette: 'knitted short-sleeve polo, soft collar, two-button placket, relaxed fit',
    printDirection: 'small repeat resort palm print suited to knitted DTY fabric',
    palette: 'charcoal base with teal, white, and muted yellow highlights',
  },
  AL1213: {
    audience: 'mens',
    silhouette: 'stretch knit aloha polo, clean collar, short sleeves, easy athletic fit',
    printDirection: 'geometric tropical leaf micro print with even repeat',
    palette: 'ivory base with navy, turquoise, olive, and ochre accents',
  },
  AL1210: {
    audience: 'mens',
    silhouette: 'quick-dry knitted polo, short sleeves, soft collar, resort performance fit',
    printDirection: 'clean tropical wave and palm repeat, performancewear scale',
    palette: 'deep teal base with white, aqua, navy, and citrus accents',
  },
  ALW2001: {
    audience: 'womens',
    silhouette: 'relaxed womens camp shirt, short sleeves, open collar, slightly cropped straight hem',
    printDirection: 'large botanical aloha print with elegant spacing',
    palette: 'black base with cream, blush, sage, and copper accents',
  },
  ALW2013: {
    audience: 'womens',
    silhouette: 'lightweight crinkle chiffon blouse, short sleeves, airy relaxed resort fit',
    printDirection: 'soft watercolor tropical flower print, semi-sheer fabric handled modestly',
    palette: 'ivory ground with dusty rose, seafoam, faded blue, and warm beige',
  },
  ALW2003: {
    audience: 'womens',
    silhouette: 'short-sleeve tie-front Hawaiian top, open collar, front knot detail, relaxed body',
    printDirection: 'bold tropical hibiscus print that follows the tie-front construction naturally',
    palette: 'warm white base with coral, magenta, green, and dark navy details',
  },
  ALW2020: {
    audience: 'womens',
    silhouette: 'short-sleeve swim knit aloha top, smooth fitted shoulder, relaxed body, modest coverage',
    printDirection: 'resort swim-ready tropical print with crisp repeat and saturated color',
    palette: 'navy base with turquoise, white, coral, and lime accents',
  },
  ALK7001: {
    audience: 'kids',
    silhouette: 'kids short-sleeve camp shirt, classic collar, easy straight fit',
    printDirection: 'playful tropical print scaled down for childrenswear',
    palette: 'sky blue base with white, yellow, coral, and leaf green',
  },
  ALK7003: {
    audience: 'kids',
    silhouette: 'kids half-placket aloha polo, soft collar, short sleeves, comfortable fit',
    printDirection: 'small cheerful palm and flower print, durable knit scale',
    palette: 'white base with aqua, navy, melon, and yellow accents',
  },
  ALK7004: {
    audience: 'kids',
    silhouette: 'kids knitted aloha shirt, short sleeves, relaxed playwear fit',
    printDirection: 'clean tropical leaf repeat with kid-friendly spacing',
    palette: 'teal base with ivory, lime, warm orange, and navy',
  },
  ALK7005: {
    audience: 'kids',
    silhouette: 'kids stretch poplin aloha shirt, crisp collar, short sleeves, easy fit',
    printDirection: 'retro mini hibiscus print with clear repeat and no oversized motifs',
    palette: 'cream base with navy, red, sage, and golden yellow',
  },
};

const alohaFabricDetails: Record<string, string> = {
  AL1001: '100% Rayon / 140GSM / Midweight',
  AL1101: '100% Polyester / 140GSM / Midweight',
  AL1201: '95/5 Polyester-Spandex / 190GSM / Knitted',
  ALW3001: '100% Rayon / 140GSM / Midweight',
  AL1002: '100% Cotton Poplin / 160GSM / Midweight',
  AL1010: '100% Polyester / 130GSM / Midweight',
  AL1006: '93/7 Bamboo-Rayon / 145GSM / Midweight',
  AL1110: '100% Polyester / 130GSM / Midweight',
  AL1111: '97/3 Cotton-Spandex / 155GSM / Midweight',
  AL1102: '100% Cotton Poplin / 160GSM / Midweight',
  AL1212: '95/5 Polyester-Spandex / 150GSM / Knitted DTY',
  AL1213: '92/8 Polyester-Spandex / 160GSM / Knitted',
  AL1210: '95/5 Polyester-Spandex / 130GSM / Knitted',
  ALW2001: '100% Rayon / 130GSM / Midweight',
  ALW2013: '100% Polyester / 100GSM / Lightweight',
  ALW2003: '100% Rayon Crepe / 140GSM / Midweight',
  ALW2020: '93/7 Polyester-Spandex / 190GSM / Knitted',
  ALK7001: '100% Rayon / 130GSM / Midweight',
  ALK7003: '95/5 Polyester-Spandex / 180GSM / Knitted',
  ALK7004: '100% Polyester / 140GSM / Midweight',
  ALK7005: '97/3 Cotton-Spandex / 150GSM / Midweight',
};

function findAlohaProductLine(productId: string) {
  return productLineSections['aloha-shirts']?.find((section) => section.productIds.includes(productId));
}

function createAlohaProduct(input: AlohaProductInput): Product {
  const { audience, silhouette, printDirection, palette, ...product } = input;
  const fabric = product.fabric.replace(/\s*鐠虹棆s*/g, ' / ');
  const sizeRange = product.sizeRange || (
    audience === 'kids' ? '2T-14' : audience === 'womens' ? 'XS-4XL' : 'S-7XL'
  );
  const sizes = product.sizes || (
    audience === 'kids' ? kidsAlohaSizes : audience === 'womens' ? womensAlohaSizes : mensAlohaSizes
  );

  return {
    ...product,
    fabric,
    hoverImage: product.hoverImage || product.image,
    samplePrice: product.samplePrice || '$6.85',
    subtitle: product.subtitle || 'READY DEVELOPMENT STYLE',
    sizeRange,
    productLine: product.productLine,
    alsoAvailable: product.alsoAvailable,
    colors: product.colors || alohaColors,
    sizes,
    details: product.details || [
      `Code: ${product.id}`,
      `Style: ${product.name}`,
      `Fabric: ${fabric}`,
      `Silhouette: ${silhouette}`,
      `Size Range: ${sizeRange}`,
      `MOQ: ${product.moq.replace('MOQ ', '')} pcs`,
      'Customization: custom print, color, label, tag and packaging available',
    ],
    imagePrompts: buildAlohaImagePrompts({
      id: product.id,
      name: product.name,
      fabric,
      audience,
      silhouette,
      printDirection,
      palette,
    }),
  };
}

function withAlohaPrompts(product: Product): Product {
  const line = findAlohaProductLine(product.id);

  return createAlohaProduct({
    ...product,
    fabric: alohaFabricDetails[product.id] || product.fabric,
    productLine: line?.title || product.productLine,
    alsoAvailable: line?.alsoAvailable || product.alsoAvailable,
    ...(alohaPromptSpecs[product.id] || defaultAlohaPromptSpec),
  });
}

const alohaGeneratedImageVersion = '20260423-ai-ref2';

function alohaGeneratedImageOverride(id: string): Partial<Product> {
  return {
    image: `/product-images/aloha-generated/${id}-flat.png?v=${alohaGeneratedImageVersion}`,
    hoverImage: `/product-images/aloha-generated/${id}-model.png?v=${alohaGeneratedImageVersion}`,
    detailImage: `/product-images/aloha-generated/${id}-flat.png?v=${alohaGeneratedImageVersion}`,
  };
}

const alohaCatalogProductOverrides: Record<string, Partial<Product>> = {
  'XLSX-03': alohaGeneratedImageOverride('XLSX-03'),
  'XLSX-04': alohaGeneratedImageOverride('XLSX-04'),
  'XLSX-05': alohaGeneratedImageOverride('XLSX-05'),
  'XLSX-24': alohaGeneratedImageOverride('XLSX-24'),
  'XLSX-25': alohaGeneratedImageOverride('XLSX-25'),
  'XLSX-26': alohaGeneratedImageOverride('XLSX-26'),
  'XLSX-27': alohaGeneratedImageOverride('XLSX-27'),
  'XLSX-31': {
    ...alohaGeneratedImageOverride('XLSX-31'),
    name: 'Knitted Polo Shirt',
    productLine: "Men's / Knitted Polo",
    details: [
      'Excel Row: 31',
      'Style: Knitted Polo Shirt',
      "Category: Men's",
      'Fabric: 95% Polyester 5% Spandex / 190GSM / Knitted',
      'Fit: Regular',
      'Size Range: S-7XL',
      'MOQ: 50 pcs',
      'FOB as low as: $14',
      'FOB 50-300 pcs: $15',
      'FOB 301-500 pcs: $14.50',
      'FOB 500-1000 pcs: $14',
      'DDP as low as: $16',
      'DDP 50-300 pcs: $17',
      'DDP 301-500 pcs: $16.50',
      'DDP 500-1000 pcs: $16',
    ],
  },
  'XLSX-32': {
    ...alohaGeneratedImageOverride('XLSX-32'),
    name: 'Knitted Polo Shirt',
    productLine: 'Boys / Knitted Polo',
    details: [
      'Excel Row: 32',
      'Style: Knitted Polo Shirt',
      'Category: Boys',
      'Fabric: 95% Polyester 5% Spandex / 190GSM / Knitted',
      'Fit: Regular',
      'Size Range: S-7XL',
      'MOQ: 50 pcs',
      'FOB as low as: $11',
      'FOB 50-300 pcs: $12',
      'FOB 301-500 pcs: $11.50',
      'FOB 500-1000 pcs: $11',
      'DDP as low as: $13',
      'DDP 50-300 pcs: $14',
      'DDP 301-500 pcs: $13.50',
      'DDP 500-1000 pcs: $13',
    ],
  },
  'XLSX-33': alohaGeneratedImageOverride('XLSX-33'),
};

function applyAlohaCatalogOverride(product: Product): Product {
  const override = alohaCatalogProductOverrides[product.id];
  if (!override) return product;
  const shouldRetargetToKnittedPolo = product.id === 'XLSX-31' || product.id === 'XLSX-32';
  const rewritePrompt = (prompt: string) => {
    let nextPrompt = override.name ? prompt.replaceAll(product.name, override.name) : prompt;
    if (shouldRetargetToKnittedPolo) {
      nextPrompt = nextPrompt.replaceAll('Style: Shirt Collar', 'Style: Knitted Polo Shirt');
    }

    return nextPrompt;
  };

  return {
    ...product,
    ...override,
    imagePrompts: product.imagePrompts && {
      flat: rewritePrompt(product.imagePrompts.flat),
      model: rewritePrompt(product.imagePrompts.model),
      detail: rewritePrompt(product.imagePrompts.detail),
    },
  };
}

const alohaCatalogReadyProducts: Product[] = alohaCatalogProducts.filter((product) => !/^XLSX-5[1-4]$/.test(product.id)).map((sourceProduct) => {
  const product = applyAlohaCatalogOverride(sourceProduct);
  if (product.id !== 'AL1212') return product;

  return {
    ...product,
    productLine: "Men's / T-Shirts",
    details: product.details?.map((detail) => (
      detail === 'Style: Half-Placket Polo' ? 'Style: Knitted DTY T-Shirt' : detail
    )),
    imagePrompts: product.imagePrompts && {
      ...product.imagePrompts,
      flat: product.imagePrompts.flat.replace('Style: Half-Placket Polo', 'Style: Knitted DTY T-Shirt'),
      model: product.imagePrompts.model.replace('Style: Half-Placket Polo', 'Style: Knitted DTY T-Shirt'),
      detail: product.imagePrompts.detail.replace('Style: Half-Placket Polo', 'Style: Knitted DTY T-Shirt'),
    },
  };
});

function productLineIncludes(product: Product, terms: string[]) {
  const value = `${product.productLine || ''} ${product.name}`.toLowerCase();
  return terms.some((term) => value.includes(term));
}

function isCatalogTshirtTop(product: Product) {
  return productLineIncludes(product, ['t-shirts', 'tops', 'blouse']);
}

function isCatalogDress(product: Product) {
  return productLineIncludes(product, ['dresses']);
}

function isCatalogSwimwear(product: Product) {
  return productLineIncludes(product, ['swimwear', 'bottoms']);
}

const catalogTshirtTopProducts = alohaCatalogReadyProducts.filter(isCatalogTshirtTop);
const catalogSwimwearProducts = alohaCatalogReadyProducts.filter(isCatalogSwimwear);
const alohaShopProducts = alohaCatalogReadyProducts.filter((product) => (
  !isCatalogTshirtTop(product)
  && !isCatalogDress(product)
  && !isCatalogSwimwear(product)
));

type GeneratedResortImageSpec = Pick<
  ResortImagePromptInput,
  'audience' | 'productKind' | 'silhouette' | 'printDirection' | 'palette'
> & {
  colorTokens: string[];
  sizeRange: string;
  sizes: string[];
};

type ResortDressReferenceSpec = {
  sourceImage: string;
  silhouetteReference: string;
  silhouette: string;
  printDirection: string;
  palette: string;
  colors: string[];
};

const resortDressReferenceSpecs: Record<string, ResortDressReferenceSpec> = {
  RD1001: {
    sourceImage: '/product-images/resort-reference/11.png',
    silhouetteReference: '/product-images/resort-reference/dress7.png',
    silhouette: 'button-front shirt dress inspired by dress7 with camp collar, short sleeves, self belt, and a fluid midi hem',
    printDirection: '11.png-inspired blue watercolor tropical foliage with soft negative space, layered hand-painted leaves, and airy resort placement; original artwork only',
    palette: '#f6f1ea, #d9e4ef, #9fb8d5, #6d90b8, #3d6287, #ffffff',
    colors: ['#f6f1ea', '#d9e4ef', '#9fb8d5', '#6d90b8', '#3d6287'],
  },
  RD1003: {
    sourceImage: '/product-images/resort-reference/14.jpg',
    silhouetteReference: '/product-images/resort-reference/dress3.png',
    silhouette: 'short shirt dress inspired by dress3 with camp collar, cap sleeves, neat placket, self belt, and relaxed resort fit',
    printDirection: '14.jpg-inspired terracotta resort medallion print with washed orange, sand, and muted blue accents spaced for a polished shirt-dress surface; original artwork only',
    palette: '#f7efe3, #d7835f, #ba6541, #597d96, #d2ad77, #fffaf2',
    colors: ['#f7efe3', '#d7835f', '#ba6541', '#597d96', '#d2ad77'],
  },
  RD1004: {
    sourceImage: '/product-images/resort-reference/13.jpg',
    silhouetteReference: '/product-images/resort-reference/dress5.png',
    silhouette: 'structured short shirt dress inspired by dress5 with sharper placket, tidy collar, self belt, and crisp above-knee hem',
    printDirection: '13.jpg-inspired deep-ocean reef print with coral branches, shell sketches, and plum-to-sand contrast balanced across a tailored shirt dress; original artwork only',
    palette: '#241f33, #7f70c9, #d792b4, #8abec6, #f0d498, #f7f1e6',
    colors: ['#241f33', '#7f70c9', '#d792b4', '#8abec6', '#f0d498'],
  },
  RD1101: {
    sourceImage: '/product-images/resort-reference/19.jpg',
    silhouetteReference: '/product-images/resort-reference/dress5.png',
    silhouette: 'short polo dress inspired by dress5 with clean collar, short placket, and a slightly A-line mini hem',
    printDirection: '19.jpg-inspired black coral-reef print with lilac, blush, seafoam, shell, and warm reef accents on a dark ground; original artwork only',
    palette: '#151515, #caa0db, #efc0d0, #a7dcd7, #e4c08b, #f4ead9',
    colors: ['#151515', '#caa0db', '#efc0d0', '#a7dcd7', '#e4c08b'],
  },
  RD1102: {
    sourceImage: '/product-images/resort-reference/20.jpg',
    silhouetteReference: '/product-images/resort-reference/dress3.png',
    silhouette: 'short knitted polo dress inspired by dress3 with neat collar, compact placket, subtle waist shaping, and easy straight hem',
    printDirection: '20.jpg-inspired cocoa coral-reef print with pink, lavender, aqua, and shell notes arranged in a cleaner knit-friendly repeat; original artwork only',
    palette: '#5a311d, #f0c2cf, #b686d7, #abd8d3, #e7c184, #f3e8da',
    colors: ['#5a311d', '#f0c2cf', '#b686d7', '#abd8d3', '#e7c184'],
  },
  RD1103: {
    sourceImage: '/product-images/resort-reference/16.jpg',
    silhouetteReference: '/product-images/resort-reference/dress4.png',
    silhouette: 'soft rayon polo dress inspired by dress4 with relaxed collar, short placket, tie waist, and easy midi length',
    printDirection: '16.jpg-inspired shell-and-coral watercolor with airy seafoam spacing, warm coral hits, and soft beach neutrals; original artwork only',
    palette: '#eef1ed, #99c9c9, #ef9a83, #87b6a8, #ceb893, #f7f4eb',
    colors: ['#eef1ed', '#99c9c9', '#ef9a83', '#87b6a8', '#ceb893'],
  },
  RD1401: {
    sourceImage: '/product-images/resort-reference/15.png',
    silhouetteReference: '/product-images/resort-reference/dress2.png',
    silhouette: 'sleeveless midi sundress inspired by dress2 with soft V neckline, defined waist seam, and gentle A-line skirt',
    printDirection: '15.png-inspired lemon-and-blue toile print with bright citrus highlights, sketchy cobalt vines, and open ivory ground; original artwork only',
    palette: '#fbf4e7, #7ea9d7, #5f87be, #f0d65d, #d8b15f, #ffffff',
    colors: ['#fbf4e7', '#7ea9d7', '#5f87be', '#f0d65d', '#d8b15f'],
  },
  RDK7001: {
    sourceImage: '/product-images/resort-reference/11.png',
    silhouetteReference: '/product-images/resort-reference/dress6.png',
    silhouette: 'girls shirt dress inspired by dress6 with neat collar, waist tie, and playful A-line skirt length',
    printDirection: '11.png-inspired blue watercolor leaves scaled smaller for girlswear with fresh white balance and open repeat spacing; original artwork only',
    palette: '#f6f1ea, #d9e4ef, #9fb8d5, #6d90b8, #3d6287, #ffffff',
    colors: ['#f6f1ea', '#d9e4ef', '#9fb8d5', '#6d90b8', '#3d6287'],
  },
  RDK7002: {
    sourceImage: '/product-images/resort-reference/15.png',
    silhouetteReference: '/product-images/resort-reference/dress6.png',
    silhouette: 'girls cotton poplin dress inspired by dress6 with crisp sleeveless bodice, waist tie, and a bright A-line skirt',
    printDirection: '15.png-inspired lemon-and-blue toile print with cheerful citrus scale adjusted for girlswear and clean negative space; original artwork only',
    palette: '#fbf4e7, #7ea9d7, #5f87be, #f0d65d, #d8b15f, #ffffff',
    colors: ['#fbf4e7', '#7ea9d7', '#5f87be', '#f0d65d', '#d8b15f'],
  },
  RDK7101: {
    sourceImage: '/product-images/resort-reference/14.jpg',
    silhouetteReference: '/product-images/resort-reference/dress6.png',
    silhouette: 'girls polo dress inspired by dress6 with sporty collar, short sleeve feel, and easy everyday skirt volume',
    printDirection: '14.jpg-inspired terracotta resort floral with cream ground and muted blue accents, scaled smaller for a girls polo silhouette; original artwork only',
    palette: '#f7efe3, #d7835f, #ba6541, #597d96, #d2ad77, #fffaf2',
    colors: ['#f7efe3', '#d7835f', '#ba6541', '#597d96', '#d2ad77'],
  },
  RDK7102: {
    sourceImage: '/product-images/resort-reference/19.jpg',
    silhouetteReference: '/product-images/resort-reference/dress6.png',
    silhouette: 'girls knitted stretch polo dress inspired by dress6 with polo collar, comfortable waist shape, and active A-line skirt',
    printDirection: '19.jpg-inspired black reef print with brighter coral and shell accents adjusted to a lively girlswear scale; original artwork only',
    palette: '#151515, #caa0db, #efc0d0, #a7dcd7, #e4c08b, #f4ead9',
    colors: ['#151515', '#caa0db', '#efc0d0', '#a7dcd7', '#e4c08b'],
  },
  RDK7201: {
    sourceImage: '/product-images/resort-reference/16.jpg',
    silhouetteReference: '/product-images/resort-reference/dress6.png',
    silhouette: 'girls rayon sundress inspired by dress6 with sleeveless bodice, tie waist, and breezy skirt',
    printDirection: '16.jpg-inspired shell-and-coral watercolor with soft aqua, warm coral, and sandy neutrals arranged in a light playful repeat; original artwork only',
    palette: '#eef1ed, #99c9c9, #ef9a83, #87b6a8, #ceb893, #f7f4eb',
    colors: ['#eef1ed', '#99c9c9', '#ef9a83', '#87b6a8', '#ceb893'],
  },
};

const resortDressAIImageVersion = '20260424-ai-ref1';
const generatedResortImageVersion = 'v=20260424-dressrefs1';
const swimBaseStyleAIImageVersion = '20260424-swimcatalogpdf2';
const matchingSetBaseStyleAIImageVersion = '20260425-matchingrefs3';

function resortDressAIImageOverride(id: string): Partial<Product> {
  return {
    image: `/product-images/resort-ai-generated/${id}-flat.png?v=${resortDressAIImageVersion}`,
    hoverImage: `/product-images/resort-ai-generated/${id}-model.png?v=${resortDressAIImageVersion}`,
    detailImage: `/product-images/resort-ai-generated/${id}-flat.png?v=${resortDressAIImageVersion}`,
  };
}

const resortDressAIProductOverrides: Record<string, Partial<Product>> = {
  RD1001: resortDressAIImageOverride('RD1001'),
  RD1003: resortDressAIImageOverride('RD1003'),
  RD1004: resortDressAIImageOverride('RD1004'),
  RD1101: resortDressAIImageOverride('RD1101'),
  RD1102: resortDressAIImageOverride('RD1102'),
  RD1103: resortDressAIImageOverride('RD1103'),
  RD1401: resortDressAIImageOverride('RD1401'),
  RDK7001: resortDressAIImageOverride('RDK7001'),
  RDK7002: resortDressAIImageOverride('RDK7002'),
  RDK7101: resortDressAIImageOverride('RDK7101'),
  RDK7102: resortDressAIImageOverride('RDK7102'),
  RDK7201: resortDressAIImageOverride('RDK7201'),
};

function swimBaseStyleAIImageOverride(id: string): Partial<Product> {
  return {
    image: `/product-images/base-styles/swimwear/${id}-flat.png?v=${swimBaseStyleAIImageVersion}`,
    hoverImage: `/product-images/base-styles/swimwear/${id}-model.png?v=${swimBaseStyleAIImageVersion}`,
    detailImage: `/product-images/base-styles/swimwear/${id}-flat.png?v=${swimBaseStyleAIImageVersion}`,
  };
}

const swimBaseStyleAIProductOverrides: Record<string, Partial<Product>> = {
  SW1001: swimBaseStyleAIImageOverride('SW1001'),
  SW1002: swimBaseStyleAIImageOverride('SW1002'),
  SW1101: swimBaseStyleAIImageOverride('SW1101'),
  SW1201: swimBaseStyleAIImageOverride('SW1201'),
  SW4001: swimBaseStyleAIImageOverride('SW4001'),
  SW6002: swimBaseStyleAIImageOverride('SW6002'),
  SWW2001: swimBaseStyleAIImageOverride('SWW2001'),
  SWW2101: swimBaseStyleAIImageOverride('SWW2101'),
  SWW2201: swimBaseStyleAIImageOverride('SWW2201'),
  SWW2301: swimBaseStyleAIImageOverride('SWW2301'),
  SWK7001: swimBaseStyleAIImageOverride('SWK7001'),
  SWK7002: swimBaseStyleAIImageOverride('SWK7002'),
  SWK7003: swimBaseStyleAIImageOverride('SWK7003'),
};

function matchingSetBaseStyleAIImageOverride(id: string): Partial<Product> {
  return {
    image: `/product-images/base-styles/matching-sets/${id}-flat.png?v=${matchingSetBaseStyleAIImageVersion}`,
    hoverImage: `/product-images/base-styles/matching-sets/${id}-model.png?v=${matchingSetBaseStyleAIImageVersion}`,
    detailImage: `/product-images/base-styles/matching-sets/${id}-flat.png?v=${matchingSetBaseStyleAIImageVersion}`,
  };
}

const matchingSetBaseStyleAIProductOverrides: Record<string, Partial<Product>> = {
  MS1001: matchingSetBaseStyleAIImageOverride('MS1001'),
  MS1002: matchingSetBaseStyleAIImageOverride('MS1002'),
  MS1003: matchingSetBaseStyleAIImageOverride('MS1003'),
  MS1101: matchingSetBaseStyleAIImageOverride('MS1101'),
  MSW2001: matchingSetBaseStyleAIImageOverride('MSW2001'),
  MSW2002: matchingSetBaseStyleAIImageOverride('MSW2002'),
  MSW2101: matchingSetBaseStyleAIImageOverride('MSW2101'),
  MSW2102: matchingSetBaseStyleAIImageOverride('MSW2102'),
  MSK7001: matchingSetBaseStyleAIImageOverride('MSK7001'),
  MSK7002: matchingSetBaseStyleAIImageOverride('MSK7002'),
  MSF9001: matchingSetBaseStyleAIImageOverride('MSF9001'),
  MSF9002: matchingSetBaseStyleAIImageOverride('MSF9002'),
};

const generatedResortPalettes = [
  ['#123c46', '#f7f1df', '#e56b4f', '#8fbf7a', '#d9a441', '#1d2430'],
  ['#10233d', '#f6efe2', '#d94f45', '#2f7f6f', '#f0be63', '#6b8e72'],
  ['#f4eee1', '#203b55', '#c95f3f', '#6f9f82', '#e8bd6f', '#27272a'],
  ['#0f4f58', '#fff7e6', '#f08a5d', '#9fc37b', '#24415f', '#e7cf8f'],
  ['#252525', '#f8f1df', '#d95d39', '#75a99c', '#d9b15f', '#7c3f52'],
  ['#e9f3ef', '#183d3b', '#ef6f57', '#4d8c62', '#f1c45d', '#2b2b3f'],
];

function generatedResortImagePath(id: string, kind: 'flat' | 'model') {
  return `/product-images/resort-generated/${id}-${kind}.png?${generatedResortImageVersion}`;
}

function hashProductId(id: string) {
  return id.split('').reduce((sum, char) => ((sum * 31) + char.charCodeAt(0)) >>> 0, 19);
}

function paletteForProduct(product: Product) {
  const palette = generatedResortPalettes[hashProductId(product.id) % generatedResortPalettes.length];
  return palette;
}

function audienceForProduct(product: Product, category: string): ResortImagePromptInput['audience'] {
  if (/^MSF/.test(product.id)) return 'family';
  if (/K|Girl|Girls|Kids/.test(product.id) || /kid|girl|boys?/i.test(product.name)) return 'kids';
  if (/^TSW|^SWW|^MSW/.test(product.id) || category === 'resort-dresses') return 'womens';
  if (category === 'accessories') return 'unisex';
  return 'mens';
}

function kindForProduct(product: Product, category: string) {
  const name = product.name.toLowerCase();
  if (category === 'accessories') {
    if (name.includes('tote')) return 'canvas tote bag';
    if (name.includes('cap')) return 'cotton aloha cap';
    if (name.includes('hat')) return 'resort bucket hat';
    if (name.includes('bandana')) return 'aloha bandana';
    if (name.includes('scarf')) return 'lightweight resort scarf';
    if (name.includes('scrunchie')) return 'aloha scrunchie';
    return 'resort accessory';
  }
  if (category === 'matching-sets') return 'coordinated resort matching set';
  if (category === 'swimwear') return 'resort swimwear';
  if (category === 'resort-dresses') return 'resort dress';
  if (name.includes('tank')) return 'resort tank top';
  if (name.includes('henley')) return 'resort henley tee';
  if (name.includes('long sleeve')) return 'long-sleeve resort tee';
  return 'resort tee or top';
}

function silhouetteForProduct(product: Product, category: string) {
  const name = product.name.toLowerCase();

  if (category === 'resort-dresses') {
    if (name.includes('wrap')) return 'wrap-front resort dress with tie waist and relaxed skirt';
    if (name.includes('maxi')) return 'long flowing maxi dress with clean resort drape';
    if (name.includes('sundress')) return 'sleeveless midi sundress with easy resort fit';
    if (name.includes('polo')) return 'short-sleeve polo dress with soft collar and clean placket';
    return 'button-front shirt dress with camp collar, short sleeves, and relaxed straight fit';
  }
  if (category === 'swimwear') {
    if (name.includes('board') || name.includes('trunks')) return 'front-facing swim shorts with elastic waist and clean hem';
    if (name.includes('rash')) return 'long-sleeve UPF rash guard with athletic collar and modest fit';
    if (name.includes('bikini')) return 'two-piece swim set with commercial modest coverage';
    if (name.includes('sarong')) return 'light chiffon sarong cover-up with soft wrapped drape';
    if (name.includes('one-piece') || name.includes('one piece')) return 'one-piece swimsuit with simple scoop neckline and modest leg line';
    return 'coordinated kids swim top and bottom with active fit';
  }
  if (category === 'matching-sets') {
    if (name.includes('skirt')) return 'coordinated resort top and skirt set with relaxed drape';
    if (name.includes('family')) return 'coordinated family resort set with matching shirt, dress, and kids piece';
    return 'coordinated resort top and shorts set with relaxed vacation fit';
  }
  if (category === 'accessories') {
    if (name.includes('tote')) return 'structured rectangular canvas tote with two handles';
    if (name.includes('cap')) return 'six-panel curved-brim cap with clean crown';
    if (name.includes('hat')) return 'soft bucket hat with short brim and stitched crown';
    if (name.includes('bandana')) return 'square bandana shown open and neatly framed';
    if (name.includes('scarf')) return 'long lightweight scarf with soft drape';
    if (name.includes('scrunchie')) return 'fabric scrunchie ring with gathered texture';
    return 'clean accessory sample with resort print placement';
  }
  if (name.includes('tank') || name.includes('racerback')) return 'sleeveless tank top with clean armholes and relaxed active fit';
  if (name.includes('cropped')) return 'cropped short-sleeve tee with boxy resort fit';
  if (name.includes('henley')) return 'short-sleeve henley tee with three-button placket and soft rib neck';
  if (name.includes('long sleeve')) return 'long-sleeve crew neck tee with relaxed body and straight hem';
  return 'short-sleeve crew neck tee with relaxed resort fit and clean straight hem';
}

function printDirectionForProduct(product: Product, category: string) {
  const name = product.name.toLowerCase();
  const fabric = product.fabric.toLowerCase();
  const categoryTone = category === 'accessories'
    ? 'balanced accessory-scale tropical motif with visible solid fabric space'
    : category === 'swimwear'
      ? 'crisp swim-ready tropical motif with medium spacing'
      : 'balanced medium-density tropical resort print with visible negative space';
  const materialTone = fabric.includes('cotton')
    ? 'sun-washed cotton texture'
    : fabric.includes('rayon') || fabric.includes('viscose')
      ? 'soft rayon drape'
      : fabric.includes('chiffon')
        ? 'airy semi-sheer chiffon depth'
        : fabric.includes('poly')
          ? 'clean performance fabric clarity'
          : 'natural fabric hand';
  const motif = name.includes('quick') || name.includes('sports') || name.includes('rash')
    ? 'palm fronds, coastal wave accents, and hibiscus details spaced with rhythm'
    : name.includes('vintage') || name.includes('acid')
      ? 'faded hibiscus, palm shadows, and washed island botanicals with open fabric areas'
      : name.includes('family') || name.includes('kids')
        ? 'friendly scaled palms, plumeria, and playful coastal icons with medium spacing'
        : 'hand-painted palm leaves, hibiscus, plumeria, and subtle island geometrics with medium spacing';

  return `${categoryTone} using ${motif}, with ${materialTone}; realistic product sample, original artwork, no brand marks, not overly dense and not nearly blank`;
}

function sizesForProduct(audience: ResortImagePromptInput['audience'], category: string, product: Product) {
  if (category === 'accessories') return { sizeRange: 'One Size', sizes: ['OS'] };
  if (audience === 'kids') return { sizeRange: '2T-14', sizes: ['2T', '4T', '6', '8', '10', '12', '14'] };
  if (audience === 'womens') return { sizeRange: 'XS-4XL', sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'] };
  if (audience === 'family') return { sizeRange: 'Family XS-4XL / Kids 2T-14', sizes: ['Men', 'Women', 'Kids'] };
  if (/3XL|XXL|2XL/i.test(product.name)) return { sizeRange: 'S-3XL', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'] };
  return { sizeRange: 'S-3XL', sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'] };
}

function generatedSpecForProduct(product: Product, category: string): GeneratedResortImageSpec {
  const audience = audienceForProduct(product, category);
  const palette = paletteForProduct(product);
  const { sizeRange, sizes } = sizesForProduct(audience, category, product);

  return {
    audience,
    productKind: kindForProduct(product, category),
    silhouette: silhouetteForProduct(product, category),
    printDirection: printDirectionForProduct(product, category),
    palette: palette.join(', '),
    colorTokens: palette,
    sizeRange,
    sizes,
  };
}

function findProductLine(category: string, productId: string) {
  return productLineSections[category]?.find((section) => section.productIds.includes(productId));
}

function withGeneratedResortImages(product: Product, category: string): Product {
  const usesLegacyPlaceholder = /^https:\/\/images\.unsplash\.com\//.test(product.image);
  const usesGeneratedFlat = product.image.startsWith(`/product-images/resort-generated/${product.id}-flat.png`);
  if (!usesLegacyPlaceholder && !usesGeneratedFlat) return product;

  const spec = generatedSpecForProduct(product, category);
  const dressReference = resortDressReferenceSpecs[product.id];
  const matchingSetPatternBase = category === 'matching-sets' ? matchingSetPatternBases[product.id] : undefined;
  const line = findProductLine(category, product.id);
  const silhouette = dressReference?.silhouette || spec.silhouette;
  const printDirection = matchingSetPatternBase?.printDirection || dressReference?.printDirection || spec.printDirection;
  const palette = matchingSetPatternBase?.palette || dressReference?.palette || spec.palette;

  return {
    ...product,
    image: generatedResortImagePath(product.id, 'flat'),
    hoverImage: generatedResortImagePath(product.id, 'model'),
    detailImage: generatedResortImagePath(product.id, 'flat'),
    subtitle: product.subtitle || 'READY DEVELOPMENT STYLE',
    sizeRange: product.sizeRange || spec.sizeRange,
    productLine: product.productLine || line?.title || categoryLabels[category],
    alsoAvailable: product.alsoAvailable || line?.alsoAvailable,
    colors: product.colors || dressReference?.colors || spec.colorTokens,
    sizes: product.sizes || spec.sizes,
    details: product.details || [
      `Code: ${product.id}`,
      `Style: ${product.name}`,
      `Fabric: ${product.fabric}`,
      `Product Kind: ${spec.productKind}`,
      ...(matchingSetPatternBase ? [`Pattern Base: ${matchingSetPatternBase.baseId}`] : []),
      `Silhouette: ${silhouette}`,
      `Print Direction: ${printDirection}`,
      `Size Range: ${spec.sizeRange}`,
      `MOQ: ${product.moq.replace('MOQ ', '')} pcs`,
      'Customization: custom print, color, label, tag and packaging available',
    ],
    imagePrompts: product.imagePrompts || buildResortProductImagePrompts({
      id: product.id,
      name: product.name,
      fabric: product.fabric,
      audience: spec.audience,
      productKind: spec.productKind,
      silhouette,
      printDirection,
      palette,
      sourceImage: dressReference?.sourceImage,
      referenceNotes: dressReference
        ? `Silhouette reference: ${dressReference.silhouetteReference}`
        : matchingSetPatternBase
          ? `Pattern base: ${matchingSetPatternBase.baseId}`
          : undefined,
    }),
  };
}

function applyResortDressAIOverride(product: Product): Product {
  const override = resortDressAIProductOverrides[product.id];
  if (!override) return product;

  return {
    ...product,
    ...override,
    imagePrompts: product.imagePrompts && {
      ...product.imagePrompts,
      sourceImage: resortDressReferenceSpecs[product.id]?.sourceImage || product.imagePrompts.sourceImage,
    },
  };
}

function applySwimBaseStyleAIOverride(product: Product): Product {
  const override = swimBaseStyleAIProductOverrides[product.id];
  if (!override) return product;

  return {
    ...product,
    ...override,
  };
}

function applyMatchingSetBaseStyleAIOverride(product: Product): Product {
  const override = matchingSetBaseStyleAIProductOverrides[product.id];
  if (!override) return product;

  const matchingSetPatternBase = matchingSetPatternBases[product.id];

  return {
    ...product,
    ...override,
    details: product.details?.map((detail) => (
      matchingSetPatternBase && detail.startsWith('Pattern Base: ')
        ? `Pattern Base: ${matchingSetPatternBase.baseId}`
        : detail
    )),
  };
}

const productsDataSource: Record<string, Product[]> = {
  'aloha-shirts': alohaShopProducts,
  'tshirts-tops': [
    ...catalogTshirtTopProducts,
    { id: 'TS1001', name: 'Classic Cotton Tee', fabric: '100% Cotton / 180GSM', moq: 'MOQ 50', price: '$12', image: '/product-images/resort-generated/TS1001-flat.png?v=20260422-resort1' },
    { id: 'TS1002', name: 'Heavyweight Cotton Tee', fabric: '100% Cotton / 250GSM', moq: 'MOQ 50', price: '$15', image: '/product-images/resort-generated/TS1002-flat.png?v=20260422-resort1' },
    { id: 'TS1004', name: 'Quick-Dry Sports Tee', fabric: '100% Polyester / 140GSM', moq: 'MOQ 50', price: '$14', image: '/product-images/resort-generated/TS1004-flat.png?v=20260422-resort1' },
    { id: 'TS1201', name: 'Cotton Tank Top', fabric: '100% Cotton / 180GSM', moq: 'MOQ 50', price: '$10', image: '/product-images/resort-generated/TS1201-flat.png?v=20260422-resort1' },
    { id: 'TS1006', name: 'Acid Wash Vintage Tee', fabric: '100% Cotton / 250GSM', moq: 'MOQ 50', price: '$16', image: '/product-images/resort-generated/TS1006-flat.png?v=20260422-resort1' },
    { id: 'TS1401', name: 'Cotton Henley Tee', fabric: '100% Cotton / 200GSM', moq: 'MOQ 50', price: '$14', image: '/product-images/resort-generated/TS1401-flat.png?v=20260422-resort1' },
    { id: 'TS1301', name: 'Classic Long Sleeve Tee', fabric: '100% Cotton / 200GSM', moq: 'MOQ 50', price: '$15', image: '/product-images/resort-generated/TS1301-flat.png?v=20260422-resort1' },
    { id: 'TSW2001', name: 'Classic Cotton Tee', fabric: '100% Cotton / 160GSM', moq: 'MOQ 50', price: '$12', image: '/product-images/resort-generated/TSW2001-flat.png?v=20260422-resort1' },
    { id: 'TSW2002', name: 'Cropped Cotton Tee', fabric: '100% Cotton / 180GSM', moq: 'MOQ 50', price: '$13', image: '/product-images/resort-generated/TSW2002-flat.png?v=20260422-resort1' },
    { id: 'TSW2003', name: 'Bamboo Blend Tee', fabric: '70/30 Bamboo-Cotton / 160GSM', moq: 'MOQ 50', price: '$16', image: '/product-images/resort-generated/TSW2003-flat.png?v=20260422-resort1' },
    { id: 'TSW2202', name: 'Racerback Sports Tank', fabric: '100% Polyester / 140GSM', moq: 'MOQ 50', price: '$11', image: '/product-images/resort-generated/TSW2202-flat.png?v=20260422-resort1' },
    { id: 'TSK7001', name: 'Kids Cotton Tee', fabric: '100% Cotton / 160GSM', moq: 'MOQ 100', price: '$8', image: '/product-images/resort-generated/TSK7001-flat.png?v=20260422-resort1' },
    { id: 'TSK7002', name: 'Kids Quick-Dry Tee', fabric: '100% Polyester / 130GSM', moq: 'MOQ 100', price: '$9', image: '/product-images/resort-generated/TSK7002-flat.png?v=20260422-resort1' },
    { id: 'TSK7003', name: 'Kids Cotton Tank', fabric: '100% Cotton / 160GSM', moq: 'MOQ 100', price: '$7', image: '/product-images/resort-generated/TSK7003-flat.png?v=20260422-resort1' }
  ],
  'resort-dresses': [
    { id: 'RD1102', name: 'Knitted Stretch Polo Dress', fabric: '92/8 Poly-Spandex / 160GSM', moq: 'MOQ 50', price: '$21', image: '/product-images/resort-generated/RD1102-flat.png?v=20260422-resort1' },
    { id: 'RD1003', name: 'Smooth Polyester Shirt Dress', fabric: '100% Polyester / 130GSM', moq: 'MOQ 50', price: '$20', image: '/product-images/resort-generated/RD1003-flat.png?v=20260422-resort1' },
    { id: 'RDK7002', name: 'Girls Cotton Poplin Dress', fabric: '100% Cotton Poplin / 150GSM', moq: 'MOQ 100', price: '$16', image: '/product-images/resort-generated/RDK7002-flat.png?v=20260422-resort1' },
    { id: 'RD1401', name: 'Rayon Midi Sundress', fabric: '100% Rayon / 130GSM', moq: 'MOQ 50', price: '$22', image: '/product-images/resort-generated/RD1401-flat.png?v=20260422-resort1' },
    { id: 'RD1001', name: 'Rayon Shirt Dress', fabric: '100% Rayon / 140GSM', moq: 'MOQ 50', price: '$24', image: '/product-images/resort-generated/RD1001-flat.png?v=20260422-resort1' },
    { id: 'RDK7101', name: 'Girls Knitted Polo Dress', fabric: '100% Polyester / 145GSM', moq: 'MOQ 100', price: '$16', image: '/product-images/resort-generated/RDK7101-flat.png?v=20260422-resort1' },
    { id: 'RD1103', name: 'Rayon Polo Dress', fabric: '100% Rayon / 140GSM', moq: 'MOQ 50', price: '$23', image: '/product-images/resort-generated/RD1103-flat.png?v=20260422-resort1' },
    { id: 'RD1004', name: 'Stretch Poplin Shirt Dress', fabric: '97/3 Cotton-Spandex / 155GSM', moq: 'MOQ 50', price: '$23', image: '/product-images/resort-generated/RD1004-flat.png?v=20260422-resort1' },
    { id: 'RDK7201', name: 'Girls Rayon Sundress', fabric: '100% Rayon / 130GSM', moq: 'MOQ 100', price: '$14', image: '/product-images/resort-generated/RDK7201-flat.png?v=20260422-resort1' },
    { id: 'RD1101', name: 'Knitted DTY Polo Dress', fabric: '100% Polyester / 150GSM', moq: 'MOQ 50', price: '$22', image: '/product-images/resort-generated/RD1101-flat.png?v=20260422-resort1' },
    { id: 'RDK7102', name: 'Girls Knitted Stretch Polo Dress', fabric: '92/8 Poly-Spandex / 155GSM', moq: 'MOQ 100', price: '$15', image: '/product-images/resort-generated/RDK7102-flat.png?v=20260422-resort1' },
    { id: 'RDK7001', name: 'Girls Rayon Shirt Dress', fabric: '100% Rayon / 130GSM', moq: 'MOQ 100', price: '$15', image: '/product-images/resort-generated/RDK7001-flat.png?v=20260422-resort1' }
  ],
  'swimwear': [
    ...catalogSwimwearProducts,
    { id: 'SW1001', name: 'Classic Board Shorts', fabric: '100% Polyester / 130GSM', moq: 'MOQ 50', price: '$16', image: '/product-images/resort-generated/SW1001-flat.png?v=20260422-resort1' },
    { id: 'SWW2001', name: 'Classic One-Piece', fabric: '82/18 Poly-Spandex / 200GSM', moq: 'MOQ 50', price: '$22', image: '/product-images/resort-generated/SWW2001-flat.png?v=20260422-resort1' },
    { id: 'SW1201', name: 'Rash Guard UPF50+', fabric: '88/12 Poly-Spandex / 180GSM', moq: 'MOQ 50', price: '$18', image: '/product-images/resort-generated/SW1201-flat.png?v=20260422-resort1' },
    { id: 'SWW2201', name: 'Chiffon Sarong Cover-Up', fabric: '100% Polyester / 80GSM', moq: 'MOQ 50', price: '$14', image: '/product-images/resort-generated/SWW2201-flat.png?v=20260422-resort1' },
    { id: 'SW1002', name: 'Stretch Board Shorts', fabric: '92/8 Poly-Spandex / 140GSM', moq: 'MOQ 50', price: '$18', image: '/product-images/resort-generated/SW1002-flat.png?v=20260422-resort1' },
    { id: 'SW1101', name: 'Mesh-Lined Swim Trunks', fabric: '100% Polyester / 120GSM', moq: 'MOQ 50', price: '$15', image: '/product-images/resort-generated/SW1101-flat.png?v=20260422-resort1' },
    { id: 'SWW2101', name: 'Classic Print Bikini', fabric: '82/18 Poly-Spandex / 190GSM', moq: 'MOQ 50', price: '$20', image: '/product-images/resort-generated/SWW2101-flat.png?v=20260422-resort1' },
    { id: 'SWW2301', name: 'L/S Rash Guard UPF50+', fabric: '88/12 Poly-Spandex / 180GSM', moq: 'MOQ 50', price: '$20', image: '/product-images/resort-generated/SWW2301-flat.png?v=20260422-resort1' },
    { id: 'SWK7001', name: 'Kids Board Shorts', fabric: '100% Polyester / 120GSM', moq: 'MOQ 100', price: '$10', image: '/product-images/resort-generated/SWK7001-flat.png?v=20260422-resort1' },
    { id: 'SWK7002', name: 'Kids Rash Guard UPF50+', fabric: '88/12 Poly-Spandex / 170GSM', moq: 'MOQ 100', price: '$12', image: '/product-images/resort-generated/SWK7002-flat.png?v=20260422-resort1' },
    { id: 'SWK7003', name: 'Kids Swim Set (Top+Bottom)', fabric: '82/18 Poly-Spandex / 190GSM', moq: 'MOQ 100', price: '$14', image: '/product-images/resort-generated/SWK7003-flat.png?v=20260422-resort1' },
    { id: 'SW4001', name: 'UPF50+ Long Sleeve Rash Guard', fabric: '88% Poly 12% Spandex, 200GSM', moq: 'MOQ 50', price: '$22', image: '/product-images/resort-generated/SW4001-flat.png?v=20260422-resort1' },
    { id: 'SW6002', name: 'Girls One Piece Swimsuit', fabric: '82% Nylon 18% Spandex, 190GSM', moq: 'MOQ 100', price: '$16', image: '/product-images/resort-generated/SW6002-flat.png?v=20260422-resort1' }
  ],
  'matching-sets': [
    { id: 'MS1001', name: 'Rayon Shirt + Shorts', fabric: '100% Rayon / 140GSM', moq: 'MOQ 50', price: '$28', image: '/product-images/resort-generated/MS1001-flat.png?v=20260422-resort1' },
    { id: 'MSW2001', name: 'Rayon Top + Shorts', fabric: '100% Rayon / 130GSM', moq: 'MOQ 50', price: '$26', image: '/product-images/resort-generated/MSW2001-flat.png?v=20260422-resort1' },
    { id: 'MSF9001', name: 'Family Aloha Set', fabric: '100% Rayon / 135GSM', moq: 'MOQ 100', price: '$45', image: '/product-images/resort-generated/MSF9001-flat.png?v=20260422-resort1' },
    { id: 'MS1101', name: 'Knitted DTY Polo + Shorts', fabric: '100% Polyester / 150GSM', moq: 'MOQ 50', price: '$30', image: '/product-images/resort-generated/MS1101-flat.png?v=20260422-resort1' },
    { id: 'MS1003', name: 'Polyester Shirt + Shorts', fabric: '100% Polyester / 130GSM', moq: 'MOQ 50', price: '$25', image: '/product-images/resort-generated/MS1003-flat.png?v=20260422-resort1' },
    { id: 'MS1002', name: 'Cotton Poplin Shirt + Shorts', fabric: '100% Cotton Poplin / 160GSM', moq: 'MOQ 50', price: '$28', image: '/product-images/resort-generated/MS1002-flat.png?v=20260422-resort1' },
    { id: 'MSW2002', name: 'Chiffon Top + Shorts', fabric: '100% Polyester / 100GSM', moq: 'MOQ 50', price: '$24', image: '/product-images/resort-generated/MSW2002-flat.png?v=20260422-resort1' },
    { id: 'MSW2101', name: 'Rayon Top + Skirt', fabric: '100% Rayon / 130GSM', moq: 'MOQ 50', price: '$26', image: '/product-images/resort-generated/MSW2101-flat.png?v=20260422-resort1' },
    { id: 'MSW2102', name: 'Viscose Top + Wrap Skirt', fabric: '100% Viscose / 125GSM', moq: 'MOQ 50', price: '$27', image: '/product-images/resort-generated/MSW2102-flat.png?v=20260422-resort1' },
    { id: 'MSK7001', name: 'Kids Shirt + Shorts', fabric: '100% Rayon / 130GSM', moq: 'MOQ 100', price: '$18', image: '/product-images/resort-generated/MSK7001-flat.png?v=20260422-resort1' },
    { id: 'MSF9002', name: 'Polyester Family Set', fabric: '100% Polyester / 125GSM', moq: 'MOQ 100', price: '$42', image: '/product-images/resort-generated/MSF9002-flat.png?v=20260422-resort1' },
    { id: 'MSK7002', name: 'Kids Quick-Dry Set', fabric: '100% Polyester / 120GSM', moq: 'MOQ 100', price: '$16', image: '/product-images/resort-generated/MSK7002-flat.png?v=20260422-resort1' }
  ],
  'accessories': [
    { id: 'AC1001', name: 'Rayon Bucket Hat', fabric: '100% Rayon / 140GSM', moq: 'MOQ 100', price: '$8', image: '/product-images/resort-generated/AC1001-flat.png?v=20260422-resort1' },
    { id: 'AC1201', name: 'Canvas Aloha Tote', fabric: '100% Cotton Canvas / 300GSM', moq: 'MOQ 200', price: '$10', image: '/product-images/resort-generated/AC1201-flat.png?v=20260422-resort1' },
    { id: 'AC1301', name: 'Rayon Aloha Bandana', fabric: '100% Rayon / 100GSM', moq: 'MOQ 200', price: '$5', image: '/product-images/resort-generated/AC1301-flat.png?v=20260422-resort1' },
    { id: 'AC1101', name: 'Cotton Aloha Cap', fabric: '100% Cotton Twill / 200GSM', moq: 'MOQ 200', price: '$7', image: '/product-images/resort-generated/AC1101-flat.png?v=20260422-resort1' },
    { id: 'AC1003', name: 'Quick-Dry Bucket Hat', fabric: '100% Polyester / 120GSM', moq: 'MOQ 100', price: '$9', image: '/product-images/resort-generated/AC1003-flat.png?v=20260422-resort1' },
    { id: 'AC1002', name: 'Cotton Bucket Hat', fabric: '100% Cotton / 160GSM', moq: 'MOQ 100', price: '$8', image: '/product-images/resort-generated/AC1002-flat.png?v=20260422-resort1' },
    { id: 'AC1401', name: 'Rayon Scrunchie', fabric: '100% Rayon / 140GSM', moq: 'MOQ 300', price: '$3', image: '/product-images/resort-generated/AC1401-flat.png?v=20260422-resort1' },
    { id: 'AC1302', name: 'Chiffon Aloha Scarf', fabric: '100% Polyester / 80GSM', moq: 'MOQ 200', price: '$6', image: '/product-images/resort-generated/AC1302-flat.png?v=20260422-resort1' }
  ]
};

export const productsData: Record<string, Product[]> = Object.fromEntries(
  Object.entries(productsDataSource).map(([category, products]) => [
    category,
    products.map((product) => applyMatchingSetBaseStyleAIOverride(
      applySwimBaseStyleAIOverride(
        applyResortDressAIOverride(
          withGeneratedResortImages(product, category),
        ),
      ),
    )),
  ]),
) as Record<string, Product[]>;

