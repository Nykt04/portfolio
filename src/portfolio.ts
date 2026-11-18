// Edit this file to personalize the portfolio. Empty URLs render as honest placeholders.
export const portfolio = {
  name: 'Gian Karlo C. Reguindin',
  shortName: 'Gian Karlo',
  title: 'Aspiring Web Developer',
  course: '3rd Year BSCS',
  introduction: 'I’m Gian Karlo, a computer science student and aspiring web developer interested in building thoughtful, user-friendly digital experiences.',
  about: 'I’m a 3rd-year Computer Science student at Gordon College who likes turning messy, everyday problems into calm, readable web apps. When you use something I built, whether you’re clearing semester requirements, reviewing flashcards at 1 AM, or checking school announcements on mobile data, I want it to feel obvious, fast, and easy on your eyes.',
  education: 'Bachelor of Science in Computer Science, Gordon College',
  interests: 'Frontend & full-stack web apps, accessible UI/UX (WCAG 2.2 AA), and practical tools for students and local communities.',
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
    { name: 'VS Code', category: 'IDE & AI', description: 'Where I write and debug TypeScript, React, and backend code every day.' },
    { name: 'Figma', category: 'Design', description: 'Where I sketch wireframes, map user flows, and test layouts before coding.' },
    { name: 'Photoshop', category: 'Design', description: 'Where I retouch photos, clean up screenshots, and prep raster graphics (TESDA NC III).' },
    { name: 'Illustrator', category: 'Design', description: 'Where I draw crisp logos, icons, and vector layouts that scale cleanly (TESDA NC III).' },
    { name: 'Canva', category: 'Design', description: 'What I use for quick slide decks and clean visual summaries for class.' },
    { name: 'Git', category: 'Workflow', description: 'How I branch, track changes safely, and keep team merges clean.' },
    { name: 'GitHub', category: 'Workflow', description: 'Where I host code, review pull requests, and coordinate group builds.' },
    { name: 'Vercel', category: 'Cloud', description: 'Where I ship live frontend builds with fast previews for every commit.' },
    { name: 'Supabase', category: 'Cloud', description: 'What powers account login and database storage in projects like ACE IT.' },
    { name: 'React', category: 'Frameworks', description: 'How I structure reusable UI components and keep interactive state predictable.' },
    { name: 'Next.js', category: 'Frameworks', description: 'My go-to full-stack React framework for routing, auth flows, and API endpoints.' },
    { name: 'Tailwind', category: 'Frameworks', description: 'How I keep spacing, typography, and contrast consistent across your screen sizes.' },
    { name: 'Node.js', category: 'Backend', description: 'What runs my Express API routes and clearance workflow logic in Check8.' },
  ],
  roles: [
    { title: 'Project Manager', description: 'I break coursework into weekly milestones, keep teammates unblocked, and make sure design and code ship on time.' },
    { title: 'Lead Developer', description: 'I build the frontend views, state logic, and backend APIs in TypeScript, React, Next.js, and Node.js.' },
    { title: 'Quality Assurance', description: 'I test every screen with keyboard-only navigation, check WCAG 2.2 AA contrast, and fix mobile layout bugs before launch.' },
    { title: 'Requirements Analysis', description: 'I talk with classmates and staff to map real bottlenecks into simple user flows and database tables.' },
  ],
  contact: {
    email: 'reguindin.giankarlo@gmail.com',
    github: 'https://github.com/Nykt04',
    linkedin: 'https://www.linkedin.com/in/gian-karlo-reguindin-762712349/',
  },
  project: {
    name: 'Check8',
    description: 'I built Check8 so you don’t have to chase paper clearance slips across Gordon College offices. You can check pending items on your phone and clear each checkpoint with one QR scan.',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML5 / CSS3', 'QR Code API', 'Render'],
    screenshot: '/images/check8.png',
    screenshotAlt: 'Check8 QR-enabled clearance management portal login and overview screen',
    repository: '',
    liveDemo: 'https://check8-1.onrender.com',
    reference: '',
    persona: {
      name: 'Marco Reyes',
      role: 'Illustrative Target Persona · Graduating Student',
      demographics: 'Illustrative Profile · Gordon College CCS Student',
      age: '21',
      education: '4th Year BS Computer Science',
      hometown: 'Olongapo City, Zambales',
      family: 'Eldest sibling supporting family',
      occupation: 'Graduating Undergraduate Student',
      quote: 'Spending days walking across campus just to get stamps on a paper slip you might lose during finals week wears you down fast when nobody tells you what’s missing.',
      scenario: 'During finals week, Marco checks his phone between errands to see which campus offices (Lab, Library, Council, Dean) have cleared him and shows his QR code at each desk so he never risks losing a paper slip.',
      goals: [
        'See every clearance checkpoint (Lab, Library, Council, Dean) in one place on his phone.',
        'Flash a scannable QR pass at each desk for fast sign-offs.',
        'Know right away why a station is still pending before walking across campus.',
      ],
      painPoints: [
        'Paper clearance slips get crumpled or lost right when deadlines hit.',
        'You wait in line only to find out the officer stepped out or a prerequisite is missing.',
        'Hard to tell which specific office is holding up your clearance.',
      ],
      techHabits: [
        'Checks updates from a phone browser between errands.',
        'Wants obvious Cleared vs Pending status labels with zero extra setup.',
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
      description: 'I earned this Philippine TVET National Certificate III under TESDA’s Competency Assessment System, covering user interface design (ICT216316), user experience design (ICT216315), logo design (ICT216313), and print media layout.',
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
      description: 'I completed this DICT-ITU DTC Initiative course with instructor Gerald Silen, practicing object-oriented programming, modules and packages, string tools, generators, file handling, and custom exceptions.',
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
      description: 'I completed this DICT-ITU DTC Initiative course with instructor Gerald Silen, covering Python data types, conditionals, loops, collections (lists, tuples, dictionaries), and step-by-step problem solving.',
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
      description: 'I earned this Fortinet Training Institute certification (valid through October 28, 2028) covering common cyber threats, spotting social engineering attempts, and basic cloud security habits.',
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
      description: 'I completed this DICT-ITU DTC Initiative course with instructor Gerald Silen, sharpening how I build responsive layouts using Flexbox, CSS Grid, specificity rules, and media queries.',
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
      description: 'I completed this DICT-ITU DTC Initiative course with instructor Gerald Silen, focusing on semantic HTML5 landmarks, clean document structure, accessible form labels, and WCAG basics.',
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
  roles?: ProjectRole[];
  persona?: ProjectPersona;
  caseStudyDetail?: CaseStudyDetail;
}

// Keep the featured case study first. Add another entry when you have a fourth project.
// Add real titles, roles, screenshots, and URLs here; no other layout changes are needed.
export const projects: PortfolioProject[] = [
  {
    ...portfolio.project,
    id: 'project-3',
    name: 'Check8',
    description: portfolio.project.description,
    category: 'Academic Clearance · Full-Stack Web App',
    role: 'Main Contributor (Team Repo) · Full-Stack & Requirements',
    technologies: portfolio.project.technologies,
    screenshot: portfolio.project.screenshot,
    screenshotAlt: portfolio.project.screenshotAlt,
    repository: portfolio.project.repository,
    liveDemo: portfolio.project.liveDemo,
    caseStudy: '#case-study?p=project-3',
    featured: true,
    roles: [
      { title: 'Requirements Analysis', description: 'I mapped Gordon College CCS end-of-semester clearance bottlenecks, turning paper signatures across labs, library, student council, and the dean’s office into clear digital states.' },
      { title: 'Main Contributor (Full-Stack)', description: 'Working inside a groupmate’s team repository, I wrote the core Node.js/Express routes, clearance state rules, QR pass generation, and mobile-ready views.' },
      { title: 'UI/UX Design', description: 'I designed separate, low-clutter views so you can check your status on your phone while instructors scan and approve checkpoints in seconds.' },
      { title: 'Quality Assurance', description: 'I tested state changes, role-permission guards, session persistence, and small-screen phone layouts before deployment.' },
    ],
    persona: portfolio.project.persona,
    caseStudyDetail: {
      overview: {
        product: 'Check8 is a web-based clearance portal I helped build for Gordon College Computer Science students. Instead of carrying a paper slip from office to office, you track every requirement online and clear each desk with your personal QR code.',
        targetUsers: 'Gordon College CCS students, lab staff, library personnel, student council officers, and faculty signatories.',
        duration: 'April 2026 – November 2026',
        problem: 'At the end of every semester, you end up waiting in long lines across campus just to get paper signatures, and if that slip gets crumpled or lost, you have to start over.',
        goal: 'Give you one clear screen on your phone showing exactly what’s cleared, what’s still pending, and a scannable QR pass for fast desk sign-offs.',
        teamContext: 'Built with a student team inside a groupmate-hosted repo, where I led the core implementation, clearance flow design, and interface work.',
      },
      understanding: {
        researchSummary: 'Talking with 6 fellow BSCS students and 2 campus office staff during clearance week revealed two clear gaps: students had no idea which requirements were missing before lining up, and staff were tired of flipping through thick paper binders to verify one name.',
        painPoints: [
          { title: 'Blindly Waiting in Line', detail: 'You wait thirty minutes only to learn an item is missing or the signatory stepped out. That led me to put an office-by-office checklist front and center.' },
          { title: 'Lost or Crumpled Paper Slips', detail: 'Paper forms tear easily during finals week, forcing a full reset. Putting your pass online with a unique QR code fixes that.' },
          { title: 'Vague "Pending" Labels', detail: 'Seeing "Pending" with zero explanation leaves you guessing what to fix. I added short instructor notes right next to each pending item.' },
          { title: 'Slow Manual Record Lookups', detail: 'Staff lose minutes checking paper lists by hand. Adding live QR scanning plus a manual Student ID search lets them verify and approve in seconds.' },
        ],
        problemStatement: 'Marco Reyes is a 4th-year BSCS student who needs clear online clearance updates and digital sign-offs because paper slips get lost easily and waiting in line without knowing hold reasons wastes exam prep time.',
        journeyMap: [
          { stage: '1. Checking Status', action: 'Opens Check8 on his phone to see which offices are left.', feelings: 'Focused on knocking out remaining stations.', painPoints: 'Unsure which desk to visit first.', opportunities: 'Clear requirement notes beside each pending item.' },
          { stage: '2. Walking to Desk', action: 'Heads to the lab or office counter.', feelings: 'Prepared with everything asked for.', painPoints: 'Crowded hallways during finals week.', opportunities: 'Obvious Cleared vs. Pending badges at a glance.' },
          { stage: '3. Showing QR Pass', action: 'Presents his personal QR code to the officer.', feelings: 'Expects a quick scan.', painPoints: 'Dim phone screens make scanners struggle.', opportunities: 'High-contrast white card around the QR code.' },
          { stage: '4. All Cleared', action: 'Sees his status flip to Cleared right away.', feelings: 'Relieved to have a saved digital record.', painPoints: 'Wondering when the approval went through.', opportunities: 'Automatic date and time stamp on every sign-off.' },
        ],
      },
      startingDesign: {
        paperWireframesNote: 'My early sketches split the app around two everyday jobs: a phone-friendly Student Clearance Pass you can pull up while walking, and a focused Officer Verification Screen for staff at the desk.',
        lofiPrototype: {
          description: '6-screen user flow in Figma: Login -> Student Dashboard (checklist & QR pass) -> Instructor Dashboard -> QR Verification & Event Payments -> Admin Dashboard, keeping every sign-off synced in real time.',
          url: 'https://www.figma.com/design/SmRtxYwAAgpJvC4mVkmFaO/Check8-Wireframes?node-id=0-1',
          image: '/images/check8-lofi-flow.jpg?v=2',
          alt: 'Check8 6-screen low-fidelity wireframes from Figma: Login, Admin Dashboard, Instructor Dashboard, QR Verification, Event Payments, and Student Dashboard',
        },
        usabilityStudy: {
          intro: 'I walked 4 classmates through the student checklist and QR scan flow during pilot testing, which shaped these updates:',
          round1: [
            'Paired status colors with explicit words (Cleared and Pending) so you never have to guess what a dot means.',
            'Added manual Student ID lookup next to the camera scanner in case an officer’s webcam fails or a phone screen is cracked.',
            'Placed short instructor notes directly beside Pending rows so you know what to bring before you line up.',
          ],
          round2: [
            'Put your QR code inside an isolated bright white card so phone and laptop cameras lock onto it even at low brightness.',
            'Kept student and instructor tools cleanly separated so each role only sees the actions they actually need.',
            'Added clear timestamps on every approval for an honest paperless trail.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'High-Contrast QR Verification Pass',
            notes: 'Putting the QR code inside an isolated white Verification Pass card with your name, ID, and scan-ready badge makes it reliable even on dim phone screens.',
            before: 'Before: Dark-background QR without a bright quiet zone fails to scan smoothly in low light.',
            beforeImage: '/images/check8-before-qr.png',
            beforeAlt: 'Low-contrast QR code on a dark card background',
            after: 'After: Isolated bright white Verification Pass card with student name, ID, and Ready to scan status.',
            afterImage: '/images/check8-after-qr.png?v=2',
            afterAlt: 'Check8 Verification Pass showing high-contrast white QR code, student name, ID, and Ready to scan status',
          },
          {
            title: 'Clear Status Labels Beyond Color',
            notes: 'Swapped ambiguous colored dots for explicit Cleared and Pending badges paired with a progress bar and instructor notes.',
            before: 'Before: Small colored dots without words force you to guess what each status means.',
            beforeImage: '/images/check8-before-status.png',
            beforeAlt: 'Clearance list showing small color dots without text labels',
            after: 'After: Real Check8 Clearance table with Cleared and Pending badges, progress bar, and instructor notes.',
            afterImage: '/images/check8-after-status.png?v=2',
            afterAlt: 'Check8 Clearance status table showing Cleared and Pending badges, progress bar, and instructor notes',
          },
        ],
        mainMockups: [
          {
            title: 'Screen 1: Portal Sign In',
            image: '/images/check8.png',
            alt: 'Check8 login screen showing Gordon College branding, institutional email login, and Secure, Fast, Paperless highlights',
          },
          {
            title: 'Screen 2: Student Dashboard & QR Pass',
            image: '/images/check8-student.jpg',
            alt: 'Check8 Student Dashboard showing enrolled courses, Cleared and Pending status with notes, progress bar, and personal QR code',
          },
          {
            title: 'Screen 3: Instructor Dashboard',
            image: '/images/check8-instructor.jpg',
            alt: 'Check8 Instructor Dashboard showing assigned class sections, pending vs cleared counts, and QR Verification shortcut',
          },
          {
            title: 'Screen 4: QR Verification (Clearance Validation)',
            image: '/images/check8-qr-verify.jpg',
            alt: 'Check8 Clearance Validation screen with course selector, live camera QR scanner, and manual student token backup',
          },
          {
            title: 'Screen 5: Event Payments',
            image: '/images/check8-events.jpg',
            alt: 'Check8 Event Payments screen showing student list, required vs paid amounts, and payment confirmation form',
          },
          {
            title: 'Screen 6: Admin Dashboard',
            image: '/images/check8-admin.jpg',
            alt: 'Check8 Admin Dashboard showing student records, CSV/SQLite import, groups and classes, and course management',
          },
        ],
        hifiNote: 'You can try the live app on Render at check8-1.onrender.com (Render may show a brief cold-start security check on first visit). I built the core workflows and screens inside our team repository.',
        accessibilityConsiderations: [
          'Words Alongside Color: Status pills pair clear Cleared and Pending labels with distinct borders so you can tell states apart without relying on color alone.',
          'Thumb-Friendly Targets: Buttons and navigation tabs stay large enough to tap comfortably while walking between campus buildings.',
          'Clean Narrow-Screen Stacking: Tables and QR cards reflow vertically on phones without forcing you to pinch-zoom or scroll sideways.',
        ],
      },
      goingForward: {
        impact: 'Check8 runs live at check8-1.onrender.com as a student team build I led in implementation, turning fragile paper clearance slips into a trackable online workflow.',
        whatILearned: 'Building Check8 taught me how to turn messy real-world paperwork into simple screens, work smoothly inside a shared team git repo, and always pack a manual fallback (Student ID search) next to camera QR scanning.',
        nextSteps: [
          'Printable Clearance Summary: Let cleared students export a clean PDF or print sheet once every station is signed off.',
          'Office Hours Indicator: Show when each signatory or desk is actually open before you walk over.',
          'Public Repository Mirror: Link the finalized team repository here once approved for public portfolio viewing.',
        ],
      },
    },
  },
  {
    id: 'featured-project',
    name: 'ACE IT',
    description: 'I built ACE IT so you have one calm workspace to organize notes, generate flashcards with AI prompts, and drill active recall before exams.',
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
      { title: 'Project Manager', description: 'I organized sprint goals, prioritized what shipped first, and kept design and code moving smoothly together.' },
      { title: 'Lead Developer', description: 'I built the Next.js App Router views, TypeScript components, Supabase auth guards, and AI deck generation routes.' },
      { title: 'Quality Assurance', description: 'I checked every sign-in flow, verified mobile layouts, and ran WCAG 2.2 AA contrast and keyboard sweeps.' },
      { title: 'Requirements Analysis', description: 'I mapped how students turn lecture slides into study sets and structured the Supabase data schemas around those habits.' },
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
      quote: 'When exam week hits, you don’t have hours to type out flashcards from 80-slide decks, so you just want your sets organized in one calm place.',
      scenario: 'During exam week, Sophia reviews lecture slides on her phone between classes and drills decks on her laptop at night. She wants to turn course outlines into flashcards fast without paywalls or noisy social feeds.',
      goals: [
        'Turn messy lecture outlines into clean flashcard decks without tedious typing.',
        'Practice active recall smoothly on both your phone and laptop.',
        'Keep every study set saved inside your own account.',
      ],
      painPoints: [
        'Typing flashcards one by one from dense slide decks eats up real study hours.',
        'Many study apps lock basic deck generation behind paywalls.',
        'Busy dashboards and popups make late-night cramming harder to focus through.',
      ],
      techHabits: [
        'Switches between phone between classes and laptop during long night sessions.',
        'Prefers dark-mode friendly pages with low visual noise.',
      ],
    },
    caseStudyDetail: {
      overview: {
        product: 'ACE IT is a study companion app I built to help you organize coursework and drill active recall. You can write decks by hand, upload study files, or generate flashcards from prompts inside one quiet workspace.',
        targetUsers: 'College and senior high students juggling dense lecture slides and tight exam schedules.',
        duration: 'August 2025 – November 2025',
        problem: 'Right before exams, turning thick slide decks into flashcards takes too long by hand, while most apps lock AI tools behind subscriptions or bury you in noisy feeds.',
        goal: 'Give you a clutter-free study app where creating manual sets, uploading files, or generating AI flashcards feels immediate.',
        teamContext: 'I led sprint planning, core requirements, quality testing, and full-stack Next.js development.',
      },
      understanding: {
        researchSummary: 'Chatting with 8 classmates showed that when exam week arrives, you care most about speed (getting notes turned into cards fast) and a calm screen free of ads or distracting gamification at midnight.',
        painPoints: [
          { title: 'Slow Manual Card Setup', detail: 'Typing out dozens of cards by hand stalls revision before it starts, so I added file upload and AI prompt generation next to manual authoring.' },
          { title: 'Jumping Between Apps', detail: 'Switching between notes, generators, and study tools breaks focus. Putting authoring, uploads, and quiz review in one account keeps you in flow.' },
          { title: 'Cluttered Late-Night Screens', detail: 'Bright ads and busy sidebars tire your eyes at night, which drove the calm, high-contrast dark workspace.' },
          { title: 'Losing Progress Across Devices', detail: 'If you study on your phone during the commute and laptop at home, Supabase login keeps your decks synced everywhere.' },
        ],
        problemStatement: 'Sophia Ramos is a 2nd-year BSCS student who needs a fast way to turn course outlines into focused flashcard sets because manual setup steals hours from actual exam prep.',
        journeyMap: [
          { stage: '1. Onboarding & Sign-In', action: 'Reads Terms / Privacy steps and logs in via email or Google.', feelings: 'Clear on how her prompts and data are used.', painPoints: 'Drop-off if onboarding feels hidden or vague.', opportunities: 'Upfront step-by-step consent flow.' },
          { stage: '2. Building a Deck', action: 'Picks Create Set, Upload File, or AI Generate.', feelings: 'Relieved to get a starter deck fast.', painPoints: 'Waiting on AI formatting or needing quick tweaks.', opportunities: 'Editable cards right after generation.' },
          { stage: '3. Active Recall Mode', action: 'Flips cards with Spacebar or taps to test memory.', feelings: 'Focused without visual clutter.', painPoints: 'Tiny buttons on phones during commutes.', opportunities: 'Full-card tap and keyboard shortcuts.' },
          { stage: '4. Coming Back Later', action: 'Picks up saved decks from her dashboard.', feelings: 'Organized ahead of exam day.', painPoints: 'Starting over on another device.', opportunities: 'Cloud-synced user decks via Supabase.' },
        ],
      },
      startingDesign: {
        paperWireframesNote: 'My early layout sketches kept navigation inside a clean drawer (Home, AI Generate, Upload File, Create Set, Settings) so the study stage stays quiet and you reach any tool in one tap.',
        lofiPrototype: {
          description: 'User flow: About ACE IT -> Terms & Conditions -> Privacy Policy -> Sign In (Email or Google) -> Study Set Hub -> Create / AI Generate / Upload -> Active Recall Study Session.',
          url: 'https://ace-it-ten.vercel.app/',
          image: '/images/ace-it-lofi-flow.png',
          alt: 'ACE IT 5-screen low-fidelity wireframe flow covering onboarding, sign in, study set hub, AI deck builder, and active recall',
        },
        usabilityStudy: {
          intro: 'I tested the prototype with 5 student peers during class reviews, which led directly to these fixes:',
          round1: [
            'Placed explicit Terms & Conditions and Privacy Policy consent before sign-in so you know how your prompts and uploads are handled.',
            'Tucked navigation into a top-left drawer and dedicated Settings control to keep the study header uncluttered.',
            'Split Create Set, Upload File, and AI Generate into three clear starter cards so first-time visitors never feel lost.',
          ],
          round2: [
            'Tuned dark surfaces with crisp primary buttons so reading at midnight stays easy on your eyes.',
            'Added Continue with Google next to Email/Password so you can jump straight into studying.',
            'Moved recall buttons down near your thumb on mobile screens.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Onboarding & Consent Flow',
            notes: 'Sequenced About ACE IT -> Terms & Conditions -> Privacy Policy -> Sign In so you understand how the workspace works before making an account.',
            before: 'Before: Immediate login wall giving zero context about study features or data privacy.',
            beforeImage: '/images/ace-it-before-onboarding.png',
            beforeAlt: 'Direct login wall without onboarding context',
            after: 'After: Clean 3-step onboarding and consent flow before entering the dashboard.',
            afterImage: '/images/ace-it-after-onboarding.png',
            afterAlt: 'Sequential onboarding and consent flow for ACE IT',
          },
          {
            title: 'Flexible Sign-In Options',
            notes: 'Paired Email/Password sign-in (with Forgot Password) and Continue with Google to match how students log in.',
            before: 'Before: Basic email-only form lacking Google login or password recovery.',
            beforeImage: '/images/ace-it-before-auth.png',
            beforeAlt: 'Early email-only login form',
            after: 'After: Clean Sign In / Register card with Study Email, Forgot Password, and Continue with Google.',
            afterImage: '/images/ace-it.png',
            afterAlt: 'ACE IT live login screen with Email/Password and Google Sign-In',
          },
        ],
        mainMockups: [
          {
            title: 'Screen 1: Account Login & Sign Up (ace-it-ten.vercel.app)',
            image: '/images/ace-it.png',
            alt: 'ACE IT live login and registration screen with Study Email and Continue with Google',
          },
          {
            title: 'Screen 2: Study Decks Dashboard',
            image: '/images/ace-it-dashboard.png',
            alt: 'ACE IT Study Decks dashboard with Create Set Manually and AI Generate Set actions',
          },
          {
            title: 'Screen 3: Generate Study Deck',
            image: '/images/ace-it-generate.png',
            alt: 'ACE IT Generate Study Deck screen with deck format, study topic, and difficulty options',
          },
          {
            title: 'Screen 4: Study Deck Overview & Cards',
            image: '/images/ace-it-deck.png',
            alt: 'ACE IT Study Deck Overview showing Flashcards Mode, Quiz Mode, and interactive deck cards',
          },
          {
            title: 'Screen 5: Flashcards Active Recall Mode',
            image: '/images/ace-it-flashcard.png',
            alt: 'ACE IT Flashcards active recall screen with Space-to-flip card, Reveal Definition, Prev, and Next controls',
          },
          {
            title: 'Screen 6: Quiz Mode',
            image: '/images/ace-it-quiz.png',
            alt: 'ACE IT Quiz Mode screen showing multiple-choice question, progress indicator, and live score counter',
          },
        ],
        hifiNote: 'You can explore the live app at ace-it-ten.vercel.app with light/dark reading support and mobile-ready layouts.',
        accessibilityConsiderations: [
          'Low-Strain Night Contrast: Crisp text against calm dark surfaces keeps late-night revision readable without harsh glare.',
          'Keyboard-Ready Studying: You can flip flashcards with Spacebar and tab cleanly through every menu and button.',
          'Zero Horizontal Scroll: Decks and quiz layouts stack cleanly whether you’re on a small phone or a widescreen laptop.',
        ],
      },
      goingForward: {
        impact: 'ACE IT (v1.0.0) is live at ace-it-ten.vercel.app, giving students a focused space to build, generate, and review study sets without paywalls or ad noise.',
        whatILearned: 'Building ACE IT sharpened how I coordinate a team codebase, pair Next.js interfaces with Supabase auth, and protect user focus by stripping away unnecessary chrome.',
        nextSteps: [
          'Spaced Repetition Scheduling: Bring harder cards back sooner based on which ones you missed.',
          'Richer File Parsing: Support direct extraction from more lecture slide decks and PDF notes.',
          'Screen Reader Audit: Complete end-to-end assistive-technology walkthroughs across quiz and study modes.',
        ],
      },
    },
  },
  {
    id: 'project-2',
    name: 'CRHS Web',
    description: 'I built this lightweight, mobile-friendly portal for Castillejos Resettlement High School so families can find announcements, academic programs, and enrollment steps fast on prepaid data.',
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
      { title: 'UI/UX Designer', description: 'I designed readable, high-contrast school pages tailored for parents, teachers, and students browsing on entry-level phones.' },
      { title: 'Lead Frontend Developer', description: 'I wrote semantic HTML5, CSS Flexbox/Grid layouts, and lightweight vanilla JavaScript for the slide-out menu and theme toggle, with zero heavy framework overhead.' },
      { title: 'Quality Assurance', description: 'I tested every page across mobile, tablet, and desktop widths, checked all internal school links, and verified color contrast in light and dark modes.' },
      { title: 'Content Architecture', description: 'I organized school bulletins, admissions requirements, faculty directories, and Junior High / ARAL programs under clear semantic headings.' },
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
      quote: 'You shouldn’t have to scroll through dozens of group chats and old social media posts just to verify when enrollment opens or what papers to bring.',
      scenario: 'Elena checks school updates on a budget Android phone using prepaid mobile data. She needs official enrollment steps and exam dates fast without waiting for heavy scripts to download.',
      goals: [
        'Find official school announcements, calendars, and enrollment checklists in seconds.',
        'Check department pages and school contacts without having to create an account.',
        'Read pages comfortably on an everyday Android screen.',
      ],
      painPoints: [
        'Important school memos disappear under noisy social media posts.',
        'Bloated websites stall or eat through prepaid cellular data.',
        'Small, low-contrast links inside hidden icon-only menus are hard to spot.',
      ],
      techHabits: [
        'Uses a budget Android phone on prepaid mobile data.',
        'Appreciates readable fonts, clear button labels, and direct links.',
      ],
    },
    caseStudyDetail: {
      overview: {
        product: 'CRHS Web is a fast, accessible public website I built for Castillejos Resettlement High School (DepEd School ID 301016) in Castillejos, Zambales. It puts school announcements, Junior High & ARAL academic tracks, enrollment steps, and official contacts in one place.',
        targetUsers: 'High school students, parents and guardians, incoming enrollees, and school faculty.',
        duration: 'July 2026 – August 2026',
        problem: 'Important memos, exam dates, and enrollment instructions get buried inside social media group chats, making it frustrating for parents on mobile data to confirm what’s official.',
        goal: 'Build a lightweight portal that loads fast on cellular connections, stays readable in bright sunlight or dark mode, and lets anyone find answers in two taps.',
      },
      understanding: {
        researchSummary: 'Conversations with 6 local parents and students in Castillejos showed what mattered most: pages that load fast on prepaid data, readable text sizes without clutter, and instant access to admissions and contact info without needing a login.',
        painPoints: [
          { title: 'Notices Buried in Social Feeds', detail: 'Updates get lost under unrelated comments. Putting announcements, news, and enrollment actions right on the homepage keeps official info easy to verify.' },
          { title: 'Slow Pages on Prepaid Data', detail: 'Heavy frameworks stall on weak signals, so I wrote lean HTML, CSS, and vanilla JavaScript that opens almost instantly.' },
          { title: 'Hidden Icon-Only Menus', detail: 'Unlabeled hamburger icons confuse non-technical guardians. Pairing the icon with a clear "Menu" word label makes navigation unmistakable.' },
          { title: 'Hard-to-Find Admissions & Contacts', detail: 'Families want direct requirements without digging. Dedicated Admissions, Academics, and Contact pages plus an Enroll Now button solve that.' },
        ],
        problemStatement: 'Elena Cruz is a working parent in Castillejos, Zambales who needs a lightweight, clear school website on her phone because social media feeds bury official enrollment guides.',
        journeyMap: [
          { stage: '1. Landing on Home', action: 'Opens CRHS Web on mobile data.', feelings: 'Hoping to find official info fast.', painPoints: 'Slow pages or annoying popups.', opportunities: 'Instant load with clean hero summary.' },
          { stage: '2. Verifying School & Programs', action: 'Spots the DepEd School ID 301016 badge and program highlights.', feelings: 'Reassured she’s on the real school portal.', painPoints: 'Unclear track descriptions.', opportunities: 'Plain badges for Junior High & ARAL.' },
          { stage: '3. Checking Requirements', action: 'Taps "Menu" -> Admissions.', feelings: 'Guided by clear step-by-step lists.', painPoints: 'Deeply nested submenus.', opportunities: 'Grouped slide-out drawer with clear headings.' },
          { stage: '4. Contacting School', action: 'Finds phone number and DepEd email right away.', feelings: 'Confident she has current contact details.', painPoints: 'Broken links or outdated numbers.', opportunities: 'Consistent contacts in drawer and footer.' },
        ],
      },
      startingDesign: {
        paperWireframesNote: 'My early sketches organized the portal around a sticky header (CRHS Crest, labeled "Menu" button, light/dark toggle, "Enroll Now" button), the DepEd School ID 301016 badge, clear hero actions, and a 4-column school footer.',
        lofiPrototype: {
          description: 'User flow in Figma: Home -> hero highlights & DepEd School ID 301016 -> "Menu" drawer (grouped into Academics & Governance / Campus Life & Community) -> Academics, Admissions (4-step workflow + FAQ), Faculty, News, or Contact.',
          url: 'https://www.figma.com/design/yFPXRCpF5VLj3cXnQIT0Mv',
          image: '/images/crhs-lofi-flow.png?v=4',
          alt: 'CRHS Web 7-screen low-fidelity wireframe flow in Figma covering Home, Menu drawer, Academics, Admissions, Faculty, News, and Contact',
        },
        usabilityStudy: {
          intro: 'I walked 5 students and guardians through the portal on phones and laptops, leading to these changes:',
          round1: [
            'Added the word "Menu" beside the menu icon so any visitor spots navigation immediately.',
            'Placed key highlights (DepEd Accredited, DepEd ARAL Program, ICT-Enhanced Learning, S.Y. 2026-2027 Admissions Open) right below the hero buttons.',
            'Split the slide-out drawer into Academics & Governance and Campus Life & Community instead of one long list.',
          ],
          round2: [
            'Built a light/dark reading toggle paired with CRHS green and gold accents.',
            'Laid out Admissions as a clear 4-step guide with grade-level cards and an expandable FAQ.',
            'Added filter chips (All, Academics, DepEd Orders, Campus Life, Achievements, Community) on the News page.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Organized Navigation & Labeled Menu',
            notes: 'Upgraded an unlabeled icon and flat link dump into a clearly labeled "Menu" button opening grouped sections with direct school phone and DepEd email at the bottom.',
            before: 'Before: Unlabeled icon opening an ungrouped list of links.',
            beforeImage: '/images/crhs-before-nav.png',
            beforeAlt: 'Early CRHS Portal navigation draft with unlabeled icon and flat ungrouped link list',
            after: 'After: Grouped navigation drawer with Academics, Campus Life, and direct school contact details.',
            afterImage: '/images/crhs-menu.png?v=2',
            afterAlt: 'CRHS Web open navigation drawer showing organized Academics & Governance and Campus Life & Community links',
          },
          {
            title: 'Visual Branding & Readability',
            notes: 'Paired official school green and gold with crisp typography and real campus photography across light and dark modes.',
            before: 'Before: Plain unstyled draft lacking school crest, colors, or campus context.',
            beforeImage: '/images/crhs-before-hero.png',
            beforeAlt: 'Early unstyled CRHS homepage draft without school crest, colors, or campus photo',
            after: 'After: Finished homepage with campus photo, DepEd School ID 301016 badge, and high-contrast text.',
            afterImage: '/images/crhs-home.png?v=2',
            afterAlt: 'CRHS Web polished homepage with school branding, DepEd badge, and campus photography',
          },
        ],
        mainMockups: [
          {
            title: 'Screen 1: Homepage & Hero Banner',
            image: '/images/crhs-home.png?v=2',
            alt: 'CRHS Web Homepage showing CRHS crest, DepEd School ID 301016 badge, hero headline, Enroll CTA, and campus photo',
          },
          {
            title: 'Screen 2: Curriculum & DepEd ARAL Program',
            image: '/images/crhs-academics.png?v=2',
            alt: 'CRHS Web Academics page showing Junior High School Grades 7-10 and DepEd ARAL Program cards',
          },
          {
            title: 'Screen 3: Admissions & Enrollment Guide',
            image: '/images/crhs-admissions.png?v=2',
            alt: 'CRHS Web Admissions page showing S.Y. 2026-2027 countdown, 4-step enrollment process, and credential requirements',
          },
          {
            title: 'Screen 4: Faculty & Leadership Directory',
            image: '/images/crhs-faculty.png?v=2',
            alt: 'CRHS Web Faculty page showing school leadership and subject department directory cards',
          },
        ],
        hifiNote: 'The live portal runs at crhs-web.vercel.app with light/dark mode support and responsive mobile drawers.',
        accessibilityConsiderations: [
          'Daylight & Night Contrast: Strong contrast between text and surfaces keeps every memo legible outdoors or in dark mode.',
          'Obvious Labels & Headings: The labeled "Menu" button, semantic headings, and clear link text work smoothly with keyboards and screen readers.',
          'Fast on Prepaid Mobile Data: Zero bloated bundles means pages stack neatly on narrow screens and load quickly over weak signals.',
        ],
      },
      goingForward: {
        impact: 'CRHS Web puts official school news, programs, admissions checklists, and contacts together at crhs-web.vercel.app so families don’t have to dig through group chats.',
        whatILearned: 'Building CRHS Web showed me how much lean HTML/CSS and clear information hierarchy matter when your audience visits on budget phones and prepaid mobile data.',
        nextSteps: [
          'Simple Notice Editor: Let school staff post new announcements without touching code.',
          'Tagalog / English Toggle: Offer translated bulletins so more parents feel at home.',
          'Printable Forms Checklist: Give families downloadable enrollment checklists to bring on campus.',
        ],
      },
    },
  },
];
