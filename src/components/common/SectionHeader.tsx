interface SectionHeaderProps {
  index: string;
  title: string;
  titleId?: string;
  subtitle?: string;
  meta?: string;
  compact?: boolean;
  className?: string;
  headingClassName?: string;
}

export function SectionHeader({
  index,
  title,
  titleId,
  subtitle,
  meta,
  compact = false,
  className,
  headingClassName,
}: SectionHeaderProps) {
  if (compact) {
    return (
      <div className={className ?? 'flex items-baseline gap-2.5'}>
        <span className="section-index-badge">{index}</span>
        <h2 id={titleId} className={headingClassName ?? 'section-index-title'}>
          {title}
        </h2>
      </div>
    );
  }

  return (
    <div
      className={
        className ??
        `mb-6 flex flex-wrap ${subtitle ? 'items-end' : 'items-baseline'} justify-between gap-2 sm:mb-7 sm:gap-4`
      }
    >
      <div>
        <div className="flex items-baseline gap-2.5">
          <span className="section-index-badge">{index}</span>
          <h2 id={titleId} className={headingClassName ?? 'section-index-title'}>
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="mt-2 max-w-prose text-[14.5px] leading-relaxed text-[rgb(var(--g600))]">
            {subtitle}
          </p>
        )}
      </div>
      {meta && <span className="micro-label">{meta}</span>}
    </div>
  );
}
