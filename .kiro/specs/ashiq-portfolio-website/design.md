# Design Document — Ashiq Portfolio Website

## Overview

This document describes the technical design of the Ashiq Portfolio Website as it is currently implemented. The site is a statically generated personal portfolio for Ashiq Alsinawi, built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion, hosted on Vercel.

The primary audiences are recruiters, hiring managers, software engineers, and freelance clients. The design goal is a high-contrast, professional appearance that reflects a software engineering identity — implemented as a "Modern Brutalism" aesthetic with dark backgrounds, monospace headings, teal accent colours, and solid borders in place of shadows or gradients.

### Current State Summary

The frontend is fully built. All section components, UI primitives, data layer, and the contact API are implemented and functional. There are eight known gaps that tasks.md will address:

1. `page.tsx` only renders `<Hero>` — the full single-page scroll experience is not yet assembled on the homepage.
2. `Navbar` uses local route-based `NAV_ITEMS` (`/about`, `/skills`, etc.) instead of the hash-based `NAV_ITEMS` from `constants.ts`. The scroll-spy hooks exist but are not wired into the Navbar.
3. Skip navigation link is missing from `layout.tsx`.
4. `Input.tsx` and `Textarea.tsx` do not wire `aria-describedby` on the input element when an error is present.
5. `layout.tsx` has Open Graph tags but no `og:image` entry, and `/public/images/og-image.png` does not exist.
6. `sitemap.ts` only lists the root URL; sub-pages `/about`, `/skills`, `/projects`, `/contact` are missing.
7. `MobileMenu.tsx` has no focus trap — Tab can escape the overlay to content behind it.
8. `ProjectCard.tsx` renders `href="#"` for null `githubUrl` — the link is navigable when it should be visually disabled.

---

## Architecture

### Style: Jamstack / Static Site Generation

The site follows a Jamstack pattern. All content pages are statically generated at build time by Next.js. No database or CMS is involved — all content lives in a single TypeScript data file. The only dynamic surface is a single serverless function (`POST /api/contact`) that proxies contact form submissions to the Resend email API.

```
┌─────────────────────────────────────────┐
│              Vercel Edge CDN            │
│  (serves pre-rendered HTML + JS + CSS)  │
└────────────────┬────────────────────────┘
                 │ static assets
     ┌───────────▼───────────┐
     │   Next.js App Router  │
     │   (SSG — build time)  │
     │                       │
     │  /            Hero    │
     │  /about       About + Education
     │  /skills      Skills + Tools   │
     │  /projects    WhyHireMe + Projects
     │  /contact     Contact          │
     └───────────┬───────────┘
                 │ POST /api/contact (serverless)
     ┌───────────▼───────────┐
     │    Resend Email API   │
     │  (ashiqenriquez@gmail)│
     └───────────────────────┘
```

### Rendering Strategy

- **All content pages** use Next.js SSG (static generation). No `getServerSideProps` or dynamic server rendering is used on any content page.
- **`POST /api/contact`** is a Next.js Route Handler that runs as a Vercel serverless function at request time.
- **`robots.ts` and `sitemap.ts`** use Next.js `MetadataRoute` — generated at build time.

### Page Structure

Each page follows an identical shell pattern:

```tsx
<>
  <Navbar />
  <main>
    <SectionA />
    <SectionB />   {/* some pages have two sections */}
  </main>
  <Footer />
</>
```

Current page-to-section mapping:

| Route | Sections rendered |
|---|---|
| `/` | `<Hero>` only |
| `/about` | `<About>`, `<Education>` |
| `/skills` | `<Skills>`, `<Tools>` |
| `/projects` | `<WhyHireMe>`, `<Projects>` |
| `/contact` | `<Contact>` |

### Technology Stack

| Package | Version | Role |
|---|---|---|
| `next` | ^16.2.7 | Framework, routing, SSG, Route Handlers |
| `react` | 19.2.4 | UI rendering |
| `typescript` | ^5 | Static typing |
| `tailwindcss` | ^4 | Utility-first CSS via `@theme` tokens |
| `framer-motion` | ^12.40.0 | Scroll-reveal and hero entrance animations |
| `react-hook-form` | ^7.77.0 | Contact form state + validation integration |
| `@hookform/resolvers` | ^5.4.0 | Zod adapter for react-hook-form |
| `zod` | ^4.4.3 | Schema validation (client + server) |
| `resend` | ^4.8.0 | Email delivery (contact form API) |
| `lucide-react` | ^1.17.0 | Icon library for UI components |
| `@vercel/analytics` | ^1.5.0 | Page-view and interaction analytics |

### Environment Variables

