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
  // Put your portrait images/clips in public/images/ (Light wears glasses, Dark removes them).
  portrait: {
    src: '/images/portrait-dark.jpg',
    lightSrc: '/images/portrait-light.jpg',
    darkSrc: '/images/portrait-dark.jpg',
    toLightVideo: '/images/portrait-to-light.mp4',
    toDarkVideo: '/images/portrait-to-dark.mp4',
    alt: 'Portrait of Gian Karlo C. Reguindin',
  },
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
    email: 'reguindin.giankarlo@gmail.com',
    github: 'https://github.com/Nykt04',
    linkedin: 'https://www.linkedin.com/in/gian-karlo-reguindin-762712349/',
  },
  project: {
    name: 'ACE IT',
    description: 'A hub for study resources, tools, and personalized support — designed to help you learn smarter and achieve more.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Vercel'],
    screenshot: '/images/ace-it.png',
    screenshotAlt: 'ACE IT web application account login and registration screen at ace-it-ten.vercel.app',
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
      age: '20',
      education: '2nd Year BS Computer Science',
      hometown: 'Olongapo City, Zambales',
      family: 'Lives with parents and younger sibling',
      occupation: 'Full-time Undergraduate Student',
      quote: 'Reviewing dense lecture slides right before exams gets overwhelming quickly. Having custom decks and quick flashcard generation in one clean place saves hours of setup.',
      scenario: 'During exam week, Sophia reviews dense lecture slides between classes on her phone and at night on her laptop. She needs to turn course outlines into active-recall flashcards quickly without paywalls or cluttered feeds.',
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
  age?: string;
  education?: string;
  hometown?: string;
  family?: string;
  occupation?: string;
  scenario?: string;
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

