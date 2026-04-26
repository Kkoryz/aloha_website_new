import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const lastUpdated = 'April 26, 2026';

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms of Service | Aloha & Co';
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>

      <section className="mt-10 space-y-6 text-sm leading-7 text-gray-700">
        <div>
          <h2 className="text-lg font-bold">1. About these terms</h2>
          <p className="mt-2">
            These terms apply to your use of <a href="https://alohaandco.com" className="underline">alohaandco.com</a>,
            and to inquiries you send to Aloha &amp; Co through the website. They do not replace any signed agreement
            between us; signed quotes, sample agreements, or production contracts take precedence.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">2. Use of the site</h2>
          <p className="mt-2">
            The site is provided for business buyers exploring resort wear manufacturing services. You agree to use
            it lawfully and not to attempt to disrupt or reverse engineer it.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">3. Quotes, samples, and orders</h2>
          <p className="mt-2">
            Pricing, MOQs, and lead times shown on the site are general guidance. The binding numbers for any
            project come from a written quote we send you that references your specific styles, prints, and shipping
            terms. Standard practice we operate under unless agreed otherwise:
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>MOQ 50 pcs per style per color.</li>
            <li>Sample fee $50/pc, pattern fee $50/design — both refundable on approved bulk for that style.</li>
            <li>Bulk payment: 30% deposit + 70% before shipment.</li>
            <li>Sampling lead time: 10–15 days after artwork and fabric direction confirmed.</li>
            <li>Bulk lead time: 30–35 days after sample approval.</li>
            <li>Shipping: FOB, CIF, or DDP, agreed before production.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold">4. Intellectual property</h2>
          <p className="mt-2">
            Site copy, photographs, illustrations, and product imagery are owned by Aloha &amp; Co or licensed for
            use here, and may not be reused commercially without permission. Artwork you submit to us remains
            yours; we use it only to develop, sample, and produce your order.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">5. Confidentiality</h2>
          <p className="mt-2">
            Tech packs, prints, briefs, and pricing exchanged with us are treated as confidential. We will sign an
            NDA on request, and exclusive custom prints are not sold to other clients.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">6. Warranties and disclaimers</h2>
          <p className="mt-2">
            The site is provided "as is" without warranties of any kind. Specific product warranties for goods we
            manufacture are defined in the quote and order documents for each project.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">7. Limitation of liability</h2>
          <p className="mt-2">
            To the extent permitted by law, Aloha &amp; Co is not liable for indirect, incidental, or consequential
            losses arising from use of the site. Liability for produced goods is governed by the corresponding
            order agreement.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">8. Governing law</h2>
          <p className="mt-2">
            These terms are governed by the laws of the Province of Ontario, Canada, without reference to conflict
            of laws principles. Project-specific contracts may specify a different governing law.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">9. Changes</h2>
          <p className="mt-2">
            We may update these terms when our practices change. The "Last updated" date at the top reflects the
            current version.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">10. Contact</h2>
          <p className="mt-2">
            Questions can go to{' '}
            <a href="mailto:korey@alohaandco.com" className="underline">korey@alohaandco.com</a>.
          </p>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-gray-200 pt-8 text-xs">
        <Link to="/privacy" className="font-bold uppercase tracking-widest hover:underline">Privacy Policy →</Link>
        <Link to="/contact" className="font-bold uppercase tracking-widest hover:underline">Contact →</Link>
      </div>
    </main>
  );
}
