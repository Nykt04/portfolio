import { ChevronDown } from 'lucide-react';
import type { CaseStudyDetail, ProjectRole } from '../../types/portfolio';
import { SectionHeader } from '../common/SectionHeader';

interface CaseStudyOverviewProps {
  overview: CaseStudyDetail['overview'];
  roles: ProjectRole[];
}

export function CaseStudyOverview({ overview, roles }: CaseStudyOverviewProps) {
  return (
    <section id="case-study-overview" className="scroll-mt-24 py-9 sm:py-10">
      <SectionHeader
        index="01"
        title="Overview"
        compact
        className="mb-6 flex items-baseline gap-2.5"
        headingClassName="font-pixel text-lg font-bold text-[rgb(var(--ink))]"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
        <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">Problem</h3>
          <p className="case-prose mt-2 text-[14px] leading-relaxed">{overview.problem}</p>
        </div>
        <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">Goal</h3>
          <p className="case-prose mt-2 text-[14px] leading-relaxed">{overview.goal}</p>
        </div>
        <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
            Users &amp; Context
          </h3>
          <p className="case-prose mt-2 text-[14px] leading-relaxed">{overview.targetUsers}</p>
          {overview.teamContext && (
            <p className="mt-2.5 font-mono text-[11.5px] text-[rgb(var(--g500))]">{overview.teamContext}</p>
          )}
        </div>
      </div>

      <div id="case-study-roles" className="mt-9 border-t border-[rgb(var(--g200))] pt-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-pixel text-base font-bold text-[rgb(var(--ink))]">
            My Role &amp; Responsibilities
          </h3>
          <span className="micro-label">Select role to expand</span>
        </div>
        <div className="case-details grid grid-cols-1 gap-4 sm:grid-cols-2">
          {roles.map((role, rIdx) => (
            <details key={role.title} className="group border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4 sm:p-5">
              <summary className="flex items-center justify-between gap-3 font-mono text-[13px] font-semibold text-[rgb(var(--ink))]">
                <span className="inline-flex items-center gap-2.5">
                  <span className="text-[11px] text-[rgb(var(--accent))]">0{rIdx + 1}</span>
                  <span>{role.title}</span>
                </span>
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="text-[rgb(var(--g400))] transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
                {role.description}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
