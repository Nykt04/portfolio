import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  ExternalLink,
  Github,
  Image,
  Pause,
  Play,
  Sparkles,
  Layers,
  Atom,
  Waves,
  Database,
  Zap,
  Terminal,
  Cpu,
  Layout,
  FileCode2,
  type LucideIcon,
} from 'lucide-react';
import { portfolio, projects, type PortfolioProject } from './portfolio';
import { motionAllowed } from './usePageMotion';

const iconProps = { size: 20, strokeWidth: 1.7, 'aria-hidden': true as const };

type VisualProject = Pick<PortfolioProject, 'name' | 'screenshot' | 'screenshotAlt'>;

export function ProjectVisual({ compact = false, project = portfolio.project, category = 'Software engineering' }: { compact?: boolean; project?: VisualProject; category?: string }) {
  if (project.screenshot) return <img className="project-image" src={project.screenshot} alt={project.screenshotAlt || `${project.name} interface`} loading="lazy" />;
  return <div className={`project-visual ${compact ? 'compact' : ''}`}>
    <div className="visual-top"><span>{category}</span><Code2 {...iconProps} /></div>
    <div className="project-study-art" aria-hidden="true"><div className="study-frame"><div className="study-frame-bar"><i /><i /><i /></div><div className="study-frame-body"><Code2 size={52} strokeWidth={1} /><div className="study-lines"><i /><i /><i /></div></div><div className="study-frame-footer"><span>IDEA</span><span>BUILD</span><span>REFINE</span></div></div><span className="study-art-label">Preview placeholder</span></div>
    <div className="visual-bottom"><span>Project screenshot<br /><strong>Coming into focus.</strong></span><span className="image-mark"><Image {...iconProps} /></span></div>
  </div>;
}

function getTechIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes('next') || n.includes('html') || n.includes('js') || n.includes('node')) return Code2;
  if (n.includes('typescript') || n.includes('ts') || n.includes('layer')) return Layers;
  if (n.includes('react')) return Atom;
  if (n.includes('tailwind') || n.includes('css')) return Waves;
  if (n.includes('supa') || n.includes('sql') || n.includes('data') || n.includes('base') || n.includes('postgre')) return Database;
  if (n.includes('vercel') || n.includes('deploy') || n.includes('zap') || n.includes('fast')) return Zap;
  if (n.includes('python')) return Terminal;
  if (n.includes('c') && n.length <= 3) return Cpu;
  if (n.includes('figma') || n.includes('design') || n.includes('responsive')) return Layout;
  return FileCode2;
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(() => motionAllowed());
  const [engaged, setEngaged] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const scrollFrame = useRef(0);
  const total = projects.length;

  useEffect(() => {
    if (!autoPlay || engaged || total < 2 || !motionAllowed()) return;
    const timer = window.setInterval(() => goTo((active + 1) % total), 5000);
    return () => window.clearInterval(timer);
  }, [active, autoPlay, engaged, total]);

  const goTo = (index: number) => {
    const rail = track.current;
    const slide = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !slide || index < 0 || index >= total) return;
    rail.scrollTo({ left: slide.offsetLeft, behavior: motionAllowed() ? 'smooth' : 'instant' });
  };

  const syncPosition = () => {
    cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const rail = track.current;
      if (!rail) return;
      const slides = Array.from(rail.children) as HTMLElement[];
      const closest = slides.reduce((best, slide, index) =>
        Math.abs(slide.offsetLeft - rail.scrollLeft) < Math.abs(slides[best].offsetLeft - rail.scrollLeft) ? index : best, 0);
      if (activeRef.current !== closest) {
        activeRef.current = closest;
        setActive(closest);
      }
    });
  };

  useEffect(() => {
    const rail = track.current;
    if (!rail) return;
    let previousWidth = rail.clientWidth;
    const observer = new ResizeObserver(() => {
      if (rail.clientWidth === previousWidth) return;
      previousWidth = rail.clientWidth;
      const slide = rail.children[activeRef.current] as HTMLElement | undefined;
      if (slide) rail.scrollTo({ left: slide.offsetLeft, behavior: 'instant' });
    });
    observer.observe(rail);
    return () => { observer.disconnect(); cancelAnimationFrame(scrollFrame.current); };
  }, []);

  if (!total) return null;

  return <section id="work" className="section work-section container" aria-labelledby="work-title" aria-roledescription="carousel" onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)}
    onKeyDown={event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        if (track.current?.contains(document.activeElement)) track.current.focus({ preventScroll: true });
        if (event.key === 'Home') goTo(0);
        else if (event.key === 'End') goTo(total - 1);
        else goTo(active + (event.key === 'ArrowRight' ? 1 : -1));
      }
    }}>
    <div className="section-heading projects-heading">
      <div><h2 id="work-title">Work in focus<span className="accent">.</span></h2><p>A closer look at how I think, build, and solve problems.</p></div>
      {total > 1 && <div className="project-controls" role="group" aria-label="Project navigation">
        <span className="project-count" aria-hidden="true"><strong>{String(active + 1).padStart(2, '0')}</strong><span>/ {String(total).padStart(2, '0')}</span></span>
        <button className="project-autoplay" type="button" aria-pressed={autoPlay} aria-label={autoPlay ? 'Pause automatic project rotation' : 'Resume automatic project rotation'} onClick={() => setAutoPlay(value => !value)}>{autoPlay ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}<span>{autoPlay ? 'Auto' : 'Manual'}</span></button>
        <button className="project-arrow" type="button" aria-label="Previous project" aria-controls="project-slides" aria-disabled={active === 0} onClick={() => goTo(active - 1)}><ArrowLeft {...iconProps} /></button>
        <button className="project-arrow" type="button" aria-label="Next project" aria-controls="project-slides" aria-disabled={active === total - 1} onClick={() => goTo(active + 1)}><ArrowRight {...iconProps} /></button>
      </div>}
    </div>

    <div id="project-slides" className="project-track" ref={track} onScroll={syncPosition} tabIndex={0} aria-label="Projects. Use left and right arrow keys to browse.">
      {projects.map((project, index) => <article key={project.id} className="featured-project project-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}: ${project.name}`} inert={active !== index}>
        <div className="project-card-sleek">
          <div className="project-card-top">
            <div className="project-title-group">
              <div className="project-badge">
                <Sparkles size={14} className="project-sparkle" aria-hidden="true" />
                <span>{project.featured ? 'Featured project' : project.category}</span>
                {project.name.startsWith('[') && <span className="status-tag">Coming soon</span>}
              </div>
              <h3 className="project-heading">
                {project.caseStudy ? <a href={project.caseStudy}>{project.name}</a> : project.name}
              </h3>
            </div>

            <div className="project-divider" aria-hidden="true" />

            <p className="project-desc">{project.description}</p>

            <div className="project-actions-corner">
              {project.liveDemo ? (
                <a
                  className="project-icon-btn"
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open live demo (opens in a new tab)"
                  aria-label={`Open live demo for ${project.name} (opens in a new tab)`}
                >
                  <ExternalLink size={18} aria-hidden="true" />
                </a>
              ) : project.repository ? (
                <a
                  className="project-icon-btn"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View repository (opens in a new tab)"
                  aria-label={`View repository for ${project.name} (opens in a new tab)`}
                >
                  <Github size={18} aria-hidden="true" />
                </a>
              ) : (
                <span className="project-icon-btn disabled" aria-hidden="true" title="Demo coming soon">
                  <ExternalLink size={18} />
                </span>
              )}

              {project.caseStudy ? (
                <a
                  className="project-icon-btn play-btn"
                  href={project.caseStudy}
                  title={`Explore case study for ${project.name}`}
                  aria-label={`Explore case study for ${project.name}`}
                >
                  <Play size={16} fill="currentColor" aria-hidden="true" />
                </a>
              ) : (
                <span className="project-icon-btn disabled" aria-hidden="true">
                  <Play size={16} fill="currentColor" />
                </span>
              )}
            </div>
          </div>

          <div className="project-pills-row" aria-label="Technologies used">
            {project.technologies.map(tag => {
              const TagIcon = getTechIcon(tag);
              return (
                <span key={tag} className="tech-pill">
                  <TagIcon size={14} aria-hidden="true" />
                  <span>{tag}</span>
                </span>
              );
            })}
          </div>
        </div>
      </article>)}
    </div>

    {total > 1 && <div className="project-picker" role="group" aria-label="Choose a project">
      {projects.map((project, index) => <button key={project.id} type="button" aria-label={`Show project ${index + 1}: ${project.name}`} aria-current={index === active ? 'true' : undefined} aria-controls="project-slides" onClick={() => goTo(index)}><span className="picker-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{project.name}</span>{project.featured && <span className="picker-featured">Featured</span>}</button>)}
    </div>}
    <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Project {active + 1} of {total}: {projects[active].name}</p>
  </section>;
}
