import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  categoryLabels,
  categorySummaries,
  productLineSections,
  productsData,
  type Product,
} from '../data/products';

type ProductWithCategory = Product & { category: string };
const categoryOrder = Object.keys(categoryLabels);

function ProductCard({ product }: { product: Product }) {
  const imagePadding = 'p-4 sm:p-6';
  const flatImageScale = 'group-hover:scale-95';
  const hoverImageScale = 'scale-105 group-hover:scale-100';

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block text-center"
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#fbfaf7]">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-contain transition duration-500 group-hover:opacity-0 ${imagePadding} ${flatImageScale}`}
          loading="lazy"
          decoding="async"
        />
        <img
          src={product.hoverImage || product.image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-contain opacity-0 transition duration-500 group-hover:opacity-100 ${imagePadding} ${hoverImageScale}`}
          loading="lazy"
          decoding="async"
        />
        <span className="absolute bottom-3 left-1/2 max-w-[84%] -translate-x-1/2 rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-tight text-white shadow-sm sm:text-xs">
          {product.id}
        </span>
      </div>
      <div className="mx-auto max-w-[92%] pt-3">
        <h2 className="min-h-[2.5rem] text-balance text-sm font-black leading-tight sm:text-base">
          {product.name}
        </h2>
        <p className="mt-1 min-h-[1.75rem] text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-600">
          {product.fabric}
        </p>
        <div className="mt-2 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
          <span>{product.moq}</span>
          {product.sizeRange && <span>{product.sizeRange}</span>}
        </div>
        <p className="mt-1 text-sm font-black">{product.price || 'Contact'}</p>
        <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-neutral-500 group-hover:text-black">
          Customize This Style
        </p>
      </div>
    </Link>
  );
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'all');

  useEffect(() => {
    setActiveCategory(categoryParam || 'all');
  }, [categoryParam]);

  const products = useMemo<ProductWithCategory[]>(() => {
    if (activeCategory === 'all') {
      return Object.entries(productsData).flatMap(([category, items]) =>
        items.map((product) => ({ ...product, category })),
      );
    }

    return (productsData[activeCategory] || []).map((product) => ({
      ...product,
      category: activeCategory,
    }));
  }, [activeCategory]);

  const activeTitle = activeCategory === 'all' ? 'All Base Styles' : categoryLabels[activeCategory];
  const productById = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);
  const lineSections = productLineSections[activeCategory] || [];
  const allCategoryGroups = useMemo(() => (
    categoryOrder.map((category) => ({
      category,
      label: categoryLabels[category],
      summary: categorySummaries[category],
      products: (productsData[category] || []).map((product) => ({...product, category})),
    }))
  ), []);

  return (
    <main className="w-full bg-white text-black">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/heroes/shop_hero.webp" alt="Shop Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight uppercase">Ready Development Base Styles</h1>
          <p className="text-lg text-white/90">Factory-ready resort wear samples with custom print, label, fabric and packaging options.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-black pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
              Browse Collection
            </p>
            <h2 className="mt-2 text-4xl font-black uppercase tracking-tight md:text-6xl">
              {activeTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-neutral-600">
            {categorySummaries[activeCategory] || 'Select a category to view styles ready for your brand.'}
          </p>
        </div>

        <div className="flex gap-8 md:gap-12 overflow-x-auto border-b border-neutral-200 py-8 lg:justify-center scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`shrink-0 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-colors hover:text-black pb-3 border-b-2 ${
              activeCategory === 'all'
                ? 'border-black text-black'
                : 'border-transparent text-gray-400'
            }`}
          >
            All
          </button>
          {Object.entries(categoryLabels).map(([category, label]) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-colors hover:text-black pb-3 border-b-2 ${
                activeCategory === category
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between py-5 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
          <span>{products.length} products</span>
          <span>{activeTitle}</span>
        </div>

        {activeCategory === 'all' ? (
          <div className="space-y-14">
            <div className="grid grid-cols-2 gap-3 border border-neutral-200 bg-[#fcfbf7] p-4 sm:grid-cols-3 xl:grid-cols-6">
              {allCategoryGroups.map((group) => (
                <a
                  key={group.category}
                  href={`#${group.category}`}
                  className="border border-neutral-200 bg-white px-4 py-4 text-center transition-colors hover:border-black"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-500">
                    {group.products.length} styles
                  </p>
                  <p className="mt-2 text-sm font-black">{group.label}</p>
                </a>
              ))}
            </div>

            {allCategoryGroups.map((group) => (
              <section key={group.category} id={group.category} className="scroll-mt-32 border-t border-neutral-200 pt-6">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
                      Category
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">
                      {group.label}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                      {group.summary}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveCategory(group.category)}
                    className="inline-flex items-center justify-center border border-black px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
                  >
                    View {group.label} Only
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 lg:gap-x-5 xl:gap-x-7">
                  {group.products.map((product) => (
                    <div key={`${group.category}-${product.id}`}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : lineSections.length > 0 ? (
          <div className="space-y-12">
            {lineSections.map((section) => {
              const sectionProducts = section.productIds
                .map((productId) => productById.get(productId))
                .filter((product): product is ProductWithCategory => Boolean(product));

              return (
                <section key={section.title} className="border-t border-neutral-200 pt-6">
                  <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h2 className="text-2xl font-black tracking-tight">{section.title}</h2>
                      <p className="mt-1 text-sm text-neutral-600">{section.subtitle}</p>
                    </div>
                    {section.alsoAvailable && (
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                        {section.alsoAvailable}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 lg:gap-x-5 xl:gap-x-7">
                    {sectionProducts.map((product) => (
                      <div key={`${section.title}-${product.id}`}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
            {/* Remaining products not in any named section */}
            {(() => {
              const sectionedIds = new Set(lineSections.flatMap((s) => s.productIds));
              const remaining = products.filter((p) => !sectionedIds.has(p.id));
              if (remaining.length === 0) return null;
              return (
                <section className="border-t border-neutral-200 pt-6">
                  <div className="mb-5">
                    <h2 className="text-2xl font-black tracking-tight">More Styles</h2>
                    <p className="mt-1 text-sm text-neutral-600">Additional styles from our catalog</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 lg:gap-x-5 xl:gap-x-7">
                    {remaining.map((product) => (
                      <div key={`more-${product.id}`}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })()}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 lg:gap-x-5 xl:gap-x-7">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
