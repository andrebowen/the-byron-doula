# Stokke-Inspired Design System — site2

**Reference:** [stokke.com](https://www.stokke.com)  
**Implementation:** `site/public/css/site.css` — all public pages  
**Status:** Active on homepage + all secondary pages — mobile-first, desktop progressive enhancement

---

## Design principles

1. **Mobile-first** — design for phone, enhance at 768px+
2. **Editorial commerce** — full-bleed photography, restrained typography, pill CTAs
3. **Neutral + brand** — white + warm cream bands, charcoal ink, Stokke orange accent
4. **Full bleed** — heroes and images edge-to-edge; content breathes with padding
5. **iPhone carousels** — horizontal snap scroll, card peek, 16px gaps
6. **Inverted cards** — light sections use cream card boxes; cream sections use white cards (trust, testimonials)

---

## Colour

### Brand (Stokke Leap)

| Token | Hex | Use |
|-------|-----|-----|
| `--brand` | `#b65c02` | Primary CTA fill, stars, FAQ indicator |
| `--brand-hover` | `#a15202` | Button hover |
| `--brand-active` | `#d36902` | On-media / accent highlights |
| `--brand-light` | `#fff1e4` | Brand tint background |
| `--brand-text` | `#a15202` | Eyebrows, labels, active nav, stats numbers |
| `--brand-text-hover` | `#884502` | Link hover |
| `--brand-border` | `#b65c02` | Accent borders |

### Neutrals

| Token | Hex | Use |
|-------|-----|-----|
| `--ink` | `#0f0f0f` | Primary text |
| `--ink-soft` | `#3d3d3d` | Body copy |
| `--ink-muted` | `#767676` | Meta, captions |
| `--line` | `#e4e4e4` | Borders, dividers |
| `--line-subtle` | `rgba(0,0,0,0.1)` | Stokke subtle border |
| `--line-medium` | `rgba(0,0,0,0.16)` | Stokke medium border |
| `--surface` | `#ffffff` | Light section background |
| `--surface-subtle` | `#f9f8f5` | Alternating band A |
| `--surface-02` | `#f2f0eb` | Alternating band B |
| `--surface-03` | `#eee9e2` | Deeper cream band |
| `--menu-label` | `#a8a8a8` | Drawer section labels |
| `--menu-line` | `#eeeeee` | Drawer row dividers |

### Section rhythm (homepage)

| Section | Background | Cards |
|---------|------------|-------|
| Hero | Full-bleed image | — |
| Trust / stats | `#F9F8F5` | Cream boxes |
| About | `#F2F0EB` | — |
| Press / logos | `#F9F8F5` | — |
| Services | `#F2F0EB` | Carousel (image + text) |
| FAQ | `#F9F8F5` | — |
| Testimonials | `#F2F0EB` | White boxes |
| Contact | `#F9F8F5` | — |
| Footer | `#F2F0EB` | — |

---

## Typography

**Font:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Stokke Sans stand-in  
**Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`  
**Apple HIG reference:** [Domains/Notes/Design/apple-hig.md](../../../Domains/Notes/Design/apple-hig.md) — Dynamic Type scale, web translation, minimum-size rationale

| Token | Size | px @ 16px root | Use |
|-------|------|----------------|-----|
| `--text-xs` | `0.6875rem` | 11px | Labels, captions, carousel count |
| `--text-sm` | `0.8125rem` | 13px | Nav, buttons, FAQ, most body copy |
| `--text-base` | `1rem` | 16px | Body default, form inputs |
| `--text-md` | `1.125rem` | 18px | Hero subtext, contact subhead |
| `--text-lg` | `clamp(1.5rem, 5vw, 2rem)` | 24–32px | Section headings |
| `--text-xl` | `clamp(2.25rem, 9vw, 3.25rem)` | — | Large display |
| `--text-hero` | `clamp(2.5rem, 11vw, 4rem)` | — | Hero headline |

| Property | Value |
|----------|-------|
| Body line-height | `1.5` |
| Tight line-height | `1.08` (headlines) |
| Label tracking | `0.14em` uppercase |
| Body tracking | `0.015em` |
| Headline tracking | `-0.01em` |

---

## Spacing

| Token | Mobile | Desktop (768px+) |
|-------|--------|------------------|
| `--pad` | `1.25rem` (20px) | `2rem` |
| `--pad-lg` | `2rem` | `3rem` |
| `--gap` | `1.5rem` | — |
| `--gap-lg` | `3rem` | — |
| `--carousel-gap` | `1rem` (16px) | — |
| `--header-h` | `3.5rem` | — |

---

## Radius & motion (Stokke Leap scale)

| Token | Value | px @ 16px |
|-------|-------|-----------|
| `--radius-2xs` | `0.0625rem` | 1px |
| `--radius-xs` / `--radius-sm` | `0.25rem` | 4px |
| `--radius-md` | `0.375rem` | 6px |
| `--radius-m` | `0.75rem` | 12px |
| `--radius-lg` | `0.5rem` | 8px |
| `--radius-l` | `1rem` | 16px |
| `--radius-xl` | `1.5rem` | 24px |
| `--radius-4xl` | `2rem` | 32px |
| `--radius-pill` | `9999px` | Pills / circles |
| `--card-radius` | `var(--radius-m)` | Trust + testimonial cards |
| `--image-radius` | `var(--radius-lg)` · 8px | Product / carousel images |

| Border width | Value |
|--------------|-------|
| `--border-xs` | `0.5px` |
| `--border-sm` | `1px` |
| `--border-md` | `2px` |
| `--border-lg` | `4px` |

| Motion | Value |
|--------|-------|
| `--dur` | `0.35s` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |

---

## Components

### Label (eyebrow)
- `0.6875rem`, uppercase, `letter-spacing: 0.14em`, `--brand-text`
- On hero: `.label--light` → white at 78% opacity

### Buttons (pills)
Primary fill uses **Stokke orange** (`--brand`). Ghost outline inverts to brand on hover.

| Class | Style |
|-------|-------|
| `.btn` | Filled brand, white text → hover `--brand-hover` |
| `.btn--ghost` | Outline ink → hover filled brand |
| `.btn--light` | White fill on dark/hero contexts |
| `.btn--sm` | Compact header CTA |

### Link CTA
Brand text + underline tint — `.link-cta`

### Header (mobile)
- Grid: hamburger left · logo centred · spacer/close right
- Hamburger: Stokke 16×16 SVG
- Full-screen drawer: white, chevron rows, section labels

### Carousel
- Counter in `--brand-text`
- Product images: `--image-radius` (8px · Stokke `--leap-radii-s`)

### FAQ
- Active tab + slider indicator: brand
- Accordion icons: brand

### Contact form
- Focus underline: brand
- Submit: brand pill

### Testimonial card
- Avatar `5rem` (`--testimonial-avatar`)

### Press / logos
- 2-column × 3-row grid, grayscale 55%

---

## Files

| File | Role |
|------|------|
| `site/public/css/site.css` | Production stylesheet — homepage + all pages |
| `site/public/css/design-system.css` | Legacy reference (not linked on live pages) |
| `site/public/design-system.html` | Visual reference |
| `site/STOKKE-DESIGN-SYSTEM.md` | This document |

---

*Updated 2026-06-17 — Stokke Leap brand accent + radii extracted from stokke.com.*
