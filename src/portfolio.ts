// Edit this file to personalize the portfolio. Empty URLs render as honest placeholders.
export const portfolio = {
  name: 'Gian Karlo C. Reguindin',
  shortName: 'Gian Karlo',
  title: 'Aspiring Web Developer',
  course: '3rd Year BSCS',
  introduction: 'I’m Gian Karlo, a computer science student and aspiring web developer interested in building thoughtful, user-friendly digital experiences.',
  about: 'I’m a Computer Science student and aspiring software developer with a passion for creating innovative, user-friendly digital solutions. I enjoy web development, UI/UX design, and solving real-world problems through technology while continuously expanding my technical skills and knowledge.',
  education: 'Bachelor of Science in Computer Science, Gordon College',
  interests: 'Games, money, and coffee-fueled debugging.',
  skills: ['Python', 'TypeScript', 'JavaScript', 'C'],
  // Put your photo in public/images/ and set src to '/images/your-photo.jpg'.
  portrait: { src: '/images/gian-karlo.jpg', alt: 'Portrait of Gian Karlo C. Reguindin' },
  tools: [
    { name: 'VS Code', category: 'IDE & AI', description: 'Code editing, debugging, and development tools.' },
    { name: 'Codex', category: 'IDE & AI', description: 'AI assistance for writing, reviewing, and understanding code.' },
    { name: 'Claude', category: 'IDE & AI', description: 'AI assistance for exploring ideas, understanding code, and development tasks.' },
    { name: 'Figma', category: 'Design', description: 'Interface design and interactive prototyping.' },
    { name: 'Photoshop', category: 'Design', description: 'Photo editing, image compositing, and digital graphics.' },
    { name: 'Illustrator', category: 'Design', description: 'Vector illustration, logos, and scalable graphics.' },
    { name: 'Canva', category: 'Design', description: 'Visual layouts, presentations, and everyday design assets.' },
    { name: 'Git', category: 'Workflow', description: 'Version control for tracking and organizing code changes.' },
    { name: 'GitHub', category: 'Workflow', description: 'Code repositories, collaboration, and project documentation.' },
    { name: 'Vercel', category: 'Cloud', description: 'Frontend deployment and preview environments.' },
    { name: 'Firebase', category: 'Cloud', description: 'Application services including authentication and databases.' },
    { name: 'Supabase', category: 'Cloud', description: 'Postgres databases, authentication, and storage.' },
    { name: 'React', category: 'Frameworks', description: 'Component-based interfaces for the web.' },
    { name: 'Next.js', category: 'Frameworks', description: 'React applications with routing and full-stack capabilities.' },
    { name: 'Tailwind', category: 'Frameworks', description: 'Utility-first styling for building consistent interfaces.' },
    { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for backend services and tooling.' },
    { name: 'React Native', category: 'Mobile', description: 'Cross-platform mobile interfaces with React.' },
    { name: 'PostgreSQL', category: 'Database', description: 'Relational data storage for application backends.' },
    { name: 'Design Systems', category: 'UI/UX', description: 'Reusable patterns for consistent product experiences.' },
    { name: 'Prototyping', category: 'UI/UX', description: 'Exploring interactions before implementation.' },
  ],
  roles: [
    { title: 'Project Manager', description: 'Coordinated sprint milestones, prioritized the core feature roadmap, and ran regular team syncs. Kept task allocation balanced between design deliverables and development deadlines.' },
    { title: 'Lead Developer', description: 'Architected full-stack modules using Next.js, TypeScript, and modern frontend frameworks. Built core interactive components, persistent state management, and API integrations.' },
    { title: 'Quality Assurance', description: 'Conducted cross-browser functional testing, responsive viewport validation, and accessibility audits against WCAG 2.2 AA. Documented and patched user-facing UI edge cases.' },
    { title: 'Requirements Analysis', description: 'Gathered user workflows, interviewed learners and campus peers, mapped functional user journeys, and formulated concise database schemas and component specifications.' },
  ],
  contact: {
    email: 'giankarloreguindin811@gmail.com',
    github: 'https://github.com/Nykt04',
    linkedin: 'https://www.linkedin.com/in/gian-karlo-reguindin-762712349/',
  },
  project: {
    name: 'ACE IT',
    description: 'A hub for study resources, tools, and personalized support — designed to help you learn smarter and achieve more.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Vercel'],
    screenshot: '',
    screenshotAlt: 'ACE IT study companion interface showing interactive flashcard review mode',
    repository: '',
    liveDemo: 'https://ace-it-ten.vercel.app/',
    reference: '',
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'ACE IT is an interactive learning companion web application designed to help college students master coursework efficiently. Built with Next.js, TypeScript, Supabase, and deployed on Vercel, the platform combines custom deck creation, AI-assisted flashcard generation, active recall testing, and persistent progress tracking in a clean, distraction-free environment.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'College students frequently juggle intense course loads and scattered study materials across slides and notes. Traditional study apps often place basic features behind subscriptions or enforce tedious manual entry. ACE IT solves this by giving learners an agile, intuitive platform to create organized decks manually or generate instant flashcards via AI prompts for rapid exam preparation.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Analysis prioritized five core functional requirements: (1) Rapid study-set creation with tagging; (2) AI-assisted deck generation for quick topic breakdowns; (3) Interactive study mode featuring self-paced card flips, confidence grading, and keyboard shortcuts; (4) Resilient local storage caching paired with Supabase cloud synchronization; (5) Mobile-first responsive layout meeting WCAG 2.2 Level AA accessibility standards.' },
      { id: 'process', title: 'From idea to interface', prompt: 'Following an agile workflow, development moved from low-fidelity wireframes in Figma to production React components. As Project Manager and Lead Developer, I structured modular application architecture separating the UI component library from data access layers, implemented smooth 3D CSS card-flip mechanics, and structured relational schemas for users, decks, and cards.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'ACE IT adheres strictly to WCAG 2.2 AA standards. Key accessibility features include high-contrast typography (exceeding 4.5:1 ratio), full keyboard operability (Space to flip, Arrow keys to navigate or rate recall), aria-live announcements for screen readers when card status updates, generous 48px touch targets for mobile devices, and reduced-motion fallbacks for card flip transitions.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Quality assurance involved comprehensive functional testing across Chrome, Firefox, Safari, and mobile viewports. Verification focused on deck CRUD operations, AI prompt error handling and network timeouts, offline persistence recovery, and keyboard navigation sweeps. Tests confirmed zero layout shifts or horizontal overflows across 360px–1440px+ screens.' },
      { id: 'result', title: 'The final result', prompt: 'The live release of ACE IT is deployed on Vercel at ace-it-ten.vercel.app. Students can jump from entering a topic to an active, interactive study session within seconds. The active recall mode promotes higher retention while the minimal interface keeps the focus squarely on the study material.' },
      { id: 'lessons', title: 'What I learned', prompt: 'Building ACE IT strengthened my practical experience in full-stack Next.js architecture, state synchronization, and accessible interaction design. Future roadmap enhancements include introducing the SuperMemo-2 (SM-2) spaced repetition algorithm, printable summary exports, and collaborative study groups.' },
    ],
    persona: {
      name: 'Sophia Ramos',
      role: 'Undergraduate Learner',
      demographics: '2nd Year Computer Science Student · Gordon College',
      quote: 'Reviewing 100-slide lecture decks right before exams is overwhelming. I need an intuitive way to turn complex syllabi into bite-sized active-recall cards without paying for basic features.',
      goals: [
        'Quickly generate study decks from lecture outlines using AI prompts.',
        'Test active recall during quick breaks between classes on mobile.',
        'Track mastery levels to avoid wasting time re-reading material already learned.',
      ],
      painPoints: [
        'Most study apps lock AI generation and offline modes behind expensive monthly subscriptions.',
        'Manual flashcard creation from lengthy notes consumes more time than actual studying.',
        'Cluttered interfaces with distracting social feeds derail late-night study focus.',
      ],
      techHabits: [
        'Smartphone (iOS/Android) during transit and short breaks.',
        'Laptop with keyboard shortcuts (Space to flip, Arrows to advance) for deep study blocks.',
      ],
    },
  },
  certifications: [
    {
      id: 'cert-1',
      title: '[Certification Title Placeholder]',
      issuer: '[Issuing Organization / Institution, e.g. Coursera, Cisco, freeCodeCamp, Google]',
      date: '[Issue Date, e.g. 2026]',
      credentialId: '[Credential ID or Verification Code]',
      credentialUrl: '',
      skills: ['Python', 'TypeScript', 'Web Development'],
      description: 'Placeholder slot for technical certification, professional badge, or academic training course. Ready for your actual credential details.',
    },
    {
      id: 'cert-2',
      title: '[Certification Title Placeholder]',
      issuer: '[Issuing Organization / Institution, e.g. Meta, Oracle, AWS, DICT]',
      date: '[Issue Date, e.g. 2026]',
      credentialId: '[Credential ID or Verification Code]',
      credentialUrl: '',
      skills: ['UI/UX Design', 'Accessibility', 'Figma'],
      description: 'Placeholder slot for specialized workshop, university certification, or technical training achievement.',
    },
    {
      id: 'cert-3',
      title: '[Certification Title Placeholder]',
      issuer: '[Issuing Organization / Institution]',
      date: '[Issue Date, e.g. 2026]',
      credentialId: '',
      credentialUrl: '',
      skills: ['Software Engineering', 'Quality Assurance'],
      description: 'Placeholder slot for future certification, industry-recognized course, or hackathon / competition milestone.',
    },
  ],
};

