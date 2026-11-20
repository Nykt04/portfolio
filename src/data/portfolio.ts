import { projects, defaultFeaturedId } from './projects';

export { projects, defaultFeaturedId };
export type {
  CaseStudyDetail,
  ErrorCode,
  ErrorDescriptor,
  PortfolioCertification,
  PortfolioProject,
  ProjectPersona,
  ProjectRole,
} from '../types/portfolio';

// Edit this file to personalize the portfolio. Empty URLs render as honest placeholders.
export const portfolio = {
  name: 'Gian Karlo C. Reguindin',
  shortName: 'Gian Karlo',
  title: 'Aspiring Web Developer',
  course: '3rd Year BSCS',
  introduction:
    'I’m Gian Karlo, a computer science student and aspiring web developer interested in building thoughtful, user-friendly digital experiences.',
  about:
    'I’m a 3rd-year Computer Science student at Gordon College building fast, accessible web apps. I turn everyday campus workflows into calm, readable interfaces.',
  education: 'Bachelor of Science in Computer Science, Gordon College',
  interests: 'Full-stack web apps, WCAG 2.2 AA accessibility, and practical student tools.',
  skills: ['Python', 'TypeScript', 'JavaScript', 'C'],
  // Put your portrait images in public/images/ (Light wears sunglasses, Dark without).
  portrait: {
    src: '/images/portrait-dark.jpg',
    lightSrc: '/images/portrait-light.jpg',
    darkSrc: '/images/portrait-dark.jpg',
    alt: 'Portrait of Gian Karlo C. Reguindin',
  },
  tools: [
    { name: 'VS Code', category: 'IDE & AI', description: 'Daily editor for TypeScript, React, and backend code.' },
    { name: 'Figma', category: 'Design', description: 'Wireframes, user flows, and UI prototypes.' },
    { name: 'Photoshop', category: 'Design', description: 'Photo retouching and raster asset prep (TESDA NC III).' },
    { name: 'Illustrator', category: 'Design', description: 'Logos, icons, and scalable vector graphics (TESDA NC III).' },
    { name: 'Canva', category: 'Design', description: 'Quick slide decks and class visual summaries.' },
    { name: 'Git', category: 'Workflow', description: 'Branching, version tracking, and clean team merges.' },
    { name: 'GitHub', category: 'Workflow', description: 'Code hosting, pull requests, and group builds.' },
    { name: 'Vercel', category: 'Cloud', description: 'Live frontend hosting with instant commit previews.' },
    { name: 'Supabase', category: 'Cloud', description: 'Auth and database storage for apps like ACE IT.' },
    { name: 'React', category: 'Frameworks', description: 'Reusable UI components and predictable state.' },
    { name: 'Next.js', category: 'Frameworks', description: 'Full-stack React routing, auth flows, and API endpoints.' },
    { name: 'Tailwind', category: 'Frameworks', description: 'Consistent spacing, typography, and responsive contrast.' },
    { name: 'Node.js', category: 'Backend', description: 'Express API routes and clearance workflows in Check8.' },
  ],
  roles: [
    { title: 'Project Manager', description: 'I plan weekly milestones, unblock teammates, and keep releases on schedule.' },
    {
      title: 'Lead Developer',
      description: 'I build frontend views and backend APIs in TypeScript, React, Next.js, and Node.js.',
    },
    {
      title: 'Quality Assurance',
      description: 'I test keyboard navigation, WCAG 2.2 AA contrast, and mobile layouts before launch.',
    },
    {
      title: 'Requirements Analysis',
      description: 'I map student and staff bottlenecks into simple user flows and database schemas.',
    },
  ],
  contact: {
    email: 'reguindin.giankarlo@gmail.com',
    github: 'https://github.com/Nykt04',
    linkedin: 'https://www.linkedin.com/in/gian-karlo-reguindin-762712349/',
  },
  project: projects[0],
  certifications: [
    {
      id: 'cert-tesda-nc3-vgd',
      title: 'National Certificate III (NC III) in Visual Graphic Design',
      issuer: 'Technical Education and Skills Development Authority (TESDA)',
      date: 'November 23, 2025 · Valid until Nov 22, 2030',
      credentialId: 'Cert No: 25037103008717 · ULI: ULI-RGC-06-124-03071-001',
      credentialUrl: 'https://www.tesda.gov.ph/',
      image: '/certificates/tesda-nc3-visual-graphic-design.jpg',
      skills: ['UI Design', 'UX Design', 'Visual Graphics', 'Logo & Branding', 'Print Media'],
      description:
        'Philippine TVET National Certificate III covering UI/UX design, logo branding, and print media layout.',
    },
    {
      id: 'cert-python-2',
      title: 'Python Essentials 2',
      issuer: 'Cisco Networking Academy & Python Institute',
      date: 'April 23, 2026',
      credentialId: '92939b1c-5da2-4844-8fcd-7d7f76474cc7',
      credentialUrl: 'https://www.netacad.com/',
      image: '/certificates/python-essentials-2.png',
      skills: ['Python', 'OOP', 'Modules & Packages', 'Exception Handling'],
      description:
        'DICT-ITU course covering Python OOP, modules, generators, file handling, and custom exceptions.',
    },
    {
      id: 'cert-python-1',
      title: 'Python Essentials 1',
      issuer: 'Cisco Networking Academy & Python Institute',
      date: 'April 09, 2026',
      credentialId: '2c63efc5-1369-442c-bd42-908efc9cdcc9',
      credentialUrl: 'https://www.netacad.com/',
      image: '/certificates/python-essentials-1.png',
      skills: ['Python', 'Data Types', 'Control Flow', 'Functions'],
      description:
        'DICT-ITU course covering Python data types, control flow, collections, functions, and problem solving.',
    },
    {
      id: 'cert-fortinet-nse1',
      title: 'Fortinet NSE 1 Certified in Cybersecurity',
      issuer: 'Fortinet Training Institute',
      date: 'October 29, 2026',
      credentialId: '1639037710GR',
      credentialUrl: 'https://training.fortinet.com/admin/tool/certificate/index.php',
      image: '/certificates/fortinet-nse1.png',
      skills: ['Cybersecurity', 'Network Security', 'Threat Landscape', 'InfoSec'],
      description:
        'Fortinet certification covering cyber threats, social engineering defense, and cloud security basics.',
    },
    {
      id: 'cert-css-essentials',
      title: 'CSS Essentials',
      issuer: 'Cisco Networking Academy & JS Institute',
      date: 'March 11, 2026',
      credentialId: 'DICT-ITU-CSS-2026',
      credentialUrl: 'https://www.netacad.com/',
      image: '/certificates/css-essentials.png',
      skills: ['CSS3', 'Responsive Design', 'Flexbox & Grid', 'UI Styling'],
      description: 'DICT-ITU course on responsive layouts with Flexbox, CSS Grid, and media queries.',
    },
    {
      id: 'cert-html-essentials',
      title: 'HTML Essentials',
      issuer: 'Cisco Networking Academy & JS Institute',
      date: 'March 07, 2026',
      credentialId: 'DICT-ITU-HTML-2026',
      credentialUrl: 'https://www.netacad.com/',
      image: '/certificates/html-essentials.png',
      skills: ['HTML5', 'Semantic HTML', 'Web Accessibility', 'DOM Structure'],
      description: 'DICT-ITU course on semantic HTML5 landmarks, accessible forms, and WCAG basics.',
    },
  ],
};

console.assert(
  portfolio.skills.length >= 4 &&
    portfolio.roles.length === 4 &&
    projects.length >= 3 &&
    projects.slice(0, 3).every((item) => Boolean(item.caseStudyDetail)),
  'Portfolio data self-check failed',
);
