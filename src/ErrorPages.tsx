import { Component, type ErrorInfo, type ReactNode } from 'react';
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
import { portfolio as p, projects } from './portfolio';

export type ErrorCode = '404' | '403' | '500' | '503';

interface ErrorDescriptor {
  code: ErrorCode;
  badge: string;
  statusText: string;
  title: string;
  summary: string;
  detail: string;
  hash: string;
}

export const ERROR_CATALOG: Record<ErrorCode, ErrorDescriptor> = {
  '404': {
    code: '404',
    badge: 'ERR // 404 · NOT FOUND',
    statusText: 'HTTP 404 · Resource Not Found',
    title: 'Page or case study route not found.',
    summary:
      'The URL path, section anchor, or project identifier you requested does not match an active route in this portfolio.',
    detail:
      'Check the address bar for typos, jump directly to a verified section below, or press Alt+K to search all sections and case studies.',
    hash: '#404',
  },
  '403': {
    code: '403',
    badge: 'ERR // 403 · RESTRICTED ACCESS',
    statusText: 'HTTP 403 · Department-Restricted Resource',
    title: 'Restricted internal department system.',
    summary:
      'This resource is restricted to authorized accounts within Gordon College, College of Computer Studies.',
    detail:
      'Internal department repositories and live clearance endpoints (such as Check8) are private to protect student records. You can review the complete architectural & UX case study below.',
    hash: '#403',
  },
  '500': {
    code: '500',
    badge: 'ERR // 500 · APPLICATION FAULT',
    statusText: 'HTTP 500 · Unexpected Runtime Exception',
    title: 'Something went wrong while rendering this view.',
    summary:
      'An unexpected client or rendering exception interrupted the current view.',
    detail:
      'Reset the view state below to return cleanly to the portfolio home screen without losing your theme preference.',
    hash: '#500',
  },
  '503': {
    code: '503',
    badge: 'ERR // 503 · SERVICE UNAVAILABLE',
    statusText: 'HTTP 503 · External Service or Network Unavailable',
    title: 'External telemetry or network connection unavailable.',
    summary:
      'A third-party service or network connection could not be reached right now.',
    detail:
      'Core portfolio sections, project case studies, and cached GitHub contribution snapshots remain accessible offline.',
    hash: '#503',
  },
};

export const ERROR_JUMP_ITEMS = Object.values(ERROR_CATALOG);

const VALID_SECTIONS = new Set([
  'home',
  'work',
  'about',
  'toolkit',
  'certifications',
  'github',
  'contact',
  'main',
]);

