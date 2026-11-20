import { GraduationCap } from 'lucide-react';
import { portfolio as p } from '../../data/portfolio';
import { SectionHeader } from '../common/SectionHeader';
import { WorkflowTabs } from './WorkflowTabs';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="about-title"
    >
      <SectionHeader
        index="02"
        title="About & Responsibilities"
        titleId="about-title"
        meta="background · team roles · process"
      />

      <div className="grid grid-cols-1 gap-10 border-t border-[rgb(var(--g200))] pt-7 sm:pt-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
              How I Work
            </span>
            <p className="mt-3 max-w-prose text-[15.5px] font-medium leading-relaxed text-[rgb(var(--ink))]">
              {p.about}
            </p>
          </div>
          <div className="mt-7 flex items-center justify-between gap-4 border-t border-[rgb(var(--g200))] pt-4 font-mono text-[11px]">
            <span className="text-[rgb(var(--g400))]">Institution · Gordon College</span>
            <span className="font-medium text-[rgb(var(--ink))]">{p.course}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-[rgb(var(--g200))] pt-8 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
              Academic Background
            </span>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="micro-label block">Education</span>
                <strong className="mt-1.5 flex items-start gap-2 text-[14px] font-semibold leading-snug text-[rgb(var(--ink))]">
                  <GraduationCap
                    size={16}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[rgb(var(--accent))]"
                  />
                  <span>{p.education}</span>
                </strong>
              </div>
              <div>
                <span className="micro-label block">Primary Focus</span>
                <strong className="mt-1.5 block text-[13.5px] font-medium leading-snug text-[rgb(var(--ink))]">
                  {p.interests}
                </strong>
              </div>
            </div>
          </div>
          <div className="mt-7 flex items-center justify-between gap-4 border-t border-[rgb(var(--g200))] pt-4 font-mono text-[11px]">
            <span className="text-[rgb(var(--g400))]">Accessibility Standard</span>
            <span className="font-medium text-[rgb(var(--ink))]">WCAG 2.2 Level AA</span>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="micro-label mb-4">Areas of Project Responsibility</h3>

        <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {p.roles.map((role, idx) => (
            <div key={role.title} className="py-6 sm:px-5 lg:first:pl-0 lg:last:pr-0">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10.5px] font-medium text-[rgb(var(--g400))]">
                  0{idx + 1}
                </span>
                <h4 className="font-pixel text-[14px] font-bold text-[rgb(var(--ink))]">{role.title}</h4>
              </div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-[rgb(var(--g500))]">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <WorkflowTabs />
    </section>
  );
}