| Variable | Required at | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Runtime (serverless) | Authenticates calls to Resend API |
| `NEXT_PUBLIC_SITE_URL` | Build time + runtime | Canonical URL for metadata and sitemap |

`SITE_URL` in `constants.ts` resolves to `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"`.

---

## Components and Interfaces

### Component Tree

```
src/
├── app/
│   ├── layout.tsx                  Root layout: fonts, metadata, Vercel Analytics
│   ├── page.tsx                    / — renders <Hero> only (gap: needs all sections)
│   ├── globals.css                 CSS custom properties + Tailwind v4 @theme
│   ├── robots.ts                   robots.txt generation
│   ├── sitemap.ts                  sitemap.xml generation (gap: root URL only)
│   ├── about/page.tsx              /about — <About> + <Education>
│   ├── skills/page.tsx             /skills — <Skills> + <Tools>
│   ├── projects/page.tsx           /projects — <WhyHireMe> + <Projects>
│   ├── contact/page.tsx            /contact — <Contact>
│   └── api/contact/route.ts        POST /api/contact
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   └── SectionWrapper.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Education.tsx
│   │   ├── Skills.tsx
│   │   ├── Tools.tsx
│   │   ├── WhyHireMe.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Chip.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── ProjectCard.tsx
│       ├── ValueCard.tsx
│       ├── ToolIcon.tsx
│       ├── SectionHeading.tsx
│       ├── SocialLink.tsx
│       ├── StatusBadge.tsx
│       ├── ScrollReveal.tsx
│       ├── AnimatedContainer.tsx
│       └── BrandIcons.tsx
│
├── hooks/
│   ├── useScrollSpy.ts
│   ├── useSmoothScroll.ts
│   └── useMediaQuery.ts
│
├── lib/
│   ├── data.ts
│   ├── constants.ts
│   ├── utils.ts
│   └── validations/contact.ts
│
└── types/
    ├── index.ts
    ├── site.ts
    ├── skills.ts
    ├── project.ts
    └── contact.ts
```

### Layout Components

#### `Navbar`

```tsx
// Fixed top bar. height = 64px (h-16). z-index: 50.
// Classes: fixed inset-x-0 top-0 z-50 border-b border-primary-container bg-background
// Contains: logo link (→ /), desktop nav links, <MobileMenu>
// Active state: usePathname() compared against local NAV_ITEMS hrefs (/about, /skills, /projects, /contact)
// NOTE (gap): Uses a local NAV_ITEMS array with route hrefs, NOT the hash-based NAV_ITEMS from constants.ts
const NAV_ITEMS = [
  { label: "About",    href: "/about"    },
  { label: "Skills",   href: "/skills"   },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact"  },
];
// Active link style: border-l-4 border-tertiary text-tertiary
// Inactive link style: border-transparent text-on-surface-variant hover:text-primary
```

#### `MobileMenu`

```tsx
// Renders only on < md (< 768px).
// Toggle button: 40×40px, rounded, border-primary-container, aria-label toggles "Open menu"/"Close menu", aria-expanded.
// Dropdown: absolute, left-0 right-0, top-16, border-b border-primary-container, bg-background.
// Clicking a nav item: closes menu (setIsOpen(false)).
// NOTE (gap): No focus trap — keyboard Tab can escape the overlay.
```

#### `Footer`

```tsx
// border-t border-primary-container bg-surface
// Contents: copyright string ("© {year} {siteInfo.name}. All rights reserved.")
//           social links row (GitHub, LinkedIn, Email via <SocialLink>)
// Max-width: 1280px, px-4 md:px-20, py-8
```

#### `SectionWrapper`

```tsx
interface SectionWrapperProps {
  id: string;       // Section id attribute (used for anchor scroll targets)
  children: ReactNode;
  className?: string;
}
// Renders: <section id={id} className="scroll-mt-16 py-16 md:py-20 ...">
//            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-20">
// scroll-mt-16 = 64px top offset to compensate for fixed Navbar height
```

### Section Components

#### `Hero`

