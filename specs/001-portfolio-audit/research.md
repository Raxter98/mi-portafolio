# Phase 0: Research & Source-Verified Audit Findings

**Feature Directory**: `specs/001-portfolio-audit`  
**Date**: 2026-10-09  
**Status**: Complete  

## 1. File-by-File Inspection Strategy

| Inspection Domain | Target Files | Verification Method |
| :--- | :--- | :--- |
| **Dependencies & Build Config** | [`package.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/package.json), [`next.config.ts`](file:///Users/user/Desktop/portafolio/mi-portafolio/next.config.ts), [`tsconfig.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/tsconfig.json) | Package version inspection, build flags verification, type checking (`npx tsc --noEmit`). |
| **Routing & Architecture** | [`app/layout.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/layout.tsx), [`app/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/page.tsx), [`components/*/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components) | App Router layout tree analysis, dynamic import pattern audit, component naming audit. |
| **Localization (i18n)** | [`context/LanguageContext.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/context/LanguageContext.tsx), [`hooks/useTranslation.ts`](file:///Users/user/Desktop/portafolio/mi-portafolio/hooks/useTranslation.ts), [`locales/en.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/locales/en.json), [`locales/es.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/locales/es.json) | Key parity audit between `en.json` and `es.json`, hardcoded string search in component JSX. |
| **Accessibility (WCAG 2.2)** | [`app/layout.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/layout.tsx), [`components/nav/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/nav/page.tsx), [`components/footer/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/footer/page.tsx), [`components/companies/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/companies/page.tsx) | HTML semantics check, heading hierarchy tree (`h1` count), `aria-label` i18n binding, invalid HTML attributes. |
| **SEO & Performance** | [`app/layout.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/layout.tsx), [`components/threeHero/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/threeHero/page.tsx), [`components/ProjectCube/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/ProjectCube/page.tsx) | Metadata completeness check (OG tags, Twitter cards), client-side `ssr: false` impact assessment, WebGL canvas destruction check. |
| **Testing & Deployment** | [`package.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/package.json), `.github/`, root directory | Test script verification, test runner package check, deployment manifest inspection. |

---

## 2. Detailed Findings Matrix with Line References

### Finding 1: Suppressed Type Checking and Linting During Builds
* **Severity**: High (Quality Gate Risk)
* **File Path & Line Reference**: [`next.config.ts`](file:///Users/user/Desktop/portafolio/mi-portafolio/next.config.ts#L8-L13)
  * Line 9: `ignoreDuringBuilds: true` (ESLint build suppression)
  * Line 12: `ignoreBuildErrors: true` (TypeScript build error suppression)
* **Evidence**:
  ```typescript
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
  ```
* **Impact**: Production builds can succeed even if TypeScript type errors or severe ESLint violations are present, risking runtime errors in production deployments.
* **Recommended Action**: Remove `ignoreDuringBuilds` and `ignoreBuildErrors` options from `next.config.ts`.
* **Estimated Complexity**: Low

---

### Finding 2: Component Entry File Naming Pattern Collision
* **Severity**: Medium (Maintainability / Developer Experience)
* **File Path & Line Reference**: [`components/nav/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/nav/page.tsx#L9), [`components/footer/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/footer/page.tsx#L5), [`components/welcome/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/welcome/page.tsx#L6)
* **Evidence**: 27 components inside `components/` subdirectories use `page.tsx` as their main filename (e.g. `components/nav/page.tsx`, `components/contact/page.tsx`, `components/skills/page.tsx`).
* **Impact**: In Next.js App Router, `page.tsx` is the convention for route pages. Using `page.tsx` inside component folders creates confusion when opening files in IDEs and breaks route file separation conventions.
* **Recommended Action**: Rename component files from `page.tsx` to `index.tsx` or `<ComponentName>.tsx` (e.g., `components/nav/index.tsx` or `components/nav/Navbar.tsx`) and update imports in [`app/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/page.tsx#L6-L56).
* **Estimated Complexity**: Low

---

### Finding 3: Static HTML Language Attribute and Un-translated ARIA Labels
* **Severity**: Medium (Accessibility & i18n Compliance)
* **File Path & Line Reference**:
  * [`app/layout.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/layout.tsx#L30): `<html lang="en" translate="no" className="dark">`
  * [`components/nav/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/nav/page.tsx#L92): `aria-label="Toggle Menu"`
  * [`components/select/select.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/select/select.tsx#L18): `aria-label="Seleccionar idioma"`
  * [`components/switcher/switcher.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/switcher/switcher.tsx#L27): `aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}`
* **Evidence**: The root `<html>` tag hardcodes `lang="en"` regardless of selected language in `LanguageContext`. ARIA labels on navbar toggle, language selector, and dark mode toggle use hardcoded English or Spanish strings.
* **Impact**: Screen readers cannot announce page content in the correct language when switching to Spanish. Assistive technology receives inconsistent aria labels.
* **Recommended Action**: Bind the `lang` attribute dynamically or wrap `app/layout.tsx` children with localized state, and add `aria-label` translations to `en.json` and `es.json`.
* **Estimated Complexity**: Low

---

### Finding 4: Heading Hierarchy Violations (Multiple `<h1>` tags on single page)
* **Severity**: Medium (WCAG 2.2 AA Compliance)
* **File Path & Line Reference**:
  * [`app/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/page.tsx#L108): `<h1 className="...">` (Experiencia title 1)
  * [`app/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/page.tsx#L114): `<h1 className="...">` (Experiencia title 2)
  * [`components/welcome/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/welcome/page.tsx#L122): `<h1 className="...">` (Hero title)
  * [`components/companies/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/companies/page.tsx#L19): `<h1 className="...">` (Job position title)
* **Evidence**: The single page contains at least 5 separate `<h1>` elements rendered simultaneously across hero, experience headers, and company cards.
* **Impact**: Violates WCAG 2.2 AA heading structure rules. Screen reader users relying on heading navigation (`H` key) experience a broken document outline.
* **Recommended Action**: Preserve a single `<h1>` in the Hero section (`Welcome` component) and convert section/card titles to `<h2>` and `<h3>` tags with matching CSS classes.
* **Estimated Complexity**: Low

---

### Finding 5: Invalid HTML Markup in Footer Component
* **Severity**: Low (HTML Validity)
* **File Path & Line Reference**: [`components/footer/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/footer/page.tsx#L13-L28)
* **Evidence**:
  ```tsx
  <h5
    className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-black dark:text-white"
    rel="noopener noreferrer"
  >
  ```
* **Impact**: The `rel` attribute (`rel="noopener noreferrer"`) is invalid on `<h5>` heading elements in HTML5 standards; `rel` is only valid on `<a>`, `<area>`, and `<link>` elements.
* **Recommended Action**: Remove `rel="noopener noreferrer"` from `<h5>` element in [`components/footer/page.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/components/footer/page.tsx#L15).
* **Estimated Complexity**: Low

---

### Finding 6: Missing OpenGraph and Social Metadata
* **Severity**: Low (SEO / Social Sharing)
* **File Path & Line Reference**: [`app/layout.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/layout.tsx#L19-L22)
* **Evidence**:
  ```typescript
  export const metadata: Metadata = {
    title: "Marcos Valero",
    description: "If you need a developer, contact me",
  };
  ```
* **Impact**: Shared links on social platforms (LinkedIn, Twitter, WhatsApp) lack custom preview thumbnails, OpenGraph titles, or rich media cards.
* **Recommended Action**: Expand `metadata` in [`app/layout.tsx`](file:///Users/user/Desktop/portafolio/mi-portafolio/app/layout.tsx#L19) to include `openGraph`, `twitter`, `keywords`, and `authors`.
* **Estimated Complexity**: Low

---

### Finding 7: Lack of Automated Testing Pipeline
* **Severity**: Medium (Quality Assurance)
* **File Path & Line Reference**: [`package.json`](file:///Users/user/Desktop/portafolio/mi-portafolio/package.json#L5-L10)
* **Evidence**: `package.json` contains no test runner (`jest`, `vitest`) or test scripts (`npm test`). `find` search confirms zero test files in repository.
* **Impact**: Changes cannot be verified automatically before merging, increasing reliance on manual testing.
* **Recommended Action**: Configure Vitest and React Testing Library for component/hook testing as a future task.
* **Estimated Complexity**: Medium

---

## 3. Facts vs. Risks vs. Assumptions

### Verified Facts
1. Next.js `15.0.7`, React `18.2.0`, TypeScript `^5`, and Tailwind CSS `3.4.17` are the active tech stack (`package.json`).
2. Type checking via `npx tsc --noEmit` passes with 0 errors.
3. Build error checks for ESLint and TypeScript are explicitly ignored in `next.config.ts`.
4. All major components are dynamically imported with `{ ssr: false }` in `app/page.tsx`.
5. 27 components use the `components/*/page.tsx` naming layout.
6. Spanish (`es.json`) and English (`en.json`) dictionaries exist and are consumed via `LanguageContext` and `useTranslation`.

### Potential Risks
1. Disabling build error checks may allow subtle TypeScript or ESLint regressions to accumulate unnoticed.
2. Relying entirely on client-side rendering (`ssr: false`) for all portfolio sections may delay initial content rendering for users on slow connections.

### Unverified Assumptions
1. Deployment is assumed to target static or Node.js hosting environments (such as Vercel) based on Next.js standards, though no deployment config files are present.
