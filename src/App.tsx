import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { flushSync } from 'react-dom';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  ChevronDown,
  Code2,
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
  ScanLine,
  Search,
  Sun,
  Terminal,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { portfolio as p, projects } from './portfolio';
import ProjectsSection from './Projects';
import { Portrait, Toolkit, techIcons } from './AboutExtras';
import CertificationsSection from './Certifications';
import CaseStudyView, { defaultFeaturedId, trapTabKey } from './CaseStudyView';
import { ContactSection, GitHubSection } from './ContactGitHub';
import {
  ERROR_CATALOG,
  ERROR_JUMP_ITEMS,
  ErrorPageView,
  PortfolioErrorBoundary,
  resolveRouteError,
  type ErrorCode,
} from './ErrorPages';

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
    body: 'I talk with students and staff to turn paper bottlenecks into simple features.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'UI/UX & Accessibility',
    question: 'Can you read and navigate every screen without guesswork?',
    detail: 'Wireframing · WCAG 2.2 AA · Typography & contrast',
    body: 'I map clear headings, keyboard navigation, and WCAG 2.2 AA contrast before coding.',
    Icon: PanelsTopLeft,
  },
  {
    num: '03',
    title: 'Full-Stack Implementation',
    question: 'How do your clicks connect cleanly to saved data?',
    detail: 'TypeScript · React / Next.js · Modular architecture',
    body: 'I build reusable TypeScript components and lean APIs that load fast on mobile.',
    Icon: Code2,
  },
  {
    num: '04',
    title: 'Quality Assurance & Testing',
    question: 'Does everything hold up when you tab, zoom, or lose signal?',
    detail: 'Cross-viewport checks · Keyboard sweeps · Edge-case fixes',
    body: 'I test across phones and laptops, tabbing through forms to catch edge cases early.',
    Icon: ScanLine,
  },
];

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

