import { Link } from 'react-router-dom';
import { Factory, MessageCircle, PackageCheck, Truck } from 'lucide-react';

const serviceCards = [
  {
    title: 'Sampling',
    href: '/services/sampling',
    image: '/site-images/services-card-sampling.png',
    alt: 'Resort wear sample review table',
    description:
      'Test fabric, fit, and custom prints before bulk. Custom print samples typically take 10-15 days after artwork approval.',
  },
  {
    title: 'Bulk Production',
    href: '/services/bulk-production',
    image: '/site-images/bulk-production-hero-floor.png',
    alt: 'Bulk resort wear production floor',
    description:
      'Scale with MOQ from 50 pcs per style per color, 30-35 day bulk lead time after sample approval, and factory-direct QC.',
  },
  {
    title: 'Private Label',
    href: '/services/private-label',
    image: '/site-images/private-label-hero-trims.png',
    alt: 'Private label trims and packaging',
    description:
      'Build a complete private-label resort collection with custom labels, tags, packaging, prints, and production-ready artwork.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Consult',
    desc: 'Share your category, print direction, MOQ target, and shipping market.',
    Icon: MessageCircle,
  },
  {
    step: '02',
    title: 'Sample',
    desc: 'Review fabric, fit, print scale, labels, and sample details.',
    Icon: PackageCheck,
  },
  {
    step: '03',
    title: 'Produce',
    desc: 'Shaoxing production handles sourcing, sewing, QC, and packing.',
    Icon: Factory,
  },
  {
    step: '04',
    title: 'Deliver',
    desc: 'Ship FOB, CIF, or DDP with duties and customs included.',
    Icon: Truck,
  },
];

export default function Services() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/services_hero.png" alt="Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Our Services</h1>
          <p className="text-lg text-white/90">Resort-wear-only manufacturing, custom prints, low MOQ, and factory-direct delivery.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((service) => (
            <Link key={service.title} to={service.href} className="group border border-gray-200 p-8 hover:border-black transition-colors">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-bold mb-3">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <span className="text-xs font-bold tracking-widest uppercase group-hover:text-gray-600 transition-colors">
                Learn More
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#f4f4f4]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-16">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map(({ Icon, ...item }) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center border border-black bg-white">
                  <Icon className="h-7 w-7" strokeWidth={1.7} aria-hidden="true" />
                </div>
                <div className="text-xs font-bold tracking-widest text-gray-400 mb-3">{item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase mb-4">Ready to Get Started?</h2>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link to="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
            Contact Us
          </Link>
          <Link to="/starter-kits" className="border border-black px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
            Starter Kits
          </Link>
        </div>
      </section>
    </div>
  );
}
