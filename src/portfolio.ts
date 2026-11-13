// Edit this file to personalize the portfolio. Empty URLs render as honest placeholders.
export const portfolio = {
  name: 'Gian Karlo C. Reguindin',
  shortName: 'Gian Karlo',
  title: 'Aspiring Web Developer',
  course: '3rd Year BSCS',
  introduction: 'I’m Gian Karlo, a computer science student and aspiring web developer interested in building thoughtful, user-friendly digital experiences.',
  about: 'I’m a Computer Science student and aspiring software developer with a passion for creating innovative, user-friendly digital solutions. I enjoy web development, UI/UX design, and solving real-world problems through technology while continuously expanding my technical skills and knowledge.',
  education: 'Bachelor of Science in Computer Science, Gordon College',
  interests: 'Web technologies, human-centered UI/UX design, and open-source software.',
  skills: ['Python', 'TypeScript', 'JavaScript', 'C'],
  // Put your photo in public/images/ and set src to '/images/your-photo.jpg'.
  portrait: { src: '/images/gian-karlo.jpg', alt: 'Portrait of Gian Karlo C. Reguindin' },
  tools: [
    { name: 'VS Code', category: 'IDE & AI', description: 'Primary code editor for frontend and backend development.' },
    { name: 'Figma', category: 'Design', description: 'Interface wireframing, design layouts, and interactive prototypes.' },
    { name: 'Photoshop', category: 'Design', description: 'Photo editing, image compositing, and digital graphics (TESDA NC III).' },
    { name: 'Illustrator', category: 'Design', description: 'Vector illustration, logos, and scalable visual assets (TESDA NC III).' },
    { name: 'Canva', category: 'Design', description: 'Visual presentations and structured documentation graphics.' },
    { name: 'Git', category: 'Workflow', description: 'Version control for branching, commits, and collaborative changes.' },
    { name: 'GitHub', category: 'Workflow', description: 'Code repositories, issue tracking, and team project hosting.' },
    { name: 'Vercel', category: 'Cloud', description: 'Production hosting and continuous deployments for web projects.' },
    { name: 'Supabase', category: 'Cloud', description: 'Authentication and relational database integration used in ACE IT.' },
    { name: 'React', category: 'Frameworks', description: 'Component-based interfaces and interactive state management.' },
    { name: 'Next.js', category: 'Frameworks', description: 'Full-stack React framework with App Router and API routes.' },
    { name: 'Tailwind', category: 'Frameworks', description: 'Utility-first CSS styling for responsive, token-driven UI.' },
    { name: 'Node.js', category: 'Backend', description: 'JavaScript server runtime and Express APIs (used in Check8).' },
  ],
  roles: [
    { title: 'Project Manager', description: 'Sprint planning, roadmaps, and team syncs.' },
    { title: 'Lead Developer', description: 'Full-stack Next.js, TypeScript, and APIs.' },
    { title: 'Quality Assurance', description: 'Cross-browser testing and WCAG 2.2 AA audits.' },
    { title: 'Requirements Analysis', description: 'User workflows, schemas, and feature specs.' },
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
    screenshot: '/images/ace-it.png',
    screenshotAlt: 'ACE IT web application branded authentication and navigation shell at ace-it-ten.vercel.app',
    repository: 'https://github.com/Nykt04/_AceIt',
    liveDemo: 'https://ace-it-ten.vercel.app/',
    reference: '',
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'ACE IT is a student study companion web application designed to organize coursework and support active recall. Built with Next.js, TypeScript, Tailwind CSS, Supabase, and deployed on Vercel, it brings custom deck creation, AI-assisted flashcard generation, file uploads, and study sessions into one workspace.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'Students often review dense lecture slides and scattered notes right before exams. ACE IT was designed for university and senior high learners who need a structured way to organize study sets manually or generate flashcards using AI prompts without clutter.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Key functional requirements focused on: (1) Account authentication via email/password and Google OAuth backed by Supabase; (2) Custom study set authoring and file upload inputs; (3) AI-assisted flashcard generation; (4) Interactive study mode with self-paced card review; (5) Responsive layout accessible across mobile and desktop viewports.' },
      { id: 'process', title: 'From idea to interface', prompt: 'As Project Manager and Lead Developer, I coordinated sprint priorities across design and implementation, structured Next.js App Router views and authentication guards, integrated Supabase and AI endpoints, and iterated on low-distraction study layouts.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'Design priorities emphasized readable typography, strong text-to-background contrast, clear focus states, and structured navigation so learners can move between deck creation and active review comfortably on both desktop and mobile screens.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Testing covered authentication flows, terms and privacy consent gates, study set creation/editing workflows, API error handling, and responsive viewport behavior on desktop and mobile sizes.' },
      { id: 'result', title: 'The final result', prompt: 'ACE IT (v1.0.0) is deployed live at ace-it-ten.vercel.app with source code available at github.com/Nykt04/_AceIt, delivering authenticated study deck creation, AI generation, and interactive review flows.' },
      { id: 'lessons', title: 'What I learned', prompt: 'Building ACE IT deepened my experience coordinating a team codebase, connecting Next.js UI with Supabase authentication, and designing clear onboarding/consent flows. Planned future improvements include spaced-repetition scheduling and collaborative deck sharing.' },
    ],
    persona: {
      name: 'Sophia Ramos',
      role: 'Illustrative Target Persona · Undergraduate Learner',
      demographics: 'Illustrative Profile · BSCS Undergraduate Learner',
      quote: 'Reviewing dense lecture slides right before exams gets overwhelming quickly. Having custom decks and quick flashcard generation in one clean place saves hours of setup.',
      goals: [
        'Organize lecture outlines and notes into structured flashcard sets quickly.',
        'Practice active recall on both mobile and desktop screens between classes.',
        'Keep study materials tidy inside an authenticated workspace.',
      ],
      painPoints: [
        'Building flashcard decks manually from long slide decks takes too much prep time.',
        'Many study platforms lock basic set-generation workflows behind paid plans.',
        'Cluttered dashboards make late-night exam review harder to sustain.',
      ],
      techHabits: [
        'Uses smartphones between classes and a laptop during extended study blocks.',
        'Prefers dark-mode friendly interfaces with minimal visual noise.',
      ],
    },
  },
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
      description: 'Philippine TVET National Certificate III awarded under the Competency Assessment and Certification System by Director General Jose Francisco "Kiko" B. Benitez. Certified core competencies include: Develop designs for user interface (ICT216316), Develop designs for user experience (ICT216315), Develop designs for a logo (ICT216313), and Print media design.',
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
      description: 'Advanced Python programming course offered by DICT-ITU DTC Initiative covering object-oriented programming (classes, inheritance), modules, packages, string methods, generators, file processing, and custom exception handling. Instructed by Gerald Silen.',
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
      description: 'Foundational Python programming course offered by DICT-ITU DTC Initiative covering variable types, conditional logic, loops, collections (lists, tuples, dictionaries), and algorithmic problem solving. Instructed by Gerald Silen.',
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
      description: 'Certified in cybersecurity fundamentals, threat intelligence, social engineering mitigation, and cloud security defense architectures by Fortinet Training Institute (Ken Xie, CEO & Michael Xie, CTO). Valid through October 28, 2028.',
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
      description: 'Comprehensive CSS styling and layout course offered by DICT-ITU DTC Initiative covering modern selectors, cascade & specificity, Flexbox, Grid, media queries, and responsive web styling. Instructed by Gerald Silen.',
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
      description: 'Core web authoring course offered by DICT-ITU DTC Initiative covering semantic HTML5 markup, document structure, accessible form controls, multimedia elements, and WCAG accessibility foundations. Instructed by Gerald Silen.',
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
    screenshot: '/images/ace-it.png',
    screenshotAlt: 'ACE IT web application branded authentication and navigation shell at ace-it-ten.vercel.app',
    repository: 'https://github.com/Nykt04/_AceIt',
    liveDemo: 'https://ace-it-ten.vercel.app/',
    caseStudy: '#case-study',
    featured: true,
    roles: [
      { title: 'Project Manager', description: 'Coordinated sprint milestones, prioritized the core feature roadmap, and ran regular team syncs. Kept task allocation balanced between design deliverables and development deadlines.' },
      { title: 'Lead Developer', description: 'Architected full-stack modules using Next.js, TypeScript, and modern frontend frameworks. Built core interactive components, persistent state management, and API integrations.' },
      { title: 'Quality Assurance', description: 'Conducted functional testing, responsive viewport validation, and accessibility checks against WCAG 2.2 AA guidelines. Documented and fixed UI edge cases.' },
      { title: 'Requirements Analysis', description: 'Mapped student study workflows and user journeys for deck authoring and active recall review, and formulated data schemas and component specifications.' },
    ],
    sections: portfolio.project.sections,
    persona: portfolio.project.persona,
  },
  {
    id: 'project-2',
    name: 'CRHS Web',
    description: 'A responsive, structured institutional web portal for Castillejos Resettlement High School, streamlining access to campus announcements, academic programs, and student resources.',
    category: 'School Web Portal · Responsive Design',
    role: 'Lead Frontend Developer & UI Designer',
    technologies: ['HTML5', 'CSS3 / Flexbox & Grid', 'JavaScript (ES6+)', 'Responsive Design', 'Vercel'],
    screenshot: '/images/crhs-web.png',
    screenshotAlt: 'Castillejos Resettlement High School (CRHS Web) official portal homepage at crhs-web.vercel.app',
    repository: 'https://github.com/Nykt04/CRHS_Web',
    liveDemo: 'https://crhs-web.vercel.app/home.html',
    caseStudy: '#case-study?p=project-2',
    featured: false,
    roles: [
      { title: 'UI/UX Designer', description: 'Designed accessible, modern layouts featuring high-legibility typography, clear information hierarchy, and intuitive navigation structures tailored for students, teachers, and guardians.' },
      { title: 'Lead Frontend Developer', description: 'Wrote clean, modular HTML5 and CSS3 utilizing Flexbox and Grid layouts. Implemented lightweight JavaScript for mobile navigation toggles, campus alert banners, and active page highlighting without heavy dependencies.' },
      { title: 'Quality Assurance', description: 'Reviewed page responsiveness across mobile, tablet, and desktop viewports. Checked internal navigation links, image loading, and readable contrast across sections.' },
      { title: 'Content Architecture', description: 'Structured school news, admissions info, faculty pages, and Junior High / ARAL academic sections with semantic headings for screen-reader accessibility.' },
    ],
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'CRHS Web is an informative and accessible school portal developed for the Castillejos Resettlement High School community (DepEd School ID 301016) in Castillejos, Zambales. Hosted on Vercel, the site serves as the official public gateway for students, guardians, and faculty to access administrative news, Junior High academic programs, and student organization highlights.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'The school community previously relied on fragmented social media notices that quickly got buried in feeds. Parents and students struggled to find official schedules, grading period dates, and enrollment guidelines. CRHS Web provides a single, lightweight public reference.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Key requirements included: (1) Fast load times on budget mobile devices and cellular connections; (2) A clear public bulletin section for timely school announcements; (3) Structured academic and faculty information; (4) Straightforward navigation for parents and guardians; (5) Zero heavy runtime dependencies.' },
      { id: 'process', title: 'From idea to interface', prompt: 'Constructed with semantic HTML5 and modular CSS layouts, featuring school branding, an accessible collapsible mobile drawer menu, and modular content grids across pages such as `home.html`, `academics.html`, `admissions.html`, and `faculty.html`.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'Prioritized strong text-to-background contrast ratios, descriptive image alternative text on campus images, keyboard-navigable menus with visible focus rings, and scalable typography for mobile and desktop zoom.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Reviewed responsive layouts across mobile and desktop screen sizes, checked link validity across school pages, and verified readable text contrast across sections.' },
      { id: 'result', title: 'The final result', prompt: 'The live portal is accessible at crhs-web.vercel.app/home.html with source code available at github.com/Nykt04/CRHS_Web, centralizing institutional information in a mobile-first format.' },
      { id: 'lessons', title: 'What I learned', prompt: 'This project strengthened my foundational web skills in multi-page HTML/CSS architecture and accessible content hierarchy. Planned future updates could add a content editor so school staff can publish notices directly.' },
    ],
    persona: {
      name: 'Elena Cruz & Aris Bautista',
      role: 'Illustrative Target Persona · Parent & Junior High Faculty',
      demographics: 'Illustrative Profile · Castillejos, Zambales',
      quote: 'We shouldn’t have to dig through dozens of unstructured social media group chats just to check examination schedules, enrollment forms, and official school policies.',
      goals: [
        'Quickly access verified institutional announcements, academic calendars, and enrollment guidelines.',
        'Directly locate department information and faculty pages without needing to log in.',
        'Ensure public school announcements are easy to read on entry-level mobile devices.',
      ],
      painPoints: [
        'Official memos get buried under personal feed algorithms and chat noise on social media platforms.',
        'Heavy, script-laden portals struggle to load reliably on prepaid cellular data packages.',
        'Low-contrast text and convoluted navigation make pages harder for older guardians to browse.',
      ],
      techHabits: [
        'Budget Android smartphones running on prepaid cellular connections.',
        'Relies on high-contrast text, large touch targets, and straightforward direct links.',
      ],
    },
  },
  {
    id: 'project-3',
    name: 'Check8',
    description: 'A QR code-driven digital clearance management system for Gordon College Computer Science students, modernizing manual sign-off workflows into real-time verification.',
    category: 'Academic Clearance · Full-Stack Web App',
    role: 'Main Contributor (Team Repo) · Full-Stack & Requirements',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML5 / CSS3', 'QR Code API', 'Render'],
    screenshot: '',
    screenshotAlt: 'Check8 QR clearance verification dashboard showing student status and sign-off checkpoints',
    repository: '',
    liveDemo: 'https://check8-1.onrender.com',
    caseStudy: '#case-study?p=project-3',
    featured: false,
    roles: [
      { title: 'Requirements Analysis', description: 'Analyzed end-of-semester clearance bottlenecks at Gordon College CCS. Mapped paper-based sign-off checkpoints (library, laboratories, student council, dean’s office) into structured clearance states.' },
      { title: 'Main Contributor (Full-Stack)', description: 'Served as the main contributor within a groupmate-hosted team repository, building core Node.js/Express routes, clearance state transitions, QR generation flows, and responsive portal views.' },
      { title: 'UI/UX Design', description: 'Designed straightforward checkpoint status views enabling students to inspect clearance progress and department staff to review and approve checkpoints cleanly.' },
      { title: 'Quality Assurance', description: 'Tested checkpoint state transitions, unauthorized status guard checks, session behavior, and responsive mobile layouts.' },
    ],
    sections: [
      { id: 'overview', title: 'Project overview', prompt: 'Check8 is a web-based clearance management platform developed for Computer Science students at Gordon College, with Gian Karlo serving as the main contributor inside a groupmate’s team repository. Deployed on Render, Check8 replaces traditional paper clearance slips with digital QR checkpoints.' },
      { id: 'problem', title: 'The problem & target users', prompt: 'At the conclusion of an academic term, students typically wait in queues across offices to collect signatures from laboratories, library, student council, and department chairs on paper slips that are easy to lose or delay. Check8 organizes these sign-offs into one digital ledger.' },
      { id: 'requirements', title: 'Requirements analysis', prompt: 'Core requirements included: (1) Student authentication and unique QR checkpoint code generation; (2) Role-scoped views for checkpoint officers (Lab, Library, Council, Dean); (3) Clear clearance status visualization with completion badges; (4) Audit timestamps for each sign-off; (5) Mobile browser usability without requiring a separate native app.' },
      { id: 'process', title: 'From idea to interface', prompt: 'The system uses a dual-interface workflow: a mobile-friendly student portal displaying the clearance checklist alongside a personal QR code, and an officer dashboard designed for reviewing and updating sign-off statuses.' },
      { id: 'accessibility', title: 'Designing for people', prompt: 'High-contrast status badges (Cleared, Pending, Action Required) paired with clear text labels ensure statuses are never conveyed through color alone, with comfortable tap targets for mobile screens.' },
      { id: 'testing', title: 'Testing & quality assurance', prompt: 'Tested Express API checkpoint approval routes for state consistency, role-based access validation, and responsive layout across mobile viewports.' },
      { id: 'result', title: 'The final result', prompt: 'Check8 is deployed on Render at check8-1.onrender.com as a collaborative student system led in implementation by Gian Karlo inside a team repository.' },
      { id: 'lessons', title: 'What I learned', prompt: 'Building Check8 strengthened my experience in Express workflow modeling, role-based access checks, and team git collaboration. Planned future enhancements include printable clearance summaries.' },
    ],
    persona: {
      name: 'Marco Reyes',
      role: 'Illustrative Target Persona · Graduating Student',
      demographics: 'Illustrative Profile · Gordon College CCS Student',
      quote: 'Spending days walking across campus to collect paper stamps on a slip that could easily get misplaced during finals week is exhausting without clear status updates.',
      goals: [
        'Monitor the status of clearance checkpoints (Lab, Library, Council, Dean) in one unified dashboard.',
        'Present a digital QR code on mobile for quick station sign-offs.',
        'See clearly when an administrative department approves or holds clearance.',
      ],
      painPoints: [
        'Paper clearance slips are easily crumpled or misplaced during finals week.',
        'Students wait in lines only to discover an office signatory is away or a prerequisite is missing.',
        'Lack of visibility into which specific item is causing a delay.',
      ],
      techHabits: [
        'Mobile-first student user who checks updates from a phone browser between errands.',
        'Needs clear Cleared vs Pending indicators without extra setup.',
      ],
    },
  },
];
