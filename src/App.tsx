import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
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
  Maximize2,
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
    question: 'Who am I building for, and what slows you down right now?',
    detail: 'User workflows · Functional scope · Data modeling',
    body: 'I start by talking with classmates, students, or staff to see where paper forms or clunky apps waste your time, then turn those notes into simple features.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'UI/UX & Accessibility',
    question: 'Can you read and navigate every screen without guesswork?',
    detail: 'Wireframing · WCAG 2.2 AA · Typography & contrast',
    body: 'Before touching code, I map clear headings, full keyboard navigation, comfortable tap sizes, and readable contrast so nothing feels hidden.',
    Icon: PanelsTopLeft,
  },
  {
    num: '03',
    title: 'Full-Stack Implementation',
    question: 'How do your clicks connect cleanly to saved data?',
    detail: 'TypeScript · React / Next.js · Modular architecture',
    body: 'I turn those wireframes into reusable TypeScript components and lean API routes so pages respond quickly even on everyday mobile data.',
    Icon: Code2,
  },
  {
    num: '04',
    title: 'Quality Assurance & Testing',
    question: 'Does everything hold up when you tab, zoom, or lose signal?',
    detail: 'Cross-viewport checks · Keyboard sweeps · Edge-case fixes',
    body: 'I test across phones and laptops, tab through forms without a mouse, and catch edge cases before you ever see the live link.',
    Icon: ScanLine,
  },
];

function trapTabKey(e: KeyboardEvent | ReactKeyboardEvent, container: HTMLElement | null) {
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
        title="Light theme (Crisp White)"
        aria-label="Light theme"
        aria-pressed={pref === 'light'}
      >
        <Sun size={13} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => choose('dark', e)}
        className={`theme-opt ${pref === 'dark' ? 'is-active' : ''}`}
        title="Dark theme (Monochrome Dark)"
        aria-label="Dark theme"
        aria-pressed={pref === 'dark'}
      >
        <Moon size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

const defaultFeaturedId = (projects.find((item) => item.featured) || projects[0]).id;

