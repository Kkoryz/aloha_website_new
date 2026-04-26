export interface NewsSource {
  title: string;
  url: string;
}

export interface NewsSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  date: string;
  author: string;
  image: string;
  category: string;
  keyTakeaways: string[];
  topics: string[];
  sections: NewsSection[];
  sources: NewsSource[];
}

type RawNewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  date: string;
  author: string;
  image?: string;
  category: string;
  keyTakeaways?: string[];
  topics?: string[];
  sections?: NewsSection[];
  sources?: NewsSource[];
};

const fallbackImages: Record<string, string> = {
  Market: '/site-images/optimized/catalog-hero.jpg',
  Development: '/site-images/optimized/home-custom-design.jpg',
  Operations: '/site-images/optimized/home-team.jpg',
  Shipping: '/contact_hero.png',
};

const rawNewsModules = import.meta.glob('../../content/news/*.json', {
  eager: true,
}) as Record<string, {default: RawNewsArticle} | RawNewsArticle>;

function parseNewsDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

function resolveImage(category: string, image?: string) {
  if (image) {
    return image;
  }

  return fallbackImages[category] || '/site-images/optimized/home-hero.jpg';
}

function normalizeArticle(module: {default: RawNewsArticle} | RawNewsArticle): NewsArticle {
  const article = 'default' in module ? module.default : module;

  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    summary: article.summary,
    date: article.date,
    author: article.author,
    image: resolveImage(article.category, article.image),
    category: article.category,
    keyTakeaways: article.keyTakeaways || [],
    topics: article.topics || [],
    sections: article.sections || [],
    sources: article.sources || [],
  };
}

export const newsArticles = Object.values(rawNewsModules)
  .map(normalizeArticle)
  .sort((a, b) => parseNewsDate(b.date).getTime() - parseNewsDate(a.date).getTime());

export function getNewsArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug);
}

export function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parseNewsDate(date));
}
