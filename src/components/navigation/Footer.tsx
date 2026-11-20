import { ArrowUpRight } from 'lucide-react';
import { portfolio as p } from '../../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--g200))] py-9 font-mono text-[11.5px] text-[rgb(var(--g500))] sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-bold text-[rgb(var(--accent))]">gk.</span>
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
          <span className="text-[rgb(var(--g300))]" aria-hidden="true">
            ·
          </span>
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
  );
}
