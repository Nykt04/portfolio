import { useEffect, useRef, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import type { PortfolioCertification } from '../../types/portfolio';
import { trapTabKey } from '../../utils/focusTrap';
import { ImageLightbox } from '../common/ImageLightbox';
import { ZoomableImage } from '../common/ZoomableImage';

interface CertificationModalProps {
  cert: PortfolioCertification;
  onClose: () => void;
}

export function CertificationModal({ cert, onClose }: CertificationModalProps) {
  const [imgEnlarged, setImgEnlarged] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const enlargeTriggerRef = useRef<HTMLElement | null>(null);
  const imgEnlargedRef = useRef(false);
  imgEnlargedRef.current = imgEnlarged;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setImgEnlarged(false);
    setImgFailed(false);
  }, [cert]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (imgEnlargedRef.current) return;
      if (e.key === 'Escape') {
        onCloseRef.current();
      } else if (e.key === 'Tab') {
        trapTabKey(e, modalRef.current);
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
  }, [cert]);

  const closeEnlarged = () => {
    setImgEnlarged(false);
    requestAnimationFrame(() => enlargeTriggerRef.current?.focus({ preventScroll: true }));
  };

  return (
    <>
      <div
        className="bryl-modal-backdrop"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
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
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 text-[rgb(var(--g400))] hover:bg-[rgb(var(--g100))] hover:text-[rgb(var(--ink))]"
            aria-label="Close credential details"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
              Official Credential Record
            </span>
            <span className="font-mono text-xs text-[rgb(var(--g400))]" aria-hidden="true">
              ·
            </span>
            <span className="font-mono text-xs text-[rgb(var(--g500))]">{cert.date}</span>
          </div>

          <h3 id="cert-dialog-title" className="mt-3 font-display-ui text-xl font-bold text-[rgb(var(--ink))]">
            {cert.title}
          </h3>

          <p className="mt-1 font-mono text-xs font-medium text-[rgb(var(--accent))]">
            Issued by {cert.issuer}
          </p>

          {cert.credentialId && (
            <p className="mt-2 font-mono text-xs text-[rgb(var(--g500))]">
              <strong>ID:</strong> {cert.credentialId}
            </p>
          )}

          {cert.image && !imgFailed && (
            <div className="mt-4 overflow-hidden border border-[rgb(var(--g200))] bg-[rgb(var(--bg))]">
              <ZoomableImage
                src={cert.image}
                alt={`${cert.title} certificate issued by ${cert.issuer}`}
                title={cert.title}
                ariaLabel={`Enlarge ${cert.title} certificate`}
                imgClassName="block max-h-72 w-full object-contain"
                onError={() => setImgFailed(true)}
                onZoom={(_img, trigger) => {
                  enlargeTriggerRef.current = trigger;
                  setImgEnlarged(true);
                }}
              />
            </div>
          )}

          <p className="mt-4 text-xs leading-relaxed text-[rgb(var(--g600))]">{cert.description}</p>

          <div className="mt-4">
            <span className="block font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
              Competencies Validated
            </span>
            <p className="mt-1.5 font-mono text-[11px] text-[rgb(var(--g600))]">
              {cert.skills.join(' · ')}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-4">
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bryl-btn-primary"
              >
                <span>Verify at {cert.issuer.split(' ')[0]}</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ) : (
              <span className="font-mono text-xs text-[rgb(var(--g400))]">Verified Institutional Record</span>
            )}

            <button type="button" onClick={onClose} className="bryl-btn-secondary">
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>

      {imgEnlarged && cert.image && !imgFailed && (
        <ImageLightbox
          src={cert.image}
          alt={`${cert.title} certificate issued by ${cert.issuer}`}
          title={cert.title}
          dialogLabel={`Enlarged ${cert.title} certificate`}
          closeLabel="Close enlarged certificate"
          backdropClassName="bg-black/85"
          imgMaxHeightClass="max-h-[80vh]"
          onClose={closeEnlarged}
        />
      )}
    </>
  );
}
