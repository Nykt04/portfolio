import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { AccessNoticeLink } from '../common/AccessNoticeLink';
import { ProjectVisual } from '../common/ProjectVisual';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard } from './ProjectCard';

export default function ProjectsSection() {
  const featured = projects.find((item) => item.featured) || projects[0];
  const secondaryProjects = projects.filter((item) => !item.featured && !item.name.startsWith('['));

  return (
    <section
      id="work"
      className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="work-title"
    >
      <SectionHeader
        index="01"
        title="Featured Projects & Case Studies"
        titleId="work-title"
        subtitle="Web apps built for classmates and local schools with clear flows and accessible screens."
        meta={`${projects.length} documented systems`}
      />

      {/* Flagship Featured Project */}
      <article className="border-t border-[rgb(var(--g200))] pt-8 pb-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                Flagship Case Study
              </span>
              <span className="hidden font-mono text-xs text-[rgb(var(--g400))] sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="font-mono text-xs text-[rgb(var(--g500))]">{featured.category}</span>
            </div>

            <h3 className="mt-3.5 font-display-ui text-2xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-3xl">
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

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={featured.caseStudy} className="bryl-btn-primary">
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
                <AccessNoticeLink
                  notice={featured.accessNotice}
                  label="Exclusive System · Gordon College, College of Computer Studies"
                />
              )}
            </div>
          </div>

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
          <ProjectCard key={item.id} project={item} />
        ))}
      </div>
    </section>
  );
}
