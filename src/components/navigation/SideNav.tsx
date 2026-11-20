import type { MouseEvent as ReactMouseEvent, RefObject } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Search, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { portfolio as p, projects } from '../../data/portfolio';
import { ThemeSwitcher } from '../common/ThemeSwitcher';

interface SideNavProps {
  isDrawer: boolean;
  activeSection: string;
  isCaseStudy: boolean;
  caseStudyId: string;
  caseMenuOpen: boolean;
  onToggleCaseMenu: () => void;
  onSelectCaseStudy: (projectId: string) => void;
  onCloseDrawer: (returnFocus?: boolean) => void;
  onOpenQuickJump: (trigger: HTMLElement | null) => void;
  closeDrawerBtnRef?: RefObject<HTMLButtonElement | null>;
}

export function SideNav({
  isDrawer,
  activeSection,
  isCaseStudy,
  caseStudyId,
  caseMenuOpen,
  onToggleCaseMenu,
  onSelectCaseStudy,
  onCloseDrawer,
  onOpenQuickJump,
  closeDrawerBtnRef,
}: SideNavProps) {
  const handleQuickJumpClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    onOpenQuickJump(isDrawer ? null : e.currentTarget);
  };

  return (
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
              onClick={() => onCloseDrawer(true)}
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
                    onClick={onToggleCaseMenu}
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
                              onSelectCaseStudy(proj.id);
                              if (isDrawer) onCloseDrawer(false);
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
                onClick={isDrawer ? () => onCloseDrawer(false) : undefined}
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
        <div className="mb-4 space-y-2.5 border-b border-[rgb(var(--g200))] pb-4">
          <button
            type="button"
            onClick={handleQuickJumpClick}
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
}
