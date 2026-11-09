import { useState } from 'react';
import { Code2, UserRound } from 'lucide-react';
import {
  siC,
  siClaude,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siJavascript,
  siPython,
  siSupabase,
  siTypescript,
  siVercel,
} from 'simple-icons';
import { portfolio as p } from './portfolio';
import { designIcons } from './designIcons';
import { editorIcons } from './editorIcons';

export const techIcons = {
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  C: siC,
  Figma: siFigma,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
  Firebase: siFirebase,
  Supabase: siSupabase,
  Photoshop: designIcons.adobephotoshop,
  Illustrator: designIcons.adobeillustrator,
  Canva: designIcons.canva,
  'VS Code': editorIcons.visualstudiocode,
  Codex: editorIcons.openai,
  Claude: siClaude,
};

const categories = [
  'All',
  'Languages',
  'Frameworks',
  'Design',
  'Workflow',
  'Cloud',
  'IDE & AI',
  'Backend',
  'Mobile',
  'Database',
  'UI/UX',
];

const languageDescriptions: Record<string, string> = {
  Python: 'General-purpose programming, scripting, and problem solving.',
  TypeScript: 'Static typing for reliable, maintainable web applications.',
  JavaScript: 'Interactive client & server-side web development (ES6+).',
  C: 'Systems programming fundamentals, pointers, and memory management.',
};

export const toolkit = [
  ...p.skills.map((name) => ({
    name,
    category: 'Languages',
    description: languageDescriptions[name] || 'Core programming language.',
  })),
  ...p.tools,
];

export function Portrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`gk-blueprint-card m-0 flex h-full flex-col justify-between p-4 sm:p-5 select-none ${className}`}>
      <span className="gk-corner-tick tl" aria-hidden="true" />
      <span className="gk-corner-tick tr" aria-hidden="true" />
      <span className="gk-corner-tick bl" aria-hidden="true" />
      <span className="gk-corner-tick br" aria-hidden="true" />

      <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-[rgb(var(--g500))]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[rgb(var(--accent))]">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
          <span>ID // GK-BSCS-03</span>
        </span>
        <span>GORDON COLLEGE</span>
      </div>

      <div className="relative flex-1 min-h-[240px] sm:min-h-[280px] overflow-hidden rounded-xl border border-[rgb(var(--g200))] bg-[rgb(var(--g50))]">
        {p.portrait.src && !failed ? (
          <img
            src={p.portrait.src}
            alt={p.portrait.alt}
            width={402}
            height={402}
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
            className="block h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center p-6 text-center">
            <UserRound size={48} strokeWidth={1.3} className="text-[rgb(var(--accent))]" aria-hidden="true" />
            <strong className="mt-2 font-display-ui text-sm text-[rgb(var(--ink))]">[Portrait Placeholder]</strong>
            <span className="mt-1 font-mono text-[10px] text-[rgb(var(--g500))]">
              {failed ? 'Add photo at public/images/gian-karlo.jpg' : 'Portrait ready'}
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-3.5 flex items-center justify-between border-t border-[rgb(var(--g200))] pt-3 font-mono text-[11px]">
        <div>
          <strong className="block font-sans-ui text-[13.5px] font-semibold text-[rgb(var(--ink))]">
            {p.shortName}
          </strong>
          <span className="text-[10.5px] text-[rgb(var(--g500))]">{p.title}</span>
        </div>
        <span className="bryl-tag-pill">{p.course}</span>
      </figcaption>
    </figure>
  );
}

export function Toolkit() {
  const [category, setCategory] = useState('All');
  const visible = toolkit.filter((tool) => category === 'All' || tool.category === category);

  return (
    <div>
      {/* Core Programming Languages Grid (AGENTS.md: Python, TypeScript, JavaScript, and C) */}
      <div className="mb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="micro-label">Core Programming Languages</h3>
          <span className="font-mono text-[11px] text-[rgb(var(--accent))]">{p.skills.length} primary languages</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {p.skills.map((lang, idx) => {
            const icon = techIcons[lang as keyof typeof techIcons];
            return (
              <div
                key={lang}
                className="gk-blueprint-card p-4"
              >
                <span className="gk-corner-tick tl" aria-hidden="true" />
                <span className="gk-corner-tick br" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]">
                    {icon ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={icon.path} />
                      </svg>
                    ) : (
                      <Code2 size={16} aria-hidden="true" />
                    )}
                  </span>
                  <span className="font-mono text-[10px] text-[rgb(var(--g400))]">
                    LANG // 0{idx + 1}
                  </span>
                </div>
                <div className="mt-3 font-display-ui text-base text-[rgb(var(--ink))]">{lang}</div>
                <p className="mt-1 text-[12.5px] leading-snug text-[rgb(var(--g500))]">
                  {languageDescriptions[lang] || 'Core language in my software engineering toolkit.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Filter Row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="micro-label">Frameworks, Design &amp; Developer Environment</h3>
        <span className="font-mono text-[11px] text-[rgb(var(--g400))]">
          showing {visible.length} of {toolkit.length}
        </span>
      </div>

      <div
        className="mb-5 flex flex-wrap gap-1.5"
        role="group"
        aria-label="Filter toolkit by category"
      >
        {categories.map((value) => {
          const count = value === 'All' ? toolkit.length : toolkit.filter((t) => t.category === value).length;
          const active = category === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(value)}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                active
                  ? 'bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] font-semibold'
                  : 'border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] text-[rgb(var(--g500))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--ink))]'
              }`}
            >
              {value} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Stack Chips */}
      <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies and tools">
        {visible.map((tool) => {
          const icon = techIcons[tool.name as keyof typeof techIcons];
          return (
            <div
              key={tool.name}
              role="listitem"
              tabIndex={0}
              title={`${tool.name} (${tool.category}) — ${tool.description}`}
              className="bryl-stack-chip group"
            >
              {icon ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="text-[rgb(var(--accent))] transition-colors"
                >
                  <path d={icon.path} />
                </svg>
              ) : (
                <Code2
                  size={14}
                  aria-hidden="true"
                  className="text-[rgb(var(--accent))] transition-colors"
                />
              )}
              <span>{tool.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
