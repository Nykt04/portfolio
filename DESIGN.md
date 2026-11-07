---
name: "Gian Karlo Portfolio"
description: "An editorial student developer portfolio with charcoal surfaces and mint accents."
colors:
  canvas: "#111817"
  surface: "#18211f"
  ink: "#f1f3ec"
  muted: "#a7b3ae"
  accent: "#8de2c9"
  accent-hover: "#adf1dc"
  line: "#35413c"
  project-mint: "#c7d7cd"
  project-ink: "#283d32"
  contact-mint: "#c3dfd2"
  contact-ink: "#193529"
typography:
  display:
    fontFamily: "'Space Grotesk Variable', sans-serif"
    fontSize: "clamp(3.3rem, 5.25vw, 4.8rem)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-.04em"
  headline:
    fontFamily: "'Space Grotesk Variable', sans-serif"
    fontSize: "clamp(2.4rem, 4vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-.04em"
  title:
    fontFamily: "'Space Grotesk Variable', sans-serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.03em"
  body:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Manrope Variable', sans-serif"
    fontSize: ".75rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  tag: "3px"
  control: "4px"
  button: "5px"
  inset: "8px"
  card: "14px"
spacing:
  icon-gap: "8px"
  compact-gap: "12px"
  content-gap: "24px"
  wide-gap: "30px"
  section: "clamp(4.5rem, 9vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
  text-link:
    textColor: "{colors.ink}"
  navigation:
    textColor: "{colors.muted}"
  skill-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "9px 11px"
  featured-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
  project-visual:
    backgroundColor: "{colors.project-mint}"
    textColor: "{colors.project-ink}"
    padding: "28px"
---

# Design System: Gian Karlo Portfolio

## Overview

**Creative North Star: "The Editorial Developer Portfolio"**

An editorial developer portfolio built around generous dark space, geometric typography, and restrained mint accents. The implemented visual signature is the GK monogram inside an arched frame with fine elliptical outlines. These descriptions record the current code and the owner's portfolio brief; they are not answers to a separate brand interview.

Off-white reading text, muted supporting copy, and visible dividers establish hierarchy without shadows. Mint becomes a larger field in project imagery and contact, providing a clear change of pace. Components remain simple, readable, and responsive, with native links, buttons, and disclosure controls.

**Key Characteristics:**

- Charcoal and muted teal surfaces with off-white reading text.
- Space Grotesk headings paired with Manrope body copy.
- Geometric GK identity and clearly labeled project placeholders.
- Tonal depth, fine borders, restrained motion, and visible focus.

## Colors

The palette combines green-tinted charcoal neutrals with a clear teal-mint accent and softer mint panels. Frontmatter values are normative; descriptive names below explain their use.

### Primary

- **Clear Mint** (`accent`): primary actions, headline emphasis, icon accents, selection backgrounds, and dark-surface focus outlines.
- **Light Mint** (`accent-hover`): primary button hover feedback.

### Neutral

- **Charcoal Green** (`canvas`): the main page and sticky header.
- **Deep Teal Charcoal** (`surface`): about section, project card, mobile navigation, and case study notices.
- **Warm Off-white** (`ink`): primary reading text and headings.
- **Muted Sage Gray** (`muted`): supporting copy, metadata, and inactive navigation.
- **Forest Gray** (`line`): dividers and structural outlines.
- **Soft Project Mint** (`project-mint`) and **Project Forest Ink** (`project-ink`): the repeated project placeholder visual and hero thumbnail.
- **Contact Mint** (`contact-mint`) and **Contact Forest Ink** (`contact-ink`): the light contact field and its reading text.

The implementation also uses local green shades for secondary labels, borders, and decorative elliptical lines. They remain component details rather than a fabricated global color scale. Sidecar tonal ramps are derived preview aids, not additional production tokens.

**The Visible State Rule.** State must remain understandable without color alone: current navigation uses an underline on desktop, placeholders use explicit text, and open disclosures change their chevron direction.

