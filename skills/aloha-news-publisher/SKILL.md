---
name: aloha-news-publisher
description: Publish current, source-backed English B2B news articles for the Aloha & Co resortwear manufacturing website. Use when Codex needs to research today's apparel, resort wear, swimwear, sourcing, private-label, low MOQ, custom print, fabric, sampling, or logistics news; turn it into buyer-facing manufacturing analysis; generate CMS JSON under content/news; create matching hero images under public/news-images; and run the news build step.
---

# Aloha News Publisher

Use this skill to publish a daily batch of current industry news for Aloha & Co. The output is not generic news rewriting: every article must connect a real external signal to practical decisions for resortwear founders, wholesale buyers, and private-label teams.

## Defaults

- Language: English.
- Tone: B2B, buyer-facing, calm, factory-direct, premium but not promotional.
- Source set: search 5-10 relevant current sources by default.
- Article count: publish one concise report article by default, not one article per source.
- Theme rule: one report uses one keyword cluster from `references/site-keywords.md`.
- CMS path: `content/news/YYYY-MM-DD-slug.json`.
- Featured image: use an AI-generated local PNG by default at `/news-images/YYYY-MM-DD-slug.png`. Do not rely on Unsplash hotlinks for production publishing.
- Build command after writing JSON and images: `npm run build:news` (this also chains `build:seo`, which regenerates SEO/GEO assets).

## Non-Negotiables

- Browse the web for current sources. Do not write "latest" news from memory.
- Save source URLs in every article. Do not invent dates, figures, quotes, product announcements, certifications, or company claims.
- Keep the report aligned to the selected keyword cluster. Do not mix unrelated celebrity swim launches, freight policy, and textile trends unless they naturally support the same cluster.
- Add Aloha & Co manufacturing analysis only when the news touches product development, fabrics, prints, MOQ, sampling, private label, shipping, wholesale buying, or factory sourcing.
- Avoid sales copy. Mention Aloha & Co capabilities only as analytical context, not as a pitch.
- Do not edit `src/data/news.ts` by hand. Write CMS JSON, save hero images, then run `npm run build:news`.

## Workflow

### 1. Choose a Keyword Cluster

Read `references/site-keywords.md`, then select one cluster that is both relevant to Aloha & Co and supported by current source material.

Good default clusters include:

- resort wear manufacturing
- swimwear and UPF50+ activewear
- low MOQ sampling
- custom prints
- FOB/DDP shipping

State the selected cluster before drafting. If there are not enough current sources for 5 useful articles, choose another cluster.

### 2. Research Current Sources

Use web search/news search and primary or reputable trade/editorial sources. Prefer sources published in the last 30-90 days unless the topic is slower moving and still current.

For each candidate article, record:

- source title
- source URL
- publication date if visible
- exact news signal
- why it matters to B2B resortwear/private-label buyers
- relevance gate: product, fabric, print, MOQ, sample, logistics, wholesale, retail demand, or sourcing

Reject weak candidates that only provide lifestyle gossip, generic trend fluff, or unsupported claims.

### 3. Build One Report Around One Theme

Use 5-10 sources to write one report article. The report should identify the single strongest market story or buyer signal, then use the remaining sources as supporting context. Do not publish separate articles for each source unless the user explicitly asks for multiple articles.

Examples for one `swimwear and UPF50+ activewear` report:

- UPF fabric demand
- rash guard styling
- resort swim fit/coverage
- sporty swim details
- recycled nylon or polyester sourcing
- size inclusivity and grading
- destination retail assortment planning

### 4. Write a Buyer-Facing Report

Use the CMS shape in `references/cms-json.md`.

Report defaults:

- 700-1,000 words.
- 3-5 sections.
- 4 key takeaways when source support is strong.
- `sources` must include every URL used.
- `topics` should include searchable buyer terms.
- `category` should usually be `Market`, `Development`, `Operations`, or `Shipping`.
- Include a simple table-of-contents section when the report is a source roundup.

The report should explain what a buyer or founder should do with the signal: adjust line planning, test a smaller MOQ capsule, refine artwork, choose fabric specs, manage sample risk, or plan landed-cost decisions.

### 5. Add a Featured Image

Create one AI hero image for the report using `references/hero-image-style.md`. Save it as PNG at:

`public/news-images/YYYY-MM-DD-slug.png`

The image must look like editorial manufacturing imagery for resortwear or swimwear, not a generic business illustration. Do not use logos or readable brand names from sourced companies. Avoid Unsplash direct URLs because they can 404, redirect through anti-bot pages, or change without notice.

### 6. Validate, Build, and Regenerate SEO/GEO Assets

After all JSON and image files are written:

```bash
npm run build:news    # validates article JSON, then runs build:seo
npm run lint          # tsc --noEmit
npm run build         # vite build → dist, then build:seo mirrors SEO outputs into dist/
```

`build:seo` regenerates everything an AI crawler or search engine needs:

- `public/sitemap.xml` — full URL list with per-article `<lastmod>`
- `public/news-sitemap.xml` — Google News sitemap protocol
- `public/llms.txt` — concise AI overview with article list
- `public/llms-full.txt` — long-form AI citation file (full article body, takeaways, sources)
- `public/news/feed.json` (JSON Feed 1.1) and `public/news/feed.xml` (RSS 2.0)
- `public/news/<slug>/index.html` — prerendered static HTML per article with full meta tags, NewsArticle + BreadcrumbList JSON-LD, and visible article body. AI bots that don't run JS still see the full content. SPA hydrates over it for human visitors.
- `public/news/index.html` — prerendered news listing
- `public/robots.txt` — explicit allow-list for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended, etc.

If `npm run lint` is unrelatedly broken, report that clearly and preserve the generated news files.

## Scheduled Runs

When the user asks to automate this skill on a fixed daily schedule, create a small repo-level runner or CI job that invokes Codex with `$aloha-news-publisher`, then runs the same validation commands. Keep the schedule configuration outside the article content. Do not hard-code a publish time until the user provides the desired timezone and hour.

## References

- `references/site-keywords.md`: keyword clusters and accepted angles.
- `references/cms-json.md`: JSON contract and article checklist.
- `references/hero-image-style.md`: hero image prompt and format rules.
