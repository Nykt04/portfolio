import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import CaseStudyView from './components/case-study/CaseStudyView';
import { ErrorPageView } from './components/errors/ErrorPageView';
import { PortfolioErrorBoundary } from './components/errors/PortfolioErrorBoundary';
import { Footer } from './components/navigation/Footer';
import { Header } from './components/navigation/Header';
import { MobileDrawer } from './components/navigation/MobileDrawer';
import { QuickJumpModal } from './components/navigation/QuickJumpModal';
import { SideNav } from './components/navigation/SideNav';
import { AboutSection } from './components/sections/AboutSection';
import CertificationsSection from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { GitHubSection } from './components/sections/GitHubSection';
import { HeroSection } from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import { ToolkitSection } from './components/sections/ToolkitSection';
import { allSectionIds, navItems } from './data/navigation';
import { useActiveSection } from './hooks/useActiveSection';
import { useHashRoute } from './hooks/useHashRoute';
import { useScrollReveal } from './hooks/useScrollReveal';
import { trapTabKey } from './utils/focusTrap';

export default function App() {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [caseMenuOpen, setCaseMenuOpen] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash.startsWith('#case-study') : false,
  );
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');

  const mainRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const closeDrawerBtnRef = useRef<HTMLButtonElement>(null);
  const quickModalRef = useRef<HTMLDivElement>(null);
  const quickInputRef = useRef<HTMLInputElement>(null);
  const quickTriggerRef = useRef<HTMLElement | null>(null);
  const restoreDrawerFocusRef = useRef(false);

  const handleRouteTransition = useCallback((nextIsCase: boolean) => {
    if (nextIsCase) setCaseMenuOpen(true);
    restoreDrawerFocusRef.current = false;
    setNavDrawerOpen(false);
    setQuickJumpOpen(false);
  }, []);

  const {
    routeError,
    setRouteError,
    isCaseStudy,
    setIsCaseStudy,
    caseStudyId,
    setCaseStudyId,
  } = useHashRoute(mainRef, handleRouteTransition);

  const activeSection = useActiveSection(allSectionIds, !isCaseStudy && !routeError);
  useScrollReveal(mainRef, `${isCaseStudy}-${caseStudyId}-${routeError ?? ''}`);

  const closeNavDrawer = (returnFocus = false) => {
    restoreDrawerFocusRef.current = returnFocus;
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

  const openQuickJump = (trigger: HTMLElement | null) => {
    quickTriggerRef.current = trigger ?? menuBtnRef.current;
    closeNavDrawer(false);
    setQuickQuery('');
    setQuickJumpOpen(true);
  };

  // Global keyboard shortcuts: Alt+K / Cmd+K Quick Jump, Escape closes overlays, Tab traps active overlay
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.altKey || e.ctrlKey) && e.code === 'KeyK') {
        e.preventDefault();
        restoreDrawerFocusRef.current = false;
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
        if (quickJumpOpen) closeQuickJump();
        else if (navDrawerOpen) closeNavDrawer(true);
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
    if (quickJumpOpen) {
      setTimeout(() => quickInputRef.current?.focus(), 30);
    }
  }, [quickJumpOpen]);

  const activeNavItem = routeError
    ? { id: 'error', label: `Error ${routeError}`, num: 'ERR', Icon: AlertTriangle }
    : isCaseStudy
      ? navItems.find((item) => item.isCaseLink) || navItems[2]
      : navItems.find((item) => item.id === activeSection) || navItems[0];

  const sideNavProps = {
    activeSection,
    isCaseStudy,
    caseStudyId,
    caseMenuOpen,
    onToggleCaseMenu: () => setCaseMenuOpen((open) => !open),
    onSelectCaseStudy: (id: string) => {
      setCaseStudyId(id);
      setIsCaseStudy(true);
    },
    onCloseDrawer: closeNavDrawer,
    onOpenQuickJump: openQuickJump,
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div aria-hidden="true" className="blueprint-backdrop pointer-events-none fixed inset-0 z-0" />

      <Header
        activeNavItem={activeNavItem}
        navDrawerOpen={navDrawerOpen}
        onToggleDrawer={() => setNavDrawerOpen((v) => !v)}
        menuBtnRef={menuBtnRef}
      />

      <aside
        aria-label="Site navigation"
        className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:flex lg:w-64 lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-l lg:border-[rgb(var(--g200))] lg:bg-[rgb(var(--bg)/0.94)] lg:px-5 lg:py-6 lg:backdrop-blur-md"
      >
        <SideNav isDrawer={false} {...sideNavProps} />
      </aside>

      <MobileDrawer
        isOpen={navDrawerOpen}
        onClose={() => closeNavDrawer(true)}
        onResizeClose={() => setNavDrawerOpen(false)}
        drawerRef={drawerRef}
        menuBtnRef={menuBtnRef}
        closeDrawerBtnRef={closeDrawerBtnRef}
        restoreFocusRef={restoreDrawerFocusRef}
      >
        <SideNav isDrawer closeDrawerBtnRef={closeDrawerBtnRef} {...sideNavProps} />
      </MobileDrawer>

      <main id="main" ref={mainRef} tabIndex={-1} className="relative lg:pr-64">
        <PortfolioErrorBoundary>
          {routeError ? (
            <ErrorPageView code={routeError} onReset={() => setRouteError(null)} />
          ) : isCaseStudy ? (
            <CaseStudyView projectId={caseStudyId} />
          ) : (
            <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
              <HeroSection />
              <ProjectsSection />
              <AboutSection />
              <ToolkitSection />
              <CertificationsSection />
              <GitHubSection />
              <ContactSection />
              <Footer />
            </div>
          )}
        </PortfolioErrorBoundary>
      </main>

      <QuickJumpModal
        isOpen={quickJumpOpen}
        query={quickQuery}
        onQueryChange={setQuickQuery}
        onClose={closeQuickJump}
        modalRef={quickModalRef}
        inputRef={quickInputRef}
      />
    </>
  );
}
