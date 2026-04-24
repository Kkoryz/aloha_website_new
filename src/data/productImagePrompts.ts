export interface AlohaImagePromptInput {
  id: string;
  name: string;
  fabric: string;
  audience: 'mens' | 'womens' | 'kids';
  silhouette: string;
  printDirection: string;
  palette: string;
  sourceImage?: string;
}

export interface ProductImagePrompts {
  sourceImage?: string;
  flat: string;
  model: string;
  detail: string;
}

export interface ResortImagePromptInput {
  id: string;
  name: string;
  fabric: string;
  audience: 'mens' | 'womens' | 'kids' | 'family' | 'unisex';
  productKind: string;
  silhouette: string;
  printDirection: string;
  palette: string;
  sourceImage?: string;
  referenceNotes?: string;
}

const audienceLabel: Record<AlohaImagePromptInput['audience'], string> = {
  mens: 'adult male model',
  womens: 'adult female model',
  kids: 'child model, fully clothed, age-appropriate neutral catalog pose',
};

const resortAudienceLabel: Record<ResortImagePromptInput['audience'], string> = {
  mens: 'adult male headless catalog model',
  womens: 'adult female headless catalog model',
  kids: 'child headless catalog model, fully clothed, age-appropriate neutral catalog pose',
  family: 'coordinated headless family catalog crop, fully clothed, neutral catalog pose',
  unisex: 'neutral adult headless catalog model',
};

export function buildAlohaImagePrompts(input: AlohaImagePromptInput): ProductImagePrompts {
  const shared = [
    `Product: ${input.id} ${input.name}`,
    `Fabric: ${input.fabric}`,
    `Silhouette: ${input.silhouette}`,
    `Print direction: ${input.printDirection}`,
    `Color palette: ${input.palette}`,
    'Garment category: custom resort wear aloha shirt product sample',
    'Keep the garment construction accurate and commercially realistic.',
    'No text, no logo, no SKU badge, no watermark, no hanger, no props.',
  ].join('\n');

  return {
    sourceImage: input.sourceImage,
    flat: [
      'Use case: product-mockup',
      'Asset type: shop grid default image, 4:5 vertical ecommerce product tile',
      'Primary request: Generate a clean white-background packshot of the garment only.',
      shared,
      'Scene/backdrop: pure white studio background with very soft grounding shadow.',
      'Composition/framing: front-facing garment, centered, symmetrical, sleeves naturally relaxed, product fills about 72% of the frame, ample white margin like a premium wholesale catalog.',
      'Style/medium: photorealistic apparel product photography, high detail fabric texture, no mannequin and no human body.',
      'Lighting/mood: soft even studio lighting, minimal contrast, true-to-fabric color.',
      'Avoid: flat vector art, lifestyle background, folded clothing, cropped sleeves, distorted collars, extra buttons, transparent fabric unless specified.',
    ].join('\n'),
    model: [
      'Use case: product-mockup',
      'Asset type: shop grid hover image, 4:5 vertical ecommerce model tile',
      'Primary request: Generate the same garment worn by a model in the hover pose.',
      shared,
      `Subject: ${audienceLabel[input.audience]} wearing only the product sample as the hero garment, styled minimally with neutral bottoms if needed.`,
      'Scene/backdrop: pure white studio background.',
      'Composition/framing: straight-on catalog pose similar to the reference: model standing upright, shoulders square to camera, arms relaxed down with hands near hips or thighs, legs neutral, garment fully visible, crop from neck to upper thigh for adult shirts and full safe torso framing for kids.',
      'Style/medium: photorealistic ecommerce apparel photography, natural body proportions, fabric drape and print scale must match the flat image.',
      'Lighting/mood: soft even studio lighting, crisp garment edges, clean commercial look.',
      'Avoid: expressive fashion pose, crossed arms, sitting, beach background, face-focused portrait, sunglasses, jewelry, logos, text, watermark, excessive skin exposure.',
    ].join('\n'),
    detail: [
      'Use case: product-mockup',
      'Asset type: product detail hero image, wide white-background ecommerce image',
      'Primary request: Generate a larger high-resolution packshot of the garment only for the product detail page.',
      shared,
      'Scene/backdrop: pure white studio background with a faint natural shadow.',
      'Composition/framing: garment centered and front-facing, slightly wider crop than the shop tile, sleeves and hem fully visible, enough whitespace for thumbnails and detail-page layout.',
      'Style/medium: photorealistic product photography, sharp stitching, accurate collar, placket, hem and fabric texture.',
      'Lighting/mood: softbox studio lighting, neutral white balance, premium wholesale catalog finish.',
      'Avoid: person, mannequin, hanger, folded garment, lifestyle props, text, SKU badge, watermark.',
    ].join('\n'),
  };
}

