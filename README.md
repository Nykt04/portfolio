# Gian Karlo Reguindin — Personal Portfolio

A responsive React + TypeScript portfolio, styled with Tailwind CSS and custom design tokens. Fonts are self-hosted; all icons are Lucide SVGs.

## Run locally

Requires Node.js 20.19+ or a compatible newer LTS release.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```sh
npm run build
npm run preview
```

## Personalize

Edit `src/portfolio.ts`. It holds your name, introduction, skills, roles, project, case study sections, and contact links.

### Project slider

The `projects` array at the bottom of `src/portfolio.ts` controls the project slider. The first entry reuses `portfolio.project` and keeps its existing featured case study. Three clearly labeled entries provide space for the other projects. Delete the object with `id: 'project-4'` to show three projects total. Edit each object's details individually. Every project supports a title, description, category, technologies, role, screenshot, screenshot alternative text, repository URL, live demo URL, and optional case study link.

The slider supports previous/next controls, project-name buttons, left/right and Home/End keys, and native horizontal touch/trackpad scrolling. It never advances automatically. Reduced-motion preferences make button navigation instant. Only the current slide's links are exposed to keyboard and assistive-technology navigation. Empty repository/demo URLs produce no broken links.

- Replace the project name, description, and technology list.
- Fill in each case study section using the class slide deck as your guide.
- Describe your individual contributions under each role.
- Put screenshots in `public/` and set `project.screenshot` to a path such as `/project-home.webp`. Write accurate alternative text in `project.screenshotAlt`.
- Replace the wireframe placeholder in `src/App.tsx` with your actual figures and descriptive captions.
- Add the reference deck URL in `project.reference`.
- Add your email to `contact.email`; the email link and copy button become active automatically.
- Add full HTTPS URLs for GitHub and LinkedIn. Empty URLs display “To be added” and do not create broken links.
- Add repository and live demo URLs when available. These buttons remain hidden until populated.
- Review all AI-assisted wording and personalize it before submitting.

The case study uses hash navigation (`#case-study`) so it works on static hosting without server rewrite rules. Native disclosure elements make contribution sections keyboard accessible.

## Design decisions to explain in class

### UI variables and animations

Customize `src/ui-tokens.css` to change the shared UI settings:

| Variables | Controls |
| --- | --- |
| `--ui-canvas`, `--ui-surface`, `--ui-ink`, `--ui-muted`, `--ui-accent` | Main colors |
| `--ui-font-body`, `--ui-font-display` | Font families |
| `--ui-content-width`, `--ui-page-gutter`, `--ui-section-space` | Layout spacing |
| `--ui-card-radius`, `--ui-control-radius` | Corner shapes |
| `--ui-motion-fast`, `--ui-motion-page`, `--ui-motion-reveal` | Hover, page entrance, and reveal durations |
| `--ui-motion-float`, `--ui-motion-orbit`, `--ui-float-distance` | Floating hero motion |

Keep duration values in milliseconds (for example `650ms`). Mobile variables are in the media queries at the bottom of that file. Verify contrast again after changing colors.

Motion includes gently floating hero icons and monogram, orbit movement, once-per-view content entrances, a sliding mobile menu, disclosure feedback, and small hover responses. `src/motion.css` defines the visual effects; `src/usePageMotion.ts` coordinates visibility and user preferences. The hero's pause button stops motion for the current session. It is omitted when the device already requests reduced motion. Decorative loops pause offscreen and when the browser tab is hidden. Content remains visible without animations. Native anchor scrolling stays under the visitor's control.

- Charcoal backgrounds reduce visual clutter; mint accents identify primary actions. A lighter contact section provides a clear ending.
- Space Grotesk gives headings a distinct identity; Manrope provides readable body text.
- A consistent navigation bar, descriptive links, and section anchors make the page easy to explore.
- Mobile layouts stack the content and expose a labeled navigation toggle. Escape closes the menu.
- A skip link, semantic landmarks, focus indicators, and native disclosure controls support keyboard users.
- Reduced-motion preferences disable the introductory motion and smooth scrolling.
- Bracketed placeholders clearly distinguish unfinished content from factual achievements.

## Deployment

The production files are in `dist/`. Upload the **contents** of that folder to your paid host's public web directory, or configure a static host with `npm run build` as its build command and `dist` as its publish directory. Enable HTTPS and connect your purchased domain using that provider's DNS instructions.

The Sites configuration is in `.openai/hosting.json`; it identifies this portfolio's hosted project. Do not replace its project ID when updating the same site.

## Before class submission

- [ ] Replace the project and case study placeholders with your real work.
- [ ] Add screenshots, captions, and the supplied reference deck.
- [ ] Add and test a working contact email and professional links.
- [ ] Test all repository, demo, and reference links.
- [ ] Check keyboard navigation, zoom, narrow layouts, and screen-reader output after adding content.
- [ ] Purchase an approved name-based domain and affordable paid hosting; compare registration, renewal, and hosting costs before committing.
- [ ] Verify public access, HTTPS, and the custom domain from a signed-out browser.
- [ ] Be ready to explain your code, design decisions, and individual project contributions.

This starter does not establish full WCAG conformance. Re-check accessibility with your final content and include assistive-technology testing. The paid domain/hosting requirement remains separate from a Sites preview or deployment.

### About photo and interactive toolkit

Place your portrait in `public/images/` and set `portfolio.portrait.src` in `src/portfolio.ts` to `/images/your-photo.jpg`. Update its alternative text there. An empty or broken path displays an honest placeholder. Tool names and descriptions also live in that file; brand SVGs come from Simple Icons.

Toolkit filters and tool buttons work with keyboard input. Scroll fades replay in either direction, and hovering the hero word “code” (or focusing a hero link) triggers a brief glitch. Motion respects the system reduced-motion preference and the existing pause control. Adjust motion and portrait variables in `src/motion.css`.
