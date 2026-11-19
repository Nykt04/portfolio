import { useEffect, useState } from 'react';
import { Check, Code2, UserRound } from 'lucide-react';
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
import { portfolio as p, projects, type PortfolioProject } from './portfolio';
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
  Python: 'Scripting, algorithms, and backend automation.',
  TypeScript: 'Type-safe UI components and predictable app state.',
  JavaScript: 'Interactive browser views and Node.js / Express APIs.',
  C: 'Low-level memory management, pointers, and systems logic.',
};

const toolkit = p.tools.filter((t) => t.category !== 'IDE & AI');

function getProjectStackSet(proj: PortfolioProject): Set<string> {
  const matched = new Set<string>();
  const allNames = [...p.skills, ...toolkit.map((t) => t.name)];
  for (const tech of proj.technologies) {
    const low = tech.toLowerCase();
    for (const name of allNames) {
      if (low === name.toLowerCase() || low.startsWith(`${name.toLowerCase()} `)) {
        matched.add(name);
      }
    }
  }
  if (proj.caseStudyDetail?.startingDesign.lofiPrototype.url?.includes('figma.com')) {
    matched.add('Figma');
  }
  if (proj.repository || proj.id === 'project-3') {
    matched.add('Git');
    matched.add('GitHub');
  }
  return matched;
}

