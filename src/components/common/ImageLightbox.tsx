import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { trapTabKey } from '../../utils/focusTrap';

export interface LightboxImage {
  src: string;
  alt: string;
  title: string;
}

interface ImageLightboxProps extends LightboxImage {
  onClose: () => void;
  closeLabel?: string;
  dialogLabel?: string;
  backdropClassName?: string;
  imgMaxHeightClass?: string;
}

export function ImageLightbox({
  src,
  alt,
  title,
  onClose,
  closeLabel = 'Close enlarged image',
  dialogLabel,
  backdropClassName = 'bg-black/80',
  imgMaxHeightClass = 'max-h-[78vh]',
}: ImageLightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    requestAnimationFrame(() => closeBtnRef.current?.focus({ preventScroll: true }));

    // Capture phase stops Escape/Tab from leaking to an underlying dialog (e.g. CertificationModal)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        e.preventDefault();
        onCloseRef.current();
      } else if (e.key === 'Tab') {
        e.stopImmediatePropagation();
        trapTabKey(e, panelRef.current);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel || title}
      onClick={onClose}
      className={`fixed inset-0 z-[130] flex items-center justify-center ${backdropClassName} p-4 backdrop-blur-xs`}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-auto border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] p-3 shadow-2xl sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-2.5">
          <p className="font-mono text-xs font-medium text-[rgb(var(--ink))]">{title}</p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex h-8 w-8 items-center justify-center border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--ink))] hover:text-[rgb(var(--accent))]"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <img
          src={src}
          alt={alt}
          className={`mx-auto block ${imgMaxHeightClass} w-auto max-w-full object-contain`}
        />
      </div>
    </div>
  );
}
