import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  FolderGit2,
  Github,
  Layers,
  Terminal,
  X,
} from 'lucide-react';
import { portfolio, projects, type PortfolioProject } from './portfolio';

type VisualProject = Pick<PortfolioProject, 'name' | 'screenshot' | 'screenshotAlt'>;

export function LaurelSide({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="15"
      height="24"
      viewBox="0 0 18 28"
      fill="currentColor"
      aria-hidden="true"
      className={`shrink-0 text-[rgb(var(--accent))] ${flip ? '-scale-x-100' : ''}`}
    >
      <path d="M15.2 26C9.5 23 5.5 17 5.5 9.5 5.5 5.5 7 2 8.5 0.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <ellipse cx="5.2" cy="5.2" rx="1.6" ry="3.2" transform="rotate(-28 5.2 5.2)" />
      <ellipse cx="4.2" cy="10.2" rx="1.7" ry="3.4" transform="rotate(-18 4.2 10.2)" />
      <ellipse cx="4.8" cy="15.5" rx="1.7" ry="3.4" transform="rotate(-5 4.8 15.5)" />
      <ellipse cx="7.0" cy="20.3" rx="1.6" ry="3.2" transform="rotate(14 7.0 20.3)" />
      <ellipse cx="10.5" cy="24.0" rx="1.5" ry="2.8" transform="rotate(32 10.5 24.0)" />
    </svg>
  );
}

