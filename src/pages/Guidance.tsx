import {Link} from 'react-router-dom';
import {Palette, PackageCheck, ShipWheel, Shirt} from 'lucide-react';

const guidanceSteps = [
  {
    title: 'Build A Tighter First Range',
    description:
      'Start with a smaller, sharper launch: a few silhouettes, a few print directions, and a clear target customer instead of trying to cover every resort category at once.',
    points: [
      'Pick a lead category first.',
      'Use MOQ math before finalizing breadth.',
      'Shortlist styles directly from the base style library.',
    ],
    Icon: Shirt,
  },
  {
    title: 'Prepare Custom Prints Properly',
    description:
      'A good print file still needs garment-specific planning. Repeat size, placement, trim matching, and scale across sizes all affect how the final product reads.',
    points: [
      'Send vector files when possible.',
      'Share references if the artwork is not final.',
      'Approve print scale by silhouette before samples are cut.',
    ],
    Icon: Palette,
  },
  {
    title: 'Use Samples To De-Risk Bulk',
    description:
      'Sampling is where fit, print placement, stretch recovery, trim choices, and overall balance should get resolved. Bulk should not be the first time those questions are asked.',
    points: [
      'Review fit and drape on body.',
      'Check labels, trims, and finishing details.',
      'Lock corrections before bulk approval.',
    ],
    Icon: PackageCheck,
  },
  {
    title: 'Choose The Right Shipping Path',
    description:
      'FOB, CIF, and DDP each change how much of the logistics process your team owns. Pick the structure early so landed cost expectations are clear.',
    points: [
      'Use DDP when you want one landed quote.',
      'Use FOB or CIF with your own freight partner.',
      'Confirm destination timing before ex-factory date.',
    ],
    Icon: ShipWheel,
  },
];

const relatedLinks = [
  {
    title: 'Starter Kits',
    description: 'Good for founders who need swatches, category orientation, and sample planning support.',
    href: '/starter-kits',
  },
  {
    title: 'Services',
    description: 'Review sampling, bulk production, and private label workflow in more operational detail.',
    href: '/services',
  },
  {
    title: 'FAQ',
    description: 'Fast answers on MOQ, lead times, payment terms, shipping, and design confidentiality.',
    href: '/faq',
  },
];

export default function Guidance() {
  return (
    <div className="w-full bg-white text-black">
      <section className="relative flex h-[50vh] items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/site-images/optimized/home-fabrics.jpg"
            alt="Guidance for resort wear production planning"
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-4xl px-4 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/70 sm:text-xs">
            Guidance
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
            Practical guidance before you place the order
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            A tighter launch plan, cleaner artwork prep, better sampling discipline, and clearer shipping choices usually make the difference.
          </p>
        </div>
      </section>

      <section className="bg-[#fcfbf7] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
              Four Areas
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Where better guidance usually saves the most time
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {guidanceSteps.map(({title, description, points, Icon}) => (
              <article key={title} className="border border-neutral-200 bg-white p-6 md:p-8">
                <div className="flex h-12 w-12 items-center justify-center border border-black bg-[#fcfbf7]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-2xl font-black tracking-tight">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">{description}</p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-600">
                  {points.map((point) => (
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

      <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 sm:text-xs">
                Related Resources
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                Keep moving from research into action
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-600">
              These pages are the fastest next steps if you are still narrowing styles, comparing services, or trying to understand how the production path fits together.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="border border-neutral-200 bg-[#fcfbf7] p-6 transition-colors hover:border-black"
              >
                <h3 className="text-lg font-black">{link.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{link.description}</p>
                <span className="mt-5 inline-flex text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                  Open Page
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/55 sm:text-xs">
              Ready To Brief The Team?
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight md:text-4xl">
              Send the product direction and we can pressure-test it.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Share your category, target MOQ, timing, and artwork direction. We can help you decide where to start and what to sample first.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-100"
            >
              Contact Us
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black"
            >
              Browse Base Styles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
