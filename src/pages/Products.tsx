import { Link } from 'react-router-dom';
import { categoryLabels, categorySummaries, productsData, type Product } from '../data/products';
import { productPath } from '../lib/productSlug';

const categoryOrder = [
  'aloha-shirts',
  'tshirts-tops',
  'resort-dresses',
  'swimwear',
  'matching-sets',
  'accessories',
];

const categoryCopy: Record<string, {
  eyebrow: string;
  title: string;
  subtitle: string;
  proof: string[];
}> = {
  'aloha-shirts': {
    eyebrow: 'Classic Resort Core',
    title: 'Aloha Shirts',
    subtitle: 'Camp collars, polos, button shirts, and family-ready scaled prints built around drape and print alignment.',
    proof: ['Rayon, cotton, linen, bamboo, polyester', 'Men, women, kids, and matching programs', 'Custom artwork, labels, trims, and packaging'],
  },
  'tshirts-tops': {
    eyebrow: 'Retail Basics',
    title: 'T-Shirts & Tops',
    subtitle: 'Everyday resort graphics, quick-dry tops, tanks, crops, and kids tees for add-on retail and brand capsules.',
    proof: ['Cotton, bamboo, polyester, quick-dry blends', 'Graphic-ready blanks and custom print placement', 'Low MOQ for focused SKU testing'],
  },
  'resort-dresses': {
    eyebrow: 'Drape + Print Scale',
    title: 'Resort Dresses',
    subtitle: 'Shirt dresses, polo dresses, sundresses, and girls styles built for breathable vacation collections and coordinated print stories.',
    proof: ['Adult and girls silhouettes in the same resort print story', 'XS-4XL and 2T-14 size ranges', 'Private label and custom packaging available'],
  },
  'swimwear': {
    eyebrow: 'UPF50+ Activewear',
    title: 'Swimwear',
    subtitle: 'Board shorts, trunks, bikinis, rash guards, swim sets, and cover-ups for resort, surf, and family programs.',
    proof: ['Quick-dry poly and nylon-spandex fabrics', 'UPF50+ rash guard and active options', 'FOB, CIF, and DDP shipping supported'],
  },
  'matching-sets': {
    eyebrow: 'Coordinated Drops',
    title: 'Matching Sets',
    subtitle: 'Shirt-and-short sets, top-and-skirt sets, kids sets, and family programs with print scale handled by garment.',
    proof: ['Men, women, kids, and family sizing', 'Great for resort retailers and boutique drops', 'Test multiple prints before scaling'],
  },
  accessories: {
    eyebrow: 'Collection Finishers',
    title: 'Accessories',
    subtitle: 'Hats, bags, bandanas, scarves, and small add-ons that complete a resort collection without building a new supply chain.',
    proof: ['Print-matched accessories', 'Wholesale-friendly add-on SKUs', 'Custom labels and packaging'],
  },
};

