import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { flushSync } from 'react-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Copy,
  ExternalLink,
  FolderGit2,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Monitor,
  Moon,
  PanelsTopLeft,
  Quote,
  ScanLine,
  Search,
  Sparkles,
  Sun,
  Target,
  Terminal,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { portfolio as p, projects } from './portfolio';
import ProjectsSection, { ProjectVisual } from './Projects';
import { Portrait, Toolkit, techIcons } from './AboutExtras';
import CertificationsSection from './Certifications';
import ProjectWireframes from './ProjectWireframes';

declare global {
  interface Window {
    setPortfolioTheme?: (pref: 'system' | 'light' | 'dark', ev?: MouseEvent | ReactMouseEvent) => void;
  }
}

const navItems = [
  { id: 'home', label: 'Home', num: '00', Icon: UserRound },
  { id: 'work', label: 'Work', num: '01', Icon: FolderGit2 },
  { id: 'case-study', label: 'Case Study', num: 'CS', Icon: BookOpen, isCaseLink: true },
  { id: 'about', label: 'About', num: '02', Icon: Users },
  { id: 'toolkit', label: 'Stack', num: '03', Icon: Layers },
  { id: 'certifications', label: 'Certs', num: '04', Icon: Award },
  { id: 'github', label: 'GitHub', num: '05', Icon: Github },
  { id: 'contact', label: 'Contact', num: '06', Icon: Mail },
];

const allSectionIds = ['home', 'work', 'about', 'toolkit', 'certifications', 'github', 'contact'];

const processSteps = [
  {
    num: '01',
    title: 'Requirements Analysis',
    question: 'Who am I building for, and what problem needs solving?',
    detail: 'User workflows · Functional scope · Data modeling',
    body: 'Every project begins with understanding real user friction—interviewing students or stakeholders, mapping user journeys, and defining clear, testable requirements.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'UI/UX & Accessibility',
    question: 'Can anyone navigate this interface effortlessly?',
    detail: 'Wireframing · WCAG 2.2 AA · Typography & contrast',
    body: 'I structure layouts around clear visual hierarchy, semantic landmarks, full keyboard operability, and generous touch targets before writing component code.',
    Icon: PanelsTopLeft,
  },
  {
    num: '03',
    title: 'Full-Stack Implementation',
    question: 'How do components and data layers fit together cleanly?',
    detail: 'TypeScript · React / Next.js · Modular architecture',
    body: 'Translating wireframes into reusable, type-safe components with resilient state management, clean API boundaries, and minimal dependencies.',
    Icon: Code2,
  },
  {
    num: '04',
    title: 'Quality Assurance & Testing',
    question: 'Does it hold up across devices, edge cases, and screen readers?',
    detail: 'Cross-viewport checks · Keyboard sweeps · Edge-case fixes',
    body: 'Rigorous verification across mobile and desktop viewports, slow network conditions, and assistive navigation to ensure a reliable release.',
    Icon: ScanLine,
  },
];

function CornerTicks() {
  return (
    <>
      <span className="gk-corner-tick tl" aria-hidden="true" />
      <span className="gk-corner-tick tr" aria-hidden="true" />
      <span className="gk-corner-tick bl" aria-hidden="true" />
      <span className="gk-corner-tick br" aria-hidden="true" />
    </>
  );
}

