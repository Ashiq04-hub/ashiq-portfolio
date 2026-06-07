# Requirements Document

## Introduction

This document specifies the requirements for the Ashiq Portfolio Website — a personal portfolio for Ashiq Alsinawi built with Next.js, TypeScript, and Tailwind CSS. The site is statically generated, deployed on Vercel, and structured across four implementation phases: Frontend UI, Backend contact API, Data/SEO layer, and Deployment. It targets recruiters, hiring managers, software engineers, and freelance clients who need to evaluate Ashiq's skills, projects, and professional background.

---

## Glossary

- **Portfolio_Site**: The complete Next.js application representing the portfolio website.
- **Navbar**: The sticky top navigation bar component.
- **Hero_Section**: The first full-viewport section introducing the owner's name, title, and calls to action.
- **About_Section**: The section containing the personal bio, career goals, and professional photo.
- **Education_Section**: The section displaying university, degree, study period, and academic highlights.
- **Skills_Section**: The section rendering skill chips grouped by category (Frontend, Backend, Database).
- **Tools_Section**: The section displaying developer tool icons with labels.
- **WhyHireMe_Section**: The section presenting six value proposition cards.
- **Projects_Section**: The section rendering project cards for featured work.
- **Contact_Section**: The section containing the contact form and direct contact links.
- **Contact_API**: The serverless route at `POST /api/contact`.
- **Validator**: The Zod schema used for server-side request validation.
- **Email_Service**: The Resend API integration used to deliver contact form emails.
- **Data_Layer**: The static data file `src/lib/data.ts` that stores all site content.
- **Design_System**: The High-Contrast / Modern Brutalism visual language defined in `DESIGN_SYSTEM.md`.
- **Project_Card**: A UI component displaying a single project's name, description, tech stack, status, links, and screenshot.
- **Value_Card**: A UI component representing one of the six Why Hire Me propositions.
- **Skill_Chip**: A small tag component rendering a technology name with a monospace label and colored border.
- **Tool_Icon**: A component rendering a developer tool's logo and label.
- **Scroll_Spy**: The mechanism that tracks the currently visible section and updates the active nav item.
- **SEO_Layer**: The collection of Next.js metadata, Open Graph tags, sitemap, and robots.txt.
- **Lighthouse**: The Google auditing tool used to measure Performance, Accessibility, Best Practices, and SEO scores.

---

## Requirements

### Requirement 1: Design System Implementation

**User Story:** As a visitor, I want to experience a visually consistent, high-contrast interface, so that the site feels professional and reflects Ashiq's technical identity.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render all surfaces using the background color `#111318`.
2. THE Portfolio_Site SHALL use primary color `#a4c9ff` for primary actions and structural branding.
3. THE Portfolio_Site SHALL use tertiary/teal color `#68dbae` for hover borders, success states, and inline call-to-action link accents.
4. THE Portfolio_Site SHALL use `#e1e2e9` as the on-surface text color for all primary body text.
5. THE Portfolio_Site SHALL apply JetBrains Mono for all headings, navigation labels, button labels, form labels, and chip labels.
6. THE Portfolio_Site SHALL apply Hanken Grotesk for all body text and project descriptions.
7. THE Portfolio_Site SHALL use a 4px base spacing grid such that all layout spacing and component padding values are multiples of 4px.
8. THE Portfolio_Site SHALL apply 64px vertical padding to all top-level page sections, defined as `<section>` elements that are direct children of the page layout.
9. THE Portfolio_Site SHALL use solid borders instead of box shadows for all depth and elevation effects.
10. WHEN a card or navigation item receives hover or focus, THE Portfolio_Site SHALL apply a 4px solid `#68dbae` left-border accent, replacing the default left border on that element, with hover and focus receiving identical visual treatment.
11. THE Portfolio_Site SHALL apply no gradients or blur effects on any surface.
12. THE Portfolio_Site SHALL use 4px corner radius on all cards, buttons, and input fields.

---

### Requirement 2: Sticky Navigation with Scroll-Spy

**User Story:** As a visitor, I want a persistent navigation bar that highlights the current section, so that I can always orient myself and jump to any section quickly.

#### Acceptance Criteria

