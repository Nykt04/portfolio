import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle2, ExternalLink, Eye, X, ZoomIn } from 'lucide-react';
import { portfolio as p, type PortfolioCertification } from './portfolio';

export default function CertificationsSection() {
  const certifications: PortfolioCertification[] = p.certifications || [];
  const [activeCert, setActiveCert] = useState<PortfolioCertification | null>(null);
  const [imgZoomed, setImgZoomed] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!activeCert) return;
    setImgZoomed(false);
    setImgFailed(false);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (imgZoomed) setImgZoomed(false);
        else closeModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeCert, imgZoomed]);

  if (!certifications.length) return null;

  const closeModal = () => {
    setActiveCert(null);
    lastTriggerRef.current?.focus();
  };

  return (
    <section
      id="certifications"
      className="py-20 border-t border-[rgb(var(--g200))]"
      aria-labelledby="certifications-title"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="section-index-badge">04</span>
            <h2 id="certifications-title" className="section-index-title">
              Certifications &amp; Verified Credentials
            </h2>
          </div>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
            Professional certifications and coursework accredited in visual design, programming, and cybersecurity fundamentals.
          </p>
        </div>
        <span className="micro-label">{certifications.length} verified credentials</span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => {
          const openModal = (el: HTMLElement) => {
            lastTriggerRef.current = el;
            setActiveCert(cert);
          };

          return (
            <article
              key={cert.id}
              className="group flex flex-col justify-between rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 shadow-xs transition-all duration-200 hover:border-[rgb(var(--accent)/0.5)] hover:shadow-sm"
            >
              {/* Header Row with View Credential Icon Alongside */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] text-[rgb(var(--ink))]"
                      aria-hidden="true"
                    >
                      <Award size={14} strokeWidth={1.75} />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.1)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[rgb(var(--accent))]">
                      <CheckCircle2 size={11} aria-hidden="true" />
                      <span>Verified</span>
                    </span>
                    <span className="font-mono text-[10.5px] text-[rgb(var(--g500))]">
                      {cert.date.split('·')[0].trim()}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display-ui text-[15px] font-bold leading-snug text-[rgb(var(--ink))]">
                    {cert.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs leading-relaxed text-[rgb(var(--g500))]">
                    {cert.issuer}
                  </p>
                </div>

                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`View credential details for ${cert.title}`}
                  title="View credential details"
                  onClick={(e) => openModal(e.currentTarget)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] text-[rgb(var(--ink))] transition-colors hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-fg))]"
                >
                  <Eye size={16} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                {cert.skills.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] px-2 py-0.5 font-mono text-[10px] text-[rgb(var(--g600))]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
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
              className="absolute right-4 top-4 rounded-md p-1.5 text-[rgb(var(--g400))] hover:bg-[rgb(var(--g100))] hover:text-[rgb(var(--ink))]"
              aria-label="Close credential details"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[rgb(var(--accent)/0.15)] px-3 py-0.5 font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">
                Official Credential Record
              </span>
              <span className="font-mono text-xs text-[rgb(var(--g500))]">{activeCert.date}</span>
            </div>

            <h3 id="cert-dialog-title" className="mt-3 font-display-ui text-xl font-bold text-[rgb(var(--ink))]">
              {activeCert.title}
            </h3>

            <p className="mt-1 font-mono text-xs text-[rgb(var(--accent))] font-medium">
              Issued by {activeCert.issuer}
            </p>

            {activeCert.credentialId && (
              <p className="mt-2 font-mono text-xs text-[rgb(var(--g500))] bg-[rgb(var(--bg))] px-2.5 py-1.5 rounded border border-[rgb(var(--g200))]">
                <strong>ID:</strong> {activeCert.credentialId}
              </p>
            )}

            {/* Certificate Image Preview */}
            {activeCert.image && !imgFailed && (
              <div className="mt-4 overflow-hidden rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--bg))]">
                <div className="relative">
                  <img
                    src={activeCert.image}
                    alt={`${activeCert.title} certificate issued by ${activeCert.issuer}`}
                    className={`block w-full object-contain transition-transform duration-300 ${
                      imgZoomed ? 'scale-150 cursor-zoom-out' : 'max-h-72 cursor-zoom-in'
                    }`}
                    onClick={() => setImgZoomed((z) => !z)}
                    onError={() => setImgFailed(true)}
                  />
                  <button
                    type="button"
                    onClick={() => setImgZoomed((z) => !z)}
                    aria-label={imgZoomed ? 'Zoom out certificate image' : 'Zoom in certificate image'}
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded bg-[rgb(var(--surface)/0.9)] px-2 py-1 font-mono text-[10.5px] text-[rgb(var(--ink))] shadow-sm backdrop-blur-xs hover:bg-[rgb(var(--surface))]"
                  >
                    <ZoomIn size={12} aria-hidden="true" />
                    <span>{imgZoomed ? '100%' : 'Zoom'}</span>
                  </button>
                </div>
              </div>
            )}

            <p className="mt-4 text-xs leading-relaxed text-[rgb(var(--g600))]">
              {activeCert.description}
            </p>

            <div className="mt-4">
              <span className="block font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
                Competencies Validated
              </span>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {activeCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] px-2 py-0.5 font-mono text-[10px] text-[rgb(var(--g600))]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-4">
              {activeCert.credentialUrl ? (
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bryl-btn-primary"
                >
                  <span>Verify at {activeCert.issuer.split(' ')[0]}</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              ) : (
                <span className="font-mono text-xs text-[rgb(var(--g400))]">Verified Institutional Record</span>
              )}

              <button
                type="button"
                onClick={closeModal}
                className="bryl-btn-secondary"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
