import {
  ArrowRight,
  ExternalLink,
  Github,
  Lock,
  Terminal,
} from 'lucide-react';
import { portfolio, projects, type PortfolioProject } from './portfolio';

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
      {/* Modern Browser Chrome Header */}
      <div className="flex items-center justify-between border-b border-[rgb(var(--g200))] pb-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-[rgb(var(--g300))] bg-[rgb(var(--g100))]" />
          <span className="h-2.5 w-2.5 rounded-full border border-[rgb(var(--g300))] bg-[rgb(var(--g100))]" />
          <span className="h-2.5 w-2.5 rounded-full border border-[rgb(var(--g300))] bg-[rgb(var(--g100))]" />
        </div>
        <span className="font-mono text-[11px] font-medium text-[rgb(var(--g500))] truncate">
          {category}
        </span>
        <Terminal size={13} className="text-[rgb(var(--accent))]" aria-hidden="true" />
      </div>

      {/* Wireframe Preview Canvas */}
      <div className={`${compact ? 'my-2 p-3' : 'my-4 p-4'} border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] text-center`}>
        <span className="inline-block font-mono text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
          Interface Preview
        </span>

        <p className="mt-1.5 font-display-ui text-base font-bold text-[rgb(var(--ink))]">{project.name}</p>

        {/* Wireframe Mockup Lines */}
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

export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured) || projects[0];
  const secondaryProjects = projects.filter((p) => !p.featured && !p.name.startsWith('['));

  return (
    <section
      id="work"
      className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="work-title"
    >
      {/* Section Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-7">
        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="section-index-badge">01</span>
            <h2 id="work-title" className="section-index-title">
              Featured Projects &amp; Case Studies
            </h2>
          </div>
          <p className="mt-2 max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
            Web apps built for classmates and local schools with clear flows and accessible screens.
          </p>
        </div>
        <span className="micro-label">{projects.length} documented systems</span>
      </div>

      {/* Flagship Featured Project (Prominent Placement, Divided by Hairlines) */}
      <article className="border-t border-[rgb(var(--g200))] pt-8 pb-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Details */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                Flagship Case Study
              </span>
              <span className="hidden font-mono text-xs text-[rgb(var(--g400))] sm:inline" aria-hidden="true">·</span>
              <span className="font-mono text-xs text-[rgb(var(--g500))]">{featured.category}</span>
            </div>

            <h3 className="mt-3.5 font-display-ui text-2xl sm:text-3xl font-bold tracking-tight text-[rgb(var(--ink))]">
              {featured.name}
            </h3>

            <p className="mt-3.5 max-w-prose text-[15px] leading-relaxed text-[rgb(var(--g600))]">
              {featured.description}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-5 border-y border-[rgb(var(--g200))] py-5 sm:grid-cols-2">
              <div>
                <span className="block font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
                  Engineering Role
                </span>
                <p className="mt-1.5 font-mono text-xs text-[rgb(var(--ink))]">{featured.role}</p>
              </div>
              <div>
                <span className="block font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
                  Core Stack
                </span>
                <p className="mt-1.5 font-mono text-xs text-[rgb(var(--g500))]">
                  {featured.technologies.join(' · ')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={featured.caseStudy}
                className="bryl-btn-primary"
              >
                <span>Read Case Study</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>

              {featured.liveDemo && (
                <a
                  href={featured.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bryl-btn-secondary"
                  aria-label={`Open ${featured.name} live site in a new tab`}
                >
                  <span>Live Site</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}

              {featured.repository ? (
                <a
                  href={featured.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bryl-btn-secondary"
                  aria-label={`Open ${featured.name} source repository in a new tab`}
                >
                  <Github size={13} aria-hidden="true" />
                  <span>Repository</span>
                </a>
              ) : (
                <span
                  className="inline-flex min-h-[40px] items-center gap-1.5 border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--surface))] px-3 font-mono text-[11px] text-[rgb(var(--g500))]"
                  title={featured.accessNotice || 'Exclusive system for the GC CCS Department'}
                >
                  <Lock size={12} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
                  <span>Exclusive System · GC CCS Department</span>
                </span>
              )}
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[340px] lg:ml-auto lg:mr-0">
              <ProjectVisual project={featured} category={featured.category} />
            </div>
          </div>
        </div>
      </article>

      {/* Secondary Projects Grid */}
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
        {secondaryProjects.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between border-t border-[rgb(var(--g200))] pt-8"
          >
            <div>
              <ProjectVisual
                compact
                project={item}
                category={item.category.split('·')[0].trim()}
              />

              <div className="mt-6 flex items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3.5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                  {item.category.split('·')[0].trim()}
                </span>
                <span className="font-mono text-[10.5px] text-[rgb(var(--g500))]">
                  {item.role.split('·')[0].trim()}
                </span>
              </div>

              <h4 className="mt-5 font-display-ui text-xl font-bold tracking-tight text-[rgb(var(--ink))]">
                {item.name}
              </h4>

              <p className="mt-2.5 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
                {item.description}
              </p>

              {/* Technologies */}
              <p className="mt-5 font-mono text-[11px] text-[rgb(var(--g500))]">
                {item.technologies.join(' · ')}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-5">
              <a
                href={item.caseStudy}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[rgb(var(--accent))] hover:underline"
              >
                <span>Read Case Study</span>
                <ArrowRight size={13} aria-hidden="true" />
              </a>

              <div className="flex items-center gap-4">
                {item.repository && (
                  <a
                    href={item.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
                    aria-label={`Open ${item.name} GitHub repository (opens in a new tab)`}
                  >
                    <Github size={12} aria-hidden="true" />
                    <span>Repository</span>
                  </a>
                )}
                {item.liveDemo && (
                  <a
                    href={item.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
                    aria-label={`Open ${item.name} live deployment (opens in a new tab)`}
                  >
                    <span>Live Site</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