## Typography

**Display Font:** Space Grotesk Variable, with sans-serif fallback.  
**Body Font:** Manrope Variable, with sans-serif fallback.

Both families are bundled through local Fontsource package imports. There is no separate monospace font. The geometric display face supplies personality while the body face keeps descriptions and labels quiet.

### Hierarchy

- **Display:** the frontmatter display role describes the desktop hero. Its short, two-line composition gives the introduction a clear focal point.
- **Headline:** section headings use the headline role, balanced wrapping, and normal sentence case.
- **Title:** featured project titles use the title role.
- **Body:** default text uses the body role. Introductory about copy increases to (1.2rem); most reading paragraphs stay within (65ch), with case section paragraphs allowing (70ch).
- **Label:** metadata generally uses the label role. Navigation and text actions use (.875rem); skill chips use (.8rem). Small uppercase art labels use (.13em) tracking.

At widths up to (760px), the hero uses `clamp(2.8rem, 7.6vw, 4.4rem)` with (1.13) line height. Up to (380px), it uses (2.45rem). Case study titles use `clamp(2.6rem, 6vw, 5rem)` with (1.1) line height.

## Layout

The desktop container is capped at (1200px), with total horizontal clearance of (96px). It changes to (64px) at widths up to (1000px), then (40px) at widths up to (760px). The minimum body width is (320px). Section spacing uses the fluid section token.

The desktop hero uses a (1.5:1) grid; about uses (1:1.12), and featured work uses (1.1:1). Mobile collapses these into one column. Responsibilities use four items in a row, two columns below (1000px), and one column below (380px). The case study has a sticky contents column beside the narrative, becoming a static contents block on mobile.

The header is (94px) tall on desktop and (78px) on mobile. Document scroll padding is (105px), and identified sections have (110px) scroll margin. Preserve these offsets when extending navigation. Below (760px), the hero project preview becomes its own full-width row.

## Elevation & Depth

The implementation uses no box shadows. Depth comes from the tonal difference between canvas and surface, inset project imagery, thin dividers, and the contrast of mint fields. Hover feedback uses small color changes and a primary-action lift of (2px).

**The Tonal Depth Rule.** Keep the existing canvas/surface separation and border hierarchy as the baseline for depth.

## Shapes

Controls use gently squared corners; image insets and cards use the larger radii in frontmatter. Thin borders define skills, disclosures, and navigation. Small circular arrow or image markers accompany content without becoming oversized action surfaces.

The signature silhouette is an arched monogram frame with near-square lower corners and two intersecting ellipses. It is a decorative identity element, not a functional widget. The GK letterform is rotated (-9deg) at rest.

## Components

### Buttons

Direct and restrained. Primary actions use Clear Mint against Charcoal Green, bold (.875rem) text, the button radius, and a minimum height of (54px). Hover changes the fill and lifts the element by (2px) over (180ms). Secondary buttons use the same dimensions with a thin divider-colored border. Text actions use a (44px) minimum height and an adjacent SVG arrow.

The shared focus indicator is a (2px) mint outline with (6px) offset and (3px) radius. Contact switches the outline to dark forest so it remains visible on the light field. Image links inside clipped project containers use an inset outline offset of (-5px).

### Chips

Skill chips are informational, with a thin green border, an SVG code icon, and a small mint square. They do not imply proficiency or interaction. Technology tags use a filled dark-green surface and the compact tag radius. Placeholder status tags pair an outline with explicit text.

### Cards / Containers

The featured card uses the surface token and card radius with clipped edges. The image is inset (15px) and uses the inset radius. Desktop content padding is (43px 39px 32px), tightening on smaller screens. The light project placeholder uses code punctuation, a category label, and a visible screenshot caption; it must remain distinguishable from real project evidence.

### Navigation

