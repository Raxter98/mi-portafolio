# Implementation Plan: Interactive Projects Section Redesign

**Branch**: `005-projects-section-redesign` | **Date**: 2026-10-11 | **Spec**: [specs/005-projects-section-redesign/spec.md](file:///Users/user/Desktop/portafolio/mi-portafolio/specs/005-projects-section-redesign/spec.md)

**Input**: Feature specification from `specs/005-projects-section-redesign/spec.md`

## Summary

Replace the legacy 3D Three.js carousel/cube (`ProjectCube`) in `components/myProjects/page.tsx` with an **Interactive Editorial Focus Stage & Dynamic Project Showcase**. The new design organizes all 9 authentic projects into a commanding asymmetric layout featuring discipline-based category filters, live demo video playback (Worldker), tactile project indexing, an accessible deep-dive inspection modal, complete bilingual internationalization, and WCAG 2.2 Level AA accessibility compliance.

---

## Technical Context

**Language/Version**: TypeScript 5 / React 18 / Next.js 15.0.7 (App Router)

**Primary Dependencies**: Tailwind CSS 3.4.17, Framer Motion 12.5.0, Lucide React (all already installed in `package.json`). Zero new external libraries.

**Storage**: Static data catalog in client bundle; no database or external API required.

**Testing & Verification**: Next.js static build (`npm run build`), ESLint (`npm run lint`), interactive accessibility verification (keyboard navigation, screen-reader markup, reduced-motion emulation).

**Target Platform**: Responsive Web (Mobile 320px+ up to Ultra-wide 4K displays).

**Project Type**: Single-page portfolio application component with modal subviews.

**Performance Goals**:
- Section render time < 50ms.
- Elimination of WebGL context creation and canvas animation loops.
- Instant project switching transition < 150ms.
- 0 Cumulative Layout Shift (CLS) during image/video loading.

**Constraints**:
- Strict adherence to 9 authentic repository projects; zero fabrication of metrics or achievements.
- Tech Stack Preservation: No framework or major library migrations.
- Internationalization: 100% string parity between `locales/es.json` and `locales/en.json`.
- Accessibility: WCAG 2.2 Level AA compliance, keyboard trap in modal, `prefers-reduced-motion` suppression.

**Scale/Scope**:
- 9 verified projects.
- 4 category filter views (`all`, `mobile`, `web`, `enterprise_pwa`).
- 2 supported languages (`es`, `en`).

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Evaluation | Status |
| :--- | :--- | :--- |
| **1. Tech Stack Preservation** | Preserves Next.js 15, React 18, Tailwind CSS, Framer Motion. Zero new npm packages added. | **PASS** |
| **2. Architecture & Code Quality** | Modular component separation (`MyProjects`, `ProjectFilters`, `ProjectDeck`, `ProjectSpotlightStage`, `ProjectDetailModal`). Clean separation of state, data catalog, and presentation. | **PASS** |
| **3. Responsive Design** | Mobile-first architecture; fluid grid transitions (`col-span-12` to 2-column on `lg`); touch targets >= 44x44px; zero horizontal overflow. | **PASS** |
| **4. Internationalization (i18n)** | All user-facing strings centralized in `locales/es.json` and `locales/en.json`. 100% key parity guaranteed. | **PASS** |
| **5. Visual Identity & Design System** | Aligns with existing portfolio red accents (`bg-red-500`, `text-red-500`), zinc neutrals (`dark:bg-zinc-950`), subtle borders, and typography. | **PASS** |
| **6. Accessibility & Usability** | WCAG 2.2 AA compliant: semantic HTML, visible focus rings, keyboard operable (`Tab`, `Enter`, `Escape`, `ArrowLeft`, `ArrowRight`), reduced-motion respect. | **PASS** |
| **7. Performance & SEO** | Removes heavy Three.js canvas overhead; optimizes image aspect-ratios to prevent CLS; maintains semantic heading structure. | **PASS** |
| **8. Security & Privacy** | Public assets only; no secrets, tracking, or sensitive data involved. | **PASS** |
| **9. Testing & Verification** | Linting and static production build verification mandated; end-to-end scenarios documented in `quickstart.md`. | **PASS** |
| **10. Backward Compatibility** | Replaces internal component within existing `#projects` anchor in `app/page.tsx` without breaking navigation. | **PASS** |
| **11. Spec-Driven Development** | Full Spec Kit artifacts created: `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`. | **PASS** |
| **12. Documentation & Maintainability** | Fully documented data model, state transitions, and component contracts for future maintainability. | **PASS** |
| **13. Implementation Discipline** | Strictly verified existing project catalog; no invented dependencies or fabricated data. | **PASS** |

---

## Project Structure

### Documentation (this feature)

```text
specs/005-projects-section-redesign/
├── checklists/
│   └── requirements.md        # Spec quality checklist
├── contracts/
│   └── ui-contracts.md        # Component interfaces & i18n schema
├── data-model.md              # Project entities, state, and transitions
├── plan.md                    # This master implementation plan
├── quickstart.md              # End-to-end validation guide
├── research.md                # Architecture decisions & trade-offs
└── spec.md                    # Feature specification
```

### Source Code (repository root)

```text
app/
└── page.tsx                   # Main page referencing MyProjects under #projects

components/
└── myProjects/
    ├── page.tsx               # Redesigned main projects section orchestrator
    ├── ProjectDeck.tsx        # Curated project info, technologies & navigation
    ├── ProjectDetailModal.tsx # Accessible deep-dive modal
    ├── ProjectFilters.tsx     # Discipline category filter pills
    ├── ProjectSpotlightStage.tsx # Cinematic visual & video stage
    └── projectsData.ts        # Static catalog of the 9 authentic projects

locales/
├── en.json                    # English translations (extended with projects.showcase)
└── es.json                    # Spanish translations (extended with projects.showcase)
```

**Structure Decision**:
- Replaces the legacy `components/myProjects/page.tsx` and retires `ProjectCube/page.tsx` from the active page flow.
- Decomposes the section into focused sub-components under `components/myProjects/` to maintain clean responsibilities and avoid a single monolithic 500-line file.
- Centralizes project definitions in `projectsData.ts` so future projects can be added simply by appending data without touching JSX layouts.

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| :--- | :--- | :--- |
| *None* | No constitutional principles violated | N/A |
