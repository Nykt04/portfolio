import type { CaseStudyDetail, ProjectPersona } from '../../types/portfolio';
import { SectionHeader } from '../common/SectionHeader';
import { PersonaCard } from './PersonaCard';

interface CaseStudyResearchProps {
  understanding: CaseStudyDetail['understanding'];
  persona?: ProjectPersona;
}

export function CaseStudyResearch({ understanding, persona }: CaseStudyResearchProps) {
  return (
    <section id="case-study-understanding" className="scroll-mt-24 py-9 sm:py-10">
      <SectionHeader
        index="02"
        title="Understanding the User"
        compact
        className="mb-6 flex items-baseline gap-2.5"
        headingClassName="font-pixel text-lg font-bold text-[rgb(var(--ink))]"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
            User Research: Summary
          </h3>
          <p className="case-prose mt-2.5">{understanding.researchSummary}</p>
        </div>
        <div className="border border-[rgb(var(--g200))] border-l-2 border-l-[rgb(var(--accent))] bg-[rgb(var(--surface))] p-5 sm:p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
            Problem Statement
          </h3>
          <p className="mt-2.5 text-[14.5px] font-medium leading-relaxed text-[rgb(var(--ink))]">
            {understanding.problemStatement}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
          User Research: Pain Points
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {understanding.painPoints.map((pp, i) => (
            <div key={pp.title} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">
                0{i + 1} · PAIN POINT
              </span>
              <h4 className="mt-1.5 text-[14.5px] font-semibold text-[rgb(var(--ink))]">{pp.title}</h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">{pp.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {persona && <PersonaCard persona={persona} />}

      <div className="mt-10">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
          User Journey Map
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:hidden">
          {understanding.journeyMap.map((step) => (
            <div
              key={step.stage}
              className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4 text-[13px] leading-relaxed"
            >
              <strong className="block font-mono text-[12px] text-[rgb(var(--ink))]">{step.stage}</strong>
              <p className="mt-2 text-[rgb(var(--g600))]">
                <span className="font-semibold">Action:</span> {step.action}
              </p>
              <p className="mt-1.5 text-[rgb(var(--g600))]">
                <span className="font-semibold">Feelings:</span> {step.feelings}
              </p>
              <p className="mt-1.5 text-[rgb(var(--g600))]">
                <span className="font-semibold">Pain Points:</span> {step.painPoints}
              </p>
              <p className="mt-1.5 text-[rgb(var(--accent))]">
                <span className="font-semibold">Opportunities:</span> {step.opportunities}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 hidden overflow-x-auto border border-[rgb(var(--g200))] sm:block">
          <table className="w-full border-collapse text-left text-[13px] leading-relaxed">
            <thead className="border-b border-[rgb(var(--g200))] bg-[rgb(var(--surface))] font-mono text-[11px] uppercase text-[rgb(var(--ink))]">
              <tr>
                <th className="p-3.5 sm:p-4">Stage</th>
                <th className="p-3.5 sm:p-4">User Action</th>
                <th className="p-3.5 sm:p-4">Feelings</th>
                <th className="p-3.5 sm:p-4">Pain Points</th>
                <th className="p-3.5 sm:p-4">Opportunities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--g200))] text-[rgb(var(--g600))]">
              {understanding.journeyMap.map((step) => (
                <tr key={step.stage} className="align-top">
                  <td className="p-3.5 font-mono text-[11.5px] font-semibold text-[rgb(var(--ink))] sm:p-4">
                    {step.stage}
                  </td>
                  <td className="p-3.5 sm:p-4">{step.action}</td>
                  <td className="p-3.5 sm:p-4">{step.feelings}</td>
                  <td className="p-3.5 sm:p-4">{step.painPoints}</td>
                  <td className="p-3.5 text-[rgb(var(--ink))] sm:p-4">{step.opportunities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
