import {
  Code2,
  PanelsTopLeft,
  ScanLine,
  Search,
  type LucideIcon,
} from 'lucide-react';

export interface WorkflowStep {
  num: string;
  title: string;
  question: string;
  detail: string;
  body: string;
  Icon: LucideIcon;
}

export const processSteps: WorkflowStep[] = [
  {
    num: '01',
    title: 'Requirements Analysis',
    question: 'Who am I building for, and what slows you down right now?',
    detail: 'User workflows · Functional scope · Data modeling',
    body: 'I talk with students and staff to turn paper bottlenecks into simple features.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'UI/UX & Accessibility',
    question: 'Can you read and navigate every screen without guesswork?',
    detail: 'Wireframing · WCAG 2.2 AA · Typography & contrast',
    body: 'I map clear headings, keyboard navigation, and WCAG 2.2 AA contrast before coding.',
    Icon: PanelsTopLeft,
  },
  {
    num: '03',
    title: 'Full-Stack Implementation',
    question: 'How do your clicks connect cleanly to saved data?',
    detail: 'TypeScript · React / Next.js · Modular architecture',
    body: 'I build reusable TypeScript components and lean APIs that load fast on mobile.',
    Icon: Code2,
  },
  {
    num: '04',
    title: 'Quality Assurance & Testing',
    question: 'Does everything hold up when you tab, zoom, or lose signal?',
    detail: 'Cross-viewport checks · Keyboard sweeps · Edge-case fixes',
    body: 'I test across phones and laptops, tabbing through forms to catch edge cases early.',
    Icon: ScanLine,
  },
];
