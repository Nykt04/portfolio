import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { portfolio as p } from './portfolio';

const FALLBACK_GH_LEVELS =
  '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000002000000200000000000000000000000000000001000000000004110000000000013003001001020111100401200000000000000000000000000000000000000000230100000000000000000000000000000000020000011011000000000000000000000000000000000000100000010000002110000000000000000010010440';

const GH_TILE_OPACITY = [0.42, 0.45, 0.65, 0.85, 1] as const;
const GH_DOT_RADIUS = [1.5, 2.4, 3.3, 4.2, 5.0] as const;

interface GhDay {
  date?: string;
  count?: number;
  level: number;
}

export function GitHubSection() {
  const githubUrl = p.contact.github || 'https://github.com/Nykt04';
  const username = githubUrl.replace(/\/+$/, '').split('/').pop() || 'Nykt04';

  const [total, setTotal] = useState<number>(156);
  const [days, setDays] = useState<GhDay[]>(() =>
    FALLBACK_GH_LEVELS.split('').map((ch) => ({ level: Number(ch) || 0 })),
  );

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data.contributions)) return;
        setDays(
          data.contributions.map((d: { date?: string; count?: number; level?: number }) => ({
            date: d.date,
            count: d.count,
            level: Math.min(4, Math.max(0, Number(d.level) || 0)),
          })),
        );
        if (data.total && typeof data.total.lastYear === 'number') {
          setTotal(data.total.lastYear);
        }
      })
      .catch(() => {
        // Keep seeded snapshot when offline
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const cells: { w: number; d: number; day: GhDay }[] = [];
  const totalWeeks = 53;
  const padded = days.slice(-totalWeeks * 7);
  for (let i = 0; i < padded.length; i++) {
    const w = Math.floor(i / 7);
    const d = i % 7;
    if (w < totalWeeks) {
      cells.push({ w, d, day: padded[i] });
    }
  }

  return (
    <section
      id="github"
      className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="github-title"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        {/* Left Summary Column */}
        <div className="lg:col-span-4 lg:pt-5">
          <div className="flex items-baseline gap-2.5">
            <span className="section-index-badge">05</span>
            <h2 id="github-title" className="section-index-title">
              GitHub Activity
            </h2>
          </div>

          <div className="mt-5 flex items-baseline gap-2">
            <strong className="font-display-ui text-2xl font-bold tracking-tight text-[rgb(var(--ink))]">
              {total.toLocaleString()}
            </strong>
            <span className="font-mono text-[11.5px] text-[rgb(var(--g500))]">
              contributions in the last year
            </span>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-medium text-[rgb(var(--accent))] hover:underline"
            aria-label={`GitHub profile @${username} (opens in a new tab)`}
          >
            <Github size={13} aria-hidden="true" />
            <span>@{username} ↗</span>
          </a>
        </div>

        {/* Right Compact Matrix Column */}
        <div className="lg:col-span-8 flex flex-col lg:items-end">
          <div className="w-full max-w-[640px] border-y border-[rgb(var(--g200))] py-6">
            <div className="mb-3.5 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--g500))]">
                Contributions // @{username}
              </span>
              <span className="font-mono text-[11px] text-[rgb(var(--g400))]">
                53-week matrix
              </span>
            </div>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-x-auto"
              aria-label={`View @${username}'s ${total.toLocaleString()} GitHub contributions in the last year`}
            >
              <svg
                viewBox="0 0 689 91"
                className="h-auto w-full min-w-[420px]"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Halftone GitHub contribution matrix"
              >
                {cells.map(({ w, d, day }, idx) => {
                  const lvl = Math.min(4, Math.max(0, day.level));
                  const isZero = lvl === 0;
                  const fill = isZero ? 'rgb(var(--g300))' : 'rgb(var(--accent))';
                  const opacity = GH_TILE_OPACITY[lvl] ?? 0.42;
                  const radius = GH_DOT_RADIUS[lvl] ?? 1.5;
                  return (
                    <circle
                      key={idx}
                      cx={w * 13 + 6.5}
                      cy={d * 13 + 6.5}
                      r={radius}
                      fill={fill}
                      opacity={opacity}
                    >
                      {day.date && (
                        <title>{`${day.count ?? 0} contributions on ${day.date}`}</title>
                      )}
                    </circle>
                  );
                })}
              </svg>
            </a>

            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[rgb(var(--g400))]">
              <span>Live API · Snapshot fallback</span>
              <div
                className="flex items-center gap-1.5 uppercase tracking-wider"
                aria-hidden="true"
              >
                <span>less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <svg key={lvl} width="12" height="12" viewBox="0 0 12 12">
                    <circle
                      cx="6"
                      cy="6"
                      r={GH_DOT_RADIUS[lvl]}
                      fill={lvl === 0 ? 'rgb(var(--g300))' : 'rgb(var(--accent))'}
                      opacity={GH_TILE_OPACITY[lvl]}
                    />
                  </svg>
                ))}
                <span>more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(p.contact.email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };

  const links = [
    { name: 'GitHub', handle: '@Nykt04', url: p.contact.github, Icon: Github },
    { name: 'LinkedIn', handle: 'gian-karlo-reguindin', url: p.contact.linkedin, Icon: Linkedin },
  ];

  return (
    <section
      id="contact"
      className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="contact-title"
    >
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 sm:mb-7">
        <div className="flex items-baseline gap-2.5">
          <span className="section-index-badge">06</span>
          <h2 id="contact-title" className="section-index-title">
            Contact &amp; Channels
          </h2>
        </div>
        <span className="micro-label">direct communication</span>
      </div>

      <div className="border-t border-[rgb(var(--g200))] pt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--accent))]">
              CHANNEL // OPEN FOR OPPORTUNITIES
            </span>
            <p className="mt-2 font-pixel text-2xl font-bold text-[rgb(var(--ink))]">
              Let’s talk.
            </p>
            <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
              Reach out via email, GitHub, or LinkedIn for internships, project collaborations, or UI questions.
            </p>

            {/* Email Action Row */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {p.contact.email ? (
                <>
                  <a href={`mailto:${p.contact.email}`} className="bryl-btn-primary">
                    <Mail size={14} aria-hidden="true" />
                    <span>{p.contact.email}</span>
                  </a>
                  <button type="button" onClick={copyEmail} className="bryl-btn-secondary">
                    {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    <span>{copied ? 'Copied' : 'Copy email'}</span>
                  </button>
                  <span className="sr-only" role="status" aria-live="polite">
                    {copied
                      ? 'Email address copied to clipboard.'
                      : copyError
                        ? 'Copy failed. Please use the email link directly.'
                        : ''}
                  </span>
                </>
              ) : (
                <div className="border-l-2 border-[rgb(var(--g300))] pl-3 font-mono text-[12px] text-[rgb(var(--g500))]">
                  [Email Placeholder: Add in src/portfolio.ts]
                </div>
              )}
            </div>
          </div>

          {/* GitHub & LinkedIn Rows (Divided by Hairlines) */}
          <div className="divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] lg:col-span-5 lg:border-y-0 lg:border-l lg:pl-10">
            {links.map(({ name, handle, url, Icon }) =>
              url ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} (${handle}, opens in a new tab)`}
                  className="group flex items-center justify-between gap-3 py-5 transition-colors hover:text-[rgb(var(--accent))]"
                >
                  <span className="inline-flex items-center gap-2.5 text-[14px] font-semibold text-[rgb(var(--ink))]">
                    <Icon size={16} strokeWidth={1.7} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                    <span>{name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11.5px] text-[rgb(var(--g500))] group-hover:text-[rgb(var(--accent))]">
                    <span>{handle}</span>
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              ) : (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 py-5 font-mono text-[12px] text-[rgb(var(--g400))]"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={15} aria-hidden="true" />
                    <span>{name}</span>
                  </span>
                  <span>[Placeholder: To be added]</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