```tsx
// "use client" — uses framer-motion, useReducedMotion
// Section: id="hero", min-h-screen, pt-16, bg-background
// Background: subtle grid pattern via backgroundImage (CSS radial-gradient + linear-gradient)
//   NOT a Tailwind gradient — inline style only, rgba values very low opacity (~0.025–0.045)
// Layout: 2-column grid on lg (lg:grid-cols-2), single column below
// Left column — staggered slide-from-left Framer Motion animations (delays 0–0.6s):
//   "// available for hire" (font-mono text-sm text-[#1D9E75])
//   "Hey There," (font-sans text-3xl/4xl text-body-text)
//   h1: "I'm Ashiq Alsinawi" (font-mono text-4xl/5xl/6xl font-bold text-body-text)
//   "Aspiring Software Engineer" (font-mono text-sm uppercase tracking-[0.25em] text-[#1D9E75])
//   tagline (font-sans text-base/lg text-muted-text, max-w-lg)
//   CTA buttons: "View Projects" (href="/projects"), "Download Resume" (href=siteInfo.resumePath, target="_blank")
//   Social links row: siteInfo.socialLinks mapped to <SocialLink>
// Right column — slide-from-right animation:
//   <Image src="/images/myphoto.png" ...> with radial glow (rgba(29,158,117,0.15)) behind it
// Reduced motion: wraps animate in static divs instead of motion.div
// NOTE: "View Projects" links to "/projects" route, NOT "#projects" hash (gap: scroll behavior)
```

#### `About`

```tsx
// Server component (no "use client")
// Uses <SectionWrapper id="about">, <SectionHeading title="About" subtitle="Who I am...">, <ScrollRevealGroup>
// Layout: md:grid-cols-12
//   col-span-4: circular profile photo from "/images/photoedit.png"
//     — rounded-full, border-2 border-tertiary, object-cover object-[center_15%]
//   col-span-8: <Card> with two subsections:
//     h3 "Introduction" (font-mono text-base text-tertiary) + about.introduction
//     h3 "Career Goal"  (font-mono text-base text-tertiary) + about.careerGoals
```

#### `Education`

```tsx
// Server component
// Uses <SectionWrapper id="education">, <SectionHeading>, <ScrollRevealGroup>
// <Card className="max-w-3xl">:
//   Row: degree (font-mono text-lg font-bold text-body-text) | period (font-mono text-sm text-tertiary)
//        university (text-base text-primary) below degree
//   highlights list: bullet marker = 1px×1px bg-tertiary square, text-sm text-on-surface-variant
```

#### `Skills`

```tsx
// Server component
// Uses <SectionWrapper id="skills">, <SectionHeading>, <ScrollRevealGroup>
// Grid: grid-cols-1 gap-6 md:grid-cols-3
// For each skillGroup: <Card> with:
//   h3 group.label (font-mono text-base font-semibold text-body-text)
//   2px×1.5rem teal underline (h-0.5 w-6 bg-tertiary)
//   <Chip> per skill — variant "teal" if category==="database", else "blue"
```

#### `Tools`

```tsx
// Server component
// Uses <SectionWrapper id="tools">, <SectionHeading>, <ScrollRevealGroup>
// Grid: grid-cols-2 gap-4 sm:grid-cols-4
// For each tool: <ToolIcon tool={tool} />
```

#### `WhyHireMe`

```tsx
// Server component
// Uses <SectionWrapper id="why-hire-me">, <SectionHeading>, <ScrollRevealGroup>
// Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
// For each value: <ValueCard value={value} />
```

#### `Projects`

```tsx
// Server component
// Uses <SectionWrapper id="projects">, <SectionHeading>, <ScrollRevealGroup>
// Grid: grid-cols-1 gap-6 lg:grid-cols-3
// Iterates featuredProjects (from data.ts): <ProjectCard project={project} />
```

#### `Contact`

```tsx
// "use client" — uses react-hook-form, useState
// Uses <SectionWrapper id="contact">, <SectionHeading>, <ScrollRevealGroup>
// Grid: grid-cols-1 lg:grid-cols-12
//   lg:col-span-5: <Card> "Direct Contact" with mailto link + GitHub/LinkedIn social links
//   lg:col-span-7: <Card> with <form onSubmit={handleSubmit(onSubmit)}>
//     Fields: name, email, subject, message (all required)
//     Validation: zodResolver(contactFormSchema) via react-hook-form
//     Submit state: isSubmitting → "Sending..." + disabled button
//     Success: green status message (text-tertiary), form reset
//     Error: red status message (text-error), form NOT reset
// NOTE (gap): Input and Textarea do not wire aria-describedby to error paragraphs
```

### UI Primitive Components

#### `Button`

```tsx
type ButtonVariant = "primary" | "secondary" | "ghost";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;  // default: "primary"
  href?: string;            // if set, renders <a> instead of <button>
  external?: boolean;       // if true + href: target="_blank" rel="noopener noreferrer"
  download?: boolean;       // if true + href: adds download attribute
}
// variant styles:
//   primary:   bg-primary-container text-body-text border border-primary-container hover:bg-tertiary-hover
//   secondary: bg-transparent text-body-text border-2 border-secondary-border hover:bg-primary-container
//   ghost:     bg-transparent text-primary border border-outline-variant hover:border-tertiary hover:text-tertiary
// Always: rounded px-4 py-2.5 font-mono text-sm font-medium
```

