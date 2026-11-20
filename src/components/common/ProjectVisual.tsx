import { Terminal } from 'lucide-react';
import { portfolio, type PortfolioProject } from '../../data/portfolio';

type VisualProject = Pick<PortfolioProject, 'name' | 'screenshot' | 'screenshotAlt'>;

export function ProjectVisual({
  compact = false,
  project = portfolio.project,
  category = 'Software Engineering',
}: {
  compact?: boolean;
  project?: VisualProject;
  category?: string;
}) {
  if (project.screenshot) {
    return (
      <div
        className={`overflow-hidden border border-[rgb(var(--g200))] bg-[rgb(var(--bg))] ${
          compact ? 'aspect-[16/10]' : ''
        }`}
      >
        <img
          className={`block w-full object-cover object-top ${compact ? 'h-full' : 'h-auto'}`}
          src={project.screenshot}
          alt={project.screenshotAlt || `${project.name} interface screenshot`}
          width={1280}
          height={800}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] ${
        compact ? 'aspect-[16/10] p-4' : 'p-5'
      }`}
      role="img"
      aria-label={project.screenshotAlt || `Interface preview for ${project.name}`}
    >
      <div className="flex items-center justify-between border-b border-[rgb(var(--g200))] pb-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-[rgb(var(--g300))] bg-[rgb(var(--g100))]" />
          <span className="h-2.5 w-2.5 rounded-full border border-[rgb(var(--g300))] bg-[rgb(var(--g100))]" />
          <span className="h-2.5 w-2.5 rounded-full border border-[rgb(var(--g300))] bg-[rgb(var(--g100))]" />
        </div>
        <span className="truncate font-mono text-[11px] font-medium text-[rgb(var(--g500))]">
          {category}
        </span>
        <Terminal size={13} className="text-[rgb(var(--accent))]" aria-hidden="true" />
      </div>

      <div
        className={`${compact ? 'my-2 p-3' : 'my-4 p-4'} border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] text-center`}
      >
        <span className="inline-block font-mono text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
          Interface Preview
        </span>

        <p className="mt-1.5 font-display-ui text-base font-bold text-[rgb(var(--ink))]">
          {project.name}
        </p>

        <div className="mt-2.5 space-y-1.5" aria-hidden="true">
          <div className="mx-auto h-2 w-4/5 bg-[rgb(var(--g200))]" />
          <div className="mx-auto h-2 w-3/5 bg-[rgb(var(--g200))]" />
          <div className="mx-auto mt-2.5 grid max-w-xs grid-cols-3 gap-2 pt-0.5">
            <div className="h-6 border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.08)]" />
            <div className="h-6 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))]" />
            <div className="h-6 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))]" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] text-[rgb(var(--g500))]">
        <span>Full-Stack Architecture</span>
        <span className="font-medium text-[rgb(var(--accent))]">Live Deployment</span>
      </div>
    </div>
  );
}