export interface PortfolioCertification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  description: string;
  image?: string;
}

export interface ProjectPersona {
  name: string;
  role: string;
  demographics: string;
  quote: string;
  goals: string[];
  painPoints: string[];
  techHabits: string[];
}

export interface CaseSection {
  id: string;
  title: string;
  prompt: string;
}

export interface ProjectRole {
  title: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  category: string;
  role: string;
  technologies: string[];
  screenshot: string;
  screenshotAlt: string;
  repository: string;
  liveDemo: string;
  caseStudy: string;
  featured: boolean;
  sections?: CaseSection[];
  roles?: ProjectRole[];
  persona?: ProjectPersona;
}

// Keep the featured case study first. Add another entry when you have a fourth project.
// Add real titles, roles, screenshots, and URLs here; no other layout changes are needed.
export const projects: PortfolioProject[] = [
  {
    ...portfolio.project,
    id: 'featured-project',
    name: 'ACE IT',
    description: 'A hub for study resources, tools, and personalized support — designed to help you learn smarter and achieve more.',
    category: 'Educational Tech · Full-Stack Web App',
    role: 'Project Manager · Lead Developer · QA · Requirements Analysis',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Vercel'],
    screenshot: '',
    screenshotAlt: 'ACE IT interactive flashcard study mode and deck builder',
    repository: '',
    liveDemo: 'https://ace-it-ten.vercel.app/',
    caseStudy: '#case-study',
    featured: true,
    roles: portfolio.roles,
    sections: portfolio.project.sections,
    persona: portfolio.project.persona,
  },
  {
    id: 'project-2',
    name: 'CRHS Web',
    description: 'A responsive, structured institutional web portal for Col. Ramon High School, streamlining access to campus announcements, academic departments, and student resources.',
    category: 'School Web Portal · Responsive Design',
    role: 'Lead Frontend Developer & UI Designer',
    technologies: ['HTML5', 'CSS3 / Flexbox & Grid', 'JavaScript (ES6+)', 'Responsive Design', 'Vercel'],
    screenshot: '',
    screenshotAlt: 'CRHS Web portal homepage showing announcement bulletins and department directory',
    repository: '',
    liveDemo: 'https://crhs-web.vercel.app/home.html',
    caseStudy: '#case-study?p=project-2',
    featured: false,
    roles: [
      { title: 'UI/UX Designer', description: 'Designed accessible, modern layouts in Figma featuring high-legibility typography, clear information hierarchy, and intuitive navigation structures tailored for students, teachers, and parents.' },
      { title: 'Lead Frontend Developer', description: 'Wrote clean, modular HTML5 and vanilla CSS3 utilizing modern Flexbox and Grid layouts. Implemented lightweight JavaScript for mobile navigation toggles, campus alert banners, and active page highlighting without heavy dependencies.' },
      { title: 'Quality Assurance', description: 'Tested page responsiveness across smartphones, tablets, and wide monitors. Verified link validity, image compression for rapid loading on cellular networks, and WCAG AA color contrast across all sections.' },
      { title: 'Content Architecture', description: 'Structured school news, calendar events, and academic program pages with semantic heading hierarchies and descriptive metadata to optimize discoverability and screen-reader accessibility.' },
    ],
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'CRHS Web is an informative and accessible school portal developed for the Col. Ramon High School community. Hosted on Vercel, the site serves as the official public gateway for students, guardians, and faculty to access administrative news, academic tracks, and student organization highlights.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'The school community previously relied on fragmented social media notices that quickly got buried in feeds. Parents and students struggled to find official schedules, grading period dates, and enrollment guidelines. CRHS Web was created to provide a single, verified, easily accessible source of truth.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Key requirements included: (1) Fast load times on budget mobile devices and slow cellular connections; (2) A prominent bulletin section for timely school announcements; (3) Clean department and faculty overviews; (4) Accessible navigation that elderly guardians can navigate easily; (5) Zero external runtime dependencies for maximum reliability.' },
      { id: 'process', title: 'From idea to interface', prompt: 'Constructed with modern semantic HTML5 and custom CSS architecture. We crafted a welcoming visual identity reflecting school pride, integrated an accessible collapsible mobile drawer menu, and organized content into modular card grids.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'Ensured minimum 4.5:1 text-to-background contrast ratios, descriptive image alternative text for campus event photos, keyboard-navigable menus with visible focus rings, and responsive typography that remains legible when browser zoom is set to 200%.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Tested on multiple screen resolutions and simulated 3G network throttling. Audited lighthouse performance scores, achieving 95+ in Accessibility, Best Practices, and SEO. Verified that all forms and external links open safely.' },
      { id: 'result', title: 'The final result', prompt: 'The live portal is accessible at crhs-web.vercel.app/home.html. It delivers a fast, mobile-first experience that has successfully centralized institutional information for students and staff.' },
      { id: 'lessons', title: 'What I learned', prompt: 'This project honed my skills in foundational web technologies, performance optimization, and accessible markup. Future updates will explore integrating a dynamic content management system (CMS) to allow non-technical school staff to post bulletin updates directly.' },
    ],
    persona: {
      name: 'Elena Cruz & Aris Bautista',
      role: 'Parent Guardian & Senior High Faculty',
      demographics: 'High School Parent (42) & STEM Faculty Head (34) · Olongapo City',
      quote: 'We shouldn’t have to dig through dozens of unstructured social media group chats just to check examination schedules, enrollment forms, and official school policies.',
      goals: [
        'Instantly access verified institutional announcements, academic calendars, and enrollment deadlines.',
        'Directly locate department heads and faculty consultation schedules without needing to log in.',
        'Ensure public school announcements are accessible to parents using entry-level mobile devices.',
      ],
      painPoints: [
        'Official memos get buried under personal feed algorithms and chat noise on social media platforms.',
        'Heavy, script-laden portals fail to load reliably on prepaid cellular data packages.',
        'Tiny fonts, low-contrast text, and convoluted multi-tier navigation alienate older guardians.',
      ],
      techHabits: [
        'Budget Android smartphones running on prepaid 3G/4G cellular connections.',
        'Relies on high-contrast text, large touch targets, and straightforward single-tap phone/email links.',
      ],
    },
  },
  {
    id: 'project-3',
    name: 'Check8',
    description: 'A QR code-driven digital clearance management system for Gordon College Computer Science students, modernizing manual sign-off workflows into real-time verification.',
    category: 'Academic Clearance · Full-Stack Web App',
    role: 'Full-Stack Developer & Requirements Analyst',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML5 / CSS3', 'QR Code API', 'Render'],
    screenshot: '',
    screenshotAlt: 'Check8 QR clearance verification dashboard showing student status and sign-off checkpoints',
    repository: '',
    liveDemo: 'https://check8-1.onrender.com',
    caseStudy: '#case-study?p=project-3',
    featured: false,
    roles: [
      { title: 'Requirements Analyst', description: 'Analyzed end-of-semester clearance bottlenecks at Gordon College CCS. Documented paper-based sign-off stages (library, laboratories, student council, dean’s office) and translated them into an automated multi-checkpoint state machine.' },
      { title: 'Full-Stack Developer', description: 'Built the backend REST API using Node.js and Express to manage clearance status states, student records, and checkpoint authorizations. Integrated QR code generation algorithms and built responsive student status portals.' },
      { title: 'UI/UX Designer', description: 'Designed clean checkpoint dashboards enabling department staff to scan student QR codes and approve clearance status in a single tap, eliminating manual paperwork.' },
      { title: 'Quality Assurance', description: 'Simulated high-traffic clearance periods with concurrent student logins. Tested unauthorized status tamper prevention, session management, and scanner performance under low-light conditions.' },
    ],
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'Check8 is a web-based clearance management platform engineered specifically for Computer Science students at Gordon College. Deployed on Render, Check8 eliminates traditional paper clearance slips by issuing unique student QR codes that department heads scan to authorize clearance checkpoints in real time.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'At the conclusion of each academic term, thousands of students wait in physical queues across campus to collect physical signatures from laboratories, libraries, student councils, and department chairs. Paper slips frequently get lost, damaged, or delayed. Check8 digitizes this entire process into a secure, transparent digital ledger.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Core system requirements included: (1) Secure student authentication and unique dynamic QR code generation; (2) Role-based administrative access for checkpoint signees (Lab Custodian, Library, Dean); (3) Real-time clearance status visualization with visual completion badges; (4) Audit logs recording timestamp and staff credentials for every sign-off; (5) Fast mobile scanning capabilities without requiring native app installation.' },
      { id: 'process', title: 'From idea to interface', prompt: 'The system features a dual-interface architecture: a mobile-optimized student portal displaying the clearance progress checklist alongside their personal QR code, and an administrative scanning dashboard with real-time status toggles and batch approvals.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'High-contrast status badges (Cleared, Pending, Action Required) paired with clear textual labels ensure statuses are never conveyed through color alone. Interfaces were optimized for rapid one-handed mobile scanning with immediate haptic and visual confirmation.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Conducted stress testing on the Express API to verify data consistency when multiple departments approve students simultaneously. Validated QR code scanner precision across varying camera resolutions and screen brightness levels.' },
      { id: 'result', title: 'The final result', prompt: 'Check8 is live on Render at check8-1.onrender.com. The platform significantly reduces clearance processing times from multiple days of queueing to instantaneous digital verifications.' },
      { id: 'lessons', title: 'What I learned', prompt: 'Developing Check8 provided profound insights into administrative workflow optimization, state machine design, and role-based security. Next phases include automated PDF clearance certificate generation and integration with Gordon College’s central student information system.' },
    ],
    persona: {
      name: 'Marco Reyes',
      role: 'Graduating Student',
      demographics: '4th Year Computer Science Candidate · Gordon College CCS',
      quote: 'Spending three full days running across campus and standing in chaotic queues just to get 8 ink stamps on a paper clearance slip that could easily get lost is exhausting.',
      goals: [
        'Monitor the real-time status of all eight clearance checkpoints (Lab, Library, Council, Dean) in one unified dashboard.',
        'Display a unique, tamper-evident digital QR code on mobile for instantaneous contactless station sign-offs.',
        'Receive immediate confirmation whenever an administrative department approves clearance.',
      ],
      painPoints: [
        'Paper clearance slips are easily crumpled, stained, or misplaced during stressful finals week.',
        'Students wait in multi-hour lines only to discover the signee is in a meeting or out of the office.',
        'Zero visibility into specific pending requirements or holds causing delays.',
      ],
      techHabits: [
        'Mobile-first power user who expects immediate visual status indicators (Cleared vs Action Required).',
        'Needs fast one-handed scanning with zero native app installation friction.',
      ],
    },
  },
  {
    id: 'project-4',
    name: '[Project 4 Title]',
    description: 'Upcoming software engineering project placeholder. Describe the problem, user audience, and core architecture once details are ready.',
    category: 'Full-Stack Development · Web Application',
    role: 'Lead Developer & System Architect',
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    screenshot: '',
    screenshotAlt: 'Preview placeholder for Project 4',
    repository: '',
    liveDemo: '',
    caseStudy: '#case-study?p=project-4',
    featured: false,
    roles: [
      { title: 'System Architect', description: 'Defined technical requirements, schema relationships, and component boundaries.' },
      { title: 'Full-Stack Developer', description: 'Implemented core frontend interactions, server routes, and database models.' },
      { title: 'Quality Assurance', description: 'Conducted unit testing, responsive viewport validation, and accessibility sweeps.' },
      { title: 'UI Designer', description: 'Created intuitive wireframes and interactive prototypes in Figma.' },
    ],
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'Project 4 overview placeholder. Detail the vision, technology choices, and target goals.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'Describe the core problem solved for students, organizations, or users.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Outline the primary user stories and functional requirements.' },
      { id: 'process', title: 'From idea to interface', prompt: 'Document the design iterations, sprint milestones, and architectural decisions.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'Detail accessibility standards, keyboard support, and contrast compliance.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Summarize verification methodologies, edge case handling, and test passes.' },
      { id: 'result', title: 'The final result', prompt: 'Present the outcomes, working deployment, and user feedback.' },
      { id: 'lessons', title: 'What I learned', prompt: 'Reflect on technical hurdles overcome and future feature roadmap.' },
    ],
  },
  {
    id: 'project-5',
    name: '[Project 5 Title]',
    description: 'Upcoming mobile or web application placeholder. Ready for project background, technologies used, and deployment links.',
    category: 'Mobile / Web Experience · Software Engineering',
    role: 'Frontend Developer & UI/UX Designer',
    technologies: ['JavaScript', 'React', 'Tailwind CSS', 'Vercel'],
    screenshot: '',
    screenshotAlt: 'Preview placeholder for Project 5',
    repository: '',
    liveDemo: '',
    caseStudy: '#case-study?p=project-5',
    featured: false,
    roles: [
      { title: 'Frontend Developer', description: 'Crafted responsive component layouts and stateful UI interactions.' },
      { title: 'UI/UX Designer', description: 'Constructed design tokens, color systems, and user flows.' },
      { title: 'Quality Assurance', description: 'Tested usability, load performance, and device responsiveness.' },
      { title: 'Requirements Analyst', description: 'Identified user pain points and structured functional feature specifications.' },
    ],
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'Project 5 overview placeholder. Ready for summary and key objectives.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'Describe the specific challenge this application addresses.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Detail key functional specifications and constraints.' },
      { id: 'process', title: 'From idea to interface', prompt: 'Walk through wireframing, component implementation, and styling.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'Document inclusive design choices and WCAG conformance.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Outline testing strategies and cross-browser verification.' },
      { id: 'result', title: 'The final result', prompt: 'Showcase final deliverables and live deployment milestones.' },
      { id: 'lessons', title: 'What I learned', prompt: 'Highlight key takeaways and technical growth.' },
    ],
  },
  {
    id: 'project-6',
    name: '[Project 6 Title]',
    description: 'Upcoming client or coursework software engineering project placeholder. Fill in when development is complete.',
    category: 'Systems & Tools · Web Development',
    role: 'Project Manager & Quality Assurance',
    technologies: ['Python', 'TypeScript', 'SQL', 'Git'],
    screenshot: '',
    screenshotAlt: 'Preview placeholder for Project 6',
    repository: '',
    liveDemo: '',
    caseStudy: '#case-study?p=project-6',
    featured: false,
    roles: [
      { title: 'Project Manager', description: 'Organized sprint timelines, managed task allocation, and coordinated releases.' },
      { title: 'Backend / Logic Developer', description: 'Built core data processing algorithms and API interfaces.' },
      { title: 'Quality Assurance', description: 'Executed end-to-end testing, error boundary checks, and regression passes.' },
      { title: 'Documentation Lead', description: 'Authored technical documentation, user guides, and deployment workflows.' },
    ],
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'Project 6 overview placeholder. Summarize purpose and tech stack.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'Highlight who this project serves and what pain point it eliminates.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Detail system requirements and workflow specifications.' },
      { id: 'process', title: 'From idea to interface', prompt: 'Review architecture, schema design, and implementation.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'Explain UX decisions and accessibility compliance.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Document testing procedures and performance benchmarks.' },
      { id: 'result', title: 'The final result', prompt: 'Detail the completed solution and operational highlights.' },
      { id: 'lessons', title: 'What I learned', prompt: 'Summarize challenges faced and future opportunities.' },
    ],
  },
];