#### `Card`

```tsx
interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;  // default: false
}
// Base: rounded border border-primary-container bg-surface-card p-6
// hoverable=true adds: transition-colors hover:border-tertiary hover:border-l-4 hover:border-l-tertiary
```

#### `Chip`

```tsx
type ChipVariant = "blue" | "teal";
interface ChipProps {
  label: string;
  variant?: ChipVariant;  // default: "blue"
}
// Base: rounded border bg-background px-2.5 py-1 font-mono text-xs font-medium
// blue: border-primary text-primary
// teal: border-tertiary text-tertiary
```

#### `Input`

```tsx
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
// id defaults to props.name if id not provided
// label: htmlFor={inputId}, font-mono text-sm font-medium text-on-surface-variant
// input: rounded border border-primary-container bg-background px-4 py-2.5 text-sm text-body-text
//        focus: border-tertiary-focus border-l-2 border-l-tertiary-focus
//        error state: border-error
// error: <p className="text-sm text-error">{error}</p>
// NOTE (gap): no aria-describedby on <input> referencing the error <p>
```

#### `Textarea`

```tsx
// Same structure as Input, but <textarea> with min-h-32 resize-y
// NOTE (gap): no aria-describedby on <textarea> referencing the error <p>
```

#### `ProjectCard`

```tsx
interface ProjectCardProps {
  project: Project;
}
// Uses <Card hoverable>
// screenshot: aspect-video, overflow-hidden, <Image fill objectCover>
// name: font-mono text-lg font-bold text-body-text + 2px teal underline bar
// StatusBadge floats top-right
// description: text-sm text-on-surface-variant
// techStack: row of <Chip> — "teal" variant if tech includes "SQL"/"MySQL", else "blue"
// keyChallenge: text-sm text-muted-text with "Challenge: " prefix in font-mono text-xs text-tertiary
// links row (mt-auto):
//   GitHub: href = project.githubUrl ?? "#"
//           if not "#": target="_blank" rel="noopener noreferrer"
//   Live Demo: href = project.liveUrl ?? "#"
//              if not "#": target="_blank" rel="noopener noreferrer"
// NOTE (gap): null githubUrl renders href="#" — not visually disabled
// NOTE: null liveUrl also renders href="#" — does not hide the link
```

#### `ValueCard`

```tsx
// <Card hoverable> with:
//   icon container: 40×40px rounded-lg border-primary-container bg-background text-tertiary
//   icon: Lucide icon mapped from value.icon string key
//   title: font-mono text-base font-semibold text-body-text
//   description: text-sm text-on-surface-variant
// iconMap: lightbulb → Lightbulb, package → Package, code-xml → CodeXml,
//          trending-up → TrendingUp, users → Users, graduation-cap → GraduationCap
```

#### `ToolIcon`

```tsx
// Container: rounded-lg border border-primary-container bg-surface p-4 hover:border-tertiary
// Icon wrapper: 48×48px rounded-lg border-outline-variant bg-background text-primary
// Label: font-mono text-xs font-medium text-on-surface-variant
// iconMap: code → Code, mouse-pointer → MousePointer, figma → Palette,
//          palette → Palette, image → Image, bot → Bot, search → Search, github → GitHubIcon (SVG)
```

#### `SectionHeading`

```tsx
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}
// h2: font-mono text-2xl md:text-[32px] font-bold text-body-text
// subtitle: mt-3 max-w-2xl text-base md:text-lg text-muted-text
// underline: mt-4 h-0.5 w-6 bg-tertiary (24px wide, 2px tall teal bar)
// Container: mb-10
```

#### `SocialLink`

```tsx
interface SocialLinkProps {
  platform: SocialPlatform;  // "github" | "linkedin" | "email"
  url: string;
  label: string;
}
// <a href={url} aria-label={label}> 40×40px rounded-lg border-primary-container bg-surface
//   hover: border-tertiary text-tertiary
// email platform: no target/rel; others: target="_blank" rel="noopener noreferrer"
// iconMap: github → GitHubIcon, linkedin → LinkedInIcon, email → Mail (lucide)
```

#### `StatusBadge`

```tsx
type ProjectStatus = "Completed" | "In Progress" | "Planning";
// Base: rounded border bg-background px-2.5 py-1 font-mono text-xs font-medium
// Completed:   border-tertiary text-tertiary
// In Progress: border-primary text-primary
// Planning:    border-outline text-on-surface-variant
```

#### `ScrollReveal` / `AnimatedContainer`

