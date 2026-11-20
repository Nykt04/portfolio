import type { ReactNode, RefObject } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}

export function MobileDrawer({ isOpen, onClose, drawerRef, children }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="side-drawer-backdrop lg:hidden" onClick={onClose}>
      <aside
        ref={drawerRef}
        id="side-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="side-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </aside>
    </div>
  );
}
