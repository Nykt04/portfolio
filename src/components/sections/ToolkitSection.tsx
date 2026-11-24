import { useState } from 'react';
import { Check } from 'lucide-react';
import { portfolio as p, projects } from '../../data/portfolio';
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
        meta="languages & tools"
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
        <div className="mb-9">
          <div className="mb-3.5 flex items-baseline justify-between">
            <h3 className="micro-label">Primary Languages</h3>
            <span className="font-mono text-[11px] text-[rgb(var(--g400))]">{p.skills.length} core</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] lg:grid-cols-4 lg:divide-y-0">
            {p.skills.map((lang) => {
              const isMatch = !projectStack || projectStack.has(lang);
              return (
                <div
                  key={lang}
                  className={`flex items-center justify-between gap-2 px-4 py-3.5 transition-opacity lg:first:pl-0 lg:last:pr-0 ${
                    isMatch ? 'opacity-100' : 'opacity-35'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center text-[rgb(var(--accent))]">
                      <TechIcon name={lang} size={17} />
                    </span>
                    <span className="font-display-ui text-sm font-bold text-[rgb(var(--ink))]">{lang}</span>
                  </div>
                  {projectStack && isMatch && (
                    <Check size={13} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Frameworks & Tools Grid */}
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="micro-label">Frameworks, Cloud &amp; Design Tools</h3>
          <span className="font-mono text-[11px] text-[rgb(var(--g400))]">{toolkitTools.length} tools</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {toolkitTools.map((tool) => {
            const isMatch = !projectStack || projectStack.has(tool.name);
            const isSelected = activeToolName === tool.name;
            return (
              <button
                key={tool.name}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveToolName((curr) => (curr === tool.name ? null : tool.name))}
                className={`group flex min-h-[48px] items-center justify-between gap-2.5 border px-3.5 py-2.5 text-left transition-all ${
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
                  <strong className="truncate font-display-ui text-[13px] font-semibold text-[rgb(var(--ink))]">
                    {tool.name}
                  </strong>
                </span>
                {projectStack && isMatch && (
                  <Check size={13} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Single-line Tool / Project Readout (shown on interaction) */}
        {(activeTool || selectedProject) && (
          <div className="mt-5 flex min-h-[38px] items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-4 font-mono text-xs text-[rgb(var(--g500))]">
            {activeTool ? (
              <span>
                <strong className="text-[rgb(var(--ink))]">{activeTool.name}</strong> — {activeTool.description}
              </span>
            ) : (
              selectedProject && (
                <span>
                  Filtered to <strong className="text-[rgb(var(--ink))]">{selectedProject.name}</strong>.{' '}
                  <a href={selectedProject.caseStudy} className="text-[rgb(var(--accent))] hover:underline">
                    Open case study →
                  </a>
                </span>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
