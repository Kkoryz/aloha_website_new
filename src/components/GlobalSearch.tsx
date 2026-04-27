import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { categoryLabels, productsData } from '../data/products';
import { productPath } from '../lib/productSlug';

type SearchEntry = {
  id: string;
  name: string;
  fabric: string;
  category: string;
  categoryLabel: string;
  image?: string;
  path: string;
  haystack: string;
};

const searchEntries: SearchEntry[] = Object.entries(productsData).flatMap(
  ([category, items]) =>
    items.map((product) => {
      const categoryLabel = categoryLabels[category] || category;
      return {
        id: product.id,
        name: product.name,
        fabric: product.fabric,
        category,
        categoryLabel,
        image: product.image,
        path: productPath(product),
        haystack: `${product.id} ${product.name} ${product.fabric} ${categoryLabel}`.toLowerCase(),
      };
    }),
);

function rankResults(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = searchEntries
    .map((entry) => {
      const idMatch = entry.id.toLowerCase().startsWith(q) ? 100 : 0;
      const nameMatch = entry.name.toLowerCase().includes(q) ? 30 : 0;
      const allTokens = tokens.every((t) => entry.haystack.includes(t));
      if (!allTokens && !idMatch && !nameMatch) return null;
      return {
        entry,
        score: idMatch + nameMatch + (allTokens ? 10 : 0),
      };
    })
    .filter((r): r is { entry: SearchEntry; score: number } => Boolean(r))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.entry);

  return scored;
}

type Props = {
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

export default function GlobalSearch({ variant = 'desktop', onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const results = useMemo(() => rankResults(query), [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  useEffect(() => {
    if (variant !== 'desktop') return;
    function onClick(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [variant]);

  function handleSelect(entry: SearchEntry) {
    setOpen(false);
    setQuery('');
    onNavigate?.();
    navigate(entry.path);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' && results.length) {
      event.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (event.key === 'ArrowUp' && results.length) {
      event.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (event.key === 'Enter') {
      if (results[highlight]) {
        event.preventDefault();
        handleSelect(results[highlight]);
      } else if (query.trim()) {
        event.preventDefault();
        setOpen(false);
        setQuery('');
        onNavigate?.();
        navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      }
    } else if (event.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const showDropdown = open && query.trim().length > 0;
  const isMobile = variant === 'mobile';

  return (
    <div ref={containerRef} className={`relative ${isMobile ? 'w-full' : 'w-full max-w-xs'}`}>
      <div
        className={`flex items-center gap-2 border ${
          isMobile
            ? 'border-gray-700 bg-gray-900 text-white'
            : 'border-white/40 bg-white/5 text-white focus-within:border-white'
        } px-3 ${isMobile ? 'min-h-[44px]' : 'h-9'} transition-colors`}
      >
        <Search className="h-4 w-4 opacity-80" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isMobile ? 'Search 64+ base styles…' : 'Search styles, IDs…'}
          aria-label="Search base styles"
          className={`w-full bg-transparent text-sm placeholder:text-white/60 focus:outline-none ${
            isMobile ? 'py-2' : ''
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="flex h-6 w-6 items-center justify-center text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          className={`${
            isMobile ? 'relative mt-2' : 'absolute right-0 mt-2 w-[22rem]'
          } z-50 max-h-[70vh] overflow-y-auto border border-neutral-200 bg-white text-black shadow-xl`}
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-sm text-neutral-600">
              No styles match “{query}”. Try a style ID (e.g. AS1001) or fabric.
            </div>
          ) : (
            <ul role="listbox">
              {results.map((entry, idx) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(idx)}
                    onClick={() => handleSelect(entry)}
                    className={`flex w-full items-center gap-3 border-b border-neutral-100 px-3 py-3 text-left last:border-b-0 ${
                      idx === highlight ? 'bg-neutral-100' : 'bg-white hover:bg-neutral-50'
                    }`}
                  >
                    {entry.image && (
                      <img
                        src={entry.image}
                        alt=""
                        className="h-12 w-12 shrink-0 object-contain"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-sm font-bold">{entry.name}</p>
                        <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.16em] text-neutral-500">
                          {entry.id}
                        </span>
                      </div>
                      <p className="truncate text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                        {entry.categoryLabel} · {entry.fabric}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to={`/shop?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => {
                    setOpen(false);
                    setQuery('');
                    onNavigate?.();
                  }}
                  className="block bg-black px-3 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white hover:bg-neutral-800"
                >
                  See all results in Shop
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
