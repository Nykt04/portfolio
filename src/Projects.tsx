import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Github, Image, Pause, Play } from 'lucide-react';
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

  // Track touch, trackpad, and button scrolling with one source of truth.
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
        // Move focus out of the slide before it becomes inert.
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
      {projects.map((project, index) => <article key={project.id} className="featured-project project-slide" data-tone={index % 4} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}: ${project.name}`} inert={active !== index}>
        {project.caseStudy ? <a className="project-visual-link" href={project.caseStudy} aria-label={`Explore ${project.name} case study`}><ProjectVisual project={project} category={project.category} /></a> : <div className="project-visual-link"><ProjectVisual project={project} category={project.category} /></div>}
        <div className="project-content">
          <div className="project-type"><span>{project.featured ? 'Featured project' : project.category}</span>{project.name.startsWith('[') && <span className="status-tag">Content coming soon</span>}</div>
          <h3>{project.caseStudy ? <a href={project.caseStudy}>{project.name}</a> : project.name}</h3>
          <p>{project.description}</p>
          <div className="project-tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="project-role"><span>My role</span><p>{project.role}</p></div>
          <div className="project-actions">
            {project.caseStudy && <a href={project.caseStudy} className="case-link">Explore the case study <span><ArrowUpRight {...iconProps} /></span></a>}
            {(project.repository || project.liveDemo) && <div className="project-external-links">
              {project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" />Source code<span className="sr-only"> (opens in a new tab)</span></a>}
              {project.liveDemo && <a className="text-link" href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live demo<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
            </div>}
            {!project.caseStudy && !project.repository && !project.liveDemo && <p className="project-links-pending">Project links to be added</p>}
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
