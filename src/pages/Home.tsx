import { Link } from 'react-router-dom';
import DeferredVideo from '../components/DeferredVideo';

const heroImage = '/site-images/optimized/home-hero.jpg';
const lookbookImages = [
  { src: '/site-images/optimized/lookbook-pool.jpg', alt: 'Resort wear collection by the pool', pos: '50% 35%' },
  { src: '/site-images/optimized/lookbook-tree.jpg', alt: 'Tropical resort apparel lifestyle scene' },
  { src: '/site-images/optimized/lookbook-night.jpg', alt: 'Evening resort wear styling' },
  { src: '/site-images/optimized/lookbook-drink.jpg', alt: 'Vacation-ready resort apparel detail' },
  { src: '/site-images/optimized/lookbook-fruit.jpg', alt: 'Colorful resort styling inspiration' },
  { src: '/site-images/optimized/lookbook-flower.jpg', alt: 'Floral resort wear mood image' },
  { src: '/site-images/optimized/lookbook-pool2.jpg', alt: 'Swim and resort collection poolside scene', pos: '50% 35%' },
  { src: '/site-images/optimized/lookbook-boat.jpg', alt: 'Boat-ready resort wear look' },
  { src: '/site-images/optimized/lookbook-family.jpg', alt: 'Family matching resort wear collection' },
  { src: '/site-images/optimized/lookbook-ocean.jpg', alt: 'Oceanfront resort lifestyle image' },
  { src: '/site-images/optimized/lookbook-yoga.jpg', alt: 'Active resortwear and wellness image' },
  { src: '/site-images/optimized/lookbook-chair.jpg', alt: 'Resort apparel styled at a vacation villa' },
];

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <section className="relative flex min-h-[560px] items-center justify-center text-center md:h-screen md:min-h-[620px]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Aloha & Co resort wear manufacturing collection"
            className="h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 max-w-4xl px-5">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
            100% Resort Wear Manufacturing
          </h1>
          <p className="mb-8 text-base font-medium text-white sm:text-lg md:text-xl">
            <span className="sm:hidden">64+ base styles. Low MOQ. Factory direct.</span>
            <span className="hidden sm:inline">6 categories, 64+ base styles. Low MOQ, custom prints, factory-direct production.</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/shop" className="inline-flex w-full items-center justify-center bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-100 sm:w-auto">
              Browse Base Styles
            </Link>
            <Link to="/contact" className="inline-flex w-full items-center justify-center bg-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-900 sm:w-auto">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f9f9] px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">Why We<br />Do<br />This</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 text-sm leading-relaxed text-gray-600 md:col-span-2 md:grid-cols-2">
            <div>
              <p className="mb-4 font-bold text-black">Most apparel factories are generalists. Resort wear is not general.</p>
              <p className="mb-4">The classic Aloha shirt, the flowy resort dress, the performance boardshort, and the UPF50+ rash guard each need different decisions around drape, print scale, stretch, breathability, and finishing.</p>
              <p>That is why Aloha and Co focuses on resort wear only. The product category is not a side project here. It is the whole factory brief.</p>
            </div>
            <div>
              <p className="mb-4">Our work starts with fabric and artwork, then moves through sampling, fit, cutting, print placement, sewing, QC, and shipping under direct oversight.</p>
              <p className="mb-4">You get a partner that understands how resort collections are bought, worn, photographed, and reordered.</p>
              <p>You build the brand. We build the product behind it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white pb-4 pt-12 text-center md:pt-16">
        <h3 className="mb-8 text-sm font-bold uppercase tracking-widest">Resort Wear Only. Not Everything For Everyone.</h3>
        <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8 lg:px-12">
          <DeferredVideo
            src="/hawaii-hero2.mp4"
            poster={heroImage}
            posterAlt="Aloha & Co resort wear showroom preview"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-16 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {lookbookImages.map((item) => (
            <div key={item.src} className="group relative aspect-[3/4] overflow-hidden rounded-md bg-gray-200">
              <img
                src={item.src}
                alt={item.alt}
                style={item.pos ? { objectPosition: item.pos } : undefined}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest">100% Resort Wear</p>
            <h2 className="mb-4 text-2xl font-bold">64+ BASE STYLES, 6 CATEGORIES</h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-600">
              Build from a focused resort-wear library: camp shirts, resort dresses, swimwear, matching sets, tops, accessories, and UPF50+ activewear. Use our base blocks to move faster, then adjust print, fabric, trims, label, and packaging for your market.
            </p>
            <Link to="/shop" className="inline-flex items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
              Browse Base Styles
            </Link>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-gray-200">
            <img
              src="/site-images/optimized/home-ready-development.jpg"
              alt="Aloha & Co ready design resort wear collection"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5f0] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16">
          <div className="order-2 aspect-[4/5] overflow-hidden bg-gray-200 md:order-1">
            <img
              src="/site-images/optimized/home-custom-design.jpg"
              alt="Custom resort wear design and development workspace"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest">Custom Prints</p>
            <h2 className="mb-4 text-2xl font-bold">OWN THE PRINT. KEEP IT EXCLUSIVE.</h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              Send references, moodboards, or finished artwork. Our in-house designers build repeats, scale prints to each garment, match colors, and prepare production-ready files for your exclusive artwork.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-gray-600">
              Sampling typically takes 10-15 days after artwork and fabric direction are confirmed.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
              Start Custom Print
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-center md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest">Low MOQ 50pcs</p>
          <h2 className="mb-5 text-xl font-bold md:mb-8 md:text-2xl">TEST PRINTS BEFORE YOU SCALE</h2>
          <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-600 md:mb-12">
            <span className="sm:hidden">Test 5 prints at 250 total units. No 1,500+ unit commitment.</span>
            <span className="hidden sm:inline">Start at 50 pcs per style per color. Test 5 prints at 250 total units. A structure built for real market testing instead of forcing 1,500+ units upfront.</span>
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 md:gap-8">
            <div className="border border-gray-200 p-3 text-center sm:p-8">
              <div className="mb-2 text-2xl font-bold sm:text-3xl">50</div>
              <p className="text-[9px] uppercase tracking-wider text-gray-500 sm:text-xs sm:tracking-widest">Pcs / Style</p>
            </div>
            <div className="border border-gray-200 p-3 text-center sm:p-8">
              <div className="mb-2 text-2xl font-bold sm:text-3xl">250</div>
              <p className="text-[9px] uppercase tracking-wider text-gray-500 sm:text-xs sm:tracking-widest">5-Print Test</p>
            </div>
            <div className="border border-gray-200 p-3 text-center sm:p-8">
              <div className="mb-2 text-2xl font-bold sm:text-3xl">1,500+</div>
              <p className="text-[9px] uppercase tracking-wider text-gray-500 sm:text-xs sm:tracking-widest">Typical Ask</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-black py-4 text-center text-xs font-bold uppercase tracking-widest text-white">
        FACTORY DIRECT FROM SHAOXING. NO TRADING COMPANIES. NO MIDDLEMEN.
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest">Help, Guidance & News</p>
            <h2 className="mb-4 text-2xl font-bold">RESOURCES FOR RESORT WEAR BRANDS</h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600">
              From fabric selection to shipping logistics, our support content is written for resort wear brands, not generic apparel buyers.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              Use the Help Center, Guidance pages, FAQ, and News archive to compare fabrics, prepare artwork, understand MOQ, and stay closer to market direction before you commit to bulk.
            </p>
            <h4 className="mb-2 text-xs font-bold uppercase">What You Can Review</h4>
            <ul className="mb-6 list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>Fabric and print selection for resort wear</li>
              <li>Sampling, fit, and artwork preparation</li>
              <li>FOB, CIF, and DDP shipping guidance</li>
            </ul>
            <p className="mb-8 text-sm font-medium">Built from the real production questions and market reads we work through every week.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/faq" className="inline-flex items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
                View FAQ
              </Link>
              <Link to="/help" className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white">
                Help Center
              </Link>
              <Link to="/guidance" className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white">
                Guidance
              </Link>
              <Link to="/news" className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white">
                Industry News
              </Link>
            </div>
          </div>
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src="/site-images/optimized/home-guides.jpg"
              alt="Resort wear FAQ and planning resources"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16">
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src="/site-images/optimized/home-team.jpg"
              alt="Aloha & Co showroom and production planning process"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest">Our Factory & Team</p>
            <h2 className="mb-4 text-2xl font-bold">SHAOXING, CHINA - CHINA TEXTILE CITY</h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-600">
              Our production facility is located in Shaoxing, home to China Textile City, the world&apos;s largest textile trading hub. Direct access to thousands of fabric suppliers helps us source faster, sample faster, and keep your costs sharp. No trading companies. No middlemen.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#5c3a21] py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest">Industry Recognized</p>
          <p className="mb-6 text-sm font-bold tracking-widest">MAGIC SHOW EXHIBITOR</p>
          <p className="mb-8 text-lg font-medium leading-relaxed md:text-xl">
            We actively participate in major apparel trade shows and support 200+ brands, from boutique startups to established resort retailers across the US and Hawaii.
          </p>
          <p className="mb-12 text-sm font-bold">Resort wear only. Factory direct.</p>
          <Link to="/contact" className="bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-100">
            Start a Quote
          </Link>
        </div>
      </section>

      <section className="bg-[#111111] py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Custom Prints</p>
            <h2 className="mb-4 text-2xl font-bold">IN-HOUSE PRINT DEVELOPMENT</h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-300">
              Resort wear prints need more than a repeat file. We scale artwork by garment type, check placement across sizes, and adjust color for the fabric and print method.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-gray-300">
              Our design team helps turn sketches, references, and brand direction into exclusive artwork ready for sampling and bulk production.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-white px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
              Custom Artwork
            </Link>
          </div>
          <div className="aspect-square overflow-hidden bg-gray-800">
            <img
              src="/site-images/optimized/home-fabrics.jpg"
              alt="Resort wear fabric and print development options"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16">
          <div className="aspect-[4/5] overflow-hidden border border-gray-200 bg-white">
            <img
              src="/site-images/optimized/home-sustainability.jpg"
              alt="Aloha & Co Canada and China resort wear production team"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest">The People Behind Your Product</p>
            <h2 className="mb-4 text-2xl font-bold">CANADA + CHINA TEAMS</h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-600">
              Client operations are based in Toronto, while design and production work from Shaoxing. You will work with Korey Z. and Claire Z. on strategy, communication, and client relations, while Yuelan S. and Guojuan S. lead production, QC, print development, and color matching on the factory side.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-black py-4 text-center text-xs font-bold uppercase tracking-widest text-white">
        FOB, CIF, AND DDP OPTIONS FOR GLOBAL RESORT WEAR BRANDS
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-sm font-bold uppercase tracking-widest">Working Terms</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col border border-gray-200 p-6 md:p-8">
              <h3 className="mb-4 text-lg font-bold">PRODUCTION TERMS</h3>
              <p className="mb-4 text-sm text-gray-600">Clear pricing before you commit. Sample and pattern fees are credited back when the style moves into bulk.</p>
              <p className="mb-8 text-sm italic text-gray-500">Built for brands testing real market demand before scaling inventory.</p>

              <div className="border-t border-gray-200 py-4">
                <h4 className="mb-2 text-sm font-bold">Standard Terms</h4>
                <ul className="list-inside list-disc text-sm text-gray-600">
                  <li>MOQ: 50 pcs per style per color</li>
                  <li>Sample fee: $50/pc, refundable on bulk</li>
                  <li>Pattern fee: $50/design, refundable on bulk</li>
                </ul>
              </div>
              <div className="mb-8 border-t border-gray-200 py-4">
                <h4 className="mb-2 text-sm font-bold">Bulk</h4>
                <ul className="list-inside list-disc text-sm text-gray-600">
                  <li>Lead time: 30-35 days after sample approval</li>
                  <li>Payment: 30% deposit + 70% before shipment</li>
                </ul>
              </div>
              <div className="mt-auto text-center">
                <Link to="/shop" className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white">
                  Browse Base Styles
                </Link>
              </div>
            </div>

            <div className="flex flex-col border border-gray-200 p-6 md:p-8">
              <h3 className="mb-4 text-lg font-bold">FOB & DDP SHIPPING</h3>

              <div className="mb-4">
                <h4 className="mb-1 text-sm font-bold">DDP Recommended</h4>
                <p className="text-sm text-gray-600">One quoted price with tariff, customs, and door-to-door delivery included.</p>
              </div>
              <div className="mb-4">
                <h4 className="mb-1 text-sm font-bold">FOB / CIF Supported</h4>
                <p className="text-sm text-gray-600">Use your own freight forwarder when you prefer to control international shipping.</p>
              </div>
              <div className="mb-8">
                <h4 className="mb-1 text-sm font-bold">Dual-Timezone Response</h4>
                <p className="text-sm text-gray-600">Toronto client operations plus Shaoxing production. Response within 24 hours.</p>
              </div>

              <div className="border-t border-gray-200 py-4">
                <h4 className="mb-2 text-sm font-bold">Direct Oversight</h4>
                <ul className="list-inside list-disc text-sm text-gray-600">
                  <li>Fabric sourcing from Shaoxing</li>
                  <li>Sampling, production, QC, and packing</li>
                  <li>No trading companies or middlemen</li>
                </ul>
              </div>
              <div className="mb-8 border-t border-gray-200 py-4">
                <h4 className="mb-2 text-sm font-bold">Best For</h4>
                <ul className="list-inside list-disc text-sm text-gray-600">
                  <li>US and Canada resort wear brands</li>
                  <li>Hawaii, coastal, and boutique resort retailers</li>
                </ul>
              </div>
              <div className="mt-auto text-center">
                <Link to="/contact" className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white">
                  Get Shipping Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white py-16 text-center md:py-24">
        <h2 className="mb-8 text-sm font-bold uppercase tracking-widest">Questions? Send Us Your Brief.</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="inline-flex w-full items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:w-auto">
            Request Quote
          </Link>
          <a href="https://wa.me/16475140926" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:w-auto">
            WhatsApp
          </a>
          <a href="mailto:korey@alohaandco.com" className="inline-flex w-full items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:w-auto">
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