```tsx
// ScrollRevealGroup: motion.div with containerVariants (staggerChildren: 0.1s)
//   whileInView={{ once: true, margin: "-80px" }}
// ScrollRevealItem: motion.div with itemVariants
//   hidden: { opacity: 0, y: 24 }
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubic-bezier(0.25,0.1,0.25,1) } }
// Both: if useReducedMotion() → plain <div>, no animation
//
// AnimatedContainer: single whileInView item with configurable delay
//   hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }
//   Uses ANIMATION_DEFAULTS: duration=0.5, ease=[0.25,0.1,0.25,1]
```

#### `BrandIcons`

```tsx
// GitHubIcon(props: SVGProps): hand-coded SVG, stroke="currentColor", strokeWidth=2
// LinkedInIcon(props: SVGProps): hand-coded SVG, stroke="currentColor", strokeWidth=2
```

### Custom Hooks

#### `useScrollSpy(sectionIds: string[]): string`

```typescript
// Returns the id string of the currently active section.
// Implementation: creates one IntersectionObserver per section id.
// rootMargin: `-${NAVBAR_HEIGHT}px 0px -50% 0px` (64px top, 50% bottom — detects upper viewport only)
// threshold: [0, 0.25, 0.5, 0.75, 1]
// Active section: the visible entry with the highest intersectionRatio.
// NOTE (gap): hook is implemented but NOT wired into Navbar.
```

#### `useSmoothScroll(): { scrollTo: (sectionId: string) => void }`

```typescript
// Wraps scrollToSection utility. scrollTo is memoized with useCallback.
// NOTE (gap): hook is implemented but NOT wired into Navbar.
```

#### `useMediaQuery(query: string): boolean`

```typescript
// SSR-safe: initialises state to false, then sets actual match in useEffect.
// Attaches/removes MediaQueryList "change" event listener on cleanup.
```

---

## Data Models

All content is defined as static TypeScript constants in `src/lib/data.ts`. No external data fetching occurs at build time or runtime for content pages.

### `SiteInfo`

```typescript
interface SiteInfo {
  name: string;          // "Ashiq Alsinawi"
  title: string;         // "Aspiring Software Engineer"
  tagline: string;       // "Building scalable software solutions through clean code..."
  email: string;         // "ashiqenriquez@gmail.com"
  resumePath: string;    // "/resume.pdf"
  socialLinks: SocialLink[];
}

type SocialPlatform = "github" | "linkedin" | "email";

interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}
```

### `About`

```typescript
interface About {
  introduction: string;
  careerGoals: string;
  avatar: {
    src: string;   // "/images/ashiq.png" (data) vs "/images/photoedit.png" (About component hardcodes it)
    alt: string;   // "Ashiq Alsinawi — Aspiring Software Engineer"
  };
}
```

### `Education`

```typescript
interface Education {
  university: string;    // "Arellano University"
  degree: string;        // "Bachelor of Science in Computer Science"
  period: string;        // "2022 – 2026"
  highlights: string[];  // 4 items (1–4 required by requirements)
}
```

### `SkillGroup` / `Tool`

```typescript
type SkillCategory = "frontend" | "backend" | "database";

interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: string[];
}

interface Tool {
  name: string;
  icon: string;  // Lucide icon name key used in ToolIcon.iconMap
}
```

Current data:
- `skillGroups`: 3 entries — frontend (5 skills), backend (5 skills), database (3 skills)
- `tools`: 8 entries — VS Code, Cursor, GitHub, Figma, Canva, Photoshop, OpenAI, Perplexity

### `ValueProposition`

```typescript
interface ValueProposition {
  id: string;
  title: string;
  description: string;
  icon: string;  // key into ValueCard.iconMap
}
```

Current data: 6 entries — problem-solving, product-development, clean-code, process-improvement, team-collaboration, continuous-learning.

### `Project`

```typescript
type ProjectStatus = "Completed" | "In Progress" | "Planning";

interface Project {
  id: string;
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  status: ProjectStatus;
  keyChallenge: string;
  githubUrl: string | null;
  liveUrl: string | null;
  screenshot: {
    src: string;
    alt: string;
  };
  featured: boolean;
}
```

Current data: 3 projects, all `featured: true`, all `githubUrl: null`, all `liveUrl: null`.
`featuredProjects` is a derived constant: `projects.filter(p => p.featured)`.

### Contact Form

```typescript
// Zod schema (src/lib/validations/contact.ts):
const contactFormSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
});
type ContactFormSchema = z.infer<typeof contactFormSchema>;

// API response shape:
interface ContactApiResponse {
  success: boolean;
  message: string;
}
```

### Constants