export function Portrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true,
  );

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'));
    const onThemeEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ dark?: boolean }>).detail;
      setIsDark(typeof detail?.dark === 'boolean' ? detail.dark : document.documentElement.classList.contains('dark'));
    };
    const observer = new MutationObserver(sync);

    window.addEventListener('gk-theme-change', onThemeEvent);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('gk-theme-change', onThemeEvent);
      observer.disconnect();
    };
  }, []);

  return (
    <figure className={`flex flex-col justify-between ${className}`}>
      <div className="mb-4 flex items-center justify-between border-b border-[rgb(var(--g200))] pb-3.5 font-mono text-[11px] leading-none text-[rgb(var(--g500))]">
        <span className="inline-flex items-center gap-2 font-semibold text-[rgb(var(--accent))]">
          <span className="pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
          <span>Portrait</span>
        </span>
        <span>Gordon College</span>
      </div>

      <div className="portrait-frame relative mx-auto aspect-[10/9] w-full max-w-[360px] overflow-hidden bg-[rgb(var(--g50))] lg:mx-0 lg:max-w-none lg:flex-1 lg:min-h-[290px]">
        {p.portrait.lightSrc && p.portrait.darkSrc && !failed ? (
          <>
            <img
              src={p.portrait.darkSrc}
              alt={isDark ? `${p.portrait.alt} (dark mode, without glasses)` : ''}
              aria-hidden={!isDark}
              width={1280}
              height={720}
              loading="eager"
              decoding="async"
              onError={() => setFailed(true)}
              className="absolute inset-0 block h-full w-full object-cover object-top"
            />
            <img
              src={p.portrait.lightSrc}
              alt={!isDark ? `${p.portrait.alt} (light mode, wearing sunglasses)` : ''}
              aria-hidden={isDark}
              width={1280}
              height={720}
              loading="eager"
              decoding="async"
              onError={() => setFailed(true)}
              className="portrait-sunglasses pointer-events-none absolute inset-0 block h-full w-full object-cover object-top"
            />
          </>
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

      <figcaption className="mt-3.5">
        <strong className="block font-display-ui text-[14px] font-semibold text-[rgb(var(--ink))]">
          {p.name}
        </strong>
        <span className="font-mono text-xs text-[rgb(var(--g500))]">{p.title}</span>
      </figcaption>
    </figure>
  );
}

export function Toolkit() {
  const [projectId, setProjectId] = useState<'all' | string>('all');
  const [activeToolName, setActiveToolName] = useState<string | null>(null);

  const selectedProject = projects.find((item) => item.id === projectId);
  const projectStack = selectedProject ? getProjectStackSet(selectedProject) : null;
  const activeTool = toolkit.find((t) => t.name === activeToolName);

  const matchCount = projectStack
    ? p.skills.filter((s) => projectStack.has(s)).length +
      toolkit.filter((t) => projectStack.has(t.name)).length
    : p.skills.length + toolkit.length;

  return (
    <div>
      {/* Project Stack Filter */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-4">
        <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Highlight stack used in project">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))] mr-1">
            Project:
          </span>
          <button
            type="button"
            aria-pressed={projectId === 'all'}
            onClick={() => setProjectId('all')}
            className={`px-3 py-1.5 font-mono text-xs transition-colors border ${
              projectId === 'all'
                ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent))] font-semibold text-[rgb(var(--accent-fg))]'
                : 'border-[rgb(var(--g200))] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
            }`}
          >
            All
          </button>
          {projects.map((proj) => {
            const active = projectId === proj.id;
            return (
              <button
                key={proj.id}
                type="button"
                aria-pressed={active}
                onClick={() => setProjectId(active ? 'all' : proj.id)}
                className={`px-3 py-1.5 font-mono text-xs transition-colors border ${
                  active
                    ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent))] font-semibold text-[rgb(var(--accent-fg))]'
                    : 'border-[rgb(var(--g200))] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
                }`}
              >
                {proj.name}
              </button>
            );
          })}
        </div>
        <span className="font-mono text-xs text-[rgb(var(--accent))] font-medium">
          {selectedProject ? `${matchCount} used in ${selectedProject.name}` : `${matchCount} total`}
        </span>
      </div>

      {/* Core Programming Languages Grid (AGENTS.md: Python, TypeScript, JavaScript, and C) */}
      <div className="mb-10">
        <div className="mb-3.5 flex items-baseline justify-between">
          <h3 className="micro-label">Primary Languages</h3>
          <span className="font-mono text-[11px] text-[rgb(var(--g400))]">{p.skills.length} core</span>
        </div>
        <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
          {p.skills.map((lang) => {
            const icon = techIcons[lang as keyof typeof techIcons];
            const isMatch = !projectStack || projectStack.has(lang);
            return (
              <div
                key={lang}
                className={`py-5 transition-opacity sm:px-5 lg:first:pl-0 lg:last:pr-0 ${
                  isMatch ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-[rgb(var(--accent))]">
                    {icon ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={icon.path} />
                      </svg>
                    ) : (
                      <Code2 size={18} aria-hidden="true" />
                    )}
                  </span>
                  {projectStack ? (
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider ${
                        isMatch ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--g400))]'
                      }`}
                    >
                      {isMatch && <Check size={11} aria-hidden="true" />}
                      <span>{isMatch ? 'Used' : 'Unused'}</span>
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[rgb(var(--g400))]">
                      Core
                    </span>
                  )}
                </div>
                <div className="mt-3 font-display-ui text-base font-bold text-[rgb(var(--ink))]">{lang}</div>
                <p className="mt-2 text-xs leading-relaxed text-[rgb(var(--g600))]">
                  {languageDescriptions[lang] || 'Core language.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frameworks & Tools Compact Grid */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="micro-label">Frameworks, Cloud &amp; Design Tools</h3>
        <span className="font-mono text-[11px] text-[rgb(var(--g400))]">
          {toolkit.length} tools · select for note
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
        {toolkit.map((tool) => {
          const icon = techIcons[tool.name as keyof typeof techIcons];
          const isMatch = !projectStack || projectStack.has(tool.name);
          const isSelected = activeToolName === tool.name;
          return (
            <button
              key={tool.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setActiveToolName((curr) => (curr === tool.name ? null : tool.name))}
              className={`group flex min-h-[54px] items-center justify-between gap-2.5 border px-3.5 py-3 text-left transition-all ${
                isSelected
                  ? 'border-[rgb(var(--accent))] bg-[rgb(var(--surface))]'
                  : isMatch
                    ? projectStack
                      ? 'border-[rgb(var(--accent)/0.65)] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))]'
                      : 'border-[rgb(var(--g200))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--ink))]'
                    : 'border-dashed border-[rgb(var(--g200))] bg-transparent opacity-35 hover:opacity-75'
              }`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex shrink-0 items-center text-[rgb(var(--accent))]">
                  {icon ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={icon.path} />
                    </svg>
                  ) : (
                    <Code2 size={16} aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0">
                  <strong className="block truncate font-display-ui text-[13px] font-semibold text-[rgb(var(--ink))]">
                    {tool.name}
                  </strong>
                  <span className="block truncate font-mono text-[9.5px] text-[rgb(var(--g400))]">
                    {tool.category}
                  </span>
                </span>
              </span>
              {projectStack && isMatch && (
                <Check size={13} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Single-line Tool / Project Readout */}
      <div className="mt-5 flex min-h-[42px] items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-4 font-mono text-xs text-[rgb(var(--g500))]">
        {activeTool ? (
          <span>
            <strong className="text-[rgb(var(--ink))]">{activeTool.name}</strong> ({activeTool.category}) —{' '}
            {activeTool.description}
          </span>
        ) : selectedProject ? (
          <span>
            Highlighted <strong className="text-[rgb(var(--ink))]">{selectedProject.name}</strong> stack.{' '}
            <a href={selectedProject.caseStudy} className="text-[rgb(var(--accent))] hover:underline">
              Open case study →
            </a>
          </span>
        ) : (
          <span>Pick a project to filter its stack, or click any tool for its role.</span>
        )}
      </div>
    </div>
  );
}
