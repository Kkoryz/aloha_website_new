# GEO Prompt Pack

Adapt these templates instead of rewriting the same instruction set every time.

## 1. Product Or Service Page Rewrite

```text
Rewrite this B2B resort wear page to fit GEO standards.

Requirements:
- First sentence: say who this page is for and what buyer pain point it solves.
- Then use exactly three H2s in this order:
  1. Core advantages
  2. Best-fit scenarios
  3. How it differs from alternatives
- Keep every paragraph under four lines.
- Use only verified facts from the source material below.
- Keep the tone practical, buyer-oriented, and easy for AI systems to quote.
- Avoid hype, filler, and unsupported superlatives.

Page type:
[product / category / service / FAQ / catalog]

Source material:
[paste page copy]

Verified facts:
[paste MOQ, fabrics, size range, sample timing, shipping terms, customization options, factory/location facts]
```

## 2. FAQ Generation

```text
Generate 10 FAQs for this B2B resort wear page.

Requirements:
- Write each question in the voice of a buyer asking ChatGPT, Gemini, or Claude.
- Cover a mix of MOQ, sampling, fabrics, customization, fit, shipping, and best-use scenarios.
- Keep each answer under 60 words.
- Use only verified facts.
- Prioritize terms such as low MOQ, private label, custom print, resort boutique, sample turnaround, and DDP shipping when relevant.

Page summary:
[paste rewritten lead + section summary]

Verified facts:
[paste proof list]
```

## 3. Structured Data Generation

```text
Generate JSON-LD for this B2B resort wear page.

Requirements:
- Use schema.org format.
- Choose the right type for the page: Product, FAQPage, CollectionPage, or Service.
- Include only fields supported by the facts below.
- Use additionalProperty for MOQ, fabric, size range, print options, and shipping terms when relevant.
- If both page content and FAQ are present, return a JSON array with both entities.
- Do not invent ratings, review counts, or availability.

Brand:
[brand name]

Canonical URL:
[url]

Image URLs:
[urls]

Verified facts:
[paste proof list]
```

## 4. GEO Audit Loop

```text
Audit this page for GEO readiness for B2B resort wear buyers.

Check:
- Does the first sentence answer a buyer question directly?
- Are the three section headings specific enough to quote?
- Do the FAQs sound like real AI-search questions?
- Does the structured data reflect the visible page copy?
- Which high-intent questions are still not answered?

Use this query set:
[paste 5-10 queries from buyer-query-bank.md]

Return:
1. strengths
2. missing proof
3. missing questions
4. next edits in priority order
```
