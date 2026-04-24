import { Link } from 'react-router-dom';
import { categoryLabels, productsData } from '../data/products';

const previewCategories = [
  'aloha-shirts',
  'resort-dresses',
  'swimwear',
  'matching-sets',
] as const;

const catalogStats = [
  ['39', 'Updated PDF pages'],
  ['64+', 'Base styles'],
  ['50', 'MOQ per style / color'],
  ['24h', 'Response time'],
];

const catalogPdfHref = '/Aloha_Co_Combined_Catalog_2026.pdf?v=20260425';

export default function Catalog() {
  const categoryCards = previewCategories.map((category) => {
    const lead = productsData[category]?.[0];
    return {
      id: category,
      label: categoryLabels[category],
      flatImage: lead?.image || '/site-images/optimized/catalog-hero.jpg',
      hoverImage: lead?.hoverImage || lead?.image || '/site-images/optimized/catalog-hero.jpg',
      subtitle:
        category === 'aloha-shirts'
          ? 'Camp shirts, polos, and matching programs.'
          : category === 'resort-dresses'
            ? 'Shirt dresses, polos, and resort-ready prints.'
            : category === 'swimwear'
              ? 'Bikinis, trunks, rash guards, and cover-ups.'
              : 'Coordinated sets for men, women, kids, and family stories.',
    };
  });

  return (
    <div className="w-full bg-[#fcfbf7] text-black">
      <section className="relative flex h-[50vh] items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/site-images/optimized/catalog-hero.jpg"
            alt="Aloha & Co resort wear catalog preview"
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 max-w-4xl px-4 text-white">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">2026 Resort Wear Catalog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            64+ base styles across aloha shirts, resort dresses, swimwear, matching sets, tops, and accessories.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={catalogPdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
            >
              Open PDF
            </a>
            <a
              href={catalogPdfHref}
              download
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Download Catalog
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {catalogStats.map(([value, label]) => (
            <div key={label} className="border border-neutral-200 bg-[#fcfbf7] p-4 text-center md:p-6">
              <p className="text-2xl font-black md:text-4xl">{value}</p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
                What&apos;s Inside
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                Category snapshots before you open the full PDF
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-600">
              Use the PDF for a quick buyer-facing overview, then jump into the website for live
              product pages, hover images, category filters, and quote-ready product details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categoryCards.map((card) => (
              <article key={card.id} className="overflow-hidden border border-neutral-200 bg-white">
                <div className="group relative aspect-[4/5] overflow-hidden bg-[#fbfaf7]">
                  <img
                    src={card.flatImage}
                    alt={`${card.label} catalog preview`}
                    className="absolute inset-0 h-full w-full object-contain p-6 transition duration-500 group-hover:scale-95 group-hover:opacity-0"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={card.hoverImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-contain p-6 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                    {card.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{card.subtitle}</p>
                  <div className="mt-5 flex gap-3">
                    <Link
                      to={`/shop?category=${card.id}`}
                      className="inline-flex flex-1 items-center justify-center bg-black px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
                    >
                      View Styles
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex flex-1 items-center justify-center border border-black px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1fr_0.95fr] md:gap-14">
          <div className="overflow-hidden border border-neutral-200 bg-[#f7f0e7]">
            <img
              src="/site-images/optimized/home-custom-design.jpg"
              alt="Custom resort wear design planning at Aloha & Co"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
              Best Use
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Use the catalog to narrow styles, then move to samples.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-neutral-600">
              <p>
                The PDF is the fast first pass: shortlist silhouettes, compare categories, and align
                on print direction before your team gets into sample approvals.
              </p>
              <p>
                Once you know the styles, we help with fabric, artwork scaling, labels, packaging,
                and bulk production planning out of Shaoxing.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                to="/services/sampling"
                className="inline-flex items-center justify-center bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
              >
                Start Sampling
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-black px-6 py-3 text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
              >
                Send Brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/55 sm:text-xs">
              Factory Direct
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight md:text-4xl">
              Need the catalog plus live product support?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Review the PDF, then use the website to compare categories, see hover images, and send
              a tighter quote request with exact style IDs.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={catalogPdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
            >
              View Catalog
            </a>
            <Link
              to="/products"
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black"
            >
              Explore Product Lines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
