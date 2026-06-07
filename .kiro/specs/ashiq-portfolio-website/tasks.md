# Implementation Plan: Ashiq Portfolio Website — Gap Closure

## Overview

The portfolio uses a **multi-page architecture**: separate routes for `/about`, `/skills`, `/projects`,
and `/contact`. All section components, UI primitives, hooks, data layer, API route, and sub-pages are
complete. Every sub-page already includes `<Navbar />` and `<Footer />`.

This plan addresses the **remaining gaps** that prevent the portfolio from being fully accessible,
SEO-complete, and production-ready. Tasks are ordered by dependency.

No new component files are created unless strictly necessary. Every task names the exact file(s) to modify.

---

## Tasks

- [x] ~~Gap 1 — Assemble single-page scroll experience~~ **CANCELLED**
  - Architecture decision: multi-page structure retained. Each section lives on its own route.
  - `page.tsx` stays as Hero-only. Sub-pages handle all other sections.

- [x] ~~Gap 2 — Navbar hash-based scroll-spy~~ **CANCELLED**
  - Architecture decision: Navbar uses route-based `<Link>` components with `usePathname` active state.
  - This is correct for a multi-page app. No scroll-spy needed.

- [ ] 1. Install test tooling (prerequisite for all PBT tasks)
  - [ ] 1.1 Install vitest, jsdom, @testing-library/react, @testing-library/jest-dom, and fast-check
    - Run: `npm install --save-dev vitest@^3 @vitest/coverage-v8@^3 jsdom@^26 @testing-library/react@^16 @testing-library/jest-dom@^6 fast-check@^3`
    - Add a `vitest.config.ts` at the repo root:
      ```ts
      import { defineConfig } from 'vitest/config';
      import react from '@vitejs/plugin-react';
      import tsconfigPaths from 'vite-tsconfig-paths';
      export default defineConfig({
        plugins: [react(), tsconfigPaths()],
        test: {
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          globals: true,
        },
      });
      ```
    - Also install: `npm install --save-dev @vitejs/plugin-react vite-tsconfig-paths`
    - Create `vitest.setup.ts` at repo root: `import '@testing-library/jest-dom';`
    - Add `"test": "vitest --run"` to the `scripts` block in `package.json`
    - _Requirements: (prerequisite — enables all property-based test sub-tasks)_

- [ ] 2. Gap 3 — Skip navigation link
  - [ ] 2.1 Add skip link to `src/app/layout.tsx` and `id="main-content"` to all pages
    - In `layout.tsx`, insert the following as the **first child of `<body>`**, before `{children}`:
      ```tsx
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:border focus:border-primary-container focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-primary"
      >
        Skip to main content
      </a>
      ```
    - Add `id="main-content"` to the `<main>` element in all five pages:
      `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/skills/page.tsx`,
      `src/app/projects/page.tsx`, `src/app/contact/page.tsx`
    - _Requirements: 14.8_

- [ ] 3. Gap 4 — Wire `aria-describedby` on form error states
  - [ ] 3.1 Add `aria-describedby` + matching `id` to `src/components/ui/Input.tsx`
    - After `const inputId = id ?? props.name;`, derive:
      `const errorId = error ? \`\${inputId}-error\` : undefined;`
    - Add `aria-describedby={errorId}` to the `<input>` element
    - Add `id={errorId}` to the error `<p>` element
    - Only set both attributes when `error` is truthy; do not emit empty `aria-describedby`
    - _Requirements: 14.7_
  - [ ] 3.2 Add `aria-describedby` + matching `id` to `src/components/ui/Textarea.tsx`
    - After `const textareaId = id ?? props.name;`, derive:
      `const errorId = error ? \`\${textareaId}-error\` : undefined;`
    - Add `aria-describedby={errorId}` to the `<textarea>` element
    - Add `id={errorId}` to the error `<p>` element
    - Only set both attributes when `error` is truthy; do not emit empty `aria-describedby`
    - _Requirements: 14.7_

- [ ] 4. Gap 5 — `og:image` metadata and placeholder image
  - [ ] 4.1 Create placeholder OG image at `public/images/og-image.png`
    - Create a 1200×630 PNG file at `public/images/og-image.png`
    - A solid dark fill (`#111318`) with centred text is acceptable as a placeholder
    - The path must exist for Next.js metadata to resolve it; replace with a designed image before launch
    - _Requirements: 12.2_
  - [ ] 4.2 Add `images` to `openGraph` and `twitter` metadata objects in `src/app/layout.tsx`
    - Inside the `openGraph` object, add:
      ```ts
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: `${siteInfo.name} — ${siteInfo.title}` }],
      ```
    - Inside the `twitter` object, add:
      ```ts
      images: ['/images/og-image.png'],
      ```
    - _Requirements: 12.2_

- [ ] 5. Gap 6 — Sitemap completeness
  - [ ] 5.1 Add all navigable routes to `src/app/sitemap.ts`
    - Replace the single-entry return with:
      ```ts
      return ["/", "/about", "/skills", "/projects", "/contact"].map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.8,
      }));
      ```
    - _Requirements: 12.3_

- [ ] 6. Gap 7 — MobileMenu focus trap
  - [ ] 6.1 Add focus trap and Escape-to-close to `src/components/layout/MobileMenu.tsx`
    - Add `useRef` and `useEffect` imports alongside existing `useState`
    - Remove `Link` and `usePathname` imports (not needed — MobileMenu already uses `<Link>` correctly
      for route-based navigation; keep `<Link>` as-is, only add the focus trap behavior)
    - Add `dropdownRef = useRef<HTMLDivElement>(null)` and attach to the dropdown `<div>`
    - Add a `useEffect` that fires when `isOpen` changes:
      ```ts
      if (!isOpen || !dropdownRef.current) return;
      const focusable = dropdownRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      first?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { setIsOpen(false); return; }
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
      ```
    - Keep `<Link>` components and `usePathname` active state logic unchanged
    - _Requirements: 14.3_

