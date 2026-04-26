const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content', 'news');
const publicDir = path.join(root, 'public');

const requiredStrings = ['slug', 'title', 'excerpt', 'date', 'author', 'category'];
const allowedCategories = new Set(['Market', 'Development', 'Operations', 'Shipping']);

function fail(message) {
  console.error(`news build failed: ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  console.warn(`news build warning: ${message}`);
}

function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function validateArticle(file, article, seenSlugs) {
  const rel = path.relative(root, file);

  for (const field of requiredStrings) {
    if (typeof article[field] !== 'string' || !article[field].trim()) {
      fail(`${rel} is missing string field "${field}"`);
    }
  }

  if (article.slug && !isSlug(article.slug)) {
    fail(`${rel} has non-kebab-case slug "${article.slug}"`);
  }

  if (article.slug) {
    if (seenSlugs.has(article.slug)) {
      fail(`${rel} duplicates slug "${article.slug}"`);
    }
    seenSlugs.add(article.slug);
  }

  if (article.date && !isDate(article.date)) {
    fail(`${rel} has invalid date "${article.date}"`);
  }

  if (article.date && article.slug) {
    const expectedName = `${article.date}-${article.slug}.json`;
    if (path.basename(file) !== expectedName) {
      fail(`${rel} should be named ${expectedName}`);
    }
  }

  if (article.category && !allowedCategories.has(article.category)) {
    warn(`${rel} uses non-standard category "${article.category}"`);
  }

  if (article.image !== undefined) {
    if (typeof article.image !== 'string' || !article.image.trim()) {
      fail(`${rel} image must be a non-empty string`);
    } else if (/^https?:\/\//.test(article.image)) {
      if (!/^https:\/\/images\.unsplash\.com\//.test(article.image)) {
        warn(`${rel} uses a remote image URL; Unsplash image URLs are preferred for report-style news`);
      }
      if (!Array.isArray(article.sources) || !article.sources.some((source) => /unsplash\.com/.test(source.url || ''))) {
        warn(`${rel} uses a remote image but does not list an Unsplash source URL`);
      }
    } else if (!article.image.startsWith('/')) {
      fail(`${rel} image must be an absolute public path or an https image URL`);
    } else {
      if (!article.image.startsWith('/news-images/')) {
        warn(`${rel} uses a legacy image path; new aloha-news-publisher articles should use /news-images/YYYY-MM-DD-slug.png`);
      }
      const imagePath = path.join(publicDir, article.image);
      if (!fs.existsSync(imagePath)) {
        warn(`${rel} references missing hero image ${article.image}`);
      }
    }
  } else {
    warn(`${rel} has no image field and will use a fallback image`);
  }

  if (!Array.isArray(article.sections) || article.sections.length === 0) {
    fail(`${rel} must include at least one section`);
  }

  if (Array.isArray(article.sections)) {
    article.sections.forEach((section, index) => {
      if (!section || typeof section !== 'object') {
        fail(`${rel} section ${index + 1} must be an object`);
        return;
      }
      if (!isSlug(section.id || '')) {
        fail(`${rel} section ${index + 1} has invalid id`);
      }
      if (typeof section.title !== 'string' || !section.title.trim()) {
        fail(`${rel} section ${index + 1} is missing title`);
      }
      if (!Array.isArray(section.paragraphs) || section.paragraphs.length === 0) {
        fail(`${rel} section ${index + 1} must include paragraphs`);
      }
    });
  }

  if (!Array.isArray(article.sources) || article.sources.length === 0) {
    warn(`${rel} has no sources; new aloha-news-publisher articles must include source URLs`);
  } else {
    article.sources.forEach((source, index) => {
      if (!source || typeof source.title !== 'string' || typeof source.url !== 'string') {
        fail(`${rel} source ${index + 1} must include title and url strings`);
      } else if (!/^https?:\/\//.test(source.url)) {
        fail(`${rel} source ${index + 1} has invalid URL "${source.url}"`);
      }
    });
  }
}

if (!fs.existsSync(contentDir)) {
  fail('content/news does not exist');
} else {
  const files = fs.readdirSync(contentDir)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => path.join(contentDir, file));

  if (files.length === 0) {
    warn('content/news has no JSON articles');
  }

  const seenSlugs = new Set();
  for (const file of files) {
    let article;
    try {
      article = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      fail(`${path.relative(root, file)} is not valid JSON: ${error.message}`);
      continue;
    }
    validateArticle(file, article, seenSlugs);
  }

  if (!process.exitCode) {
    console.log(`news build validated ${files.length} article${files.length === 1 ? '' : 's'}`);
    console.log('src/data/news.ts uses import.meta.glob, so no generated data file is required.');
  }
}
