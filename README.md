# Gian Karlo C. Reguindin — Portfolio

Personal portfolio and software engineering case studies for **Gian Karlo C. Reguindin** (3rd Year BSCS, Gordon College), built with React 19, TypeScript, Tailwind CSS v4, and Vite.

## Setup & Deployment

### Local Development

```bash
npm install
npm run dev
```

Opens locally at `http://127.0.0.1:5173/`.

### Production Build

```bash
npm run build
npm run preview
```

Type-checks with `tsc -b` and outputs static production assets into `dist/`.

### Hosting & Custom Domain Options (Before Publishing)

> Domain names below are candidates only—check live availability and ask for owner approval before purchasing anything. Pricing varies by registrar promo and currency rates; verify current checkout rates before registering.

| Provider / Role | Cost Summary | Notes |
| --- | --- | --- |
| **Vercel** (Static Hosting) | Free Hobby tier for personal/student sites | Instant Git deploys (`npm run build` -> `dist`) |
| **Cloudflare Pages** (Static Hosting) | Free tier with unlimited bandwidth | Fast global CDN; easy pairing with Cloudflare Registrar DNS |
| **Porkbun / Cloudflare Registrar** (`.com` or `.dev` domain) | Typically ~$10–$15/yr registration & renewal (at-cost on Cloudflare) | Candidate names: `gianreguindin.dev`, `giankarlo.dev`, `gianreguindin.com` (check availability first) |

## Documented Projects & Case Studies

All personal data, project entries, certifications, and links are centralized in [`src/data/portfolio.ts`](src/data/portfolio.ts) and [`src/data/projects.ts`](src/data/projects.ts):

1. **Check8** *(Flagship Case Study)* — Web-based QR clearance portal for Gordon College, College of Computer Studies students.
   - **Access Notice:** Check8 is an exclusive internal system developed for **Gordon College, College of Computer Studies** inside a private department/team repository.
