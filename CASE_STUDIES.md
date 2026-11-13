# UI/UX Case Study Presentation Portfolio

**Author:** Gian Karlo C. Reguindin  
**Course & Year:** 3rd Year Bachelor of Science in Computer Science (BSCS) — Gordon College  
**Specialization:** Aspiring Web Developer & UI/UX Designer  
**Format:** Structured UI/UX Case Study Presentation Outline (26 Slides per Project · Research metrics marked cleanly as qualitative/editable until measured)

---

## Table of Contents
1. [Case Study 1: ACE IT — AI-Powered Active Recall Study Companion](#case-study-1-ace-it)
2. [Case Study 2: Check8 — Contactless QR Clearance Management Platform](#case-study-2-check8)
3. [Case Study 3: CRHS Web — Accessible Institutional Community Portal](#case-study-3-crhs-web)

---

# Case Study 1: ACE IT

```
┌────────────────────────────────────────────────────────────────────────┐
│ SLIDE 01: TITLE SLIDE                                                  │
├────────────────────────────────────────────────────────────────────────┤
│ Title: ACE IT — AI-Powered Active Recall Study Companion               │
│ Subtitle: Designing a Distraction-Free Study Platform for Students     │
│ Author: Gian Karlo C. Reguindin                                        │
│ Program: 3rd Year BSCS · Gordon College                                │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Project Overview (Slides 02 – 04)

#### Slide 02: Project Overview — Product & Stack
* **The Product:** ACE IT is an interactive learning companion web application designed to help college students organize coursework and practice active recall. Built with Next.js, TypeScript, Supabase, Tailwind CSS, and OpenAI-assisted generation on Vercel (`https://ace-it-ten.vercel.app/`), it combines custom study set authoring, AI flashcard generation, file uploads, and interactive study review in one clean workspace.
* **Target Users:** Undergraduate college students and exam candidates managing dense lecture slides and study notes.
* **Source Repository:** [https://github.com/Nykt04/_AceIt](https://github.com/Nykt04/_AceIt)
* **Preview of Designs:** Dark-theme web workspace with onboarding/consent flow, email & Google authentication, AI generation, custom study set tools, and active recall review views.

#### Slide 03: Project Overview — The Problem & The Goal
* **The Problem:** Students regularly review dense lecture slides and scattered notes right before exams. Manual flashcard creation takes considerable setup time, while many existing platforms place AI study aids behind subscriptions or distract focus with noisy feeds.
* **The Goal:** Build an intuitive web application where learners can create study decks manually, upload study material, or generate flashcards with AI prompts inside an uncluttered interface.

#### Slide 04: Project Overview — My Role & Responsibilities
* **My Role:** Project Manager, Lead Developer, Quality Assurance & Requirements Analysis.
* **Responsibilities:**
  * **Project Manager:** Coordinated sprint priorities across design and engineering tasks and kept feature milestones aligned.
  * **Lead Developer:** Structured Next.js App Router views, TypeScript components, Supabase authentication/data integration, and AI prompt endpoints.
  * **Quality Assurance:** Reviewed onboarding, consent flows, study set CRUD operations, API error handling, and responsive viewport behavior.
  * **Requirements Analysis:** Mapped student study workflows into structured auth, deck authoring, and study-mode specifications.

---

### Understanding the User (Slides 05 – 09)

#### Slide 05: Section Divider — Understanding the User
* Study workflows & goals
* Illustrative target persona
* Problem statements
* User journey map

#### Slide 06: User Research & Problem Framing (Qualitative Focus)
* *[Editable Note: Insert class interview/survey counts here if formal research is conducted.]*
* Framing the student workflow showed that learners preparing for exams prioritize **quick setup** (turning lecture topics into flashcards without friction) and an uncluttered workspace that avoids noisy social gamification during late-night review sessions.

#### Slide 07: Core Pain Points & Design Responses
1. **Pain Point 1 — Tedious Manual Card Authoring:** Converting lengthy slides into flashcards by hand slows down exam prep.  
   * *Design Impact:* Added AI-assisted flashcard generation and file upload support alongside manual study-set authoring.
2. **Pain Point 2 — Scattered Study Tools:** Switching between notes, flashcards, and generators interrupts focus.  
   * *Design Impact:* Combined custom sets, AI generation, file import, and interactive study review into one authenticated workspace.
3. **Pain Point 3 — Visual Clutter During Review:** Ads and unnecessary chrome break concentration during active study.  
   * *Design Impact:* Used a restrained dark UI with clear visual hierarchy focused on study tasks.
4. **Pain Point 4 — Clear Privacy & Account Continuity:** Students switching between mobile and desktop want saved decks across sessions.  
   * *Design Impact:* Integrated onboarding consent flows (Terms & Conditions, Privacy Policy) and Supabase account persistence.

#### Slide 08: Illustrative Target Persona — Sophia Ramos

```
┌────────────────────────────────────────────────────────────────────────┐
│ ILLUSTRATIVE TARGET PERSONA: SOPHIA RAMOS                              │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Profile Context (Illustrative):  │ Illustrative Quote:                 │
│ • Standing: 2nd Year BSCS        │ "Reviewing dense lecture slides     │
│ • Device: Laptop & Smartphone    │ right before exams gets             │
│ • Focus: Active recall between   │ overwhelming quickly. Having custom │
│   classes and late-night review  │ decks and quick flashcard           │
│                                  │ generation in one place helps."     │
├──────────────────────────────────┼─────────────────────────────────────┤
│ Goals:                           │ Frustrations:                       │
│ • Organize lecture notes into    │ • Building flashcard decks manually │
│   structured flashcard sets.     │   takes too much prep time.         │
│ • Review decks smoothly across   │ • Paywalls on basic study helpers.  │
│   phone and laptop screens.      │ • Cluttered dashboards disrupting   │
│ • Track study progress cleanly.  │   exam-week focus.                  │
├──────────────────────────────────┴─────────────────────────────────────┤
│ Problem Statement:                                                     │
│ An undergraduate learner needs a quick way to convert course outlines  │
│ into focused active-recall sets because manual setup takes time away   │
│ from actual exam preparation.                                          │
└────────────────────────────────────────────────────────────────────────┘
```

#### Slide 09: User Journey Map

| Stage | 1. Onboarding & Auth | 2. Creating a Deck | 3. Active Study Session | 4. Continuing Review |
| :--- | :--- | :--- | :--- | :--- |
| **User Action** | Reviews About / Terms / Privacy steps and signs in (email or Google). | Chooses Create Set, Upload File, or AI Generate. | Flips cards and drills active retrieval. | Revisits saved study sets from Home dashboard. |
| **User Feelings** | Informed about data usage; eager to start quickly. | Hopeful for fast deck creation. | Focused on recall without visual clutter. | Organized and confident tracking progress. |
| **Pain Points** | Friction if onboarding steps feel confusing. | Waiting on AI generation or formatting edge cases. | Clumsy card controls or tiny mobile targets. | Losing unsaved progress across devices. |
| **Opportunities** | Clear multi-step onboarding progress & guest guidance. | Structured previews with quick manual editing. | Full-card click/tap & keyboard shortcuts. | Synced user decks backed by Supabase auth. |

---

### Starting the Design (Slides 10 – 15)

#### Slide 10: Section Divider — Starting the Design
* Information architecture
* Digital wireframes
* User flows
* UI iteration notes

#### Slide 11: Early Layout Exploration
* **Goals & Thought Process:** Structured the interface around a minimal navigation drawer (`Home`, `AI Generate`, `Upload File`, `Create Set`, `Settings`) paired with focused main content so desktop and mobile learners reach deck tools quickly.

#### Slide 12: Digital Wireframes — Screen 1: Deck Hub & AI Generator
* **Screen Name:** Study Set Hub & AI Generator (`ace-it-ten.vercel.app`)
* **Key Elements & User Benefits:**
  1. *Simple Action Routing:* Separate focused entry points for AI generation, manual deck creation, and file uploads.
  2. *Deck Status Clarity:* Organized study cards cleanly separated from global drawer navigation.
  3. *Clear Primary Actions:* Prominent full-width or well-spaced call-to-action buttons with comfortable tap areas.

#### Slide 13: Digital Wireframes — Screen 2: Active Recall Study Canvas
* **Screen Name:** Active Recall Study Mode
* **Key Elements & User Benefits:**
  1. *Distraction-Free Canvas:* Keeps secondary chrome hidden while studying individual cards.
  2. *Deliberate Reveal:* Front prompt stays clear until the learner triggers card flip.
  3. *Thumb-Friendly Controls:* Bottom-anchored action controls for easy mobile use.

#### Slide 14: Prototype Flow
* **User Flow:** About AceIt -> Terms & Conditions -> Privacy Policy -> Login / Sign Up (Email or Google OAuth) -> Authenticated Home Dashboard -> AI Generate / Create Set -> Interactive Study Session.

#### Slide 15: Usability Notes & Iterations
* **Design Refinements Observed During Development:**
  1. Added explicit Terms & Conditions and Privacy Policy confirmation steps ahead of authentication so users understand Supabase storage and OpenAI processing transparently.
  2. Grouped navigation inside a clean top-left drawer and dedicated `Settings` control to avoid header crowding.
  3. Used high-contrast dark surfaces paired with bright purple/white primary buttons for legibility.

---

### Refining the Design (Slides 16 – 21)

#### Slide 16: Section Divider — Refining the Design
* Screen architecture
* Accessibility considerations

#### Slide 17: Mockup Refinement 1 — Onboarding & Consent Flow
* **Focus:** Clear sequential flow (`About AceIt` -> `Terms & Conditions` -> `Privacy Policy` -> `Welcome Back Login/Sign Up`) so first-time users see product capabilities before signing in.

#### Slide 18: Mockup Refinement 2 — Authentication Flexibility
* **Focus:** Supporting both standard Email/Password authentication (with `Forgot password?`) and `Continue with Google` OAuth to match typical student workflows.

#### Slide 19: Key Screens
* **Screen 1 — About & Onboarding:** Feature summary and version info (`Version 1.0.0`).
* **Screen 2 — Login & Sign Up Shell:** Branded AceIt header, drawer navigation, Settings button, Email/Password & Google OAuth controls.
* **Screen 3 — Deck Authoring / AI Generate:** Tools to generate or upload study materials.
* **Screen 4 — Active Study Canvas:** Focused card-by-card active recall interface.

#### Slide 20: Live Deployment & Verification
* **Live URL:** [https://ace-it-ten.vercel.app/](https://ace-it-ten.vercel.app/)
* **Source Code:** [https://github.com/Nykt04/_AceIt](https://github.com/Nykt04/_AceIt)
* **Stack:** Next.js, TypeScript, React, Tailwind CSS, Supabase, OpenAI integration, Vercel.

#### Slide 21: Accessibility Considerations
1. **Readable Dark-Mode Contrast:** Light foreground copy paired with dark card surfaces and clear input borders.
2. **Focus Indicators & Semantic Controls:** Clear tab navigation across onboarding buttons, checkboxes, form inputs, and drawer toggles.
3. **Responsive Layout:** Adapts cleanly from mobile viewports to desktop widths without overflowing elements.

---

### Going Forward (Slides 22 – 26)

#### Slide 22: Section Divider — Going Forward
* Takeaways & next steps

#### Slide 23: Takeaways & Lessons Learned
* **What I Learned:** Building ACE IT strengthened my practical experience structuring Next.js full-stack applications, implementing Supabase authentication guards cleanly, and keeping onboarding/consent UI straightforward.
* *[Editable Note: Add real peer test feedback and observed study session metrics when gathered.]*

#### Slide 24: Next Steps
1. **Spaced Repetition Scheduling:** Prioritize review intervals based on card recall history.
2. **Broader Document Parsing:** Support direct extraction across common lecture slide and document formats.
3. **Expanded Keyboard & Screen Reader Testing:** Run formal assistive-technology validation across the study canvas.

#### Slide 25: Let's Connect!
* **Email:** [giankarloreguindin811@gmail.com](mailto:giankarloreguindin811@gmail.com)
* **GitHub:** [https://github.com/Nykt04](https://github.com/Nykt04)
* **LinkedIn:** [https://www.linkedin.com/in/gian-karlo-reguindin-762712349/](https://www.linkedin.com/in/gian-karlo-reguindin-762712349/)

#### Slide 26: Thank You!
* *"Thank you for reviewing the ACE IT Case Study!"*

---
---

# Case Study 2: Check8

```
┌────────────────────────────────────────────────────────────────────────┐
│ SLIDE 01: TITLE SLIDE                                                  │
├────────────────────────────────────────────────────────────────────────┤
│ Title: Check8 — QR Clearance Management Platform                       │
│ Subtitle: Digitizing Campus Clearance Checkpoints for Gordon College   │
│ Author: Gian Karlo C. Reguindin (Main Contributor · Team Repo)         │
│ Program: 3rd Year BSCS · Gordon College                                │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Project Overview (Slides 02 – 04)

#### Slide 02: Project Overview — Product & Team Context
* **The Product:** Check8 is a web-based academic clearance management platform developed for Gordon College Computer Science students (`https://check8-1.onrender.com`). It replaces paper clearance slips with digital QR checkpoint verification.
* **Target Users:** Gordon College CCS students, laboratory custodians, library staff, student council officers, and department signatories.
* **Team Context:** Built collaboratively in a student groupmate-hosted repository, with Gian Karlo serving as the **main contributor** for core application development and requirements mapping.

#### Slide 03: Project Overview — The Problem & The Goal
* **The Problem:** At the end of each academic term, students collect signatures across campus laboratories, library, student council, and department offices on physical paper slips that are easily misplaced or delayed while waiting in office queues.
* **The Goal:** Organize clearance approvals into one transparent web platform using digital QR checkpoints and real-time status tracking.

#### Slide 04: Project Overview — My Role & Responsibilities
* **My Role:** Main Contributor (Full-Stack Developer, Requirements Analysis, UI/UX Design, QA).
* **Responsibilities:**
  * **Requirements Analysis:** Mapped physical clearance stages (library, labs, council, dean) into explicit checkpoint states.
  * **Main Contributor (Full-Stack):** Implemented core Node.js/Express routes, clearance state transitions, QR generation workflows, and portal views inside the team’s shared repository.
  * **UI/UX Design:** Structured mobile-friendly student status views and officer approval workflows.
  * **Quality Assurance:** Tested checkpoint approval state logic, access guards, and responsive layouts.

---

### Understanding the User (Slides 05 – 09)

#### Slide 05: Section Divider — Understanding the User
* Clearance bottlenecks
* Illustrative target persona
* Problem statements
* User journey map

#### Slide 06: User Research & Problem Framing (Qualitative Focus)
* *[Editable Note: Insert formal signatory/student survey counts if documented for class.]*
* Observing end-of-semester campus clearance workflows showed two main friction points: students had no clear way to verify pending holds before lining up, and staff needed fast record lookups without digging through paper binders.

#### Slide 07: Core Pain Points & Design Responses
1. **Pain Point 1 — No Visibility Before Waiting:** Students line up only to find a signatory is away or an item is still pending.  
   * *Design Impact:* Clear per-checkpoint status breakdown showing exactly which stations are cleared or pending.
2. **Pain Point 2 — Damaged or Lost Paper Slips:** Paper forms get lost during finals week, forcing restarts.  
   * *Design Impact:* Persistent browser-accessible clearance checklist paired with a digital QR code.
3. **Pain Point 3 — Unclear Hold Reasons:** Generic pending status without context slows resolution.  
   * *Design Impact:* Explicit remarks/action notes tied to incomplete requirements.
4. **Pain Point 4 — Manual Ledger Verification:** Paper sign-offs slow staff approvals.  
   * *Design Impact:* QR scan workflow linking directly to the student’s checkpoint record.

#### Slide 08: Illustrative Target Persona — Marco Reyes

```
┌────────────────────────────────────────────────────────────────────────┐
│ ILLUSTRATIVE TARGET PERSONA: MARCO REYES                               │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Profile Context (Illustrative):  │ Illustrative Quote:                 │
│ • Standing: 4th Year BSCS        │ "Walking across offices with a      │
│ • Context: Gordon College CCS    │ paper clearance slip that could     │
│ • Device: Mobile phone browser   │ easily get misplaced during finals  │
│   during finals/clearance week   │ week is frustrating without clear   │
│                                  │ status visibility."                 │
├──────────────────────────────────┼─────────────────────────────────────┤
│ Goals:                           │ Frustrations:                       │
│ • Track all clearance checkpoints│ • Standing in queues only to find a │
│   from one dashboard.            │   signatory unavailable or pending. │
│ • Show a digital QR code cleanly │ • Risk of losing paper forms right  │
│   at each checkpoint station.    │   before final submission.          │
│ • See updated approval status.   │ • Unclear hold reasons.             │
├──────────────────────────────────┴─────────────────────────────────────┤
│ Problem Statement:                                                     │
│ A Computer Science student needs transparent clearance status tracking │
│ and digital checkpoint sign-offs because paper slips risk loss and     │
│ uncoordinated office visits waste study time.                          │
└────────────────────────────────────────────────────────────────────────┘
```

#### Slide 09: User Journey Map

| Stage | 1. Checking Status | 2. Visiting Checkpoint | 3. Presenting QR | 4. Completion |
| :--- | :--- | :--- | :--- | :--- |
| **User Action** | Opens Check8 on phone to inspect pending checkpoints. | Visits active office/lab checkpoint. | Displays personal QR code for verification. | Views updated Cleared status badge. |
| **User Feelings** | Focused on clearing pending stations. | Informed about what remains. | Expects fast scan/lookup. | Relieved to have digital record. |
| **Pain Points** | Confusion over dependency order. | Busy queues at peak times. | Camera difficulty on dim phone screens. | Uncertainty where final status is stored. |
| **Opportunities** | Clear dependency/requirement text. | Status labels indicating open vs pending. | High-contrast QR display. | Timestamped approval audit trail. |

---

### Starting the Design (Slides 10 – 15)

#### Slide 10: Section Divider — Starting the Design
* Workflow mapping
* Digital wireframes
* User flows

#### Slide 11: Early Workflow & Screen Sketches
* **Goals & Thought Process:** Separated concerns cleanly between the student mobile passport view (`Student Clearance Passport`) and staff verification terminal (`Officer Terminal`).

#### Slide 12: Digital Wireframes — Screen 1: Student Clearance Passport
* **Screen Name:** Student Clearance Passport
* **Key Elements & User Benefits:**
  1. *Color-Independent Status Badges:* Clear `Cleared`, `Pending`, and `Action Required` labels paired with distinct icons.
  2. *Digital QR Display:* Clean high-contrast QR container for station sign-offs.
  3. *Station List:* Structured checklist across campus offices.

#### Slide 13: Digital Wireframes — Screen 2: Officer Verification View
* **Screen Name:** Officer Sign-Off & Scanner View
* **Key Elements & User Benefits:**
  1. *QR Scan / Student Lookup:* Supports scanning or manual student lookup fallback.
  2. *Explicit Approval Control:* Clear approve/hold actions with timestamped audit logs.

#### Slide 14: Core System Flow
* **User Flow:** Student logs in -> views checkpoint checklist & QR code -> officer scans/looks up student -> confirms no holds -> approves checkpoint -> updated status persists on backend.

#### Slide 15: Usability & Edge-Case Refinements
* **Key Practical Improvements Identified:**
  1. Pairing status colors with explicit text (`CLEARED`, `PENDING`, `ACTION REQUIRED`) prevents ambiguity.
  2. Including manual ID lookup alongside QR scanning avoids blockers if a phone camera or battery fails.

---

### Refining the Design (Slides 16 – 21)

#### Slide 16: Section Divider — Refining the Design
* Screen design
* Accessibility considerations

#### Slide 17: Design Refinement 1 — High-Contrast QR Display
* Rendered QR tokens inside a dedicated high-contrast light container so cameras can read codes cleanly regardless of theme.

#### Slide 18: Design Refinement 2 — Non-Color Status Communication
* Combined semantic status badges with clear words and distinct icons in alignment with WCAG 1.4.1 (Use of Color).

#### Slide 19: Key Screens
* **Screen 1 — Student Clearance Hub:** Checklist across department checkpoints.
* **Screen 2 — QR Token Card:** Dedicated QR view for officer verification.
* **Screen 3 — Officer Terminal:** Scan/search and approval actions.
* **Screen 4 — Approval History:** Timestamped verification record.

#### Slide 20: Live Deployment Notes
* **Live Deployment:** [https://check8-1.onrender.com](https://check8-1.onrender.com) (hosted on Render; protected by Cloudflare verification on automated loads).
* **Repository Context:** Core implementation led by Gian Karlo inside a groupmate-hosted repository.

#### Slide 21: Accessibility Considerations
1. **WCAG 1.4.1 Use of Color Compliance:** Status badges pair icons and text labels rather than relying on color dots alone.
2. **Comfortable Mobile Touch Targets:** Approval actions and tabs sized for reliable smartphone tapping.
3. **Clear Contrast & Reflow:** Readable text contrast and clean vertical stacking on narrow phone viewports.

---

### Going Forward (Slides 22 – 26)

#### Slide 22: Section Divider — Going Forward
* Takeaways & future improvements

#### Slide 23: Takeaways & Lessons Learned
* **What I Learned:** Leading implementation on Check8 strengthened my experience designing Express workflow state machines, handling team Git coordination in a shared repository, and prioritizing manual fallbacks alongside QR automation.
* *[Editable Note: Add real deployment usage metrics if collected after pilot testing.]*

#### Slide 24: Next Steps
1. **Printable PDF Clearance Export:** Allow cleared students to export a summary record.
2. **Officer Schedule Indicators:** Display checkpoint availability hours cleanly inside the UI.
3. **Direct Repository Cross-Link:** Add the group repository link once finalized for public portfolio display.

#### Slide 25: Let's Connect!
* **Email:** [giankarloreguindin811@gmail.com](mailto:giankarloreguindin811@gmail.com)
* **GitHub:** [https://github.com/Nykt04](https://github.com/Nykt04)
* **LinkedIn:** [https://www.linkedin.com/in/gian-karlo-reguindin-762712349/](https://www.linkedin.com/in/gian-karlo-reguindin-762712349/)

#### Slide 26: Thank You!
* *"Thank you for reviewing the Check8 Case Study!"*

---
---

# Case Study 3: CRHS Web

```
┌────────────────────────────────────────────────────────────────────────┐
│ SLIDE 01: TITLE SLIDE                                                  │
├────────────────────────────────────────────────────────────────────────┤
│ Title: CRHS Web — Accessible Institutional Community Portal            │
│ Subtitle: Designing an Equitable, Low-Bandwidth School Portal for      │
│           Castillejos Resettlement High School                         │
│ Author: Gian Karlo C. Reguindin                                        │
│ Program: 3rd Year BSCS · Gordon College                                │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Project Overview (Slides 02 – 04)

#### Slide 02: Project Overview — Product & Stack
* **The Product:** CRHS Web is a responsive, structured institutional web portal developed for the Castillejos Resettlement High School community (DepEd School ID `301016`) in Castillejos, Zambales. Hosted on Vercel (`https://crhs-web.vercel.app/home.html`), the site serves as the official public gateway for students, guardians, and faculty to access campus announcements, Junior High & ARAL academic programs, admissions guides, and school contacts.
* **Source Repository:** [https://github.com/Nykt04/CRHS_Web](https://github.com/Nykt04/CRHS_Web)
* **Target Users:** High school students, parents/guardians, prospective enrollees, and faculty members.
* **Preview of Designs:** School-branded responsive site featuring the CRHS crest, dark/light mode toggle, `Enroll Now` CTA, DepEd ARAL Program highlights, and multi-page navigation (`home.html`, `academics.html`, `admissions.html`, `faculty.html`, `contact.html`).

#### Slide 03: Project Overview — The Problem & The Goal
* **The Problem:** Important school announcements, enrollment steps, and schedules can easily get buried inside social media feeds and group chats, making it harder for parents and students on everyday mobile connections to verify official school information.
* **The Goal:** Create a fast, lightweight, semantic HTML/CSS/JS portal with high text contrast and clear page navigation that works smoothly across desktop and mobile devices.

#### Slide 04: Project Overview — My Role & Responsibilities
* **My Role:** Lead Frontend Developer, UI/UX Designer, Quality Assurance & Content Architecture.
* **Responsibilities:**
  * **UI/UX Designer:** Designed responsive layouts, visual hierarchy, color contrast, and theme toggle consistency tailored for students, guardians, and school staff.
  * **Lead Frontend Developer:** Built clean multi-page HTML5, modular CSS3 (Flexbox & Grid), and lightweight vanilla JavaScript without heavy framework bloat.
  * **Content Architecture:** Structured `home.html`, `academics.html`, `admissions.html`, `faculty.html`, `news.html`, and `contact.html` with clear semantic headings.
  * **Quality Assurance:** Reviewed responsive viewports, navigation links, image loading, and readable contrast across sections.

---

### Understanding the User (Slides 05 – 09)

#### Slide 05: Section Divider — Understanding the User
* Community access needs
* Illustrative target persona
* Problem statements
* User journey map

#### Slide 06: User Research & Problem Framing (Qualitative Focus)
* *[Editable Note: Add real parent/student feedback counts from Castillejos, Zambales if formally conducted.]*
* Designing for a public high school community in Castillejos, Zambales prioritized **mobile cellular reliability**, straightforward typography without tiny clutter, and direct access to admissions and faculty contact details without requiring logins.

#### Slide 07: Core Pain Points & Design Responses
1. **Pain Point 1 — Notices Buried in Social Feeds:** Schedule updates and memos are hard to verify in cluttered comment threads.  
   * *Design Impact:* Dedicated public announcements, news, and enrollment CTA sections right on the homepage.
2. **Pain Point 2 — Heavy Pages on Mobile Data:** Script-heavy portals slow down on budget phones and prepaid cellular plans.  
   * *Design Impact:* Built with clean static HTML5/CSS3/vanilla JS for fast initial rendering and low overhead.
3. **Pain Point 3 — Hard-to-Read Small Text & Hidden Menus:** Complex multi-level menus hinder quick scanning by parents and guardians.  
   * *Design Impact:* Prominent menu button, readable typography, clear action cards, and high contrast.
4. **Pain Point 4 — Difficulty Locating Admissions & Contact Info:** Families need a direct path to requirements and school contact details.  
   * *Design Impact:* Dedicated `admissions.html`, `academics.html`, and `contact.html` routes plus top header `Enroll Now` button.

#### Slide 08: Illustrative Target Persona — Elena Cruz & Aris Bautista

```
┌────────────────────────────────────────────────────────────────────────┐
│ ILLUSTRATIVE TARGET PERSONA: ELENA CRUZ (PARENT GUARDIAN)              │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Profile Context (Illustrative):  │ Illustrative Quote:                 │
│ • Role: High School Parent       │ "We shouldn’t have to dig through   │
│ • Location: Castillejos, Zambales│ dozens of unstructured social media │
│ • Device: Budget Android phone   │ group chats just to check exam      │
│   on prepaid mobile data         │ schedules and official school       │
│                                  │ policies."                          │
├──────────────────────────────────┼─────────────────────────────────────┤
│ Goals:                           │ Frustrations:                       │
│ • Check enrollment steps and     │ • Heavy pages draining mobile data. │
│   official school notices fast.  │ • Unofficial rumors mixed with real │
│ • Browse academic & ARAL info    │   school announcements on feeds.    │
│   without needing an account.    │ • Tiny low-contrast labels on small │
│ • Read comfortably on mobile.    │   smartphone screens.               │
├──────────────────────────────────┴─────────────────────────────────────┤
│ Problem Statement:                                                     │
│ A working parent needs a lightweight, clear school portal on her phone │
│ because social media feeds bury official admissions and school guides. │
└────────────────────────────────────────────────────────────────────────┘
```

#### Slide 09: User Journey Map

| Stage | 1. Arriving on Portal | 2. Checking Programs & Alerts | 3. Reading Admissions / Faculty | 4. Reaching School |
| :--- | :--- | :--- | :--- | :--- |
| **User Action** | Opens `crhs-web.vercel.app/home.html`. | Reads hero summary, DepEd School ID badge, and campus news. | Opens Menu -> `Academics` or `Admissions`. | Uses Contact page or `Enroll Now` guidance. |
| **User Feelings** | Looking for quick clarity without clutter. | Confident seeing official DepEd branding (`301016`). | Guided by clear page layout. | Reassured having direct verified instructions. |
| **Pain Points** | Slow page loads or popup overlays. | Unclear program names. | Deep buried navigation menus. | Outdated links or missing contact info. |
| **Opportunities** | Lightweight static HTML/CSS delivery. | Explicit Junior High & ARAL badges. | Simple flat mobile drawer menu. | Clear single-page contact/admissions references. |

---

### Starting the Design (Slides 10 – 15)

#### Slide 10: Section Divider — Starting the Design
* Layout structure
* Digital wireframes
* User flows

#### Slide 11: Page Structure & Wireframe Blueprints
* **Goals & Thought Process:** Organized the homepage cleanly around top utility navigation (`Menu`, dark-mode toggle, `Enroll Now`), DepEd badge (`DEPED PUBLIC HIGH SCHOOL • SCHOOL ID 301016`), bold school tagline, feature highlights (`DepEd Accredited`, `DepEd ARAL Program`, `ICT-Enhanced Learning`), campus imagery, and structured directory cards.

#### Slide 12: Digital Wireframes — Screen 1: Institutional Public Portal
* **Screen Name:** Institutional Public Portal (`crhs-web.vercel.app/home.html`)
* **Key Elements & User Benefits:**
  1. *Instant Institutional Identity:* School crest, Castillejos Resettlement High School header, and DepEd School ID `301016`.
  2. *Clear Primary Actions:* Direct `Enroll Now` and `Discover CRHS` actions right above the fold.
  3. *Theme Adaptability:* Built-in light/dark mode toggle for comfortable reading in any environment.

#### Slide 13: Digital Wireframes — Screen 2: Academics & Department Directory
* **Screen Name:** Academics & Department Directory (`crhs-web.vercel.app/academics.html`)
* **Key Elements & User Benefits:**
  1. *Clear Heading Hierarchy:* Semantic `h1` through `h3` headings organizing Junior High academic programs and ARAL remediation.
  2. *Direct Page Navigation:* Consistent top navigation bar linking to `admissions.html`, `faculty.html`, `news.html`, and `contact.html`.

#### Slide 14: User Flow Walkthrough
* **User Flow:** Visitor opens `home.html` -> reviews hero summary & programs -> taps `Menu` or `Enroll Now` -> explores `academics.html` or `admissions.html` -> reviews requirements and contact info cleanly on mobile or desktop.

#### Slide 15: Usability & Responsive Refinements
* **Key Design Decisions Applied:**
  1. Added explicit `"Menu"` text alongside the menu icon so navigation discovery is obvious to non-technical visitors.
  2. Grouped program highlights (`DepEd Accredited`, `DepEd ARAL Program`, `ICT-Enhanced Learning`) visually beneath the primary hero buttons for rapid scanning.

---

### Refining the Design (Slides 16 – 21)

#### Slide 16: Section Divider — Refining the Design
* Screen design
* Accessibility considerations

#### Slide 17: Mockup Refinement 1 — Mobile Navigation Clarity
* **Before:** Icon-only mobile toggles can be overlooked by less frequent web users.
* **After:** Clear high-contrast `"Menu"` button paired with a dedicated dark/light toggle and `"Enroll Now"` action.

#### Slide 18: Mockup Refinement 2 — Visual Branding & Readability
* Paired school green and crisp neutral typography over dark/light surfaces with real campus photography.

#### Slide 19: Key Screens
* **Screen 1 — Homepage & Hero Banner (`home.html`):** Castillejos Resettlement High School crest, DepEd School ID `301016`, primary CTAs, and campus photography.
* **Screen 2 — Faculty & Campus Directory (`faculty.html`):** Structured staff directory.
* **Screen 3 — Junior High Curriculum & ARAL Program (`academics.html`):** Overview of Junior High programs and ARAL remediation support.
* **Screen 4 — Admissions & Enrollment Guide (`admissions.html`):** Enrollment steps and student guidelines.

#### Slide 20: Live Deployment & Source
* **Live Deployment:** [https://crhs-web.vercel.app/home.html](https://crhs-web.vercel.app/home.html)
* **Source Code:** [https://github.com/Nykt04/CRHS_Web](https://github.com/Nykt04/CRHS_Web)
* **Stack:** Semantic HTML5, CSS3 (Flexbox & Grid), Vanilla JavaScript, Vercel.

#### Slide 21: Accessibility Considerations
1. **Readable Contrast & Theme Toggle:** Crisp contrast across both dark and light modes.
2. **Semantic Multi-Page Structure:** Proper landmarks, heading hierarchy, and descriptive link labels.
3. **Mobile-First Reflow:** Clean responsive grids that stack gracefully across phone, tablet, and desktop widths.

---

### Going Forward (Slides 22 – 26)

#### Slide 22: Section Divider — Going Forward
* Takeaways & next steps

#### Slide 23: Takeaways & Lessons Learned
* **What I Learned:** Building CRHS Web reinforced the value of clean semantic HTML and dependency-free CSS architecture when designing public-sector websites meant for everyday mobile connections.
* *[Editable Note: Run a formal Lighthouse / WAVE accessibility audit screenshot if needed as class evidence.]*

#### Slide 24: Next Steps
1. **Lightweight CMS Support:** Allow school administrators to update bulletins and news items without editing HTML files directly.
2. **Bilingual Support (Tagalog / English):** Offer clear localized notices for wider parent accessibility.
3. **Downloadable Forms Checklist:** Provide structured printable enrollment requirement sheets.

#### Slide 25: Let's Connect!
* **Email:** [giankarloreguindin811@gmail.com](mailto:giankarloreguindin811@gmail.com)
* **GitHub:** [https://github.com/Nykt04](https://github.com/Nykt04)
* **LinkedIn:** [https://www.linkedin.com/in/gian-karlo-reguindin-762712349/](https://www.linkedin.com/in/gian-karlo-reguindin-762712349/)

#### Slide 26: Thank You!
* *"Thank you for reviewing the CRHS Web Portal Case Study!"*
