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
    '3rd-year BSCS student at Gordon College building fast, accessible full-stack web apps.',
  education: 'BS Computer Science · Gordon College',
  interests: 'Full-Stack Web · WCAG 2.2 AA',
  skills: ['Python', 'TypeScript', 'JavaScript', 'C'],
  // Put your portrait images in public/images/ (Light wears sunglasses, Dark without).
  portrait: {
    src: '/images/portrait-dark.jpg',
    lightSrc: '/images/portrait-light.jpg',
    darkSrc: '/images/portrait-dark.jpg',
    alt: 'Portrait of Gian Karlo C. Reguindin',
  },
  tools: [
    { name: 'VS Code', category: 'IDE & AI', description: 'Primary code editor.' },
    { name: 'Figma', category: 'Design', description: 'Wireframes and UI prototypes.' },
    { name: 'Photoshop', category: 'Design', description: 'Photo retouching (TESDA NC III).' },
    { name: 'Illustrator', category: 'Design', description: 'Vector graphics and icons (TESDA NC III).' },
    { name: 'Canva', category: 'Design', description: 'Slide decks and visual summaries.' },
    { name: 'Git', category: 'Workflow', description: 'Version control and team branching.' },
    { name: 'GitHub', category: 'Workflow', description: 'Repo hosting and pull requests.' },
    { name: 'Vercel', category: 'Cloud', description: 'Frontend hosting and previews.' },
    { name: 'Supabase', category: 'Cloud', description: 'Auth and PostgreSQL storage.' },
    { name: 'React', category: 'Frameworks', description: 'Reusable UI components.' },
    { name: 'Next.js', category: 'Frameworks', description: 'Full-stack routing and API endpoints.' },
    { name: 'Tailwind', category: 'Frameworks', description: 'Consistent layout and spacing tokens.' },
    { name: 'Node.js', category: 'Backend', description: 'Express APIs for Check8.' },
  ],
  roles: [
    { title: 'Project Manager', description: 'Sprint planning, milestones & team delivery.' },
    {
      title: 'Lead Developer',
      description: 'React, Next.js, TypeScript & Node.js APIs.',
    },
    {
      title: 'Quality Assurance',
      description: 'WCAG 2.2 AA, keyboard & mobile testing.',
    },
    {
      title: 'Requirements Analysis',
      description: 'User flows, scope & database schemas.',
    },
  ],
  contact: {
    email: 'reguindin.giankarlo@gmail.com',
    // Leave blank to use FormSubmit's default /ajax/<email> endpoint, or paste your activated hashed URL.
    formEndpoint: '',
    github: 'https://github.com/Nykt04',
    linkedin: 'https://www.linkedin.com/in/gian-karlo-reguindin-762712349/',
  },
  project: projects[0],
  certifications: [
    {
      id: 'cert-tesda-nc3-vgd',
      title: 'National Certificate III (NC III) in Visual Graphic Design',
      issuer: 'TESDA',
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
      issuer: 'Cisco Networking Academy',
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
      issuer: 'Cisco Networking Academy',
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
      issuer: 'Cisco Networking Academy',
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
      issuer: 'Cisco Networking Academy',
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
