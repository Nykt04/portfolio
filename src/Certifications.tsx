import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle2, ExternalLink, Eye, Maximize2, X } from 'lucide-react';
import { portfolio as p, type PortfolioCertification } from './portfolio';

export default function CertificationsSection() {
  const certifications: PortfolioCertification[] = p.certifications || [];
  const [activeCert, setActiveCert] = useState<PortfolioCertification | null>(null);
  const [imgEnlarged, setImgEnlarged] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const enlargeTriggerRef = useRef<HTMLElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const imgEnlargedRef = useRef(false);
  imgEnlargedRef.current = imgEnlarged;

  useEffect(() => {
    setImgEnlarged(false);
    setImgFailed(false);
  }, [activeCert]);

  useEffect(() => {
    if (imgEnlarged) {
      requestAnimationFrame(() => lightboxCloseRef.current?.focus({ preventScroll: true }));
    }
  }, [imgEnlarged]);

  useEffect(() => {
    if (!activeCert) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (imgEnlargedRef.current) {
          setImgEnlarged(false);
          requestAnimationFrame(() => enlargeTriggerRef.current?.focus({ preventScroll: true }));
        } else {
          closeModal();
        }
        return;
      }
      const trapContainer = imgEnlargedRef.current ? lightboxRef.current : modalRef.current;
      if (e.key === 'Tab' && trapContainer) {
        const focusables = Array.from(
          trapContainer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflowY = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = 'hidden';
    modalRef.current?.querySelector<HTMLElement>('button, a')?.focus({ preventScroll: true });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflowY = prevOverflowY;
    };
  }, [activeCert]);

  if (!certifications.length) return null;

  const closeModal = () => {
    setImgEnlarged(false);
    setActiveCert(null);
    lastTriggerRef.current?.focus({ preventScroll: true });
  };

  const openEnlarged = (trigger: HTMLElement) => {
    enlargeTriggerRef.current = trigger;
    setImgEnlarged(true);
  };

  const closeEnlarged = () => {
    setImgEnlarged(false);
    requestAnimationFrame(() => enlargeTriggerRef.current?.focus({ preventScroll: true }));
  };

  return (
    <section
      id="certifications"
      className="pt-7 pb-10 border-t border-[rgb(var(--g200))]"
      aria-labelledby="certifications-title"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="section-index-badge">04</span>
            <h2 id="certifications-title" className="section-index-title">
              Certifications &amp; Verified Credentials
            </h2>
          </div>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
            Verified credentials in UI/UX design, Python, frontend development, and cybersecurity.
          </p>
        </div>
        <span className="micro-label">{certifications.length} verified credentials</span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => {
          const openModal = (el: HTMLElement) => {
            lastTriggerRef.current = el;
            setActiveCert(cert);
          };

          return (
            <article
              key={cert.id}
              className="group flex flex-col justify-between border-t border-[rgb(var(--g200))] py-5"
            >
              {/* Header Row with View Credential Icon Alongside */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center text-[rgb(var(--ink))]" aria-hidden="true">
                      <Award size={15} strokeWidth={1.75} />
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10.5px] font-semibold text-[rgb(var(--accent))]">
                      <CheckCircle2 size={12} aria-hidden="true" />
                      <span>Verified</span>
                    </span>
                    <span className="font-mono text-[10.5px] text-[rgb(var(--g400))]" aria-hidden="true">·</span>
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
                  className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-[rgb(var(--g500))] transition-colors hover:text-[rgb(var(--accent))]"
                >
                  <Eye size={16} aria-hidden="true" />
                </button>
              </div>

              <p className="mt-4 pt-1 font-mono text-[10.5px] text-[rgb(var(--g500))]">
                {cert.skills.slice(0, 3).join(' · ')}
              </p>
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
              className="absolute right-4 top-4 p-1.5 text-[rgb(var(--g400))] hover:bg-[rgb(var(--g100))] hover:text-[rgb(var(--ink))]"
              aria-label="Close credential details"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                Official Credential Record
              </span>
              <span className="font-mono text-xs text-[rgb(var(--g400))]" aria-hidden="true">·</span>
              <span className="font-mono text-xs text-[rgb(var(--g500))]">{activeCert.date}</span>
            </div>

            <h3 id="cert-dialog-title" className="mt-3 font-display-ui text-xl font-bold text-[rgb(var(--ink))]">
              {activeCert.title}
            </h3>

            <p className="mt-1 font-mono text-xs text-[rgb(var(--accent))] font-medium">
              Issued by {activeCert.issuer}
            </p>

            {activeCert.credentialId && (
              <p className="mt-2 font-mono text-xs text-[rgb(var(--g500))]">
                <strong>ID:</strong> {activeCert.credentialId}
              </p>
            )}

            {/* Certificate Image Preview */}
            {activeCert.image && !imgFailed && (
              <div className="mt-4 overflow-hidden border border-[rgb(var(--g200))] bg-[rgb(var(--bg))]">
                <button
                  type="button"
                  onClick={(e) => openEnlarged(e.currentTarget)}
                  aria-label={`Enlarge ${activeCert.title} certificate`}
                  className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]"
                >
                  <img
                    src={activeCert.image}
                    alt={`${activeCert.title} certificate issued by ${activeCert.issuer}`}
                    className="block max-h-72 w-full object-contain"
                    onError={() => setImgFailed(true)}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 border border-[rgb(var(--g200))] bg-[rgb(var(--bg)/0.92)] px-2 py-1 font-mono text-[10.5px] text-[rgb(var(--ink))] shadow-sm backdrop-blur-xs transition-colors group-hover:border-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent))]"
                  >
                    <Maximize2 size={12} />
                    <span>Enlarge</span>
                  </span>
                </button>
              </div>
            )}

            <p className="mt-4 text-xs leading-relaxed text-[rgb(var(--g600))]">
              {activeCert.description}
            </p>

            <div className="mt-4">
              <span className="block font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
                Competencies Validated
              </span>
              <p className="mt-1.5 font-mono text-[11px] text-[rgb(var(--g600))]">
                {activeCert.skills.join(' · ')}
              </p>
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

      {/* Enlarged Certificate Lightbox */}
      {activeCert && imgEnlarged && activeCert.image && !imgFailed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${activeCert.title} certificate`}
          onClick={closeEnlarged}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
        >
          <div
            ref={lightboxRef}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-auto border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] p-3 shadow-2xl sm:p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-2.5">
              <p className="font-mono text-xs font-medium text-[rgb(var(--ink))]">{activeCert.title}</p>
              <button
                ref={lightboxCloseRef}
                type="button"
                onClick={closeEnlarged}
                aria-label="Close enlarged certificate"
                className="inline-flex h-8 w-8 items-center justify-center border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--ink))] hover:text-[rgb(var(--accent))]"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <img
              src={activeCert.image}
              alt={`${activeCert.title} certificate issued by ${activeCert.issuer}`}
              className="mx-auto block max-h-[80vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
