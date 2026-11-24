import { useRef, useState } from 'react';
import { Award, CheckCircle2, Eye } from 'lucide-react';
import { portfolio as p, type PortfolioCertification } from '../../data/portfolio';
import { SectionHeader } from '../common/SectionHeader';
import { CertificationModal } from './CertificationModal';

export default function CertificationsSection() {
  const certifications: PortfolioCertification[] = p.certifications || [];
  const [activeCert, setActiveCert] = useState<PortfolioCertification | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  if (!certifications.length) return null;

  const openModal = (cert: PortfolioCertification, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setActiveCert(cert);
  };

  const closeModal = () => {
    setActiveCert(null);
    lastTriggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <section
      id="certifications"
      className="border-t border-[rgb(var(--g200))] pt-11 pb-8 sm:pt-12 sm:pb-9"
      aria-labelledby="certifications-title"
    >
      <SectionHeader
        index="04"
        title="Certifications"
        titleId="certifications-title"
        meta={`${certifications.length} verified`}
        className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-8"
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <article
            key={cert.id}
            className="group flex items-start justify-between gap-3 border-t border-[rgb(var(--g200))] py-5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center text-[rgb(var(--ink))]" aria-hidden="true">
                  <Award size={15} strokeWidth={1.75} />
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10.5px] font-semibold text-[rgb(var(--accent))]">
                  <CheckCircle2 size={12} aria-hidden="true" />
                  <span>Verified</span>
                </span>
                <span className="font-mono text-[10.5px] text-[rgb(var(--g400))]" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono text-[10.5px] text-[rgb(var(--g500))]">
                  {cert.date.split('·')[0].trim()}
                </span>
              </div>

              <h3 className="mt-3 font-display-ui text-[15px] font-bold leading-snug text-[rgb(var(--ink))]">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => openModal(cert, e.currentTarget)}
                  className="text-left transition-colors hover:text-[rgb(var(--accent))]"
                >
                  {cert.title}
                </button>
              </h3>

              <p className="mt-1.5 font-mono text-xs leading-relaxed text-[rgb(var(--g500))]">
                {cert.issuer}
              </p>
            </div>

            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`View credential details for ${cert.title}`}
              title="View credential details"
              onClick={(e) => openModal(cert, e.currentTarget)}
              className="-mr-2.5 -mt-2.5 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center text-[rgb(var(--g500))] transition-colors hover:text-[rgb(var(--accent))]"
            >
              <Eye size={16} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      {activeCert && <CertificationModal cert={activeCert} onClose={closeModal} />}
    </section>
  );
}
