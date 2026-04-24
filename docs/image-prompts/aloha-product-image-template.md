# Aloha Product Image Prompt Template

Use this same system for every Aloha catalog product. Generate two separate 4:5 assets per product:

- `{id}-flat.png`: default shop/category image.
- `{id}-model.png`: hover image and product-detail model image.

The product page UI supplies the SKU badge, title, fabric, size, MOQ, and price. Do not generate any text, badges, watermarks, labels, prices, or UI elements inside the image.

## Flat Product Image

```text
Use case: ecommerce product image for Aloha catalog.
Asset type: default product-only flat lay image, vertical 4:5.

Product: {id} {name}
Excel row: {excelRow}
Category: {category}
Style: {style}
Fabric: {fabric}
Fit: {fit}
Sizes: {sizes}
Source reference image: {sourceImage}

Garment construction: {silhouette}
Color and print direction: {pattern}

Reference method: use the provided Excel photo-column product image for this row as the style, silhouette, print, trim, and construction reference. Regenerate it as a new clean ecommerce asset; do not copy the original photo pixels, background, shadows, labels, or layout. Mimic a clean wholesale ecommerce product tile like Baliswim. Single front-facing product image only, no model, no mannequin, no hanger. For two-piece sets, lay the complete set neatly as one product.

Scene and background: seamless studio background exactly #fbfaf7, matching the website product media background. No border, no black outline, no paper texture.
Composition: centered product, front-facing, product fills 58-70% of the vertical frame, generous empty space above and below for the website text block. Natural soft shadow only.
Photography style: photorealistic apparel product photography, crisp fabric edge, accurate seams, collar/placket/hem/strap construction, realistic fabric texture and print scale.

Strict exclusions: no text, no SKU badge, no logo, no watermark, no price, no UI labels, no props, no lifestyle scene, no duplicate product, no back view unless explicitly requested for that SKU.
```

## Headless Model Hover Image

```text
Use case: ecommerce hover image for Aloha catalog.
Asset type: headless model image, vertical 4:5.

Product: {id} {name}
Excel row: {excelRow}
Category: {category}
Style: {style}
Fabric: {fabric}
Fit: {fit}
Sizes: {sizes}
Source reference image: {sourceImage}

Garment construction: {silhouette}
Color and print direction: {pattern}

Model consistency system:
- Adult menswear uses the same male catalog model profile across every menswear SKU: medium-tan skin, average athletic build, straight shoulders, relaxed arms, neutral torso stance.
- Adult womenswear uses the same female catalog model profile across every womenswear SKU: medium-tan skin, balanced commercial fit-model proportions, straight shoulders, relaxed arms, neutral torso stance.
- Kids products use the same age-appropriate child catalog model profile for boys/girls products, fully clothed and neutral.
- Accessories use the same neutral adult torso crop holding or wearing the item consistently.

Reference method: use the provided Excel photo-column product image for this row as the style, silhouette, print, trim, and construction reference. Regenerate the same garment on the model as a new clean ecommerce asset; do not copy the original photo pixels, background, shadows, labels, or layout. Mimic the Baliswim hover image. The same garment from the flat image is worn on the model, front-facing, centered, clean catalog posture.
Headless crop: crop at the lower neck/base of neck only. Do not show chin, jaw, mouth, nose, eyes, hair, or face.
Scene and background: seamless studio background exactly #fbfaf7, matching the website product media background. No border, no black outline, no paper texture.
Composition: product and torso centered; arms relaxed near hips or thighs; garment fully visible; product fills 70-84% of the vertical frame. Non-sexualized catalog presentation for swimwear.
Photography style: photorealistic ecommerce model photography, soft even studio lighting, realistic fabric drape, exact same color/pattern scale as the flat image.

Strict exclusions: no visible face, no expressive fashion pose, no crossed arms, no sitting, no text, no SKU badge, no logo, no watermark, no price, no props, no lifestyle background.
```
