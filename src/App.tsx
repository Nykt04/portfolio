import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { AlertCircle, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Github, GraduationCap, Layers3, Linkedin, Mail, Menu, Quote, ScanLine, Sparkles, Target, Users } from 'lucide-react';
import { portfolio as p, projects } from './portfolio';
import ProjectsSection, { ProjectVisual } from './Projects';
import { motionAllowed, usePageMotion } from './usePageMotion';
import { Marquee, Portrait, Toolkit } from './AboutExtras';
import Approach from './Approach';
import ReadingProgress from './ReadingProgress';
import InteractiveBackdrop, { BinaryStreams } from './InteractiveBackdrop';
import SettingsMenu from './SettingsMenu';
import NavDrawer from './NavDrawer';
import Preloader from './Preloader';
import ProjectWireframes from './ProjectWireframes';
import CertificationsSection from './Certifications';

const iconProps = { size: 20, strokeWidth: 1.7, 'aria-hidden': true as const };
const roleIcons = [Users, Code2, ScanLine, Layers3];
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [isCaseStudy, setIsCaseStudy] = useState(window.location.hash.startsWith('#case-study'));
  const [caseStudyId, setCaseStudyId] = useState(() => {
    const match = typeof window !== 'undefined' ? window.location.hash.match(/[?&]p=([^&]+)/) : null;
    return match ? match[1] : 'featured-project';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [holdbar, setHoldbar] = useState<'idle' | 'loading' | 'finishing'>('idle');
  const [transitionScreen, setTransitionScreen] = useState<{ active: boolean; direction: 'ltr' | 'rtl' }>({ active: false, direction: 'ltr' });
  const menuButton = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const priorView = useRef(isCaseStudy);
  const { paused, setPaused } = usePageMotion(isCaseStudy, mainRef);

  useEffect(() => {
    // Circular reveal from the last press point when switching views (reference: dev.robertoattanasio.com).
    const onPress = (event: PointerEvent) => { document.documentElement.style.setProperty('--reveal-x', `${event.clientX}px`); document.documentElement.style.setProperty('--reveal-y', `${event.clientY}px`); };
    const onHash = () => {
      const hash = window.location.hash;
      const next = hash.startsWith('#case-study');
      if (hash === '#main') return;

      const pidMatch = hash.match(/[?&]p=([^&]+)/);
      setCaseStudyId(pidMatch ? pidMatch[1] : 'featured-project');

      setHoldbar('loading');
      setTimeout(() => setHoldbar('finishing'), 350);
      setTimeout(() => setHoldbar('idle'), 800);

      const isBack = hash === '#home' || hash === '' || (priorView.current && !next);
      const dir: 'ltr' | 'rtl' = isBack ? 'rtl' : 'ltr';

      if (motionAllowed()) {
        setTransitionScreen({ active: true, direction: dir });
      }

      const viewChanging = next !== priorView.current;
      if (viewChanging && document.startViewTransition && motionAllowed()) {
        document.startViewTransition(() => {
          flushSync(() => { setIsCaseStudy(next); setMenuOpen(false); });
          const target = document.getElementById(hash.slice(1));
          if (target) target.scrollIntoView({ behavior: 'instant' }); else window.scrollTo({ top: 0, behavior: 'instant' });
        });
      } else {
        setIsCaseStudy(next);
        setMenuOpen(false);
        const target = document.getElementById(hash.slice(1));
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'instant' });
          }, 320);
        }
      }
    };
    window.addEventListener('pointerdown', onPress, { passive: true });
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('pointerdown', onPress); window.removeEventListener('hashchange', onHash); };
  }, []);

  useEffect(() => {
    const currentProj = projects.find(item => item.id === caseStudyId) || projects[0];
    document.title = isCaseStudy ? `${currentProj.name} — Case Study | ${p.shortName}` : `${p.name} — ${p.title}`;
    if (priorView.current !== isCaseStudy) {
      priorView.current = isCaseStudy;
      requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1));
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
        mainRef.current?.focus({ preventScroll: true });
      });
    }
    if (isCaseStudy) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    navItems.forEach(item => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [isCaseStudy, caseStudyId]);

  useEffect(() => {
    if (menuOpen) document.querySelector<HTMLAnchorElement>('#navigation a')?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [menuOpen]);

  return <>
    {!introDone && (
      <Preloader onComplete={() => setIntroDone(true)} />
    )}
    <div data-holdbar data-holdbar-state={holdbar} aria-hidden="true" />
    <div
      className={`transition-curtain ${transitionScreen.active ? 'is-active' : ''} dir-${transitionScreen.direction}`}
      onAnimationEnd={() => setTransitionScreen(prev => ({ ...prev, active: false }))}
      aria-hidden="true"
    >
      <div className="curtain-bg" />
      <div className="curtain-center">
        <div className="initials-halo" />
        <div className="initials-circle">
          <span className="initials-letters">GK</span>
          <span className="initials-dot">.</span>
        </div>
        <span className="initials-sub">{p.name.toUpperCase()}</span>
      </div>
    </div>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="wordmark" aria-label="Gian Karlo — home">gk<span>.</span></a>
        <nav id="navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map(item => <a key={item.id} href={`#${item.id}`} aria-current={!isCaseStudy && active === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
        <div className="header-controls">
          <SettingsMenu paused={paused} setPaused={setPaused} onReplayIntro={() => setIntroDone(false)} />
          <a className="header-contact" href="#contact">Let’s connect <ArrowUpRight {...iconProps} /></a>
          <button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={18} aria-hidden="true" /><span>Menu</span></button>
        </div>
      </div>
    </header>
    <NavDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} active={active} isCaseStudy={isCaseStudy} paused={paused} setPaused={setPaused} />

    <main id="main" ref={mainRef} tabIndex={-1}>
      <InteractiveBackdrop />
      {isCaseStudy ? <CaseStudy projectId={caseStudyId} /> : <>
        <section id="home" className="hero-stage"><BinaryStreams theme="light" /><div className="section-atmosphere atmosphere-home" aria-hidden="true"><i /><i /><i /><span>01 / INTRO</span></div><div className="hero container">
          <div className="hero-copy">
            <h1 aria-label={p.name}>Gian Karlo<span className="hero-surname">Reguindin<span className="accent">.</span></span></h1>
            <p className="hero-manifesto">Thoughtful <span className="glitch-word" data-text="code" aria-hidden="true">code</span><span className="sr-only">code</span>.<br />Human experiences.</p>
            <div className="hero-intro"><div className="intro-line" aria-hidden="true" /><div><p className="intro-name">Hi, I’m {p.shortName}.</p><p className="intro-description">{p.title} &<br />third-year Computer Science student.</p></div></div>
            <div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowUpRight {...iconProps} /></a><a className="text-link" href="#contact">Get in touch <ArrowRight {...iconProps} /></a></div>
          </div>
          <div className="hero-art" aria-label="Gian Karlo personal monogram">
            <div className="art-coordinate top-left">ORBIT: 284° // STATION: GK-01</div>
            <div className="art-scan" aria-hidden="true" />
            <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
            <div className="large-monogram" aria-hidden="true">gk<span>.</span></div>
            <div className="floating-token token-code" aria-hidden="true"><Code2 size={24} strokeWidth={1.5} /></div>
            <div className="floating-token token-layers" aria-hidden="true"><Layers3 size={23} strokeWidth={1.5} /></div>
            <div className="floating-token token-scan" aria-hidden="true"><ScanLine size={22} strokeWidth={1.5} /></div>
            <div className="art-coordinate bottom-left">SYS: TELEMETRY ACTIVE // 14.5995° N</div><div className="art-profile"><span>Computer Science</span><strong>A curious mind.<br />A work in progress.</strong><span>Learning. Building. Refining.</span></div>
          </div>
          <div className="hero-bottom">
            <div className="hero-bottom-meta">
              <span><GraduationCap {...iconProps} /> {p.course}</span>
              <a href="#about">A little more about me <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <a className="hero-project-preview" href="#case-study">
              <span className="hero-project-thumbnail">{p.project.screenshot ? <img src={p.project.screenshot} alt="" /> : <Code2 size={23} strokeWidth={1.5} aria-hidden="true" />}</span>
              <span className="hero-project-label">Featured case study<strong>{p.project.name}</strong></span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div></section>

        <Marquee />

        <section id="about" className="section about-section"><div className="section-atmosphere atmosphere-about" aria-hidden="true"><i /><i /><i /><span>02 / ABOUT</span></div>
          <div className="container about-grid">
            <div><h2>A curious mind.<br /><span className="muted-heading">A developer in<br className="desktop-break" /> the making.</span></h2><Portrait /></div>
            <div className="about-content"><p className="large-body">{p.introduction}</p><p>{p.about}</p><div className="about-facts"><div><span>Education</span><strong>{p.education}</strong></div><div><span>Interests</span><strong>{p.interests}</strong></div></div><div className="about-note"><Code2 size={28} strokeWidth={1.4} aria-hidden="true" /><p>Learning the craft.<br /><strong>One thoughtful project at a time.</strong></p></div></div>
          </div>
          <div className="container responsibilities"><h3>Where I contribute</h3><div className="roles-row">{p.roles.map((role, i) => { const Icon = roleIcons[i]; return <div key={role.title}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span>{role.title}</span></div>; })}</div></div>
        </section>

        <section id="toolkit" className="toolkit-section" aria-labelledby="toolkit-title"><BinaryStreams theme="light" /><div className="container"><Toolkit /></div></section>

        <ProjectsSection />

        <CertificationsSection />

        <Approach />

        <Contact />
      </>}
    </main>
    <ReadingProgress view={isCaseStudy} />
    <footer className="site-footer container"><a className="wordmark" href="#home" aria-label="Back to home">gk<span>.</span></a><p>© {new Date().getFullYear()} {p.name}</p><a href={isCaseStudy ? '#case-study' : '#home'}>Back to top <ArrowUpRight size={17} aria-hidden="true" /></a></footer>
  </>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const copyEmail = async () => { try { await navigator.clipboard.writeText(p.contact.email); setCopied(true); setCopyError(false); clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2500); } catch { setCopyError(true); } };
  const links = [{ name: 'GitHub', url: p.contact.github, Icon: Github }, { name: 'LinkedIn', url: p.contact.linkedin, Icon: Linkedin }];
  return <section id="contact" className="contact-section"><BinaryStreams theme="light" /><div className="container"><div className="contact-top"><h2>Good things start<br />with a <span>conversation.</span></h2><ArrowUpRight className="contact-arrow" size={110} strokeWidth={1} aria-hidden="true" /></div><div className="contact-bottom"><div><p>Have an idea, a question, or just want to say hello?</p>{p.contact.email ? <div className="email-actions"><a className="email-link" href={`mailto:${p.contact.email}`}><Mail {...iconProps} />{p.contact.email}</a><button className="copy-button" onClick={copyEmail}>{copied ? <Check size={16} aria-hidden="true" /> : null}{copied ? 'Copied' : 'Copy email'}</button><span className="sr-only" role="status">{copied ? 'Email address copied.' : copyError ? 'Copy failed. Use the email link instead.' : ''}</span></div> : <div className="contact-placeholder"><Mail {...iconProps} /><span>[Your email address]</span><span className="placeholder-note">To be added</span></div>}</div><div className="social-links">{links.map(({ name, url, Icon }) => url ? <a href={url} key={name} target="_blank" rel="noopener noreferrer" aria-label={`${name} (opens in a new tab)`}><Icon {...iconProps} />{name}<ArrowUpRight size={16} aria-hidden="true" /></a> : <div key={name} className="social-placeholder"><Icon {...iconProps} /><span>{name}</span><span>To be added</span></div>)}</div></div></div></section>;
}

