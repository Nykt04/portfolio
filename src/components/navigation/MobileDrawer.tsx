import { useEffect, useRef, type MutableRefObject, type ReactNode, type RefObject } from 'react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onResizeClose: () => void;
  drawerRef: RefObject<HTMLElement | null>;
  menuBtnRef: RefObject<HTMLButtonElement | null>;
  closeDrawerBtnRef: RefObject<HTMLButtonElement | null>;
  restoreFocusRef: MutableRefObject<boolean>;
  children: ReactNode;
}

export function MobileDrawer({
  isOpen,
  onClose,
  onResizeClose,
  drawerRef,
  menuBtnRef,
  closeDrawerBtnRef,
  restoreFocusRef,
  children,
}: MobileDrawerProps) {
  const scrollYRef = useRef<number | null>(null);
  const onResizeCloseRef = useRef(onResizeClose);
  onResizeCloseRef.current = onResizeClose;

  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      scrollYRef.current = window.scrollY;
      document.documentElement.style.overflowY = 'hidden';
      setTimeout(() => closeDrawerBtnRef.current?.focus({ preventScroll: true }), 30);
    } else {
      document.documentElement.style.overflowY = '';
      const savedY = scrollYRef.current;
      scrollYRef.current = null;
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;
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
      if (window.innerWidth >= 1024 && isOpen) {
        restoreFocusRef.current = false;
        scrollYRef.current = null;
        onResizeCloseRef.current();
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      document.documentElement.style.overflowY = '';
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen, closeDrawerBtnRef, menuBtnRef, restoreFocusRef]);

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