1. THE Navbar SHALL remain fixed to the top of the viewport during page scroll.
2. WHEN the user scrolls or the page loads, THE Scroll_Spy SHALL update the active navigation item to reflect the section with the highest intersection ratio in the upper 50% of the viewport below the 64px Navbar height offset.
3. WHEN a navigation item is clicked, THE Portfolio_Site SHALL smooth-scroll to the corresponding section with a 64px offset to account for the fixed Navbar height.
4. WHEN a mobile viewport (width < 768px) is detected, THE Navbar SHALL display a hamburger menu icon instead of inline navigation links.
5. WHEN the hamburger menu icon is activated, THE Navbar SHALL display a full-width dropdown panel directly below the Navbar containing a vertical list of navigation items.
6. WHEN a mobile menu navigation item is clicked, THE Navbar SHALL close the mobile menu and smooth-scroll to the target section with a 64px offset.
7. THE Navbar SHALL display the active navigation item with the 4px teal left-border accent defined in the Design_System.

---

### Requirement 3: Hero Section

**User Story:** As a recruiter, I want to immediately see Ashiq's name, title, tagline, and primary actions, so that I can quickly determine relevance and take the next step.

#### Acceptance Criteria

1. THE Hero_Section SHALL display Ashiq Alsinawi's full name using the display typography style (JetBrains Mono, 48px, weight 700).
2. THE Hero_Section SHALL display a professional title below the full name using headline-md typography (JetBrains Mono, 20px, weight 600).
3. THE Hero_Section SHALL display a personal tagline below the professional title using body-lg typography (Hanken Grotesk, 18px), with a maximum of 160 characters.
4. WHEN the "View Projects" button is activated via click or keyboard (Enter or Space), THE Hero_Section SHALL smooth-scroll to the element with id "projects" with a 64px navbar offset.
5. WHEN the "Download Resume" button is activated via click or keyboard (Enter or Space), THE Hero_Section SHALL trigger a browser file download of `/public/resume.pdf` using the `download` attribute without navigating away from the page.
6. THE Hero_Section SHALL render social links for GitHub and LinkedIn, each with a descriptive `aria-label` attribute.
7. THE "View Projects" button SHALL use the solid primary button style with background `#185fa5`, text color `#e1e2e9`, and a hover state that shifts the background to `#68dbae`.
8. THE "Download Resume" button SHALL use the secondary outline button style with a 2px solid border in `#378ADD`, transparent background, text color `#e1e2e9`, and a hover state matching the design system secondary hover.

---

### Requirement 4: About Section

**User Story:** As a hiring manager, I want to read Ashiq's personal introduction and career goals alongside a professional photo, so that I can assess cultural fit and motivation.

#### Acceptance Criteria

1. THE About_Section SHALL display a personal introduction paragraph using body-lg typography (Hanken Grotesk, 18px).
2. THE About_Section SHALL display a career goals statement.
3. THE About_Section SHALL render Ashiq's professional photo from `/public/images/photoedit.png` with a descriptive `alt` attribute.
4. THE About_Section SHALL apply a 1px solid border in `#424751` to the photo wrapper element, with a 0.25rem corner radius.

---

### Requirement 5: Education Section

**User Story:** As a recruiter, I want to see Ashiq's academic background, so that I can verify educational qualifications.

#### Acceptance Criteria

1. THE Education_Section SHALL display the university name using headline-md typography (JetBrains Mono, 20px, weight 600).
2. THE Education_Section SHALL display the degree title using body-lg typography (Hanken Grotesk, 18px).
3. THE Education_Section SHALL display the study period in the format "YYYY – YYYY" or "YYYY – Present".
4. THE Education_Section SHALL display between one and four academic highlights as a list, where each highlight is a non-empty string no longer than 200 characters.

---

### Requirement 6: Skills Section

**User Story:** As a tech lead, I want to see Ashiq's technology skills grouped by category, so that I can quickly assess suitability for a specific role.

#### Acceptance Criteria