function CaseStudy({ projectId = 'featured-project' }: { projectId?: string }) {
  const currentProject = projects.find(item => item.id === projectId) || projects[0];
  const currentSections = currentProject.sections || p.project.sections;
  const currentRoles = currentProject.roles || p.roles;
  return <article id="case-study" className="case-study container">
    <a className="text-link back-link" href="#work"><ArrowLeft {...iconProps} /> Back to selected work</a>
    <div className="case-title">
      <h1 aria-label={currentProject.name}>{currentProject.name}<span className="accent">.</span></h1>
      <span className="status-tag">{currentProject.featured ? 'Featured Case Study' : 'Project Case Study'}</span>
      <p>{currentProject.description}</p>
    </div>
    <div className="case-meta">
      <div><span>Category</span><strong>{currentProject.category}</strong></div>
      <div><span>My responsibilities</span><strong>{currentProject.role}</strong></div>
      <div><span>Stack</span><strong>{currentProject.technologies.join(', ')}</strong></div>
    </div>
    <ProjectVisual compact project={currentProject} category={currentProject.category} />
    <div className="case-layout">
      <aside className="case-toc">
        <nav aria-label="Case study contents">
          <h2>In this case study</h2>
          <a href="#case-study-overview">Overview</a>
          <a href="#case-study-problem">Problem & user persona</a>
          <a href="#case-study-roles">My contributions</a>
          <a href="#case-study-process">Process & designs</a>
          <a href="#case-study-result">Result & reflections</a>
        </nav>
      </aside>
      <div className="case-body">
        <p className="placeholder-explanation">An in-depth look at the architecture, engineering decisions, and usability considerations behind {currentProject.name}.</p>
        {currentSections.map((section, i) => <div key={section.id}>
          <section id={`case-study-${section.id}`} className="case-section">
            <h2>{section.title}</h2>
            <p>{section.prompt}</p>
            {section.id === 'problem' && currentProject.persona && (
              <div className="persona-card" aria-label={`Target User Persona: ${currentProject.persona.name}`}>
                <div className="persona-top">
                  <div className="persona-avatar" aria-hidden="true">
                    <span>{currentProject.persona.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                  </div>
                  <div className="persona-meta">
                    <span className="persona-badge">Target User Persona</span>
                    <h3 className="persona-name">{currentProject.persona.name}</h3>
                    <p className="persona-demographics">{currentProject.persona.demographics}</p>
                  </div>
                </div>

                <blockquote className="persona-quote">
                  <Quote size={18} className="persona-quote-icon" aria-hidden="true" />
                  <p>“{currentProject.persona.quote}”</p>
                </blockquote>

                <div className="persona-columns">
                  <div className="persona-col">
                    <div className="persona-col-title">
                      <Target size={16} strokeWidth={2} aria-hidden="true" />
                      <span>Goals & Needs</span>
                    </div>
                    <ul>
                      {currentProject.persona.goals.map((goal, idx) => (
                        <li key={idx}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="persona-col">
                    <div className="persona-col-title">
                      <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                      <span>Pain Points & Friction</span>
                    </div>
                    <ul>
                      {currentProject.persona.painPoints.map((pain, idx) => (
                        <li key={idx}>{pain}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="persona-col">
                    <div className="persona-col-title">
                      <Sparkles size={16} strokeWidth={2} aria-hidden="true" />
                      <span>Behaviors & Habits</span>
                    </div>
                    <ul>
                      {currentProject.persona.techHabits.map((habit, idx) => (
                        <li key={idx}>{habit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {section.id === 'process' && <ProjectWireframes projectId={currentProject.id} projectName={currentProject.name} />}
          </section>
          {i === 1 && <section id="case-study-roles" className="case-section">
            <h2>My role & contributions</h2>
            <p>Individual contributions across project stages:</p>
            <div className="role-details">
              {currentRoles.map(role => <details key={role.title}><summary>{role.title}<ChevronDown {...iconProps} /></summary><p>{role.description}</p></details>)}
            </div>
          </section>}
        </div>)}
        <section className="case-section">
          <h2>Project links</h2>
          {(currentProject.repository || currentProject.liveDemo) ? <div className="hero-actions">
            {currentProject.repository && <a className="button secondary" href={currentProject.repository} target="_blank" rel="noopener noreferrer">View source <Github {...iconProps} /><span className="sr-only"> (opens in a new tab)</span></a>}
            {currentProject.liveDemo && <a className="button primary" href={currentProject.liveDemo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight {...iconProps} /><span className="sr-only"> (opens in a new tab)</span></a>}
          </div> : <p>[Add the supplied project reference or repository link here.]</p>}
        </section>
        <a className="button primary" href="#contact">Get in touch <ArrowUpRight {...iconProps} /></a>
      </div>
    </div>
  </article>;
}

export default App;
