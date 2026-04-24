import {Link, Navigate, useParams} from 'react-router-dom';
import {ArrowLeft, ExternalLink} from 'lucide-react';
import {formatNewsDate, getNewsArticleBySlug, newsArticles} from '../data/news';

export default function NewsArticle() {
  const {slug = ''} = useParams();
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const relatedArticles = newsArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="w-full bg-[#fcfbf7] text-black">
      <section className="relative flex min-h-[520px] items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-14 text-white sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-white sm:text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To News
          </Link>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/70 sm:text-xs">
            <span>{article.category}</span>
            <span>{formatNewsDate(article.date)}</span>
            <span>{article.author}</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/90">{article.summary}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div className="space-y-10">
            {article.sections.map((section) => (
              <section key={section.id} className="border border-neutral-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-black tracking-tight md:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-neutral-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                Key Takeaways
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-neutral-600">
                {article.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="border-t border-neutral-200 pt-4 first:border-t-0 first:pt-0">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-neutral-200 bg-white p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                Sources
              </p>
              <ul className="mt-5 space-y-4">
                {article.sources.map((source) => (
                  <li key={source.url} className="border-t border-neutral-200 pt-4 first:border-t-0 first:pt-0">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-2 text-sm leading-6 text-neutral-700 transition-colors hover:text-black"
                    >
                      <span>{source.title}</span>
                      <ExternalLink className="mt-1 h-4 w-4 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-black bg-black p-6 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/65 sm:text-xs">
                Turn Insight Into Product
              </p>
              <p className="mt-4 text-sm leading-6 text-white/80">
                If this article matches what your team is seeing in the market, send the brief and we can translate it into styles, prints, and a sampling path.
              </p>
              <div className="mt-6 grid gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition-colors hover:bg-neutral-100"
                >
                  Contact Us
                </Link>
                <Link
                  to="/shop?category=swimwear"
                  className="inline-flex items-center justify-center border border-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black"
                >
                  View Base Styles
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="border-t border-neutral-200 bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
                Continue Reading
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                More market reads
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  to={`/news/${item.slug}`}
                  className="border border-neutral-200 bg-[#fcfbf7] p-6 transition-colors hover:border-black"
                >
                  <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                    <span>{item.category}</span>
                    <span>{formatNewsDate(item.date)}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
