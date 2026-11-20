import { useState } from 'react';
import { processSteps } from '../../data/workflow';

export function WorkflowTabs() {
  const [activeProcess, setActiveProcess] = useState(0);
  const currentStep = processSteps[activeProcess];
  const StepIcon = currentStep.Icon;

  return (
    <div className="mt-14">
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="micro-label">Engineering &amp; UI/UX Workflow</h3>
        <span className="font-mono text-[11px] text-[rgb(var(--accent))]">
          PHASE 0{activeProcess + 1} // 0{processSteps.length}
        </span>
      </div>

      <div
        className="grid grid-cols-2 divide-x divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-4 sm:divide-y-0"
        role="tablist"
        aria-label="Engineering workflow steps"
      >
        {processSteps.map((step, idx) => {
          const selected = activeProcess === idx;
          return (
            <button
              key={step.num}
              id={`workflow-tab-${idx}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`workflow-panel-${idx}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveProcess(idx)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const delta = e.key === 'ArrowRight' ? 1 : -1;
                  const next = (idx + delta + processSteps.length) % processSteps.length;
                  setActiveProcess(next);
                  document.getElementById(`workflow-tab-${next}`)?.focus();
                }
              }}
              className={`border-b-2 px-4 py-4 text-left transition-colors ${
                selected
                  ? 'border-b-[rgb(var(--accent))] text-[rgb(var(--ink))]'
                  : 'border-b-transparent text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
              }`}
            >
              <span
                className={`block font-mono text-[10px] font-semibold ${
                  selected ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--g400))]'
                }`}
              >
                PHASE // {step.num}
              </span>
              <span className="mt-1.5 block text-[13px] font-semibold leading-snug">{step.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`workflow-panel-${activeProcess}`}
        role="tabpanel"
        aria-labelledby={`workflow-tab-${activeProcess}`}
        className="grid grid-cols-1 gap-6 pt-7 lg:grid-cols-12 lg:items-stretch"
      >
        <div className="flex flex-col justify-center lg:col-span-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[rgb(var(--accent))]">
            {currentStep.detail}
          </span>
          <h4 className="mt-2 font-pixel text-lg font-bold leading-snug text-[rgb(var(--ink))]">
            {currentStep.question}
          </h4>
        </div>
        <div className="flex items-center justify-between gap-4 lg:col-span-7 lg:border-l lg:border-[rgb(var(--g200))] lg:pl-8">
          <p className="max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
            {currentStep.body}
          </p>
          <StepIcon size={18} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
