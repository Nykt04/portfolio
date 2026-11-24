import { Github } from 'lucide-react';
import { portfolio as p } from '../../data/portfolio';
import { useGitHubContributions, type GhDay } from '../../hooks/useGitHubContributions';
import { SectionHeader } from '../common/SectionHeader';

const GH_TILE_OPACITY = [0.42, 0.45, 0.65, 0.85, 1] as const;
const GH_DOT_RADIUS = [1.5, 2.4, 3.3, 4.2, 5.0] as const;
const TOTAL_WEEKS = 53;

export function GitHubSection() {
  const githubUrl = p.contact.github || 'https://github.com/Nykt04';
  const username = githubUrl.replace(/\/+$/, '').split('/').pop() || 'Nykt04';
  const { total, days } = useGitHubContributions(username);

  const cells: { w: number; d: number; day: GhDay }[] = [];
  const padded = days.slice(-TOTAL_WEEKS * 7);
  for (let i = 0; i < padded.length; i++) {
    const w = Math.floor(i / 7);
    const d = i % 7;
    if (w < TOTAL_WEEKS) {
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
        <div className="lg:col-span-4 lg:pt-5">
          <SectionHeader index="05" title="GitHub Activity" titleId="github-title" compact />

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

        <div className="flex flex-col lg:col-span-8 lg:items-end">
          <div className="w-full max-w-[640px] border-y border-[rgb(var(--g200))] py-6">
            <div className="mb-3.5 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--g500))]">
                Contributions // @{username}
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
                      {day.date && <title>{`${day.count ?? 0} contributions on ${day.date}`}</title>}
                    </circle>
                  );
                })}
              </svg>
            </a>

            <div className="mt-3.5 flex justify-end text-[10.5px] text-[rgb(var(--g400))]">
              <div className="flex items-center gap-1.5 uppercase tracking-wider" aria-hidden="true">
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
