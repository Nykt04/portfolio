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

All personal data, project entries, certifications, and links are centralized in [`src/portfolio.ts`](src/portfolio.ts):

1. **Check8** *(Flagship Case Study)* — Web-based QR clearance portal for Gordon College, College of Computer Studies students.
   - **Access Notice:** Check8 is an exclusive internal system developed for **Gordon College, College of Computer Studies** inside a private department/team repository.
2. **ACE IT** — Distraction-free study web app with AI flashcard generation and active recall ([Live Site](https://ace-it-ten.vercel.app/) · [Repository](https://github.com/Nykt04/_AceIt)).
3. **CRHS Web** — Lightweight public school portal for Castillejos Resettlement High School, DepEd ID `301016` ([Live Site](https://crhs-web.vercel.app/home.html) · [Repository](https://github.com/Nykt04/CRHS_Web)).

## Source Structure

- [`src/portfolio.ts`](src/portfolio.ts) — Single source of truth for profile metadata, skills, responsibilities, certifications, and 5-stage UX/engineering case studies.
- [`src/App.tsx`](src/App.tsx) — Layout shell, sticky top telemetry header, persistent right sidebar / mobile drawer, quick jump command palette (`Alt+K`), hero, about, and stack sections.
- [`src/Projects.tsx`](src/Projects.tsx) — Flagship project showcase, department access notices, and secondary projects grid.
- [`src/CaseStudyView.tsx`](src/CaseStudyView.tsx) — 5-section case study reader (`Overview`, `Understanding the User`, `Starting the Design`, `Refining the Design`, `Going Forward`) with project switcher, TOC jump bar, and zoomable mockup lightbox.
- [`src/AboutExtras.tsx`](src/AboutExtras.tsx) — Theme-linked portrait (`portrait-light.jpg` / `portrait-dark.jpg`) and interactive project stack filter.
- [`src/Certifications.tsx`](src/Certifications.tsx) — Verified credentials grid with accessible dialog and zoomable certificate lightbox.
- [`src/ContactGitHub.tsx`](src/ContactGitHub.tsx) — Live GitHub 53-week contribution matrix (with offline snapshot fallback) and direct contact channels (`mailto:` + clipboard copy, GitHub, LinkedIn).
- [`src/ui-tokens.css`](src/ui-tokens.css) & [`src/styles.css`](src/styles.css) — Semantic light/dark design tokens, View Transition circular reveal, and reduced-motion rules.

## Class Discussion Notes: Design, Accessibility & Tech Decisions

### 1. Visual System & Color Tokens

- Defined semantic CSS tokens in `src/ui-tokens.css` supporting both **Crisp Off-White** light mode (`#fafafa` / `#ffffff`, `#09090b` ink, `#3f3f46` slate accent) and **Matte Black** dark mode (`#121213` / `#1a1a1c`, `#f7f6f3` ink, `#f2ede4` warm-cream accent).
- Calibrated muted text (`--g400` at `100 100 108` light / `150 150 158` dark) to satisfy **WCAG 2.2 AA** 4.5:1+ contrast rather than sacrificing readability for aesthetics.
- Unified typography on `Geist` across headings, prose, and technical indices, paired with Lucide and Simple Icons SVGs (zero emojis).

### 2. Accessibility (WCAG 2.2 Level AA)

- **Landmarks & Skip Link**: Semantic `<header>`, `<aside>`, `<main>`, `<section>`, `<article>`, and `<footer>` structure plus a keyboard-revealed `.skip-link` to `#main`.
- **Keyboard Operability & Focus Management**: Full `Tab`/`Shift+Tab` focus traps and trigger focus restoration across the mobile drawer, `Alt+K` Quick Jump palette, credential modal, and case study image lightbox; workflow tabs implement `role="tablist"` with roving `tabIndex` and `ArrowLeft`/`ArrowRight` switching.
- **Motion & Sizing**: Theme circular reveal, entrance fades, and smooth scroll respect `prefers-reduced-motion: reduce`; primary/secondary action buttons enforce a 44px minimum height; status badges and links pair clear text labels with color/borders rather than relying on color alone.
