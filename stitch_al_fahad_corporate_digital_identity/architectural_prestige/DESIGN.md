---
name: Architectural Prestige
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fb'
  surface-container: '#eeedf5'
  surface-container-high: '#e8e7ef'
  surface-container-highest: '#e2e2e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#434652'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f8'
  outline: '#747783'
  outline-variant: '#c4c6d3'
  surface-tint: '#345baf'
  primary: '#002868'
  on-primary: '#ffffff'
  primary-container: '#0a3d91'
  on-primary-container: '#8dadff'
  inverse-primary: '#b1c5ff'
  secondary: '#4b5d8e'
  on-secondary: '#ffffff'
  secondary-container: '#b6c8ff'
  on-secondary-container: '#405383'
  tertiary: '#521a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#762900'
  on-tertiary-container: '#ff9162'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001947'
  on-primary-fixed-variant: '#144296'
  secondary-fixed: '#dae2ff'
  secondary-fixed-dim: '#b3c5fd'
  on-secondary-fixed: '#011847'
  on-secondary-fixed-variant: '#334574'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb597'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7c2e04'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e2e2e9'
typography:
  display-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
  display-lg-mobile:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 44px
  headline-sm:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  caption:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  section-padding-desktop: 120px
  section-padding-mobile: 64px
---

## Brand & Style
The design system is engineered to reflect the precision and grandeur of high-end architectural facade engineering. It targets a sophisticated Saudi demographic including government entities and Tier-1 developers. The aesthetic is **Corporate Modern with a touch of Minimalism**, emphasizing structural integrity through heavy whitespace and a strict mathematical grid. The emotional response is one of stability, luxury, and unwavering professionalism.

**Visual Principles:**
- **RTL-First Architecture:** Every layout is constructed from right-to-left, ensuring natural eye-flow for Arabic speakers.
- **Architectural Symmetry:** Alignment is rigid and purposeful, mirroring the structural grids of glass and steel facades.
- **Selective Opulence:** Luxury is conveyed through generous negative space and precise gold accents rather than excessive decoration.

## Colors
The palette is rooted in a deep "Royal Blue" to establish institutional trust, supported by a "Deep Navy" for structural elements. "Premium Gold" is reserved strictly for high-value interactions and subtle branding highlights to maintain its impact.

- **Primary (#0A3D91):** Used for primary navigation, active states, and structural headers.
- **Secondary (#081F4D):** Used for deep footers, dark-mode sections, and high-contrast text.
- **Accent (#C8A75D):** Used for primary CTAs, underlines for key headings, and significant iconography.
- **Backgrounds:** The interface utilizes a "Soft Slate" (#F8FAFC) for container backgrounds to reduce glare, while "White" (#FFFFFF) is used for the main content canvas.

## Typography
This design system utilizes **IBM Plex Sans Arabic** for its technical precision and modern humanist qualities, which bridges the gap between engineering and elegance.

- **Alignment:** All text is Right-To-Left (RTL) by default. Paragraphs should use "Justify" only if the line length is sufficient, otherwise stick to Right Alignment.
- **Visual Hierarchy:** Headlines use a bold weight to anchor the page. Display sizes are significant to reflect the "large-scale" nature of contracting projects.
- **Line Height:** Generous leading is applied to body text to ensure maximum legibility in technical descriptions.

## Layout & Spacing
The layout uses a **Fixed Grid** system (12 columns) for desktop to maintain a prestigious, centered feel. On mobile, it transitions to a fluid single-column layout with high-impact margins.

- **Section Breathing Room:** Every major content block is separated by 120px of vertical space on desktop. This "Luxury of Space" prevents the UI from feeling cluttered or "cheap."
- **Grid Gutters:** 24px gutters provide a clear horizontal rhythm, reflecting the vertical mullions of a glass facade.
- **In-Component Spacing:** Use an 8px base unit. Internal card padding should never be less than 32px (4 units) to maintain the premium feel.

## Elevation & Depth
To reflect the flat, reflective nature of glass and steel, this design system avoids heavy, muddy shadows. Instead, it uses **Tonal Layers** and **Ultra-Soft Ambient Shadows**.

- **Surface Tiers:** Background is #F8FAFC. Cards and containers are #FFFFFF.
- **Shadows:** Use a 15% opacity Primary Blue tint for shadows rather than pure black. The blur should be high (30px+) and spread low to create a "floating" effect rather than a "lifted" one.
- **Borders:** Subtle 1px borders in a lightened Slate (#E2E8F0) are preferred over shadows for defining structural zones.

## Shapes
The shape language is **Soft (0.25rem)**. This choice strikes a balance between the sharp, technical edges of engineering blueprints and the approachability of a modern service provider.

- **Primary Elements:** Buttons and Input fields use a 4px (0.25rem) radius.
- **Large Containers:** Project cards and image carousels use an 8px (0.5rem) radius.
- **Geometric Motifs:** Use 45-degree angled cuts sparingly in decorative background elements to mimic architectural steel beams.

## Components
Consistent component styling reinforces the brand's reliability.

- **Buttons:**
    - *Primary:* Solid Royal Blue (#0A3D91) with White text. Bold weight.
    - *Secondary (CTA):* Solid Gold (#C8A75D) with Navy text. Used only for "Contact Us" or "Request Quote."
    - *Ghost:* Transparent with a Navy border.
- **Cards:** White background with a 1px Slate border. Imagery should be full-bleed at the top of the card with a 16:9 aspect ratio.
- **Input Fields:** Bottom-border only or very light outline. Label should be floating and use `label-bold` typography.
- **Status Chips:** Use high-contrast backgrounds with Primary Blue for "In Progress" and Gold for "Completed."
- **Project Progress Bar:** A thin 4px line using a Gold fill on a Navy background to track construction milestones.
- **Lists:** Use custom icons (e.g., stylized steel beams or glass facets) as bullets instead of standard dots.