import { Link } from 'react-router-dom';

export default function Sampling() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/heroes/Sampling.png" alt="Sampling" className="w-full h-full object-cover object-[center_25%]" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Sampling</h1>
          <p className="text-lg text-white/90">Test fit, fabric, and print scale before you commit to bulk.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Base Style Samples</h2>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">MOQ:</span> No minimum</li>
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">Lead Time:</span> 10-15 days for printed samples</li>
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">Cost:</span> $50/pc, refundable on bulk</li>
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">Includes:</span> Fit, fabric, construction, and basic label review</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Custom Print Samples</h2>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">MOQ:</span> No minimum</li>
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">Lead Time:</span> 10-15 days after artwork confirmation</li>
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">Cost:</span> $50/pc + $50/design pattern fee</li>
                <li className="flex items-start"><span className="font-bold text-black mr-3 min-w-[100px]">Refund:</span> Sample and pattern fees credited on bulk</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Request Samples
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
