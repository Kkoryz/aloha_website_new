import {type ChangeEvent, type FormEvent, useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {Factory, Mail, MapPin, MessageCircle} from 'lucide-react';

type ContactFormData = {
  company: string;
  email: string;
  message: string;
  name: string;
};

type ContactFormErrors = Partial<Record<'email' | 'message' | 'name', string>>;
type SubmissionState =
  | {message: string; tone: 'error' | 'success'}
  | null;

type InquirySeed = {
  emailBody: string;
  emailSubject: string;
  formMessage: string;
  label: string | null;
};

const whatsappHref = 'https://wa.me/16475140926';
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || '';

function buildInquirySeed(styleId: string | null, topic: string | null): InquirySeed {
  if (topic === 'starter-kit') {
    return {
      label: 'Starter Kit request',
      emailBody: [
        'Hi Aloha & Co,',
        '',
        "I'd like to request a Starter Kit for our brand. Please share the best next step, what is included, and how your team supports sampling and custom print development.",
      ].join('\n'),
      emailSubject: 'Starter Kit Request',
      formMessage:
        "I'd like to request a Starter Kit for our brand. Please share the best next step, what is included, and how your team supports sampling and custom print development.",
    };
  }

  if (styleId) {
    return {
      label: `Style ${styleId}`,
      emailBody: [
        'Hi Aloha & Co,',
        '',
        `I'm interested in style ${styleId}. Please share MOQ, sample timing, quote details, and shipping options.`,
      ].join('\n'),
      emailSubject: `Quote Request - ${styleId}`,
      formMessage: `I'm interested in style ${styleId}. Please share MOQ, sample timing, quote details, and shipping options.`,
    };
  }

  return {
    label: null,
    emailBody: [
      'Hi Aloha & Co,',
      '',
      'We are planning a resort wear collection and would like to discuss styles, quantities, timing, and shipping options.',
    ].join('\n'),
    emailSubject: 'Resort Wear Inquiry',
    formMessage: '',
  };
}

function buildEmailHref(subject: string, body: string) {
  const params = new URLSearchParams({
    body,
    subject,
  });

  return `mailto:korey@alohaandco.com?${params.toString()}`;
}

function validateForm(formData: ContactFormData) {
  const errors: ContactFormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formData.message.trim()) {
    errors.message = 'Please tell us what you need.';
  }

  return errors;
}

