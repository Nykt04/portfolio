import { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, X, Orbit } from 'lucide-react';
import { portfolio as p } from './portfolio';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  active: string;
  isCaseStudy: boolean;
  paused: boolean;
  setPaused: (v: boolean) => void;
}

const navItems = [
  { id: 'home', label: 'Home', tag: '01' },
  { id: 'about', label: 'About', tag: '02' },
  { id: 'toolkit', label: 'Toolkit', tag: '03' },
  { id: 'work', label: 'Selected Work', tag: '04' },
  { id: 'approach', label: 'Approach', tag: '05' },
  { id: 'case-study', label: 'Case Study', tag: '06' },
  { id: 'contact', label: 'Contact', tag: '07' },
];

export default function NavDrawer({ isOpen, onClose, active, isCaseStudy, paused, setPaused }: NavDrawerProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close menu
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Trap focus or focus on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="nav-drawer-overlay" onClick={onClose} aria-hidden={!isOpen}>
      <aside
        ref={drawerRef}
        className="nav-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation menu"
        onClick={e => e.stopPropagation()}
      >
        <div className="nav-drawer-header">
          <div className="nav-drawer-brand">
            <span className="brand-dot" aria-hidden="true" />
            <span className="brand-telemetry">GK // NAV SYSTEM</span>
          </div>
          <button
            ref={closeBtnRef}
            className="nav-drawer-close"
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <span className="close-text">CLOSE</span>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="nav-drawer-links" aria-label="Main menu">
          {navItems.map((item, index) => {
            const isSelected = item.id === 'case-study' ? isCaseStudy : (!isCaseStudy && active === item.id);
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`drawer-link ${isSelected ? 'is-active' : ''}`}
                style={{ '--idx': index } as React.CSSProperties}
                aria-current={isSelected ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="drawer-link-tag" aria-hidden="true">{item.tag}</span>
                <span className="drawer-link-label">{item.label}</span>
                <ArrowUpRight className="drawer-link-arrow" size={24} aria-hidden="true" />
              </a>
            );
          })}
        </nav>

        <div className="nav-drawer-footer">
          <div className="drawer-footer-status">
            <span className="status-ping" aria-hidden="true" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <div className="drawer-footer-actions">
            <button
              className="drawer-motion-btn"
              type="button"
              aria-pressed={!paused}
              onClick={() => setPaused(!paused)}
            >
              <Orbit size={15} aria-hidden="true" />
              <span>Motion: {paused ? 'Paused' : 'Active'}</span>
            </button>

            <div className="drawer-socials">
              {p.contact.github && (
                <a href={p.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={18} aria-hidden="true" />
                </a>
              )}
              {p.contact.linkedin && (
                <a href={p.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              )}
              {p.contact.email && (
                <a href={`mailto:${p.contact.email}`} aria-label="Email Gian Karlo">
                  <Mail size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