export function buildResortProductImagePrompts(input: ResortImagePromptInput): ProductImagePrompts {
  const shared = [
    `Product: ${input.id} ${input.name}`,
    `Fabric: ${input.fabric}`,
    `Product kind: ${input.productKind}`,
    `Silhouette: ${input.silhouette}`,
    `Print direction: ${input.printDirection}`,
    `Color palette: ${input.palette}`,
    input.sourceImage ? `Source reference image: ${input.sourceImage}` : undefined,
    input.referenceNotes ? `Reference notes: ${input.referenceNotes}` : undefined,
    'Garment category: custom resort wear product sample',
    'Design language: refined island resortwear with realistic fabric and balanced medium-density hand-painted palms, hibiscus, coastal botanicals, clean stripes, or sun-faded accents; original artwork only.',
    'Keep the construction accurate and commercially realistic.',
    'No brand text, no SKU badge, no watermark, no logos, no props.',
  ].filter(Boolean).join('\n');

  const referenceMethod = input.sourceImage
    ? 'Reference method: use the provided source reference image as inspiration for silhouette, print balance, color direction, and trim feel. Regenerate it as a new clean ecommerce asset; do not copy the original photo pixels, background, shadows, or layout.'
    : 'Reference method: create original resort artwork with commercially realistic garment construction and balanced print placement.';

  return {
    flat: [
      'Use case: product-mockup',
      'Asset type: shop grid default image, 4:5 vertical ecommerce product tile',
      'Primary request: Generate a clean off-white studio flat-lay / product-only packshot of the item.',
      shared,
      referenceMethod,
      'Scene/backdrop: seamless #fbfaf7 studio background with very soft grounding shadow.',
      'Composition/framing: front-facing product, centered and symmetrical; product fills about 68% of the frame with premium wholesale catalog margin.',
      'Style/medium: realistic ecommerce apparel photography, natural fabric texture, accurate seams, trims, waistbands, straps, and hems; avoid illustration or vector-like rendering.',
      'Lighting/mood: soft even studio lighting, neutral white balance, true-to-fabric color.',
      'Avoid: overly dense all-over scenic prints, nearly blank designs, lifestyle background, hanger, folded clothing unless the SKU is an accessory, cropped hems or sleeves, distorted construction, copied brand artwork.',
    ].join('\n'),
    model: [
      'Use case: product-mockup',
      'Asset type: shop grid hover image, 4:5 vertical ecommerce headless model tile',
      'Primary request: Generate the same product worn, held, or styled by the model in a clean catalog hover pose.',
      shared,
      referenceMethod,
      `Subject: ${resortAudienceLabel[input.audience]} with the product as the hero item.`,
      'Scene/backdrop: seamless #fbfaf7 studio background.',
      'Composition/framing: straight-on catalog pose; headless crop at the lower neck with no chin, jaw, mouth, hair, or face visible; garment fully visible and centered.',
      'Style/medium: realistic ecommerce apparel photography, natural body proportions, believable fabric drape and print scale consistent with the flat image; avoid illustration or vector-like rendering.',
      'Lighting/mood: soft even studio lighting, crisp edges, clean commercial look.',
      'Avoid: overly dense all-over scenic prints, nearly blank designs, visible face, expressive pose, crossed arms, sitting, beach background, sunglasses, jewelry, logos, text, watermark, excessive skin exposure, copied brand artwork.',
    ].join('\n'),
    detail: [
      'Use case: product-mockup',
      'Asset type: product detail hero image, wide clean ecommerce image',
      'Primary request: Generate a larger product-only flat-lay / packshot for the product detail page.',
      shared,
      referenceMethod,
      'Scene/backdrop: seamless #fbfaf7 studio background with a faint natural shadow.',
      'Composition/framing: product centered and front-facing, enough whitespace for detail-page layout, all key construction details visible.',
      'Style/medium: realistic product photography, sharp stitching and believable textile texture.',
      'Lighting/mood: softbox studio lighting, premium wholesale catalog finish.',
      'Avoid: overly dense all-over scenic prints, nearly blank designs, person, visible face, hanger, lifestyle props, text, SKU badge, watermark, copied brand artwork.',
    ].join('\n'),
  };
}