function ThemeSwitcher() {
  const [pref, setPref] = useState<'system' | 'light' | 'dark'>(() => {
    const attr = document.documentElement.dataset.themePref;
    if (attr === 'light' || attr === 'dark' || attr === 'system') return attr;
    return 'dark';
  });

  useEffect(() => {
    const onThemeChange = (e: Event) => {
      const detail = (e as CustomEvent<{ pref: 'system' | 'light' | 'dark' }>).detail;
      if (detail?.pref) setPref(detail.pref);
    };
    window.addEventListener('gk-theme-change', onThemeChange);
    return () => window.removeEventListener('gk-theme-change', onThemeChange);
  }, []);

  const choose = (next: 'system' | 'light' | 'dark', e: ReactMouseEvent<HTMLButtonElement>) => {
    setPref(next);
    if (window.setPortfolioTheme) {
      window.setPortfolioTheme(next, e);
    } else {
      document.documentElement.classList.toggle('dark', next === 'dark');
    }
  };

  return (
    <div className="theme-switch" role="group" aria-label="Color theme">
      <button
        type="button"
        onClick={(e) => choose('system', e)}
        className={`theme-opt ${pref === 'system' ? 'is-active' : ''}`}
        title="System theme"
        aria-label="System theme"
        aria-pressed={pref === 'system'}
      >
        <Monitor size={13} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => choose('light', e)}
        className={`theme-opt ${pref === 'light' ? 'is-active' : ''}`}
        title="Light theme (Drafting Paper)"
        aria-label="Light theme"
        aria-pressed={pref === 'light'}
      >
        <Sun size={13} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => choose('dark', e)}
        className={`theme-opt ${pref === 'dark' ? 'is-active' : ''}`}
        title="Dark theme (Slate Blueprint)"
        aria-label="Dark theme"
        aria-pressed={pref === 'dark'}
      >
        <Moon size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function App() {
  const [isCaseStudy, setIsCaseStudy] = useState(() => window.location.hash.startsWith('#case-study'));
  const [caseStudyId, setCaseStudyId] = useState(() => {
    const match = typeof window !== 'undefined' ? window.location.hash.match(/[?&]p=([^&]+)/) : null;
    return match ? match[1] : 'featured-project';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [activeProcess, setActiveProcess] = useState(0);

  const mainRef = useRef<HTMLElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);
  const quickInputRef = useRef<HTMLInputElement>(null);
  const priorView = useRef(isCaseStudy);

  // Sync hash navigation (#case-study vs #home/#work/etc.)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === '#main') return;
      const nextIsCase = hash.startsWith('#case-study');
      const pidMatch = hash.match(/[?&]p=([^&]+)/);
      setCaseStudyId(pidMatch ? pidMatch[1] : 'featured-project');

      const viewChanged = nextIsCase !== priorView.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const applyState = () => {
        setIsCaseStudy(nextIsCase);
        setMobileMenuOpen(false);
        setQuickJumpOpen(false);
      };

      if (viewChanged && document.startViewTransition && !reduceMotion) {
        document.startViewTransition(() => {
          flushSync(applyState);
          const targetId = hash.split('?')[0].slice(1);
          const target = document.getElementById(targetId);
          if (target) target.scrollIntoView({ behavior: 'instant' });
          else window.scrollTo({ top: 0, behavior: 'instant' });
        });
      } else {
        applyState();
        const targetId = hash.split('?')[0].slice(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
        } else if (viewChanged) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Update document title and scroll spy
  useEffect(() => {
    const currentProj = projects.find((item) => item.id === caseStudyId) || projects[0];
    document.title = isCaseStudy
      ? `${currentProj.name} — Case Study | ${p.shortName}`
      : `${p.name} — ${p.title}`;

    if (priorView.current !== isCaseStudy) {
      priorView.current = isCaseStudy;
      requestAnimationFrame(() => {
        const cleanId = window.location.hash.split('?')[0].slice(1);
        const target = document.getElementById(cleanId);
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
        mainRef.current?.focus({ preventScroll: true });
      });
    }

    if (isCaseStudy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-18% 0px -55% 0px', threshold: 0 },
    );

    allSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isCaseStudy, caseStudyId]);

  // Global keyboard shortcuts: Alt+K / Cmd+K for Quick Jump, Escape for overlays
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey || e.ctrlKey) && e.code === 'KeyK') {
        e.preventDefault();
        setQuickJumpOpen((prev) => {
          const next = !prev;
          if (next) setQuickQuery('');
          return next;
        });
        return;
      }
      if (e.key === 'Escape') {
        if (quickJumpOpen) {
          setQuickJumpOpen(false);
        } else if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          mobileMenuBtnRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [quickJumpOpen, mobileMenuOpen]);

  useEffect(() => {
    if (quickJumpOpen) {
      setTimeout(() => quickInputRef.current?.focus(), 30);
    }
  }, [quickJumpOpen]);

  const coreLogoSkills = ['Python', 'TypeScript', 'JavaScript', 'C'];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Architectural Blueprint Drafting Grid Backdrop (GK signature) */}
      <div aria-hidden="true" className="blueprint-backdrop pointer-events-none fixed inset-0 z-0" />

      {/* Top Floating Command Deck Header (replaces Bryl's left sidebar) */}
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--g200))] bg-[rgb(var(--bg)/0.85)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
          {/* Brand Monogram & Telemetry */}
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[rgb(var(--ink))] focus:outline-none"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--accent))] font-mono text-[12px] font-bold tracking-tight text-[rgb(var(--accent-fg))] shadow-sm transition-transform group-hover:scale-105"
              aria-hidden="true"
            >
              gk.
            </span>
            <div className="leading-none">
              <span className="block whitespace-nowrap font-pixel text-[14px] font-bold tracking-tight text-[rgb(var(--ink))]">
                {p.shortName}
              </span>
              <span className="mt-1 block whitespace-nowrap font-mono text-[9.5px] uppercase tracking-widest text-[rgb(var(--g400))]">
                BSCS // 03
              </span>
            </div>
          </a>

          {/* Desktop Section Command Pills */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 rounded-full border border-[rgb(var(--g200))] bg-[rgb(var(--surface)/0.9)] p-1 lg:flex"
          >
            {navItems.map((item) => {
              const isCurrent = item.isCaseLink
                ? isCaseStudy
                : !isCaseStudy && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isCurrent ? 'location' : undefined}
                  className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    isCurrent
                      ? 'bg-[rgb(var(--accent)/0.14)] font-semibold text-[rgb(var(--accent))] ring-1 ring-[rgb(var(--accent)/0.45)]'
                      : 'text-[rgb(var(--g500))] hover:bg-[rgb(var(--g100))] hover:text-[rgb(var(--ink))]'
                  }`}
                >
                  <span className="text-[9px] opacity-65">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Quick Jump (Alt+K), Theme Switcher, Mobile Menu */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setQuickQuery('');
                setQuickJumpOpen(true);
              }}
              aria-label="Open quick navigation command palette"
              className="hidden items-center gap-2 rounded-lg border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] px-2.5 py-1.5 font-mono text-[11px] text-[rgb(var(--g500))] transition-colors hover:border-[rgb(var(--accent)/0.5)] hover:text-[rgb(var(--ink))] sm:inline-flex"
            >
              <Search size={12} aria-hidden="true" className="text-[rgb(var(--accent))]" />
              <span>Jump</span>
              <kbd className="rounded border border-[rgb(var(--g200))] bg-[rgb(var(--g50))] px-1 py-0.5 text-[9.5px] leading-none text-[rgb(var(--g400))]">
                Alt+K
              </kbd>
            </button>

            <ThemeSwitcher />

            <button
              ref={mobileMenuBtnRef}
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] px-2.5 font-mono text-[11.5px] text-[rgb(var(--ink))] lg:hidden"
            >
              {mobileMenuOpen ? <X size={15} aria-hidden="true" /> : <Menu size={15} aria-hidden="true" />}
              <span>{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[rgb(var(--bg)/0.97)] px-6 pt-20 pb-8 backdrop-blur-lg lg:hidden"
        >
          <nav aria-label="Mobile sections" className="flex flex-col gap-3 font-mono text-[14px]">
            {navItems.map((item) => {
              const Icon = item.Icon;
              const isCurrent = item.isCaseLink
                ? isCaseStudy
                : !isCaseStudy && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                    isCurrent
                      ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]'
                      : 'border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--ink))]'
                  }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                    <span>{item.label}</span>
                  </span>
                  <span className="font-mono text-[11px] text-[rgb(var(--g400))]">{item.num}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-[rgb(var(--g200))] pt-5 font-mono text-[12px]">
            <p className="text-[rgb(var(--g400))]">Direct Engineering Contact</p>
            {p.contact.email && (
              <a
                href={`mailto:${p.contact.email}`}
                className="mt-1.5 inline-flex items-center gap-2 text-[rgb(var(--accent))]"
              >
                <Mail size={14} aria-hidden="true" />
                <span>{p.contact.email}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main id="main" ref={mainRef} tabIndex={-1} className="relative z-10">
        {isCaseStudy ? (
          <CaseStudyView projectId={caseStudyId} />
        ) : (
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {/* 00 — ASYMMETRIC BENTO HERO SECTION (GK Architectural Blueprint Studio) */}
            <section id="home" className="relative pt-8 pb-14 sm:pt-12">
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
                {/* Left 7-Column Architectural Hero Card */}
                <div className="gk-blueprint-card flex flex-col justify-between p-6 sm:p-7 lg:col-span-7">
                  <CornerTicks />

                  <div>
                    {/* Telemetry Top Status Row */}
                    <div className="reveal d1 flex flex-wrap items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3.5">
                      <div className="inline-flex items-center gap-2">
                        <span className="pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
                        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[rgb(var(--ink))]">
                          {p.course} · Gordon College
                        </span>
                      </div>
                      <span className="rounded border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[rgb(var(--accent))]">
                        {p.title}
                      </span>
                    </div>

                    {/* Display Name & Role */}
                    <div className="reveal d2 mt-5">
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-[rgb(var(--g400))]">
                        PORTFOLIO // UI-UX &amp; SOFTWARE ENGINEERING
                      </span>
                      <h1 className="mt-1 font-pixel text-3xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-[2.5rem] sm:leading-[1.1]">
                        {p.name}
                      </h1>
                    </div>

                    {/* Required AGENTS.md Introduction Quote in Architectural Callout */}
                    <blockquote className="reveal d3 mt-4 border-l-2 border-[rgb(var(--accent))] bg-[rgb(var(--g50)/0.75)] py-2.5 pl-4 pr-3 text-[14.5px] font-medium leading-relaxed text-[rgb(var(--ink))]">
                      “{p.introduction}”
                    </blockquote>

                    {/* Core Languages & Focus Pills */}
                    <p className="intro-copy reveal d4 mt-4 text-[14px]">
                      Designing and engineering{' '}
                      <span className="intro-tag">
                        <PanelsTopLeft size={13} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                        accessible interfaces
                      </span>{' '}
                      and{' '}
                      <span className="intro-tag">
                        <Terminal size={13} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                        full-stack systems
                      </span>{' '}
                      powered by{' '}
                      <span className="intro-ai">
                        <span className="intro-logos" aria-hidden="true">
                          {coreLogoSkills.map((skill) => {
                            const ic = techIcons[skill as keyof typeof techIcons];
                            return (
                              <span key={skill} className="intro-logo" title={skill}>
                                {ic ? (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d={ic.path} />
                                  </svg>
                                ) : (
                                  <Code2 size={12} />
                                )}
                              </span>
                            );
                          })}
                        </span>
                        Python, TypeScript, JS &amp; C
                      </span>
                      .
                    </p>

                    {/* Primary "Explore My Work" & Secondary "Get in Touch" CTAs + Socials */}
                    <div className="reveal d5 mt-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <a href="#work" className="bryl-btn-primary">
                          <span>Explore My Work</span>
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                        <a href="#contact" className="bryl-btn-secondary">
                          <span>Get in Touch</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </a>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-[11.5px] text-[rgb(var(--g500))]">
                        {p.contact.github && (
                          <a
                            href={p.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-[rgb(var(--accent))]"
                            aria-label="GitHub profile (opens in a new tab)"
                          >
                            <Github size={13} aria-hidden="true" />
                            <span>github</span>
                          </a>
                        )}
                        {p.contact.linkedin && (
                          <a
                            href={p.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-[rgb(var(--accent))]"
                            aria-label="LinkedIn profile (opens in a new tab)"
                          >
                            <Linkedin size={13} aria-hidden="true" />
                            <span>linkedin</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Metrics Strip */}
                  <div
                    aria-label="Portfolio highlights"
                    className="reveal d6 mt-6 grid grid-cols-3 divide-x divide-[rgb(var(--g200))] border-t border-[rgb(var(--g200))] pt-4"
                  >
                    <a href="#about" className="group block pr-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        LEVEL // 01
                      </span>
                      <div className="mt-0.5 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          {p.course}
                        </span>
                      </div>
                    </a>

                    <a href="#about" className="group block px-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        ROLES // 02
                      </span>
                      <div className="mt-0.5 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          PM · Dev · QA · BA
                        </span>
                      </div>
                    </a>

                    <a href="#work" className="group block pl-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        SHIPPED // 03
                      </span>
                      <div className="mt-0.5 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          3+ Live Apps
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right 5-Column Studio Pass Portrait Card */}
                <div className="lg:col-span-5">
                  <Portrait className="h-full" />
                </div>
              </div>

              {/* Full-Width Visual Preview of Featured Software Engineering Project (AGENTS.md requirement) */}
              <div className="reveal d6 mt-5">
                <div className="gk-blueprint-card p-5 sm:p-6">
                  <CornerTicks />
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[rgb(var(--accent))]">
                        FEATURED BUILD // 01
                      </span>
                      <span className="font-mono text-[10px] text-[rgb(var(--g400))]">
                        · {projects[0].category}
                      </span>
                    </div>
                    <span className="font-mono text-[10.5px] text-[rgb(var(--g500))]">
                      Lead Developer &amp; Project Manager
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.1)] font-mono text-xs font-bold text-[rgb(var(--accent))]"
                          aria-hidden="true"
                        >
                          {p.project.name.slice(0, 2)}
                        </span>
                        <h2 className="font-pixel text-xl font-bold text-[rgb(var(--ink))]">
                          {p.project.name}
                        </h2>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
                        {p.project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.project.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-[rgb(var(--g200))] bg-[rgb(var(--g50))] px-2 py-0.5 font-mono text-[10.5px] text-[rgb(var(--g600))]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2.5 pt-1 md:pt-0">
                      <a
                        href="#case-study"
                        className="bryl-btn-primary"
                      >
                        <span>Inspect Full Case Study</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                      {p.project.liveDemo && (
                        <a
                          href={p.project.liveDemo}
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
                </div>
              </div>
            </section>

            {/* 01 — PROJECTS SECTION */}
            <ProjectsSection />

            {/* 02 — ABOUT & PROJECT RESPONSIBILITIES SECTION */}
            <section
              id="about"
              className="relative py-16 border-t border-[rgb(var(--g200))]"
              aria-labelledby="about-title"
            >
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="section-index-badge">02</span>
                  <h2 id="about-title" className="section-index-title">
                    About &amp; Responsibilities
                  </h2>
                </div>
                <span className="micro-label">background · team roles · process</span>
              </div>

              {/* 2-Column Bio + Academic Telemetry Bento */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                <div className="gk-blueprint-card p-6 lg:col-span-7">
                  <CornerTicks />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))]">
                    PROFILE // NARRATIVE
                  </span>
                  <p className="mt-2.5 text-[15.5px] font-medium leading-relaxed text-[rgb(var(--ink))]">
                    {p.introduction}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
                    {p.about}
                  </p>
                </div>

                <div className="gk-blueprint-card flex flex-col justify-between p-6 lg:col-span-5">
                  <CornerTicks />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))]">
                      ACADEMIC // TELEMETRY
                    </span>
                    <div className="mt-3 border-b border-[rgb(var(--g200))] pb-3.5">
                      <span className="micro-label block">Education</span>
                      <strong className="mt-1 flex items-center gap-2 text-[14.5px] font-semibold text-[rgb(var(--ink))]">
                        <GraduationCap size={16} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                        <span>{p.education}</span>
                      </strong>
                    </div>
                    <div className="mt-3.5">
                      <span className="micro-label block">Primary Focus</span>
                      <strong className="mt-1 block text-[14px] font-medium text-[rgb(var(--ink))]">
                        {p.interests}
                      </strong>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-[rgb(var(--g200))] pt-3 font-mono text-[11px] text-[rgb(var(--g400))]">
                    Target Standard: WCAG 2.2 Level AA Compliance
                  </div>
                </div>
              </div>

              {/* Areas of Project Responsibility (2x2 Architectural Bento Grid) */}
              <div className="mt-10">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="micro-label">Areas of Project Responsibility</h3>
                  <span className="font-mono text-[11px] text-[rgb(var(--g400))]">
                    editable in src/portfolio.ts
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {p.roles.map((role, idx) => (
                    <div key={role.title} className="gk-blueprint-card p-5">
                      <CornerTicks />
                      <div className="flex items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-2.5">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[rgb(var(--accent))]">
                          ROLE // 0{idx + 1}
                        </span>
                        <span className="font-mono text-[10px] text-[rgb(var(--g400))]">
                          CORE COMPETENCY
                        </span>
                      </div>
                      <h4 className="mt-3 font-pixel text-base font-bold text-[rgb(var(--ink))]">
                        {role.title}
                      </h4>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering & UI/UX Workflow Interactive Blueprint */}
              <div className="mt-10">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="micro-label">Engineering &amp; UI/UX Workflow</h3>
                  <span className="font-mono text-[11px] text-[rgb(var(--accent))]">
                    PHASE 0{activeProcess + 1} // 0{processSteps.length}
                  </span>
                </div>

                <div
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
                  role="tablist"
                  aria-label="Engineering workflow steps"
                >
                  {processSteps.map((step, idx) => {
                    const selected = activeProcess === idx;
                    return (
                      <button
                        key={step.num}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveProcess(idx)}
                        className={`rounded-xl border p-3.5 text-left transition-all ${
                          selected
                            ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--ink))] shadow-sm'
                            : 'border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--ink))] hover:border-[rgb(var(--accent)/0.45)]'
                        }`}
                      >
                        <span
                          className={`block font-mono text-[10px] font-semibold ${
                            selected ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--g400))]'
                          }`}
                        >
                          PHASE // {step.num}
                        </span>
                        <span className="mt-1 block text-[13px] font-semibold leading-snug">
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const step = processSteps[activeProcess];
                  const StepIcon = step.Icon;
                  return (
                    <div
                      role="tabpanel"
                      className="gk-blueprint-card mt-3 p-5 sm:p-6"
                    >
                      <CornerTicks />
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                          {step.detail}
                        </span>
                        <StepIcon size={16} className="text-[rgb(var(--accent))]" aria-hidden="true" />
                      </div>
                      <h4 className="mt-2 font-pixel text-lg font-bold text-[rgb(var(--ink))]">
                        {step.question}
                      </h4>
                      <p className="mt-2 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
                        {step.body}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* 03 — STACK & SKILLS SECTION */}
            <section
              id="toolkit"
              className="py-16 border-t border-[rgb(var(--g200))]"
              aria-labelledby="toolkit-title"
            >
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="section-index-badge">03</span>
                  <h2 id="toolkit-title" className="section-index-title">
                    Stack &amp; Technical Skills
                  </h2>
                </div>
                <span className="micro-label">languages, frameworks &amp; tools</span>
              </div>

              <Toolkit />
            </section>

            {/* 04 — CERTIFICATIONS SECTION */}
            <CertificationsSection />

            {/* 05 — GITHUB CONTRIBUTIONS SECTION (Teal Blueprint Matrix) */}
            <GitHubSection />

            {/* 06 — CONTACT SECTION */}
            <ContactSection />

            {/* Footer */}
            <footer className="border-t border-[rgb(var(--g200))] py-10 font-mono text-[11.5px] text-[rgb(var(--g500))]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[rgb(var(--accent))] font-mono text-[10px] font-bold text-[rgb(var(--accent-fg))]">
                    gk
                  </span>
                  <span className="font-pixel text-xs font-bold text-[rgb(var(--ink))]">{p.name}</span>
                  <span className="text-[rgb(var(--g400))]">
                    © {new Date().getFullYear()} · {p.course}
                  </span>
                </div>
                <a
                  href="#home"
                  className="inline-flex items-center gap-1 text-[rgb(var(--g500))] hover:text-[rgb(var(--accent))]"
                >
                  <span>back to top</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </footer>
          </div>
        )}
      </main>

      {/* Quick Jump Command Palette (Alt+K / Cmd+K) */}
      {quickJumpOpen && (
        <div
          className="bryl-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setQuickJumpOpen(false);
          }}
          role="presentation"
        >
          <div
            className="bryl-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation and search"
          >
            <div className="flex items-center gap-2.5 border-b border-[rgb(var(--g200))] pb-3">
              <Search size={15} className="text-[rgb(var(--accent))]" aria-hidden="true" />
              <input
                ref={quickInputRef}
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Jump to section or project case study..."
                aria-label="Filter navigation commands"
                className="w-full bg-transparent font-mono text-[13px] text-[rgb(var(--ink))] placeholder:text-[rgb(var(--g400))] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuickJumpOpen(false)}
                className="rounded border border-[rgb(var(--g200))] px-1.5 py-0.5 font-mono text-[10px] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
              >
                ESC
              </button>
            </div>

            <div className="mt-4 max-h-72 overflow-y-auto space-y-4 font-mono text-[12px]">
              <div>
                <span className="micro-label block mb-2">Sections</span>
                <div className="flex flex-col gap-1">
                  {navItems
                    .filter((item) => item.label.toLowerCase().includes(quickQuery.toLowerCase()))
                    .map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setQuickJumpOpen(false)}
                        className="flex items-center justify-between rounded-md px-2.5 py-2 text-[rgb(var(--ink))] hover:bg-[rgb(var(--g100))]"
                      >
                        <span>{item.label}</span>
                        <span className="text-[10.5px] text-[rgb(var(--accent))]">{item.num}</span>
                      </a>
                    ))}
                </div>
              </div>

              <div>
                <span className="micro-label block mb-2">Project Case Studies</span>
                <div className="flex flex-col gap-1">
                  {projects
                    .filter(
                      (proj) =>
                        proj.name.toLowerCase().includes(quickQuery.toLowerCase()) ||
                        proj.category.toLowerCase().includes(quickQuery.toLowerCase()),
                    )
                    .map((proj) => (
                      <a
                        key={proj.id}
                        href={proj.caseStudy}
                        onClick={() => setQuickJumpOpen(false)}
                        className="flex items-center justify-between rounded-md px-2.5 py-2 text-[rgb(var(--ink))] hover:bg-[rgb(var(--g100))]"
                      >
                        <span>{proj.name}</span>
                        <span className="text-[10.5px] text-[rgb(var(--g400))]">{proj.category}</span>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const FALLBACK_GH_LEVELS =
  '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000002000000200000000000000000000000000000001000000000004110000000000013003001001020111100401200000000000000000000000000000000000000000230100000000000000000000000000000000020000011011000000000000000000000000000000000000100000010000002110000000000000000010010440';

const GH_TILE_OPACITY = [0.55, 0.28, 0.5, 0.75, 1] as const;

interface GhDay {
  date?: string;
  count?: number;
  level: number;
}

function GitHubSection() {
  const githubUrl = p.contact.github || 'https://github.com/Nykt04';
  const username = githubUrl.replace(/\/+$/, '').split('/').pop() || 'Nykt04';

  const [total, setTotal] = useState<number>(156);
  const [days, setDays] = useState<GhDay[]>(() =>
    FALLBACK_GH_LEVELS.split('').map((ch) => ({ level: Number(ch) || 0 })),
  );

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data.contributions)) return;
        setDays(
          data.contributions.map((d: { date?: string; count?: number; level?: number }) => ({
            date: d.date,
            count: d.count,
            level: Math.min(4, Math.max(0, Number(d.level) || 0)),
          })),
        );
        if (data.total && typeof data.total.lastYear === 'number') {
          setTotal(data.total.lastYear);
        }
      })
      .catch(() => {
        // Keep seeded snapshot when offline
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  // Group into 53 columns of 7 days (Sunday..Saturday)
  const cells: { w: number; d: number; day: GhDay }[] = [];
  const totalWeeks = 53;
  const padded = days.slice(-totalWeeks * 7);
  for (let i = 0; i < padded.length; i++) {
    const w = Math.floor(i / 7);
    const d = i % 7;
    if (w < totalWeeks) {
      cells.push({ w, d, day: padded[i] });
    }
  }

  return (
    <section
      id="github"
      className="py-16 border-t border-[rgb(var(--g200))]"
      aria-labelledby="github-title"
    >
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="section-index-badge">05</span>
          <h2 id="github-title" className="section-index-title">
            GitHub Activity
          </h2>
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11.5px] font-medium text-[rgb(var(--accent))] hover:underline"
          aria-label={`GitHub profile @${username} (opens in a new tab)`}
        >
          @{username} ↗
        </a>
      </div>

      <div className="gk-blueprint-card p-5 sm:p-6">
        <CornerTicks />

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3">
          <div className="flex items-center gap-2">
            <Github size={15} className="text-[rgb(var(--accent))]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--ink))]">
              COMMIT MATRIX // @{username}
            </span>
          </div>
          <span className="font-mono text-[11px] text-[rgb(var(--g500))]">
            <strong className="text-[rgb(var(--accent))]">{total.toLocaleString()}</strong> contributions in the last year
          </span>
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-x-auto"
          aria-label={`View @${username}'s ${total.toLocaleString()} GitHub contributions in the last year`}
        >
          <svg
            viewBox="0 0 689 91"
            className="h-auto min-w-[540px] w-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="GitHub contribution heatmap matrix"
          >
            {cells.map(({ w, d, day }, idx) => {
              const isZero = day.level === 0;
              const fill = isZero ? 'rgb(var(--g200))' : 'rgb(var(--accent))';
              const opacity = GH_TILE_OPACITY[day.level] ?? 0.55;
              return (
                <rect
                  key={idx}
                  x={w * 13 + 1.5}
                  y={d * 13 + 1.5}
                  width={10}
                  height={10}
                  rx={2.5}
                  fill={fill}
                  opacity={opacity}
                >
                  {day.date && (
                    <title>{`${day.count ?? 0} contributions on ${day.date}`}</title>
                  )}
                </rect>
              );
            })}
          </svg>
        </a>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[rgb(var(--g200))] pt-3">
          <span className="font-mono text-[10.5px] text-[rgb(var(--g400))]">
            Live sync via GitHub Contributions API · Snapshot fallback enabled
          </span>
          <div
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--g400))]"
            aria-hidden="true"
          >
            <span>less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <svg key={lvl} width="11" height="11" viewBox="0 0 11 11">
                <rect
                  x="0.5"
                  y="0.5"
                  width="10"
                  height="10"
                  rx="2.5"
                  fill={lvl === 0 ? 'rgb(var(--g200))' : 'rgb(var(--accent))'}
                  opacity={GH_TILE_OPACITY[lvl]}
                />
              </svg>
            ))}
            <span>more</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(p.contact.email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };

  const links = [
    { name: 'GitHub', handle: '@Nykt04', url: p.contact.github, Icon: Github },
    { name: 'LinkedIn', handle: 'gian-karlo-reguindin', url: p.contact.linkedin, Icon: Linkedin },
  ];

  return (
    <section
      id="contact"
      className="py-16 border-t border-[rgb(var(--g200))]"
      aria-labelledby="contact-title"
    >
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="section-index-badge">06</span>
          <h2 id="contact-title" className="section-index-title">
            Contact &amp; Channels
          </h2>
        </div>
        <span className="micro-label">direct communication</span>
      </div>

      <div className="gk-blueprint-card p-6 sm:p-8">
        <CornerTicks />
        <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))]">
              CHANNEL // OPEN FOR OPPORTUNITIES
            </span>
            <p className="mt-1.5 font-pixel text-2xl font-bold text-[rgb(var(--ink))]">
              Let’s build something thoughtful.
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
              Have a question about my coursework, software engineering projects, or internship opportunities? Reach out directly via email or connect on GitHub and LinkedIn.
            </p>

            {/* Email Action Row */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {p.contact.email ? (
                <>
                  <a href={`mailto:${p.contact.email}`} className="bryl-btn-primary">
                    <Mail size={14} aria-hidden="true" />
                    <span>{p.contact.email}</span>
                  </a>
                  <button type="button" onClick={copyEmail} className="bryl-btn-secondary">
                    {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    <span>{copied ? 'Copied' : 'Copy email'}</span>
                  </button>
                  <span className="sr-only" role="status" aria-live="polite">
                    {copied
                      ? 'Email address copied to clipboard.'
                      : copyError
                        ? 'Copy failed. Please use the email link directly.'
                        : ''}
                  </span>
                </>
              ) : (
                <div className="rounded-lg border border-dashed border-[rgb(var(--g300))] px-4 py-2.5 font-mono text-[12px] text-[rgb(var(--g500))]">
                  [Email Placeholder — Add in src/portfolio.ts]
                </div>
              )}
            </div>
          </div>

          {/* GitHub & LinkedIn Rows */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            {links.map(({ name, handle, url, Icon }) =>
              url ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} (${handle}, opens in a new tab)`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] px-4 py-3.5 transition-colors hover:border-[rgb(var(--accent))]"
                >
                  <span className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[rgb(var(--ink))]">
                    <Icon size={16} strokeWidth={1.7} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                    <span>{name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11.5px] text-[rgb(var(--g500))] group-hover:text-[rgb(var(--accent))]">
                    <span>{handle}</span>
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              ) : (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-[rgb(var(--g300))] px-4 py-3.5 font-mono text-[12px] text-[rgb(var(--g400))]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={15} aria-hidden="true" />
                    <span>{name}</span>
                  </span>
                  <span>[Placeholder — To be added]</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyView({ projectId = 'featured-project' }: { projectId?: string }) {
  const currentProject = projects.find((item) => item.id === projectId) || projects[0];
  const currentSections = currentProject.sections || p.project.sections;
  const currentRoles = currentProject.roles || p.roles;

  return (
    <article id="case-study" className="mx-auto max-w-4xl px-4 pt-10 pb-20 sm:px-6">
      {/* Top Navigation & Project Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-5">
        <a
          href="#work"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[rgb(var(--accent))] hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>back to projects</span>
        </a>

        <div className="flex flex-wrap items-center gap-1.5" role="navigation" aria-label="Switch project case study">
          {projects.slice(0, 4).map((item) => {
            const active = item.id === currentProject.id;
            return (
              <a
                key={item.id}
                href={item.caseStudy}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                  active
                    ? 'bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] font-semibold'
                    : 'border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--g500))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--ink))]'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* Case Study Header */}
      <header className="gk-blueprint-card mt-8 p-6 sm:p-8">
        <CornerTicks />
        <div className="flex flex-wrap items-center gap-2">
          <span className="bryl-chip-inverted">
            {currentProject.featured ? 'Featured Case Study' : 'Project Case Study'}
          </span>
          <span className="micro-label">{currentProject.category}</span>
        </div>

        <h1 className="mt-4 font-pixel text-3xl font-bold sm:text-4xl leading-none text-[rgb(var(--ink))]">
          {currentProject.name}
        </h1>

        <p className="mt-4 text-[16px] leading-relaxed text-[rgb(var(--g600))]">
          {currentProject.description}
        </p>

        {/* Hairline Metadata Bar */}
        <div className="mt-6 grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-t border-[rgb(var(--g200))] pt-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 font-mono text-[12px]">
          <div className="py-2 sm:pr-4">
            <span className="micro-label block">Category</span>
            <strong className="mt-1 block text-[rgb(var(--ink))] font-medium">{currentProject.category}</strong>
          </div>
          <div className="py-2 sm:px-4">
            <span className="micro-label block">My Responsibilities</span>
            <strong className="mt-1 block text-[rgb(var(--ink))] font-medium">{currentProject.role}</strong>
          </div>
          <div className="py-2 sm:pl-4">
            <span className="micro-label block">Stack</span>
            <strong className="mt-1 block text-[rgb(var(--ink))] font-medium">
              {currentProject.technologies.join(', ')}
            </strong>
          </div>
        </div>
      </header>

      {/* Project Visual Preview */}
      <div className="mt-8">
        <ProjectVisual project={currentProject} category={currentProject.category} />
      </div>

      {/* Table of Contents Jump Bar */}
      <nav
        aria-label="Case study contents"
        className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] px-4 py-3 font-mono text-[11px]"
      >
        <span className="micro-label mr-2 text-[rgb(var(--accent))]">BLUEPRINT INDEX:</span>
        <a href="#case-study-overview" className="underline decoration-[rgb(var(--g300))] underline-offset-4 hover:text-[rgb(var(--accent))]">
          01 Overview
        </a>
        <span className="text-[rgb(var(--g300))]">·</span>
        <a href="#case-study-problem" className="underline decoration-[rgb(var(--g300))] underline-offset-4 hover:text-[rgb(var(--accent))]">
          02 Problem &amp; Persona
        </a>
        <span className="text-[rgb(var(--g300))]">·</span>
        <a href="#case-study-roles" className="underline decoration-[rgb(var(--g300))] underline-offset-4 hover:text-[rgb(var(--accent))]">
          03 My Role (PM/Dev/QA/BA)
        </a>
        <span className="text-[rgb(var(--g300))]">·</span>
        <a href="#case-study-process" className="underline decoration-[rgb(var(--g300))] underline-offset-4 hover:text-[rgb(var(--accent))]">
          04 Wireframes &amp; Process
        </a>
        <span className="text-[rgb(var(--g300))]">·</span>
        <a href="#case-study-result" className="underline decoration-[rgb(var(--g300))] underline-offset-4 hover:text-[rgb(var(--accent))]">
          05 Results &amp; Lessons
        </a>
      </nav>

      {/* Case Study Sections */}
      <div className="mt-10 divide-y divide-[rgb(var(--g200))]">
        {currentSections.map((section, idx) => (
          <div key={section.id}>
            <section id={`case-study-${section.id}`} className="py-8">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="section-index-badge">0{idx + 1}</span>
                <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">
                  {section.title}
                </h2>
              </div>

              <p className="case-prose">{section.prompt}</p>

              {/* Target User Persona Card */}
              {section.id === 'problem' && currentProject.persona && (
                <div
                  className="gk-blueprint-card mt-6 p-5 sm:p-6"
                  aria-label={`Target User Persona: ${currentProject.persona.name}`}
                >
                  <CornerTicks />
                  <div className="flex flex-wrap items-center gap-3.5 border-b border-[rgb(var(--g200))] pb-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.1)] font-pixel text-xs font-bold text-[rgb(var(--accent))]"
                      aria-hidden="true"
                    >
                      {currentProject.persona.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <span className="micro-label text-[rgb(var(--accent))]">Target User Persona</span>
                      <h3 className="text-[15px] font-semibold text-[rgb(var(--ink))]">
                        {currentProject.persona.name}
                      </h3>
                      <p className="font-mono text-[11px] text-[rgb(var(--g500))]">
                        {currentProject.persona.demographics}
                      </p>
                    </div>
                  </div>

                  <blockquote className="mt-4 flex items-start gap-2.5 font-serif-ui italic text-[14.5px] leading-relaxed text-[rgb(var(--ink))]">
                    <Quote size={16} className="mt-1 shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
                    <p>“{currentProject.persona.quote}”</p>
                  </blockquote>

                  <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[rgb(var(--g200))] pt-4 sm:grid-cols-3">
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        <Target size={13} aria-hidden="true" />
                        <span>Goals &amp; Needs</span>
                      </div>
                      <ul className="mt-2 space-y-1.5 pl-4 text-[12.5px] leading-relaxed text-[rgb(var(--g600))]">
                        {currentProject.persona.goals.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        <AlertCircle size={13} aria-hidden="true" />
                        <span>Pain Points</span>
                      </div>
                      <ul className="mt-2 space-y-1.5 pl-4 text-[12.5px] leading-relaxed text-[rgb(var(--g600))]">
                        {currentProject.persona.painPoints.map((pain, i) => (
                          <li key={i}>{pain}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        <Sparkles size={13} aria-hidden="true" />
                        <span>Tech Habits</span>
                      </div>
                      <ul className="mt-2 space-y-1.5 pl-4 text-[12.5px] leading-relaxed text-[rgb(var(--g600))]">
                        {currentProject.persona.techHabits.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Wireframe Blueprints */}
              {section.id === 'process' && (
                <ProjectWireframes projectId={currentProject.id} projectName={currentProject.name} />
              )}
            </section>

            {/* Editable Subsections for My Role (Project Manager, Lead Developer, QA, Requirements Analysis) */}
            {idx === 1 && (
              <section id="case-study-roles" className="py-8 border-t border-[rgb(var(--g200))]">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="section-index-badge">ROLES</span>
                    <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">
                      My Role &amp; Contributions
                    </h2>
                  </div>
                  <span className="micro-label">PM · Lead Dev · QA · Requirements Analysis</span>
                </div>
                <p className="mb-4 text-[14px] text-[rgb(var(--g600))]">
                  Specific responsibilities and engineering contributions across project stages (editable in{' '}
                  <code className="font-mono text-[12px]">src/portfolio.ts</code>):
                </p>

                <div className="divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] case-details">
                  {currentRoles.map((role, rIdx) => (
                    <details key={role.title} open={rIdx === 0} className="group py-3.5">
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
                      <p className="mt-2.5 pl-6 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
                        {role.description}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>
        ))}
      </div>

      {/* Project Links & Footer CTA */}
      <section className="gk-blueprint-card mt-8 p-6">
        <CornerTicks />
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
              <span>Open Live Deployment</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {currentProject.repository && (
            <a
              href={currentProject.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="bryl-btn-secondary"
            >
              <Github size={14} aria-hidden="true" />
              <span>View Repository</span>
            </a>
          )}
          <a href="#work" className="bryl-btn-secondary">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to All Projects</span>
          </a>
        </div>
      </section>
    </article>
  );
}

console.assert(p.skills.length >= 4 && p.roles.length === 4 && projects.length >= 3, 'Portfolio data self-check failed');
