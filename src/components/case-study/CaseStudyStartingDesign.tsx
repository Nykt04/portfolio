import { ExternalLink } from 'lucide-react';
import type { CaseStudyDetail } from '../../types/portfolio';
import type { LightboxImage } from '../common/ImageLightbox';
import { SectionHeader } from '../common/SectionHeader';
import { ZoomableImage } from '../common/ZoomableImage';

interface CaseStudyStartingDesignProps {
  projectName: string;
  startingDesign: CaseStudyDetail['startingDesign'];
  onZoom: (image: LightboxImage, trigger: HTMLElement) => void;
}

export function CaseStudyStartingDesign({
  projectName,
  startingDesign,
  onZoom,
}: CaseStudyStartingDesignProps) {
  return (
    <section id="case-study-starting" className="scroll-mt-24 py-9 sm:py-10">
      <SectionHeader
        index="03"
        title="Starting the Design"
        compact
        className="mb-6 flex items-baseline gap-2.5"
        headingClassName="font-pixel text-lg font-bold text-[rgb(var(--ink))]"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
            Early Layout Exploration
          </h3>
          <p className="case-prose mt-2.5">{startingDesign.paperWireframesNote}</p>
        </div>
        <div className="flex flex-col justify-between border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Low-Fidelity Prototype &amp; User Flow
            </h3>
            <p className="case-prose mt-2.5">{startingDesign.lofiPrototype.description}</p>
          </div>
          {startingDesign.lofiPrototype.url && (
            <div className="mt-5">
              <a
                href={startingDesign.lofiPrototype.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bryl-btn-secondary"
              >
                <span>Open Figma Lo-Fi Prototype</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>

      {startingDesign.lofiPrototype.image && (
        <div className="mt-6 overflow-hidden border border-[rgb(var(--g200))] bg-[rgb(var(--surface))]">
          <ZoomableImage
            src={startingDesign.lofiPrototype.image}
            alt={startingDesign.lofiPrototype.alt || `${projectName} low-fidelity prototype user flow`}
            title={`${projectName} Low-Fidelity Prototype & User Flow`}
            imgClassName="block h-auto w-full"
            onZoom={onZoom}
          />
        </div>
      )}

      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
          Usability Study: Findings
        </h3>
        <p className="case-prose mt-2.5 max-w-prose">{startingDesign.usabilityStudy.intro}</p>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
            <h4 className="font-mono text-[11.5px] font-semibold uppercase text-[rgb(var(--ink))]">
              Round 1 Findings
            </h4>
            <ol className="mt-3 list-decimal space-y-2 pl-4 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
              {startingDesign.usabilityStudy.round1.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
            <h4 className="font-mono text-[11.5px] font-semibold uppercase text-[rgb(var(--ink))]">
              Round 2 Findings
            </h4>
            <ol className="mt-3 list-decimal space-y-2 pl-4 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
              {startingDesign.usabilityStudy.round2.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
