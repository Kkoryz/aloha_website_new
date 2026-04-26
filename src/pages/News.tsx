import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {formatNewsDate, newsArticles} from '../data/news';

export default function News() {
  const [featuredArticle, ...articles] = newsArticles;

  return (
    <div className="w-full bg-[#fcfbf7] text-black">
      <section className="relative flex h-[50vh] items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={featuredArticle?.image || '/heroes/hero.webp'}
            alt="Resort wear industry news"
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-4xl px-4 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/70 sm:text-xs">
            Industry News
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
            Market signals for resort wear brands
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Recent reporting, sourcing observations, and category reads that can help sharpen your line planning and launch decisions.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {featuredArticle ? (
            <div className="grid grid-cols-1 gap-8 border border-neutral-200 bg-[#fcfbf7] p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
              <div className="overflow-hidden bg-neutral-100">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="h-full w-full object-cover"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                  Featured Story
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                  {featuredArticle.title}
                </h2>
                <div className="mt-4 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                  <span>{featuredArticle.category}</span>
                  <span>{formatNewsDate(featuredArticle.date)}</span>
                </div>
                <p className="mt-5 text-sm leading-6 text-neutral-600">{featuredArticle.summary}</p>
                <Link
                  to={`/news/${featuredArticle.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="border border-neutral-200 bg-[#fcfbf7] p-8 text-center">
              <h2 className="text-2xl font-black tracking-tight">News page restored.</h2>
              <p className="mt-4 text-sm text-neutral-600">
                No articles are published yet in this environment.
              </p>
            </div>
          )}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
                Recent Articles
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                More reads from the factory side
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <article key={article.slug} className="overflow-hidden border border-neutral-200 bg-white">
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                      <span>{article.category}</span>
                      <span>{formatNewsDate(article.date)}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-black leading-tight">{article.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-neutral-600">{article.excerpt}</p>
                    <Link
                      to={`/news/${article.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
