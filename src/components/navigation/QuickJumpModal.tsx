import type { RefObject } from 'react';
import { Search } from 'lucide-react';
import { ERROR_JUMP_ITEMS } from '../../data/errors';
import { navItems } from '../../data/navigation';
import { projects } from '../../data/portfolio';

interface QuickJumpModalProps {
  isOpen: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: (returnFocus?: boolean) => void;
  modalRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function QuickJumpModal({
  isOpen,
  query,
  onQueryChange,
  onClose,
  modalRef,
  inputRef,
}: QuickJumpModalProps) {
  if (!isOpen) return null;

  const q = query.toLowerCase();

  return (
    <div
      className="bryl-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(true);
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="bryl-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation and search"
      >
        <div className="flex items-center gap-2.5 border-b border-[rgb(var(--g200))] pb-3">
          <Search size={15} className="text-[rgb(var(--accent))]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Jump to section, case study, or error page (404, 403, 500, 503)..."
            aria-label="Filter navigation commands"
            className="w-full bg-transparent font-mono text-[13px] text-[rgb(var(--ink))] placeholder:text-[rgb(var(--g400))] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onClose(true)}
            className="px-1 font-mono text-[10.5px] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
          >
            ESC
          </button>
        </div>

        <div className="mt-4 max-h-72 space-y-4 overflow-y-auto font-mono text-[12px]">
          <div>
            <span className="micro-label mb-2 block">Sections</span>
            <div className="flex flex-col gap-1">
              {navItems
                .filter((item) => item.label.toLowerCase().includes(q))
                .map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => onClose(false)}
                    className="flex items-center justify-between px-2.5 py-2 text-[rgb(var(--ink))] hover:bg-[rgb(var(--g100))]"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10.5px] text-[rgb(var(--accent))]">{item.num}</span>
                  </a>
                ))}
            </div>
          </div>

          <div>
            <span className="micro-label mb-2 block">Project Case Studies</span>
            <div className="flex flex-col gap-1">
              {projects
                .filter(
                  (proj) =>
                    proj.name.toLowerCase().includes(q) || proj.category.toLowerCase().includes(q),
                )
                .map((proj) => (
                  <a
                    key={proj.id}
                    href={proj.caseStudy}
                    onClick={() => onClose(false)}
                    className="flex items-center justify-between px-2.5 py-2 text-[rgb(var(--ink))] hover:bg-[rgb(var(--g100))]"
                  >
                    <span>{proj.name}</span>
                    <span className="text-[10.5px] text-[rgb(var(--g400))]">{proj.category}</span>
                  </a>
                ))}
            </div>
          </div>

          <div>
            <span className="micro-label mb-2 block">System &amp; Error Pages</span>
            <div className="flex flex-col gap-1">
              {ERROR_JUMP_ITEMS.filter(
                (err) =>
                  err.code.includes(q) ||
                  err.statusText.toLowerCase().includes(q) ||
                  err.title.toLowerCase().includes(q) ||
                  'error'.includes(q),
              ).map((err) => (
                <a
                  key={err.code}
                  href={err.hash}
                  onClick={() => onClose(false)}
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
  );
}