export interface CaseStudyDetail {
  overview: {
    product: string;
    targetUsers: string;
    duration: string;
    problem: string;
    goal: string;
    teamContext?: string;
  };
  understanding: {
    researchSummary: string;
    painPoints: { title: string; detail: string }[];
    problemStatement: string;
    journeyMap: {
      stage: string;
      action: string;
      feelings: string;
      painPoints: string;
      opportunities: string;
    }[];
  };
  startingDesign: {
    paperWireframesNote: string;
    lofiPrototype: { description: string; url?: string; image?: string; alt?: string };
    usabilityStudy: {
      intro: string;
      round1: string[];
      round2: string[];
    };
  };
  refiningDesign: {
    mockupsBeforeAfter: {
      title: string;
      notes: string;
      before: string;
      beforeImage?: string;
      beforeAlt?: string;
      beforeWireframe?: 'nav' | 'hero';
      after: string;
      afterImage?: string;
      afterAlt?: string;
    }[];
    mainMockups: (string | { title: string; image?: string; alt?: string })[];
    hifiNote: string;
    accessibilityConsiderations: string[];
  };
  goingForward: {
    impact: string;
    whatILearned: string;
    nextSteps: string[];
  };
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
  caseStudyDetail?: CaseStudyDetail;
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
    screenshotAlt: 'ACE IT web application account login and registration screen at ace-it-ten.vercel.app',
    repository: 'https://github.com/Nykt04/_AceIt',
    liveDemo: 'https://ace-it-ten.vercel.app/',
    caseStudy: '#case-study?p=featured-project',
    featured: false,
    roles: [
      { title: 'Project Manager', description: 'Coordinated sprint milestones, prioritized the core feature roadmap, and ran regular team syncs. Kept task allocation balanced between design deliverables and development deadlines.' },
      { title: 'Lead Developer', description: 'Architected full-stack modules using Next.js, TypeScript, and modern frontend frameworks. Built core interactive components, persistent state management, and API integrations.' },
      { title: 'Quality Assurance', description: 'Conducted functional testing, responsive viewport validation, and accessibility checks against WCAG 2.2 AA guidelines. Documented and fixed UI edge cases.' },
      { title: 'Requirements Analysis', description: 'Mapped student study workflows and user journeys for deck authoring and active recall review, and formulated data schemas and component specifications.' },
    ],
    sections: portfolio.project.sections,
    persona: portfolio.project.persona,
    caseStudyDetail: {
      overview: {
        product: 'ACE IT is an interactive study companion website that helps college students organize coursework and practice active recall. It brings manual flashcard creation, AI-assisted card generation, file uploads, and focused study sessions into one clean workspace.',
        targetUsers: 'Undergraduate college students and exam candidates managing dense lecture slides and study notes.',
        duration: 'August 2025 – November 2025',
        problem: 'Students regularly review dense lecture slides and scattered notes right before exams, where manual flashcard creation takes too much setup time and many existing tools lock AI study aids behind subscriptions or noisy feeds.',
        goal: 'Build an uncluttered study website where learners can create decks manually, upload study material, or generate flashcards with AI prompts.',
        teamContext: 'Led sprint coordination, feature planning, quality testing, and core web development.',
      },
      understanding: {
        researchSummary: 'Informal interviews with 8 fellow undergraduate students showed that learners preparing for exams prioritize fast setup (turning lecture topics into flashcards without friction) and a calm, distraction-free workspace without noisy social gamification during late-night review.',
        painPoints: [
          { title: 'Tedious Manual Card Authoring', detail: 'Converting lengthy slides into flashcards by hand slows down exam prep. Guided adding AI-assisted flashcard generation and file upload alongside manual authoring.' },
          { title: 'Scattered Study Tools', detail: 'Switching between notes, flashcards, and generators interrupts focus. Combined custom sets, AI generation, file import, and study review into one saved workspace.' },
          { title: 'Visual Clutter During Review', detail: 'Ads and unnecessary menus break concentration during active study. Guided using a calm dark interface with clear visual hierarchy.' },
          { title: 'Privacy & Account Continuity', detail: 'Students switching between mobile and desktop want saved decks across sessions. Integrated clear onboarding consent steps and account sign-in.' },
        ],
        problemStatement: 'Sophia Ramos is a 2nd-year BSCS student who needs a quick way to convert course outlines into focused active-recall sets because manual setup takes time away from actual exam preparation.',
        journeyMap: [
          { stage: '1. Onboarding & Auth', action: 'Reviews About / Terms / Privacy steps and signs in (email or Google).', feelings: 'Informed about data usage; eager to start quickly.', painPoints: 'Friction if onboarding steps feel confusing.', opportunities: 'Clear multi-step onboarding progress & guidance.' },
          { stage: '2. Creating a Deck', action: 'Chooses Create Set, Upload File, or AI Generate.', feelings: 'Hopeful for fast deck creation.', painPoints: 'Waiting on generation or formatting edge cases.', opportunities: 'Structured previews with quick manual editing.' },
          { stage: '3. Active Study Session', action: 'Flips cards and drills active retrieval.', feelings: 'Focused on recall without visual clutter.', painPoints: 'Clumsy card controls or tiny mobile targets.', opportunities: 'Full-card click/tap & keyboard shortcuts.' },
          { stage: '4. Continuing Review', action: 'Revisits saved study sets from Home dashboard.', feelings: 'Organized and confident tracking progress.', painPoints: 'Losing unsaved progress across devices.', opportunities: 'Synced user decks saved to their account.' },
        ],
      },
      startingDesign: {
        paperWireframesNote: 'Early layout exploration structured the workspace around a minimal navigation drawer (Home, AI Generate, Upload File, Create Set, Settings) paired with focused main content so students reach study tools in one tap.',
        lofiPrototype: {
          description: 'User flow: About ACE IT -> Terms & Conditions -> Privacy Policy -> Sign In (Email or Google) -> Study Set Hub -> Create / AI Generate / Upload -> Active Recall Study Session.',
          url: 'https://ace-it-ten.vercel.app/',
          image: '/images/ace-it-lofi-flow.png',
          alt: 'ACE IT 5-screen low-fidelity wireframe flow covering onboarding, sign in, study set hub, AI deck builder, and active recall',
        },
        usabilityStudy: {
          intro: 'Reviewed the prototype with 5 student peers during class walkthroughs and iterative testing, leading to the following improvements:',
          round1: [
            'Added explicit Terms & Conditions and Privacy Policy confirmation steps ahead of sign-in so students understand how their decks and AI prompts are handled.',
            'Grouped navigation inside a clean top-left drawer and dedicated Settings button to avoid header crowding.',
            'Separated Create Set, Upload File, and AI Generate into distinct starter cards so first-time users know where to begin.',
          ],
          round2: [
            'Used high-contrast dark surfaces paired with bright primary buttons for comfortable legibility during late-night review.',
            'Added Google Sign-In alongside Email/Password so students can enter their workspace faster.',
            'Placed Hard / Good / Easy study rating buttons at the bottom of the screen for easy thumb reach on phones.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Onboarding & Consent Flow',
            notes: 'Sequenced About ACE IT -> Terms & Conditions -> Privacy Policy -> Welcome Back Sign In so first-time students understand the platform before creating an account.',
            before: 'Before: Direct sign-in wall with no explanation of study features or data privacy.',
            beforeImage: '/images/ace-it-before-onboarding.png',
            beforeAlt: 'Direct login wall without onboarding context',
            after: 'After: Clear 3-step onboarding and consent flow introducing ACE IT before sign-in.',
            afterImage: '/images/ace-it-after-onboarding.png',
            afterAlt: 'Sequential onboarding and consent flow for ACE IT',
          },
          {
            title: 'Authentication Flexibility',
            notes: 'Supported both Email/Password sign-in (with Forgot Password recovery) and Continue with Google to match everyday student habits.',
            before: 'Before: Single email-only login form without Google Sign-In or password recovery.',
            beforeImage: '/images/ace-it-before-auth.png',
            beforeAlt: 'Early email-only login form',
            after: 'After: Clean Sign In / Register card with Study Email, Forgot Password, and Continue with Google.',
            afterImage: '/images/ace-it.png',
            afterAlt: 'ACE IT live login screen with Email/Password and Google Sign-In',
          },
        ],
        mainMockups: [
          {
            title: 'Screen 1 — Account Login & Sign Up (ace-it-ten.vercel.app)',
            image: '/images/ace-it.png',
            alt: 'ACE IT live login and registration screen with Study Email and Continue with Google',
          },
          {
            title: 'Screen 2 — Study Decks Dashboard',
            image: '/images/ace-it-dashboard.png',
            alt: 'ACE IT Study Decks dashboard with Create Set Manually and AI Generate Set actions',
          },
          {
            title: 'Screen 3 — Generate Study Deck',
            image: '/images/ace-it-generate.png',
            alt: 'ACE IT Generate Study Deck screen with deck format, study topic, and difficulty options',
          },
          {
            title: 'Screen 4 — Study Deck Overview & Cards',
            image: '/images/ace-it-deck.png',
            alt: 'ACE IT Study Deck Overview showing Flashcards Mode, Quiz Mode, and interactive deck cards',
          },
          {
            title: 'Screen 5 — Flashcards Active Recall Mode',
            image: '/images/ace-it-flashcard.png',
            alt: 'ACE IT Flashcards active recall screen with Space-to-flip card, Reveal Definition, Prev, and Next controls',
          },
          {
            title: 'Screen 6 — Quiz Mode',
            image: '/images/ace-it-quiz.png',
            alt: 'ACE IT Quiz Mode screen showing multiple-choice question, progress indicator, and live score counter',
          },
        ],
        hifiNote: 'The live study web app is published at ace-it-ten.vercel.app (see live link below) with dark/light reading support and responsive mobile layouts.',
        accessibilityConsiderations: [
          'Comfortable Late-Night Contrast: Crisp white text on dark surfaces and clear input borders prevent eye strain during long study sessions.',
          'Keyboard-Friendly Controls: Students can move through onboarding steps, form fields, and study cards using keyboard navigation with clear focus outlines.',
          'Phone & Laptop Ready: Screens adapt smoothly from smartphone sizes to desktop monitors without cut-off buttons or sideways scrolling.',
        ],
      },
      goingForward: {
        impact: 'ACE IT (v1.0.0) is deployed live at ace-it-ten.vercel.app, giving students one clean place to create, generate, and review study flashcards without paywalls or ad clutter.',
        whatILearned: 'Building ACE IT strengthened my ability to coordinate a team project, design clear onboarding and consent steps, and keep study interfaces calm and distraction-free.',
        nextSteps: [
          'Spaced Repetition Scheduling: Automatically bring back harder flashcards more often based on recall history.',
          'Broader Document Support: Allow direct flashcard extraction from more lecture slide and PDF formats.',
          'Screen Reader & Keyboard Testing: Run full assistive-technology checks across every study mode.',
        ],
      },
    },
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
      name: 'Elena Cruz',
      role: 'Illustrative Target Persona · Parent / Guardian',
      demographics: 'Illustrative Profile · Castillejos, Zambales',
      age: '42',
      education: 'Parent / Guardian',
      hometown: 'Castillejos, Zambales',
      family: 'Mother of two Junior High students',
      occupation: 'Working Parent & School Guardian',
      quote: 'We shouldn’t have to dig through dozens of unstructured social media group chats just to check examination schedules, enrollment forms, and official school policies.',
      scenario: 'Elena checks school notices on a budget Android phone using prepaid mobile data. She needs official enrollment steps and exam schedules without digging through noisy social media feeds.',
      goals: [
        'Quickly access verified institutional announcements, academic calendars, and enrollment guidelines.',
        'Directly locate department information and faculty pages without needing to log in.',
        'Ensure public school announcements are easy to read on entry-level mobile devices.',
      ],
      painPoints: [
        'Official memos get buried under personal feed algorithms and chat noise on social media platforms.',
        'Heavy, slow-loading portals struggle to open reliably on prepaid cellular data packages.',
        'Low-contrast text and convoluted navigation make pages harder for older guardians to browse.',
      ],
      techHabits: [
        'Budget Android smartphones running on prepaid cellular connections.',
        'Relies on high-contrast text, large touch targets, and straightforward direct links.',
      ],
    },
    caseStudyDetail: {
      overview: {
        product: 'CRHS Web is a mobile-friendly school portal for Castillejos Resettlement High School (DepEd School ID 301016) in Castillejos, Zambales. It serves as the official public gateway for campus announcements, Junior High & ARAL academic programs, admissions guides, and school contacts.',
        targetUsers: 'High school students, parents/guardians, prospective enrollees, and faculty members.',
        duration: 'July 2026 – August 2026',
        problem: 'Important school announcements, enrollment steps, and schedules get buried inside social media feeds and group chats, making it harder for parents and students on everyday mobile connections to verify official information.',
        goal: 'Create a fast, easy-to-read school portal with high text contrast and clear navigation across phones, tablets, and desktop computers.',
      },
      understanding: {
        researchSummary: 'Conversations with 6 local parents and students in Castillejos, Zambales showed that families needed reliable loading on prepaid mobile data, clear readable typography without clutter, and direct access to admissions and faculty details without requiring a login.',
        painPoints: [
          { title: 'Notices Buried in Social Feeds', detail: 'Schedule updates and memos are hard to verify in cluttered comment threads. Guided placing public announcements, news, and enrollment buttons directly on the homepage.' },
          { title: 'Heavy Pages on Mobile Data', detail: 'Complex portals slow down on budget phones and prepaid cellular plans. Built lightweight pages that open quickly without heavy downloads.' },
          { title: 'Hard-to-Read Small Text & Hidden Menus', detail: 'Nested menus hinder quick scanning by guardians. Guided using a clearly labeled Menu button, readable typography, and strong contrast.' },
          { title: 'Difficulty Locating Admissions & Contact Info', detail: 'Families need a direct path to requirements and school contacts. Created dedicated Admissions, Academics, and Contact pages plus a top Enroll Now button.' },
        ],
        problemStatement: 'Elena Cruz is a working parent in Castillejos, Zambales who needs a lightweight, clear school portal on her phone because social media feeds bury official admissions and school guides.',
        journeyMap: [
          { stage: '1. Arriving on Portal', action: 'Opens the CRHS Web homepage.', feelings: 'Looking for quick clarity without clutter.', painPoints: 'Slow page loads or popup overlays.', opportunities: 'Fast, lightweight page loading.' },
          { stage: '2. Checking Programs & Alerts', action: 'Reads hero summary, DepEd School ID badge, and campus news.', feelings: 'Confident seeing official DepEd branding (301016).', painPoints: 'Unclear program names.', opportunities: 'Explicit Junior High & ARAL badges.' },
          { stage: '3. Reading Admissions / Faculty', action: 'Opens Menu -> Academics or Admissions.', feelings: 'Guided by clear page layout.', painPoints: 'Deep buried navigation menus.', opportunities: 'Organized slide-out menu drawer.' },
          { stage: '4. Reaching School', action: 'Uses Contact page or Enroll Now guidance.', feelings: 'Reassured having direct verified instructions.', painPoints: 'Outdated links or missing contact info.', opportunities: 'Clear single-page contact/admissions references.' },
        ],
      },
      startingDesign: {
        paperWireframesNote: 'Early layout exploration organized the homepage around a sticky header (CRHS Crest, labeled "Menu" button, light/dark reading toggle, "Enroll Now" button), DepEd School ID 301016 badge, clear hero actions ("Enroll for S.Y. 2026-2027" & "Discover CRHS"), Four Pillars of Character, and a 4-column school footer.',
        lofiPrototype: {
          description: 'User flow: Visitor opens the Home page -> reviews hero summary, DepEd School ID 301016 badge, & program highlights -> taps "Menu" drawer (grouped into Academics & Governance / Campus Life & Community) or "Enroll for S.Y. 2026-2027" -> explores Academics, Admissions (4-step process + FAQ accordion), Faculty, News, or Contact pages.',
          url: 'https://www.figma.com/design/yFPXRCpF5VLj3cXnQIT0Mv',
          image: '/images/crhs-lofi-flow.png?v=4',
          alt: 'CRHS Web 7-screen low-fidelity wireframe flow in Figma covering Home, Menu drawer, Academics, Admissions, Faculty, News, and Contact',
        },
        usabilityStudy: {
          intro: 'Walked 5 students and guardians through the portal on mobile and desktop screens, leading to the following refinements:',
          round1: [
            'Added an explicit "Menu" label alongside the menu icon so navigation discovery is obvious to non-technical guardians.',
            'Grouped program highlights (DepEd Accredited, DepEd ARAL Program, ICT-Enhanced Learning, S.Y. 2026-2027 Admissions Open) directly under the hero buttons for rapid scanning.',
            'Categorized the slide-out menu into Academics & Governance and Campus Life & Community to prevent flat-list overload.',
          ],
          round2: [
            'Added a light/dark reading mode toggle that remembers the visitor’s preference, paired with school green and gold colors.',
            'Structured Admissions into a 4-step visual workflow, grade-level requirement cards, and an expandable FAQ.',
            'Added category filter buttons (All, Academics, DepEd Orders, Campus Life, Achievements, Community) on News for faster bulletin lookup.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Organized Navigation & Labeled Menu',
            notes: 'Moved from an unlabeled menu icon and a flat list of links to a clearly labeled "Menu" button that opens an organized directory—grouping links into Academics & Governance and Campus Life & Community, with direct phone and DepEd email at the bottom.',
            before: 'Early layout concept: unlabeled menu icon opening a flat, ungrouped list of links.',
            beforeImage: '/images/crhs-before-nav.png',
            beforeAlt: 'Early CRHS Portal navigation draft with unlabeled icon and flat ungrouped link list',
            after: 'Refined navigation drawer: links grouped into clear sections with direct school contact details.',
            afterImage: '/images/crhs-menu.png?v=2',
            afterAlt: 'CRHS Web open navigation drawer showing organized Academics & Governance and Campus Life & Community links',
          },
          {
            title: 'Visual Branding & Readability',
            notes: 'Combined official school green and gold colors with clean, easy-to-read fonts and real campus photography across light and dark reading modes.',
            before: 'Early unstyled page draft without school colors, campus photos, or clear visual hierarchy.',
            beforeImage: '/images/crhs-before-hero.png',
            beforeAlt: 'Early unstyled CRHS homepage draft without school crest, colors, or campus photo',
            after: 'Polished live portal with campus photography, DepEd School ID 301016 badge, and high-contrast text.',
            afterImage: '/images/crhs-home.png?v=2',
            afterAlt: 'CRHS Web polished homepage with school branding, DepEd badge, and campus photography',
          },
        ],
        mainMockups: [
          {
            title: 'Screen 1 — Homepage & Hero Banner',
            image: '/images/crhs-home.png?v=2',
            alt: 'CRHS Web Homepage showing CRHS crest, DepEd School ID 301016 badge, hero headline, Enroll CTA, and campus photo',
          },
          {
            title: 'Screen 2 — Curriculum & DepEd ARAL Program',
            image: '/images/crhs-academics.png?v=2',
            alt: 'CRHS Web Academics page showing Junior High School Grades 7-10 and DepEd ARAL Program cards',
          },
          {
            title: 'Screen 3 — Admissions & Enrollment Guide',
            image: '/images/crhs-admissions.png?v=2',
            alt: 'CRHS Web Admissions page showing S.Y. 2026-2027 countdown, 4-step enrollment process, and credential requirements',
          },
          {
            title: 'Screen 4 — Faculty & Leadership Directory',
            image: '/images/crhs-faculty.png?v=2',
            alt: 'CRHS Web Faculty page showing school leadership and subject department directory cards',
          },
        ],
        hifiNote: 'The live, interactive school portal is published at crhs-web.vercel.app with light and dark reading modes and mobile-friendly navigation.',
        accessibilityConsiderations: [
          'Easy-to-Read Text & Light/Dark Mode: Strong contrast between text and background in both bright daylight and dark-mode settings, so parents and students can read without eye strain.',
          'Clear Labels & Logical Page Order: Simple headings, a clearly labeled "Menu" button, and descriptive links help everyone—including keyboard and screen-reader users—find admissions and school info quickly.',
          'Phone-Friendly & Fast on Mobile Data: Pages automatically resize and stack cleanly on smaller smartphone screens without heavy files, keeping them quick to load on prepaid data.',
        ],
      },
      goingForward: {
        impact: 'The live CRHS Web portal brings official school announcements, academic programs, admissions steps, and contact details together in one phone-friendly website at crhs-web.vercel.app, so families no longer have to dig through social media feeds.',
        whatILearned: 'Building CRHS Web reinforced how valuable clean, lightweight web pages and clear information structure are when designing public school portals for everyday mobile connections.',
        nextSteps: [
          'Simple Notice Editor: Allow school staff to publish news and bulletins directly without editing code.',
          'Bilingual Support (Tagalog / English): Offer localized notices so more parents can read comfortably.',
          'Printable Forms Checklist: Provide downloadable enrollment requirement sheets for families.',
        ],
      },
    },
  },
  {
    id: 'project-3',
    name: 'Check8',
    description: 'A QR code-driven digital clearance management system for Gordon College Computer Science students, modernizing manual sign-off workflows into real-time verification.',
    category: 'Academic Clearance · Full-Stack Web App',
    role: 'Main Contributor (Team Repo) · Full-Stack & Requirements',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML5 / CSS3', 'QR Code API', 'Render'],
    screenshot: '/images/check8.png',
    screenshotAlt: 'Check8 QR-enabled clearance management portal login and overview screen',
    repository: '',
    liveDemo: 'https://check8-1.onrender.com',
    caseStudy: '#case-study?p=project-3',
    featured: true,
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
      age: '21',
      education: '4th Year BS Computer Science',
      hometown: 'Olongapo City, Zambales',
      family: 'Eldest sibling supporting family',
      occupation: 'Graduating Undergraduate Student',
      quote: 'Spending days walking across campus to collect paper stamps on a slip that could easily get misplaced during finals week is exhausting without clear status updates.',
      scenario: 'During finals week, Marco checks his phone between errands to see which campus offices (Lab, Library, Council, Dean) have cleared him and presents his QR code at each station without risking a lost paper slip.',
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
    caseStudyDetail: {
      overview: {
        product: 'Check8 is a web-based school clearance system for Gordon College Computer Science students. It replaces paper clearance slips with digital QR checkpoints so students and office staff can track sign-offs online.',
        targetUsers: 'Gordon College CCS students, computer lab staff, library staff, student council officers, and department signatories.',
        duration: 'April 2026 – November 2026',
        problem: 'At the end of every semester, students wait in long campus lines to collect signatures from labs, the library, student council, and department offices on paper slips that are easy to lose or damage.',
        goal: 'Bring all clearance approvals into one clear website using digital QR codes and live status updates.',
        teamContext: 'Built with a student team inside a groupmate-hosted repository, where Gian Karlo served as the main contributor for core features, workflow planning, and interface design.',
      },
      understanding: {
        researchSummary: 'Conversations with 6 fellow BSCS students and 2 campus office staff during clearance week showed two big frustrations: students had no way to see missing requirements before lining up, and office staff needed a faster way to check student records without flipping through paper binders.',
        painPoints: [
          { title: 'No Visibility Before Waiting', detail: 'Students wait in line only to find out an officer is away or a requirement is still missing. Guided creating a clear office-by-office checklist.' },
          { title: 'Damaged or Lost Paper Slips', detail: 'Paper forms get crumpled or lost during finals week, forcing students to start over. Guided building a saved online checklist paired with a personal QR code.' },
          { title: 'Unclear Hold Reasons', detail: 'Seeing "Pending" without an explanation leaves students guessing what to fix. Added short notes explaining exactly what is needed.' },
          { title: 'Slow Paper Sign-Offs', detail: 'Checking paper records manually slows down lines. Added a QR scan and Student ID lookup so officers can verify and approve in seconds.' },
        ],
        problemStatement: 'Marco Reyes is a 4th-year BSCS student who needs clear clearance status updates and digital sign-offs because paper slips are easy to lose and waiting in lines without knowing hold reasons wastes study time.',
        journeyMap: [
          { stage: '1. Checking Status', action: 'Opens Check8 on his phone to check pending offices.', feelings: 'Focused on finishing remaining stations.', painPoints: 'Confusion over which office to visit first.', opportunities: 'Clear step-by-step requirement notes.' },
          { stage: '2. Visiting Checkpoint', action: 'Walks to the active lab or office counter.', feelings: 'Prepared with what is still needed.', painPoints: 'Busy lines during finals week.', opportunities: 'Clear Cleared vs. Pending labels.' },
          { stage: '3. Presenting QR', action: 'Shows personal QR code for verification.', feelings: 'Expects quick scanning.', painPoints: 'Dim phone screens making QR codes hard to scan.', opportunities: 'Bright, high-contrast QR card.' },
          { stage: '4. Completion', action: 'Sees updated Cleared status on screen.', feelings: 'Relieved to have a digital record.', painPoints: 'Unsure when the approval was recorded.', opportunities: 'Date and time recorded for every sign-off.' },
        ],
      },
      startingDesign: {
        paperWireframesNote: 'Early sketches separated the experience into two simple views: a phone-friendly Student Clearance Pass and an Officer Verification Screen for campus staff.',
        lofiPrototype: {
          description: 'User flow across 6 screens: Login -> Student Dashboard (clearance checklist & personal QR code) -> Officer / Instructor Dashboard -> QR Verification & Event Payments -> Admin Dashboard, keeping every sign-off and payment record updated in real time.',
          url: 'https://www.figma.com/design/SmRtxYwAAgpJvC4mVkmFaO/Check8-Wireframes?node-id=0-1',
          image: '/images/check8-lofi-flow.jpg?v=2',
          alt: 'Check8 6-screen low-fidelity wireframes from Figma: Login, Admin Dashboard, Instructor Dashboard, QR Verification, Event Payments, and Student Dashboard',
        },
        usabilityStudy: {
          intro: 'Tested the student checklist and officer QR scan flow with 4 peers during pilot review, leading to these improvements:',
          round1: [
            'Paired status styling with clear words (Cleared and Pending) so status is obvious at a glance.',
            'Added manual Student ID search alongside QR scanning in case a phone camera fails or battery runs low.',
            'Added short instructor notes beside Pending items so students know what to finish before lining up.',
          ],
          round2: [
            'Placed the QR code inside an isolated bright white card so phone cameras read it reliably even on dim screens.',
            'Kept student and officer actions separated cleanly so each user only sees what they need.',
            'Recorded the date and time of each office approval for a clear history trail.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'High-Contrast QR Display',
            notes: 'Placed the student QR code inside an isolated bright white Verification Pass card with clear student name, ID, and scan-ready status so instructors can scan it reliably.',
            before: 'Before: QR code without an isolated bright frame or clear student label is harder to scan on dim phone screens.',
            beforeImage: '/images/check8-before-qr.png',
            beforeAlt: 'Low-contrast QR code on a dark card background',
            after: 'After: Isolated bright white Verification Pass card with student name, ID, and Ready to scan status.',
            afterImage: '/images/check8-after-qr.png?v=2',
            afterAlt: 'Check8 Verification Pass showing high-contrast white QR code, student name, ID, and Ready to scan status',
          },
          {
            title: 'Clear Status Labels Beyond Color',
            notes: 'Replaced small color-only dots with clear Cleared and Pending status badges paired with instructor notes explaining any remaining requirement.',
            before: 'Before: Small colored dots without labels force users to guess what each color means.',
            beforeImage: '/images/check8-before-status.png',
            beforeAlt: 'Clearance list showing small color dots without text labels',
            after: 'After: Real Check8 Clearance status table with Cleared and Pending badges, progress bar, and instructor notes.',
            afterImage: '/images/check8-after-status.png?v=2',
            afterAlt: 'Check8 Clearance status table showing Cleared and Pending badges, progress bar, and instructor notes',
          },
        ],
        mainMockups: [
          {
            title: 'Screen 1 — Portal Sign In',
            image: '/images/check8.png',
            alt: 'Check8 login screen showing Gordon College branding, institutional email login, and Secure, Fast, Paperless highlights',
          },
          {
            title: 'Screen 2 — Student Dashboard & QR Pass',
            image: '/images/check8-student.jpg',
            alt: 'Check8 Student Dashboard showing enrolled courses, Cleared and Pending status with notes, progress bar, and personal QR code',
          },
          {
            title: 'Screen 3 — Instructor Dashboard',
            image: '/images/check8-instructor.jpg',
            alt: 'Check8 Instructor Dashboard showing assigned class sections, pending vs cleared counts, and QR Verification shortcut',
          },
          {
            title: 'Screen 4 — QR Verification (Clearance Validation)',
            image: '/images/check8-qr-verify.jpg',
            alt: 'Check8 Clearance Validation screen with course selector, live camera QR scanner, and manual student token backup',
          },
          {
            title: 'Screen 5 — Event Payments',
            image: '/images/check8-events.jpg',
            alt: 'Check8 Event Payments screen showing student list, required vs paid amounts, and payment confirmation form',
          },
          {
            title: 'Screen 6 — Admin Dashboard',
            image: '/images/check8-admin.jpg',
            alt: 'Check8 Admin Dashboard showing student records, CSV/SQLite import, groups and classes, and course management',
          },
        ],
        hifiNote: 'The live web app is hosted at check8-1.onrender.com (note: the hosting provider shows a quick security check on automated loads). Core features and screens were built by Gian Karlo inside a team repository.',
        accessibilityConsiderations: [
          'Clear Words, Not Just Colors: Status badges use clear Cleared and Pending text labels paired with distinct borders instead of relying on color alone.',
          'Easy Tapping on Phones: Buttons and tabs are sized comfortably for students checking clearance on a smartphone between errands.',
          'Readable Text on Narrow Screens: Content stacks cleanly from top to bottom on small phone screens without needing to zoom or scroll sideways.',
        ],
      },
      goingForward: {
        impact: 'Check8 is live at check8-1.onrender.com as a collaborative student project led in implementation by Gian Karlo, turning paper clearance slips into a trackable digital workflow.',
        whatILearned: 'Building Check8 taught me how to map real-world school paperwork into simple step-by-step screens, collaborate in a shared team codebase, and always include a manual backup (Student ID lookup) alongside QR scanning.',
        nextSteps: [
          'Printable Clearance Summary: Let cleared students download or print a clean copy of their finished clearance.',
          'Office Hours Indicator: Show when each campus office or signatory is available for sign-offs.',
          'Public Repository Link: Add the shared team code link once finalized for portfolio viewing.',
        ],
      },
    },
  },
];
