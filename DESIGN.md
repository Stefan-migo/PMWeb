# PajaroMacaWeb — Design System

## Visual Theme & Atmosphere

This is a **dual-identity** site with two distinct visual personalities:

**Tattoo Section** — Dark, bold, high-contrast. The tattoo side should feel edgy and professional, like walking into a reputable tattoo studio. Dark backgrounds make the tattoo photography pop.

**Art Section** — Light, minimal, gallery-like. The art side should feel like a curated gallery space — clean walls, generous whitespace, letting the artwork breathe.

Both share the same base spacing system, border radius, and shadow tokens.

---

## Color Palette

### Tattoo Section (Dark Theme)
| Token | Hex | Role |
|-------|-----|------|
| `--tattoo-bg` | `#0a0a0a` | Page background (near-black) |
| `--tattoo-surface` | `#141414` | Card/surface background |
| `--tattoo-surface-hover` | `#1f1f1f` | Hover state for surfaces |
| `--tattoo-border` | `#2a2a2a` | Borders and dividers |
| `--tattoo-text` | `#f5f5f5` | Primary text (off-white) |
| `--tattoo-text-muted` | `#a3a3a3` | Secondary/muted text |
| `--tattoo-accent` | `#ef4444` | Accent (bold red — tattoo energy) |
| `--tattoo-accent-hover` | `#dc2626` | Accent hover |

### Art Section (Light Theme)
| Token | Hex | Role |
|-------|-----|------|
| `--art-bg` | `#fafaf9` | Page background (warm white) |
| `--art-surface` | `#ffffff` | Card/surface background |
| `--art-surface-hover` | `#f5f5f4` | Hover state for surfaces |
| `--art-border` | `#e7e5e4` | Borders and dividers |
| `--art-text` | `#1c1917` | Primary text (warm dark) |
| `--art-text-muted` | `#78716c` | Secondary/muted text |
| `--art-accent` | `#78716c` | Accent (muted earth tone) |
| `--art-accent-hover` | `#57534e` | Accent hover |

### Shared Tokens
| Token | Hex | Role |
|-------|-----|------|
| `--color-success` | `#059669` | Success states |
| `--color-warning` | `#D97706` | Warnings |
| `--color-error` | `#DC2626` | Errors, destructive actions |
| `--color-whatsapp` | `#25D366` | WhatsApp CTA button |

---

## Typography

### Tattoo Section
- **Display/Headings**: Space Grotesk (700) — bold, geometric, edgy
- **Body**: Inter (400) — clean, readable on dark backgrounds
- **Accent/Labels**: Space Grotesk (500) — uppercase tracking for nav items

### Art Section
- **Display/Headings**: Cormorant Garamond (600) — elegant serif, gallery feel
- **Body**: Inter (400) — clean, readable
- **Accent/Labels**: Inter (500) — subtle, refined

### Shared
| Element | Font | Weight | Size |
|---------|------|--------|------|
| Display | Space Grotesk / Cormorant Garamond | 700 | 2.5rem |
| H1 | Space Grotesk / Cormorant Garamond | 600 | 2rem |
| H2 | Space Grotesk / Cormorant Garamond | 600 | 1.5rem |
| H3 | Space Grotesk / Cormorant Garamond | 600 | 1.25rem |
| Body | Inter | 400 | 1rem |
| Small | Inter | 400 | 0.875rem |
| Code | JetBrains Mono | 400 | 0.875rem |

---

## Component Stylings

### Buttons
- **Primary (Tattoo)**: Red background (`--tattoo-accent`), white text, 8px radius, padding 0.625rem 1.25rem
- **Primary (Art)**: Dark background (`--art-text`), white text, 8px radius, padding 0.625rem 1.25rem
- **Secondary**: Transparent with border, 8px radius
- **WhatsApp**: Green (`--color-whatsapp`), white text, with WhatsApp icon
- **Hover**: Scale 1.02, shadow elevated
- **Active**: Scale 0.98
- **Transition**: 150ms ease-out

### Cards
- **Tattoo**: `--tattoo-surface`, 1px `--tattoo-border`, 12px radius, hover: border becomes `--tattoo-accent`
- **Art**: `--art-surface`, 1px `--art-border`, 8px radius, hover: subtle shadow
- **Image cards**: No border, image fills card, overlay on hover with title