function FieldError({message}: {message?: string}) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-medium text-red-600">{message}</p>;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const requestedStyle = searchParams.get('style');
  const requestedTopic = searchParams.get('topic');
  const inquirySeed = useMemo(
    () => buildInquirySeed(requestedStyle, requestedTopic),
    [requestedStyle, requestedTopic],
  );
  const emailHref = useMemo(
    () => buildEmailHref(inquirySeed.emailSubject, inquirySeed.emailBody),
    [inquirySeed.emailBody, inquirySeed.emailSubject],
  );
  const [formData, setFormData] = useState<ContactFormData>({
    company: '',
    email: '',
    message: inquirySeed.formMessage,
    name: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>(null);

  const isConfigured = Boolean(web3FormsAccessKey);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setFormData((current) => ({...current, [name]: value}));
    setErrors((current) => ({...current, [name]: undefined}));
    if (submissionState?.tone === 'error') {
      setSubmissionState(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionState({
        tone: 'error',
        message: 'Please complete the required fields before sending your brief.',
      });
      return;
    }

    if (!isConfigured) {
      setSubmissionState({
        tone: 'error',
        message: 'Online form submission is not active yet. Please contact us by WhatsApp or email below.',
      });
      return;
    }

    if (formData.company.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionState(null);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();
    const trimmedCompany = formData.company.trim();
    const subject = `Aloha & Co — Inquiry from ${trimmedName}${inquirySeed.label ? ` (${inquirySeed.label})` : ''}`;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subject,
          from_name: trimmedName ? `${trimmedName} (alohaandco.com)` : 'alohaandco.com Contact Form',
          replyto: trimmedEmail,
          inquiry_type: inquirySeed.label || 'General',
          source_page: typeof window !== 'undefined' ? window.location.href : 'https://alohaandco.com/contact',
          company: trimmedCompany,
          email: trimmedEmail,
          message: trimmedMessage,
          name: trimmedName,
          botcheck: '',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send your brief right now.');
      }

      setFormData({
        company: '',
        email: '',
        message: '',
        name: '',
      });
      setErrors({});
      setSubmissionState({
        tone: 'success',
        message: 'Thanks. Your brief has been sent. Our team will follow up within 24 hours.',
      });
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Unable to send your brief right now.';

      setSubmissionState({
        tone: 'error',
        message: `${message} You can still reach us by WhatsApp or email below.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full flex-col">
      <section className="relative bg-[#f6f4ef] py-16 md:py-20">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/heroes/contact_hero.webp"
            alt="Aloha & Co showroom and resort wear briefing table"
            className="h-full w-full object-cover"
            decoding="async"
          />
        </div>
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
              Direct Factory Contact
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              Talk to the resort wear team
            </h1>
            <p className="mt-5 text-base leading-7 text-neutral-700 md:text-lg">
              Toronto client ops and Shaoxing production stay on the same thread from first brief through sampling, custom print development, and bulk delivery.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ['24h', 'Response target'],
                ['50 pcs', 'MOQ per style / color'],
                ['In-house', 'Print design support'],
              ].map(([value, label]) => (
                <div key={label} className="border border-black/10 bg-white/85 px-4 py-5 backdrop-blur-sm">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/faq"
                className="inline-flex items-center justify-center border border-black px-6 py-3 text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
              >
                View FAQ
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center border border-black px-6 py-3 text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
              >
                Open Catalog
              </Link>
            </div>

            {inquirySeed.label && (
              <div className="mt-8 border border-black bg-white px-5 py-5">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-neutral-500">
                  Current Inquiry
                </p>
                <p className="mt-3 text-base font-bold text-black">{inquirySeed.label}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  We will use this as the starting point when we review your brief, recommend base styles, or map the right sample path.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white/92 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="mb-2 text-2xl font-bold">Send Your Brief</h2>
            <p className="mb-6 text-sm leading-6 text-gray-600">
              Use the form for quote requests, sample questions, MOQ checks, or custom print discussions.
            </p>

            {submissionState && (
              <div
                aria-live="polite"
                className={`mb-6 border px-4 py-3 text-sm leading-6 ${
                  submissionState.tone === 'success'
                    ? 'border-green-200 bg-green-50 text-green-900'
                    : 'border-red-200 bg-red-50 text-red-900'
                }`}
              >
                {submissionState.message}
              </div>
            )}

            {isConfigured ? (
              <>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="hidden">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="off"
                      tabIndex={-1}
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none transition-colors"
                        aria-invalid={Boolean(errors.name)}
                        required
                      />
                      <FieldError message={errors.name} />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@brand.com"
                        className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none transition-colors"
                        aria-invalid={Boolean(errors.email)}
                        required
                      />
                      <FieldError message={errors.email} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us the styles, quantities, timing, and shipping market you need."
                      className="w-full border border-gray-300 p-3 focus:border-black focus:outline-none transition-colors"
                      aria-invalid={Boolean(errors.message)}
                      required
                    />
                    <FieldError message={errors.message} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border-2 border-black bg-white py-4 font-bold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Brief'}
                  </button>
                </form>

                <div className="mt-6 border-t border-gray-200 pt-5 text-sm text-gray-600">
                  Prefer direct contact?{' '}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-bold text-black underline">
                    WhatsApp
                  </a>{' '}
                  or{' '}
                  <a href={emailHref} className="font-bold text-black underline">
                    email us
                  </a>.
                </div>
              </>
            ) : (
              <div className="border border-black p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">
                  Direct Contact
                </p>
                <h3 className="mt-3 text-xl font-bold">
                  Share your brief directly with our team.
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Online form submission is not active yet. For now, please send your style IDs, quantities, target timing, and shipping market by WhatsApp or email.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={emailHref}
                    className="inline-flex items-center justify-center border border-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
                  >
                    Email Us
                  </a>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Direct email: <span className="font-medium text-black">korey@alohaandco.com</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col border border-black p-8 transition-colors hover:bg-gray-50"
          >
            <h3 className="mb-4 text-xl font-bold">WhatsApp</h3>
            <div className="mb-6 h-1 w-12 bg-gray-200" />
            <p className="mb-3 flex-grow text-sm text-gray-600">
              Message us at +1 (647) 514-0926 for fast answers on MOQ, sampling, prints, and shipping.
            </p>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.16em] text-black">
              Message Now
            </p>
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors group-hover:bg-gray-800">
                <MessageCircle className="h-6 w-6" />
              </div>
            </div>
          </a>

          <a href={emailHref} className="group flex h-full flex-col border border-black p-8 transition-colors hover:bg-gray-50">
            <h3 className="mb-4 text-xl font-bold">Email</h3>
            <div className="mb-6 h-1 w-12 bg-gray-200" />
            <p className="mb-3 flex-grow text-sm text-gray-600">
              Send your brief, target quantities, and timing to korey@alohaandco.com for a direct response from the team.
            </p>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.16em] text-black">
              Email Us
            </p>
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors group-hover:bg-gray-800">
                <Mail className="h-6 w-6" />
              </div>
            </div>
          </a>

          <div className="flex h-full flex-col border border-black p-8">
            <h3 className="mb-4 text-xl font-bold">Production Base</h3>
            <div className="mb-6 h-1 w-12 bg-gray-200" />
            <p className="mb-8 flex-grow text-sm text-gray-600">
              Shaoxing production supports sourcing, print development, QC, and bulk coordination for resort wear programs.
            </p>
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <Factory className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col border border-black p-8">
            <h3 className="mb-4 text-xl font-bold">Locations</h3>
            <div className="mb-6 h-1 w-12 bg-gray-200" />
            <p className="mb-8 flex-grow text-sm text-gray-600">
              Toronto client operations plus Shaoxing production give you direct coverage across planning, sampling, and shipping.
            </p>
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-16 text-center">
        <div className="mx-auto max-w-xl px-4">
          <img src="/logo-black.png" alt="Aloha & Co." className="mx-auto mb-6 h-10" loading="lazy" decoding="async" />
          <p className="mb-2 text-sm text-gray-600">Toronto, Canada + Shaoxing, China</p>
          <p className="mb-2 text-sm text-gray-600">+1 (647) 514-0926</p>
          <p className="mb-2 text-sm text-gray-600">WhatsApp: +1 (647) 514-0926</p>
          <p className="mb-2 text-sm text-gray-600">korey@alohaandco.com</p>
          <p className="mb-2 text-sm text-gray-600">@alohaandco.hi</p>
        </div>
      </section>
    </div>
  );
}
