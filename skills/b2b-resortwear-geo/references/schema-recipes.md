# Schema Recipes

Use JSON-LD unless the user explicitly asks for a different format.

## Product Page

Use for single SKU or style-detail pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "",
  "sku": "",
  "description": "",
  "image": [""],
  "brand": {
    "@type": "Brand",
    "name": ""
  },
  "category": "",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Fabric",
      "value": ""
    },
    {
      "@type": "PropertyValue",
      "name": "MOQ",
      "value": ""
    },
    {
      "@type": "PropertyValue",
      "name": "Size Range",
      "value": ""
    },
    {
      "@type": "PropertyValue",
      "name": "Customization",
      "value": ""
    }
  ]
}
```

Add `offers` only when price or availability is verified.

## FAQPage

Use when the FAQ block is visible on the same page.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ""
      }
    }
  ]
}
```

## CollectionPage

Use for category pages, catalog pages, and grouped style pages.

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "",
  "url": "",
  "description": "",
  "isPartOf": {
    "@type": "WebSite",
    "name": "",
    "url": ""
  }
}
```

Add supporting `FAQPage` markup as a second object in a JSON array when the collection page includes a visible FAQ block.

## Service

Use for private-label development, sampling, or bulk-production pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "",
  "description": "",
  "provider": {
    "@type": "Organization",
    "name": ""
  },
  "areaServed": [""],
  "serviceType": "",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "MOQ",
      "value": ""
    },
    {
      "@type": "PropertyValue",
      "name": "Sample Turnaround",
      "value": ""
    },
    {
      "@type": "PropertyValue",
      "name": "Shipping Options",
      "value": ""
    }
  ]
}
```

## Field Mapping Hints

- `name`: page title or SKU plus style name
- `description`: the rewritten lead plus one grounded detail sentence
- `image`: only canonical page images or verified product assets
- `category`: use the real merch category, not a marketing slogan
- `additionalProperty`: prefer fabric, MOQ, size range, print method, labeling, packaging, and shipping terms
- `serviceType`: use plain phrases such as `Private Label Resort Wear Production`

## Safety Rules

- Do not add `aggregateRating`, `review`, or `reviewCount` without proof.
- Do not add `availability` unless the business actually tracks stock status for that page.
- Do not add `priceValidUntil` unless a real date exists.
- Keep the schema aligned with the visible page copy after every edit.
