import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const lastUpdated = 'April 26, 2026';

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Aloha & Co';
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>

      <section className="mt-10 space-y-6 text-sm leading-7 text-gray-700">
        <div>
          <h2 className="text-lg font-bold">Who we are</h2>
          <p className="mt-2">
            Aloha &amp; Co is a B2B resort wear manufacturer with client operations in Toronto, Canada and production
            in Shaoxing, China. This Privacy Policy explains how we handle information we receive through{' '}
            <a href="https://alohaandco.com" className="underline">alohaandco.com</a>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Information we collect</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li><strong>Inquiry form data</strong>: name, business email, company, and message you submit on our Contact page.</li>
            <li><strong>Email or WhatsApp correspondence</strong>: anything you choose to send us directly.</li>
            <li><strong>Standard server logs</strong>: IP address, user agent, and request paths kept by our hosting provider for short-term security and error monitoring.</li>
          </ul>
          <p className="mt-2">We do not run advertising trackers and we do not sell or rent personal information.</p>
        </div>

        <div>
          <h2 className="text-lg font-bold">How we use the information</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Reply to your inquiry and prepare quotes, samples, or production briefs.</li>
            <li>Send updates that relate to a project we are actively working on with you.</li>
            <li>Maintain reasonable security of the website.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold">Third parties we rely on</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li><strong>Web3Forms</strong> — receives the contact form payload and forwards it to our team email.</li>
            <li><strong>Hosting provider</strong> — runs the web server (DigitalOcean) with standard log retention.</li>
          </ul>
          <p className="mt-2">
            Each of these processors operates under their own privacy terms. We share only what they need to deliver
            the service you triggered.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Data retention</h2>
          <p className="mt-2">
            Inquiries are kept for as long as the related project is active, plus a reasonable period for
            recordkeeping. You can ask us to delete your contact record at any time by emailing{' '}
            <a href="mailto:korey@alohaandco.com" className="underline">korey@alohaandco.com</a>.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Your rights</h2>
          <p className="mt-2">
            Depending on your location (e.g., GDPR, PIPEDA, CCPA), you may have the right to access, correct, or
            delete personal data we hold about you. Contact us at{' '}
            <a href="mailto:korey@alohaandco.com" className="underline">korey@alohaandco.com</a>{' '}
            and we will respond within a reasonable time.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Cookies</h2>
          <p className="mt-2">
            This site does not set advertising or tracking cookies. The browser may store small functional values to
            keep your session in good order while you browse.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Changes</h2>
          <p className="mt-2">
            We may update this policy when our practices change. The "Last updated" date at the top reflects the
            current version.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold">Contact</h2>
          <p className="mt-2">
            Questions about this policy can go to{' '}
            <a href="mailto:korey@alohaandco.com" className="underline">korey@alohaandco.com</a>.
          </p>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-gray-200 pt-8 text-xs">
        <Link to="/terms" className="font-bold uppercase tracking-widest hover:underline">Terms of Service →</Link>
        <Link to="/contact" className="font-bold uppercase tracking-widest hover:underline">Contact →</Link>
      </div>
    </main>
  );
}
