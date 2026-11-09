import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award, CheckCircle2, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { portfolio as p, type PortfolioCertification } from './portfolio';

export default function CertificationsSection() {
  const certifications: PortfolioCertification[] = p.certifications || [];
  const [activeCert, setActiveCert] = useState<PortfolioCertification | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
        lastTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeCert]);

  if (!certifications.length) return null;

  const closeModal = () => {
    setActiveCert(null);
    lastTriggerRef.current?.focus();
  };

  return (
    <section
      id="certifications"
      className="py-16 border-t border-[rgb(var(--g200))]"
      aria-labelledby="certifications-title"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="certifications-title" className="section-index-title">
            <span className="section-index-badge">04</span>
            <span>Certifications &amp; Credentials</span>
          </h2>
          <p className="mt-2 text-[14px] text-[rgb(var(--g500))]">
            Verified credentials and coursework across cybersecurity, programming, and web development.
          </p>
        </div>
        <span className="micro-label">{certifications.length} verified credentials</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <button
            type="button"
            key={cert.id}
            aria-haspopup="dialog"
            onClick={(e) => {
              lastTriggerRef.current = e.currentTarget;
              setActiveCert(cert);
            }}
            className="gk-blueprint-card group flex flex-col justify-between p-5 text-left"
          >
            <span className="gk-corner-tick tl" aria-hidden="true" />
            <span className="gk-corner-tick br" aria-hidden="true" />

            <div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]"
                  aria-hidden="true"
                >
                  <Award size={17} strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[10px] text-[rgb(var(--g400))]">
                  CERT // 0{index + 1}
                </span>
              </div>

              <h3 className="mt-4 font-display-ui text-[15px] leading-snug text-[rgb(var(--ink))] group-hover:text-[rgb(var(--accent))] transition-colors">
                {cert.title}
              </h3>

              <p className="mt-1 font-mono text-[10.5px] text-[rgb(var(--g500))] line-clamp-1">
                {cert.issuer}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {cert.skills.slice(0, 3).map((s) => (
                  <span key={s} className="bryl-tag-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[rgb(var(--g200))] pt-3 font-mono text-[11px] text-[rgb(var(--accent))]">
              <span>Inspect certificate</span>
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Accessible Certificate Modal */}
      {activeCert && (
        <div
          className="bryl-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="presentation"
        >
          <div
            className="bryl-modal-panel max-w-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-dialog-title"
            ref={modalRef}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close certificate details"
              className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-[rgb(var(--g400))] hover:bg-[rgb(var(--g100))] hover:text-[rgb(var(--ink))]"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <span className="bryl-chip-inverted">Credential Record</span>
            <h3 id="cert-dialog-title" className="mt-3 font-display-ui text-xl leading-snug text-[rgb(var(--ink))]">
              {activeCert.title}
            </h3>
            <p className="mt-1 font-mono text-[12px] text-[rgb(var(--g500))]">{activeCert.issuer}</p>

            {/* High-Resolution Certificate Document View */}
            {activeCert.image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--g50))]">
                <img
                  src={activeCert.image}
                  alt={`${activeCert.title} Certificate for Gian Karlo Reguindin`}
                  className="block h-auto w-full object-contain"
                />
              </div>
            )}

            <p className="mt-4 text-[14px] leading-relaxed text-[rgb(var(--g600))]">{activeCert.description}</p>

            <div className="mt-5 grid grid-cols-2 divide-x divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] py-3 font-mono text-[11px]">
              <div className="pr-3">
                <span className="block text-[9.5px] uppercase tracking-wider text-[rgb(var(--g400))]">Date</span>
                <strong className="mt-1 block text-[rgb(var(--ink))]">{activeCert.date}</strong>
              </div>
              <div className="pl-3">
                <span className="block text-[9.5px] uppercase tracking-wider text-[rgb(var(--g400))]">Status</span>
                <strong className="mt-1 inline-flex items-center gap-1 text-[rgb(var(--accent))]">
                  <CheckCircle2 size={12} aria-hidden="true" />
                  <span>Verified Credential</span>
                </strong>
              </div>
            </div>

            {activeCert.credentialId && (
              <div className="mt-3.5 flex items-center gap-2 rounded-lg border border-[rgb(var(--g200))] bg-[rgb(var(--g50))] px-3 py-2 font-mono text-[11px]">
                <ShieldCheck size={14} className="text-[rgb(var(--accent))]" aria-hidden="true" />
                <span className="text-[rgb(var(--g400))]">Credential ID:</span>
                <span className="text-[rgb(var(--ink))] font-medium break-all">{activeCert.credentialId}</span>
              </div>
            )}

            {activeCert.skills && activeCert.skills.length > 0 && (
              <div className="mt-4">
                <span className="micro-label block mb-2">Associated Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCert.skills.map((skill) => (
                    <span key={skill} className="bryl-tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-4">
              {activeCert.credentialUrl ? (
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bryl-btn-primary"
                >
                  <span>Verify Credential</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              ) : (
                <div />
              )}
              <button type="button" onClick={closeModal} className="bryl-btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
