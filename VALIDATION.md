# Validation Notes

## Portfolio & Case Studies Build Verification — November 2026

- **Production Build & Type-Check**: `npm run build` (`tsc -b && vite build`) passes with zero TypeScript or bundling errors.
- **Modular Source Architecture**:
  - `src/data/portfolio.ts` and `src/data/projects.ts` centralize personal data, skills, responsibilities, certifications, and case studies, backed by shared types in `src/types/portfolio.ts`.
  - `src/App.tsx` acts as a thin layout/routing shell composing `src/components/{common,navigation,sections,case-study,errors}/`, `src/hooks/`, `src/utils/`, and `src/styles/`.
- **Responsive Layout**:
  - Verified across mobile (`320px`–`390px`), tablet (`768px`), and desktop (`1024px`–`1440px`).
  - Hero metrics strip stacks on narrow phones (`grid-cols-1 sm:grid-cols-3`); User Journey Map renders as cards on mobile and a table on desktop; `overflow-x: clip` prevents unintended horizontal scrolling.
- **Navigation & Interactive Features**:
  - Hash routing (`#home`, `#work`, `#case-study?p=project-3`, `#about`, `#toolkit`, `#certifications`, `#github`, `#contact`) supports direct loads and page refreshes on static hosting.
  - `Alt+K` Quick Jump command palette, mobile navigation drawer, certificate preview dialog, and case study image lightboxes trap `Tab` focus, close on `Escape`, and restore focus to the triggering control.
  - Check8 displays a clear notice indicating that it is an exclusive internal system for Gordon College, College of Computer Studies.
  - ACE IT and CRHS Web link directly to their live Vercel deployments and public GitHub repositories.
- **Accessibility (WCAG 2.2 Level AA)**:
  - Calibrated light (`#fafafa` base / `#09090b` ink) and dark (`#121213` base / `#f7f6f3` ink) tokens in `src/styles/ui-tokens.css` satisfy 4.5:1+ normal text contrast.
  - All project screenshots, wireframes, before/after mockups, portraits, and certificates include descriptive `alt` text.
  - `prefers-reduced-motion: reduce` disables View Transition animations, entrance fades, and smooth scrolling.
