import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';

const whatsappHref = 'https://wa.me/16475140926?text=' + encodeURIComponent(
  "Hi Aloha & Co — I'd like a quick quote. Style IDs / quantities / target ship date:"
);

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="flex flex-col items-end gap-2">
          <Link
            to="/contact"
            className="inline-flex min-h-[44px] items-center justify-center bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg transition-colors hover:bg-neutral-800"
          >
            Quick Quote
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg transition-colors hover:bg-[#1ebe5b]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close quick contact menu' : 'Open quick contact menu'}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 active:scale-95 ${
          open ? 'bg-black' : 'bg-[#25D366] hover:bg-[#1ebe5b]'
        }`}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
