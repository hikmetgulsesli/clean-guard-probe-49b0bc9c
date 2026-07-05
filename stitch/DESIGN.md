---
name: Technical Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1440px
---

## Brand & Style
The design system is engineered for "Clean Guard Probe," a utility-focused environment where clarity, reliability, and technical precision are paramount. The brand personality is clinical and authoritative, removing all decorative noise to facilitate rapid data synthesis and error-free operation. 

The aesthetic follows a **Modern Corporate** approach with a heavy lean toward **Functional Minimalism**. It prioritizes information density and structural integrity, using clear hierarchies and consistent logic to evoke a sense of professional-grade stability. The UI should feel like a high-precision instrument: calibrated, responsive, and uncompromisingly clear.

## Colors
The palette is grounded in a range of Slate Grays to provide a sophisticated, low-fatigue environment. 

- **Primary:** A deep Slate-900 used for core text, primary actions, and structural anchors.
- **Secondary:** Slate-500 for metadata, icons, and secondary information.
- **Neutral:** A systematic scale of grays from Slate-50 (backgrounds) to Slate-200 (borders).
- **Functional Status:** High-visibility markers for system states. Success Green, Warning Amber, Error Red, and Info Blue are used sparingly and exclusively for status communication to prevent visual clutter.

## Typography
Typography is treated as a functional tool. **Hanken Grotesk** provides a sharp, contemporary look for headers, while **Inter** ensures maximum legibility for body content and complex data tables. 

**JetBrains Mono** is introduced for labels, status chips, and numerical data to emphasize technical precision and ensure character alignment in dense readouts. Letter spacing is slightly increased for monospaced elements to enhance scanning speed at small sizes.

## Layout & Spacing
This design system utilizes a **Fixed Grid** on desktop (12-column) and a **Fluid Grid** on mobile (4-column). The spacing rhythm is based on a strict 4px baseline grid to maintain alignment in compact components.

Layouts should prioritize vertical density. Use 16px gutters to keep data points related but distinct. On large screens, content is centered within a 1440px container. Mobile layouts should collapse sidebars into a bottom-sheet or hamburger navigation to preserve screen real estate for data visualizations.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. This maintains a "flat" and professional aesthetic.

- **Level 0 (Base):** Slate-50 background.
- **Level 1 (Card/Container):** Pure White background with a 1px border (Slate-200).
- **Level 2 (Hover/Active):** A subtle, ultra-soft shadow (4px blur, 2% opacity) to indicate interactivity without breaking the technical silhouette.
- **Overlays:** Modals and menus use a slightly darker border (Slate-300) and a backdrop blur (4px) to separate from the underlying data.

## Shapes
Shapes are disciplined and "Soft" (0.25rem). This small radius provides a hint of modern refinement while maintaining the structured, grid-aligned look of a professional tool. Interactive elements like buttons and input fields use the standard 4px radius, while larger containers (like cards) may use 8px (rounded-lg) to frame internal content clearly.

## Components
- **Buttons:** Primary buttons are Slate-900 with white text. Secondary buttons are outlined with a 1px Slate-200 border. Transitions should be instant (150ms) to feel responsive.
- **Chips / Badges:** Used for status. These utilize the functional colors at 10% opacity with 100% opacity text for high legibility (e.g., Success Green text on a light green tint).
- **Lists & Tables:** The core of the system. Tables use 1px horizontal dividers (Slate-100), no vertical lines, and a Slate-50 header row. Hover states on rows use a subtle Slate-50 tint.
- **Input Fields:** Compact (32px-36px height) with a Slate-200 border. Focus state uses a 1px solid Primary Blue border with no outer glow.
- **Cards:** White background, 1px Slate-200 border, no shadow. Used to group related data points.
- **Data Visualizations:** Charts should use the functional color palette for consistency. Line weights should be thin (1.5px to 2px) to match the technical theme.