- [ ] 7. Checkpoint — verify before tests
  - Run `npm run build` and confirm it exits with code 0.
  - Manually verify: skip link appears on Tab from any page; mobile menu traps focus and closes on Escape;
    contact form error messages are announced by screen reader.
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Property-based tests — contact form validation (P1 + P2)
  - [ ]* 8.1 Write property test P1: validation rejects invalid inputs
    - File: `src/lib/validations/__tests__/contact.validation.test.ts`
    - Import `contactFormSchema` from `@/lib/validations/contact`
    - Use `fast-check` to generate objects violating at least one constraint:
      name < 2 or > 100 chars, invalid email, subject < 3 or > 200 chars, message < 10 or > 2000 chars
    - Assert `contactFormSchema.safeParse(input).success === false`
    - Tag: `// Feature: ashiq-portfolio-website, Property 1: validation rejects invalid inputs`
    - Minimum 100 runs
    - _Requirements: 10.6, 10.7, 10.8, 10.10, 10.11_
  - [ ]* 8.2 Write property test P2: validation accepts valid inputs
    - File: same `contact.validation.test.ts`
    - Generate valid objects (name 2–100, valid email, subject 3–200, message 10–2000)
    - Assert `contactFormSchema.safeParse(input).success === true` and data is unchanged
    - Tag: `// Feature: ashiq-portfolio-website, Property 2: validation accepts valid inputs`
    - Minimum 100 runs
    - _Requirements: 10.5, 10.9, 10.10_

- [ ] 9. Property-based tests — ProjectCard rendering (P4 + P5)
  - [ ]* 9.1 Write property test P4: ProjectCard renders all project data fields
    - File: `src/components/ui/__tests__/ProjectCard.test.tsx`
    - Generate arbitrary `Project` objects with non-empty name, description, techStack (1–8 items),
      valid status using `fc.record`
    - Render `<ProjectCard project={project} />` via `@testing-library/react`
    - Assert name in heading, description in body, every techStack item as a chip, status in badge
    - Tag: `// Feature: ashiq-portfolio-website, Property 4: ProjectCard renders all project data fields`
    - Minimum 100 runs
    - _Requirements: 9.2, 9.3, 9.4, 9.5_
  - [ ]* 9.2 Write property test P5: GitHub link respects nullable githubUrl
    - File: same `ProjectCard.test.tsx`
    - Use `fc.option(fc.webUrl(), { nil: null })` for `githubUrl`
    - Non-null: assert anchor `href` equals URL and has `target="_blank"`
    - Null: assert anchor `href` is `"#"` and has no `target`
    - Tag: `// Feature: ashiq-portfolio-website, Property 5: GitHub link respects nullable githubUrl`
    - Minimum 100 runs
    - _Requirements: 9.6_

- [ ] 10. Property-based tests — sitemap completeness (P8)
  - [ ]* 10.1 Write property test P8: sitemap includes all navigable routes
    - File: `src/app/__tests__/sitemap.test.ts`
    - Import the default export from `@/app/sitemap`
    - Assert every route in `["/", "/about", "/skills", "/projects", "/contact"]` appears as a URL
      in the returned array
    - Tag: `// Feature: ashiq-portfolio-website, Property 8: sitemap includes all navigable routes`
    - _Requirements: 12.3_

- [ ] 11. Property-based tests — aria-describedby on error (P11)
  - [ ]* 11.1 Write property test P11 for `Input`
    - File: `src/components/ui/__tests__/Input.test.tsx`
    - Use `fc.string({ minLength: 1 })` to generate non-empty error strings
    - Render `<Input label="Test" name="test-field" error={errorString} />`
    - Assert `<input aria-describedby>` value equals the `id` of the sibling error `<p>`
    - Assert no `aria-describedby` when `error` is undefined
    - Tag: `// Feature: ashiq-portfolio-website, Property 11: aria-describedby wired on Input error`
    - Minimum 100 runs
    - _Requirements: 14.7_
  - [ ]* 11.2 Write property test P11 for `Textarea`
    - File: `src/components/ui/__tests__/Textarea.test.tsx`
    - Mirror test 11.1 for `<Textarea label="Test" name="test-field" error={errorString} />`
    - Tag: `// Feature: ashiq-portfolio-website, Property 11: aria-describedby wired on Textarea error`
    - Minimum 100 runs
    - _Requirements: 14.7_

- [ ] 12. Final checkpoint — run full test suite
  - Run `npm test` (`vitest --run`) and confirm all property tests pass.
  - Run `npm run build` and confirm the build succeeds with no errors.
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked `*` are optional and can be skipped for a faster MVP delivery.
- Task 1 (test tooling) must complete before any `*` sub-task can run.
- Tasks 2, 3, 4, 5 are fully independent — do them in any order.
- Task 6 (focus trap) is independent of all others; it only adds a `useEffect` and `useRef` to MobileMenu
  without changing its existing `<Link>` / `usePathname` logic.
- The `og:image` PNG in task 4.1 is a placeholder — replace it with a designed image before launch.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "3.1", "3.2", "4.1", "5.1", "6.1"] },
    { "id": 1, "tasks": ["4.2"] },
    { "id": 2, "tasks": ["8.1", "8.2", "9.1", "9.2", "10.1", "11.1", "11.2"] }
  ]
}
```
