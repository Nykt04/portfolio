import { Lock } from 'lucide-react';

const DEFAULT_LABEL = 'Internal CCS Repo';
const DEFAULT_NOTICE = 'Exclusive internal system for Gordon College, College of Computer Studies.';

export function AccessNoticeLink({
  notice,
  label,
  size = 'sm',
}: {
  notice?: string;
  label?: string;
  size?: 'sm' | 'md';
}) {
  const text = label || DEFAULT_LABEL;
  const tooltip = notice || DEFAULT_NOTICE;
  const iconSize = size === 'md' ? 13 : 12;
  const textClass = size === 'md' ? 'text-[11.5px]' : 'text-[11px]';

  return (
    <a
      href="#403"
      className={`inline-flex min-h-[44px] items-center gap-1.5 border border-dashed border-[rgb(var(--g300))] bg-[rgb(var(--surface))] px-3 font-mono ${textClass} text-[rgb(var(--g500))] transition-colors hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--ink))]`}
      title={tooltip}
    >
      <Lock size={iconSize} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
      <span>{text}</span>
    </a>
  );
}
