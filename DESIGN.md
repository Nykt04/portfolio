# Design System: Gian Karlo Portfolio

## Overview

**Creative Direction: "GK Editorial Cream & Gray Monochrome"**

An architectural, hairline-divided developer portfolio built around a calibrated Matte Black (`#121213`) dark foundation and Crisp Off-White (`#fafafa`) light foundation, warm-cream/slate-gray monochrome accents, and a subtle halftone blueprint backdrop.

## Color Tokens (`src/ui-tokens.css`)

- **Dark Mode (`html.dark`)**:
  - `--bg`: `18 18 19` (`#121213` Matte Black Foundation)
  - `--surface`: `26 26 28` (`#1a1a1c` Elevated Matte Surface)
  - `--ink`: `247 246 243` (`#f7f6f3` Crisp Soft Off-White)
  - `--accent`: `242 237 228` (`#f2ede4` Warm Cream White Accent)
  - `--g400` / `--g500`: `150 150 158` / `164 164 170` (Calibrated for WCAG 2.2 AA 4.5:1+ contrast)
- **Light Mode (`:root`)**:
  - `--bg`: `250 250 250` (`#fafafa` Crisp Off-White Base)
  - `--surface`: `255 255 255` (`#ffffff` Pure Elevated Surface)
  - `--ink`: `9 9 11` (`#09090b` Deep Pitch Black)
  - `--accent`: `63 63 70` (`#3f3f46` Refined Slate Gray Accent)
  - `--g400` / `--g500`: `100 100 108` / `113 113 122` (Calibrated for WCAG 2.2 AA 4.5:1+ contrast)

## Typography & Iconography

- **Typeface**: Unified `Geist` font stack across display headings, body prose (`max-w-prose`), and technical indices.
- **Icons**: Consistent SVG icons via `lucide-react` and brand marks via `simple-icons`. Zero emojis.

## Layout & Navigation

- **Desktop (`>=1024px`)**: Sticky top telemetry bar (`lg:mr-64`) paired with an always-open right navigation rail (`lg:w-64`) featuring numbered indices (`00–06`), an expandable `Case Study` project submenu, `Alt+K` Jump Search trigger, theme switcher (`System`, `Light`, `Dark`), and direct contact links.
- **Mobile / Tablet (`<1024px`)**: Labeled `Menu` button in the sticky header opening a focus-trapped slide-out drawer (`role="dialog"`, `aria-modal="true"`).
- **Buttons**: `.bryl-btn-primary` and `.bryl-btn-secondary` enforce a 44px minimum touch height (`min-height: 44px`) with visible `:focus-visible` 2px outlines.
