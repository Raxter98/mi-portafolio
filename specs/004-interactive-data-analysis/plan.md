# Implementation Plan: Interactive Data Analysis and Visualization

**Branch**: `004-interactive-data-analysis` | **Date**: 2026-10-11 | **Spec**: [specs/004-interactive-data-analysis/spec.md](spec.md)

**Input**: Feature specification from `/specs/004-interactive-data-analysis/spec.md`

---

## Summary

This plan outlines the implementation of an interactive Data Analysis and Visualization feature for Marcos Valero's personal portfolio. 

The feature introduces:
1. A spotlight showcase section on the homepage (`#data-analysis`) introducing the project with bilingual descriptions, an infinitely looping muted video container with accessible fallback, and a primary CTA linking to the full dashboard.
2. A dedicated full-page analytical dashboard route (`/data-analysis`) allowing users to interactively explore two verified real-world datasets: `"Público e-commerce"` and `"Hospital-patients"`.
3. An immutable analytical state engine delivering dynamic KPI recalculation, multi-dimensional interactive SVG charts, multi-criteria filtering, and paginated sortable data tables.
4. Pre-compiled static JSON dataset normalization at build-time (`data/ecommerce-orders.json` and `data/hospital-patients.json`) to guarantee instantaneous loading (<10ms) without bundle bloat.
5. 100% bilingual localization (`locales/es.json` and `locales/en.json`) and WCAG 2.2 AA accessibility compliance.

---

## Technical Context

**Language/Version**: TypeScript 5.x / JavaScript ECMAScript 2022

**Primary Dependencies**: Next.js 15.0.7 (App Router), React 18.2.0, Tailwind CSS 3.4.17, Lucide React 0.483.0, Framer Motion 12.5.0

**Storage**: Pre-compiled static JSON datasets stored in `data/` (`ecommerce-orders.json` and `hospital-patients.json`), sourced from `public/E-Commerce-orders.xlsx` and `public/Hospital-Patients.xlsx`. No database or server-side store required.

**Testing & Verification**: TypeScript strict compiler checks (`npx tsc --noEmit`), Next.js ESLint (`npm run lint`), production build verification (`npm run build`), i18n key parity tests via Node.js script.

**Target Platform**: Modern desktop, tablet, and mobile web browsers (Chromium, Firefox, Safari, Edge).

**Project Type**: Next.js App Router Single-Page & Multi-Route Web Application.

**Performance Goals**:
- Dataset toggle transition $< 200\text{ms}$.
- Filter recalculation latency $< 5\text{ms}$.
- Initial page LCP impact $< 0.1\text{s}$.
- 0 Cumulative Layout Shift (CLS = 0).

**Constraints**:
- Zero server-side database or API overhead.
- Zero PII exposure (synthetic benchmarks only).
- WCAG 2.2 Level AA accessibility compliance (color contrast $> 4.5:1$, visible focus rings, keyboard navigability).
- Seamless adherence to portfolio dark/light theme tokens and zinc/red palette.
- Strict respect for `prefers-reduced-motion: reduce`.

**Scale/Scope**:
- 1 Homepage section component (`components/dataAnalysis/page.tsx`).
- 1 Dedicated page route (`app/data-analysis/page.tsx`).
- 2 Independent datasets (1,000 verified rows each).
- 10 Dynamic KPI calculations.
- 8 Interactive SVG visualizations.
- 2 Multi-criteria filter engines.
- 2 Paginated, sortable data tables.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Requirement | Plan Compliance Status | Notes |
|---|---|:---:|---|
| **1. Tech Stack Preservation** | Preserve Next.js, React, Tailwind, TypeScript | ✅ PASS | Uses established Next.js App Router, React 18, and Tailwind. Zero framework migration. |
| **2. Architecture & Code Quality** | Modular, typed, separated logic and presentation | ✅ PASS | Strict separation: Data normalization script $\rightarrow$ typed models $\rightarrow$ analytical state hook $\rightarrow$ modular UI components. |
| **3. Responsive Design** | Fluid across mobile ($375\text{px}$), tablet ($768\text{px}$), desktop ($1440\text{px}$) | ✅ PASS | Responsive grid layouts, horizontal scroll wrappers for tables, fluid SVG viewBox scaling. |
| **4. Internationalization (i18n)** | 100% localized in Spanish and English | ✅ PASS | Schema-validated translations in `locales/es.json` and `locales/en.json` integrated via `useTranslation`. |
| **5. Visual Identity** | Preserve zinc/red identity, dark/light modes | ✅ PASS | Adheres to zinc-900/zinc-950 dark backgrounds, red accents (`red-500`/`red-600`), and backdrop-blur cards. |
| **6. Accessibility** | WCAG 2.2 AA, semantic HTML, visible focus, reduced motion | ✅ PASS | Semantic markup, ARIA roles, visible focus rings, respects `prefers-reduced-motion` for videos and charts. |
| **7. Performance & SEO** | Fast LCP, zero CLS, metadata configuration | ✅ PASS | Static JSON data ingestion prevents runtime xlsx parsing. Fixed aspect ratios prevent CLS. |
| **8. Security & Privacy** | No secrets or confidential PII in client bundles | ✅ PASS | Confirmed datasets are synthetic benchmarks; no credentials or private data. |
| **9. Testing & Verification** | Type-checking, build pass, repeatable verification scripts | ✅ PASS | Documented in `quickstart.md` with zero runtime lint/build failures allowed. |
| **10. Backward Compatibility** | Preserve existing homepage sections and routes | ✅ PASS | Homepage sections (Hero, About, Software, Projects, Multimedia, Skills, Education, Contact) unaffected. |
| **11. Spec-Driven Development** | Follow Spec Kit workflow: Spec $\rightarrow$ Plan $\rightarrow$ Tasks | ✅ PASS | Phase 0 and Phase 1 artifacts completed according to Spec Kit standards. |
| **12. Documentation** | Accurate models, contracts, and execution guides | ✅ PASS | Clear contracts, JSON schemas, data models, and verification steps in feature directory. |
| **13. Implementation Discipline** | Simplest maintainable solution without unnecessary dependencies | ✅ PASS | Avoids bulky charting and parsing libraries by using native SVG and build-time data normalization. |

