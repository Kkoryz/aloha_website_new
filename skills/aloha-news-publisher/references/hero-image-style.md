# Hero Image Style

Create one PNG hero image per report article:

`public/news-images/YYYY-MM-DD-slug.png`

The JSON `image` field must be:

`/news-images/YYYY-MM-DD-slug.png`

## Direction

Use AI-generated editorial B2B manufacturing imagery for premium resortwear and swimwear. The image should feel useful for an industry article, not like a consumer ad. Use local files in `public/news-images/`; do not depend on Unsplash hotlinks in production.

Good subjects:

- resortwear samples on a studio table
- fabric swatches, trims, hangtags, and technical sketches
- swimwear or UPF activewear laid flat for development review
- print strike-offs and color cards
- clean factory sampling room details
- shipping cartons, garment bags, and organized production paperwork

Avoid:

- readable brand logos or copied source-company branding
- celebrity likenesses
- fake charts with readable numbers
- generic boardroom imagery
- over-glossy fashion campaign scenes
- text embedded in the image

## Prompt Template

```text
Premium editorial photo for a B2B resortwear manufacturing news article about [ARTICLE ANGLE]. Clean studio sampling table with [RELEVANT PRODUCTS OR MATERIALS], fabric swatches, trims, production notes, and subtle coastal resort color accents. High-end factory-direct aesthetic, natural light, realistic materials, no logos, no readable text, no people, no brand names, landscape hero composition, 16:9.
```

Use the article's keyword cluster to adapt the objects in the scene:

- swimwear and UPF50+ activewear: rash guard fabric, swim lining, stretch fabric, color cards.
- low MOQ sampling: small sample run, tech pack pages with unreadable marks, measurement tape.
- custom prints: print strike-offs, repeat pattern swatches, Pantone-like color chips without readable labels.
- FOB/DDP shipping: folded garments, carton labels without readable text, packing list shapes, measuring tape.
- resort wear manufacturing: shirts, dresses, cover-ups, trims, and sample tags without readable text.
