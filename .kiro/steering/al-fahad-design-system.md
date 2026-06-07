# Al-Fahad Contracting — Design System & Brand Identity

This document is the authoritative reference for all UI work on the Al-Fahad Contracting website. Every component, page, and redesign must comply with these rules.

---

## Brand Essence

Al-Fahad targets Saudi government entities and Tier-1 developers operating in high-end architectural facade engineering. The aesthetic is **Corporate Modern × Minimalist** — structural, prestigious, and precise. The emotional register is **stability, institutional trust, and engineering excellence**.

---

## Color Palette

### Tailwind Token Map (use these names in all HTML/JSX)

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#002868` | Nav active states, structural headers, main brand |
| `primary-container` | `#0A3D91` | Hover states, gradient endpoints |
| `on-primary` | `#ffffff` | Text on primary backgrounds |
| `secondary` | `#4B5D8E` | Supporting structural elements |
| `brand-gold` / `gold` | `#C8A75D` | CTAs ("اطلب عرض سعر"), accent lines under headings, iconography highlights — use sparingly |
| `surface` | `#FAF8FF` | Page background |
| `surface-container-lowest` | `#ffffff` | Cards, content canvas |
| `surface-container-low` | `#F3F3FB` | Alternating section backgrounds |
| `surface-container` | `#EEEDF5` | Subtle containers |
| `on-surface` | `#1A1B21` | Body text |
| `on-surface-variant` | `#434652` | Secondary text, labels |
| `outline-variant` | `#C4C6D3` | Borders, dividers |
| `outline` | `#747783` | Muted text, placeholders |
| `on-background` | `#1A1B21` (dark: `#1A1B21`) | Used as deep footer / dark section bg |
| `inverse-surface` | `#2F3036` | Dark overlay elements |
| `primary-fixed` | `#DAE2FF` | Light text on dark primary backgrounds |
| `primary-fixed-dim` | `#B1C5FF` | Subdued light text on dark backgrounds |

### Elevation Shadows
- Never use `shadow-black`. Use primary-blue tinted ambient shadows:
  ```css
  box-shadow: 0 20px 40px -10px rgba(10, 61, 145, 0.08);
  ```
- For floating/hover states: `hover:shadow-[0_20px_50px_rgba(0,40,104,0.3)]`
- Borders preferred over shadows for structural zones: `border border-outline-variant/50`

---

## Typography

Font: **IBM Plex Sans Arabic** — always load all weights 300–700 from Google Fonts.

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
```

### Type Scale (Tailwind tokens)

| Token | Size | Weight | Line Height |
|---|---|---|---|
| `text-display-lg` | 48px | 700 | 60px |
| `text-display-lg-mobile` | 32px | 700 | 40px |
| `text-headline-md` | 32px | 600 | 44px |
| `text-headline-sm` | 24px | 600 | 32px |
| `text-body-lg` | 18px | 400 | 28px |
| `text-body-md` | 16px | 400 | 24px |
| `text-label-bold` | 14px | 600 | 20px, tracking 0.02em |
| `text-caption` | 12px | 400 | 16px |

### Text Rules
- All layouts are **RTL-first** (`dir="rtl"` on `<html>`)
- Section eyebrow labels: `font-label-bold tracking-widest uppercase text-primary`
- Headlines anchor pages with bold weight and display sizes
- Body text uses generous leading (`leading-relaxed` or `leading-loose`)
- Email/phone/LTR data: wrap with `dir="ltr"` span

---

## Layout & Spacing

```
Container max-width: 1280px   → max-w-[1280px] or max-w-container-max
Horizontal gutter:  24px      → px-gutter
Section padding desktop: 120px → py-section-padding-desktop
Section padding mobile:   64px → py-section-padding-mobile
Base spacing unit:  8px
Min card padding: 32px (4 units)
```

- 12-column grid on desktop, single column on mobile
- "Luxury of Space" — every major section has 120px vertical breathing room
- Alternating section backgrounds: `bg-surface` / `bg-surface-container-low` / `bg-on-background` (dark)

---

## Shapes & Borders

```
Default radius: 0.125rem (2px)  → rounded or rounded-DEFAULT
Large radius:   0.25rem  (4px)  → rounded-lg  (buttons, inputs)
XL radius:      0.5rem   (8px)  → rounded-xl  (cards, carousels)
Full:           0.75rem  (12px) → rounded-full (pills)
```

- Use 45° angled cuts sparingly in decorative backgrounds (mimic steel beams)
- Structural borders: `border border-outline-variant` (1px, Slate-tinted)
- Do NOT use `rounded-2xl` or `rounded-3xl` — too casual for the brand

---

## Components

### Buttons
```html
<!-- Primary -->
<button class="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-bold hover:bg-primary-container transition-all active:scale-95">
  اطلب عرض سعر
</button>

<!-- CTA / Gold (contact / quote only) -->
<button class="bg-[#C8A75D] text-[#001947] px-8 py-3 rounded-lg font-label-bold">
  تواصل معنا
</button>

<!-- Ghost -->
<button class="border border-primary text-primary px-8 py-3 rounded-lg font-label-bold hover:bg-primary/5 transition-all">
  عرض المزيد
