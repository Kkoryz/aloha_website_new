# CMS JSON Contract

Write one file per report article:

`content/news/YYYY-MM-DD-slug.json`

Use lowercase kebab-case slugs. The file date and JSON `date` must match.

## Required Shape

```json
{
  "slug": "example-slug",
  "title": "Buyer-Facing News Title",
  "excerpt": "One sentence for cards and listing pages.",
  "summary": "A concise paragraph explaining the industry signal and buyer implication.",
  "date": "YYYY-MM-DD",
  "author": "Aloha and Co",
  "image": "/news-images/YYYY-MM-DD-slug.png",
  "category": "Market",
  "keyTakeaways": [
    "Takeaway one.",
    "Takeaway two.",
    "Takeaway three.",
    "Takeaway four."
  ],
  "topics": [
    "resort wear manufacturing",
    "private label"
  ],
  "sections": [
    {
      "id": "section-id",
      "title": "Section Title",
      "paragraphs": [
        "Paragraph one.",
        "Paragraph two."
      ]
    }
  ],
  "sources": [
    {
      "title": "Source publication and article title",
      "url": "https://example.com/source"
    }
  ]
}
```

## Field Rules

- `title`: specific and buyer-relevant; avoid clickbait.
- `excerpt`: 140-190 characters when possible.
- `summary`: summarize the news signal and the procurement/product implication.
- `category`: use `Market`, `Development`, `Operations`, or `Shipping` unless the site adds more categories.
- `keyTakeaways`: 3-5 bullets, all source-backed.
- `topics`: 5-9 search terms from the selected keyword cluster.
- `sections`: 3-5 sections; each section should have 1-3 paragraphs.
- `sources`: include all source URLs used for the report. Never include a source that was not opened and checked.

## Report Checklist

- The first section states the external signal before adding analysis.
- The report uses 5-10 sources to explain one strongest story or buyer signal.
- The report names the buyer consequence: assortment, fabric, print, MOQ, sampling, costing, compliance, or shipping.
- The Aloha & Co angle is analytical, not promotional.
- No unsupported dates, quotes, figures, claims, or certifications.
- No copied paragraphs from sources. Paraphrase and cite by URL.
- JSON parses cleanly.
- The referenced local hero image exists before running the build step.