The work section presents projects in a horizontal, native scroll-snap carousel. Previous/next SVG buttons and a numbered row of project-name buttons expose the whole collection. The active name has a mint top rule; a counter makes position explicit. Slides retain the existing featured-card composition, with stacked imagery and copy on mobile. Muted blue-gray, olive-gray, and teal-mint image panels distinguish secondary project placeholders. Native smooth scrolling connects the slides; reduced-motion mode changes slides instantly. There is no autoplay. Inactive slides are inert, and a polite status announces selection. Left/right and Home/End keys are available within the section.

Native anchor links sit in a sticky, opaque header. Inactive links use muted text; hover and current location use reading text. Desktop current location adds a mint underline. Mobile uses a labeled (44px) menu button and a vertically stacked panel with a filled active row. React updates expanded state, focuses the first navigation link on opening, and returns focus to the toggle on Escape.

### Case Study Disclosures

Native `details` and `summary` expose role contributions. Thin separators and generous vertical padding define each row. An inline chevron rotates when open; supporting text sits beneath the summary. Keep keyboard operation and visible focus inherent in the native controls.

### Monogram & Motion

Motion update: `src/ui-tokens.css` now owns shared UI values, and `src/motion.css` applies interaction styles. The hero has three decorative Lucide icons, a 6-second floating cycle, and an 18-second orbit drift; these pause when offscreen or the document is hidden. An explicit pause control and the device reduced-motion preference disable motion. Visible-by-default section content receives a single entrance through the Web Animations API. Page-title entrances use 420ms, content entrances 650ms, and hover feedback 180ms. Native smooth anchor scrolling is retained; header offsets avoid stacking redundant gaps.

The arched GK visual retains its rotated resting pose when motion is disabled. Shared easing uses `cubic-bezier(.16, 1, .3, 1)` for arrivals and `cubic-bezier(.45, 0, .55, 1)` for floating loops. Reduced motion disables animations, transitions, and smooth scrolling.

### Contact

The light mint panel uses large display typography, forest reading text, and a directional SVG. Missing email and social details are visibly marked with text. A real email enables a native mail link and copy action with status feedback. No form or input component is present.

## Do's and Don'ts

### Do:

- **Do** use the extracted tokens as the baseline when extending the interface.
- **Do** retain visible labels for missing project imagery and contact details.
- **Do** pair Lucide SVG icons with readable text when meaning is unclear.
- **Do** preserve keyboard focus, reduced motion, and section offsets beneath sticky navigation.
- **Do** keep reading copy within the observed comfortable line lengths.

### Don't:

- **Don't** invent project screenshots, outcomes, personal achievements, or contact links.
- **Don't** replace SVG icons with emojis.
- **Don't** add scroll hijacking, custom cursors, or excessive animation.
- **Don't** turn informational skill chips into implied proficiency ratings.
- **Don't** obscure keyboard focus inside clipped visual containers.

---

Implementation sources: `src/styles.css`, `src/App.tsx`, and `src/main.tsx`. Product constraints: `PRODUCT.md` and the owner's pinned portfolio brief. This is an implementation inventory, not a claim of a completed WCAG conformance audit.


## Portfolio presence refinement
The hero leads with Gian Karlo's name and retains the mint monogram. About and Work use tighter spacing. Abstract browser-frame artwork is explicitly a preview placeholder. The interactive process section presents learning principles, not claimed project results. Selection uses weight and surface as well as color. Responsive styles live in src/presence.css.


## Graphic reference direction
User requested inspiration from Curtis Designr. The portfolio now uses oversized uppercase Space Grotesk, mint fields alternating with charcoal, square geometric frames, and staggered brand-icon tiles. It retains original personal content and does not reproduce the reference's experience claims or assets. Graphic tokens are in src/graphic.css: mint #b5efd5, ink #14291f, secondary text #355947. Toolkit controls expose pressed state, focus rings, and descriptive feedback. Mobile uses two columns without changing DOM order. Native scrolling, motion pause, and reduced motion remain supported.