</button>
```

### Cards
- White background `bg-surface-container-lowest`
- 1px outline-variant border
- Imagery: full-bleed top, 16:9 aspect ratio
- Min padding: `p-8` (32px)
- Hover: `group-hover:border-primary transition-colors duration-500`

### Navigation (Fixed Header)
```html
<header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant px-gutter py-4">
```
- Active nav item: `text-primary` + bottom border `after:h-0.5 after:bg-primary`
- All nav items RTL: `flex-row-reverse`

### Form Inputs
```html
<input class="w-full bg-surface-container-lowest border border-outline-variant p-4 rounded-xl
              text-body-md transition-all
              focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" />
```
- Labels: `font-label-bold text-on-surface-variant mb-2`
- Group focus color change: `group-focus-within:text-primary`

### Footer (Dark)
```html
<footer class="bg-on-background text-outline-variant border-t border-white/5">
```
- Section headers: `text-white font-label-bold uppercase tracking-widest border-r-2 border-primary-fixed pr-4`
- Link hover: `hover:text-primary-fixed transition-colors`

### Section Eyebrow Pattern
```html
<span class="text-primary font-label-bold tracking-widest uppercase mb-4 block">النص التوضيحي</span>
<h2 class="font-headline-md text-headline-md mb-8">...</h2>
<div class="w-16 h-0.5 bg-[#C8A75D]"></div>  <!-- gold accent line -->
```

### Decorative Hero Gradient
```css
/* enterprise-gradient used on dark hero panels */
background: linear-gradient(135deg, #002868 0%, #0a3d91 100%);
```

### Glass / Backdrop Effects
```css
.glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
.glass-dark { background: rgba(10,61,145,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(10,61,145,0.05); }
```

---

## Iconography

Use **Material Symbols Outlined** exclusively:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<style>.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }</style>
<span class="material-symbols-outlined">icon_name</span>
```

- Default style: FILL=0, wght=300 (outlined, lightweight)
- Icon size in contact info / features: `text-3xl` or `text-4xl`
- Icon containers: `w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20`

---

## Animation & Interaction

### Scroll Reveal
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('opacity-100', 'translate-y-0');
      e.target.classList.remove('opacity-0', 'translate-y-10');
    }
  });
}, { threshold: 0.1 });
```
- Initial state: `opacity-0 translate-y-10 transition-all duration-700`
- Stagger with CSS custom property: `style="--i: 1"` → `transition-delay: calc(var(--i) * 0.1s)`

### Hover Transitions
- Default: `transition-all duration-300`
- Slow image reveal: `transition-transform duration-[2000ms]`
- Image hover: `grayscale group-hover:grayscale-0 transition-all duration-700`
- Button press: `active:scale-95` or `active:scale-[0.98]`

---

## Tailwind Config Boilerplate

Every HTML file must include this config block:

```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#002868",
        "primary-container": "#0a3d91",
        "on-primary": "#ffffff",
        "primary-fixed": "#dae2ff",
        "primary-fixed-dim": "#b1c5ff",
        "on-primary-fixed": "#001947",
        "on-primary-container": "#8dadff",
        "secondary": "#4b5d8e",
        "secondary-container": "#b6c8ff",
        "on-secondary": "#ffffff",
        "surface": "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3fb",
        "surface-container": "#eeedf5",
        "surface-container-high": "#e8e7ef",
        "surface-container-highest": "#e2e2e9",
        "on-surface": "#1a1b21",
        "on-surface-variant": "#434652",
        "on-background": "#1a1b21",
        "background": "#faf8ff",
        "outline": "#747783",
        "outline-variant": "#c4c6d3",
        "inverse-surface": "#2f3036",
        "inverse-on-surface": "#f1f0f8",
        "inverse-primary": "#b1c5ff",
        "surface-dim": "#dad9e1",
        "gold": "#C8A75D",
        "brand-gold": "#C8A75D"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "unit": "8px",
        "gutter": "24px",
        "section-padding-mobile": "64px",
        "section-padding-desktop": "120px",
        "container-max": "1280px"
      },
      fontFamily: {
        "display-lg": ["IBM Plex Sans Arabic"],
        "headline-md": ["IBM Plex Sans Arabic"],
        "headline-sm": ["IBM Plex Sans Arabic"],
        "body-lg": ["IBM Plex Sans Arabic"],
        "body-md": ["IBM Plex Sans Arabic"],
        "label-bold": ["IBM Plex Sans Arabic"],
        "caption": ["IBM Plex Sans Arabic"]
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "60px", fontWeight: "700" }],
        "display-lg-mobile": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "44px", fontWeight: "600" }],
        "headline-sm": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-bold": ["14px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "600" }],
        "caption": ["12px", { lineHeight: "16px", fontWeight: "400" }]
      }
    }
  }
}
</script>
```

---

## HTML Document Shell

```html
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>... | الفهد للمقاولات</title>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <!-- Config (see boilerplate above) -->
  <script id="tailwind-config">...</script>
  <style>
    body { font-family: 'IBM Plex Sans Arabic', sans-serif; background-color: #faf8ff; scroll-behavior: smooth; }
    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
  </style>
</head>
<body class="bg-background text-on-surface overflow-x-hidden">
  ...
</body>
</html>
```
