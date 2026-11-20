import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import type { PortfolioProject } from '../../types/portfolio';
import { ProjectVisual } from '../common/ProjectVisual';

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const shortCategory = project.category.split('·')[0].trim();

  return (
    <article className="flex flex-col justify-between border-t border-[rgb(var(--g200))] pt-8">
      <div>
        <ProjectVisual compact project={project} category={shortCategory} />

        <div className="mt-6 flex items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3.5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
            {shortCategory}
          </span>
          <span className="font-mono text-[10.5px] text-[rgb(var(--g500))]">
            {project.role.split('·')[0].trim()}
          </span>
        </div>

        <h4 className="mt-5 font-display-ui text-xl font-bold tracking-tight text-[rgb(var(--ink))]">
          {project.name}
        </h4>

        <p className="mt-2.5 text-[14px] leading-relaxed text-[rgb(var(--g600))]">
          {project.description}
        </p>

        <p className="mt-5 font-mono text-[11px] text-[rgb(var(--g500))]">
          {project.technologies.join(' · ')}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-5">
        <a
          href={project.caseStudy}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[rgb(var(--accent))] hover:underline"
        >
          <span>Read Case Study</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>

        <div className="flex items-center gap-4">
          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
              aria-label={`Open ${project.name} GitHub repository (opens in a new tab)`}
            >
              <Github size={12} aria-hidden="true" />
              <span>Repository</span>
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]"
              aria-label={`Open ${project.name} live deployment (opens in a new tab)`}
            >
              <span>Live Site</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
