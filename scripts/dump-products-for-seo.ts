/**
 * Dump product IDs/categories from src/data/products.ts to a JSON file
 * that scripts/build-seo.cjs can read without a TypeScript runtime.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { productsData } from '../src/data/products';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, 'products-dump.json');
mkdirSync(dirname(out), { recursive: true });

const flat: Array<{ id: string; category: string; name: string; image?: string }> = [];
for (const [category, items] of Object.entries(productsData)) {
  for (const p of items) {
    flat.push({ id: p.id, category, name: p.name, image: p.hoverImage || p.image });
  }
}

writeFileSync(out, JSON.stringify(flat, null, 2));
console.log(`dump-products-for-seo: wrote ${flat.length} products to ${out}`);
