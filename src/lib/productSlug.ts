import { productsData, type Product } from '../data/products';

export function kebab(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Internal SKU codes like "XLSX-03" leak through URLs and dilute keyword
// signals. We drop the catalog-source prefix so the slug ends with the bare
// number ("polyester-aloha-polo-03"). Other prefixes (AC, MS, RD, SW, TS,
// AL...) are kept because they read as part of the product line.
function slugIdSuffix(id: string): string {
  return id.replace(/^xlsx-/i, '').toLowerCase();
}

export function productSlug(product: Pick<Product, 'id' | 'name'>): string {
  return `${kebab(product.name)}-${slugIdSuffix(product.id)}`;
}

// Pre-cleanup format. Kept so old inbound links and indexed URLs keep working.
function legacyProductSlug(product: Pick<Product, 'id' | 'name'>): string {
  return `${kebab(product.name)}-${product.id.toLowerCase()}`;
}

export function productPath(product: Pick<Product, 'id' | 'name'>): string {
  return `/product/${productSlug(product)}`;
}

export function findProductBySlugOrId(
  slugOrId: string | undefined,
): { product: Product | null; category: string } {
  if (!slugOrId) return { product: null, category: '' };
  const normalized = decodeURIComponent(slugOrId).toLowerCase();

  for (const [category, products] of Object.entries(productsData)) {
    for (const product of products) {
      const id = product.id.toLowerCase();
      if (normalized === id) return { product, category };
      if (normalized === productSlug(product)) return { product, category };
      if (normalized === legacyProductSlug(product)) return { product, category };
    }
  }

  // Fallback: match by trailing -{id} only (handles edge cases when name changes)
  const trailingIdMatch = normalized.match(/-([a-z0-9-]+)$/);
  if (trailingIdMatch) {
    const tail = trailingIdMatch[1];
    for (const [category, products] of Object.entries(productsData)) {
      const product = products.find((p) => {
        const id = p.id.toLowerCase();
        return id === tail || slugIdSuffix(p.id) === tail;
      });
      if (product) return { product, category };
    }
  }

  return { product: null, category: '' };
}