1. THE Skills_Section SHALL display skills grouped into exactly three categories: Frontend, Backend, and Database.
2. THE Skills_Section SHALL render each skill as a Skill_Chip using JetBrains Mono label-md text (14px, weight 500) and a 1px solid colored border.
3. THE Skills_Section SHALL display exactly the following skills in the Frontend category: React, JavaScript, HTML, CSS, and Tailwind CSS; no additional Frontend skills shall be added without updating this requirement.
4. THE Skills_Section SHALL display exactly the following skills in the Backend category: Node.js, PHP, Python, Java, and C#; no additional Backend skills shall be added without updating this requirement.
5. THE Skills_Section SHALL display exactly the following skills in the Database category: MySQL, PostgreSQL, and MongoDB; no additional Database skills shall be added without updating this requirement.
6. THE Skills_Section SHALL display each category name as a headline-md heading (JetBrains Mono, 20px, weight 600) with a 2px teal `#68dbae` underline accent directly beneath it.
7. WHILE the viewport width is less than 768px, THE Skills_Section SHALL stack the three category columns vertically in a single-column layout.

---

### Requirement 7: Tools Section

**User Story:** As a recruiter, I want to see the developer tools Ashiq uses, so that I can gauge workflow familiarity.

#### Acceptance Criteria

1. THE Tools_Section SHALL display Tool_Icon components for exactly eight tools: VS Code, Cursor, GitHub, Figma, Canva, Photoshop, OpenAI, and Perplexity.
2. THE Tools_Section SHALL render each Tool_Icon with a mapped Lucide icon and a text label using JetBrains Mono label-md typography (14px, weight 500).
3. WHILE the viewport width is less than 768px, THE Tools_Section SHALL display Tool_Icon components in a grid with a minimum of two columns.

---

### Requirement 8: Why Hire Me Section

**User Story:** As a hiring manager, I want to read a summary of Ashiq's value propositions, so that I can understand what differentiates him from other candidates.

#### Acceptance Criteria

1. THE WhyHireMe_Section SHALL display exactly six Value_Card components.
2. THE WhyHireMe_Section SHALL include cards for: Problem Solving, Product Development, Clean Code, Process Improvement, Team Collaboration, and Continuous Learning.
3. THE Value_Card SHALL display a title using headline-md typography (JetBrains Mono, 20px, weight 600, line-height 1.4).
4. THE Value_Card SHALL display a supporting description using body-md typography (Hanken Grotesk, 16px, weight 400, line-height 1.6).
5. WHEN a Value_Card receives a hover interaction, THE Value_Card SHALL apply a 4px solid `#68dbae` (tertiary) left-border accent, replacing the default left border.
6. WHEN a Value_Card receives keyboard focus, THE Value_Card SHALL apply the same 4px solid `#68dbae` left-border accent as the hover state.

---

### Requirement 9: Projects Section

**User Story:** As a recruiter or client, I want to browse Ashiq's featured projects with full context, so that I can evaluate real-world technical output.

#### Acceptance Criteria

1. THE Projects_Section SHALL display a minimum of three Project_Card components, sourced from entries in the Data_Layer where `featured` is `true`.
2. THE Project_Card SHALL display the project name using headline-md typography (JetBrains Mono, 20px, weight 600).
3. THE Project_Card SHALL display a project description using body-md typography (Hanken Grotesk, 16px).
4. THE Project_Card SHALL display the tech stack as a list of Skill_Chip components.
5. THE Project_Card SHALL display a status badge indicating one of the following statuses: "Completed", "In Progress", or "Planning".
6. IF a project's `githubUrl` is not null, THEN THE Project_Card SHALL render a GitHub link that opens the repository in a new browser tab with `rel="noopener noreferrer"`; IF `githubUrl` is null, THEN THE Project_Card SHALL render the GitHub link in a disabled, non-navigating state.
7. IF a project's `liveUrl` is not null, THEN THE Project_Card SHALL render a live demo link that opens in a new browser tab; IF `liveUrl` is null, THEN THE Project_Card SHALL not render a live demo link.
8. THE Project_Card SHALL display the project screenshot image in a 16:9 aspect ratio container.
9. THE Projects_Section SHALL include Project_Card entries for: Public Library Management System, Weather Forecasting Application, and Online Voting System.
10. WHEN a Project_Card screenshot image fails to load, THE Project_Card SHALL display a static fallback placeholder image with a descriptive alt text indicating the image is unavailable.

---

### Requirement 10: Contact Section and API

**User Story:** As a recruiter or client, I want to send a message to Ashiq directly from the site and receive confirmation, so that I can initiate contact without leaving the page.

#### Acceptance Criteria

