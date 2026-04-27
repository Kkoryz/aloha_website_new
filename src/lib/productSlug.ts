import { productsData, type Product } from '../data/products';

export function kebab(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function productSlug(product: Pick<Product, 'id' | 'name'>): string {
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
      const slug = productSlug(product);
      if (normalized === slug) return { product, category };
      if (normalized.endsWith(`-${id}`) && slug === normalized) return { product, category };
    }
  }

  // Fallback: match by trailing -{id} only (handles edge cases when name changes)
  const trailingIdMatch = normalized.match(/-([a-z0-9]+)$/);
  if (trailingIdMatch) {
    const id = trailingIdMatch[1];
    for (const [category, products] of Object.entries(productsData)) {
      const product = products.find((p) => p.id.toLowerCase() === id);
      if (product) return { product, category };
    }
  }

  return { product: null, category: '' };
}
