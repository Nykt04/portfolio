import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Lock,
  Mail,
  Maximize2,
  Quote,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { portfolio as p, projects } from './portfolio';
import { ProjectVisual } from './Projects';

export const defaultFeaturedId = (projects.find((item) => item.featured) || projects[0]).id;

export function trapTabKey(e: KeyboardEvent | ReactKeyboardEvent, container: HTMLElement | null) {
  if (e.key !== 'Tab' || !container) return;
  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export default function CaseStudyView({ projectId = defaultFeaturedId }: { projectId?: string }) {
  const currentProject = projects.find((item) => item.id === projectId) || projects[0];
  const currentIdx = projects.findIndex((item) => item.id === currentProject.id);
  const nextProject = projects[(currentIdx + 1) % projects.length];
  const currentRoles = currentProject.roles || p.roles;
  const detail = currentProject.caseStudyDetail || projects[0].caseStudyDetail!;
  const persona = currentProject.persona;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title: string } | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseBtnRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  const closeLightbox = () => {
    setLightbox(null);
    const trigger = lightboxTriggerRef.current;
    lightboxTriggerRef.current = null;
    requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    if (!lightbox) return;
    requestAnimationFrame(() => lightboxCloseBtnRef.current?.focus({ preventScroll: true }));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'Tab') trapTabKey(e, lightboxRef.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const renderZoomableImage = (src: string, alt: string, title: string, imgClassName: string) => (
    <button
      type="button"
      onClick={(e) => {
        lightboxTriggerRef.current = e.currentTarget;
        setLightbox({ src, alt, title });
      }}
      aria-label={`Enlarge ${title}`}
      className="group relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]"
    >
      <img src={src} alt={alt} loading="lazy" className={imgClassName} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 border border-[rgb(var(--g200))] bg-[rgb(var(--bg)/0.92)] px-2 py-1 font-mono text-[10.5px] text-[rgb(var(--ink))] shadow-sm backdrop-blur-xs transition-colors group-hover:border-[rgb(var(--accent))] group-hover:text-[rgb(var(--accent))]"
      >
        <Maximize2 size={12} />
        <span>Enlarge</span>
      </span>
    </button>
  );

  const tocItems = [
    { id: 'case-study-overview', label: '01 Overview' },
    { id: 'case-study-understanding', label: '02 Understanding the User' },
    { id: 'case-study-starting', label: '03 Starting the Design' },
    { id: 'case-study-refining', label: '04 Refining the Design' },
    { id: 'case-study-forward', label: '05 Going Forward' },
  ];

  const scrollToCaseSection = (e: ReactMouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(targetId)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <article id="case-study" className="mx-auto max-w-4xl px-5 pt-12 pb-24 sm:px-8">
      {/* Top Navigation & Project Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgb(var(--g200))] pb-6">
        <a
          href="#work"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[rgb(var(--accent))] hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>back to projects</span>
        </a>

        <div className="flex flex-wrap items-center gap-5" role="navigation" aria-label="Switch project case study">
          {projects.slice(0, 4).map((item) => {
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

      {/* Case Study Header */}
      <header className="mt-10 border-b border-[rgb(var(--g200))] pb-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
            {currentProject.featured ? 'Flagship Case Study' : 'Project Case Study'}
          </span>
          <span className="hidden font-mono text-xs text-[rgb(var(--g400))] sm:inline" aria-hidden="true">·</span>
          <span className="micro-label">{currentProject.category}</span>
          <span className="hidden font-mono text-xs text-[rgb(var(--g400))] sm:inline" aria-hidden="true">·</span>
          <span className="micro-label">{p.name}</span>
        </div>

        <h1 className="mt-5 font-pixel text-3xl font-bold sm:text-4xl leading-none text-[rgb(var(--ink))]">
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
              <strong className="font-semibold text-[rgb(var(--accent))]">Department Notice:</strong>{' '}
              {currentProject.accessNotice}
            </span>
          </div>
        )}

        {/* Hairline Metadata Bar */}
        <div className="mt-8 grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-t border-[rgb(var(--g200))] pt-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 font-mono text-[12px]">
          <div className="py-2.5 sm:pr-5">
            <span className="micro-label block">Project Duration</span>
            <strong className="mt-1.5 block text-[rgb(var(--ink))] font-medium">{detail.overview.duration}</strong>
          </div>
          <div className="py-2.5 sm:px-5">
            <span className="micro-label block">My Role</span>
            <strong className="mt-1.5 block text-[rgb(var(--ink))] font-medium">{currentProject.role}</strong>
          </div>
          <div className="py-2.5 sm:pl-5">
            <span className="micro-label block">Stack</span>
            <strong className="mt-1.5 block text-[rgb(var(--ink))] font-medium">
              {currentProject.technologies.join(', ')}
            </strong>
          </div>
        </div>
      </header>

      {/* Preview of Selected Polished Designs */}
      <div className="mt-10">
        <ProjectVisual project={currentProject} category={currentProject.category} />
      </div>

      {/* Table of Contents Jump Bar */}
      <nav
        aria-label="Case study contents"
        className="mt-10 flex flex-wrap items-center gap-3 border-y border-[rgb(var(--g200))] py-4 font-mono text-[11px]"
      >
        <span className="micro-label mr-2 text-[rgb(var(--accent))]">CONTENTS:</span>
        {tocItems.map((item, idx) => (
          <span key={item.id} className="inline-flex items-center gap-2.5">
            {idx > 0 && <span className="text-[rgb(var(--g300))]" aria-hidden="true">·</span>}
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

      <div className="mt-12 divide-y divide-[rgb(var(--g200))]">
        {/* 01 PROJECT OVERVIEW */}
        <section id="case-study-overview" className="scroll-mt-24 py-9 sm:py-10">
          <div className="mb-6 flex items-baseline gap-2.5">
            <span className="section-index-badge">01</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Project Overview</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">The Product</h3>
              <p className="mt-2.5 case-prose">{detail.overview.product}</p>
            </div>
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">Target Users</h3>
              <p className="mt-2.5 case-prose">{detail.overview.targetUsers}</p>
              {detail.overview.teamContext && (
                <p className="mt-3 font-mono text-[11.5px] text-[rgb(var(--g500))]">
                  Team Context: {detail.overview.teamContext}
                </p>
              )}
            </div>
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">The Problem</h3>
              <p className="mt-2.5 case-prose">{detail.overview.problem}</p>
            </div>
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">The Goal</h3>
              <p className="mt-2.5 case-prose">{detail.overview.goal}</p>
            </div>
          </div>

          {/* My Role & Responsibilities */}
          <div id="case-study-roles" className="mt-10 border-t border-[rgb(var(--g200))] pt-8">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-pixel text-base font-bold text-[rgb(var(--ink))]">
                My Role &amp; Responsibilities
              </h3>
              <span className="micro-label">PM · Lead Dev · QA · Requirements Analysis</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 case-details">
              {currentRoles.map((role, rIdx) => (
                <details key={role.title} open className="group border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
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

        {/* 02 UNDERSTANDING THE USER */}
        <section id="case-study-understanding" className="scroll-mt-24 py-9 sm:py-10">
          <div className="mb-6 flex items-baseline gap-2.5">
            <span className="section-index-badge">02</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Understanding the User</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                User Research: Summary
              </h3>
              <p className="mt-2.5 case-prose">{detail.understanding.researchSummary}</p>
            </div>
            <div className="border border-[rgb(var(--g200))] border-l-2 border-l-[rgb(var(--accent))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Problem Statement
              </h3>
              <p className="mt-2.5 text-[14.5px] font-medium leading-relaxed text-[rgb(var(--ink))]">
                {detail.understanding.problemStatement}
              </p>
            </div>
          </div>

          {/* Pain Points 1-4 */}
          <div className="mt-10">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              User Research: Pain Points
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {detail.understanding.painPoints.map((pp, i) => (
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

          {/* Persona Card */}
          {persona && (
            <div
              className="mt-10 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-6 sm:p-7"
              aria-label={`Illustrative Target Persona: ${persona.name}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgb(var(--g200))] pb-5">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] font-pixel text-sm font-bold text-[rgb(var(--accent))]"
                    aria-hidden="true"
                  >
                    {persona.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <span className="micro-label text-[rgb(var(--accent))]">Illustrative Target Persona</span>
                    <h3 className="mt-0.5 text-[16px] font-semibold text-[rgb(var(--ink))]">{persona.name}</h3>
                    <p className="font-mono text-[11px] text-[rgb(var(--g500))]">{persona.demographics}</p>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-x-5 gap-y-1.5 font-mono text-[11px] text-[rgb(var(--g600))] sm:grid-cols-3">
                  {persona.age && <div><dt className="inline text-[rgb(var(--g400))]">Age:</dt> <dd className="inline">{persona.age}</dd></div>}
                  {persona.education && <div><dt className="inline text-[rgb(var(--g400))]">Education:</dt> <dd className="inline">{persona.education}</dd></div>}
                  {persona.hometown && <div><dt className="inline text-[rgb(var(--g400))]">Hometown:</dt> <dd className="inline">{persona.hometown}</dd></div>}
                  {persona.family && <div><dt className="inline text-[rgb(var(--g400))]">Family:</dt> <dd className="inline">{persona.family}</dd></div>}
                  {persona.occupation && <div><dt className="inline text-[rgb(var(--g400))]">Occupation:</dt> <dd className="inline">{persona.occupation}</dd></div>}
                </dl>
              </div>

              <blockquote className="mt-5 flex items-start gap-3 font-serif-ui italic text-[15px] leading-relaxed text-[rgb(var(--ink))]">
                <Quote size={16} className="mt-1 shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
                <p>“{persona.quote}”</p>
              </blockquote>

              {persona.scenario && (
                <p className="mt-4 max-w-prose border-l-2 border-[rgb(var(--accent))] pl-4 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
                  {persona.scenario}
                </p>
              )}

              <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[rgb(var(--g200))] pt-5 sm:grid-cols-3">
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                    <Target size={13} aria-hidden="true" />
                    <span>Goals</span>
                  </div>
                  <ul className="mt-2.5 space-y-2 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
                    {persona.goals.map((g, i) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                    <AlertCircle size={13} aria-hidden="true" />
                    <span>Frustrations</span>
                  </div>
                  <ul className="mt-2.5 space-y-2 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
                    {persona.painPoints.map((pain, i) => <li key={i}>{pain}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                    <Sparkles size={13} aria-hidden="true" />
                    <span>Tech Habits</span>
                  </div>
                  <ul className="mt-2.5 space-y-2 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
                    {persona.techHabits.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* User Journey Map (Cards on Mobile, Table on Desktop) */}
          <div className="mt-10">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              User Journey Map
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:hidden">
              {detail.understanding.journeyMap.map((step) => (
                <div key={step.stage} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4 text-[13px] leading-relaxed">
                  <strong className="block font-mono text-[12px] text-[rgb(var(--ink))]">{step.stage}</strong>
                  <p className="mt-2 text-[rgb(var(--g600))]"><span className="font-semibold">Action:</span> {step.action}</p>
                  <p className="mt-1.5 text-[rgb(var(--g600))]"><span className="font-semibold">Feelings:</span> {step.feelings}</p>
                  <p className="mt-1.5 text-[rgb(var(--g600))]"><span className="font-semibold">Pain Points:</span> {step.painPoints}</p>
                  <p className="mt-1.5 text-[rgb(var(--accent))]"><span className="font-semibold">Opportunities:</span> {step.opportunities}</p>
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
                  {detail.understanding.journeyMap.map((step) => (
                    <tr key={step.stage} className="align-top">
                      <td className="p-3.5 font-mono text-[11.5px] font-semibold text-[rgb(var(--ink))] sm:p-4">{step.stage}</td>
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

        {/* 03 STARTING THE DESIGN */}
        <section id="case-study-starting" className="scroll-mt-24 py-9 sm:py-10">
          <div className="mb-6 flex items-baseline gap-2.5">
            <span className="section-index-badge">03</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Starting the Design</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Early Layout Exploration
              </h3>
              <p className="mt-2.5 case-prose">{detail.startingDesign.paperWireframesNote}</p>
            </div>
            <div className="flex flex-col justify-between border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                  Low-Fidelity Prototype &amp; User Flow
                </h3>
                <p className="mt-2.5 case-prose">{detail.startingDesign.lofiPrototype.description}</p>
              </div>
              {detail.startingDesign.lofiPrototype.url && (
                <div className="mt-5">
                  <a
                    href={detail.startingDesign.lofiPrototype.url}
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

          {detail.startingDesign.lofiPrototype.image && (
            <div className="mt-6 overflow-hidden border border-[rgb(var(--g200))] bg-[rgb(var(--surface))]">
              {renderZoomableImage(
                detail.startingDesign.lofiPrototype.image,
                detail.startingDesign.lofiPrototype.alt || `${currentProject.name} low-fidelity prototype user flow`,
                `${currentProject.name} Low-Fidelity Prototype & User Flow`,
                'block h-auto w-full'
              )}
            </div>
          )}

          <div className="mt-10">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Usability Study: Findings
            </h3>
            <p className="mt-2.5 max-w-prose case-prose">{detail.startingDesign.usabilityStudy.intro}</p>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
                <h4 className="font-mono text-[11.5px] font-semibold uppercase text-[rgb(var(--ink))]">
                  Round 1 Findings
                </h4>
                <ol className="mt-3 list-decimal space-y-2 pl-4 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
                  {detail.startingDesign.usabilityStudy.round1.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
              </div>
              <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
                <h4 className="font-mono text-[11.5px] font-semibold uppercase text-[rgb(var(--ink))]">
                  Round 2 Findings
                </h4>
                <ol className="mt-3 list-decimal space-y-2 pl-4 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
                  {detail.startingDesign.usabilityStudy.round2.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 04 REFINING THE DESIGN */}
        <section id="case-study-refining" className="scroll-mt-24 py-9 sm:py-10">
          <div className="mb-6 flex items-baseline gap-2.5">
            <span className="section-index-badge">04</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Refining the Design</h2>
          </div>

          <div className="space-y-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Mockups: Before &amp; After Usability Study
            </h3>
            {detail.refiningDesign.mockupsBeforeAfter.map((comp) => (
              <div key={comp.title} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
                <h4 className="text-[15px] font-semibold text-[rgb(var(--ink))]">{comp.title}</h4>
                <p className="mt-1.5 max-w-prose text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">{comp.notes}</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] p-3 font-mono text-[11.5px] text-[rgb(var(--g500))]">
                    <span className="block font-semibold text-[rgb(var(--ink))]">Before usability study</span>
                    {comp.beforeImage && (
                      <div className="my-2 border border-[rgb(var(--g200))]">
                        {renderZoomableImage(
                          comp.beforeImage,
                          comp.beforeAlt || `${comp.title} before usability study`,
                          `${comp.title} (Before usability study)`,
                          'block aspect-[16/10] w-full object-cover object-top'
                        )}
                      </div>
                    )}
                    {!comp.beforeImage && comp.beforeWireframe && (
                      <div
                        className="my-2 flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border border-[rgb(var(--g300))] bg-white p-3 text-left font-sans text-neutral-800"
                        role="img"
                        aria-label={`Early UI draft for ${comp.title}`}
                      >
                        {comp.beforeWireframe === 'nav' ? (
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
                                <span className="px-1 py-0.5 text-neutral-600 underline">
                                  View Academics
                                </span>
                              </div>
                            </div>
                            <span className="border-t border-neutral-200 pt-1 text-[9.5px] text-neutral-500">
                              Plain draft without school crest, colors, or campus photo
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    <p className="mt-1">{comp.before}</p>
                  </div>
                  <div className={`border ${comp.afterImage ? 'border-[rgb(var(--accent)/0.5)]' : 'border-dashed border-[rgb(var(--accent)/0.5)]'} bg-[rgb(var(--bg))] p-3 font-mono text-[11.5px] text-[rgb(var(--g500))]`}>
                    <span className="block font-semibold text-[rgb(var(--accent))]">After usability study</span>
                    {comp.afterImage && (
                      <div className="my-2 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))]">
                        {renderZoomableImage(
                          comp.afterImage,
                          comp.afterAlt || `${comp.title} after usability study`,
                          `${comp.title} (After usability study)`,
                          'block aspect-[16/10] w-full object-contain'
                        )}
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
              Main Mockup Screens
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {detail.refiningDesign.mainMockups.map((screen, i) => {
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
                        {renderZoomableImage(
                          item.image,
                          item.alt || item.title,
                          item.title,
                          'block aspect-[16/10] w-full object-cover object-top'
                        )}
                      </div>
                    )}
                    <figcaption className="p-4">
                      <span className="font-mono text-[10.5px] text-[rgb(var(--accent))]">MOCKUP 0{i + 1}</span>
                      <p className="mt-1.5 text-[13.5px] font-medium text-[rgb(var(--ink))]">{item.title}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              High-Fidelity Prototype &amp; Live Build
            </h3>
            <p className="mt-2.5 max-w-prose case-prose">{detail.refiningDesign.hifiNote}</p>
          </div>

          <div className="mt-10">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Accessibility Considerations
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {detail.refiningDesign.accessibilityConsiderations.map((item, i) => (
                <div key={i} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
                  <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">0{i + 1}</span>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 GOING FORWARD */}
        <section id="case-study-forward" className="scroll-mt-24 py-9 sm:py-10">
          <div className="mb-6 flex items-baseline gap-2.5">
            <span className="section-index-badge">05</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Going Forward</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Takeaways: Impact
              </h3>
              <p className="mt-2.5 case-prose">{detail.goingForward.impact}</p>
            </div>
            <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Takeaways: What I Learned
              </h3>
              <p className="mt-2.5 case-prose">{detail.goingForward.whatILearned}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Next Steps
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {detail.goingForward.nextSteps.map((step, i) => (
                <div key={i} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
                  <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">0{i + 1}</span>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Let's Connect */}
          <div className="mt-10 flex flex-col justify-between gap-5 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-pixel text-base font-bold text-[rgb(var(--ink))]">
                Let&apos;s Connect!
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
                Questions about {currentProject.name} or want to collaborate? Reach out below:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[12px]">
              <a href={`mailto:${p.contact.email}`} className="inline-flex items-center gap-1.5 text-[rgb(var(--accent))] hover:underline">
                <Mail size={14} aria-hidden="true" />
                <span>{p.contact.email}</span>
              </a>
              <a href={p.contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[rgb(var(--ink))] hover:text-[rgb(var(--accent))]">
                <Github size={14} aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a href={p.contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[rgb(var(--ink))] hover:text-[rgb(var(--accent))]">
                <Linkedin size={14} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Project Links & Footer CTA */}
      <section className="mt-6 border-t border-[rgb(var(--g200))] pt-10">
        <h2 className="font-pixel text-base font-bold text-[rgb(var(--ink))]">
          Project Links &amp; Verification
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
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
            <span className="inline-flex min-h-[44px] items-center gap-1.5 border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--surface))] px-3 font-mono text-[11.5px] text-[rgb(var(--g500))]">
              <Lock size={13} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
              <span>{currentProject.accessNotice || 'Exclusive System · GC CCS Department'}</span>
            </span>
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

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={closeLightbox}
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
        >
          <div
            ref={lightboxRef}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-auto border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] p-3 shadow-2xl sm:p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-2.5">
              <p className="font-mono text-xs font-medium text-[rgb(var(--ink))]">{lightbox.title}</p>
              <button
                ref={lightboxCloseBtnRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close enlarged image"
                className="inline-flex h-8 w-8 items-center justify-center border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--ink))] hover:text-[rgb(var(--accent))]"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="mx-auto block max-h-[78vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </article>
  );
}