```typescript
// src/lib/constants.ts
SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

NAV_ITEMS: NavItem[] = [
  { label: "About",       href: "#about",       sectionId: "about"       },
  { label: "Education",   href: "#education",   sectionId: "education"   },
  { label: "Skills",      href: "#skills",      sectionId: "skills"      },
  { label: "Tools",       href: "#tools",       sectionId: "tools"       },
  { label: "Why Hire Me", href: "#why-hire-me", sectionId: "why-hire-me" },
  { label: "Projects",    href: "#projects",    sectionId: "projects"    },
  { label: "Contact",     href: "#contact",     sectionId: "contact"     },
]

SECTION_IDS = NAV_ITEMS.map(item => item.sectionId)
NAVBAR_HEIGHT = 64
ANIMATION_DEFAULTS = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
RESEND_FROM_EMAIL = "onboarding@resend.dev"
RESEND_TO_EMAIL   = "ashiqenriquez@gmail.com"
```

### Design System Tokens

Defined in `src/app/globals.css` as CSS custom properties, mapped to Tailwind v4 `@theme inline`:

| Token | CSS variable | Value |
|---|---|---|
| `bg-background` | `--background` | `#111318` |
| `bg-surface` | `--surface` | `#1d2024` |
| `bg-surface-card` | `--surface-card` | `#1d2024` |
| `bg-surface-container-high` | `--surface-container-high` | `#272a2f` |
| `text-on-surface-variant` | `--on-surface-variant` | `#c2c6d2` |
| `border-outline` | `--outline` | `#8c919c` |
| `border-outline-variant` | `--outline-variant` | `#424751` |
| `text-primary` | `--primary` | `#a4c9ff` |
| `bg-primary-container` | `--primary-container` | `#185fa5` |
| `text-on-primary-container` | `--on-primary-container` | `#c1d9ff` |
| `text-tertiary` / `bg-tertiary` | `--tertiary` | `#68dbae` |
| `bg-tertiary-hover` | `--tertiary-hover` | `#1d9e75` |
| `border-tertiary-focus` | `--tertiary-focus` | `#5dcaa5` |
| `border-secondary-border` | `--secondary-border` | `#378add` |
| `text-muted-text` | `--muted-text` | `#8ba8c3` |
| `text-body-text` | `--body-text` | `#f1efe8` |
| `text-error` | `--error` | `#ffb4ab` |
| `--font-sans` | `--font-hanken` | Hanken Grotesk (Google Fonts) |
| `--font-mono` | `--font-jetbrains` | JetBrains Mono (Google Fonts) |
| `--radius-DEFAULT` | — | `0.25rem` (4px) |

### API: `POST /api/contact`

```
Request:
  Method: POST
  Content-Type: application/json
  Body: { name: string, email: string, subject: string, message: string }

Response (success):
  Status: 200
  Body: { success: true, message: "Message sent successfully." }

Response (validation failure):
  Status: 400
  Body: { success: false, message: "<first Zod issue message>" }

Response (missing RESEND_API_KEY):
  Status: 500
  Body: { success: false, message: "Email service is not configured. Please try again later." }

Response (Resend or unexpected error):
  Status: 500
  Body: { success: false, message: "Failed to send message. Please try again later." }
```

Email sent via Resend:
- `from`: `onboarding@resend.dev`
- `to`: `ashiqenriquez@gmail.com`
- `replyTo`: sender's email address
- `subject`: `"Portfolio Contact: {subject}"`
- `text`: plain-text body with name, email, subject, message

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature includes pure functions and data-driven rendering logic that are suitable for property-based testing. The applicable areas are the Zod contact validation schema, the data layer invariants, and the data-driven component rendering logic. Infrastructure concerns (Lighthouse scores, Vercel deployment, CSS token values), UI visual appearance, and the Resend integration are not suitable for PBT — they are covered by smoke tests, integration tests, or visual review.

After prework analysis and property reflection, redundant properties were consolidated. Properties 3 and 4 (project data rendering) were merged because testing name + description + techStack + status together provides more comprehensive coverage than four separate properties. Properties 6 and 7 (githubUrl / liveUrl conditional rendering) are kept separate because they test distinct nullable fields with different rendering behaviors (disabled state vs. no render).

### Property 1: Contact form validation rejects invalid inputs

*For any* object submitted to `contactFormSchema.safeParse()` that is missing a required field, has a name shorter than 2 or longer than 100 characters, has an invalid email format, has a subject shorter than 3 or longer than 200 characters, or has a message shorter than 10 or longer than 2000 characters, the result SHALL have `success: false` and include an error message.

**Validates: Requirements 10.6, 10.7, 10.8, 10.10, 10.11**