export function resolveRouteError(pathname: string, hash: string): ErrorCode | null {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const cleanHash = hash.trim();
  const hashBase = cleanHash.split('?')[0].replace(/^#/, '').toLowerCase();

  // Explicit error hashes (#404, #403, #500, #503)
  if (hashBase === '404' || hashBase === 'not-found') return '404';
  if (hashBase === '403' || hashBase === 'forbidden' || hashBase === 'restricted') return '403';
  if (hashBase === '500' || hashBase === 'error') return '500';
  if (hashBase === '503' || hashBase === 'offline' || hashBase === 'unavailable') return '503';

  // Explicit error paths (/404, /403, /500, /503) when no valid section hash overrides
  if (!cleanHash) {
    if (cleanPath === '/403' || cleanPath === '/restricted') return '403';
    if (cleanPath === '/500') return '500';
    if (cleanPath === '/503' || cleanPath === '/offline') return '503';
    if (cleanPath !== '/' && cleanPath !== '/index.html') return '404';
  }

  if (!cleanHash) return null;

  // Validate #case-study and #case-study?p=<id>
  if (hashBase === 'case-study' || hashBase.startsWith('case-study-')) {
    const pidMatch = cleanHash.match(/[?&]p=([^&]+)/);
    if (pidMatch) {
      const pid = decodeURIComponent(pidMatch[1]);
      const exists = projects.some((item) => item.id === pid);
      if (!exists) return '404';
    }
    return null;
  }

  // Any other unrecognized hash anchor -> 404
  if (!VALID_SECTIONS.has(hashBase)) {
    return '404';
  }

  return null;
}

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
      className="mx-auto max-w-4xl px-5 pt-12 pb-24 sm:px-8"
    >
      {/* Top Status Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgb(var(--g200))] pb-5">
        <div className="inline-flex items-center gap-2.5">
          <span className="pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
            {info.badge}
          </span>
        </div>

        <a
          href="#home"
          onClick={() => handleNavigate('#home')}
          className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[rgb(var(--accent))] hover:underline"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>return to portfolio home</span>
        </a>
      </div>

      {/* Main Editorial Error Card */}
      <div className="mt-10 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-6 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgb(var(--g200))] pb-6">
          <div>
            <span className="micro-label block text-[rgb(var(--accent))]">{info.statusText}</span>
            <div className="mt-3 flex items-baseline gap-3.5">
              <span className="font-pixel text-4xl font-bold tracking-tight text-[rgb(var(--accent))] sm:text-5xl">
                {info.code}
              </span>
              <h1
                id="error-page-title"
                className="font-pixel text-2xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-3xl"
              >
                {info.title}
              </h1>
            </div>
          </div>

          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] text-[rgb(var(--accent))]"
            aria-hidden="true"
          >
            <Icon size={22} strokeWidth={1.75} />
          </div>
        </div>

        {/* Summary & Detail */}
        <p className="mt-6 max-w-prose text-[15.5px] font-medium leading-relaxed text-[rgb(var(--ink))]">
          {info.summary}
        </p>
        <p className="mt-2.5 max-w-prose text-[14px] leading-relaxed text-[rgb(var(--g600))]">
          {info.detail}
        </p>

        {/* Diagnostic Readout */}
        <div
          role="status"
          aria-live="polite"
          className="mt-6 border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] px-4 py-3 font-mono text-[11.5px] text-[rgb(var(--g500))]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong className="text-[rgb(var(--ink))]">Requested Route:</strong>{' '}
              <code>{currentUri}</code>
            </span>
            <span>
              <strong className="text-[rgb(var(--ink))]">Status:</strong> {info.code}
            </span>
          </div>
          {errorMessage && (
            <p className="mt-1.5 border-t border-[rgb(var(--g200))] pt-1.5 text-[rgb(var(--accent))]">
              Diagnostic: {errorMessage}
            </p>
          )}
        </div>

        {/* Primary Recovery Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#home"
            onClick={() => handleNavigate('#home')}
            className="bryl-btn-primary"
          >
            <Home size={14} aria-hidden="true" />
            <span>Return to Home</span>
          </a>

          <a
            href="#work"
            onClick={() => handleNavigate('#work')}
            className="bryl-btn-secondary"
          >
            <FolderGit2 size={14} aria-hidden="true" />
            <span>Explore Projects</span>
          </a>

          {info.code === '403' ? (
            <a
              href="#case-study?p=project-3"
              onClick={() => handleNavigate('#case-study?p=project-3')}
              className="bryl-btn-secondary"
            >
              <BookOpen size={14} aria-hidden="true" />
              <span>Read Check8 Case Study</span>
            </a>
          ) : (
            <a
              href="#contact"
              onClick={() => handleNavigate('#contact')}
              className="bryl-btn-secondary"
            >
              <Mail size={14} aria-hidden="true" />
              <span>Contact {p.shortName}</span>
            </a>
          )}

          {onReset && (
            <button
              type="button"
              onClick={() => {
                handleNavigate('#home');
                window.location.hash = '#home';
              }}
              className="bryl-btn-secondary"
            >
              <RefreshCw size={14} aria-hidden="true" />
              <span>Reset View</span>
            </button>
          )}
        </div>
      </div>

      {/* Verified Destination Shortcuts */}
      <div className="mt-10">
        <h2 className="micro-label mb-4">Verified Portfolio Destinations</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {projects.map((proj) => (
            <a
              key={proj.id}
              href={proj.caseStudy}
              onClick={() => handleNavigate(proj.caseStudy)}
              className="group flex flex-col justify-between border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-5 transition-colors hover:border-[rgb(var(--accent))]"
            >
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                  {proj.featured ? 'Flagship Case Study' : 'Project Case Study'}
                </span>
                <strong className="mt-1.5 block font-display-ui text-base font-bold text-[rgb(var(--ink))]">
                  {proj.name}
                </strong>
                <p className="mt-1.5 text-xs leading-relaxed text-[rgb(var(--g500))]">
                  {proj.category}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[rgb(var(--accent))] group-hover:underline">
                <span>Open Case Study</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Corresponding Error Pages Switcher (404 / 403 / 500 / 503) */}
      <nav
        aria-label="Error pages preview switcher"
        className="mt-10 flex flex-wrap items-center justify-between gap-3 border-y border-[rgb(var(--g200))] py-4 font-mono text-[11.5px]"
      >
        <span className="micro-label text-[rgb(var(--g400))]">ERROR STATES:</span>
        <div className="flex flex-wrap items-center gap-4">
          {ERROR_JUMP_ITEMS.map((item) => {
            const active = item.code === info.code;
            return (
              <a
                key={item.code}
                href={item.hash}
                aria-current={active ? 'page' : undefined}
                onClick={() => handleNavigate(item.hash)}
                className={`py-1 transition-colors ${
                  active
                    ? 'font-semibold text-[rgb(var(--accent))] underline decoration-[rgb(var(--accent))] decoration-2 underline-offset-4'
                    : 'text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
                }`}
              >
                {item.code} · {item.code === '404' ? 'Not Found' : item.code === '403' ? 'Restricted' : item.code === '500' ? 'Server Fault' : 'Unavailable'}
              </a>
            );
          })}
        </div>
      </nav>
    </section>
  );
}

interface BoundaryProps {
  children: ReactNode;
}

interface BoundaryState {
  hasError: boolean;
  message: string;
}

export class PortfolioErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): BoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Unexpected render fault',
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('Portfolio runtime error caught by ErrorBoundary:', error, info.componentStack);
  }

  reset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPageView
          code="500"
          errorMessage={this.state.message}
          onReset={this.reset}
        />
      );
    }
    return this.props.children;
  }
}