### Inputs
- **Tattoo**: `--tattoo-surface` background, `--tattoo-border` border, 8px radius, 12px padding, focus ring 2px `--tattoo-accent`
- **Art**: `--art-surface` background, `--art-border` border, 8px radius, 12px padding, focus ring 2px `--art-text`
- **Labels**: Above input, small caps or uppercase, `--tattoo-text-muted` / `--art-text-muted`

### Navigation
- **Tattoo Nav**: Dark background, white text, hover underline in `--tattoo-accent`, active state with accent color
- **Art Nav**: Transparent or light background, dark text, hover underline in `--art-text`, active state with accent color
- **Mobile**: Hamburger menu, full-screen overlay

### Code Blocks
- Monospace, `--tattoo-surface` / `--art-surface-secondary` background, 14px, 16px padding, 8px radius

---

## Layout Principles

### Spacing Scale
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px

### Max Content Width
- **Tattoo**: 1280px (dark backgrounds hide edges, can go wider)
- **Art**: 1200px (gallery standard, more constrained)

### Grid
- 12-column flexible grid, 16px gap (desktop), 8px gap (mobile)

### Section Padding
- **Hero**: 96px top/bottom (desktop), 64px (mobile)
- **Content sections**: 64px top/bottom (desktop), 48px (mobile)
- **Cards grid**: 24px gap (desktop), 16px (mobile)

---

## Depth & Elevation

| Level | Shadow (Tattoo) | Shadow (Art) |
|-------|-----------------|--------------|
| Surface | none | none |
| Raised | `0 1px 3px rgba(0,0,0,0.4)` | `0 1px 3px rgba(0,0,0,0.08)` |
| Elevated | `0 4px 12px rgba(0,0,0,0.5)` | `0 4px 6px rgba(0,0,0,0.1)` |
| Overlay | `0 10px 25px rgba(0,0,0,0.6)` | `0 10px 15px rgba(0,0,0,0.15)` |

---

## Do's and Don'ts
- DO use semantic HTML and ARIA labels
- DO ensure minimum 4.5:1 text contrast
- DO NOT use emojis as icons — use SVG icons (Lucide)
- DO NOT remove focus outlines — ensure keyboard navigability
- DO NOT use bright neon colors for backgrounds
- DO use `cursor: pointer` on all clickable elements
- DO respect `prefers-reduced-motion`
- DO use distinct visual identities for each section — they should feel like two different "sites"

---

## Responsive Behavior

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile | < 640px | Single column, stacked nav, full-width cards |
| Tablet | 640-1024px | 2-column grid, collapsed sidebar |
| Desktop | > 1024px | Full layout, multi-column |

### Landing Page (Split Screen)
- **Desktop**: Two equal halves, side by side
- **Mobile**: Stacked vertically, tattoo section on top, art section below

---

## Image Strategy

### Gallery Grids
- **Tattoo**: Masonry or uniform grid with dark background — images pop against dark
- **Art**: Justified grid or masonry with light background — artwork is the focus

### Lightbox
- Dark overlay (rgba(0,0,0,0.95)) for both sections
- Close button top-right, navigation arrows on sides
- Image counter (1/12) bottom center

### Aspect Ratios
- Tattoo gallery: Mixed masonry (natural aspect ratios)
- Art gallery: Justified grid (consistent heights, varied widths)
- Hero images: 16:9 or 4:3
- Thumbnails: 1:1 square

---

## Animations

### Page Transitions
- **Tattoo**: Fade + slight scale (edgy feel)
- **Art**: Fade + subtle slide (elegant feel)

### Scroll Reveals
- Fade up on scroll (AOS or framer-motion)
- Staggered delay for grid items (50ms between)

### Hover States
- Image cards: Scale 1.03, shadow elevated
- Buttons: Scale 1.02, shadow elevated
- Nav links: Underline slides in from left

---

## Agent Prompt Guide
When generating UI, always reference this DESIGN.md for colors, spacing, typography, and component styles. Generate semantic HTML with Tailwind CSS classes. Use Lucide icons. Ensure responsive breakpoints. Include hover, focus, and active states. Always apply the correct theme (dark for tattoo, light for art) based on which route group the page belongs to.