### Property 2: Contact form validation accepts valid inputs

*For any* object with a name (2–100 chars), a syntactically valid email address, a subject (3–200 chars), and a message (10–2000 chars), `contactFormSchema.safeParse()` SHALL return `{ success: true }` with the data unchanged.

**Validates: Requirements 10.5, 10.9, 10.10**

### Property 3: Featured project filtering is exact

*For any* projects array with any combination of `featured: true` and `featured: false` entries, `featuredProjects` SHALL equal exactly `projects.filter(p => p.featured)` — no more, no less.

**Validates: Requirements 9.1, 11.4**

### Property 4: Project card renders all project data fields

*For any* `Project` object from `featuredProjects`, the rendered `ProjectCard` SHALL display the project's `name` as a heading, `description` as body text, every item in `techStack` as a `Chip` component, and `status` as a `StatusBadge`.

**Validates: Requirements 9.2, 9.3, 9.4, 9.5**

### Property 5: GitHub link respects nullable githubUrl

*For any* `Project` where `githubUrl` is a non-null string, the rendered `ProjectCard` GitHub anchor SHALL have `href` equal to that URL and `target="_blank"`. *For any* `Project` where `githubUrl` is `null`, the anchor SHALL have `href="#"` and no `target` attribute.

**Validates: Requirements 9.6**

### Property 6: Live demo link respects nullable liveUrl

*For any* `Project` where `liveUrl` is a non-null string, the rendered `ProjectCard` SHALL include a live demo anchor with `href` equal to that URL. *For any* `Project` where `liveUrl` is `null`, the live demo anchor SHALL have `href="#"` and no `target` attribute.

**Validates: Requirements 9.7**

### Property 7: Social links always have non-empty aria-label

*For any* `SocialLink` entry in `siteInfo.socialLinks`, the rendered `SocialLink` component SHALL have an `aria-label` attribute equal to the `label` field, which SHALL be a non-empty string.

**Validates: Requirements 3.6, 14.2**

### Property 8: Sitemap includes all navigable routes

*For any* set of defined navigable routes (`/`, `/about`, `/skills`, `/projects`, `/contact`), each SHALL appear as a URL entry in the array returned by the `sitemap()` function.

**Validates: Requirements 12.3**

### Property 9: SITE_URL resolves with correct fallback

*For any* value of `NEXT_PUBLIC_SITE_URL` (present or absent), `SITE_URL` SHALL equal that environment variable value when set, or `"http://localhost:3000"` when absent.

**Validates: Requirements 12.5**

### Property 10: Education highlights satisfy data invariants

*For any* state of `education.highlights`, each item SHALL be a non-empty string of at most 200 characters, and the array length SHALL be between 1 and 4 inclusive.

**Validates: Requirements 5.4**

### Property 11: Input/Textarea error state wires aria-describedby

*For any* `Input` or `Textarea` rendered with a non-null `error` prop, the `<input>` or `<textarea>` element SHALL have an `aria-describedby` attribute whose value matches the `id` of the sibling error `<p>` element.

**Validates: Requirements 14.7**

---

## Error Handling

### Contact API (`POST /api/contact`)

The Route Handler follows a layered error strategy:

1. **JSON parse failure** — caught by the outer `try/catch`; returns HTTP 500 with generic message.
2. **Zod validation failure** — `contactFormSchema.safeParse()` returns `{ success: false }` synchronously; API returns HTTP 400 with the first Zod issue message.
3. **Missing `RESEND_API_KEY`** — checked before instantiating Resend; returns HTTP 500 with a "not configured" message.
4. **Resend SDK error** — `resend.emails.send()` throws or rejects; caught by outer `try/catch`; returns HTTP 500 with generic retry message.

No error details from Resend or the runtime are exposed to the client. The catch block discards the error value entirely.

### Contact Form (client)

`Contact.tsx` handles the fetch response as follows:

- `response.ok === false` → sets `submitStatus` to `{ type: "error", message: result.message }`. Form is NOT reset.
- Network error (fetch throws) → sets `submitStatus` to `{ type: "error", message: "Network error..." }`. Form is NOT reset.
- `response.ok === true` → sets `submitStatus` to `{ type: "success", ... }`, calls `reset()` to clear the form.

The `submitStatus` renders as a `<p role="status">` — green (`text-tertiary`) for success, red (`text-error`) for error.

### Image Loading

`ProjectCard` uses Next.js `<Image fill>` components. There is currently no `onError` handler or `fallback` prop — this is gap #8 in tasks.md context (screenshot fallback is a requirements item).

### Animation and Reduced Motion

