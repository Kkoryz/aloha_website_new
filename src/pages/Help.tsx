import {Link} from 'react-router-dom';
import {BookOpenText, CircleHelp, FileSearch, Newspaper} from 'lucide-react';

const quickLinks = [
  {
    title: 'FAQ',
    description: 'Fast answers on MOQ, sampling, payment, shipping, and private label workflow.',
    href: '/faq',
    Icon: CircleHelp,
  },
  {
    title: 'Guidance',
    description: 'Operational guidance for print prep, sample approvals, and launch planning.',
    href: '/guidance',
    Icon: FileSearch,
  },
  {
    title: 'News',
    description: 'Recent market signals, sourcing reads, and factory-side observations for resort wear brands.',
    href: '/news',
    Icon: Newspaper,
  },
  {
    title: 'Catalog',
    description: 'Browse the current PDF catalog before you move into sampling or quote requests.',
    href: '/catalog',
    Icon: BookOpenText,
  },
];

const supportTopics = [
  {
    title: 'Before You Sample',
    points: [
      'Choose a focused category instead of launching too many styles at once.',
      'Shortlist prints and fabrics before asking for a quote.',
      'Use the catalog and base styles pages to narrow your first range.',
    ],
  },
  {
    title: 'Before You Approve Artwork',
    points: [
      'Check print scale against the actual garment, not only the repeat tile.',
      'Confirm color direction and placement before sample cutting.',
      'Flag trim, label, and packaging needs early so they do not slip the timeline.',
    ],
  },
  {
    title: 'Before You Ship',
    points: [
      'Decide whether you want FOB, CIF, or DDP before final quoting.',
      'Confirm delivery destination and target in-store date.',
      'Review packing and carton expectations before bulk closes.',
    ],
  },
];

export default function Help() {
  return (
    <div className="w-full bg-[#fcfbf7] text-black">
      <section className="relative flex h-[50vh] items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/site-images/optimized/home-guides.jpg"
            alt="Help center for resort wear brands"
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-4xl px-4 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/70 sm:text-xs">
            Help Center
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
            Planning support for resort wear brands
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Use these resources to get clear on MOQ, artwork, sampling, shipping, and what to prepare before you contact the factory.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
              Start Here
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Four places to get oriented fast
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map(({title, description, href, Icon}) => (
              <Link
                key={title}
                to={href}
                className="border border-neutral-200 bg-[#fcfbf7] p-6 transition-colors hover:border-black"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-black bg-white">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
                <span className="mt-5 inline-flex text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                  Open Resource
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
                Common Questions
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                What brands usually need help with first
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-600">
              These are the areas that most often slow down first-time or expanding resort brands. Use them as a pre-flight check before sampling or bulk.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {supportTopics.map((topic) => (
              <article key={topic.title} className="border border-neutral-200 bg-white p-6">
                <h3 className="text-lg font-black">{topic.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-600">
                  {topic.points.map((point) => (
                    <li key={point} className="border-t border-neutral-200 pt-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/55 sm:text-xs">
              Need A Direct Answer?
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight md:text-4xl">
              Move from reading to a real project conversation.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Send your category, target MOQ, and any artwork references. We can point you to the right base styles and next steps.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/16475140926"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