export default function App() {
  const [routeError, setRouteError] = useState<ErrorCode | null>(() =>
    typeof window !== 'undefined'
      ? resolveRouteError(window.location.pathname, window.location.hash)
      : null,
  );
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
  const drawerScrollYRef = useRef<number | null>(null);
  const restoreDrawerRef = useRef(false);

  const closeNavDrawer = (returnFocus = false) => {
    restoreDrawerRef.current = returnFocus;
    if (!returnFocus) drawerScrollYRef.current = null;
    setNavDrawerOpen(false);
  };

  const closeQuickJump = (returnFocus = true) => {
    setQuickJumpOpen(false);
    if (returnFocus) {
      const trigger = quickTriggerRef.current;
      quickTriggerRef.current = null;
      requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
    }
  };

  // Sync hash navigation (#case-study vs #home/#work/etc. and error routes)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (hash === '#main') return;
      const nextErr = resolveRouteError(window.location.pathname, hash);
      if (!nextErr && window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.replaceState(null, '', `/${hash}`);
      }
      const nextIsCase = !nextErr && hash.startsWith('#case-study');
      const pidMatch = hash.match(/[?&]p=([^&]+)/);
      if (!hash.startsWith('#case-study-')) {
        setCaseStudyId(pidMatch ? pidMatch[1] : defaultFeaturedId);
      }

      const viewChanged = nextIsCase !== priorView.current || Boolean(nextErr);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const applyState = () => {
        setRouteError(nextErr);
        setIsCaseStudy(nextIsCase);
        if (nextIsCase) setCaseMenuOpen(true);
        setNavDrawerOpen(false);
        setQuickJumpOpen(false);
      };

      if (viewChanged && document.startViewTransition && !reduceMotion) {
        document.startViewTransition(() => {
          flushSync(applyState);
          const targetId = hash.split('?')[0].slice(1);
          const target = !nextErr ? document.getElementById(targetId) : null;
          if (target) target.scrollIntoView({ behavior: 'instant' });
          else window.scrollTo({ top: 0, behavior: 'instant' });
        });
      } else {
        applyState();
        const targetId = hash.split('?')[0].slice(1);
        const target = !nextErr ? document.getElementById(targetId) : null;
        if (target) {
          target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
        } else if (viewChanged) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  // Update document title and scroll spy
  useEffect(() => {
    const currentProj = projects.find((item) => item.id === caseStudyId) || projects[0];
    document.title = routeError
      ? `${routeError} · ${ERROR_CATALOG[routeError].statusText} | ${p.shortName}`
      : isCaseStudy
        ? `${currentProj.name} · Case Study | ${p.shortName}`
        : `${p.name} · ${p.title}`;

    if (priorView.current !== isCaseStudy || routeError) {
      priorView.current = isCaseStudy;
      requestAnimationFrame(() => {
        const cleanId = window.location.hash.split('?')[0].slice(1);
        const target = !routeError ? document.getElementById(cleanId) : null;
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
        mainRef.current?.focus({ preventScroll: true });
      });
    }

    if (isCaseStudy || routeError) return;

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
  }, [isCaseStudy, caseStudyId, routeError]);

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
  }, [isCaseStudy, caseStudyId, routeError]);

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
      drawerScrollYRef.current = window.scrollY;
      document.documentElement.style.overflowY = 'hidden';
      setTimeout(() => closeDrawerBtnRef.current?.focus({ preventScroll: true }), 30);
    } else {
      document.documentElement.style.overflowY = '';
      const savedY = drawerScrollYRef.current;
      drawerScrollYRef.current = null;
      if (restoreDrawerRef.current) {
        restoreDrawerRef.current = false;
        if (savedY !== null && Math.abs(window.scrollY - savedY) > 1) {
          window.scrollTo({ top: savedY, behavior: 'instant' });
        }
        requestAnimationFrame(() => {
          if (savedY !== null && Math.abs(window.scrollY - savedY) > 1) {
            window.scrollTo({ top: savedY, behavior: 'instant' });
          }
          menuBtnRef.current?.focus({ preventScroll: true });
        });
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1024 && navDrawerOpen) {
        restoreDrawerRef.current = false;
        drawerScrollYRef.current = null;
        setNavDrawerOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      document.documentElement.style.overflowY = '';
      window.removeEventListener('resize', onResize);
    };
  }, [navDrawerOpen]);

  useEffect(() => {
    if (quickJumpOpen) {
      setTimeout(() => quickInputRef.current?.focus(), 30);
    }
  }, [quickJumpOpen]);

  const coreLogoSkills = ['Python', 'TypeScript', 'JavaScript', 'C'];
  const activeNavItem = routeError
    ? { id: 'error', label: `Error ${routeError}`, num: 'ERR', Icon: AlertTriangle }
    : isCaseStudy
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
          className="mt-5 flex flex-col gap-1.5 font-mono text-[12.5px]"
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
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
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
        className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:flex lg:w-64 lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-l lg:border-[rgb(var(--g200))] lg:bg-[rgb(var(--bg)/0.94)] lg:px-5 lg:py-6 lg:backdrop-blur-md"
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
      <main id="main" ref={mainRef} tabIndex={-1} className="relative lg:pr-64">
        <PortfolioErrorBoundary>
          {routeError ? (
            <ErrorPageView code={routeError} onReset={() => setRouteError(null)} />
          ) : isCaseStudy ? (
            <CaseStudyView projectId={caseStudyId} />
          ) : (
            <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
            {/* 00 - EDITORIAL HERO SECTION (Hairline Divided) */}
            <section
              id="home"
              className="relative pt-8 pb-11 sm:pt-11 sm:pb-12"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
                {/* Left 7-Column Editorial Hero */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    {/* Top Status Row */}
                    <div className="reveal d1 flex flex-wrap items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3.5 leading-none">
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
                    <div className="reveal d2 mt-7">
                      <h1 className="font-pixel text-3xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-[2.6rem] sm:leading-[1.08]">
                        {p.name}
                      </h1>
                      <p className="mt-2 font-mono text-[11.5px] font-medium uppercase tracking-wider text-[rgb(var(--accent))]">
                        Aspiring Web Developer &amp; Software Engineer
                      </p>
                    </div>

                    {/* Required AGENTS.md Introduction Quote (Editorial Serif Contrast) */}
                    <blockquote className="reveal d3 mt-6 max-w-prose border-l border-[rgb(var(--g300))] py-1 pl-4 font-serif-ui text-[16.5px] italic leading-relaxed text-[rgb(var(--ink))]">
                      “{p.introduction}”
                    </blockquote>

                    {/* Core Languages & Focus Pills */}
                    <p className="intro-copy reveal d4 mt-6 max-w-prose text-[14px]">
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
                    <div className="reveal d5 mt-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <a href="#work" className="bryl-btn-primary">
                          <span>Explore My Work</span>
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                        <a href="#contact" className="bryl-btn-secondary">
                          <span>Get in Touch</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </a>
                      </div>

                      <div className="flex items-center gap-4 font-mono text-[11.5px] text-[rgb(var(--g500))]">
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
                    className="reveal d6 mt-8 grid min-h-[64px] grid-cols-1 gap-4 border-t border-[rgb(var(--g200))] pt-5 sm:grid-cols-3 sm:items-center sm:gap-0 sm:divide-x sm:divide-[rgb(var(--g200))]"
                  >
                    <a href="#about" className="group block sm:pr-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        Academic Standing
                      </span>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          {p.course}
                        </span>
                      </div>
                    </a>

                    <a href="#about" className="group block sm:px-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        Core Competencies
                      </span>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          PM · Dev · QA · BA
                        </span>
                      </div>
                    </a>

                    <a href="#work" className="group block sm:pl-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                        Verified Systems
                      </span>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="font-pixel text-base sm:text-lg font-bold leading-none text-[rgb(var(--ink))]">
                          3 Shipped Apps
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right 5-Column Studio Portrait & Flagship Preview Bar */}
                <div className="flex flex-col justify-between gap-5 border-t border-[rgb(var(--g200))] pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <Portrait className="flex-1" />
                  <a
                    href={projects[0].caseStudy}
                    className="group flex min-h-[64px] items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-5 transition-colors hover:border-[rgb(var(--accent))]"
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
                          QR-powered clearance for Gordon College, College of Computer Studies
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
              className="relative border-t border-[rgb(var(--g200))] py-11 sm:py-12"
              aria-labelledby="about-title"
            >
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 sm:mb-7">
                <div className="flex items-baseline gap-2.5">
                  <span className="section-index-badge">02</span>
                  <h2 id="about-title" className="section-index-title">
                    About &amp; Responsibilities
                  </h2>
                </div>
                <span className="micro-label">background · team roles · process</span>
              </div>

              {/* 2-Column Bio + Academic Background (Divided by Vertical Hairline on Desktop) */}
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
                          <GraduationCap size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[rgb(var(--accent))]" />
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

              {/* Areas of Project Responsibility (Divided by Hairlines) */}
              <div className="mt-14">
                <h3 className="micro-label mb-4">Areas of Project Responsibility</h3>

                <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
                  {p.roles.map((role, idx) => (
                    <div
                      key={role.title}
                      className="py-6 sm:px-5 lg:first:pl-0 lg:last:pr-0"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10.5px] font-medium text-[rgb(var(--g400))]">
                          0{idx + 1}
                        </span>
                        <h4 className="font-pixel text-[14px] font-bold text-[rgb(var(--ink))]">
                          {role.title}
                        </h4>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-[rgb(var(--g500))]">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering & UI/UX Workflow Interactive Blueprint (Hairline Divided) */}
              <div className="mt-14">
                <div className="mb-5 flex items-baseline justify-between">
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
                        className={`border-b-2 px-4 py-4 text-left transition-colors ${
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
                        <span className="mt-1.5 block text-[13px] font-semibold leading-snug">
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
                      className="grid grid-cols-1 gap-6 pt-7 lg:grid-cols-12 lg:items-stretch"
                    >
                      <div className="flex flex-col justify-center lg:col-span-5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
                          {step.detail}
                        </span>
                        <h4 className="mt-2 font-pixel text-lg font-bold leading-snug text-[rgb(var(--ink))]">
                          {step.question}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between gap-4 lg:col-span-7 lg:border-l lg:border-[rgb(var(--g200))] lg:pl-8">
                        <p className="max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
                          {step.body}
                        </p>
                        <StepIcon size={18} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
                      </div>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* 03 - STACK & SKILLS SECTION */}
            <section
              id="toolkit"
              className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
              aria-labelledby="toolkit-title"
            >
              <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2 sm:mb-8">
                <div className="flex items-baseline gap-2.5">
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
            <footer className="border-t border-[rgb(var(--g200))] py-9 font-mono text-[11.5px] text-[rgb(var(--g500))] sm:py-10">
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
                <div className="flex items-center gap-4">
                  <a
                    href="#404"
                    className="text-[rgb(var(--g400))] hover:text-[rgb(var(--accent))]"
                    aria-label="Preview custom HTTP error pages (404, 403, 500, 503)"
                  >
                    status &amp; error pages
                  </a>
                  <span className="text-[rgb(var(--g300))]" aria-hidden="true">·</span>
                  <a
                    href="#home"
                    className="inline-flex items-center gap-1 text-[rgb(var(--g500))] hover:text-[rgb(var(--accent))]"
                  >
                    <span>back to top</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </footer>
          </div>
          )}
        </PortfolioErrorBoundary>
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
                placeholder="Jump to section, case study, or error page (404, 403, 500, 503)..."
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
                        className="flex items-center justify-between px-2.5 py-2 text-[rgb(var(--ink))] hover:bg-[rgb(var(--g100))]"
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
                        className="flex items-center justify-between px-2.5 py-2 text-[rgb(var(--ink))] hover:bg-[rgb(var(--g100))]"
                      >
                        <span>{proj.name}</span>
                        <span className="text-[10.5px] text-[rgb(var(--g400))]">{proj.category}</span>
                      </a>
                    ))}
                </div>
              </div>

              <div>
                <span className="micro-label block mb-2">System &amp; Error Pages</span>
                <div className="flex flex-col gap-1">
                  {ERROR_JUMP_ITEMS.filter(
                    (err) =>
                      err.code.includes(quickQuery.toLowerCase()) ||
                      err.statusText.toLowerCase().includes(quickQuery.toLowerCase()) ||
                      err.title.toLowerCase().includes(quickQuery.toLowerCase()) ||
                      'error'.includes(quickQuery.toLowerCase()),
                  ).map((err) => (
                    <a
                      key={err.code}
                      href={err.hash}
                      onClick={() => closeQuickJump(false)}
                      className="flex items-center justify-between px-2.5 py-2 text-[rgb(var(--ink))] hover:bg-[rgb(var(--g100))]"
                    >
                      <span>{err.statusText}</span>
                      <span className="text-[10.5px] text-[rgb(var(--accent))]">ERR {err.code}</span>
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

console.assert(
  p.skills.length >= 4 &&
    p.roles.length === 4 &&
    projects.length >= 3 &&
    projects.slice(0, 3).every((item) => Boolean(item.caseStudyDetail)),
  'Portfolio data self-check failed'
);
