import {Link} from 'react-router-dom';

const starterKitItems = [
  '"How to Start a Resort Line" guidebook',
  'Resort fabric swatches and print planning notes',
  'Full product catalog with 64+ base styles',
  '$50 sample voucher',
  'Direct line to our Toronto client team',
  'FOB and DDP shipping guidance',
];

const starterKitStrengths = [
  {
    title: 'Start with less guesswork',
    body: 'Use real fabric swatches, base styles, and sampling guidance before you spend on the wrong category or print direction.',
  },
  {
    title: 'Custom print support in-house',
    body: 'Our design team can turn references, sketches, or moodboards into exclusive repeat artwork built for resort wear garments.',
  },
  {
    title: 'Launch path built for low MOQ',
    body: 'Plan around 50 pcs per style per color, sample first, then scale into bulk only after the collection direction is working.',
  },
];

const designAdvantages = [
  'Exclusive pattern development from references, hand sketches, or moodboards',
  'Print scaling adjusted by garment type, size range, and placement needs',
  'Color matching and repeat cleanup before sampling starts',
  'Production-ready artwork handoff for sampling and bulk',
];

export default function StarterKits() {
  return (
    <div className="flex w-full flex-col bg-white text-black">
      <section className="relative flex h-[50vh] items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/starter_kit_hero.png" alt="Starter Kit" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 max-w-4xl px-4 text-white">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">Starter Kits</h1>
          <p className="text-lg text-white/90">
            A practical starting pack for brands planning their first resort wear collection.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 max-w-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
              Why Brands Ask For It
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              A starter pack that leads into real sampling and custom development.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {starterKitStrengths.map((item) => (
              <article key={item.title} className="border border-neutral-200 p-8">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="border border-neutral-200 bg-white p-10 text-center md:p-12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">Starter Kit</p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Available on request</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
              We do not take payment online for the Starter Kit. Contact us with your category, launch stage, and print direction, and we will confirm the right starting pack and next steps.
            </p>
            <ul className="mx-auto mt-10 max-w-xl space-y-3 text-left text-sm text-neutral-700">
              {starterKitItems.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="mr-3 font-bold text-black">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contact?topic=starter-kit"
                className="inline-flex items-center justify-center bg-black px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-neutral-800"
              >
                Request Starter Kit
              </Link>
              <a
                href="https://wa.me/16475140926"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-black px-8 py-4 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-black hover:text-white"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
              In-House Design Team
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Custom patterns are one of the strongest reasons brands work with us early.
            </h2>
            <p className="mt-6 text-sm leading-6 text-neutral-600">
              We do more than supply base styles. Our design team helps translate your brand direction into exclusive prints that are usable in sampling and production, not just moodboard ideas.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {designAdvantages.map((item) => (
              <div key={item} className="border border-neutral-200 bg-[#fcfbf7] p-6">
                <p className="text-sm leading-6 text-neutral-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-center text-white md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
            Best Fit
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Best for brands that want to move from idea to sample with more clarity.
          </h2>
          <p className="mt-6 text-sm leading-6 text-white/75">
            If you already know you need fabric direction, base styles, custom print guidance, and a direct factory contact, the Starter Kit is the fastest way to begin the conversation.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact?topic=starter-kit"
              className="inline-flex items-center justify-center bg-white px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-200"
            >
              Contact Us To Get It
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center border border-white px-8 py-3 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:bg-white hover:text-black"
            >
              View Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
