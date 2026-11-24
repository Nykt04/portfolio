import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import type { CaseStudyDetail, PortfolioProject } from '../../types/portfolio';
import { AccessNoticeLink } from '../common/AccessNoticeLink';
import { SectionHeader } from '../common/SectionHeader';

interface CaseStudyForwardProps {
  currentProject: PortfolioProject;
  nextProject?: PortfolioProject;
  goingForward: CaseStudyDetail['goingForward'];
}

export function CaseStudyForward({
  currentProject,
  nextProject,
  goingForward,
}: CaseStudyForwardProps) {
  return (
    <>
      <section id="case-study-forward" className="scroll-mt-24 py-9 sm:py-10">
        <SectionHeader
          index="05"
          title="Impact & Takeaways"
          compact
          className="mb-6 flex items-baseline gap-2.5"
          headingClassName="font-pixel text-lg font-bold text-[rgb(var(--ink))]"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Impact
            </h3>
            <p className="case-prose mt-2 text-[14px] leading-relaxed">{goingForward.impact}</p>
          </div>
          <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              What I Learned
            </h3>
            <p className="case-prose mt-2 text-[14px] leading-relaxed">{goingForward.whatILearned}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
            Next Steps
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {goingForward.nextSteps.map((step, i) => (
              <div key={i} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
                <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">0{i + 1}</span>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 border-t border-[rgb(var(--g200))] pt-8">
        <div className="flex flex-wrap items-center gap-3">
          {currentProject.liveDemo && (
            <a
              href={currentProject.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="bryl-btn-primary"
            >
              <span>Live Site</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {currentProject.repository ? (
            <a
              href={currentProject.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="bryl-btn-secondary"
            >
              <Github size={14} aria-hidden="true" />
              <span>Repository</span>
            </a>
          ) : (
            <AccessNoticeLink notice={currentProject.accessNotice} size="md" />
          )}
          {nextProject && nextProject.id !== currentProject.id && (
            <a href={nextProject.caseStudy} className="bryl-btn-secondary">
              <span>Next Case Study: {nextProject.name}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          )}
          <a href="#work" className="bryl-btn-secondary">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to All Projects</span>
          </a>
        </div>
      </section>
    </>
  );
}