2. **ACE IT** — Distraction-free study web app with AI flashcard generation and active recall ([Live Site](https://ace-it-ten.vercel.app/) · [Repository](https://github.com/Nykt04/_AceIt)).
3. **CRHS Web** — Lightweight public school portal for Castillejos Resettlement High School, DepEd ID `301016` ([Live Site](https://crhs-web.vercel.app/home.html) · [Repository](https://github.com/Nykt04/CRHS_Web)).

## Folder Structure

```text
src/
├── main.tsx                                    # React root mount + ./styles/styles.css
├── App.tsx                                     # Thin layout & routing shell
│
├── components/
│   ├── common/                                 # Reusable UI shared across sections & views
│   │   ├── AccessNoticeLink.tsx                # Dashed #403 restricted-system badge link
│   │   ├── ImageLightbox.tsx                   # Accessible enlarged-image modal (Case Study + Certs)
│   │   ├── Portrait.tsx                        # Theme-linked WebGL morphing portrait + fallback
│   │   ├── ProjectVisual.tsx                   # Screenshot / wireframe preview frame
│   │   ├── SectionHeader.tsx                   # Indexed section heading (01–06 & case studies)
│   │   ├── TechIcon.tsx                        # Brand SVG icon lookup with Code2 fallback
│   │   ├── ThemeSwitcher.tsx                   # System / Light / Dark segmented toggle
│   │   └── ZoomableImage.tsx                   # Click-to-enlarge image wrapper + "Enlarge" badge
│   │
│   ├── navigation/                             # Layout chrome & navigation controls
│   │   ├── Footer.tsx                          # Copyright, error-pages link, back-to-top
│   │   ├── Header.tsx                          # Sticky top telemetry bar + mobile menu trigger
│   │   ├── MobileDrawer.tsx                    # Mobile/tablet slide-out drawer wrapping SideNav
│   │   ├── QuickJumpModal.tsx                  # Alt+K / Cmd+K filterable command palette
│   │   └── SideNav.tsx                         # Shared vertical nav, case-study submenu & controls
│   │
│   ├── sections/                               # Individual home-page sections
│   │   ├── AboutSection.tsx                    # 02 Bio, academic background & project roles
│   │   ├── CertificationModal.tsx              # Accessible credential detail modal
│   │   ├── CertificationsSection.tsx           # 04 Verified credentials grid
│   │   ├── ContactSection.tsx                  # 06 Email mailto/clipboard copy & social links
│   │   ├── GitHubSection.tsx                   # 05 53-week halftone SVG contribution matrix
│   │   ├── HeroSection.tsx                     # 00 Hero, intro quote, CTAs, highlights & Portrait
│   │   ├── ProjectCard.tsx                     # Secondary project card
│   │   ├── ProjectsSection.tsx                 # 01 Flagship showcase & secondary projects grid
│   │   ├── ToolkitSection.tsx                  # 03 Project stack filter, languages & tools grid
│   │   └── WorkflowTabs.tsx                    # Keyboard-navigable workflow tablist & panel
│   │
│   ├── case-study/                             # Focused 5-section case study reader
│   │   ├── CaseStudyForward.tsx                # 05 Impact, lessons learned, next steps & links
│   │   ├── CaseStudyHeader.tsx                 # Project switcher, header, metadata & TOC bar
│   │   ├── CaseStudyOverview.tsx               # 01 Overview grid & expandable My Role
│   │   ├── CaseStudyRefiningDesign.tsx         # 04 Before/after mockups, screens & accessibility
│   │   ├── CaseStudyResearch.tsx               # 02 Research, pain points, persona & journey map
│   │   ├── CaseStudyStartingDesign.tsx         # 03 Wireframes, lo-fi prototype & usability rounds
│   │   ├── CaseStudyView.tsx                   # Case study composition shell & lightbox state
│   │   └── PersonaCard.tsx                     # Illustrative target persona profile card
│   │
│   └── errors/                                 # Custom HTTP error views & runtime boundary
│       ├── ErrorPageView.tsx                   # 404 / 403 / 500 / 503 custom editorial error page
│       └── PortfolioErrorBoundary.tsx          # React ErrorBoundary catching render exceptions
│
├── data/                                       # Centralized content & static config
│   ├── icons/
│   │   ├── designIcons.ts                      # Bundled Photoshop, Illustrator & Canva SVG paths
│   │   └── editorIcons.ts                      # Bundled VS Code & OpenAI SVG paths
│   ├── errors.ts                               # ERROR_CATALOG & ERROR_JUMP_ITEMS
│   ├── navigation.ts                           # Navigation links, section IDs & core skill logos
│   ├── portfolio.ts                            # Profile, skills, roles, contact & certs (re-exports projects/types)
│   ├── projects.ts                             # Full projects list, case studies & defaultFeaturedId
│   ├── techIcons.ts                            # Tech brand icon registry & language descriptions
│   └── workflow.ts                             # 4 engineering & UI/UX workflow phases
│
├── hooks/                                      # Reusable stateful hooks
│   ├── useActiveSection.ts                     # IntersectionObserver scroll-spy
│   ├── useGitHubContributions.ts               # Live GitHub contributions API + snapshot fallback
│   ├── useHashRoute.ts                         # Hash/path sync, View Transitions & document title
│   ├── useScrollReveal.ts                      # Reduced-motion-aware scroll fade-in observer
│   └── useTheme.ts                             # Shared theme preference & dark-mode subscription
│
├── styles/                                     # Design tokens & global styles
│   ├── styles.css                              # Global styles, utilities & reduced-motion rules
│   └── ui-tokens.css                           # Light/dark semantic color, typography & spacing tokens
│
├── types/                                      # Shared TypeScript interfaces
│   └── portfolio.ts                            # Project, case study, certification & error types
│
└── utils/                                      # Pure utility functions
    ├── focusTrap.ts                            # Shared Tab focus-trap helper for dialogs & drawers
    ├── portraitShader.ts                       # WebGL morph shaders, compile/texture helpers & easing
    ├── projectStack.ts                         # Project-to-stack matching logic
    └── routeError.ts                           # Path, hash & project ID route validation
```

## Class Discussion Notes: Design, Accessibility & Tech Decisions

### 1. Visual System & Color Tokens

- Defined semantic CSS tokens in `src/styles/ui-tokens.css` supporting both **Crisp Off-White** light mode (`#fafafa` / `#ffffff`, `#09090b` ink, `#3f3f46` slate accent) and **Matte Black** dark mode (`#121213` / `#1a1a1c`, `#f7f6f3` ink, `#f2ede4` warm-cream accent).
- Calibrated muted text (`--g400` at `100 100 108` light / `150 150 158` dark) to satisfy **WCAG 2.2 AA** 4.5:1+ contrast rather than sacrificing readability for aesthetics.
- Unified typography on `Geist` across headings, prose, and technical indices, paired with Lucide and Simple Icons SVGs (zero emojis).

### 2. Accessibility (WCAG 2.2 Level AA)

- **Landmarks & Skip Link**: Semantic `<header>`, `<aside>`, `<main>`, `<section>`, `<article>`, and `<footer>` structure plus a keyboard-revealed `.skip-link` to `#main`.
- **Keyboard Operability & Focus Management**: Shared `trapTabKey` focus trapping and trigger focus restoration across the mobile drawer, `Alt+K` Quick Jump palette, credential modal, and shared `ImageLightbox`; workflow tabs implement `role="tablist"` with roving `tabIndex` and `ArrowLeft`/`ArrowRight` switching.
- **Motion & Sizing**: Theme circular reveal, entrance fades, and smooth scroll respect `prefers-reduced-motion: reduce`; primary/secondary action buttons enforce a 44px minimum height; status badges and links pair clear text labels with color/borders rather than relying on color alone.
