import { ArrowRight, ArrowUpRight, Github, Linkedin, PanelsTopLeft, Terminal } from 'lucide-react';
import { coreLogoSkills } from '../../data/navigation';
import { portfolio as p, projects } from '../../data/portfolio';
import { Portrait } from '../common/Portrait';
import { TechIcon } from '../common/TechIcon';

export function HeroSection() {
  return (
    <section id="home" className="relative pt-8 pb-11 sm:pt-11 sm:pb-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
        {/* Left 7-Column Editorial Hero */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <div className="reveal d1 flex flex-wrap items-center justify-between gap-2 border-b border-[rgb(var(--g200))] pb-3.5 leading-none">
              <div className="inline-flex items-center gap-2">
                <span className="pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
                <span className="font-mono text-[11px] font-medium text-[rgb(var(--ink))]">
                  Available for Projects &amp; Collaborations
                </span>
              </div>
              <span className="font-mono text-[11px] font-medium text-[rgb(var(--g500))]">
                Gordon College
              </span>
            </div>

            <div className="reveal d2 mt-7">
              <h1 className="font-pixel text-3xl font-bold tracking-tight text-[rgb(var(--ink))] sm:text-[2.6rem] sm:leading-[1.08]">
                {p.name}
              </h1>
              <p className="mt-2 font-mono text-[11.5px] font-medium uppercase tracking-wider text-[rgb(var(--accent))]">
                Aspiring Web Developer &amp; Software Engineer
              </p>
            </div>

            <blockquote className="reveal d3 mt-6 max-w-prose border-l border-[rgb(var(--g300))] py-1 pl-4 font-serif-ui text-[16.5px] italic leading-relaxed text-[rgb(var(--ink))]">
              “{p.introduction}”
            </blockquote>

            <p className="intro-copy reveal d4 mt-6 max-w-prose text-[14px]">
              Designing and engineering{' '}
              <span className="intro-tag">
                <PanelsTopLeft size={13} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                accessible interfaces
              </span>{' '}
              and{' '}
              <span className="intro-tag">
                <Terminal size={13} aria-hidden="true" className="text-[rgb(var(--accent))]" />
                full-stack systems
              </span>{' '}
              powered by{' '}
              <span className="intro-ai">
                <span className="intro-logos" aria-hidden="true">
                  {coreLogoSkills.map((skill) => (
                    <span key={skill} className="intro-logo" title={skill}>
                      <TechIcon name={skill} size={12} />
                    </span>
                  ))}
                </span>
                Python, TypeScript, JS &amp; C
              </span>
              .
            </p>

            <div className="reveal d5 mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a href="#work" className="bryl-btn-primary">
                  <span>Explore My Work</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <a href="#contact" className="bryl-btn-secondary">
                  <span>Get in Touch</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11.5px] text-[rgb(var(--g500))]">
                {p.contact.github && (
                  <a
                    href={p.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[rgb(var(--accent))]"
                    aria-label="GitHub profile (opens in a new tab)"
                  >
                    <Github size={13} aria-hidden="true" />
                    <span>github</span>
                  </a>
                )}
                {p.contact.linkedin && (
                  <a
                    href={p.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[rgb(var(--accent))]"
                    aria-label="LinkedIn profile (opens in a new tab)"
                  >
                    <Linkedin size={13} aria-hidden="true" />
                    <span>linkedin</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div
            aria-label="Portfolio highlights"
            className="reveal d6 mt-8 grid min-h-[64px] grid-cols-1 gap-4 border-t border-[rgb(var(--g200))] pt-5 sm:grid-cols-3 sm:items-center sm:gap-0 sm:divide-x sm:divide-[rgb(var(--g200))]"
          >
            <a href="#about" className="group block sm:pr-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Academic Standing
              </span>
              <div className="mt-1 flex items-center gap-1">
                <span className="font-pixel text-base font-bold leading-none text-[rgb(var(--ink))] sm:text-lg">
                  {p.course}
                </span>
              </div>
            </a>

            <a href="#about" className="group block sm:px-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Core Competencies
              </span>
              <div className="mt-1 flex items-center gap-1">
                <span className="font-pixel text-base font-bold leading-none text-[rgb(var(--ink))] sm:text-lg">
                  PM · Dev · QA · BA
                </span>
              </div>
            </a>

            <a href="#work" className="group block sm:pl-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--accent))]">
                Verified Systems
              </span>
              <div className="mt-1 flex items-center gap-1">
                <span className="font-pixel text-base font-bold leading-none text-[rgb(var(--ink))] sm:text-lg">
                  3 Shipped Apps
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right 5-Column Studio Portrait & Flagship Preview Bar */}
        <div className="flex flex-col justify-between gap-5 border-t border-[rgb(var(--g200))] pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <Portrait className="flex-1" />
          <a
            href={projects[0].caseStudy}
            className="group flex min-h-[64px] items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-5 transition-colors hover:border-[rgb(var(--accent))]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={projects[0].screenshot}
                alt={projects[0].screenshotAlt}
                width={160}
                height={100}
                loading="lazy"
                className="h-11 w-16 shrink-0 border border-[rgb(var(--g200))] object-cover object-top"
              />
              <div className="min-w-0">
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
                  Flagship Preview · {projects[0].name}
                </span>
                <span className="block truncate text-[12.5px] font-medium text-[rgb(var(--ink))]">
                  QR-powered clearance for Gordon College, College of Computer Studies
                </span>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold text-[rgb(var(--accent))] group-hover:underline">
              <span>Case Study</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
