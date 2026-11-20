import type { MouseEvent as ReactMouseEvent } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import type { CaseStudyDetail, PortfolioProject } from '../../types/portfolio';
import { ProjectVisual } from '../common/ProjectVisual';

const TOC_ITEMS = [
  { id: 'case-study-overview', label: '01 Overview' },
  { id: 'case-study-understanding', label: '02 Understanding the User' },
  { id: 'case-study-starting', label: '03 Starting the Design' },
  { id: 'case-study-refining', label: '04 Refining the Design' },
  { id: 'case-study-forward', label: '05 Going Forward' },
];

interface CaseStudyHeaderProps {
  currentProject: PortfolioProject;
  allProjects: PortfolioProject[];
  detail: CaseStudyDetail;
}

export function CaseStudyHeader({ currentProject, allProjects, detail }: CaseStudyHeaderProps) {
  const scrollToCaseSection = (e: ReactMouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(targetId)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgb(var(--g200))] pb-6">
        <a
          href="#work"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[rgb(var(--accent))] hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>back to projects</span>
        </a>

        <div className="flex flex-wrap items-center gap-5" role="navigation" aria-label="Switch project case study">
          {allProjects.slice(0, 4).map((item) => {
            const active = item.id === currentProject.id;
            return (
              <a
                key={item.id}
                href={item.caseStudy}
                aria-current={active ? 'page' : undefined}
                className={`py-1 font-mono text-[11.5px] transition-colors ${
                  active
                    ? 'font-semibold text-[rgb(var(--ink))] underline decoration-[rgb(var(--accent))] decoration-2 underline-offset-[6px]'
                    : 'text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>

      <header className="mt-10 border-b border-[rgb(var(--g200))] pb-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
            {currentProject.featured ? 'Flagship Case Study' : 'Project Case Study'}
          </span>
          <span className="hidden font-mono text-xs text-[rgb(var(--g400))] sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="micro-label">{currentProject.category}</span>
        </div>

        <h1 className="mt-5 font-pixel text-3xl font-bold leading-none text-[rgb(var(--ink))] sm:text-4xl">
          {currentProject.name}
        </h1>

        <p className="mt-5 max-w-prose text-[16px] leading-relaxed text-[rgb(var(--g600))]">
          {currentProject.description}
        </p>

        {currentProject.accessNotice && (
          <div
            role="note"
            aria-label="System access notice"
            className="mt-6 flex items-start gap-2.5 border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--surface))] px-4 py-3 font-mono text-[12px] text-[rgb(var(--ink))]"
          >
            <Lock size={14} className="mt-0.5 shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-[rgb(var(--accent))]">Notice:</strong>{' '}
              {currentProject.accessNotice}
            </span>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-t border-[rgb(var(--g200))] pt-6 font-mono text-[12px] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-2.5 sm:pr-5">
            <span className="micro-label block">Project Duration</span>
            <strong className="mt-1.5 block font-medium text-[rgb(var(--ink))]">{detail.overview.duration}</strong>
          </div>
          <div className="py-2.5 sm:px-5">
            <span className="micro-label block">My Role</span>
            <strong className="mt-1.5 block font-medium text-[rgb(var(--ink))]">{currentProject.role}</strong>
          </div>
          <div className="py-2.5 sm:pl-5">
            <span className="micro-label block">Stack</span>
            <strong className="mt-1.5 block font-medium text-[rgb(var(--ink))]">
              {currentProject.technologies.join(', ')}
            </strong>
          </div>
        </div>
      </header>

      <div className="mt-10">
        <ProjectVisual project={currentProject} category={currentProject.category} />
      </div>

      <nav
        aria-label="Case study contents"
        className="mt-10 flex flex-wrap items-center gap-3 border-y border-[rgb(var(--g200))] py-4 font-mono text-[11px]"
      >
        <span className="micro-label mr-2 text-[rgb(var(--accent))]">CONTENTS:</span>
        {TOC_ITEMS.map((item, idx) => (
          <span key={item.id} className="inline-flex items-center gap-2.5">
            {idx > 0 && (
              <span className="text-[rgb(var(--g300))]" aria-hidden="true">
                ·
              </span>
            )}
            <a
              href={`#${item.id}`}
              onClick={(e) => scrollToCaseSection(e, item.id)}
              className="underline decoration-[rgb(var(--g300))] underline-offset-4 hover:text-[rgb(var(--accent))]"
            >
              {item.label}
            </a>
          </span>
        ))}
      </nav>
    </>
  );
}
