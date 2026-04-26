import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Page Not Found | Aloha & Co';
  }, []);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-500">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600">
        The page you tried to open doesn't exist. The path
        {' '}<code className="rounded bg-gray-100 px-2 py-0.5 text-xs">{location.pathname}</code>{' '}
        may have been removed, renamed, or never existed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-black px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
        >
          Back to Home
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
        >
          Browse Base Styles
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
