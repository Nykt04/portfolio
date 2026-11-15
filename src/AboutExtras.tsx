import { useState } from 'react';
import { Code2, UserRound } from 'lucide-react';
import {
  siC,
  siFigma,
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
  Supabase: siSupabase,
  Photoshop: designIcons.adobephotoshop,
  Illustrator: designIcons.adobeillustrator,
  Canva: designIcons.canva,
  'VS Code': editorIcons.visualstudiocode,
};

const languageDescriptions: Record<string, string> = {
  Python: 'General-purpose programming, scripting, and algorithmic problem solving.',
  TypeScript: 'Static typing for maintainable, scalable modern web applications.',
  JavaScript: 'Core client and server-side interactive web development (ES6+).',
  C: 'Systems programming fundamentals, memory management, and pointers.',
};

export const toolkit = [
  ...p.skills.map((name) => ({
    name,
    category: 'Languages',
    description: languageDescriptions[name] || 'Core programming language.',
  })),
  ...p.tools.filter((t) => t.category !== 'IDE & AI'),
];

const categories = ['All', ...Array.from(new Set(toolkit.map((t) => t.category)))];

export function Portrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`flex flex-col justify-between ${className}`}>
      <div className="mb-3 flex items-center justify-between border-b border-[rgb(var(--g200))] pb-2.5 font-mono text-[11px] text-[rgb(var(--g500))]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[rgb(var(--accent))]">
          <span className="pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
          <span>Portrait</span>
        </span>
        <span>Gordon College</span>
      </div>

      <div className="relative flex-1 min-h-[260px] sm:min-h-[290px] overflow-hidden bg-[rgb(var(--g50))]">
        {p.portrait.src && !failed ? (
          <img
            src={p.portrait.src}
            alt={p.portrait.alt}
            width={575}
            height={575}
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
            className="block h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]">
              <UserRound size={32} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <strong className="mt-3 font-display-ui text-sm font-semibold text-[rgb(var(--ink))]">
              {p.name}
            </strong>
            <span className="mt-1 font-mono text-xs text-[rgb(var(--g500))]">
              {p.title}
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-4 border-t border-[rgb(var(--g200))] pt-3.5">
        <strong className="block font-display-ui text-[14px] font-semibold text-[rgb(var(--ink))]">
          {p.name}
        </strong>
        <span className="font-mono text-xs text-[rgb(var(--g500))]">{p.title}</span>
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
      <div className="mb-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="micro-label">Primary Languages</h3>
          <span className="font-mono text-xs text-[rgb(var(--accent))] font-medium">{p.skills.length} core languages</span>
        </div>
        <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
          {p.skills.map((lang) => {
            const icon = techIcons[lang as keyof typeof techIcons];
            return (
              <div
                key={lang}
                className="py-5 sm:px-5 lg:first:pl-0 lg:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-[rgb(var(--accent))]">
                    {icon ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={icon.path} />
                      </svg>
                    ) : (
                      <Code2 size={20} aria-hidden="true" />
                    )}
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[rgb(var(--g400))]">
                    Core Skill
                  </span>
                </div>
                <div className="mt-3.5 font-display-ui text-base font-bold text-[rgb(var(--ink))]">{lang}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-[rgb(var(--g600))]">
                  {languageDescriptions[lang] || 'Core language in my software engineering toolkit.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Filter Row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="micro-label">Frameworks, Libraries &amp; Developer Tools</h3>
        <span className="font-mono text-xs text-[rgb(var(--g400))]">
          {visible.length} technologies
        </span>
      </div>

      <div
        className="mb-6 flex flex-wrap gap-4 border-b border-[rgb(var(--g200))] pb-2"
        role="group"
        aria-label="Filter technologies by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={`py-1 font-mono text-xs transition-colors ${
              category === cat
                ? 'font-semibold text-[rgb(var(--ink))] underline decoration-[rgb(var(--accent))] decoration-2 underline-offset-[10px]'
                : 'text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filtered Tools Grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((tool) => {
          const icon = techIcons[tool.name as keyof typeof techIcons];
          return (
            <div
              key={tool.name}
              className="group flex items-start gap-3.5 border-t border-[rgb(var(--g200))] py-4"
            >
              <span className="mt-0.5 flex shrink-0 items-center justify-center text-[rgb(var(--accent))]">
                {icon ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={icon.path} />
                  </svg>
                ) : (
                  <Code2 size={17} aria-hidden="true" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <strong className="font-display-ui text-sm font-semibold text-[rgb(var(--ink))]">
                    {tool.name}
                  </strong>
                  <span className="font-mono text-[10px] text-[rgb(var(--g400))]">
                    {tool.category}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--g600))] line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
