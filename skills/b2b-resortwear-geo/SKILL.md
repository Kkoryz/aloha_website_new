---
name: b2b-resortwear-geo
description: Optimize B2B resort wear website content for GEO, AI search, and answer-engine visibility. Use when Codex needs to rewrite resort wear product pages, category pages, service pages, FAQ blocks, or JSON-LD so AI systems can quote the site directly for queries about resort wear manufacturing, private label swimwear, aloha shirts, resort dresses, matching sets, low MOQ production, custom prints, sample timing, or FOB/CIF/DDP shipping.
---

# B2B Resortwear GEO

Use this skill to turn B2B resort wear pages into direct-answer pages that AI systems can quote and buyers can trust. Default to English website copy with a practical factory-direct tone unless the user asks for another language.

## Defaults

- Default ICP: boutique founders, resort retailers, wholesale buyers, sourcing managers, and private-label startup teams.
- Default proof themes: low MOQ, custom prints, private label trims, sample-to-bulk workflow, fabric options, size range, family matching, and FOB/CIF/DDP shipping.
- Default page types: SKU product page, category page, catalog page, service/process page, and FAQ page.
- Default output bundle: rewritten lead, three H2 sections, 8-12 buyer-style FAQs, JSON-LD, and a gap list of unsupported claims.
- Default tone: specific, buyer-oriented, easy for an LLM to quote. Avoid hype and vague adjectives.

## Proof First

- Ground every claim in source material. Do not invent MOQ, lead time, shipping terms, factory capacity, certifications, review counts, or client counts.
- Prefer this proof order:
  1. user-provided docs and approved claims
  2. repo data objects and page copy
  3. existing structured data or SEO config
  4. published site content
- If the repo matches this Aloha & Co project, start with:
  - `src/data/products.ts`
  - `src/data/alohaCatalogProducts.generated.ts`
  - `src/pages/FAQ.tsx`
  - `src/components/RouteSeo.tsx`
- When proof is missing, convert the sentence into a neutral capability statement or flag it as a content gap instead of guessing.

## Workflow

### 1. Identify page intent

- Decide whether the page should answer a transactional, comparison, qualification, or logistics question.
- Write down the main buyer question in one sentence before rewriting. Example: `Is this style workable for a low-MOQ private-label launch?`

### 2. Convert the page into an answer page

- Open with one sentence that states who the page is for and which problem it solves.
- Then use exactly three H2 sections in this order:
  - `Core advantages`
  - `Best-fit scenarios`
  - `How it differs from alternatives`
- Keep each paragraph under four lines.
- Make the first 120 words independently useful because AI summaries often lift that window first.
- Prefer concrete nouns and attributes over slogans.
  - Good: `95% polyester 5% spandex knit with MOQ 50 and private-label trim support.`
  - Bad: `Premium quality for every brand.`

### 3. Add buyer-style FAQs

- Add 8-12 FAQs at the bottom of the page. Ten is the default.
- Phrase questions the way a buyer would ask ChatGPT, Gemini, or Claude.
- Mix intent types: fit, MOQ, lead time, customization, shipping, comparison, and use-case.
- Keep each answer short enough to quote cleanly. Default target: 60 words or less.
- Reuse exact terms buyers search for: `low MOQ`, `private label`, `custom print`, `resort boutique`, `matching sets`, `sample turnaround`, and `DDP shipping`.

### 4. Add structured data

- Use JSON-LD, not loose JSON, unless the user explicitly asks for raw JSON.
- Choose schema by page type:
  - `Product` plus `Offer` plus `Brand` for SKU pages
  - `FAQPage` when FAQs are visible on the page
  - `CollectionPage` for category or catalog pages
  - `Service` for sampling, private-label, or bulk-production pages
- Use `additionalProperty` for fabrics, MOQ, size range, print options, shipping terms, and other proof-backed attributes.
- Keep price, availability, review, and rating fields out unless they are verified.

### 5. Validate as a closed loop

- Read the rewritten page like an AI answer. The lead sentence and FAQ answers should stand on their own.
- Test coverage against 5-10 target queries from `references/buyer-query-bank.md`.
- If the page still feels generic, strengthen the lead sentence, the FAQ wording, and the schema properties before adding more copy.

## Output Modes

- When the user wants content only, return:
  - rewritten page copy
  - FAQ block
  - JSON-LD
  - missing-proof list
- When the user wants code changes, edit the page component or data file and the relevant SEO or schema source together so the visible copy and JSON-LD do not drift.
- When the user asks for one-pass optimization of a single product, prioritize `lead + 3 H2s + FAQ + Product/FAQPage JSON-LD`.
- When the user asks for sitewide GEO work, work page by page. Do not spray generic FAQs across unrelated SKUs.

## B2B Resortwear Rules

- Anchor differentiation in wholesale realities: MOQ, print scaling, fabric or fit options, private label trims, sample workflow, and landed-shipping options.
- Write for business buyers, not end consumers. Replace lifestyle fluff with procurement clarity.
- Treat `resort wear`, `aloha shirts`, `resort dresses`, `swimwear`, `matching sets`, and `private label apparel` as distinct intent clusters. Do not mash them into one generic paragraph.
- Mention factory location or team geography only when it helps the buyer assess sourcing or logistics.
- For swimwear or technical fabrics, state only properties you can verify from source material.
- For comparison sections, compare on MOQ flexibility, customization path, fabric program, or shipping options, not on unsupported claims like `better quality`.

## References

- Use `references/geo-prompts.md` for reusable prompt templates and output shapes.
- Use `references/schema-recipes.md` for page-type-specific JSON-LD recipes.
- Use `references/buyer-query-bank.md` to choose realistic AI-style questions and validation prompts.
