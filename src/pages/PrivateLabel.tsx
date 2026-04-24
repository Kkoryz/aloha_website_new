import { Link } from 'react-router-dom';

export default function PrivateLabel() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/heroes/Private Label.png" alt="Private Label" className="w-full h-full object-cover object-[center_15%]" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Private Label</h1>
          <p className="text-lg text-white/90">Custom prints, labels, trims, and packaging for resort wear brands.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-sm font-bold tracking-widest uppercase text-center mb-16">Branding Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Custom Labels & Tags', desc: 'Woven labels, printed tags, hang tags, and care labels matched to your brand identity.' },
              { title: 'Custom Packaging', desc: 'Branded poly bags, mailers, tissue paper, stickers, and boxes for a cleaner wholesale or retail handoff.' },
              { title: 'Custom Prints & Patterns', desc: 'Work with our in-house design team to create exclusive resort prints, scaled correctly by garment type.' },
              { title: 'Hardware & Trims', desc: 'Custom buttons, drawcords, tips, buckles, and trims to finish the product without generic factory defaults.' },
            ].map(item => (
              <div key={item.title} className="border border-gray-200 p-8">
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Start Your Private Label
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
