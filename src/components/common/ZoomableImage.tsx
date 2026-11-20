import { Maximize2 } from 'lucide-react';
import type { LightboxImage } from './ImageLightbox';

interface ZoomableImageProps extends LightboxImage {
  imgClassName: string;
  onZoom: (image: LightboxImage, trigger: HTMLElement) => void;
  onError?: () => void;
  ariaLabel?: string;
}

export function ZoomableImage({
  src,
  alt,
  title,
  imgClassName,
  onZoom,
  onError,
  ariaLabel,
}: ZoomableImageProps) {
  return (
    <button
      type="button"
      onClick={(e) => onZoom({ src, alt, title }, e.currentTarget)}
      aria-label={ariaLabel || `Enlarge ${title}`}
      className="group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]"
    >
      <img src={src} alt={alt} loading="lazy" onError={onError} className={imgClassName} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 border border-[rgb(var(--g200))] bg-[rgb(var(--bg)/0.92)] px-2 py-1 font-mono text-[10.5px] text-[rgb(var(--ink))] shadow-sm backdrop-blur-xs transition-colors group-hover:border-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent))]"
      >
        <Maximize2 size={12} />
        <span>Enlarge</span>
      </span>
    </button>
  );
}
