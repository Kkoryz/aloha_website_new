import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  { q: "I'M NEW TO MANUFACTURING AND RUNNING MY OWN BUSINESS. DO YOU HAVE ANY TIPS?", a: "Start narrow: choose a clear resort-wear category, test a small number of prints, and sample before committing to bulk. Our FAQ, catalog, and Starter Kit are built to help founders plan their first resort collection with less guesswork." },
  { q: "WHAT IS YOUR MOQ (MINIMUM ORDER QUANTITY)?", a: "Our standard MOQ is 50 pcs per style per color. Many brands test 5 prints at 250 total units instead of committing to the 1,500+ units many generalist factories require." },
  { q: "HOW LONG TO PRODUCE (LEAD TIMES)?", a: "Custom print sampling usually takes 10-15 days after artwork and fabric direction are confirmed. Bulk production is typically 30-35 days after sample approval." },
  { q: "HOW DO I START? HOW DO I ORDER SAMPLES?", a: "Browse our 64+ base styles, choose a category, then send your artwork, reference images, or tech pack. We confirm fabric, print method, quote, sample fee, and production path before sampling begins." },
  { q: "CAN I DEVELOP MY OWN CUSTOM DESIGNS? CAN I MAKE ADJUSTMENTS TO YOUR READY DESIGNS?", a: "Yes. You can start from our resort-wear base styles or develop custom pieces. Our in-house designers support repeat artwork, print scaling, color matching, labels, trims, and packaging." },
  { q: "CAN WE VISIT YOUR FACTORY? WHAT SHOULD WE EXPECT?", a: "Yes, factory visits are available by appointment in Shaoxing, China. You can review fabrics, print samples, production lines, QC workflow, and meet the production team." },
  { q: "WHAT ARE YOUR PAYMENT TERMS?", a: "Standard terms are 30% deposit to begin bulk production and 70% before shipment. Sample and pattern fees are refundable against the approved bulk order for that style." },
  { q: "WHAT ARE YOUR SAMPLE AND PATTERN FEES?", a: "Sample fee is $50/pc and pattern fee is $50/design. Both are refundable on bulk when the style moves forward." },
  { q: "DO YOU OFFER FOB, CIF, AND DDP?", a: "Yes. We support FOB and CIF if you have your own freight partner. DDP is recommended when you want one landed quote with tariff, customs, and door-to-door delivery included." },
  { q: "WHERE ARE YOUR TEAMS BASED?", a: "Client operations are based in Toronto, Canada. Design, sourcing, and production teams work from Shaoxing, China, near China Textile City. This dual-timezone setup helps us respond within 24 hours." },
  { q: "WHO ARE YOUR CLIENTS?", a: "We support 200+ brands, from boutique startups to established resort retailers across the US and Hawaii." },
  { q: "WHAT ARE YOUR SIZES? DO YOU HAVE SIZE CHARTS?", a: "We offer standard adult and kids sizing depending on category, with size charts available during sampling. Fit and grading can be adjusted before bulk production." },
  { q: "HOW ARE MY DESIGNS SAFE?", a: "Your custom artwork and tech packs remain confidential. We can sign an NDA, and exclusive custom prints are not sold to other clients." },
  { q: "WHAT ARE YOUR TERMS & CONDITIONS?", a: "Full terms are provided with your quote and invoice, including MOQ, sampling scope, refund credits, production timeline, payment terms, and shipping method." },
  { q: "IS BULK PRODUCTION A MUST IF I SAMPLE WITH YOU?", a: "No. You can sample without proceeding to bulk. Sample and pattern fees are only credited back when that approved style moves into bulk production." },
  { q: "WHAT FILE FORMAT FOR CAD OR ARTWORK DO YOU WORK WITH?", a: "AI, EPS, PDF, PSD, high-resolution PNG, and clear reference images all work. Vector files are best for final print production, but we can help prepare artwork if you are starting from references." },
  { q: "CAN YOU PROVIDE DROPSHIPPING SERVICES?", a: "No. We focus on B2B sampling and bulk production, not individual B2C dropshipping." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      <section className="relative h-[50vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/FAQ.png" alt="FAQ Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 uppercase">FAQ</h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto">Answers to the most common questions about working with Aloha and Co.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-t border-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none hover:bg-gray-50 px-4 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-sm font-bold tracking-wide">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0 ml-4" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600 mb-6">Still have questions? We're here to help.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Contact Us
            </Link>
            <Link to="/catalog" className="border border-black px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
              View Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