1. THE Contact_Section SHALL render a contact form with fields for: name, email, and message.
2. THE Contact_Section SHALL display Ashiq's email address as a visible, clickable mailto link.
3. THE Contact_Section SHALL display a GitHub profile link.
4. THE Contact_Section SHALL display a LinkedIn profile link.
5. WHEN the contact form is submitted, THE Contact_Section SHALL perform client-side validation using React Hook Form before sending the request.
6. IF the name field is empty on submission, THEN THE Contact_Section SHALL display an inline validation error for the name field.
7. IF the email field contains an invalid email address on submission, THEN THE Contact_Section SHALL display an inline validation error for the email field.
8. IF the message field is empty on submission, THEN THE Contact_Section SHALL display an inline validation error for the message field.
9. WHEN a valid contact form is submitted, THE Contact_Section SHALL send a POST request to the Contact_API at `/api/contact`.
10. WHEN the Contact_API receives a POST request, THE Validator SHALL validate the request body against the Zod contact schema before processing.
11. IF the Contact_API receives a request with an invalid body, THEN THE Contact_API SHALL return an HTTP 400 response with a descriptive error message.
12. WHEN the Contact_API receives a valid request, THE Email_Service SHALL deliver the message content to Ashiq's configured email address via the Resend API.
13. WHEN the Email_Service delivers the email successfully, THE Contact_API SHALL return an HTTP 200 response.
14. IF the Email_Service returns an error, THEN THE Contact_API SHALL return an HTTP 500 response with a descriptive error message.
15. WHEN the Contact_API returns HTTP 200, THE Contact_Section SHALL display a success confirmation message to the user.
16. WHEN the Contact_API returns an error response, THE Contact_Section SHALL display an error message to the user without clearing the form.
17. WHILE a form submission is in progress, THE Contact_Section SHALL display a loading indicator and disable the submit button.
18. THE Contact_API SHALL read the `RESEND_API_KEY` from server-side environment variables and SHALL NOT expose it to the client.

---

### Requirement 11: Static Data Layer

**User Story:** As a developer maintaining the site, I want all portfolio content centralised in a single typed data file, so that updates require changes in only one place.

#### Acceptance Criteria

1. THE Data_Layer SHALL export the following named exports from `src/lib/data.ts`: `siteInfo`, `about`, `education`, `skillGroups`, `tools`, `whyHireMe`, and `projects`.
2. THE Data_Layer SHALL type every named export using types imported from `src/types/`; inline type definitions in `src/lib/data.ts` are not permitted.
3. THE Data_Layer SHALL not require a database connection or external API call at build time for content rendering.
4. WHEN a new project entry is added to the `projects` array in the Data_Layer with `featured` set to `true`, THE Projects_Section SHALL render it without changes to component code.

---

### Requirement 12: SEO and Metadata

**User Story:** As a recruiter searching online, I want the portfolio to appear correctly in search results and link previews, so that I can find and share Ashiq's work easily.

#### Acceptance Criteria

1. THE SEO_Layer SHALL define a `<title>` (maximum 60 characters) and `<meta name="description">` (maximum 160 characters) for the portfolio page using the Next.js Metadata API.
2. THE SEO_Layer SHALL define Open Graph tags including `og:title`, `og:description`, `og:url`, and `og:image` where `og:image` points to a static image at `/public/images/og-image.png` with dimensions 1200×630 pixels.
3. THE SEO_Layer SHALL generate a `sitemap.xml` via `src/app/sitemap.ts` that includes the root URL and all navigable sub-paths of the portfolio.
4. THE SEO_Layer SHALL generate a `robots.txt` via `src/app/robots.ts` that permits all crawlers with a `User-agent: *` and `Allow: /` directive.
5. THE SEO_Layer SHALL set the canonical URL using the `NEXT_PUBLIC_SITE_URL` environment variable; IF `NEXT_PUBLIC_SITE_URL` is not set, THE SEO_Layer SHALL fall back to `http://localhost:3000`.

---

### Requirement 13: Responsive Design

