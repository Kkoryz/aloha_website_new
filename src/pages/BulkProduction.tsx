import { Link } from 'react-router-dom';

export default function BulkProduction() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/heroes/bulk production.webp" alt="Bulk Production" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Bulk Production</h1>
          <p className="text-lg text-white/90">Scale your resort wear brand from 50 pcs per style per color.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-16">Production Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-8 text-center">
              <div className="text-3xl font-bold mb-2">50</div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Pcs / Style / Color</p>
              <p className="text-sm text-gray-600">Launch or reorder individual resort styles without overbuying inventory.</p>
            </div>
            <div className="border border-gray-200 p-8 text-center">
              <div className="text-3xl font-bold mb-2">250</div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Units For 5 Prints</p>
              <p className="text-sm text-gray-600">Test multiple prints in market before scaling into deeper production.</p>
            </div>
            <div className="border border-gray-200 p-8 text-center">
              <div className="text-3xl font-bold mb-2">30-35</div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Days Lead Time</p>
              <p className="text-sm text-gray-600">Bulk production timeline after final sample approval.</p>
            </div>
          </div>

          <div className="mt-16 bg-[#f4f4f4] p-8">
            <h3 className="font-bold mb-4">Standard Bulk Terms</h3>
            <p className="text-sm text-gray-600 mb-4">Clear factory-direct terms before production starts:</p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>- <strong>MOQ:</strong> 50 pcs per style per color</li>
              <li>- <strong>Sample fee:</strong> $50/pc, refundable on bulk</li>
              <li>- <strong>Pattern fee:</strong> $50/design, refundable on bulk</li>
              <li>- <strong>Payment:</strong> 30% deposit + 70% before shipment</li>
              <li>- <strong>Shipping:</strong> FOB / CIF / DDP, with DDP recommended</li>
            </ul>
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