export default function App() {
  const [isCaseStudy, setIsCaseStudy] = useState(() => window.location.hash.startsWith('#case-study'));
  const [caseStudyId, setCaseStudyId] = useState(() => {
    const match = typeof window !== 'undefined' ? window.location.hash.match(/[?&]p=([^&]+)/) : null;
    return match ? match[1] : defaultFeaturedId;
  });
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(() => window.location.hash.startsWith('#case-study'));
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [activeProcess, setActiveProcess] = useState(0);

  const mainRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const closeDrawerBtnRef = useRef<HTMLButtonElement>(null);
  const quickModalRef = useRef<HTMLDivElement>(null);
  const quickInputRef = useRef<HTMLInputElement>(null);
  const quickTriggerRef = useRef<HTMLElement | null>(null);
  const priorView = useRef(isCaseStudy);

  const closeNavDrawer = (returnFocus = false) => {
    setNavDrawerOpen(false);
    if (returnFocus) {
      requestAnimationFrame(() => menuBtnRef.current?.focus());
    }
  };

  const closeQuickJump = (returnFocus = true) => {
    setQuickJumpOpen(false);
    if (returnFocus) {
      const trigger = quickTriggerRef.current;
      quickTriggerRef.current = null;
      requestAnimationFrame(() => trigger?.focus());
    }
  };

  // Sync hash navigation (#case-study vs #home/#work/etc.)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === '#main') return;
      const nextIsCase = hash.startsWith('#case-study');
      const pidMatch = hash.match(/[?&]p=([^&]+)/);
      if (!hash.startsWith('#case-study-')) {
        setCaseStudyId(pidMatch ? pidMatch[1] : defaultFeaturedId);
      }

      const viewChanged = nextIsCase !== priorView.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const applyState = () => {
        setIsCaseStudy(nextIsCase);
        if (nextIsCase) setCaseMenuOpen(true);
        setNavDrawerOpen(false);
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
      ? `${currentProj.name} · Case Study | ${p.shortName}`
      : `${p.name} · ${p.title}`;

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

  // Bidirectional smooth fade-in transition on scroll (respects reduced motion)
  useEffect(() => {
    const rootEl = mainRef.current;
    if (!rootEl) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fadeTargets = Array.from(
      rootEl.querySelectorAll<HTMLElement>(
        'section:not(#home):not(#work), #work > div:first-child, #work article',
      ),
    );
    if (!fadeTargets.length || reduceMotion) return;

    fadeTargets.forEach((el) => {
      el.classList.add('scroll-fade');
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 16 && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -16px 0px', threshold: 0.01 },
    );

    fadeTargets.forEach((el) => fadeObserver.observe(el));

    return () => {
      fadeObserver.disconnect();
      fadeTargets.forEach((el) => el.classList.remove('scroll-fade', 'is-visible'));
    };
  }, [isCaseStudy, caseStudyId]);

  // Global keyboard shortcuts: Alt+K Quick Jump, Escape closes overlays, Tab traps active modal/drawer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey || e.ctrlKey) && e.code === 'KeyK') {
        e.preventDefault();
        setNavDrawerOpen(false);
        if (quickJumpOpen) {
          closeQuickJump();
        } else {
          quickTriggerRef.current = document.activeElement as HTMLElement | null;
          setQuickQuery('');
          setQuickJumpOpen(true);
        }
        return;
      }
      if (e.key === 'Escape') {
        if (quickJumpOpen) {
          closeQuickJump();
        } else if (navDrawerOpen) {
          closeNavDrawer(true);
        }
        return;
      }
      if (e.key === 'Tab') {
        if (quickJumpOpen) trapTabKey(e, quickModalRef.current);
        else if (navDrawerOpen) trapTabKey(e, drawerRef.current);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [quickJumpOpen, navDrawerOpen]);

  useEffect(() => {
    if (navDrawerOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeDrawerBtnRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = '';
    }
    const onResize = () => {
      if (window.innerWidth >= 1024 && navDrawerOpen) {
        setNavDrawerOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', onResize);
    };
  }, [navDrawerOpen]);

  useEffect(() => {
    if (quickJumpOpen) {
      setTimeout(() => quickInputRef.current?.focus(), 30);
    }
  }, [quickJumpOpen]);

  const coreLogoSkills = ['Python', 'TypeScript', 'JavaScript', 'C'];
  const activeNavItem = isCaseStudy
    ? navItems.find((item) => item.isCaseLink) || navItems[2]
    : navItems.find((item) => item.id === activeSection) || navItems[0];

  const renderSideNav = (isDrawer: boolean) => (
    <>
      <div>
        <div className="flex items-center justify-between border-b border-[rgb(var(--g200))] pb-3.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--g500))]">
              Navigation
            </span>
          </div>
          {isDrawer ? (
            <button
              ref={closeDrawerBtnRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={() => closeNavDrawer(true)}
              className="inline-flex h-8 items-center gap-1.5 px-1 font-mono text-[11.5px] text-[rgb(var(--g500))] transition-colors hover:text-[rgb(var(--ink))]"
            >
              <X size={14} aria-hidden="true" />
              <span>Close</span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-[rgb(var(--g400))]">00–06</span>
          )}
        </div>

        <nav
          aria-label={isDrawer ? 'Mobile navigation' : 'Main navigation'}
          className="mt-4 flex flex-col gap-1 font-mono text-[12.5px]"
        >
          {navItems.map((item) => {
            const Icon = item.Icon;
            const isCurrent = item.isCaseLink
              ? isCaseStudy
              : !isCaseStudy && activeSection === item.id;
            if (item.isCaseLink) {
              return (
                <div key={item.id} className="flex flex-col">
                  <button
                    type="button"
                    aria-expanded={caseMenuOpen}
                    onClick={() => setCaseMenuOpen((open) => !open)}
                    className={`group flex w-full items-center justify-between border-l-2 py-2 pl-3 pr-1 text-left transition-colors ${
                      isCurrent
                        ? 'border-[rgb(var(--accent))] font-semibold text-[rgb(var(--ink))]'
                        : 'border-transparent text-[rgb(var(--g500))] hover:border-[rgb(var(--g300))] hover:text-[rgb(var(--ink))]'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Icon
                        size={15}
                        strokeWidth={isCurrent ? 2 : 1.7}
                        aria-hidden="true"
                        className={
                          isCurrent
                            ? 'text-[rgb(var(--accent))]'
                            : 'text-[rgb(var(--g400))] group-hover:text-[rgb(var(--ink))]'
                        }
                      />
                      <span>{item.label}</span>
                    </span>
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className={`transition-transform ${caseMenuOpen ? 'rotate-180' : ''} ${
                        isCurrent ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--g400))]'
                      }`}
                    />
                  </button>
                  {caseMenuOpen && (
                    <div className="ml-3 flex flex-col gap-0.5 border-l border-[rgb(var(--g200))] py-1 pl-3">
                      {projects.map((proj) => {
                        const projActive = isCaseStudy && caseStudyId === proj.id;
                        return (
                          <a
                            key={proj.id}
                            href={proj.caseStudy}
                            aria-current={projActive ? 'page' : undefined}
                            onClick={() => {
                              setCaseStudyId(proj.id);
                              setIsCaseStudy(true);
                              if (isDrawer) closeNavDrawer(false);
                            }}
                            className={`flex items-center justify-between py-1.5 text-[11.5px] transition-colors ${
                              projActive
                                ? 'font-semibold text-[rgb(var(--accent))]'
                                : 'text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
                            }`}
                          >
                            <span>{proj.name}</span>
                            {proj.featured && (
                              <span className="text-[9px] uppercase tracking-wider text-[rgb(var(--accent))]">
                                Featured
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isCurrent ? 'location' : undefined}
                onClick={isDrawer ? () => closeNavDrawer(false) : undefined}
                className={`group flex items-center justify-between border-l-2 py-2 pl-3 pr-1 transition-colors ${
                  isCurrent
                    ? 'border-[rgb(var(--accent))] font-semibold text-[rgb(var(--ink))]'
                    : 'border-transparent text-[rgb(var(--g500))] hover:border-[rgb(var(--g300))] hover:text-[rgb(var(--ink))]'
                }`}
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon
                    size={15}
                    strokeWidth={isCurrent ? 2 : 1.7}
                    aria-hidden="true"
                    className={
                      isCurrent
                        ? 'text-[rgb(var(--accent))]'
                        : 'text-[rgb(var(--g400))] group-hover:text-[rgb(var(--ink))]'
                    }
                  />
                  <span>{item.label}</span>
                </span>
                <span className={`text-[10.5px] ${isCurrent ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--g400))]'}`}>
                  {item.num}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mt-6 border-t border-[rgb(var(--g200))] pt-4 font-mono text-[12px]">
        {/* Jump Search, Specs Overlay & Theme Switcher above Direct Contact */}
        <div className="mb-4 space-y-2.5 border-b border-[rgb(var(--g200))] pb-4">
          <button
            type="button"
            onClick={(e) => {
              quickTriggerRef.current = isDrawer ? menuBtnRef.current : e.currentTarget;
              if (isDrawer) closeNavDrawer(false);
              setQuickQuery('');
              setQuickJumpOpen(true);
            }}
            aria-label="Open quick navigation command palette"
            className="flex w-full items-center justify-between py-1 text-[11.5px] text-[rgb(var(--g500))] transition-colors hover:text-[rgb(var(--ink))]"
          >
            <span className="inline-flex items-center gap-2">
              <Search size={13} aria-hidden="true" className="text-[rgb(var(--accent))]" />
              <span>Jump Search</span>
            </span>
            <span className="text-[10px] text-[rgb(var(--g400))]">Alt+K</span>
          </button>

          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))]">Theme</span>
            <ThemeSwitcher />
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-wider text-[rgb(var(--g400))]">Direct Contact</p>
        {p.contact.email && (
          <a
            href={`mailto:${p.contact.email}`}
            className="mt-1.5 flex w-full min-w-0 items-center gap-1.5 text-[10.5px] text-[rgb(var(--ink))] hover:underline"
          >
            <Mail size={12} aria-hidden="true" className="shrink-0 text-[rgb(var(--accent))]" />
            <span className="truncate">{p.contact.email}</span>
          </a>
        )}
        <div className="mt-3 flex items-center gap-3">
          {p.contact.github && (
            <a
              href={p.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="inline-flex items-center gap-1.5 text-[11px] text-[rgb(var(--g500))] transition-colors hover:text-[rgb(var(--ink))]"
            >
              <Github size={14} aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}
          {p.contact.linkedin && (
            <a
              href={p.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="inline-flex items-center gap-1.5 text-[11px] text-[rgb(var(--g500))] transition-colors hover:text-[rgb(var(--ink))]"
            >
              <Linkedin size={14} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Architectural Blueprint Drafting Grid Backdrop (GK signature) */}
      <div aria-hidden="true" className="blueprint-backdrop pointer-events-none fixed inset-0 z-0" />

      {/* Minimal Editorial Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--g200))] bg-[rgb(var(--bg)/0.85)] backdrop-blur-md lg:mr-64">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          {/* Brand Monogram & Identity */}
          <a
            href="#home"
            className="group flex shrink-0 items-baseline gap-2 whitespace-nowrap text-[rgb(var(--ink))] focus:outline-none"
          >
            <span className="font-mono text-[14px] font-bold tracking-tight text-[rgb(var(--accent))]">
              gk.
            </span>
            <span className="font-pixel text-[15px] font-bold tracking-tight text-[rgb(var(--ink))]">
              {p.shortName}
            </span>
          </a>

          {/* Desktop Editorial Telemetry (Section & Availability) + Mobile Menu Trigger */}
          <div className="flex shrink-0 items-center gap-4">
            <div className="hidden items-center gap-3 font-mono text-[11px] lg:flex">
              <span className="text-[rgb(var(--g500))]">
                {activeNavItem.num} ·{' '}
                <strong className="font-medium text-[rgb(var(--ink))]">{activeNavItem.label}</strong>
              </span>
              <span className="text-[rgb(var(--g300))]" aria-hidden="true">
                /
              </span>
              <span className="inline-flex items-center gap-2 text-[rgb(var(--g500))]">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
                <span>Available for Projects</span>
              </span>
            </div>

            <button
              ref={menuBtnRef}
              type="button"
              aria-label={navDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={navDrawerOpen}
              aria-controls="side-nav-drawer"
              onClick={() => setNavDrawerOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-1.5 px-1 font-mono text-[12px] text-[rgb(var(--ink))] transition-colors hover:text-[rgb(var(--accent))] lg:hidden"
            >
              {navDrawerOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
              <span>{navDrawerOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Always-Open Right Sidebar (Desktop) */}
      <aside
        aria-label="Site navigation"
        className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:flex lg:w-64 lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-l lg:border-[rgb(var(--g200))] lg:bg-[rgb(var(--bg)/0.94)] lg:px-4 lg:py-5 lg:backdrop-blur-md"
      >
        {renderSideNav(false)}
      </aside>

      {/* Mobile / Tablet Slide-Out Navigation Drawer */}
      {navDrawerOpen && (
        <div
          className="side-drawer-backdrop lg:hidden"
          onClick={() => closeNavDrawer(true)}
        >
          <aside
            ref={drawerRef}
            id="side-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="side-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {renderSideNav(true)}
          </aside>
        </div>
      )}

      {/* Main Content Container */}
      <main id="main" ref={mainRef} tabIndex={-1} className="relative z-10 lg:pr-64">
        {isCaseStudy ? (
          <CaseStudyView projectId={caseStudyId} />
        ) : (
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {/* 00 - EDITORIAL HERO SECTION (Hairline Divided) */}
            <section
              id="home"
              className="relative pt-6 pb-8 sm:pt-10"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
                {/* Left 7-Column Editorial Hero */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    {/* Top Status Row */}
                    <div className="reveal d1 flex flex-wrap items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3.5">
                      <div className="inline-flex items-center gap-2">
                        <span className="pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
                        <span className="font-mono text-[11px] font-medium text-[rgb(var(--ink))]">
                          Available for Projects &amp; Collaborations
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-medium text-[rgb(var(--g500))]">
                        Gordon College
                      </span>
                    </div>

                    {/* Display Name & Role */}
                    <div className="reveal d2 mt-5">
                      <h1 className="font-pixel text-3xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-[2.6rem] sm:leading-[1.08]">
                        {p.name}
                      </h1>
                      <p className="mt-1.5 font-mono text-[11.5px] font-medium uppercase tracking-wider text-[rgb(var(--accent))]">
                        Aspiring Web Developer &amp; Software Engineer
                      </p>
                    </div>

                    {/* Required AGENTS.md Introduction Quote (Editorial Serif Contrast) */}
                    <blockquote className="reveal d3 mt-5 border-l border-[rgb(var(--g300))] py-0.5 pl-4 font-serif-ui text-[16.5px] italic leading-relaxed text-[rgb(var(--ink))]">
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

                  {/* Bottom Highlights Metrics Strip */}
                  <div
                    aria-label="Portfolio highlights"
                    className="reveal d6 mt-6 grid grid-cols-3 divide-x divide-[rgb(var(--g200))] border-t border-[rgb(var(--g200))] pt-4"
                  >
                    <a href="#about" className="group block pr-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        Academic Standing
                      </span>
                      <div className="mt-0.5 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          {p.course}
                        </span>
                      </div>
                    </a>

                    <a href="#about" className="group block px-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        Core Competencies
                      </span>
                      <div className="mt-0.5 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          PM · Dev · QA · BA
                        </span>
                      </div>
                    </a>

                    <a href="#work" className="group block pl-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        Verified Systems
                      </span>
                      <div className="mt-0.5 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          3 Shipped Apps
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right 5-Column Studio Portrait & Flagship Preview Bar */}
                <div className="flex flex-col justify-between gap-4 border-t border-[rgb(var(--g200))] pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <Portrait className="flex-1" />
                  <a
                    href={projects[0].caseStudy}
                    className="group flex items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-3.5 transition-colors hover:border-[rgb(var(--accent))]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={projects[0].screenshot}
                        alt={projects[0].screenshotAlt}
                        width={160}
                        height={100}
                        loading="lazy"
                        className="h-11 w-16 shrink-0 border border-[rgb(var(--g200))] object-cover object-top"
                      />
                      <div className="min-w-0">
                        <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                          Flagship Preview · {projects[0].name}
                        </span>
                        <span className="block truncate text-[12.5px] font-medium text-[rgb(var(--ink))]">
                          QR-powered digital clearance for Gordon College
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold text-[rgb(var(--accent))] group-hover:underline">
                      <span>Case Study</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </div>
            </section>

            {/* 01 - PROJECTS SECTION */}
            <ProjectsSection />

            {/* 02 - ABOUT & PROJECT RESPONSIBILITIES SECTION */}
            <section
              id="about"
              className="relative pt-7 pb-10 border-t border-[rgb(var(--g200))]"
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

              {/* 2-Column Bio + Academic Background (Divided by Vertical Hairline on Desktop) */}
              <div className="grid grid-cols-1 gap-8 border-t border-[rgb(var(--g200))] pt-7 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                    How I Work
                  </span>
                  <p className="mt-2.5 text-[15.5px] font-medium leading-relaxed text-[rgb(var(--ink))]">
                    {p.introduction}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
                    {p.about}
                  </p>
                </div>

                <div className="flex flex-col justify-between border-t border-[rgb(var(--g200))] pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                      Academic Background
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

              {/* Areas of Project Responsibility (Divided by Hairlines) */}
              <div className="mt-10">
                <h3 className="micro-label mb-3">Areas of Project Responsibility</h3>

                <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
                  {p.roles.map((role, idx) => (
                    <div
                      key={role.title}
                      className="py-4 sm:px-4 lg:first:pl-0 lg:last:pr-0"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10.5px] font-medium text-[rgb(var(--g400))]">
                          0{idx + 1}
                        </span>
                        <h4 className="font-pixel text-[14px] font-bold text-[rgb(var(--ink))]">
                          {role.title}
                        </h4>
                      </div>
                      <p className="mt-1.5 text-[12.5px] leading-snug text-[rgb(var(--g500))]">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering & UI/UX Workflow Interactive Blueprint (Hairline Divided) */}
              <div className="mt-10">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="micro-label">Engineering &amp; UI/UX Workflow</h3>
                  <span className="font-mono text-[11px] text-[rgb(var(--accent))]">
                    PHASE 0{activeProcess + 1} // 0{processSteps.length}
                  </span>
                </div>

                <div
                  className="grid grid-cols-2 divide-x divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-4 sm:divide-y-0"
                  role="tablist"
                  aria-label="Engineering workflow steps"
                >
                  {processSteps.map((step, idx) => {
                    const selected = activeProcess === idx;
                    return (
                      <button
                        key={step.num}
                        id={`workflow-tab-${idx}`}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls={`workflow-panel-${idx}`}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActiveProcess(idx)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                            e.preventDefault();
                            const delta = e.key === 'ArrowRight' ? 1 : -1;
                            const next = (idx + delta + processSteps.length) % processSteps.length;
                            setActiveProcess(next);
                            document.getElementById(`workflow-tab-${next}`)?.focus();
                          }
                        }}
                        className={`border-b-2 px-3 py-3.5 text-left transition-colors ${
                          selected
                            ? 'border-b-[rgb(var(--accent))] text-[rgb(var(--ink))]'
                            : 'border-b-transparent text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
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
                      id={`workflow-panel-${activeProcess}`}
                      role="tabpanel"
                      aria-labelledby={`workflow-tab-${activeProcess}`}
                      className="pt-5"
                    >
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

            {/* 03 - STACK & SKILLS SECTION */}
            <section
              id="toolkit"
              className="pt-7 pb-10 border-t border-[rgb(var(--g200))]"
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

            {/* 04 - CERTIFICATIONS SECTION */}
            <CertificationsSection />

            {/* 05 - GITHUB CONTRIBUTIONS SECTION */}
            <GitHubSection />

            {/* 06 - CONTACT SECTION */}
            <ContactSection />

            {/* Footer */}
            <footer className="border-t border-[rgb(var(--g200))] py-10 font-mono text-[11.5px] text-[rgb(var(--g500))]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-[rgb(var(--accent))]">
                    gk.
                  </span>
                  <span className="font-pixel text-xs font-bold text-[rgb(var(--ink))]">{p.name}</span>
                  <span className="text-[rgb(var(--g400))]">
                    © {new Date().getFullYear()} · {p.title}
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
            if (e.target === e.currentTarget) closeQuickJump();
          }}
          role="presentation"
        >
          <div
            ref={quickModalRef}
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
                onClick={() => closeQuickJump()}
                className="px-1 font-mono text-[10.5px] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
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
                        onClick={() => closeQuickJump(false)}
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
                        onClick={() => closeQuickJump(false)}
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

const GH_TILE_OPACITY = [0.42, 0.45, 0.65, 0.85, 1] as const;
const GH_DOT_RADIUS = [1.5, 2.4, 3.3, 4.2, 5.0] as const;

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
      className="pt-7 pb-10 border-t border-[rgb(var(--g200))]"
      aria-labelledby="github-title"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Summary Column */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="section-index-badge">05</span>
            <h2 id="github-title" className="section-index-title">
              GitHub Activity
            </h2>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <strong className="font-display-ui text-2xl font-bold tracking-tight text-[rgb(var(--ink))]">
              {total.toLocaleString()}
            </strong>
            <span className="font-mono text-[11.5px] text-[rgb(var(--g500))]">
              contributions in the last year
            </span>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-medium text-[rgb(var(--accent))] hover:underline"
            aria-label={`GitHub profile @${username} (opens in a new tab)`}
          >
            <Github size={13} aria-hidden="true" />
            <span>@{username} ↗</span>
          </a>
        </div>

        {/* Right Compact Matrix Column */}
        <div className="lg:col-span-8 flex flex-col lg:items-end">
          <div className="w-full max-w-[640px] border-t border-b border-[rgb(var(--g200))] py-4">
            <div className="mb-3.5 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--g500))]">
                Contributions // @{username}
              </span>
              <span className="font-mono text-[11px] text-[rgb(var(--g400))]">
                53-week matrix
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
                className="h-auto w-full min-w-[420px]"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Halftone GitHub contribution matrix"
              >
                {cells.map(({ w, d, day }, idx) => {
                  const lvl = Math.min(4, Math.max(0, day.level));
                  const isZero = lvl === 0;
                  const fill = isZero ? 'rgb(var(--g300))' : 'rgb(var(--accent))';
                  const opacity = GH_TILE_OPACITY[lvl] ?? 0.42;
                  const radius = GH_DOT_RADIUS[lvl] ?? 1.5;
                  return (
                    <circle
                      key={idx}
                      cx={w * 13 + 6.5}
                      cy={d * 13 + 6.5}
                      r={radius}
                      fill={fill}
                      opacity={opacity}
                    >
                      {day.date && (
                        <title>{`${day.count ?? 0} contributions on ${day.date}`}</title>
                      )}
                    </circle>
                  );
                })}
              </svg>
            </a>

            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[rgb(var(--g400))]">
              <span>Live API · Snapshot fallback</span>
              <div
                className="flex items-center gap-1.5 uppercase tracking-wider"
                aria-hidden="true"
              >
                <span>less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <svg key={lvl} width="12" height="12" viewBox="0 0 12 12">
                    <circle
                      cx="6"
                      cy="6"
                      r={GH_DOT_RADIUS[lvl]}
                      fill={lvl === 0 ? 'rgb(var(--g300))' : 'rgb(var(--accent))'}
                      opacity={GH_TILE_OPACITY[lvl]}
                    />
                  </svg>
                ))}
                <span>more</span>
              </div>
            </div>
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
      className="pt-7 pb-10 border-t border-[rgb(var(--g200))]"
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

      <div className="border-t border-[rgb(var(--g200))] pt-7">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))]">
              CHANNEL // OPEN FOR OPPORTUNITIES
            </span>
            <p className="mt-1.5 font-pixel text-2xl font-bold text-[rgb(var(--ink))]">
              Let’s talk.
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
              If you want to ask about any project here, talk through a UI idea, or discuss an internship or build together, email me anytime or find me on GitHub and LinkedIn.
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
                <div className="border-l-2 border-[rgb(var(--g300))] pl-3 font-mono text-[12px] text-[rgb(var(--g500))]">
                  [Email Placeholder: Add in src/portfolio.ts]
                </div>
              )}
            </div>
          </div>

          {/* GitHub & LinkedIn Rows (Divided by Hairlines) */}
          <div className="divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] lg:col-span-5 lg:border-l lg:pl-8">
            {links.map(({ name, handle, url, Icon }) =>
              url ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} (${handle}, opens in a new tab)`}
                  className="group flex items-center justify-between gap-3 py-4 transition-colors hover:text-[rgb(var(--accent))]"
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
                  className="flex items-center justify-between gap-3 py-4 font-mono text-[12px] text-[rgb(var(--g400))]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={15} aria-hidden="true" />
                    <span>{name}</span>
                  </span>
                  <span>[Placeholder: To be added]</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyView({ projectId = defaultFeaturedId }: { projectId?: string }) {
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
    requestAnimationFrame(() => trigger?.focus());
  };

  useEffect(() => {
    if (!lightbox) return;
    requestAnimationFrame(() => lightboxCloseBtnRef.current?.focus());
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
        className="pointer-events-none absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded border border-[rgb(var(--g200))] bg-[rgb(var(--bg)/0.9)] text-[rgb(var(--ink))] shadow-sm transition-transform group-hover:scale-105 group-hover:text-[rgb(var(--accent))]"
      >
        <Maximize2 size={13} />
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

        <div className="flex flex-wrap items-center gap-4" role="navigation" aria-label="Switch project case study">
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
      <header className="mt-8 border-b border-[rgb(var(--g200))] pb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
            {currentProject.featured ? 'Flagship Case Study' : 'Project Case Study'}
          </span>
          <span className="hidden font-mono text-xs text-[rgb(var(--g400))] sm:inline" aria-hidden="true">·</span>
          <span className="micro-label">{currentProject.category}</span>
          <span className="hidden font-mono text-xs text-[rgb(var(--g400))] sm:inline" aria-hidden="true">·</span>
          <span className="micro-label">{p.name}</span>
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
            <span className="micro-label block">Project Duration</span>
            <strong className="mt-1 block text-[rgb(var(--ink))] font-medium">{detail.overview.duration}</strong>
          </div>
          <div className="py-2 sm:px-4">
            <span className="micro-label block">My Role</span>
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

      {/* Preview of Selected Polished Designs */}
      <div className="mt-8">
        <ProjectVisual project={currentProject} category={currentProject.category} />
      </div>

      {/* Table of Contents Jump Bar */}
      <nav
        aria-label="Case study contents"
        className="mt-8 flex flex-wrap items-center gap-2 border-y border-[rgb(var(--g200))] py-3 font-mono text-[11px]"
      >
        <span className="micro-label mr-2 text-[rgb(var(--accent))]">CONTENTS:</span>
        {tocItems.map((item, idx) => (
          <span key={item.id} className="inline-flex items-center gap-2">
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

      <div className="mt-10 divide-y divide-[rgb(var(--g200))]">
        {/* 01 PROJECT OVERVIEW */}
        <section id="case-study-overview" className="scroll-mt-24 py-8">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="section-index-badge">01</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Project Overview</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">The Product</h3>
              <p className="mt-1.5 case-prose">{detail.overview.product}</p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">Target Users</h3>
              <p className="mt-1.5 case-prose">{detail.overview.targetUsers}</p>
              {detail.overview.teamContext && (
                <p className="mt-2 font-mono text-[11.5px] text-[rgb(var(--g500))]">
                  Team Context: {detail.overview.teamContext}
                </p>
              )}
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">The Problem</h3>
              <p className="mt-1.5 case-prose">{detail.overview.problem}</p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">The Goal</h3>
              <p className="mt-1.5 case-prose">{detail.overview.goal}</p>
            </div>
          </div>

          {/* My Role & Responsibilities */}
          <div id="case-study-roles" className="mt-8 border-t border-[rgb(var(--g200))] pt-6">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-pixel text-base font-bold text-[rgb(var(--ink))]">
                My Role &amp; Responsibilities
              </h3>
              <span className="micro-label">PM · Lead Dev · QA · Requirements Analysis</span>
            </div>
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
          </div>
        </section>

        {/* 02 UNDERSTANDING THE USER */}
        <section id="case-study-understanding" className="scroll-mt-24 py-8">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="section-index-badge">02</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Understanding the User</h2>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              User Research: Summary
            </h3>
            <p className="mt-1.5 case-prose">{detail.understanding.researchSummary}</p>
          </div>

          {/* Pain Points 1-4 */}
          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              User Research: Pain Points
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {detail.understanding.painPoints.map((pp, i) => (
                <div key={pp.title} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4">
                  <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">
                    0{i + 1} · PAIN POINT
                  </span>
                  <h4 className="mt-1 text-[14.5px] font-semibold text-[rgb(var(--ink))]">{pp.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[rgb(var(--g600))]">{pp.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Persona Card */}
          {persona && (
            <div
              className="mt-6 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5"
              aria-label={`Illustrative Target Persona: ${persona.name}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgb(var(--g200))] pb-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] font-pixel text-sm font-bold text-[rgb(var(--accent))]"
                    aria-hidden="true"
                  >
                    {persona.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <span className="micro-label text-[rgb(var(--accent))]">Illustrative Target Persona</span>
                    <h3 className="text-[16px] font-semibold text-[rgb(var(--ink))]">{persona.name}</h3>
                    <p className="font-mono text-[11px] text-[rgb(var(--g500))]">{persona.demographics}</p>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] text-[rgb(var(--g600))] sm:grid-cols-3">
                  {persona.age && <div><dt className="inline text-[rgb(var(--g400))]">Age:</dt> <dd className="inline">{persona.age}</dd></div>}
                  {persona.education && <div><dt className="inline text-[rgb(var(--g400))]">Education:</dt> <dd className="inline">{persona.education}</dd></div>}
                  {persona.hometown && <div><dt className="inline text-[rgb(var(--g400))]">Hometown:</dt> <dd className="inline">{persona.hometown}</dd></div>}
                  {persona.family && <div><dt className="inline text-[rgb(var(--g400))]">Family:</dt> <dd className="inline">{persona.family}</dd></div>}
                  {persona.occupation && <div><dt className="inline text-[rgb(var(--g400))]">Occupation:</dt> <dd className="inline">{persona.occupation}</dd></div>}
                </dl>
              </div>

              <blockquote className="mt-4 flex items-start gap-2.5 font-serif-ui italic text-[14.5px] leading-relaxed text-[rgb(var(--ink))]">
                <Quote size={16} className="mt-1 shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
                <p>“{persona.quote}”</p>
              </blockquote>

              {persona.scenario && (
                <p className="mt-3 border-l-2 border-[rgb(var(--accent))] pl-3 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
                  {persona.scenario}
                </p>
              )}

              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[rgb(var(--g200))] pt-4 sm:grid-cols-3">
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                    <Target size={13} aria-hidden="true" />
                    <span>Goals</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-4 text-[12.5px] leading-relaxed text-[rgb(var(--g600))]">
                    {persona.goals.map((g, i) => <li key={i}>{g}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                    <AlertCircle size={13} aria-hidden="true" />
                    <span>Frustrations</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-4 text-[12.5px] leading-relaxed text-[rgb(var(--g600))]">
                    {persona.painPoints.map((pain, i) => <li key={i}>{pain}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
                    <Sparkles size={13} aria-hidden="true" />
                    <span>Tech Habits</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 pl-4 text-[12.5px] leading-relaxed text-[rgb(var(--g600))]">
                    {persona.techHabits.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Problem Statement */}
          <div className="mt-6 border-l-2 border-[rgb(var(--accent))] bg-[rgb(var(--surface))] p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Problem Statement
            </h3>
            <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-[rgb(var(--ink))]">
              {detail.understanding.problemStatement}
            </p>
          </div>

          {/* User Journey Map (Cards on Mobile, Table on Desktop) */}
          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              User Journey Map
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:hidden">
              {detail.understanding.journeyMap.map((step) => (
                <div key={step.stage} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-3.5 text-[12.5px]">
                  <strong className="block font-mono text-[12px] text-[rgb(var(--ink))]">{step.stage}</strong>
                  <p className="mt-1.5 text-[rgb(var(--g600))]"><span className="font-semibold">Action:</span> {step.action}</p>
                  <p className="mt-1 text-[rgb(var(--g600))]"><span className="font-semibold">Feelings:</span> {step.feelings}</p>
                  <p className="mt-1 text-[rgb(var(--g600))]"><span className="font-semibold">Pain Points:</span> {step.painPoints}</p>
                  <p className="mt-1 text-[rgb(var(--accent))]"><span className="font-semibold">Opportunities:</span> {step.opportunities}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 hidden overflow-x-auto border border-[rgb(var(--g200))] sm:block">
              <table className="w-full border-collapse text-left text-[12.5px]">
                <thead className="border-b border-[rgb(var(--g200))] bg-[rgb(var(--surface))] font-mono text-[11px] uppercase text-[rgb(var(--ink))]">
                  <tr>
                    <th className="p-3">Stage</th>
                    <th className="p-3">User Action</th>
                    <th className="p-3">Feelings</th>
                    <th className="p-3">Pain Points</th>
                    <th className="p-3">Opportunities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgb(var(--g200))] text-[rgb(var(--g600))]">
                  {detail.understanding.journeyMap.map((step) => (
                    <tr key={step.stage} className="align-top">
                      <td className="p-3 font-mono text-[11.5px] font-semibold text-[rgb(var(--ink))]">{step.stage}</td>
                      <td className="p-3">{step.action}</td>
                      <td className="p-3">{step.feelings}</td>
                      <td className="p-3">{step.painPoints}</td>
                      <td className="p-3 text-[rgb(var(--ink))]">{step.opportunities}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 03 STARTING THE DESIGN */}
        <section id="case-study-starting" className="scroll-mt-24 py-8">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="section-index-badge">03</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Starting the Design</h2>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Early Layout Exploration
            </h3>
            <p className="mt-1.5 case-prose">{detail.startingDesign.paperWireframesNote}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Low-Fidelity Prototype &amp; User Flow
            </h3>
            <p className="mt-1.5 case-prose">{detail.startingDesign.lofiPrototype.description}</p>
            {detail.startingDesign.lofiPrototype.image && (
              <div className="mt-3 overflow-hidden border border-[rgb(var(--g200))] bg-[rgb(var(--surface))]">
                {renderZoomableImage(
                  detail.startingDesign.lofiPrototype.image,
                  detail.startingDesign.lofiPrototype.alt || `${currentProject.name} low-fidelity prototype user flow`,
                  `${currentProject.name} Low-Fidelity Prototype & User Flow`,
                  'block h-auto w-full'
                )}
              </div>
            )}
            {detail.startingDesign.lofiPrototype.url && (
              <div className="mt-3">
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

          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Usability Study: Findings
            </h3>
            <p className="mt-1.5 case-prose">{detail.startingDesign.usabilityStudy.intro}</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4">
                <h4 className="font-mono text-[11.5px] font-semibold uppercase text-[rgb(var(--ink))]">
                  Round 1 Findings
                </h4>
                <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
                  {detail.startingDesign.usabilityStudy.round1.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
              </div>
              <div className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4">
                <h4 className="font-mono text-[11.5px] font-semibold uppercase text-[rgb(var(--ink))]">
                  Round 2 Findings
                </h4>
                <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
                  {detail.startingDesign.usabilityStudy.round2.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 04 REFINING THE DESIGN */}
        <section id="case-study-refining" className="scroll-mt-24 py-8">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="section-index-badge">04</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Refining the Design</h2>
          </div>

          <div className="space-y-5">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Mockups: Before &amp; After Usability Study
            </h3>
            {detail.refiningDesign.mockupsBeforeAfter.map((comp) => (
              <div key={comp.title} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4">
                <h4 className="text-[14.5px] font-semibold text-[rgb(var(--ink))]">{comp.title}</h4>
                <p className="mt-1 text-[13px] text-[rgb(var(--g600))]">{comp.notes}</p>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
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

          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Main Mockup Screens
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <figcaption className="p-3.5">
                      <span className="font-mono text-[10.5px] text-[rgb(var(--accent))]">MOCKUP 0{i + 1}</span>
                      <p className="mt-1 text-[13px] font-medium text-[rgb(var(--ink))]">{item.title}</p>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              High-Fidelity Prototype &amp; Live Build
            </h3>
            <p className="mt-1.5 case-prose">{detail.refiningDesign.hifiNote}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Accessibility Considerations
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {detail.refiningDesign.accessibilityConsiderations.map((item, i) => (
                <div key={i} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4">
                  <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">0{i + 1}</span>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[rgb(var(--g600))]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 GOING FORWARD */}
        <section id="case-study-forward" className="scroll-mt-24 py-8">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="section-index-badge">05</span>
            <h2 className="font-pixel text-lg font-bold text-[rgb(var(--ink))]">Going Forward</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Takeaways: Impact
              </h3>
              <p className="mt-1.5 case-prose">{detail.goingForward.impact}</p>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Takeaways: What I Learned
              </h3>
              <p className="mt-1.5 case-prose">{detail.goingForward.whatILearned}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
              Next Steps
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {detail.goingForward.nextSteps.map((step, i) => (
                <div key={i} className="border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4">
                  <span className="font-mono text-[11px] font-semibold text-[rgb(var(--accent))]">0{i + 1}</span>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[rgb(var(--g600))]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Let's Connect */}
          <div className="mt-6 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5">
            <h3 className="font-pixel text-base font-bold text-[rgb(var(--ink))]">
              Let&apos;s Connect!
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
              Thanks for reading through the {currentProject.name} case study. If you want to talk through the design choices or check out what I’m building next, reach out below:
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[12px]">
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
      <section className="mt-4 border-t border-[rgb(var(--g200))] pt-6">
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
          {currentProject.repository ? (
            <a
              href={currentProject.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="bryl-btn-secondary"
            >
              <Github size={14} aria-hidden="true" />
              <span>View Repository</span>
            </a>
          ) : (
            <span className="inline-flex min-h-[40px] items-center border border-dashed border-[rgb(var(--g300))] px-3 font-mono text-[11.5px] text-[rgb(var(--g400))]">
              Team-hosted repo (link pending)
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
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

console.assert(
  p.skills.length >= 4 &&
    p.roles.length === 4 &&
    projects.length >= 3 &&
    projects.slice(0, 3).every((item) => Boolean(item.caseStudyDetail)),
  'Portfolio data self-check failed'
);
