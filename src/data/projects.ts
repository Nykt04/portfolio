import type { PortfolioProject } from '../types/portfolio';

// Keep the featured case study first. Add another entry when you have a fourth project.
// Add real titles, roles, screenshots, and URLs here; no other layout changes are needed.
export const projects: PortfolioProject[] = [
  {
    id: 'project-3',
    name: 'Check8',
    description:
      'Mobile QR clearance portal replacing paper sign-off slips for Gordon College CCS.',
    category: 'Full-Stack Web App',
    role: 'Full-Stack & Requirements',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML5 / CSS3', 'QR Code API', 'Supabase', 'Vercel'],
    screenshot: '/images/check8.png',
    screenshotAlt: 'Check8 QR-enabled clearance management portal login and overview screen',
    repository: '',
    liveDemo: '',
    accessNotice: 'Internal Gordon College CCS system (private team repository).',
    caseStudy: '#case-study?p=project-3',
    featured: true,
    roles: [
      {
        title: 'Requirements Analysis',
        description: 'Mapped physical office clearance steps into digital hold states.',
      },
      {
        title: 'Main Contributor (Full-Stack)',
        description: 'Built Node.js/Express clearance routes, QR tokens, and role dashboards.',
      },
      {
        title: 'UI/UX Design',
        description: 'Designed the mobile QR pass, status badges, and Student ID fallback.',
      },
      {
        title: 'Quality Assurance',
        description: 'Tested role guards, duplicate scans, and low-light QR readability.',
      },
    ],
    persona: {
      name: 'Marco Reyes',
      role: 'Illustrative Target Persona · Graduating Student',
      demographics: 'Illustrative Profile · Gordon College CCS Student',
      age: '21',
      education: '4th Year BSCS',
      hometown: 'Olongapo City, Zambales',
      family: 'Eldest sibling supporting family',
      occupation: 'Graduating Student',
      quote: 'Chasing paper signatures wastes hours when nobody tells you what’s missing.',
      scenario: 'Checks pending stations on his phone and scans his QR pass at each desk.',
      goals: [
        'Track every clearance station on one phone screen.',
        'Scan a personal QR pass for fast sign-offs.',
        'See hold reasons before lining up.',
      ],
      painPoints: [
        'Paper slips tear or get lost during finals.',
        'Waiting in line without knowing missing items.',
        'Unclear status across labs, library, and council.',
      ],
      techHabits: [
        'Checks status on mobile browser between classes.',
        'Prefers clear Cleared vs Pending labels.',
      ],
    },
    caseStudyDetail: {
      overview: {
        targetUsers: 'Gordon College CCS students, lab/library staff, council, and faculty.',
        duration: 'April 2026 – November 2026',
        problem: 'Paper clearance slips cause long queues and reset progress if lost.',
        goal: 'Track clearance stations on mobile with one-scan QR sign-offs.',
        teamContext: 'Internal CCS team repository; led core backend routes and UI.',
      },
      understanding: {
        painPoints: [
          {
            title: 'Blindly Waiting in Line',
            detail: 'Put an itemized office checklist upfront before students queue.',
          },
          {
            title: 'Lost Paper Slips',
            detail: 'Replaced fragile paper forms with a synced digital QR pass.',
          },
          {
            title: 'Vague "Pending" Labels',
            detail: 'Added instructor hold notes directly beside each pending row.',
          },
          {
            title: 'Slow Manual Lookups',
            detail: 'Paired live camera QR scanning with manual Student ID search.',
          },
        ],
        problemStatement:
          'CCS students need mobile clearance tracking and QR sign-offs because paper slips get lost and blind queues waste finals time.',
        journeyMap: [
          {
            stage: '1. Check Status',
            action: 'Opens Check8 on phone.',
            feelings: 'Focused on remaining desks.',
            painPoints: 'Unsure where to go first.',
            opportunities: 'Show notes per pending station.',
          },
          {
            stage: '2. Visit Desk',
            action: 'Walks to lab or office.',
            feelings: 'Prepared with items.',
            painPoints: 'Crowded finals hallways.',
            opportunities: 'High-contrast status badges.',
          },
          {
            stage: '3. Scan QR Pass',
            action: 'Shows QR pass to officer.',
            feelings: 'Expects instant scan.',
            painPoints: 'Dim screens fail scans.',
            opportunities: 'Bright white QR quiet-zone card.',
          },
          {
            stage: '4. Cleared',
            action: 'Status updates right away.',
            feelings: 'Relieved with saved proof.',
            painPoints: 'Missing approval time.',
            opportunities: 'Automatic sign-off timestamp.',
          },
        ],
      },
      startingDesign: {
        lofiPrototype: {
          description: '6-screen flow: Login, Student Pass, Events, Admin, Instructor, and Payment Desk.',
          url: 'https://www.figma.com/design/wAT7RW50UdD6mVIZp0bBeQ/CHECK8-%E2%80%94-Low-Fidelity-Wireframes?node-id=0-1&p=f&t=ppyDvmAMFJ44Doie-0',
          image: '/images/check8-lofi-flow.jpg?v=3',
          alt: 'Check8 6-screen low-fidelity wireframes from Figma',
        },
        usabilityStudy: {
          round1: [
            'Paired status colors with explicit Cleared and Pending labels.',
            'Added manual Student ID lookup beside the camera scanner.',
            'Placed instructor hold notes directly inside pending rows.',
          ],
          round2: [
            'Isolated the QR code on a white card for low-light scans.',
            'Separated student and instructor tools into dedicated dashboards.',
            'Added approval timestamps for a verifiable audit trail.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'High-Contrast QR Verification Pass',
            notes: 'Placed the QR code on a white card with ID and scan status.',
            before: 'Dark-background QR struggled to scan in low light.',
            beforeImage: '/images/check8-before-qr.png',
            beforeAlt: 'Low-contrast QR code on a dark card background',
            after: 'White Verification Pass card with student details and scan status.',
            afterImage: '/images/check8-after-qr.png?v=2',
            afterAlt: 'Check8 Verification Pass showing high-contrast white QR code',
          },
          {
            title: 'Clear Status Labels Beyond Color',
            notes: 'Replaced unlabeled dots with explicit Cleared/Pending badges and notes.',
            before: 'Color-only dots forced students to guess status meaning.',
            beforeImage: '/images/check8-before-status.png',
            beforeAlt: 'Clearance list showing small color dots without text labels',
            after: 'Explicit Cleared/Pending badges, progress bar, and notes.',
            afterImage: '/images/check8-after-status.png?v=2',
            afterAlt: 'Check8 Clearance status table with text badges and instructor notes',
          },
        ],
        mainMockups: [
          {
            title: 'Portal Sign In',
            image: '/images/check8.png',
            alt: 'Check8 login screen showing Gordon College institutional login',
          },
          {
            title: 'Student Dashboard & QR Pass',
            image: '/images/check8-student.jpg',
            alt: 'Check8 Student Dashboard with status badges, progress bar, and QR code',
          },
          {
            title: 'Instructor Dashboard',
            image: '/images/check8-instructor.jpg',
            alt: 'Check8 Instructor Dashboard with class counts and QR Verification link',
          },
          {
            title: 'QR Clearance Verification',
            image: '/images/check8-qr-verify.jpg',
            alt: 'Check8 Clearance Validation screen with live camera QR scanner and ID fallback',
          },
          {
            title: 'Event Payments',
            image: '/images/check8-events.jpg',
            alt: 'Check8 Event Payments screen showing student payment tracking',
          },
          {
            title: 'Admin Dashboard',
            image: '/images/check8-admin.jpg',
            alt: 'Check8 Admin Dashboard with student records and CSV/SQLite import',
          },
        ],
        accessibilityConsiderations: [
          'Text + Border Status: Cleared and Pending pills never rely on color alone.',
          'Thumb-Sized Controls: Buttons and tabs meet mobile touch targets.',
          'Responsive Stacking: Tables and QR cards fit phones without horizontal scroll.',
        ],
      },
      goingForward: {
        impact: 'Replaced Gordon College CCS paper slips with trackable QR clearance.',
        whatILearned: 'Always pair camera scanners with manual ID fallback for hardware reliability.',
        nextSteps: [
          'Export printable PDF clearance summaries.',
          'Display live office hours per signatory desk.',
          'Expand checkpoints across semester events.',
        ],
      },
    },
  },
  {
    id: 'featured-project',
    name: 'ACE IT',
    description:
      'Distraction-free study app with AI flashcard generation and active recall.',
    category: 'EdTech Web App',
    role: 'PM · Lead Dev · QA',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Vercel', 'Figma'],
    screenshot: '/images/ace-it.png',
    screenshotAlt: 'ACE IT web application account login and registration screen',
    repository: 'https://github.com/Nykt04/_AceIt',
    liveDemo: 'https://ace-it-ten.vercel.app/',
    caseStudy: '#case-study?p=featured-project',
    featured: false,
    roles: [
      {
        title: 'Project Manager',
        description: 'Scoped sprints, prioritized features, and aligned design with code.',
      },
      {
        title: 'Lead Developer',
        description: 'Built Next.js views, TypeScript components, Supabase auth, and AI routes.',
      },
      {
        title: 'Quality Assurance',
        description: 'Verified auth flows, WCAG 2.2 AA contrast, and keyboard navigation.',
      },
      {
        title: 'Requirements Analysis',
        description: 'Translated student study habits into Supabase schemas and deck flows.',
      },
    ],
    persona: {
      name: 'Sophia Ramos',
      role: 'Illustrative Target Persona · Undergraduate Learner',
      demographics: 'Illustrative Profile · 2nd Year BSCS Student',
      age: '20',
      education: '2nd Year BSCS',
      hometown: 'Olongapo City, Zambales',
      family: 'Lives with parents and sibling',
      occupation: 'Full-time Student',
      quote: 'During finals, I need flashcards fast without typing 80 slides from scratch.',
      scenario: 'Reviews slides on phone between classes and drills decks at night.',
      goals: [
        'Generate flashcard sets from lecture notes quickly.',
        'Practice active recall on phone and laptop.',
        'Keep study decks synced in one account.',
      ],
      painPoints: [
        'Manual card typing takes hours before exams.',
        'Other study apps paywall basic AI generation.',
        'Cluttered dashboards break late-night focus.',
      ],
      techHabits: [
        'Switches between phone commutes and laptop study.',
        'Prefers low-glare dark mode.',
      ],
    },
    caseStudyDetail: {
      overview: {
        targetUsers: 'College and senior high students studying dense lecture slides.',
        duration: 'August 2025 – November 2025',
        problem: 'Manual flashcard typing is slow and existing apps paywall AI or clutter screens.',
        goal: 'Offer one quiet workspace to upload notes, generate cards, and drill recall.',
        teamContext: 'Led sprint planning, requirements, QA, and Next.js full-stack build.',
      },
      understanding: {
        painPoints: [
          {
            title: 'Slow Manual Card Setup',
            detail: 'Added file upload and AI generation alongside manual card editing.',
          },
          {
            title: 'Jumping Between Apps',
            detail: 'Unified deck authoring, uploads, and quiz mode in one workspace.',
          },
          {
            title: 'Harsh Late-Night Screens',
            detail: 'Designed a calm, ad-free dark theme for night review.',
          },
          {
            title: 'Unsynced Study Progress',
            detail: 'Connected Supabase auth so decks sync across phone and laptop.',
          },
        ],
        problemStatement:
          'Students need a fast way to turn lecture outlines into flashcards because manual setup steals exam prep time.',
        journeyMap: [
          {
            stage: '1. Sign In',
            action: 'Reviews Terms and logs in.',
            feelings: 'Clear on data privacy.',
            painPoints: 'Opaque login walls.',
            opportunities: '3-step upfront consent flow.',
          },
          {
            stage: '2. Build Deck',
            action: 'Uploads notes or runs AI.',
            feelings: 'Fast starter deck ready.',
            painPoints: 'Rigid AI output.',
            opportunities: 'Editable cards post-generation.',
          },
          {
            stage: '3. Active Recall',
            action: 'Flips cards via Space or tap.',
            feelings: 'Focused study session.',
            painPoints: 'Tiny mobile buttons.',
            opportunities: 'Full-card tap & shortcuts.',
          },
          {
            stage: '4. Sync Later',
            action: 'Resumes saved decks.',
            feelings: 'Organized before exams.',
            painPoints: 'Losing sets on new devices.',
            opportunities: 'Cloud sync via Supabase.',
          },
        ],
      },
      startingDesign: {
        lofiPrototype: {
          description: '6-screen flow: Auth, Dashboard, AI Generator, Deck Cards, Flashcards, and Quiz Mode.',
          url: 'https://www.figma.com/design/nEYnHjFgojJYzfRzm8BEjr/ACE-IT-%E2%80%94-Low-Fidelity-Wireframes?node-id=2-2&p=f&t=MimFHK2uCKnydipz-0',
          image: '/images/ace-it-lofi-flow.png?v=2',
          alt: 'ACE IT 6-screen low-fidelity wireframes from Figma',
        },
        usabilityStudy: {
          round1: [
            'Added clear Terms and Privacy consent steps before login.',
            'Moved navigation into a drawer to keep study headers quiet.',
            'Split Create, Upload, and AI Generate into three starter cards.',
          ],
          round2: [
            'Tuned dark-mode contrast for comfortable midnight reading.',
            'Added Google OAuth alongside Email/Password login.',
            'Anchored recall controls near the bottom for mobile reach.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Onboarding & Consent Flow',
            notes: 'Added a 3-step onboarding and privacy preview before sign-in.',
            before: 'Direct login wall with zero product or privacy context.',
            beforeImage: '/images/ace-it-before-onboarding.png',
            beforeAlt: 'Direct login wall without onboarding context',
            after: '3-step onboarding and consent preview before account login.',
            afterImage: '/images/ace-it-after-onboarding.png',
            afterAlt: 'Sequential onboarding and consent flow for ACE IT',
          },
          {
            title: 'Flexible Sign-In Options',
            notes: 'Added Google Sign-In and password reset beside email login.',
            before: 'Email-only form without OAuth or password recovery.',
            beforeImage: '/images/ace-it-before-auth.png',
            beforeAlt: 'Early email-only login form',
            after: 'Sign-In card with Email, Forgot Password, and Google OAuth.',
            afterImage: '/images/ace-it.png',
            afterAlt: 'ACE IT live login screen with Email and Google Sign-In',
          },
        ],
        mainMockups: [
          {
            title: 'Account Login & Sign Up',
            image: '/images/ace-it.png',
            alt: 'ACE IT live login screen with Study Email and Continue with Google',
          },
          {
            title: 'Study Decks Dashboard',
            image: '/images/ace-it-dashboard.png',
            alt: 'ACE IT Study Decks dashboard with manual and AI generate options',
          },
          {
            title: 'Generate Study Deck',
            image: '/images/ace-it-generate.png',
            alt: 'ACE IT Generate Study Deck screen with topic and difficulty controls',
          },
          {
            title: 'Study Deck Overview',
            image: '/images/ace-it-deck.png',
            alt: 'ACE IT Study Deck Overview showing Flashcards and Quiz modes',
          },
          {
            title: 'Flashcards Active Recall',
            image: '/images/ace-it-flashcard.png',
            alt: 'ACE IT Flashcards screen with Space-to-flip card and Next/Prev controls',
          },
          {
            title: 'Quiz Mode',
            image: '/images/ace-it-quiz.png',
            alt: 'ACE IT Quiz Mode screen with multiple-choice options and score counter',
          },
        ],
        accessibilityConsiderations: [
          'Low-Glare Contrast: Crisp text on calm dark surfaces prevents eye strain.',
          'Full Keyboard Study: Spacebar card flips and clean Tab order across modes.',
          'Mobile-First Stacking: Decks and quizzes fit narrow viewports with zero scroll.',
        ],
      },
      goingForward: {
        impact: 'Live at ace-it-ten.vercel.app, giving students an ad-free AI study workspace.',
        whatILearned: 'Stripping dashboard noise directly improves study speed and retention.',
        nextSteps: [
          'Add spaced-repetition scheduling for missed cards.',
          'Expand PDF and slide deck file parsing.',
          'Run full screen-reader audit across quiz states.',
        ],
      },
    },
  },
  {
    id: 'project-2',
    name: 'CRHS Web',
    description:
      'Fast mobile-first school portal built for prepaid mobile data.',
    category: 'School Web Portal',
    role: 'Lead Frontend & UI',
    technologies: ['HTML5', 'CSS3 / Flexbox & Grid', 'JavaScript (ES6+)', 'Responsive Design', 'Vercel'],
    screenshot: '/images/crhs-web.png',
    screenshotAlt: 'Castillejos Resettlement High School (CRHS Web) official portal homepage',
    repository: 'https://github.com/Nykt04/CRHS_Web',
    liveDemo: 'https://crhs-web.vercel.app/home.html',
    caseStudy: '#case-study?p=project-2',
    featured: false,
    roles: [
      {
        title: 'UI/UX Designer',
        description: 'Designed high-contrast, mobile-first layouts for parents and students.',
      },
      {
        title: 'Lead Frontend Developer',
        description: 'Built semantic HTML5, CSS Grid/Flexbox, and vanilla JS with zero bloat.',
      },
      {
        title: 'Quality Assurance',
        description: 'Checked responsive breakpoints, link integrity, and light/dark contrast.',
      },
      {
        title: 'Content Architecture',
        description: 'Structured bulletins, admissions steps, and faculty under clear headings.',
      },
    ],
    persona: {
      name: 'Elena Cruz',
      role: 'Illustrative Target Persona · Parent / Guardian',
      demographics: 'Illustrative Profile · Castillejos, Zambales',
      age: '42',
      education: 'Parent / Guardian',
      hometown: 'Castillejos, Zambales',
      family: 'Mother of two Junior High students',
      occupation: 'Working Parent',
      quote: 'Parents shouldn’t scroll through group chats just to find enrollment dates.',
      scenario: 'Checks enrollment steps and notices on a budget Android using prepaid data.',
      goals: [
        'Find enrollment checklists and news in seconds.',
        'View school contacts without creating an account.',
        'Read cleanly on entry-level Android screens.',
      ],
      painPoints: [
        'School memos get buried in social media chats.',
        'Heavy pages stall on prepaid cellular data.',
        'Unlabeled icon menus confuse mobile visitors.',
      ],
      techHabits: [
        'Browses on budget Android with prepaid data.',
        'Prefers labeled buttons and readable type.',
      ],
    },
    caseStudyDetail: {
      overview: {
        targetUsers: 'High school students, parents, incoming enrollees, and faculty.',
        duration: 'July 2026 – August 2026',
        problem: 'Official memos and enrollment guides get buried in social feeds and slow sites.',
        goal: 'Ship a lightweight portal that loads fast on cellular data in two taps.',
        teamContext: 'Designed UI architecture and coded the zero-framework frontend.',
      },
      understanding: {
        painPoints: [
          {
            title: 'Notices Buried in Chats',
            detail: 'Placed official announcements and enrollment links directly on home.',
          },
          {
            title: 'Slow Prepaid Loads',
            detail: 'Used lean HTML, CSS, and vanilla JS to eliminate bundle overhead.',
          },
          {
            title: 'Unlabeled Icon Menus',
            detail: 'Paired the menu icon with a visible "Menu" text label.',
          },
          {
            title: 'Hidden Admissions Info',
            detail: 'Added an Enroll CTA and dedicated Admissions and Contact pages.',
          },
        ],
        problemStatement:
          'Parents and students need a fast mobile school portal because social feeds bury official enrollment steps.',
        journeyMap: [
          {
            stage: '1. Land on Home',
            action: 'Opens portal on mobile data.',
            feelings: 'Wants quick answers.',
            painPoints: 'Slow pages or popups.',
            opportunities: 'Instant load with clear hero.',
          },
          {
            stage: '2. Verify School',
            action: 'Sees DepEd ID 301016 badge.',
            feelings: 'Reassured by official ID.',
            painPoints: 'Unclear track labels.',
            opportunities: 'Plain Junior High & ARAL cards.',
          },
          {
            stage: '3. Check Steps',
            action: 'Taps Menu -> Admissions.',
            feelings: 'Guided step-by-step.',
            painPoints: 'Deeply nested submenus.',
            opportunities: 'Grouped slide-out drawer.',
          },
          {
            stage: '4. Contact School',
            action: 'Finds phone and DepEd email.',
            feelings: 'Confident in details.',
            painPoints: 'Outdated contact numbers.',
            opportunities: 'Pinned contacts in drawer & footer.',
          },
        ],
      },
      startingDesign: {
        lofiPrototype: {
          description: '6-screen flow: Home, Nav Drawer, Curriculum, Admissions, Faculty, and News.',
          url: 'https://www.figma.com/design/yFPXRCpF5VLj3cXnQIT0Mv',
          image: '/images/crhs-lofi-flow.png?v=5',
          alt: 'CRHS Web 6-screen low-fidelity wireframes from Figma',
        },
        usabilityStudy: {
          round1: [
            'Added a visible "Menu" label beside the navigation icon.',
            'Placed DepEd accreditation and admissions highlights under the hero.',
            'Grouped drawer links into Academics and Campus Life sections.',
          ],
          round2: [
            'Added a light/dark toggle with school green and gold accents.',
            'Structured Admissions into a 4-step enrollment guide and FAQ.',
            'Added category filter chips on the News page.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Organized Navigation & Labeled Menu',
            notes: 'Upgraded flat unlabeled links into a labeled, grouped Menu drawer.',
            before: 'Unlabeled icon opening an ungrouped link list.',
            beforeImage: '/images/crhs-before-nav.png',
            beforeAlt: 'Early CRHS Portal navigation draft with unlabeled icon',
            after: 'Labeled Menu drawer with grouped links and school contacts.',
            afterImage: '/images/crhs-menu.png?v=2',
            afterAlt: 'CRHS Web navigation drawer showing grouped links',
          },
          {
            title: 'Visual Branding & Readability',
            notes: 'Applied school colors, DepEd ID badge, and campus photo across themes.',
            before: 'Unstyled draft without school crest, colors, or campus photo.',
            beforeImage: '/images/crhs-before-hero.png',
            beforeAlt: 'Early unstyled CRHS homepage draft',
            after: 'Branded homepage with campus photo and DepEd ID 301016 badge.',
            afterImage: '/images/crhs-home.png?v=2',
            afterAlt: 'CRHS Web polished homepage with school branding and campus photo',
          },
        ],
        mainMockups: [
          {
            title: 'Homepage & Hero Banner',
            image: '/images/crhs-home.png?v=2',
            alt: 'CRHS Web Homepage showing crest, DepEd ID badge, and Enroll CTA',
          },
          {
            title: 'Curriculum & DepEd ARAL',
            image: '/images/crhs-academics.png?v=2',
            alt: 'CRHS Web Academics page showing Junior High and ARAL Program cards',
          },
          {
            title: 'Admissions & Enrollment Guide',
            image: '/images/crhs-admissions.png?v=2',
            alt: 'CRHS Web Admissions page showing 4-step enrollment process',
          },
          {
            title: 'Faculty & Leadership Directory',
            image: '/images/crhs-faculty.png?v=2',
            alt: 'CRHS Web Faculty page showing school leadership and departments',
          },
        ],
        accessibilityConsiderations: [
          'Daylight Contrast: High-contrast text remains legible outdoors and in dark mode.',
          'Labeled Controls: Labeled Menu button and semantic headings aid screen readers.',
          'Low-Data Performance: Zero framework overhead ensures instant loads on cellular data.',
        ],
      },
      goingForward: {
        impact: 'Centralized official CRHS news and enrollment guides at crhs-web.vercel.app.',
        whatILearned: 'Lean HTML/CSS directly improves access for families on budget devices.',
        nextSteps: [
          'Add a lightweight CMS for staff notices.',
          'Provide a Tagalog / English toggle.',
          'Offer printable enrollment checklists.',
        ],
      },
    },
  },
];

export const defaultFeaturedId = (projects.find((item) => item.featured) || projects[0]).id;
