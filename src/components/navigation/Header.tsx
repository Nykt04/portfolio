import type { RefObject } from 'react';
import { Menu, X } from 'lucide-react';
import type { NavItem } from '../../data/navigation';
import { portfolio as p } from '../../data/portfolio';

interface HeaderProps {
  activeNavItem: Pick<NavItem, 'num' | 'label'>;
  navDrawerOpen: boolean;
  onToggleDrawer: () => void;
  menuBtnRef: RefObject<HTMLButtonElement | null>;
}

export function Header({
  activeNavItem,
  navDrawerOpen,
  onToggleDrawer,
  menuBtnRef,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(var(--g200))] bg-[rgb(var(--bg)/0.85)] backdrop-blur-md lg:mr-64">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
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

        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center font-mono text-[11px] lg:flex">
            <span className="text-[rgb(var(--g500))]">
              {activeNavItem.num} ·{' '}
              <strong className="font-medium text-[rgb(var(--ink))]">{activeNavItem.label}</strong>
            </span>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            aria-label={navDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={navDrawerOpen}
            aria-controls="side-nav-drawer"
            onClick={onToggleDrawer}
            className="inline-flex h-9 items-center gap-1.5 px-1 font-mono text-[12px] text-[rgb(var(--ink))] transition-colors hover:text-[rgb(var(--accent))] lg:hidden"
          >
            {navDrawerOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            <span>{navDrawerOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
