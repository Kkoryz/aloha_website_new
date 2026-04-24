# Aloha Shirts Image Prompts

Use the same product metadata for all Aloha Shirt SKUs. The shop card uses the flat image by default and swaps to the model image on hover.

## Save Paths

- Flat product image: `public/product-images/aloha-shirts/{SKU}-flat.webp`
- Hover model image: `public/product-images/aloha-shirts/{SKU}-model.webp`
- Product detail hero: `public/product-images/aloha-shirts/{SKU}-detail.webp`

After generation, update:

- `image` with the flat image path.
- `hoverImage` with the model image path.

## Flat Product Prompt

```text
Use case: product-mockup
Asset type: shop grid default image, 4:5 vertical ecommerce product tile
Primary request: Generate a clean white-background packshot of the garment only.
Product: {SKU} {PRODUCT_NAME}
Fabric: {FABRIC}
Silhouette: {SILHOUETTE}
Print direction: {PRINT_DIRECTION}
Color palette: {PALETTE}
Garment category: custom resort wear aloha shirt product sample
Keep the garment construction accurate and commercially realistic.
No text, no logo, no SKU badge, no watermark, no hanger, no props.
Scene/backdrop: pure white studio background with very soft grounding shadow.
Composition/framing: front-facing garment, centered, symmetrical, sleeves naturally relaxed, product fills about 72% of the frame, ample white margin like a premium wholesale catalog.
Style/medium: photorealistic apparel product photography, high detail fabric texture, no mannequin and no human body.
Lighting/mood: soft even studio lighting, minimal contrast, true-to-fabric color.
Avoid: flat vector art, lifestyle background, folded clothing, cropped sleeves, distorted collars, extra buttons, transparent fabric unless specified.
```

## Hover Model Prompt

```text
Use case: product-mockup
Asset type: shop grid hover image, 4:5 vertical ecommerce model tile
Primary request: Generate the same garment worn by a model in the hover pose.
Product: {SKU} {PRODUCT_NAME}
Fabric: {FABRIC}
Silhouette: {SILHOUETTE}
Print direction: {PRINT_DIRECTION}
Color palette: {PALETTE}
Garment category: custom resort wear aloha shirt product sample
Keep the garment construction accurate and commercially realistic.
No text, no logo, no SKU badge, no watermark, no hanger, no props.
Subject: {MODEL_TYPE} wearing only the product sample as the hero garment, styled minimally with neutral bottoms if needed.
Scene/backdrop: pure white studio background.
Composition/framing: straight-on catalog pose similar to the reference: model standing upright, shoulders square to camera, arms relaxed down with hands near hips or thighs, legs neutral, garment fully visible, crop from neck to upper thigh for adult shirts and full safe torso framing for kids.
Style/medium: photorealistic ecommerce apparel photography, natural body proportions, fabric drape and print scale must match the flat image.
Lighting/mood: soft even studio lighting, crisp garment edges, clean commercial look.
Avoid: expressive fashion pose, crossed arms, sitting, beach background, face-focused portrait, sunglasses, jewelry, logos, text, watermark, excessive skin exposure.
```

## Detail Hero Prompt

```text
Use case: product-mockup
Asset type: product detail hero image, wide white-background ecommerce image
Primary request: Generate a larger high-resolution packshot of the garment only for the product detail page.
Product: {SKU} {PRODUCT_NAME}
Fabric: {FABRIC}
Silhouette: {SILHOUETTE}
Print direction: {PRINT_DIRECTION}
Color palette: {PALETTE}
Garment category: custom resort wear aloha shirt product sample
Keep the garment construction accurate and commercially realistic.
No text, no logo, no SKU badge, no watermark, no hanger, no props.
Scene/backdrop: pure white studio background with a faint natural shadow.
Composition/framing: garment centered and front-facing, slightly wider crop than the shop tile, sleeves and hem fully visible, enough whitespace for thumbnails and detail-page layout.
Style/medium: photorealistic product photography, sharp stitching, accurate collar, placket, hem and fabric texture.
Lighting/mood: softbox studio lighting, neutral white balance, premium wholesale catalog finish.
Avoid: person, mannequin, hanger, folded garment, lifestyle props, text, SKU badge, watermark.
```

## Example: AL1001

```text
Use case: product-mockup
Asset type: shop grid hover image, 4:5 vertical ecommerce model tile
Primary request: Generate the same garment worn by a model in the hover pose.
Product: AL1001 Classic Fit Camp Shirt
Fabric: 100% Rayon / 140GSM
Silhouette: classic short-sleeve camp shirt, open collar, straight hem, relaxed resort fit
Print direction: large tropical hibiscus and palm print, balanced repeat, matched across placket
Color palette: navy ground with ivory, coral, and muted green accents
Garment category: custom resort wear aloha shirt product sample
Keep the garment construction accurate and commercially realistic.
No text, no logo, no SKU badge, no watermark, no hanger, no props.
Subject: adult male model wearing only the product sample as the hero garment, styled minimally with neutral bottoms if needed.
Scene/backdrop: pure white studio background.
Composition/framing: straight-on catalog pose similar to the reference: model standing upright, shoulders square to camera, arms relaxed down with hands near hips or thighs, legs neutral, garment fully visible, crop from neck to upper thigh for adult shirts and full safe torso framing for kids.
Style/medium: photorealistic ecommerce apparel photography, natural body proportions, fabric drape and print scale must match the flat image.
Lighting/mood: soft even studio lighting, crisp garment edges, clean commercial look.
Avoid: expressive fashion pose, crossed arms, sitting, beach background, face-focused portrait, sunglasses, jewelry, logos, text, watermark, excessive skin exposure.
```
