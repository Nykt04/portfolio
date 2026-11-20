import { AlertCircle, Quote, Sparkles, Target } from 'lucide-react';
import type { ProjectPersona } from '../../types/portfolio';

export function PersonaCard({ persona }: { persona: ProjectPersona }) {
  return (
    <div
      className="mt-10 border border-[rgb(var(--g200))] bg-[rgb(var(--surface))] p-6 sm:p-7"
      aria-label={`Illustrative Target Persona: ${persona.name}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[rgb(var(--g200))] pb-5">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--bg))] font-pixel text-sm font-bold text-[rgb(var(--accent))]"
            aria-hidden="true"
          >
            {persona.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div>
            <span className="micro-label text-[rgb(var(--accent))]">Illustrative Target Persona</span>
            <h3 className="mt-0.5 text-[16px] font-semibold text-[rgb(var(--ink))]">{persona.name}</h3>
            <p className="font-mono text-[11px] text-[rgb(var(--g500))]">{persona.demographics}</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-5 gap-y-1.5 font-mono text-[11px] text-[rgb(var(--g600))] sm:grid-cols-3">
          {persona.age && (
            <div>
              <dt className="inline text-[rgb(var(--g400))]">Age:</dt> <dd className="inline">{persona.age}</dd>
            </div>
          )}
          {persona.education && (
            <div>
              <dt className="inline text-[rgb(var(--g400))]">Education:</dt>{' '}
              <dd className="inline">{persona.education}</dd>
            </div>
          )}
          {persona.hometown && (
            <div>
              <dt className="inline text-[rgb(var(--g400))]">Hometown:</dt>{' '}
              <dd className="inline">{persona.hometown}</dd>
            </div>
          )}
          {persona.family && (
            <div>
              <dt className="inline text-[rgb(var(--g400))]">Family:</dt> <dd className="inline">{persona.family}</dd>
            </div>
          )}
          {persona.occupation && (
            <div>
              <dt className="inline text-[rgb(var(--g400))]">Occupation:</dt>{' '}
              <dd className="inline">{persona.occupation}</dd>
            </div>
          )}
        </dl>
      </div>

      <blockquote className="mt-5 flex items-start gap-3 font-serif-ui text-[15px] italic leading-relaxed text-[rgb(var(--ink))]">
        <Quote size={16} className="mt-1 shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
        <p>“{persona.quote}”</p>
      </blockquote>

      {persona.scenario && (
        <p className="mt-4 max-w-prose border-l-2 border-[rgb(var(--accent))] pl-4 text-[13.5px] leading-relaxed text-[rgb(var(--g600))]">
          {persona.scenario}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[rgb(var(--g200))] pt-5 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
            <Target size={13} aria-hidden="true" />
            <span>Goals</span>
          </div>
          <ul className="mt-2.5 space-y-2 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
            {persona.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
            <AlertCircle size={13} aria-hidden="true" />
            <span>Frustrations</span>
          </div>
          <ul className="mt-2.5 space-y-2 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
            {persona.painPoints.map((pain, i) => (
              <li key={i}>{pain}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--accent))]">
            <Sparkles size={13} aria-hidden="true" />
            <span>Tech Habits</span>
          </div>
          <ul className="mt-2.5 space-y-2 pl-4 text-[13px] leading-relaxed text-[rgb(var(--g600))]">
            {persona.techHabits.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
