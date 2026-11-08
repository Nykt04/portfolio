import { useState } from 'react';
import { UserRound, ArrowUpRight, Code2 } from 'lucide-react';
import { siPython, siTypescript, siJavascript, siC, siFigma, siGit, siGithub, siVercel, siFirebase, siSupabase, siClaude } from 'simple-icons';
import { portfolio as p } from './portfolio';
import { designIcons } from './designIcons';
import { editorIcons } from './editorIcons';

const icons = { Python: siPython, TypeScript: siTypescript, JavaScript: siJavascript, C: siC, Figma: siFigma, Git: siGit, GitHub: siGithub, Vercel: siVercel, Firebase: siFirebase, Supabase: siSupabase, Photoshop: designIcons.adobephotoshop, Illustrator: designIcons.adobeillustrator, Canva: designIcons.canva, 'VS Code': editorIcons.visualstudiocode, Codex: editorIcons.openai, Claude: siClaude };
const categories = ['All', 'Languages', 'Design', 'Workflow', 'Cloud', 'IDE & AI', 'Frameworks', 'Backend', 'Mobile', 'Database', 'UI/UX'];
const languageDescriptions: Record<string, string> = {
  Python: 'General-purpose programming and scripting.', TypeScript: 'JavaScript with static types for clearer application code.',
  JavaScript: 'Interactive experiences for the web.', C: 'Foundations of systems programming and memory management.',
};
const toolkit = [...p.skills.map(name => ({ name, category: 'Languages', description: languageDescriptions[name] || 'Part of my programming toolkit.' })), ...p.tools];

export function Portrait() {
  const [failed, setFailed] = useState(false);
  return <figure className="portrait">
    {p.portrait.src && !failed ? <img src={p.portrait.src} alt={p.portrait.alt} width={480} height={560} loading="lazy" onError={() => setFailed(true)} /> :
      <div className="portrait-placeholder"><UserRound size={68} strokeWidth={1} aria-hidden="true" /><strong>Your photo goes here</strong><span>{failed ? 'Photo unavailable — check the image path.' : 'A little more personal. Coming soon.'}</span></div>}
    <figcaption><span>{p.shortName}<small>{p.title}</small></span><ArrowUpRight size={22} aria-hidden="true" /></figcaption>
  </figure>;
}

// Decorative duplicate of the toolkit; the real, accessible list lives in <Toolkit />.
export function Marquee() {
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">
    {[...toolkit, ...toolkit].map((tool, i) => { const icon = icons[tool.name as keyof typeof icons]; return <span key={i}>{icon ? <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d={icon.path} /></svg> : <Code2 size={22} />}{tool.name}</span>; })}
  </div></div>;
}

export function Toolkit() {
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<(typeof toolkit)[number] | null>(null);

  const visible = toolkit.filter(tool => category === 'All' || tool.category === category);

  return <div className="skills-block toolkit">
    <div className="toolkit-title-row">
      <h2 id="toolkit-title">Tools of<br /><span>the trade.</span></h2>
      <p>A growing toolkit for ideas,<br />interfaces, and everything in between.</p>
    </div>

    <div className="toolkit-filters" role="group" aria-label="Filter toolkit by category">
      {categories.map(value => {
        const count = value === 'All' ? toolkit.length : toolkit.filter(t => t.category === value).length;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={category === value}
            onClick={() => { setCategory(value); setSelected(null); }}
          >
            {value} <span className="cat-pill">({count})</span>
          </button>
        );
      })}
    </div>

    {visible.length > 0 ? (
      <div className="skills-list" data-filter={category} aria-label="Tools">
        {visible.map(tool => {
          const icon = icons[tool.name as keyof typeof icons];
          return (
            <button
              className="skill"
              type="button"
              key={tool.name}
              aria-controls="tool-description"
              onMouseEnter={() => setSelected(tool)}
              onFocus={() => setSelected(tool)}
              onClick={() => setSelected(tool)}
            >
              {icon ? <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={icon.path} /></svg> : <Code2 size={19} aria-hidden="true" />}
              <span>{tool.name}</span>
              <small>{tool.category}</small>
              <ArrowUpRight className="tool-arrow" size={18} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    ) : (
      <div className="toolkit-empty" role="status">
        <p>No technologies matched under {category}.</p>
        <button
          type="button"
          className="button secondary"
          style={{ marginTop: '10px', padding: '6px 14px', fontSize: '0.8rem' }}
          onClick={() => setCategory('All')}
        >
          Reset filters
        </button>
      </div>
    )}

    <div className="tool-description" id="tool-description" role="status" aria-live="polite" aria-atomic="true">
      <strong>{selected?.name || 'Explore the toolkit'}</strong>
      <p>{selected?.description || 'Hover, focus, or tap a tool to learn what it does.'}</p>
    </div>
  </div>;
}