function ProductTile({ product }: { product: Product }) {
  return (
    <Link to={productPath(product)} className="group block" aria-label={`View ${product.name}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#fbfaf7]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-contain p-3 transition duration-500 group-hover:scale-95 group-hover:opacity-0 sm:p-5"
          loading="lazy"
          decoding="async"
        />
        <img
          src={product.hoverImage || product.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain p-3 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 sm:p-5 scale-105"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute bottom-2 left-2 bg-black px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
          {product.id}
        </span>
      </div>
      <h3 className="mt-3 min-h-[2.25rem] text-xs font-bold leading-tight sm:text-sm">{product.name}</h3>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500">{product.moq}</p>
    </Link>
  );
}

export default function Products() {
  const categories = categoryOrder.map((id) => ({
    id,
    label: categoryLabels[id],
    summary: categorySummaries[id],
    products: productsData[id] || [],
    ...categoryCopy[id],
  }));

  return (
    <div className="w-full bg-[#fcfcfc] text-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/heroes/products_hero.webp"
            alt="Resort Wear Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Products
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/90">
            <span className="sm:hidden">Low MOQ resort wear, custom prints, and Shaoxing production.</span>
            <span className="hidden sm:inline">64+ factory-ready resort wear styles across 6 categories, built for custom prints and low MOQ production.</span>
          </p>
        </div>
      </section>

      {/* Category Nav */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto w-full px-4 py-8 lg:px-16">
          <div className="flex gap-8 md:gap-12 overflow-x-auto lg:justify-center scrollbar-hide">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="shrink-0 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-colors hover:text-black pb-2 text-gray-400 hover:border-b hover:border-black"
              >
                {category.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">100% Resort Wear</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Product development without a generalist factory learning curve.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 text-sm leading-6 text-gray-600 sm:grid-cols-2">
            <p>
              Every category below is built around resort-wear realities: breathable fabrics, print scaling, relaxed drape, UPF50+ performance options, and low MOQ testing.
            </p>
            <p>
              Start from a proven base style, customize artwork and trims, then move into sampling and bulk with direct Shaoxing production oversight.
            </p>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="bg-[#f4f4f4] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Choose a Line</p>
              <h2 className="text-2xl font-bold md:text-4xl">Built for focused resort collections</h2>
            </div>
            <p className="max-w-md text-sm text-gray-600">Each category links to both its product overview section and its browsable ready-development styles.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const lead = category.products[0];
              return (
                <article key={category.id} className="border border-gray-200 bg-white">
                  <a href={`#${category.id}`} className="group relative block aspect-[16/11] overflow-hidden bg-[#fbfaf7]">
                    {lead && (
                      <>
                        <img
                          src={lead.image}
                          alt={category.label}
                          className="absolute inset-0 h-full w-full object-contain p-5 transition duration-500 group-hover:scale-95 group-hover:opacity-0"
                          loading="lazy"
                          decoding="async"
                        />
                        <img
                          src={lead.hoverImage || lead.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full object-contain p-5 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </>
                    )}
                  </a>
                  <div className="p-6">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">{category.eyebrow}</p>
                    <h3 className="mb-3 text-xl font-bold">{category.title}</h3>
                    <p className="mb-5 text-sm leading-6 text-gray-600">{category.summary}</p>
                    <div className="flex gap-2">
                      <a href={`#${category.id}`} className="flex-1 border border-black px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-black hover:text-white">
                        View Line
                      </a>
                      <Link to={`/shop?category=${category.id}`} className="flex-1 bg-black px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:bg-gray-800">
                        Browse Styles
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="bg-white">
        {categories.map((category, index) => {
          const lead = category.products[0];
          const featured = category.products.slice(0, 4);

          return (
            <section
              key={category.id}
              id={category.id}
              className={`scroll-mt-36 px-4 py-16 md:py-24 ${index % 2 === 1 ? 'bg-[#f7f7f7]' : 'bg-white'}`}
            >
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div className="lg:sticky lg:top-36 lg:self-start">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">{category.eyebrow}</p>
                  <h2 className="mb-5 text-3xl font-bold md:text-5xl">{category.title}</h2>
                  <p className="mb-6 text-sm leading-6 text-gray-600 md:text-base">{category.subtitle}</p>
                  <ul className="mb-8 space-y-3 text-sm text-gray-700">
                    {category.proof.map((item) => (
                      <li key={item} className="border-t border-gray-200 pt-3">{item}</li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to={`/shop?category=${category.id}`} className="bg-black px-5 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-white hover:bg-gray-800">
                      Browse Styles
                    </Link>
                    <Link to="/contact" className="border border-black px-5 py-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-black hover:text-white">
                      Request Quote
                    </Link>
                  </div>
                </div>

                <div>
                  <div className="group relative mb-4 aspect-[16/9] overflow-hidden bg-[#fbfaf7]">
                    {lead && (
                      <>
                        <img
                          src={lead.image}
                          alt={`${category.title} lead style`}
                          className="absolute inset-0 h-full w-full object-contain p-5 transition duration-500 group-hover:scale-95 group-hover:opacity-0 md:p-8"
                          loading="lazy"
                          decoding="async"
                        />
                        <img
                          src={lead.hoverImage || lead.image}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full object-contain p-5 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 md:p-8 scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 md:gap-x-5">
                    {featured.map((product) => (
                      <div key={`${category.id}-${product.id}`}>
                        <ProductTile product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* Terms Strip */}
      <section className="bg-black px-4 py-12 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 text-center md:grid-cols-4">
          {[
            ['MOQ', '50 pcs/style/color'],
            ['Sampling', '10-15 days'],
            ['Bulk Lead Time', '30-35 days'],
            ['Shipping', 'FOB / CIF / DDP'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">{label}</p>
              <p className="text-sm font-bold md:text-base">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
