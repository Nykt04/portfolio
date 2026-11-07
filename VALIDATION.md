# Validation notes

## Motion and UI variables — 29 September 2026

- Production build and strict TypeScript compilation passed after the changes.
- Desktop (1440px) and mobile (390px) browser checks showed no document horizontal overflow.
- The test browser reports `prefers-reduced-motion: reduce`; floating animation computes to `none`, content remains visible, and device preferences are respected.
- Section navigation highlights Work at the correct destination, case-study navigation focuses main content, and the mobile menu still opens with focus on its first link and closes with Escape.
- Browser error/warning sample was empty.
- Shared color and duration tokens resolve correctly in the browser. Three decorative hero SVG icons render.
- Full-motion animation playback, pause/resume, and hidden-tab behavior are implemented but were not exercised under a motion-enabled browser preference. Recheck on a device with animations enabled.
- Design detector found four advisory color/radius documentation differences in the changed files, with no non-advisory findings.

## Project slider update — 29 September 2026

- Four editable project entries, including the original featured case study.
- Production build passed after the carousel implementation.
- Browser verified: next-project control, direct selection of project three, End to the final slide, Home back to the featured slide, and disabled-state feedback at the ends.
- Inactive slides have the native `inert` attribute; one active slide remains available.
- No document horizontal overflow in the inspected 1440px desktop and 390px mobile views. Native horizontal scrolling stays inside the project rail.
- Reduced-motion navigation uses instant scrolling, with no autoplay. Physical touch-device and screen-reader testing remain unperformed.
- Design detector reported advisory differences between literal CSS values and the documented token inventory, including existing typography sizes. This was not a WCAG audit.

Checked during implementation on 28 September 2026.

- Production build: `npm run build` passed, including strict TypeScript compilation.
- Dependency installation audit: no reported vulnerabilities at installation.
- Home: inspected full-page desktop (1440px) and mobile (390px) screenshots.
- Case study: inspected mobile (390px) screenshot and semantic content.
- Reflow: no document horizontal overflow at 1440px, 768px, 390px, or 320px in the browser checks. The added hero teaser was reconfirmed at 390px.
- Text contrast: a computed-style check of 64 rendered home text elements reported no failures against 4.5:1 normal-text / 3:1 large-text thresholds. This was a targeted contrast check, not a comprehensive accessibility audit.
- Mobile menu: opening transfers focus to the first navigation link; Escape closes the menu and restores focus to the toggle.
- Case study: links open the case study, contribution disclosure responds to Enter, and return navigation works.
- Skip link: moves focus to main content while retaining the case study view.
- Browser console: no warnings or errors in the inspected log sample.
- Impeccable design detector: returned no findings.
- Independent finish review: requested a featured-project preview in the home section; added a linked thumbnail teaser.

Not verified: full WCAG conformance, assistive-technology compatibility, every browser/device, a real email delivery flow, external project links, or final project content. Reduced motion is implemented with a CSS media query but has not been tested with an operating-system preference change.

Replace the intentional project/contact placeholders, then repeat content-specific accessibility and link checks before class submission. Paid domain registration and paid hosting purchase have not been completed.
