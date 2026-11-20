import type { PortfolioProject } from '../types/portfolio';

// Keep the featured case study first. Add another entry when you have a fourth project.
// Add real titles, roles, screenshots, and URLs here; no other layout changes are needed.
export const projects: PortfolioProject[] = [
  {
    id: 'project-3',
    name: 'Check8',
    description:
      'Web-based QR clearance portal for Gordon College, College of Computer Studies students. Check pending items on your phone and clear each station in one scan.',
    category: 'Academic Clearance · Full-Stack Web App',
    role: 'Main Contributor (Team Repo) · Full-Stack & Requirements',
    technologies: ['JavaScript', 'Node.js', 'Express', 'HTML5 / CSS3', 'QR Code API', 'Supabase', 'Vercel'],
    screenshot: '/images/check8.png',
    screenshotAlt: 'Check8 QR-enabled clearance management portal login and overview screen',
    repository: '',
    liveDemo: '',
    accessNotice:
      'Exclusive internal system for Gordon College, College of Computer Studies (private department & team repository).',
    caseStudy: '#case-study?p=project-3',
    featured: true,
    roles: [
      {
        title: 'Requirements Analysis',
        description:
          'Interviewed CCS students and signatories to map physical clearance stages (labs, library, council, dean) into digital states and hold rules.',
      },
      {
        title: 'Main Contributor (Full-Stack)',
        description:
          'Authored core Node.js/Express clearance routes, status transition logic, QR token generation, and student/instructor dashboards in our shared team repo.',
      },
      {
        title: 'UI/UX Design',
        description:
          'Designed the high-contrast mobile QR Verification Pass, non-color status badges, and the camera scanner with manual Student ID fallback.',
      },
      {
        title: 'Quality Assurance',
        description:
          'Tested role-based route guards, duplicate scan prevention, low-light QR readability, and mobile layouts across student phones.',
      },
    ],
    persona: {
      name: 'Marco Reyes',
      role: 'Illustrative Target Persona · Graduating Student',
      demographics: 'Illustrative Profile · Gordon College, College of Computer Studies Student',
      age: '21',
      education: '4th Year BS Computer Science',
      hometown: 'Olongapo City, Zambales',
      family: 'Eldest sibling supporting family',
      occupation: 'Graduating Undergraduate Student',
      quote:
        'Chasing paper signatures across campus during finals week wastes hours when nobody tells you what’s missing.',
      scenario:
        'During finals week, Marco checks pending offices on his phone and scans his QR pass at each desk instead of carrying paper slips.',
      goals: [
        'See every clearance station (Lab, Library, Council, Dean) on one phone screen.',
        'Show a scannable QR pass for fast desk sign-offs.',
        'Know why a station is pending before lining up.',
      ],
      painPoints: [
        'Paper clearance slips get crumpled or lost during finals week.',
        'Waiting in line before learning a prerequisite is missing.',
        'No clear view of which office is holding up clearance.',
      ],
      techHabits: [
        'Checks updates from a phone browser between errands.',
        'Wants obvious Cleared vs Pending status labels.',
      ],
    },
    caseStudyDetail: {
      overview: {
        product:
          'Check8 is a web-based QR clearance portal for Gordon College, College of Computer Studies students that replaces paper slips with online tracking.',
        targetUsers:
          'Gordon College, College of Computer Studies students, lab staff, library personnel, student council officers, and faculty signatories.',
        duration: 'April 2026 – November 2026',
        problem:
          'Students wait in long lines for paper signatures each semester, and losing that slip forces a full reset.',
        goal: 'Show cleared and pending stations on one phone screen with a scannable QR pass for fast sign-offs.',
        teamContext:
          'Exclusive internal system for Gordon College, College of Computer Studies; built in a groupmate-hosted repo where I led core full-stack routes, clearance flows, and UI.',
      },
      understanding: {
        researchSummary:
          'Interviews with 6 BSCS students and 2 office staff showed students lacked visibility into missing items while staff disliked manual binder lookups.',
        painPoints: [
          {
            title: 'Blindly Waiting in Line',
            detail:
              'Students wait thirty minutes before learning an item is missing, so I put an office checklist front and center.',
          },
          {
            title: 'Lost or Crumpled Paper Slips',
            detail:
              'Paper forms tear or vanish during finals week, which an online QR pass prevents.',
          },
          {
            title: 'Vague "Pending" Labels',
            detail:
              'Unexplained pending statuses cause confusion, so I added short instructor notes beside each hold.',
          },
          {
            title: 'Slow Manual Record Lookups',
            detail:
              'Checking paper lists wastes staff time, so I paired live QR scanning with manual Student ID lookup.',
          },
        ],
        problemStatement:
          'Marco Reyes is a 4th-year BSCS student who needs online clearance tracking and QR sign-offs because paper slips get lost and blind queues waste study time.',
        journeyMap: [
          {
            stage: '1. Checking Status',
            action: 'Opens Check8 on his phone to see which offices are left.',
            feelings: 'Focused on knocking out remaining stations.',
            painPoints: 'Unsure which desk to visit first.',
            opportunities: 'Clear requirement notes beside each pending item.',
          },
          {
            stage: '2. Walking to Desk',
            action: 'Heads to the lab or office counter.',
            feelings: 'Prepared with everything asked for.',
            painPoints: 'Crowded hallways during finals week.',
            opportunities: 'Obvious Cleared vs. Pending badges at a glance.',
          },
          {
            stage: '3. Showing QR Pass',
            action: 'Presents his personal QR code to the officer.',
            feelings: 'Expects a quick scan.',
            painPoints: 'Dim phone screens make scanners struggle.',
            opportunities: 'High-contrast white card around the QR code.',
          },
          {
            stage: '4. All Cleared',
            action: 'Sees his status flip to Cleared right away.',
            feelings: 'Relieved to have a saved digital record.',
            painPoints: 'Wondering when the approval went through.',
            opportunities: 'Automatic date and time stamp on every sign-off.',
          },
        ],
      },
      startingDesign: {
        paperWireframesNote:
          'Early sketches split the app into a mobile Student Clearance Pass and a focused Officer Verification Screen.',
        lofiPrototype: {
          description:
            '6-screen Figma flow: Login & Portal Entry -> Student Clearance Dashboard -> Student Event Payments -> Admin Dashboard -> Instructor Dashboard -> Event Payment Desk.',
          url: 'https://www.figma.com/design/wAT7RW50UdD6mVIZp0bBeQ/CHECK8-%E2%80%94-Low-Fidelity-Wireframes?node-id=0-1&p=f&t=ppyDvmAMFJ44Doie-0',
          image: '/images/check8-lofi-flow.jpg?v=3',
          alt: 'Check8 6-screen low-fidelity wireframes from Figma: Login & Portal Entry, Student Clearance Dashboard, Student Event Payments, Admin Dashboard, Instructor Dashboard, and Event Payment Desk',
        },
        usabilityStudy: {
          intro: 'Pilot testing with 4 classmates shaped these improvements:',
          round1: [
            'Paired status colors with explicit Cleared and Pending text labels.',
            'Added manual Student ID lookup beside the camera scanner as a fallback.',
            'Placed instructor notes directly next to Pending rows.',
          ],
          round2: [
            'Placed the QR code inside a bright white card for reliable low-light scanning.',
            'Separated student and instructor views so each role only sees relevant tools.',
            'Added approval timestamps for a clear audit trail.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'High-Contrast QR Verification Pass',
            notes:
              'Isolated the QR code on a white card with student ID and scan status for reliable camera reads.',
            before: 'Before: Dark-background QR lacked a bright quiet zone in low light.',
            beforeImage: '/images/check8-before-qr.png',
            beforeAlt: 'Low-contrast QR code on a dark card background',
            after: 'After: Bright white Verification Pass card with student name, ID, and scan status.',
            afterImage: '/images/check8-after-qr.png?v=2',
            afterAlt:
              'Check8 Verification Pass showing high-contrast white QR code, student name, ID, and Ready to scan status',
          },
          {
            title: 'Clear Status Labels Beyond Color',
            notes: 'Replaced plain color dots with explicit Cleared and Pending badges plus instructor notes.',
            before: 'Before: Unlabeled color dots forced students to guess status meaning.',
            beforeImage: '/images/check8-before-status.png',
            beforeAlt: 'Clearance list showing small color dots without text labels',
            after: 'After: Explicit Cleared and Pending badges with progress bar and notes.',
            afterImage: '/images/check8-after-status.png?v=2',
            afterAlt:
              'Check8 Clearance status table showing Cleared and Pending badges, progress bar, and instructor notes',
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
        hifiNote:
          'Built as an exclusive internal portal for Gordon College, College of Computer Studies inside our shared team repo, featuring the core clearance workflows and screens I implemented.',
        accessibilityConsiderations: [
          'Words Alongside Color: Status pills pair Cleared and Pending text with distinct borders.',
          'Thumb-Friendly Targets: Buttons and tabs are sized for easy one-handed mobile taps.',
          'Clean Narrow-Screen Stacking: Tables and QR cards stack vertically without horizontal scrolling.',
        ],
      },
      goingForward: {
        impact:
          'Dedicated Gordon College, College of Computer Studies clearance system replacing fragile paper slips with trackable QR verification.',
        whatILearned:
          'Leading Check8 taught me how to simplify paper workflows, collaborate in a shared Git repo, and always pair QR scanners with manual ID lookup.',
        nextSteps: [
          'Printable Clearance Summary: Export a clean PDF once all stations are signed off.',
          'Office Hours Indicator: Show when each signatory desk is open.',
          'Department Rollout Expansion: Support additional CCS semester event and laboratory checkpoints.',
        ],
      },
    },
  },
  {
    id: 'featured-project',
    name: 'ACE IT',
    description:
      'Distraction-free study app to organize notes, generate flashcards with AI, and practice active recall.',
    category: 'Educational Tech · Full-Stack Web App',
    role: 'Project Manager · Lead Developer · QA · Requirements Analysis',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Vercel', 'Figma'],
    screenshot: '/images/ace-it.png',
    screenshotAlt: 'ACE IT web application account login and registration screen at ace-it-ten.vercel.app',
    repository: 'https://github.com/Nykt04/_AceIt',
    liveDemo: 'https://ace-it-ten.vercel.app/',
    caseStudy: '#case-study?p=featured-project',
    featured: false,
    roles: [
      {
        title: 'Project Manager',
        description: 'Organized sprint goals, prioritized features, and kept design and code aligned.',
      },
      {
        title: 'Lead Developer',
        description: 'Built Next.js App Router views, TypeScript components, Supabase auth, and AI deck routes.',
      },
      {
        title: 'Quality Assurance',
        description: 'Verified sign-in flows, mobile layouts, WCAG 2.2 AA contrast, and keyboard navigation.',
      },
      {
        title: 'Requirements Analysis',
        description: 'Mapped student study habits into clean Supabase schemas and deck workflows.',
      },
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
      quote:
        'During exam week, I don’t have hours to type flashcards from 80-slide decks—I just want my sets in one calm place.',
      scenario:
        'Sophia reviews slides on her phone between classes and drills flashcards on her laptop at night without ads or paywalls.',
      goals: [
        'Turn lecture outlines into flashcard decks fast.',
        'Practice active recall on both phone and laptop.',
        'Keep all study sets synced in one account.',
      ],
      painPoints: [
        'Typing flashcards manually from dense slides takes too long.',
        'Many study apps lock basic deck generation behind paywalls.',
        'Cluttered dashboards break late-night focus.',
      ],
      techHabits: [
        'Switches between phone on commutes and laptop at night.',
        'Prefers low-glare dark mode with minimal noise.',
      ],
    },
    caseStudyDetail: {
      overview: {
        product:
          'ACE IT is a calm study web app where students write decks manually, upload files, or generate flashcards with AI.',
        targetUsers: 'College and senior high students reviewing dense lecture slides on tight schedules.',
        duration: 'August 2025 – November 2025',
        problem:
          'Manual flashcard creation takes too long before exams, while existing tools hide AI features behind paywalls or noisy feeds.',
        goal: 'Provide a clutter-free workspace where creating sets, uploading notes, and drilling active recall feels instant.',
        teamContext: 'Led sprint planning, requirements, QA, and full-stack Next.js development.',
      },
      understanding: {
        researchSummary:
          'Interviews with 8 classmates showed students value fast note-to-card setup and a quiet dark interface for late-night study.',
        painPoints: [
          {
            title: 'Slow Manual Card Setup',
            detail:
              'Typing dozens of cards stalls prep, so I added file upload and AI generation beside manual creation.',
          },
          {
            title: 'Jumping Between Apps',
            detail:
              'Switching tools breaks focus, so authoring, uploads, and quiz review live in one workspace.',
          },
          {
            title: 'Cluttered Late-Night Screens',
            detail: 'Bright ads tire eyes at night, driving the high-contrast dark theme.',
          },
          {
            title: 'Losing Progress Across Devices',
            detail: 'Supabase auth syncs decks seamlessly between phone and laptop.',
          },
        ],
        problemStatement:
          'Sophia Ramos is a 2nd-year BSCS student who needs a fast way to turn course outlines into flashcards because manual setup steals exam prep time.',
        journeyMap: [
          {
            stage: '1. Onboarding & Sign-In',
            action: 'Reads Terms / Privacy steps and logs in via email or Google.',
            feelings: 'Clear on how her prompts and data are used.',
            painPoints: 'Drop-off if onboarding feels hidden or vague.',
            opportunities: 'Upfront step-by-step consent flow.',
          },
          {
            stage: '2. Building a Deck',
            action: 'Picks Create Set, Upload File, or AI Generate.',
            feelings: 'Relieved to get a starter deck fast.',
            painPoints: 'Waiting on AI formatting or needing quick tweaks.',
            opportunities: 'Editable cards right after generation.',
          },
          {
            stage: '3. Active Recall Mode',
            action: 'Flips cards with Spacebar or taps to test memory.',
            feelings: 'Focused without visual clutter.',
            painPoints: 'Tiny buttons on phones during commutes.',
            opportunities: 'Full-card tap and keyboard shortcuts.',
          },
          {
            stage: '4. Coming Back Later',
            action: 'Picks up saved decks from her dashboard.',
            feelings: 'Organized ahead of exam day.',
            painPoints: 'Starting over on another device.',
            opportunities: 'Cloud-synced user decks via Supabase.',
          },
        ],
      },
      startingDesign: {
        paperWireframesNote:
          'Early sketches tucked navigation into a clean drawer so the study canvas stays quiet and reachable in one tap.',
        lofiPrototype: {
          description:
            '6-screen Figma flow: Account Login & Sign Up -> Study Decks Dashboard -> AI Generate Study Deck -> Study Deck Overview & Cards -> Flashcards Active Recall Mode -> Quiz Mode.',
          url: 'https://www.figma.com/design/nEYnHjFgojJYzfRzm8BEjr/ACE-IT-%E2%80%94-Low-Fidelity-Wireframes?node-id=2-2&p=f&t=MimFHK2uCKnydipz-0',
          image: '/images/ace-it-lofi-flow.png?v=2',
          alt: 'ACE IT 6-screen low-fidelity wireframes from Figma: Account Login & Sign Up, Study Decks Dashboard, AI Generate Study Deck, Study Deck Overview & Cards, Flashcards Active Recall Mode, and Quiz Mode',
        },
        usabilityStudy: {
          intro: 'Testing the prototype with 5 peers led to these refinements:',
          round1: [
            'Added explicit Terms and Privacy consent steps before sign-in.',
            'Moved navigation into a top-left drawer to keep the study header clean.',
            'Split Create Set, Upload File, and AI Generate into three clear starter cards.',
          ],
          round2: [
            'Tuned dark surfaces and button contrast for comfortable midnight reading.',
            'Added Google OAuth alongside Email/Password login.',
            'Anchored recall controls near the bottom for easy thumb reach on mobile.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Onboarding & Consent Flow',
            notes: 'Added a 3-step onboarding and consent preview before account login.',
            before: 'Before: Immediate login wall with no product or privacy context.',
            beforeImage: '/images/ace-it-before-onboarding.png',
            beforeAlt: 'Direct login wall without onboarding context',
            after: 'After: Clear 3-step onboarding and consent flow before sign-in.',
            afterImage: '/images/ace-it-after-onboarding.png',
            afterAlt: 'Sequential onboarding and consent flow for ACE IT',
          },
          {
            title: 'Flexible Sign-In Options',
            notes: 'Added Google Sign-In and password recovery alongside email login.',
            before: 'Before: Basic email-only form without OAuth or password reset.',
            beforeImage: '/images/ace-it-before-auth.png',
            beforeAlt: 'Early email-only login form',
            after: 'After: Sign In card with Email, Forgot Password, and Continue with Google.',
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
        hifiNote: 'Live at ace-it-ten.vercel.app with light/dark themes and responsive mobile study views.',
        accessibilityConsiderations: [
          'Low-Strain Night Contrast: Crisp text on calm dark surfaces prevents harsh glare.',
          'Keyboard-Ready Studying: Flip cards with Spacebar and tab cleanly across all controls.',
          'Zero Horizontal Scroll: Decks and quizzes stack cleanly on phones and laptops.',
        ],
      },
      goingForward: {
        impact:
          'ACE IT (v1.0.0) runs live at ace-it-ten.vercel.app, giving students an ad-free space to generate and drill flashcards.',
        whatILearned:
          'Building ACE IT sharpened my Next.js and Supabase integration skills and showed how stripping UI clutter improves focus.',
        nextSteps: [
          'Spaced Repetition Scheduling: Resurface missed cards sooner.',
          'Richer File Parsing: Extract cards directly from more slide and PDF formats.',
          'Screen Reader Audit: Run full assistive-tech checks across quiz and study modes.',
        ],
      },
    },
  },
  {
    id: 'project-2',
    name: 'CRHS Web',
    description:
      'Lightweight school portal for Castillejos Resettlement High School, built to load fast on prepaid mobile data.',
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
      {
        title: 'UI/UX Designer',
        description: 'Designed high-contrast, mobile-first school pages for parents, students, and faculty.',
      },
      {
        title: 'Lead Frontend Developer',
        description: 'Built semantic HTML5, CSS Flexbox/Grid layouts, and vanilla JS with zero framework bloat.',
      },
      {
        title: 'Quality Assurance',
        description: 'Verified responsive layouts, internal links, and light/dark contrast across devices.',
      },
      {
        title: 'Content Architecture',
        description:
          'Organized bulletins, admissions steps, faculty directories, and academic tracks under clear headings.',
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
      occupation: 'Working Parent & School Guardian',
      quote:
        'Parents shouldn’t have to scroll through dozens of group chats just to check enrollment dates or required papers.',
      scenario:
        'Elena checks official enrollment steps and school announcements on a budget Android phone using prepaid data.',
      goals: [
        'Find official announcements and enrollment checklists in seconds.',
        'View programs and contacts without creating an account.',
        'Read comfortably on an entry-level Android screen.',
      ],
      painPoints: [
        'Important school memos get buried in social media feeds.',
        'Heavy websites stall on prepaid mobile data.',
        'Unlabeled icon menus hide important links.',
      ],
      techHabits: [
        'Browses on a budget Android phone with prepaid data.',
        'Prefers readable fonts and explicitly labeled buttons.',
      ],
    },
    caseStudyDetail: {
      overview: {
        product:
          'CRHS Web is a fast public portal for Castillejos Resettlement High School (DepEd ID 301016) with announcements, programs, and enrollment guides.',
        targetUsers: 'High school students, parents and guardians, incoming enrollees, and faculty.',
        duration: 'July 2026 – August 2026',
        problem:
          'Official memos and enrollment steps get buried in group chats, frustrating families on mobile data.',
        goal: 'Deliver a lightweight portal that loads fast on cellular data and surfaces answers in two taps.',
      },
      understanding: {
        researchSummary:
          'Feedback from 6 local parents and students highlighted the need for fast loads on prepaid data, readable text, and login-free admissions info.',
        painPoints: [
          {
            title: 'Notices Buried in Social Feeds',
            detail:
              'Updates get lost in chat threads, so announcements and enrollment links sit right on the homepage.',
          },
          {
            title: 'Slow Pages on Prepaid Data',
            detail: 'Heavy frameworks stall on weak signals, so I used lean HTML, CSS, and vanilla JS.',
          },
          {
            title: 'Hidden Icon-Only Menus',
            detail: 'Unlabeled hamburger icons confuse visitors, so I paired the icon with a clear "Menu" label.',
          },
          {
            title: 'Hard-to-Find Admissions & Contacts',
            detail:
              'Dedicated Admissions, Academics, and Contact pages plus an Enroll Now CTA keep answers one tap away.',
          },
        ],
        problemStatement:
          'Elena Cruz is a working parent in Castillejos who needs a fast, clear mobile school portal because social feeds bury official enrollment guides.',
        journeyMap: [
          {
            stage: '1. Landing on Home',
            action: 'Opens CRHS Web on mobile data.',
            feelings: 'Hoping to find official info fast.',
            painPoints: 'Slow pages or annoying popups.',
            opportunities: 'Instant load with clean hero summary.',
          },
          {
            stage: '2. Verifying School & Programs',
            action: 'Spots the DepEd School ID 301016 badge and program highlights.',
            feelings: 'Reassured she’s on the real school portal.',
            painPoints: 'Unclear track descriptions.',
            opportunities: 'Plain badges for Junior High & ARAL.',
          },
          {
            stage: '3. Checking Requirements',
            action: 'Taps "Menu" -> Admissions.',
            feelings: 'Guided by clear step-by-step lists.',
            painPoints: 'Deeply nested submenus.',
            opportunities: 'Grouped slide-out drawer with clear headings.',
          },
          {
            stage: '4. Contacting School',
            action: 'Finds phone number and DepEd email right away.',
            feelings: 'Confident she has current contact details.',
            painPoints: 'Broken links or outdated numbers.',
            opportunities: 'Consistent contacts in drawer and footer.',
          },
        ],
      },
      startingDesign: {
        paperWireframesNote:
          'Early sketches paired a sticky header (crest, labeled Menu button, theme toggle, Enroll CTA) with the DepEd ID badge and a 4-column footer.',
        lofiPrototype: {
          description:
            '6-screen Figma flow: Homepage & Hero Banner -> Navigation Directory Drawer -> Junior High & DepEd ARAL Curriculum -> Admissions & Enrollment Guide -> Faculty & School Administration -> News Bulletins & Campus Contact.',
          url: 'https://www.figma.com/design/yFPXRCpF5VLj3cXnQIT0Mv',
          image: '/images/crhs-lofi-flow.png?v=5',
          alt: 'CRHS Web 6-screen low-fidelity wireframes from Figma: Homepage & Hero Banner, Navigation Directory Drawer, Junior High & DepEd ARAL Curriculum, Admissions & Enrollment Guide, Faculty & School Administration, and News Bulletins & Campus Contact',
        },
        usabilityStudy: {
          intro: 'Testing with 5 students and guardians on mobile and desktop led to these updates:',
          round1: [
            'Added a visible "Menu" text label beside the navigation icon.',
            'Placed DepEd accreditation, ARAL, and admissions highlights directly under the hero CTAs.',
            'Grouped drawer links into Academics & Governance and Campus Life & Community.',
          ],
          round2: [
            'Added a light/dark toggle with school green and gold accents.',
            'Structured Admissions as a 4-step guide with grade-level cards and an FAQ.',
            'Added category filter chips on the News page.',
          ],
        },
      },
      refiningDesign: {
        mockupsBeforeAfter: [
          {
            title: 'Organized Navigation & Labeled Menu',
            notes:
              'Turned an unlabeled icon and flat link list into a labeled "Menu" drawer with grouped links and school contacts.',
            before: 'Before: Unlabeled icon opening an ungrouped link list.',
            beforeImage: '/images/crhs-before-nav.png',
            beforeAlt: 'Early CRHS Portal navigation draft with unlabeled icon and flat ungrouped link list',
            after: 'After: Labeled Menu drawer with grouped sections and direct contacts.',
            afterImage: '/images/crhs-menu.png?v=2',
            afterAlt:
              'CRHS Web open navigation drawer showing organized Academics & Governance and Campus Life & Community links',
          },
          {
            title: 'Visual Branding & Readability',
            notes: 'Applied school green and gold branding, DepEd ID badge, and campus photo across light and dark modes.',
            before: 'Before: Unstyled draft without school crest, colors, or photo.',
            beforeImage: '/images/crhs-before-hero.png',
            beforeAlt: 'Early unstyled CRHS homepage draft without school crest, colors, or campus photo',
            after: 'After: Branded homepage with campus photo and DepEd ID 301016 badge.',
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
        hifiNote: 'Live at crhs-web.vercel.app with light/dark themes and responsive mobile navigation.',
        accessibilityConsiderations: [
          'Daylight & Night Contrast: High-contrast text stays legible outdoors and in dark mode.',
          'Obvious Labels & Headings: Labeled Menu button and semantic headings support keyboard and screen reader users.',
          'Fast on Prepaid Mobile Data: Zero framework overhead ensures instant loads on weak connections.',
        ],
      },
      goingForward: {
        impact:
          'CRHS Web centralizes official news, programs, and admissions guides at crhs-web.vercel.app so families skip group-chat hunting.',
        whatILearned:
          'Building CRHS Web proved how lean HTML/CSS and clear hierarchy help families on budget phones and prepaid data.',
        nextSteps: [
          'Simple Notice Editor: Let staff post announcements without editing code.',
          'Tagalog / English Toggle: Offer bilingual school bulletins.',
          'Printable Forms Checklist: Provide downloadable enrollment checklists.',
        ],
      },
    },
  },
];

export const defaultFeaturedId = (projects.find((item) => item.featured) || projects[0]).id;
