import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import RouteSeo from './RouteSeo';

const categoryLinks = [
  { label: 'Aloha Shirts', slug: 'aloha-shirts' },
  { label: 'T-Shirts & Tops', slug: 'tshirts-tops' },
  { label: 'Resort Dresses', slug: 'resort-dresses' },
  { label: 'Swimwear', slug: 'swimwear' },
  { label: 'Matching Sets', slug: 'matching-sets' },
  { label: 'Accessories', slug: 'accessories' },
];

const serviceLinks = [
  { label: 'All Services', href: '/services' },
  { label: 'Sampling', href: '/services/sampling' },
  { label: 'Bulk Production', href: '/services/bulk-production' },
  { label: 'Private Label', href: '/services/private-label' },
];

const utilityLinks = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Guidance', href: '/guidance' },
];

const resourceLinks = [
  { label: 'Guidance Overview', href: '/guidance' },
  { label: 'Help Center', href: '/help' },
  { label: 'FAQ', href: '/faq' },
  { label: 'News', href: '/news' },
];

function DesktopDropdown({
  label,
  href,
  links,
}: {
  label: string;
  href: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="relative group cursor-pointer flex items-center h-full text-sm font-medium text-white hover:text-gray-300">
      <Link to={href} className="mr-1 transition-colors">{label}</Link>
      <ChevronDown className="h-4 w-4" />
      <div className="absolute top-full left-0 w-60 bg-white text-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {links.map((link, index) => (
          <Link
            key={link.href}
            to={link.href}
            className={`block px-6 py-4 text-sm hover:bg-gray-50 ${index < links.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="border-t border-gray-800 pt-3">
      <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">{title}</p>
      <div className="grid grid-cols-2 gap-1">
        {links.map((link) => (
          <Link key={link.href} to={link.href} className="block px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);

    if (location.hash) {
      window.setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target) {
          target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }, 80);
      return;
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash]);

  const styleLinks = [
    { label: 'All Base Styles', href: '/shop' },
    ...categoryLinks.map((category) => ({
      label: category.label,
      href: `/shop?category=${category.slug}`,
    })),
  ];

  const productLinks = [
    { label: 'All Product Lines', href: '/products' },
    ...categoryLinks.map((category) => ({
      label: category.label,
      href: `/products#${category.slug}`,
    })),
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <RouteSeo />
      {/* Top Bar */}
      <div className="bg-gray-100 text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-center md:justify-between items-center text-gray-600">
        <div className="text-center md:text-left">
          Low MOQ 50 pcs/style/color | FOB + DDP | 24h response
        </div>
        <div className="hidden md:flex space-x-6">
          {utilityLinks.map((link) => (
            <Link key={link.href} to={link.href} className="hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-gray-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex flex-1 items-center justify-center md:flex-none md:justify-start">
              <Link to="/">
                <img src="/logo-white.png" alt="Aloha & Co." className="h-10" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 items-center justify-center space-x-8 h-full px-8">
              <Link to="/starter-kits" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">Starter Kits</Link>
              <Link to="/catalog" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">Catalog</Link>
              <DesktopDropdown label="Base Styles" href="/shop" links={styleLinks} />
              <DesktopDropdown label="Products" href="/products" links={productLinks} />
              <DesktopDropdown label="Services" href="/services" links={serviceLinks} />
              <DesktopDropdown label="Guidance" href="/guidance" links={resourceLinks} />
            </nav>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black sm:px-4"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden max-h-[calc(100vh-96px)] overflow-y-auto bg-black border-t border-gray-800">
            <div className="px-2 pt-2 pb-6 space-y-4 sm:px-3">
              <div className="grid grid-cols-2 gap-1">
                <Link to="/" className="block px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">Home</Link>
                <Link to="/starter-kits" className="block px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">Starter Kits</Link>
                <Link to="/catalog" className="block px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">Catalog</Link>
                <Link to="/contact" className="block px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">Contact</Link>
              </div>
              <MobileLinkGroup title="Base Styles" links={styleLinks} />
              <MobileLinkGroup title="Product Lines" links={productLinks} />
              <MobileLinkGroup title="Services" links={serviceLinks} />
              <MobileLinkGroup title="Guidance" links={resourceLinks} />
              <div className="border-t border-gray-800 pt-4 grid gap-2">
                <Link to="/contact" className="block px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">Contact</Link>
                <Link
                  to="/contact"
                  className="block border border-gray-700 px-3 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white hover:bg-gray-900"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Get Started</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/starter-kits" className="hover:text-white transition-colors">Starter Kits</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Base Styles</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/guidance" className="hover:text-white transition-colors">Guidance</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">Help</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">News</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Start The Conversation</h3>
              <p className="text-sm text-gray-400 mb-5">Shortlist styles, review the catalog, then send us your brief for quote, sampling, and shipping support.</p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition-colors hover:bg-neutral-200"
              >
                Request Quote
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Contact</h3>
              <p className="text-sm text-gray-400">+1 (647) 514-0926</p>
              <p className="text-sm text-gray-400">korey@alohaandco.com</p>
              <p className="text-sm text-gray-400 mt-2">Toronto, Canada + Shaoxing, China</p>
              <div className="mt-6">
                <Link to="/">
                  <img src="/logo-white.png" alt="Aloha & Co." className="h-8" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col items-center gap-3 text-center text-xs text-gray-500 sm:flex-row sm:justify-between">
            <span>&copy; {new Date().getFullYear()} Aloha & Co. All rights reserved.</span>
            <span className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
