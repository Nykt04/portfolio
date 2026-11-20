import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  FolderGit2,
  Home,
  Lock,
  Mail,
  RefreshCw,
  ServerCrash,
  WifiOff,
} from 'lucide-react';
import { ERROR_CATALOG, ERROR_JUMP_ITEMS } from '../../data/errors';
import { portfolio as p, projects } from '../../data/portfolio';
import type { ErrorCode } from '../../types/portfolio';

function getErrorIcon(code: ErrorCode) {
  switch (code) {
    case '403':
      return Lock;
    case '500':
      return ServerCrash;
    case '503':
      return WifiOff;
    case '404':
    default:
      return AlertTriangle;
  }
}

export function ErrorPageView({
  code,
  requestedUri,
  errorMessage,
  onReset,
}: {
  code: ErrorCode;
  requestedUri?: string;
  errorMessage?: string;
  onReset?: () => void;
}) {
  const info = ERROR_CATALOG[code] || ERROR_CATALOG['404'];
  const Icon = getErrorIcon(info.code);
  const currentUri =
    requestedUri ||
    (typeof window !== 'undefined'
      ? `${window.location.pathname}${window.location.hash}`
      : `/${info.code}`);

  const handleNavigate = (targetHash: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.replaceState(null, '', `/${targetHash}`);
    }
    onReset?.();
  };

  return (
    <section
      aria-labelledby="error-page-title"
      className="mx-auto max-w-4xl px-4 pt-6 pb-16 sm:px-8 sm:pt-12 sm:pb-24"
    >
      <div className="flex flex-col items-start gap-2.5 border-b border-[rgb(var(--g200))] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-5">
        <div className="inline-flex items-center gap-2">
          <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))] sm:text-[11px]">
            {info.badge}
          </span>
        </div>

        <a
          href="#home"
          onClick={() => handleNavigate('#home')}
          className="inline-flex min-h-[36px] items-center gap-1.5 font-mono text-[12px] text-[rgb(var(--accent))] hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>return to portfolio home</span>
        </a>
      </div>

      <div className="mt-6 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 sm:mt-10 sm:p-10">
        <div className="border-b border-[rgb(var(--g200))] pb-5 sm:pb-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="micro-label block text-[rgb(var(--accent))]">{info.statusText}</span>
              <span className="mt-2 block font-pixel text-4xl font-bold leading-none tracking-tight text-[rgb(var(--accent))] sm:text-5xl">
                {info.code}
              </span>
            </div>

            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] text-[rgb(var(--accent))] sm:h-12 sm:w-12"
              aria-hidden="true"
            >
              <Icon size={20} strokeWidth={1.75} className="sm:h-[22px] sm:w-[22px]" />
            </div>
          </div>

          <h1
            id="error-page-title"
            className="mt-3.5 font-pixel text-xl font-bold leading-snug tracking-tight text-[rgb(var(--ink))] sm:mt-4 sm:text-3xl sm:leading-tight"
          >
            {info.title}
          </h1>
        </div>

        <p className="mt-5 max-w-prose text-[14.5px] font-medium leading-relaxed text-[rgb(var(--ink))] sm:mt-6 sm:text-[15.5px]">
          {info.summary}
        </p>
        <p className="mt-2.5 max-w-prose text-[13.5px] leading-relaxed text-[rgb(var(--g600))] sm:text-[14px]">
          {info.detail}
        </p>

        <div
          role="status"
          aria-live="polite"
          className="mt-5 border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] px-3.5 py-3 font-mono text-[11.5px] text-[rgb(var(--g500))] sm:mt-6 sm:px-4"
        >
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="min-w-0 break-all">
              <strong className="text-[rgb(var(--ink))]">Requested Route:</strong>{' '}
              <code className="break-all">{currentUri}</code>
            </span>
            <span className="shrink-0">
              <strong className="text-[rgb(var(--ink))]">Status:</strong> {info.code}
            </span>
          </div>
          {errorMessage && (
            <p className="mt-2 break-words border-t border-[rgb(var(--g200))] pt-2 text-[rgb(var(--accent))]">
              Diagnostic: {errorMessage}
            </p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <a
            href="#home"
            onClick={() => handleNavigate('#home')}
            className="bryl-btn-primary w-full sm:w-auto"
          >
            <Home size={14} aria-hidden="true" />
            <span>Return to Home</span>
          </a>

          <a
            href="#work"
            onClick={() => handleNavigate('#work')}
            className="bryl-btn-secondary w-full sm:w-auto"
          >
            <FolderGit2 size={14} aria-hidden="true" />
            <span>Explore Projects</span>
          </a>

          {info.code === '403' ? (
            <a
              href="#case-study?p=project-3"
              onClick={() => handleNavigate('#case-study?p=project-3')}
              className="bryl-btn-secondary w-full sm:w-auto"
            >
              <BookOpen size={14} aria-hidden="true" />
              <span>Read Check8 Case Study</span>
            </a>
          ) : (
            <a
              href="#contact"
              onClick={() => handleNavigate('#contact')}
              className="bryl-btn-secondary w-full sm:w-auto"
            >
              <Mail size={14} aria-hidden="true" />
              <span>Contact {p.shortName}</span>
            </a>
          )}

          {onReset && (info.code === '500' || Boolean(errorMessage)) && (
            <button
              type="button"
              onClick={() => {
                handleNavigate('#home');
                window.location.hash = '#home';
              }}
              className="bryl-btn-secondary w-full sm:w-auto"
            >
              <RefreshCw size={14} aria-hidden="true" />
              <span>Reset View</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <h2 className="micro-label mb-3.5 sm:mb-4">Verified Portfolio Destinations</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {projects.map((proj) => (
            <a
              key={proj.id}
              href={proj.caseStudy}
              onClick={() => handleNavigate(proj.caseStudy)}
              className="group flex flex-col justify-between border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-4 transition-colors hover:border-[rgb(var(--accent))] sm:p-5"
            >
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                  {proj.featured ? 'Flagship Case Study' : 'Project Case Study'}
                </span>
                <strong className="mt-1.5 block font-display-ui text-base font-bold text-[rgb(var(--ink))]">
                  {proj.name}
                </strong>
                <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--g500))]">{proj.category}</p>
              </div>
              <span className="mt-3.5 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[rgb(var(--accent))] group-hover:underline sm:mt-4">
                <span>Open Case Study</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>

      <nav
        aria-label="Error pages preview switcher"
        className="mt-8 border-y border-[rgb(var(--g200))] py-4 font-mono text-[11.5px] sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-3"
      >
        <span className="micro-label mb-3 block text-[rgb(var(--g400))] sm:mb-0">ERROR STATES:</span>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
          {ERROR_JUMP_ITEMS.map((item) => {
            const active = item.code === info.code;
            const label =
              item.code === '404'
                ? 'Not Found'
                : item.code === '403'
                  ? 'Restricted'
                  : item.code === '500'
                    ? 'Server Fault'
                    : 'Unavailable';
            return (
              <a
                key={item.code}
                href={item.hash}
                aria-current={active ? 'page' : undefined}
                onClick={() => handleNavigate(item.hash)}
                className={`flex min-h-[40px] items-center justify-center border px-2.5 py-1.5 text-center transition-colors sm:min-h-0 sm:justify-start sm:border-0 sm:px-0 sm:py-1 ${
                  active
                    ? 'border-[rgb(var(--accent))] bg-[rgb(var(--surface))] font-semibold text-[rgb(var(--accent))] sm:bg-transparent sm:underline sm:decoration-[rgb(var(--accent))] sm:decoration-2 sm:underline-offset-4'
                    : 'border-[rgb(var(--g200))] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
                }`}
              >
                {item.code} · {label}
              </a>
            );
          })}
        </div>
      </nav>
    </section>
  );
}