Both `Hero` and `ScrollReveal`/`AnimatedContainer` check `useReducedMotion()` from Framer Motion. When `prefers-reduced-motion: reduce` is active, all animated wrappers are replaced with plain `<div>` elements. The `globals.css` also sets `scroll-behavior: auto` under `@media (prefers-reduced-motion: reduce)`.

### SSR / Hydration Safety

`useMediaQuery` initialises state to `false` and only reads `window.matchMedia` inside `useEffect`, preventing SSR hydration mismatches. `useScrollSpy` and `useSmoothScroll` both use `"use client"` directives and only access DOM APIs inside effects.

---

## Testing Strategy

### Applicability Assessment

This feature uses property-based testing where the code has pure functions or data-driven logic with meaningful input variation. PBT is **not applicable** for visual/CSS configuration, infrastructure (Vercel deployment, Lighthouse scores), or the Resend integration (external service).

### Property-Based Tests

**Library**: [fast-check](https://github.com/dubzzz/fast-check) for TypeScript/React projects.

**Configuration**: Minimum 100 runs per property test.

**Tag format**: `// Feature: ashiq-portfolio-website, Property {N}: {property_text}`

Each correctness property from the section above maps to exactly one property-based test:

| Property | Test file | What is generated |
|---|---|---|
| P1: Validation rejects invalid inputs | `contact.validation.test.ts` | arbitrary objects with at least one invalid field |
| P2: Validation accepts valid inputs | `contact.validation.test.ts` | valid ContactFormSchema objects |
| P3: Featured project filtering is exact | `data.projects.test.ts` | arrays of Project with random featured flags |
| P4: ProjectCard renders all data fields | `ProjectCard.test.tsx` | Project objects with arbitrary string fields |
| P5: GitHub link respects nullable githubUrl | `ProjectCard.test.tsx` | Project with fc.option(fc.webUrl()) for githubUrl |
| P6: Live demo link respects nullable liveUrl | `ProjectCard.test.tsx` | Project with fc.option(fc.webUrl()) for liveUrl |
| P7: Social links have non-empty aria-label | `SocialLink.test.tsx` | SocialLink objects with arbitrary label strings |
| P8: Sitemap includes all routes | `sitemap.test.ts` | fixed route set (no generation needed — assert presence) |
| P9: SITE_URL fallback | `constants.test.ts` | fc.option(fc.webUrl()) for env var value |
| P10: Education highlights invariants | `data.education.test.ts` | education.highlights as fixed data, assert invariants |
| P11: aria-describedby on error | `Input.test.tsx`, `Textarea.test.tsx` | arbitrary non-empty error strings |

### Unit / Example-Based Tests

Unit tests cover specific behaviour not amenable to PBT:

- **Navbar**: active link class applied for current pathname; hamburger renders below md breakpoint.
- **MobileMenu**: clicking a nav item closes the menu (`isOpen` becomes false).
- **Hero**: h1 contains "Ashiq Alsinawi"; "Download Resume" has `download` attribute; social links rendered.
- **About**: `about.introduction` and `about.careerGoals` text are present in rendered output.
- **Education**: university, degree, period text present; highlights render as list items.
- **Skills**: `skillGroups.length === 3`; exact Frontend/Backend/Database skill arrays match.
- **Tools**: `tools.length === 8`; each tool name present in rendered output.
- **WhyHireMe**: 6 `ValueCard` components rendered; all six `id` values present.
- **Contact form**: submit with empty name shows error; valid data dispatches fetch to `/api/contact`.
- **StatusBadge**: "Completed" → teal class; "In Progress" → primary class; "Planning" → outline class.
- **SectionWrapper**: renders `<section>` with correct `id`, `scroll-mt-16`, and `py-16` classes.
- **Button**: `href` + `external` → `<a target="_blank">`. `href` + `download` → `<a download>`.
- **API route**: mock Resend, assert 200 on valid body; assert 400 on missing field; assert 500 when `RESEND_API_KEY` is absent.

### Integration Tests

- **Contact API end-to-end**: POST to `/api/contact` with real Resend sandbox key; verify email received (or use Resend test mode).
- **Lighthouse CI**: run against `next build && next start` output; assert Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90, Best Practices ≥ 90.
- **Build smoke test**: `next build` completes without errors; all pages render to HTML without runtime errors.

### Accessibility Testing

Automated tooling (axe-core via `@axe-core/playwright` or `jest-axe`) should be run against:
- `/` (homepage)
- `/contact` (form interactions)
- Mobile menu open state

Manual testing with a screen reader (NVDA or VoiceOver) is required for full WCAG 2.1 AA verification, particularly for focus management, skip navigation, and form error announcements.
