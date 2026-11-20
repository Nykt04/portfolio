import { useState } from 'react';
import { Check } from 'lucide-react';
import { portfolio as p, projects } from '../../data/portfolio';
import { languageDescriptions } from '../../data/techIcons';
import { getProjectStackSet, toolkitTools } from '../../utils/projectStack';
import { SectionHeader } from '../common/SectionHeader';
import { TechIcon } from '../common/TechIcon';

export function ToolkitSection() {
  const [projectId, setProjectId] = useState<'all' | string>('all');
  const [activeToolName, setActiveToolName] = useState<string | null>(null);

  const selectedProject = projects.find((item) => item.id === projectId);
  const projectStack = selectedProject ? getProjectStackSet(selectedProject) : null;
  const activeTool = toolkitTools.find((t) => t.name === activeToolName);

  const matchCount = projectStack
    ? p.skills.filter((s) => projectStack.has(s)).length +
      toolkitTools.filter((t) => projectStack.has(t.name)).length
    : p.skills.length + toolkitTools.length;

  return (
    <section
      id="toolkit"
      className="border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="toolkit-title"
    >
      <SectionHeader
        index="03"
        title="Stack & Technical Skills"
        titleId="toolkit-title"
        meta="languages, frameworks & tools"
        className="mb-7 flex flex-wrap items-baseline justify-between gap-2 sm:mb-8"
      />

      <div>
        {/* Project Stack Filter */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-4">
          <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Highlight stack used in project">
            <span className="mr-1 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))]">
              Project:
            </span>
            <button
              type="button"
              aria-pressed={projectId === 'all'}
              onClick={() => setProjectId('all')}
              className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
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
                  className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
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
          <span className="font-mono text-xs font-medium text-[rgb(var(--accent))]">
            {selectedProject ? `${matchCount} used in ${selectedProject.name}` : `${matchCount} total`}
          </span>
        </div>

        {/* Core Programming Languages Grid */}
        <div className="mb-10">
          <div className="mb-3.5 flex items-baseline justify-between">
            <h3 className="micro-label">Primary Languages</h3>
            <span className="font-mono text-[11px] text-[rgb(var(--g400))]">{p.skills.length} core</span>
          </div>
          <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {p.skills.map((lang) => {
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
                      <TechIcon name={lang} size={18} />
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

        {/* Frameworks & Tools Grid */}
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="micro-label">Frameworks, Cloud &amp; Design Tools</h3>
          <span className="font-mono text-[11px] text-[rgb(var(--g400))]">
            {toolkitTools.length} tools · select for note
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {toolkitTools.map((tool) => {
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
                    <TechIcon name={tool.name} size={16} />
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
    </section>
  );
}
