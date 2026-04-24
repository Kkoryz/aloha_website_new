import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryLabels, productsData, type Product } from '../data/products';

const fallbackColors = ['#111827', '#f8fafc', '#e2533f', '#2a8f8f', '#f2b84b', '#171717'];
const fallbackSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function findProduct(id?: string): { product: Product | null; category: string } {
  for (const [category, products] of Object.entries(productsData)) {
    const product = products.find((item) => item.id === id);
    if (product) return { product, category };
  }

  return { product: null, category: '' };
}

function getGallery(product: Product | null) {
  if (!product) return [];

  const images = [
    { label: 'Detail', src: product.detailImage || product.image },
    { label: 'Flat', src: product.image },
    { label: 'Model', src: product.hoverImage || product.image },
  ];

  return images.filter((image, index, list) => (
    image.src && list.findIndex((item) => item.src === image.src) === index
  ));
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, category } = useMemo(() => findProduct(id), [id]);
  const gallery = useMemo(() => getGallery(product), [product]);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    setSelectedImage(gallery[0]?.src || '');
  }, [gallery]);

  const related = useMemo(() => (
    category ? productsData[category]?.filter((item) => item.id !== id).slice(0, 3) || [] : []
  ), [category, id]);

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h1 className="mb-4 text-4xl font-black">Product Not Found</h1>
        <p className="mb-8 text-neutral-600">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="inline-block bg-black px-8 py-3 text-xs font-black uppercase tracking-[0.18em] text-white hover:bg-neutral-800">
          Back to Base Styles
        </Link>
      </main>
    );
  }

  const categoryLabel = categoryLabels[category] || category.replace(/-/g, ' ');
  const colors = product.colors || fallbackColors;
  const sizes = product.sizes || fallbackSizes;
  const details = product.details || [
    `Code: ${product.id}`,
    `Style: ${product.name}`,
    `Fabric: ${product.fabric}`,
    `MOQ: ${product.moq.replace('MOQ ', '')} pcs`,
    'Customization: custom print, color, label, tag and packaging available',
  ];
  const heroImage = selectedImage || gallery[0]?.src || product.image;
  const quoteHref = `/contact?style=${encodeURIComponent(product.id)}`;
  const whatsappHref = `https://wa.me/16475140926?text=${encodeURIComponent(
    `Hi Aloha & Co, I'm interested in style ${product.id}. Please share quote, MOQ, sample timing, and shipping options.`,
  )}`;

  return (
    <main className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500 sm:px-6 lg:px-8">
        <Link to="/shop" className="hover:text-black">Base Styles</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${category}`} className="hover:text-black">{categoryLabel}</Link>
        <span className="mx-2">/</span>
        <span className="text-black">{product.id}</span>
      </div>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[72px_minmax(0,1fr)]">
          <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
            {gallery.map((image) => (
              <button
                key={image.label}
                onClick={() => setSelectedImage(image.src)}
                className={`h-20 w-16 shrink-0 border bg-[#fbfaf7] p-1 transition-colors lg:h-24 lg:w-full ${
                  heroImage === image.src ? 'border-black' : 'border-neutral-300 hover:border-black'
                }`}
                aria-label={`Show ${image.label} image`}
              >
                <img
                  src={image.src}
                  alt={`${product.name} ${image.label}`}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>

          <div className="order-1 flex min-h-[520px] items-center justify-center bg-[#fbfaf7] lg:order-2">
            <img src={heroImage} alt={product.name} className="max-h-[720px] w-full object-contain" decoding="async" />
          </div>
        </div>

        <aside className="lg:pt-6">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
            {product.subtitle || 'READY DEVELOPMENT STYLE'}
          </p>
          <h1 className="mt-2 text-2xl font-black leading-tight md:text-3xl">
            {product.id} {product.name}
          </h1>

          <div className="mt-4 flex gap-8 text-sm">
            <p>
              <span className="font-black">Bulk guide:</span>{' '}
              <span className="font-black">{product.price || 'Contact'}</span>
            </p>
            <p>
              <span className="font-black">Sample reference:</span>{' '}
              <span className="font-black">{product.samplePrice || '$6.85'}</span>
            </p>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-sm font-black">Fabric</h2>
            <div className="border border-neutral-300 px-4 py-3 text-sm">
              <p>{product.fabric}</p>
              <p className="mt-2 text-xs leading-5 text-neutral-500">
                Final weight, hand feel, and stretch are confirmed during sampling.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="mb-2 text-sm font-black">Color:</h2>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <span
                  key={color}
                  className="h-6 w-6 rounded-full border border-neutral-200 ring-offset-2 first:ring-2 first:ring-black"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="mb-2 text-sm font-black">Size Range</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {sizes.map((size) => (
                <span
                  key={size}
                  className="flex h-9 items-center justify-center border border-neutral-300 bg-[#fbfaf7] text-xs font-black"
                >
                  {size}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-neutral-500">
              Fit, grading, and final labeling are adjusted during development and sample approval.
            </p>
          </div>

          <div className="mt-5">
            <h2 className="mb-2 text-sm font-black">Customization:</h2>
            <div className="border border-neutral-300 px-4 py-3 text-sm">
              <p>Custom print, label, tag, trim, and packaging support available.</p>
              <p className="mt-2 text-xs leading-5 text-neutral-500">
                Share artwork references or style IDs and we will map the right sampling path.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link to={quoteHref} className="bg-black px-4 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-white hover:bg-neutral-800">
              Request Quote
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black px-4 py-4 text-center text-xs font-black uppercase tracking-[0.18em] hover:bg-black hover:text-white"
            >
              WhatsApp
            </a>
          </div>

          <p className="mt-8 text-sm font-black">FOB, CIF, and DDP shipping available for bulk orders</p>

          <div className="mt-5 border-t border-black">
            <details open className="border-b border-black py-4">
              <summary className="cursor-pointer text-sm font-black">Description</summary>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-neutral-700">
                {details.map((detail) => (
                  <li key={detail}>- {detail}</li>
                ))}
              </ul>
            </details>
            <details className="border-b border-black py-4">
              <summary className="cursor-pointer text-sm font-black">Fabric</summary>
              <p className="mt-4 text-sm leading-6 text-neutral-700">{product.fabric}</p>
            </details>
            <details className="border-b border-black py-4">
              <summary className="cursor-pointer text-sm font-black">Size & Fit</summary>
              <p className="mt-4 text-sm leading-6 text-neutral-700">
                Development samples are graded for wholesale review. Final fit, grading and labels can be adjusted before bulk production.
              </p>
            </details>
          </div>

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-sm font-black">Related Styles</h2>
              <div className="grid grid-cols-3 gap-3">
                {related.map((item) => (
                  <Link to={`/product/${item.id}`} key={item.id} className="group text-center">
                    <div className="relative aspect-[4/5] bg-[#fbfaf7] p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain transition-transform group-hover:scale-95"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute bottom-1 left-1/2 max-w-[84%] -translate-x-1/2 rounded-full bg-black px-2 py-0.5 text-[9px] font-black text-white">
                        {item.id}
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] font-black leading-tight">{item.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </section>
    </main>
  );
}