export function ProjectVisual({
  compact = false,
  project = portfolio.project,
  category = 'Software Engineering',
}: {
  compact?: boolean;
  project?: VisualProject;
  category?: string;
}) {
  if (project.screenshot) {
    return (
      <img
        className="block h-auto w-full rounded-xl border border-[rgb(var(--g200))] object-cover"
        src={project.screenshot}
        alt={project.screenshotAlt || `${project.name} interface screenshot`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] ${
        compact ? 'p-4' : 'p-5'
      }`}
      role="img"
      aria-label={project.screenshotAlt || `Project screenshot placeholder for ${project.name}`}
    >
      <div aria-hidden="true" className="halftone mask-tr pointer-events-none absolute inset-0 opacity-60" />

      {/* Mini Browser / Blueprint Chrome */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--g300))]" />
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--g300))]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--g500))] truncate">
          {category}
        </span>
        <Terminal size={13} className="text-[rgb(var(--accent))]" aria-hidden="true" />
      </div>

      {/* Architectural Wireframe Preview Placeholder */}
      <div className="relative z-10 my-4 rounded-lg border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--surface))] p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
            <Code2 size={13} aria-hidden="true" />
            <span>Interactive Blueprint</span>
          </span>
          <span className="font-mono text-[9.5px] text-[rgb(var(--g400))]">[Screenshot Slot]</span>
        </div>

        <p className="mt-2 font-display-ui text-base text-[rgb(var(--ink))]">{project.name}</p>

        {/* Simulated wireframe bars */}
        <div className="mt-3 space-y-1.5" aria-hidden="true">
          <div className="h-2 w-4/5 rounded bg-[rgb(var(--g100))]" />
          <div className="h-2 w-3/5 rounded bg-[rgb(var(--g100))]" />
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 pt-1">
            <div className="h-6 rounded border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)]" />
            <div className="h-6 rounded border border-[rgb(var(--g200))] bg-[rgb(var(--bg))]" />
            <div className="h-6 rounded border border-[rgb(var(--g200))] bg-[rgb(var(--bg))]" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between font-mono text-[10.5px] text-[rgb(var(--g500))]">
        <span>UI/UX Architecture &amp; Case Study</span>
        <span className="text-[rgb(var(--accent))] font-medium">Inspect →</span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  // Top 3 shipped projects form the bryllim.com 3-card fan deck:
  // Index 0 = ACE IT (Flagship, starts in center)
  // Index 1 = CRHS Web (Right)
  // Index 2 = Check8 (Left)
  const deckProjects = projects.slice(0, 3);
  const [centerIndex, setCenterIndex] = useState(0);
  const [modalProject, setModalProject] = useState<PortfolioProject | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const prevCard = () => setCenterIndex((c) => (c - 1 + deckProjects.length) % deckProjects.length);
  const nextCard = () => setCenterIndex((c) => (c + 1) % deckProjects.length);

  useEffect(() => {
    if (!modalProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalProject(null);
        lastTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modalRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalProject]);

  const closeModal = () => {
    setModalProject(null);
    lastTriggerRef.current?.focus();
  };

  const getSlotClass = (idx: number) => {
    if (idx === centerIndex) return 'is-center';
    const leftIdx = (centerIndex - 1 + deckProjects.length) % deckProjects.length;
    if (idx === leftIdx) return 'is-left';
    return 'is-right';
  };

  const activeDeckProject = deckProjects[centerIndex] || deckProjects[0];

  return (
    <section id="work" className="py-16 border-t border-[rgb(var(--g200))]" aria-labelledby="work-title">
      {/* Section Header (bryllim.com style) */}
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="section-index-badge">01</span>
          <h2 id="work-title" className="section-index-title">
            Projects
          </h2>
        </div>
        <span className="micro-label">click side card to cycle · click center to inspect</span>
      </div>

      {/* Bryl Lim Signature 3-Card Spotlight Fan Deck */}
      <div
        className="bryl-fan-stage mx-auto max-w-3xl"
        role="region"
        aria-label="Featured projects spotlight deck"
      >
        {deckProjects.map((proj, idx) => {
          const slot = getSlotClass(idx);
          const isCenter = slot === 'is-center';
          const badgeLabel = proj.featured
            ? 'Flagship SE Case Study'
            : proj.category.split('·')[0].trim();

          return (
            <div
              key={proj.id}
              role="button"
              tabIndex={0}
              aria-label={
                isCenter
                  ? `${proj.name} (active center card). Click to inspect details or open case study.`
                  : `Bring ${proj.name} to the center of the deck`
              }
              onClick={(e) => {
                if (isCenter) {
                  lastTriggerRef.current = e.currentTarget;
                  setModalProject(proj);
                } else {
                  setCenterIndex(idx);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  prevCard();
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  nextCard();
                } else if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (isCenter) {
                    lastTriggerRef.current = e.currentTarget;
                    setModalProject(proj);
                  } else {
                    setCenterIndex(idx);
                  }
                }
              }}
              className={`bryl-fan-card group cursor-pointer select-none ${slot}`}
            >
              {/* 5px inset hairline frame (bryllim.com signature) */}
              <span className="bryl-inset-frame" aria-hidden="true" />

              {/* Top Row: App Monogram Icon + Arrow */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.12)] font-pixel text-xs font-bold text-[rgb(var(--accent))] shadow-sm">
                  {proj.name.slice(0, 2).toUpperCase()}
                </div>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="text-[rgb(var(--g400))] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--accent))]"
                />
              </div>

              {/* Laurel Wreath Highlight Badge (bryllim.com signature) */}
              <div className="relative z-10 mt-3.5 inline-flex items-center gap-1.5 text-[rgb(var(--ink))]">
                <LaurelSide />
                <div className="text-center leading-tight">
                  <span className="block font-mono text-[9.5px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                    {badgeLabel}
                  </span>
                  <span className="block font-mono text-[8.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
                    {proj.role}
                  </span>
                </div>
                <LaurelSide flip />
              </div>

              {/* Project Title & Description */}
              <div className="relative z-10 mt-3">
                <h3 className="font-display-ui text-lg font-bold tracking-tight text-[rgb(var(--ink))] group-hover:text-[rgb(var(--accent))] transition-colors">
                  {proj.name}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
                  {proj.description}
                </p>
              </div>

              {/* Footer: Stack Pills & Direct Case Study Link */}
              <div className="relative z-10 mt-4 flex items-center justify-between gap-2 border-t border-[rgb(var(--g200))] pt-3">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[rgb(var(--g200))] bg-[rgb(var(--g50))] px-1.5 py-0.5 font-mono text-[9.5px] text-[rgb(var(--g500))]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.caseStudy}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex shrink-0 items-center gap-1 font-mono text-[10.5px] font-semibold text-[rgb(var(--accent))] hover:underline"
                >
                  <span>case study</span>
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deck Controls + Active Project Quick Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevCard}
            aria-label="Previous project in deck"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--ink))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
          >
            <ArrowLeft size={14} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1.5 px-1" role="tablist" aria-label="Select spotlight project">
            {deckProjects.map((proj, idx) => {
              const active = idx === centerIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Spotlight ${proj.name}`}
                  onClick={() => setCenterIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    active
                      ? 'w-6 bg-[rgb(var(--accent))]'
                      : 'w-2 bg-[rgb(var(--g300))] hover:bg-[rgb(var(--g400))]'
                  }`}
                />
              );
            })}
          </div>
          <button
            type="button"
            onClick={nextCard}
            aria-label="Next project in deck"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--ink))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
          >
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>

        {/* Direct Action Buttons for Active Center Card (AGENTS.md Case Study Link requirement) */}
        <div className="flex flex-wrap items-center gap-2">
          <a href={activeDeckProject.caseStudy} className="bryl-btn-primary">
            <span>Open {activeDeckProject.name} Case Study</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          {activeDeckProject.liveDemo && (
            <a
              href={activeDeckProject.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="bryl-btn-secondary"
            >
              <span>Live Demo</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Expandable Full Project Archive & Placeholder Slots (AGENTS.md requirement) */}
      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-[rgb(var(--accent))]" aria-hidden="true" />
            <span className="micro-label">
              All Projects &amp; Expandable Slots ({projects.length} total)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowAllProjects((v) => !v)}
            aria-expanded={showAllProjects}
            className="font-mono text-[11.5px] font-medium text-[rgb(var(--accent))] hover:underline underline-offset-4"
          >
            {showAllProjects ? 'Hide project index ↑' : 'View all projects & placeholder slots ↓'}
          </button>
        </div>

        {showAllProjects && (
          <div className="mt-4 divide-y divide-[rgb(var(--g200))] rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] px-4">
            {projects.map((item, idx) => {
              const isPlaceholder = item.name.startsWith('[');
              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10.5px] text-[rgb(var(--accent))]">
                        0{idx + 1}
                      </span>
                      <a
                        href={item.caseStudy}
                        className="font-display-ui text-[15px] font-semibold text-[rgb(var(--ink))] hover:text-[rgb(var(--accent))]"
                      >
                        {item.name}
                      </a>
                      <span className="bryl-tag-pill">
                        {isPlaceholder ? 'Expandable Placeholder' : item.category}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[12.5px] text-[rgb(var(--g500))]">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 font-mono text-[11.5px]">
                    {item.liveDemo && (
                      <a
                        href={item.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
                      >
                        <span>live</span>
                        <ExternalLink size={12} aria-hidden="true" />
                      </a>
                    )}
                    {item.repository && (
                      <a
                        href={item.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
                      >
                        <FolderGit2 size={12} aria-hidden="true" />
                        <span>code</span>
                      </a>
                    )}
                    <a
                      href={item.caseStudy}
                      className="inline-flex items-center gap-1 font-semibold text-[rgb(var(--accent))] hover:underline"
                    >
                      <span>case study</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bryl Lim Style Project Detail Modal (when clicking the center card) */}
      {modalProject && (
        <div
          className="bryl-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="presentation"
        >
          <div
            className="bryl-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            ref={modalRef}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close project preview modal"
              className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-[rgb(var(--g400))] hover:bg-[rgb(var(--g100))] hover:text-[rgb(var(--ink))]"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.12)] font-pixel text-xs font-bold text-[rgb(var(--accent))]">
                {modalProject.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="bryl-chip-inverted">{modalProject.category}</span>
                <h3
                  id="project-modal-title"
                  className="mt-1 font-display-ui text-xl font-bold text-[rgb(var(--ink))]"
                >
                  {modalProject.name}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
              {modalProject.description}
            </p>

            <div className="mt-4">
              <ProjectVisual compact project={modalProject} category={modalProject.category} />
            </div>

            <div className="mt-4 grid grid-cols-2 divide-x divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] py-3 font-mono text-[11px]">
              <div className="pr-3">
                <span className="block text-[9.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
                  Role
                </span>
                <strong className="mt-1 block text-[rgb(var(--ink))]">{modalProject.role}</strong>
              </div>
              <div className="pl-3">
                <span className="block text-[9.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
                  Stack
                </span>
                <strong className="mt-1 block text-[rgb(var(--ink))]">
                  {modalProject.technologies.join(', ')}
                </strong>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={modalProject.caseStudy}
                  onClick={() => setModalProject(null)}
                  className="bryl-btn-primary"
                >
                  <span>Full Case Study &amp; Wireframes</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                {modalProject.liveDemo && (
                  <a
                    href={modalProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bryl-btn-secondary"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
                {modalProject.repository && (
                  <a
                    href={modalProject.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bryl-btn-secondary"
                  >
                    <Github size={13} aria-hidden="true" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
