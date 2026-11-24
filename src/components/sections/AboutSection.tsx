import { portfolio as p } from '../../data/portfolio';
import { SectionHeader } from '../common/SectionHeader';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative border-t border-[rgb(var(--g200))] py-11 sm:py-12"
      aria-labelledby="about-title"
    >
      <SectionHeader
        index="02"
        title="About"
        titleId="about-title"
        meta="background & roles"
      />

      <div className="grid grid-cols-1 gap-8 border-t border-[rgb(var(--g200))] pt-7 sm:pt-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <p className="max-w-prose text-[15.5px] font-medium leading-relaxed text-[rgb(var(--ink))] lg:col-span-6">
          {p.about}
        </p>

        <dl className="grid grid-cols-1 gap-4 border-t border-[rgb(var(--g200))] pt-6 font-mono text-xs sm:grid-cols-3 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <dt className="micro-label">Education</dt>
            <dd className="mt-1.5 font-medium text-[rgb(var(--ink))]">BS Computer Science</dd>
          </div>
          <div>
            <dt className="micro-label">School</dt>
            <dd className="mt-1.5 font-medium text-[rgb(var(--ink))]">Gordon College · 3rd Year</dd>
          </div>
          <div>
            <dt className="micro-label">Standard</dt>
            <dd className="mt-1.5 font-medium text-[rgb(var(--ink))]">WCAG 2.2 Level AA</dd>
          </div>
        </dl>
      </div>

      <div className="mt-11">
        <h3 className="micro-label mb-4">Areas of Project Responsibility</h3>

        <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {p.roles.map((role, idx) => (
            <div key={role.title} className="py-5 sm:px-5 lg:first:pl-0 lg:last:pr-0">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10.5px] font-medium text-[rgb(var(--g400))]">
                  0{idx + 1}
                </span>
                <h4 className="font-pixel text-[14px] font-bold text-[rgb(var(--ink))]">{role.title}</h4>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[rgb(var(--g500))]">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
