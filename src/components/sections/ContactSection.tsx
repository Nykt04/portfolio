import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { portfolio as p } from '../../data/portfolio';
import { SectionHeader } from '../common/SectionHeader';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorText, setErrorText] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(p.contact.email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };

  const resetFormFeedback = () => {
    if (status === 'error' || status === 'sent') {
      setStatus('idle');
      setErrorText('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Silently drop bot submissions caught by the hidden honeypot input.
    if (honey) return;

    const cleanName = name.trim();
    const cleanEmail = senderEmail.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !EMAIL_PATTERN.test(cleanEmail) || !cleanMessage) {
      setStatus('error');
      setErrorText('Please enter your name, a valid email, and a message.');
      if (!cleanName) nameRef.current?.focus();
      else if (!EMAIL_PATTERN.test(cleanEmail)) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    const endpoint =
      p.contact.formEndpoint ||
      `https://formsubmit.co/ajax/${encodeURIComponent(p.contact.email)}`;

    setStatus('sending');
    setErrorText('');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          _replyto: cleanEmail,
          _subject: `Portfolio message from ${cleanName}`,
          _template: 'table',
          message: cleanMessage,
          _honey: honey,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };

      if (res.ok && (data.success === true || data.success === 'true')) {
        setStatus('sent');
        setName('');
        setSenderEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorText(
          typeof data.message === 'string' && data.message
            ? data.message
            : 'Could not send right now.',
        );
      }
    } catch {
      setStatus('error');
      setErrorText('Could not reach the mail service right now.');
    }
  };

  const mailtoFallbackHref = (() => {
    if (!p.contact.email) return '';
    const subject = `Portfolio message from ${name.trim() || 'Visitor'}`;
    const bodyLines = [
      name.trim() ? `From: ${name.trim()}` : '',
      senderEmail.trim() ? `Email: ${senderEmail.trim()}` : '',
      message.trim() ? `\n${message.trim()}` : '',
    ].filter(Boolean);
    return `mailto:${p.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  })();

  const links = [
    { name: 'GitHub', handle: '@Nykt04', url: p.contact.github, Icon: Github },
    { name: 'LinkedIn', handle: 'gian-karlo-reguindin', url: p.contact.linkedin, Icon: Linkedin },
  ];

  const hasMailTarget = Boolean(p.contact.email || p.contact.formEndpoint);

  return (
    <section
      id="contact"
      className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="contact-title"
    >
      <SectionHeader
        index="06"
        title="Contact"
        titleId="contact-title"
        meta="direct channels"
      />

      <div className="border-t border-[rgb(var(--g200))] pt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-pixel text-2xl font-bold text-[rgb(var(--ink))]">Let’s talk.</p>
            <p className="mt-2 max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
              Send a message directly or reach out through my channels.
            </p>

            {hasMailTarget ? (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <input
                  type="text"
                  name="_honey"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="micro-label mb-1.5 block">
                      Name
                    </label>
                    <input
                      ref={nameRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        resetFormFeedback();
                      }}
                      placeholder="Your name"
                      className="w-full border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] px-3.5 py-2.5 text-[14px] text-[rgb(var(--ink))] placeholder:text-[rgb(var(--g400))] transition-colors focus:border-[rgb(var(--accent))]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="micro-label mb-1.5 block">
                      Your Email
                    </label>
                    <input
                      ref={emailRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={senderEmail}
                      onChange={(e) => {
                        setSenderEmail(e.target.value);
                        resetFormFeedback();
                      }}
                      placeholder="you@company.com"
                      className="w-full border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] px-3.5 py-2.5 text-[14px] text-[rgb(var(--ink))] placeholder:text-[rgb(var(--g400))] transition-colors focus:border-[rgb(var(--accent))]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="micro-label mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      resetFormFeedback();
                    }}
                    placeholder="Role, project, or question..."
                    className="w-full resize-y border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] px-3.5 py-2.5 text-[14px] text-[rgb(var(--ink))] placeholder:text-[rgb(var(--g400))] transition-colors focus:border-[rgb(var(--accent))]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bryl-btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send size={14} aria-hidden="true" />
                    <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  </button>
                </div>

                <div role="status" aria-live="polite">
                  {status === 'sent' && (
                    <div className="flex items-start gap-2.5 border border-[rgb(var(--accent)/0.45)] bg-[rgb(var(--surface))] px-4 py-3 text-[13px] text-[rgb(var(--ink))]">
                      <CheckCircle2
                        size={16}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-[rgb(var(--accent))]"
                      />
                      <span>Message sent! Your email has been delivered.</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex flex-col gap-2 border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--surface))] px-4 py-3 text-[13px] text-[rgb(var(--ink))]">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle
                          size={16}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-[rgb(var(--accent))]"
                        />
                        <span>{errorText}</span>
                      </div>
                      {(senderEmail.trim() || message.trim()) && mailtoFallbackHref && (
                        <a
                          href={mailtoFallbackHref}
                          className="inline-flex w-fit items-center font-mono text-[11.5px] font-medium text-[rgb(var(--accent))] hover:underline"
                        >
                          Send via email app instead →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </form>
            ) : (
              <div className="mt-6 border-l-2 border-[rgb(var(--g300))] pl-3 font-mono text-[12px] text-[rgb(var(--g500))]">
                [Email Placeholder: Add in src/data/portfolio.ts]
              </div>
            )}
          </div>

          <div className="divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] lg:col-span-5 lg:border-y-0 lg:border-l lg:pl-10">
            {p.contact.email ? (
              <div className="flex flex-wrap items-center justify-between gap-2 py-4">
                <a
                  href={`mailto:${p.contact.email}`}
                  className="inline-flex min-h-[44px] min-w-0 items-center gap-2.5 text-[13.5px] font-semibold text-[rgb(var(--ink))] transition-colors hover:text-[rgb(var(--accent))]"
                >
                  <Mail size={16} strokeWidth={1.7} aria-hidden="true" className="shrink-0 text-[rgb(var(--accent))]" />
                  <span className="truncate">{p.contact.email}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[44px] items-center gap-1.5 px-2 font-mono text-[11.5px] text-[rgb(var(--g500))] transition-colors hover:text-[rgb(var(--accent))]"
                >
                  {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied
                    ? 'Email address copied to clipboard.'
                    : copyError
                      ? 'Copy failed. Please use the email link directly.'
                      : ''}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 py-5 font-mono text-[12px] text-[rgb(var(--g400))]">
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} aria-hidden="true" />
                  <span>Email</span>
                </span>
                <span>[Placeholder: To be added]</span>
              </div>
            )}

            {links.map(({ name: linkName, handle, url, Icon }) =>
              url ? (
                <a
                  key={linkName}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${linkName} (${handle}, opens in a new tab)`}
                  className="group flex items-center justify-between gap-3 py-5 transition-colors hover:text-[rgb(var(--accent))]"
                >
                  <span className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[rgb(var(--ink))]">
                    <Icon size={16} strokeWidth={1.7} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                    <span>{linkName}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11.5px] text-[rgb(var(--g500))] group-hover:text-[rgb(var(--accent))]">
                    <span>{handle}</span>
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              ) : (
                <div
                  key={linkName}
                  className="flex items-center justify-between gap-3 py-5 font-mono text-[12px] text-[rgb(var(--g400))]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={15} aria-hidden="true" />
                    <span>{linkName}</span>
                  </span>
                  <span>[Placeholder: To be added]</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
