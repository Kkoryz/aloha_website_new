/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {lazy, Suspense, type ReactNode} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const StarterKits = lazy(() => import('./pages/StarterKits'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Sampling = lazy(() => import('./pages/Sampling'));
const Contact = lazy(() => import('./pages/Contact'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const BulkProduction = lazy(() => import('./pages/BulkProduction'));
const PrivateLabel = lazy(() => import('./pages/PrivateLabel'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Help = lazy(() => import('./pages/Help'));
const Guidance = lazy(() => import('./pages/Guidance'));
const News = lazy(() => import('./pages/News'));
const NewsArticle = lazy(() => import('./pages/NewsArticle'));

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 py-16 text-center">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
          Loading Page
        </p>
        <p className="mt-3 text-sm text-neutral-600">
          Preparing the next section of the site.
        </p>
      </div>
    </div>
  );
}

function LazyPage({children}: {children: ReactNode}) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="starter-kits" element={<LazyPage><StarterKits /></LazyPage>} />
          <Route path="catalog" element={<LazyPage><Catalog /></LazyPage>} />
          <Route path="shop" element={<LazyPage><Shop /></LazyPage>} />
          <Route path="product/:id" element={<LazyPage><ProductDetail /></LazyPage>} />
          <Route path="products" element={<LazyPage><Products /></LazyPage>} />
          <Route path="services" element={<LazyPage><Services /></LazyPage>} />
          <Route path="services/sampling" element={<LazyPage><Sampling /></LazyPage>} />
          <Route path="services/bulk-production" element={<LazyPage><BulkProduction /></LazyPage>} />
          <Route path="services/private-label" element={<LazyPage><PrivateLabel /></LazyPage>} />
          <Route path="contact" element={<LazyPage><Contact /></LazyPage>} />
          <Route path="faq" element={<LazyPage><FAQ /></LazyPage>} />
          <Route path="help" element={<LazyPage><Help /></LazyPage>} />
          <Route path="guidance" element={<LazyPage><Guidance /></LazyPage>} />
          <Route path="news" element={<LazyPage><News /></LazyPage>} />
          <Route path="news/:slug" element={<LazyPage><NewsArticle /></LazyPage>} />
          <Route path="signin" element={<Navigate to="/contact" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
