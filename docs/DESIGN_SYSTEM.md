---
name: Deep Code
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#191c20'
  surface-container: '#1d2024'
  surface-container-high: '#272a2f'
  surface-container-highest: '#32353a'
  on-surface: '#e1e2e9'
  on-surface-variant: '#c2c6d2'
  inverse-surface: '#e1e2e9'
  inverse-on-surface: '#2e3035'
  outline: '#8c919c'
  outline-variant: '#424751'
  surface-tint: '#a4c9ff'
  primary: '#a4c9ff'
  on-primary: '#00315d'
  primary-container: '#185fa5'
  on-primary-container: '#c1d9ff'
  inverse-primary: '#1960a6'
  secondary: '#a1c9ff'
  on-secondary: '#00325a'
  secondary-container: '#006fc0'
  on-secondary-container: '#e9f0ff'
  tertiary: '#68dbae'
  on-tertiary: '#003827'
  tertiary-container: '#006b4d'
  on-tertiary-container: '#7aecbe'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#a1c9ff'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#004880'
  tertiary-fixed: '#86f8c9'
  tertiary-fixed-dim: '#68dbae'
  on-tertiary-fixed: '#002115'
  on-tertiary-fixed-variant: '#00513a'
  background: '#111318'
  on-background: '#e1e2e9'
  surface-variant: '#32353a'
typography:
  display:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
  code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 80px
---

## Brand & Style

This design system is built for a professional developer portfolio that balances high-intensity energy with technical precision. The brand personality is authoritative, "low-level," and highly focused, evoking the feeling of a sophisticated IDE or a high-end terminal environment.

The design style is **High-Contrast / Modern Brutalism**. It avoids the softness of contemporary SaaS trends in favor of sharp edges, flat surfaces, and pixel-precise execution. By utilizing a deep navy foundation with vibrant blue and teal accents, the UI creates a rhythmic, scan-friendly environment that highlights code snippets, project architecture, and technical expertise. No gradients or blurs are permitted; depth is achieved through color-blocking and structural borders.

## Colors

The palette is anchored by a high-contrast dark navy background (#042C53), providing a stable environment for luminous foreground elements. 

- **Primary & Secondary Blues:** Used for structural branding, primary actions, and interactive links. These shades maintain enough contrast against the background to ensure AA accessibility.
- **Teal Accents:** Reserved for "success" states, code syntax highlighting, and directional accents (like hover borders).
- **Text:** The primary body text is an off-white (#F1EFE8) to reduce eye strain compared to pure white. Muted text uses a desaturated blue-gray (#8BA8C3) to create a clear hierarchy.
- **Contrast:** All interactive elements must maintain a high contrast ratio. Do not use transparencies for text; use the specific muted hex values instead.

## Typography

The typography system uses a dual-font strategy to distinguish between "mechanical" data and "human" content.

- **Headlines and Labels:** JetBrains Mono provides a technical, monospaced aesthetic. It is used for all headings, navigation items, and UI labels to reinforce the developer identity. Use a tighter letter-spacing for large display sizes to maintain impact.
- **Body Text:** Hanken Grotesk is employed for long-form content, project descriptions, and blog posts. Its contemporary sans-serif letterforms ensure high readability and a professional tone.
- **Code Blocks:** Always use JetBrains Mono. Maintain a 14px base size for code to ensure line-height consistency with body text.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model on desktop and a **Fluid Grid** on mobile.

- **Grid:** A 12-column grid is used for desktop (max-width: 1280px). 
- **Rhythm:** Spacing is strictly based on 4px increments. Use `md` (24px) for standard component spacing and `xl` (64px) for section vertical padding.
- **Mobile:** Transition to a 4-column grid with 16px margins. 
- **Logic:** Elements should be pixel-aligned. Avoid "half-pixel" centering. Components like cards should use "compact" padding to maintain the precise, technical feel.

## Elevation & Depth

This system rejects shadows. Depth is communicated through **Tonal Layers** and **Bold Borders**.

- **Surface Levels:** The base background is the darkest layer (#042C53). Cards and containers use a slightly lighter "Surface" color (#063866) to appear closer to the user.
- **Borders:** Instead of shadows, use 1px or 2px solid borders in #185FA5 to define component boundaries. 
- **Hover States:** Depth is indicated by color shifts rather than physical elevation. On hover, a surface may change its border color to Teal (#1D9E75) or add a thick 4px left-border stroke to indicate focus.

## Shapes

The shape language is dominated by **Soft Geometry**. 

- **Containers:** Standard cards and input fields use a 0.25rem (4px) corner radius. This is enough to prevent the UI from feeling "aggressive" while maintaining a sharp, professional look.
- **Iconography:** Icons and brand marks are housed within "Rounded Squares" (0.5rem radius) to create a distinct, modular visual signature across the portfolio.
- **Buttons:** Follow the 4px roundedness rule. Do not use pill-shapes; they conflict with the monospace, grid-aligned aesthetic.

## Components

- **Buttons:** Solid #185FA5 background with #F1EFE8 text for primary actions. 2px solid border in #378ADD for secondary. No shadows. Sharp hover state: background shifts to #1D9E75.
- **Input Fields:** Dark navy background with a 1px solid #185FA5 border. On focus, the border changes to #5DCAA5 and a subtle 2px left-border accent is added.
- **Cards:** Use #063866 as the background. Include a 1px border. For "Project Cards," the title should be JetBrains Mono Bold with a Teal (#1D9E75) horizontal line (2px height, 24px width) directly underneath it.
- **Left-Border Accents:** Use for active navigation items and card hover states. A 4px solid #1D9E75 stroke on the left edge provides a "terminal-style" cursor hint.
- **Chips/Tags:** Small JetBrains Mono text. #042C53 background with a 1px border matching the accent color (e.g., Teal for "Vue.js", Blue for "TypeScript").
- **Lists:** Unordered lists should use a solid square bullet (4px) in Teal (#1D9E75) instead of standard circles.