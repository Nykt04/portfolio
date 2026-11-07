import { useState } from 'react';
import { ArrowUpRight, Search, PanelsTopLeft, Code2, ScanLine } from 'lucide-react';

const steps = [
  { title: 'Understand the problem', Icon: Search, question: 'Who am I building for?', text: 'Requirements analysis starts with the people using the product. Clear needs, constraints, and priorities give an idea a useful direction.', detail: 'User needs / Requirements / Scope' },
  { title: 'Make it feel intuitive', Icon: PanelsTopLeft, question: 'Can someone use it without a guide?', text: 'Navigation, hierarchy, readable type, and accessible colors help people find their way. Wireframes make those decisions easier to explore.', detail: 'Wireframes / Interaction / Accessibility' },
  { title: 'Build with intention', Icon: Code2, question: 'How do the pieces fit together?', text: 'Breaking a problem into smaller components connects the design to the code. Version control keeps changes understandable as a project develops.', detail: 'Components / Implementation / Version control' },
  { title: 'Test and refine', Icon: ScanLine, question: 'What could work better?', text: 'Keyboard checks, different screen sizes, and feedback reveal things a first draft misses. Testing gives the next iteration a clear purpose.', detail: 'Usability / Quality assurance / Iteration' },
];

export default function Approach() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const Icon = step.Icon;
  return <section id="approach" className="approach-section container" aria-labelledby="approach-title">
    <div className="approach-heading"><h2 id="approach-title">Beyond the<br /><span className="accent">lines of code.</span></h2><p>The questions guiding my growth in software engineering. Explore each part of the process.</p></div>
    <div className="approach-layout">
      <div className="approach-steps" role="group" aria-label="Explore the development process">{steps.map((item, index) => <button key={item.title} type="button" aria-pressed={active === index} aria-controls="approach-detail" onClick={() => setActive(index)}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span><ArrowUpRight size={20} aria-hidden="true" /></button>)}</div>
      <div className="approach-detail" id="approach-detail" role="status" aria-live="polite" aria-atomic="true"><div className="approach-reveal" key={active}><Icon size={42} strokeWidth={1.3} aria-hidden="true" /><h3>{step.question}</h3><p>{step.text}</p><span className="approach-topics">{step.detail}</span></div><button className="text-link process-next" type="button" onClick={() => setActive((active + 1) % steps.length)}>Next step <ArrowUpRight size={18} aria-hidden="true" /></button></div>
    </div>
  </section>;
}