**User Story:** As a visitor on any device, I want the portfolio to be readable and usable, so that I can browse it on my phone, tablet, or desktop.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render without horizontal overflow, overlapping elements, or hidden content on viewport widths from 320px to 1920px.
2. WHILE the viewport width is less than 768px, THE Portfolio_Site SHALL use a single-column fluid layout with 16px left and right margins.
3. WHILE the viewport width is between 768px and 1279px inclusive, THE Portfolio_Site SHALL use a two-column grid layout with 24px gutters, and single-column stacking for the Projects, Skills, and Why Hire Me sections.
4. WHILE the viewport width is 1280px or greater, THE Portfolio_Site SHALL use a 12-column fixed grid with a maximum content width of 1280px and 80px left and right margins.
5. WHILE the viewport width is less than 768px, THE Projects_Section SHALL stack Project_Card components vertically in a single column.
6. WHILE the viewport width is less than 768px, THE Skills_Section SHALL stack skill category columns vertically in a single column.
7. WHILE the viewport width is less than 768px, THE WhyHireMe_Section SHALL stack Value_Card components in a single column.
8. THE Portfolio_Site SHALL scale all images and media elements fluidly so that no image exceeds its container width and no content is cropped or overflows at any supported viewport width.

---

### Requirement 14: Accessibility

**User Story:** As a visitor who uses assistive technology or keyboard navigation, I want to fully interact with the portfolio, so that I am not excluded from its content.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`) for all major structural regions.
2. THE Portfolio_Site SHALL provide a descriptive `alt` attribute (maximum 125 characters) for all non-decorative `<img>` elements; decorative images SHALL use `alt=""`.
3. THE Portfolio_Site SHALL ensure all interactive elements are reachable via keyboard Tab navigation, activatable with Enter or Space, and that focus is confined within the mobile menu overlay when it is open.
4. THE Portfolio_Site SHALL ensure all interactive elements display a visible focus indicator with a minimum contrast ratio of 3:1 against the adjacent background (WCAG Non-text Contrast).
5. THE Portfolio_Site SHALL maintain a color contrast ratio of at least 4.5:1 for normal-sized text and at least 3:1 for large text (≥18pt or ≥14pt bold) against its background.
6. THE Contact_Section form fields SHALL include associated `<label>` elements linked via `htmlFor`/`id` attributes.
7. WHEN a form validation error is displayed, THE Contact_Section SHALL set `aria-describedby` on the `<input>` or `<textarea>` element to reference the `id` of the associated error message element.
8. THE Portfolio_Site SHALL include a visible skip navigation link as the first focusable element in the page, allowing keyboard users to bypass the Navbar and jump directly to the main content.

---

### Requirement 15: Performance

**User Story:** As a visitor on a standard internet connection, I want the portfolio to load quickly, so that I do not abandon the page before seeing the content.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL achieve a Lighthouse Performance score of 90 or higher on both desktop and mobile audits.
2. THE Portfolio_Site SHALL achieve a Lighthouse Accessibility score of 90 or higher.
3. THE Portfolio_Site SHALL achieve a Lighthouse SEO score of 90 or higher.
4. THE Portfolio_Site SHALL achieve a Lighthouse Best Practices score of 90 or higher.
5. THE Portfolio_Site SHALL serve all raster images (PNG, JPG) using Next.js Image optimization, which converts them to WebP or AVIF at runtime; SVG images are exempt from this requirement.
6. THE Portfolio_Site SHALL be statically generated at build time using Next.js SSG for all content pages, defined as pages that do not use `getServerSideProps` or dynamic server rendering.

---

### Requirement 16: Deployment and CI/CD

**User Story:** As the site owner, I want every push to the main branch to automatically deploy the latest version of the portfolio, so that I can publish updates without manual steps.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be hosted on Vercel.
2. WHEN a commit is pushed to the `main` branch of the GitHub repository, THE Portfolio_Site SHALL trigger an automatic Vercel build and production deployment that completes within 10 minutes.
3. THE Portfolio_Site SHALL read `RESEND_API_KEY` and `NEXT_PUBLIC_SITE_URL` from Vercel environment variables at build time and at runtime; these values SHALL NOT be embedded in source code.
4. IF a Vercel build fails, THEN THE Portfolio_Site SHALL preserve the last successful production deployment and surface the build error in the Vercel dashboard.
5. IF the custom domain `ashiq.dev` is configured with correct DNS records, THEN THE Portfolio_Site SHALL be accessible via `https://ashiq.dev` with a valid TLS certificate and an automatic HTTP-to-HTTPS redirect.
6. THE Portfolio_Site SHALL render the Vercel Analytics component on every page so that user interactions and performance data are collected.
