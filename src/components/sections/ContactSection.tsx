import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { portfolio as p } from '../../data/portfolio';
import { SectionHeader } from '../common/SectionHeader';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

  const links = [
    { name: 'GitHub', handle: '@Nykt04', url: p.contact.github, Icon: Github },
    { name: 'LinkedIn', handle: 'gian-karlo-reguindin', url: p.contact.linkedin, Icon: Linkedin },
  ];

  return (
    <section
      id="contact"
      className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="contact-title"
    >
      <SectionHeader
        index="06"
        title="Contact & Channels"
        titleId="contact-title"
        meta="direct communication"
      />

      <div className="border-t border-[rgb(var(--g200))] pt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))]">
              CHANNEL // OPEN FOR OPPORTUNITIES
            </span>
            <p className="mt-2 font-pixel text-2xl font-bold text-[rgb(var(--ink))]">Let’s talk.</p>
            <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
              Reach out via email, GitHub, or LinkedIn for internships, project collaborations, or UI questions.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {p.contact.email ? (
                <>
                  <a href={`mailto:${p.contact.email}`} className="bryl-btn-primary">
                    <Mail size={14} aria-hidden="true" />
                    <span>{p.contact.email}</span>
                  </a>
                  <button type="button" onClick={copyEmail} className="bryl-btn-secondary">
                    {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    <span>{copied ? 'Copied' : 'Copy email'}</span>
                  </button>
                  <span className="sr-only" role="status" aria-live="polite">
                    {copied
                      ? 'Email address copied to clipboard.'
                      : copyError
                        ? 'Copy failed. Please use the email link directly.'
                        : ''}
                  </span>
                </>
              ) : (
                <div className="border-l-2 border-[rgb(var(--g300))] pl-3 font-mono text-[12px] text-[rgb(var(--g500))]">
                  [Email Placeholder: Add in src/data/portfolio.ts]
                </div>
              )}
            </div>
          </div>

          <div className="divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] lg:col-span-5 lg:border-y-0 lg:border-l lg:pl-10">
            {links.map(({ name, handle, url, Icon }) =>
              url ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} (${handle}, opens in a new tab)`}
                  className="group flex items-center justify-between gap-3 py-5 transition-colors hover:text-[rgb(var(--accent))]"
                >
                  <span className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[rgb(var(--ink))]">
                    <Icon size={16} strokeWidth={1.7} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                    <span>{name}</span>
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
                  key={name}
                  className="flex items-center justify-between gap-3 py-5 font-mono text-[12px] text-[rgb(var(--g400))]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={15} aria-hidden="true" />
                    <span>{name}</span>
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