---

## Project Structure

### Documentation (this feature)

```text
specs/004-interactive-data-analysis/
├── spec.md                  # Feature specification
├── plan.md                  # This implementation plan
├── research.md              # Phase 0 technical decisions & architecture rationale
├── data-model.md            # Phase 1 domain entities, formulas, and TypeScript models
├── quickstart.md            # Phase 1 runnable validation scenarios & test procedures
├── contracts/               # Phase 1 interface contracts
│   ├── dataset-interface.contract.ts
│   └── i18n-dictionary-schema.json
├── checklists/
│   └── requirements.md      # Specification quality checklist
└── tasks.md                 # Phase 2 actionable task list (generated via /speckit-tasks)
```

### Source Code (repository root)

```text
# Data Normalization & Raw Data
public/
├── E-Commerce-orders.xlsx                    # Raw verified source workbook (retained)
├── Hospital-Patients.xlsx                     # Raw verified source workbook (retained)
├── videos/
│   └── data-preview.mp4                       # Configurable looping video asset
└── projects/
    └── data-preview-poster.webp               # Video fallback poster image

scripts/
└── sync-datasets.ts                          # Repeatable script converting .xlsx to typed .json

data/
├── ecommerce-orders.json                      # Normalized 1,000 orders (pre-compiled)
└── hospital-patients.json                     # Normalized 1,000 patients (pre-compiled)

types/
└── data-analysis.ts                          # Shared TypeScript types and interfaces

# Homepage Component
components/
├── dataAnalysis/
│   └── page.tsx                              # Section container (#data-analysis)
│   ├── LoopingVideoPlayer.tsx                 # Autoplay muted loop with fallback & reduced motion
│   └── DataAnalysisCard.tsx                   # Visual card with description and CTA

# Dedicated Analytics Dashboard Route
app/
├── data-analysis/
│   └── page.tsx                              # Main dashboard page route (/data-analysis)

# Dashboard Reusable Components
components/
└── dashboard/
    ├── DashboardNavbar.tsx                   # Header with return navigation, theme & i18n toggles
    ├── DatasetSelector.tsx                   # Segmented control: E-Commerce vs Hospital Patients
    ├── KPIGrid.tsx                           # Grid of 5 responsive KPI cards
    ├── FilterToolbar.tsx                     # Generic filter bar with reset button
    ├── ChartContainer.tsx                    # Accessible responsive SVG chart wrapper
    │
    ├── charts/
    │   ├── LineTimelineChart.tsx             # Monthly revenue & profit trend line
    │   ├── BarComparisonChart.tsx            # Categorical bar chart (Revenue, Volume, LOS)
    │   ├── DonutDistributionChart.tsx        # Segmented distribution chart (Ship Mode, Payment Status)
    │   └── HistogramChart.tsx                # Demographic age group distribution
    │
    ├── tables/
    │   └── DataTable.tsx                     # Generic accessible paginated sortable table
    │
    └── hooks/
        └── useDashboardAnalytics.ts          # Immutable reactive analytical calculations
```

**Structure Decision**: 
Organized as a modular addition to the existing single-project Next.js architecture. The homepage component is encapsulated in `components/dataAnalysis/` and imported dynamically in `app/page.tsx`, while the dedicated route is hosted under `app/data-analysis/page.tsx` reusing specialized analytical UI widgets in `components/dashboard/`.

---

## Complexity Tracking

> *Zero constitution violations or unnecessary abstractions introduced.*

| Principle / Area | Decision | Simpler Alternative Rejected Because |
|---|---|---|
| Data Transformation | Build-time `.json` generation script | Direct client `.xlsx` parsing rejected due to 500KB+ bundle overhead and mobile lag. |
| Visualizations | Responsive Tailwind-styled SVG components | Heavy charting libraries (e.g. Chart.js/Recharts) rejected to avoid theme mismatch, canvas resize issues, and dependency bloat. |
| Routing | Dedicated route at `/data-analysis` | Modal overlay on homepage rejected because 2 large analytical dashboards require full-width viewport space and independent URL access. |
