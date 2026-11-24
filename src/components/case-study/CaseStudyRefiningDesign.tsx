import type { CaseStudyDetail } from '../../types/portfolio';
import type { LightboxImage } from '../common/ImageLightbox';
import { SectionHeader } from '../common/SectionHeader';
import { ZoomableImage } from '../common/ZoomableImage';

interface CaseStudyRefiningDesignProps {
  refiningDesign: CaseStudyDetail['refiningDesign'];
  onZoom: (image: LightboxImage, trigger: HTMLElement) => void;
}

function LegacyWireframeFallback({ variant, title }: { variant: 'nav' | 'hero'; title: string }) {
  return (
    <div
      className="my-2 flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border border-[rgb(var(--g300))] bg-white p-3 text-left font-sans text-neutral-800"
      role="img"
      aria-label={`Early UI draft for ${title}`}
    >
      {variant === 'nav' ? (
        <>
          <div className="flex items-center justify-between border-b border-neutral-300 pb-1.5">
            <span className="text-[11px] font-bold text-neutral-700">CRHS Portal</span>
            <span className="inline-flex h-5 w-5 items-center justify-center border border-neutral-400 text-[11px] text-neutral-700">
              ≡
            </span>
          </div>
          <div className="my-auto grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-neutral-600 underline">
            <span>Home</span>
            <span>SSLG &amp; Clubs</span>
            <span>About</span>
            <span>News</span>
            <span>Faculty</span>
            <span>Calendar</span>
            <span>Academics</span>
            <span>Gallery</span>
            <span>Admissions</span>
            <span>Contact</span>
          </div>
          <span className="border-t border-neutral-200 pt-1 text-[9.5px] text-neutral-500">
            Unlabeled icon + flat ungrouped links (no Enroll CTA)
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between border-b border-neutral-300 pb-1.5 text-[10px] text-neutral-600">
            <span className="font-bold text-neutral-800">CRHS</span>
            <span>Home · Academics · Admissions · Contact</span>
          </div>
          <div className="my-auto space-y-1.5">
            <p className="text-[13px] font-bold leading-tight text-neutral-900">
              Castillejos Resettlement High School
            </p>
            <p className="text-[10px] leading-snug text-neutral-600">
              Official school information, enrollment steps, and announcements for students and parents.
            </p>
            <div className="flex gap-2 pt-1 text-[10px]">
              <span className="border border-neutral-400 bg-neutral-100 px-2 py-0.5 text-neutral-800">
                Admissions Info
              </span>
              <span className="px-1 py-0.5 text-neutral-600 underline">View Academics</span>
            </div>
          </div>
          <span className="border-t border-neutral-200 pt-1 text-[9.5px] text-neutral-500">
            Plain draft without school crest, colors, or campus photo
          </span>
        </>
      )}
    </div>
  );
}

export function CaseStudyRefiningDesign({
  refiningDesign,
  onZoom,
}: CaseStudyRefiningDesignProps) {
  return (
    <section id="case-study-refining" className="scroll-mt-24 py-9 sm:py-10">
      <SectionHeader
        index="04"
        title="UI Refinement & Accessibility"
        compact
        className="mb-6 flex items-baseline gap-2.5"
        headingClassName="font-pixel text-lg font-bold text-[rgb(var(--ink))]"
      />

      <div className="space-y-6">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
          Before &amp; After Usability Study
        </h3>
        {refiningDesign.mockupsBeforeAfter.map((comp) => (
          <div key={comp.title} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
            <h4 className="text-[15px] font-semibold text-[rgb(var(--ink))]">{comp.title}</h4>
            <p className="mt-1.5 max-w-prose text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">{comp.notes}</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] p-3 font-mono text-[11.5px] text-[rgb(var(--g500))]">
                <span className="block font-semibold text-[rgb(var(--ink))]">Before</span>
                {comp.beforeImage && (
                  <div className="my-2 border border-[rgb(var(--g200))]">
                    <ZoomableImage
                      src={comp.beforeImage}
                      alt={comp.beforeAlt || `${comp.title} before usability study`}
                      title={`${comp.title} (Before)`}
                      imgClassName="block aspect-[16/10] w-full object-cover object-top"
                      onZoom={onZoom}
                    />
                  </div>
                )}
                {!comp.beforeImage && comp.beforeWireframe && (
                  <LegacyWireframeFallback variant={comp.beforeWireframe} title={comp.title} />
                )}
                <p className="mt-1">{comp.before}</p>
              </div>
              <div
                className={`border ${
                  comp.afterImage ? 'border-[rgb(var(--accent)/0.5)]' : 'border-dashed border-[rgb(var(--accent)/0.5)]'
                } bg-[rgb(var(--bg))] p-3 font-mono text-[11.5px] text-[rgb(var(--g500))]`}
              >
                <span className="block font-semibold text-[rgb(var(--accent))]">After</span>
                {comp.afterImage && (
                  <div className="my-2 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))]">
                    <ZoomableImage
                      src={comp.afterImage}
                      alt={comp.afterAlt || `${comp.title} after usability study`}
                      title={`${comp.title} (After)`}
                      imgClassName="block aspect-[16/10] w-full object-contain"
                      onZoom={onZoom}
                    />
                  </div>
                )}
                <p className="mt-1">{comp.after}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
          Main Screens
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {refiningDesign.mainMockups.map((screen, i) => {
            const item = typeof screen === 'string' ? { title: screen } : screen;
            return (
              <figure
                key={item.title}
                className={`overflow-hidden border ${
                  item.image ? 'border-[rgb(var(--g200))]' : 'border-dashed border-[rgb(var(--g300))]'
                } bg-[rgb(var(--surface))]`}
              >
                {item.image && (
                  <div className="border-b border-[rgb(var(--g200))]">
                    <ZoomableImage
                      src={item.image}
                      alt={item.alt || item.title}
                      title={item.title}
                      imgClassName="block aspect-[16/10] w-full object-cover object-top"
                      onZoom={onZoom}
                    />
                  </div>
                )}
                <figcaption className="p-4">
                  <span className="font-mono text-[10.5px] text-[rgb(var(--accent))]">0{i + 1}</span>
                  <p className="mt-1 text-[13.5px] font-medium text-[rgb(var(--ink))]">{item.title}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
          Accessibility Decisions
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {refiningDesign.accessibilityConsiderations.map((item, i) => (
            <div key={i} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
              <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">0{i + 1}</span>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
