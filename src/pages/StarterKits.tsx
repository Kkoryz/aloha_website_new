import {Link} from 'react-router-dom';

const starterKitItems = [
  '"How to Start a Resort Line" guide',
  'Fabric swatches and print notes',
  'Catalog with 64+ base styles',
  '$50 sample voucher',
  'Toronto client team contact',
  'FOB / DDP shipping guidance',
];

const starterKitStrengths = [
  {
    title: 'LESS GUESSWORK',
    body: 'Review swatches, styles, and sample guidance before you commit budget.',
  },
  {
    title: 'CUSTOM PRINTS',
    body: 'We turn references and moodboards into production-ready repeat artwork.',
  },
  {
    title: 'LOW MOQ LAUNCH',
    body: 'Start around 50 pcs per style per color after sample approval.',
  },
];

const designAdvantages = [
  'Exclusive prints from references, sketches, or moodboards',
  'Print scale adjusted by garment and placement',
  'Color matching and repeat cleanup before sampling',
  'Artwork prepared for samples and bulk',
];

const bestFor = [
  'First collection launches',
  'Capsule resort drops',
  'Low-MOQ testing',
  'Print-led brands',
];

export default function StarterKits() {
  return (
    <div className="flex w-full flex-col">
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/heroes/starter_kit_hero.png" alt="Starter Kit" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Starter Kits
          </h1>
          <p className="text-lg text-white/90">
            A compact starting pack for brands planning their first resort wear collection.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              Why It Helps
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Everything needed to move from idea to first sample.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {starterKitStrengths.map((item) => (
              <div key={item.title} className="flex flex-col border border-gray-200 p-8">
                <h3 className="mb-4 text-lg font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="border border-gray-200 bg-white p-8 text-center md:p-16">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">Starter Kit</p>
            <h2 className="mb-4 text-2xl font-bold md:mb-6 md:text-3xl">AVAILABLE ON REQUEST</h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-600 md:mb-10">
              Tell us your category, launch stage, and print direction. We will confirm the right pack and next steps.
            </p>
            <ul className="mx-auto mb-10 max-w-md space-y-3 text-left text-sm text-gray-700 md:grid-cols-2">
              {starterKitItems.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="mr-3 font-bold text-black">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contact?topic=starter-kit"
                className="inline-flex w-full items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:w-auto"
              >
                Request Starter Kit
              </Link>
              <a
                href="https://wa.me/16475140926"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white sm:w-auto"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              Print Support
            </p>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
              One team for fabrics, styles, and custom prints.
            </h2>
            <p className="mb-10 text-sm leading-relaxed text-gray-600">
              We help turn brand references into prints that can move straight into sampling and bulk.
            </p>
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Best For</p>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                {bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {designAdvantages.map((item) => (
              <div key={item} className="flex items-center justify-center border border-gray-200 p-6 text-center">
                <p className="w-full text-sm font-medium leading-relaxed text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
