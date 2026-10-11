# Implementation Tasks: Interactive Data Analysis and Visualization

**Feature Directory**: `specs/004-interactive-data-analysis`  
**Date**: 2026-10-11  
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)  

---

## Phase 1: Setup (Shared Infrastructure & Data Ingestion)

**Purpose**: Establish domain data types, extraction script, and pre-compiled static JSON datasets.

- [x] T001 [P] Define TypeScript interfaces for `ECommerceOrder`, `HospitalPatient`, `DashboardKPICard`, and filter states in `types/data-analysis.ts`
- [x] T002 [P] Create Node.js/TypeScript dataset normalization script in `scripts/sync-datasets.ts` to convert `public/E-Commerce-orders.xlsx` and `public/Hospital-Patients.xlsx` into typed JSON with verified ISO date parsing
- [x] T003 Execute dataset normalization script to generate `data/ecommerce-orders.json` and `data/hospital-patients.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core translation dictionaries and reactive analytical calculation engine (BLOCKS all user stories).

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 [P] Expand Spanish translation dictionary with `dataAnalysis` and `dataDashboard` namespaces in `locales/es.json`
- [x] T005 [P] Expand English translation dictionary with matching `dataAnalysis` and `dataDashboard` namespaces in `locales/en.json`
- [x] T006 Implement reactive analytical calculations and filter state management hook in `components/dashboard/hooks/useDashboardAnalytics.ts`

**Checkpoint**: Foundation ready — user story implementation can begin.

---

## Phase 3: User Story 1 - Homepage Showcase Section with Looping Animation (Priority: P1) 🎯 MVP

**Goal**: Introduce the interactive data analysis project on the homepage with an infinitely looping muted video container, accessible fallback, and navigation CTA.

**Independent Test**: Load `http://localhost:3000`, scroll to `#data-analysis`, verify video autoplay/loop behavior with poster fallback, check reduced-motion handling, and click "Explorar visualizaciones" to navigate to `/data-analysis`.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create looping video container component with poster fallback and reduced-motion detection in `components/dataAnalysis/LoopingVideoPlayer.tsx`
- [x] T008 [P] [US1] Implement homepage section container with localized title, description, and CTA button in `components/dataAnalysis/page.tsx`
- [x] T009 [US1] Integrate `DataAnalysis` section component into `app/page.tsx` under `#data-analysis` anchor
- [x] T010 [US1] Add "Datos" / "Data Analysis" navigation item to desktop and mobile navbar links in `components/nav/page.tsx`

**Checkpoint**: User Story 1 functional and testable independently (Homepage spotlight active).

---

## Phase 4: User Story 2 - Dedicated Visualization Route with Dataset Selector (Priority: P1) 🎯 MVP

**Goal**: Provide an independent `/data-analysis` route with header navigation, portfolio return link, and a segmented dataset selector toggling between E-Commerce and Hospital Patients.

**Independent Test**: Navigate to `/data-analysis`, verify dataset selector buttons, confirm "Back to Portfolio" link returns to `/#data-analysis`, and verify zero data contamination when toggling datasets.

### Implementation for User Story 2

- [x] T011 [P] [US2] Create dedicated page route shell with layout and SEO metadata in `app/data-analysis/page.tsx`
- [x] T012 [P] [US2] Implement dashboard top navigation bar with return link, language switcher, and theme toggle in `components/dashboard/DashboardNavbar.tsx`
- [x] T013 [US2] Implement segmented dataset selector component with accessible tab roles in `components/dashboard/DatasetSelector.tsx`

**Checkpoint**: User Story 2 functional (Dedicated route & dataset switcher operational).

---

## Phase 5: User Story 3 - "Público e-commerce" Interactive Analytics & KPI Recalculation (Priority: P2)

**Goal**: Deliver interactive analytics for the E-Commerce dataset including 5 dynamic KPI cards, timeline and categorical charts, and a paginated data table.

**Independent Test**: Select "Público e-commerce", confirm baseline metrics (Revenue \$90,201.27, Profit \$28,153.38, Margin 31.2%, Units 2,030, AOV \$90.20), inspect charts, and sort/page the data table.

### Implementation for User Story 3

- [x] T014 [P] [US3] Implement E-Commerce KPI summary cards in `components/dashboard/ecommerce/ECommerceKPIs.tsx`
- [x] T015 [P] [US3] Implement Monthly Revenue & Profit timeline SVG chart in `components/dashboard/charts/LineTimelineChart.tsx`
- [x] T016 [P] [US3] Implement Product Category and Regional sales comparison SVG charts in `components/dashboard/charts/BarComparisonChart.tsx`
- [x] T017 [P] [US3] Implement Shipping Mode distribution SVG donut chart in `components/dashboard/charts/DonutDistributionChart.tsx`
- [x] T018 [US3] Implement E-Commerce sortable paginated data table in `components/dashboard/ecommerce/ECommerceTable.tsx`

**Checkpoint**: User Story 3 functional and testable independently (E-Commerce dashboard active).

---

## Phase 6: User Story 4 - "Hospital-patients" Clinical Operations & Financial Breakdown (Priority: P2)

**Goal**: Deliver interactive analytics for Hospital Patients including 5 clinical/billing KPI cards, department volume & LOS charts, financial breakdown, demographic histogram, and paginated patient table.

**Independent Test**: Select "Hospital-patients", confirm baseline metrics (Admissions 1,000, Avg LOS 4.81 days, Billing \$8,053,143.03, Coverage 74.9%, Outstanding \$2,042,437.89), inspect department charts, and sort/page the patient table.

### Implementation for User Story 4

- [x] T019 [P] [US4] Implement Hospital Patients KPI summary cards in `components/dashboard/hospital/HospitalKPIs.tsx`
- [x] T020 [P] [US4] Implement Department admissions volume and average Length of Stay dual-bar SVG chart in `components/dashboard/charts/DepartmentVolumeChart.tsx`
- [x] T021 [P] [US4] Implement Department financial comparison SVG chart (Billing vs Insurance Coverage vs Out-of-pocket) in `components/dashboard/charts/FinancialComparisonChart.tsx`
- [x] T022 [P] [US4] Implement Patient demographic age group histogram in `components/dashboard/charts/HistogramChart.tsx`
- [x] T023 [P] [US4] Implement Payment status breakdown SVG donut chart in `components/dashboard/charts/PaymentStatusChart.tsx`
- [x] T024 [US4] Implement Hospital Patients sortable paginated data table in `components/dashboard/hospital/HospitalTable.tsx`

**Checkpoint**: User Story 4 functional and testable independently (Hospital dashboard active).

---

## Phase 7: User Story 5 - Multi-Filter Engine, Sorting, Pagination & Filter Reset (Priority: P3)

**Goal**: Provide interactive multi-attribute filter toolbars with dynamic KPI recalculations, table sorting, pagination, and a one-click filter reset button.

**Independent Test**: Apply combined filters on both datasets, verify reactive KPI recalculations, test sorting and pagination, test empty state, and click "Reset Filters" to return to baseline.

### Implementation for User Story 5

- [x] T025 [P] [US5] Implement E-Commerce filter toolbar with Category, Region, Ship Mode, and Year selectors in `components/dashboard/ecommerce/ECommerceFilters.tsx`
- [x] T026 [P] [US5] Implement Hospital filter toolbar with Department, Payment Status, Gender, and Age Group selectors in `components/dashboard/hospital/HospitalFilters.tsx`
- [x] T027 [P] [US5] Implement empty filter results state component with instant reset action in `components/dashboard/EmptyFilterState.tsx`
- [x] T028 [US5] Integrate combined multi-filter evaluation, sorting, and pagination into `components/dashboard/hooks/useDashboardAnalytics.ts`

**Checkpoint**: User Story 5 functional (Interactivity, filtering & pagination complete).

---

## Phase 8: User Story 6 - Bilingual Internationalization & WCAG 2.2 AA Accessibility (Priority: P4)

**Goal**: Guarantee 100% Spanish/English language parity and WCAG 2.2 AA accessibility across all charts, tables, tooltips, and interactive controls.

**Independent Test**: Toggle language switcher between Spanish and English across all views, inspect screen reader ARIA labels, and navigate the dashboard using keyboard only (`Tab`, `Space`, `Enter`).

### Implementation for User Story 6

- [x] T029 [P] [US6] Implement accessible chart wrapper with ARIA labels, focus rings, and high-contrast tooltip overlays in `components/dashboard/ChartContainer.tsx`
- [x] T030 [P] [US6] Implement keyboard navigation and sort direction announcement attributes in `components/dashboard/tables/DataTable.tsx`
- [x] T031 [US6] Apply locale-aware currency, number, and date formatting across all KPI cards, chart tooltips, and data tables in `components/dashboard/page.tsx`

**Checkpoint**: User Story 6 functional (Bilingual & accessibility requirements verified).

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: End-to-end verification, type checking, build pass, and validation against `quickstart.md`.

- [x] T032 [P] Verify TypeScript compilation with zero errors via `npx tsc --noEmit`
- [x] T033 [P] Execute automated i18n key parity verification script between `locales/en.json` and `locales/es.json`
- [x] T034 [P] Execute dataset integrity verification script checking 1,000 records each and exact KPI baseline values
- [x] T035 Execute ESLint and Next.js production build verification via `npm run lint && npm run build`
- [x] T036 Perform manual verification of all scenarios defined in `specs/004-interactive-data-analysis/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories.
- **User Story 1 (Phase 3 - P1)**: Can proceed after Foundational (Phase 2).
- **User Story 2 (Phase 4 - P1)**: Can proceed after Foundational (Phase 2).
- **User Story 3 (Phase 5 - P2)**: Depends on User Story 2 (dedicated route shell).
- **User Story 4 (Phase 6 - P2)**: Depends on User Story 2 (dedicated route shell).
- **User Story 5 (Phase 7 - P3)**: Depends on User Stories 3 & 4 (filters interact with dashboards).
- **User Story 6 (Phase 8 - P4)**: Polishes i18n and accessibility across all dashboards.
- **Polish (Phase 9)**: Runs after all user stories are complete.

### Parallel Opportunities

- Within Phase 1: `T001` (Types) and `T002` (Script) can be written in parallel.
- Within Phase 2: `T004` (`es.json`) and `T005` (`en.json`) can be edited in parallel.
- Within Phase 3: `T007` (Video player) and `T008` (Section card) can be built in parallel.
- Within Phase 4: `T011` (Route shell) and `T012` (Dashboard navbar) can be built in parallel.
- Within Phase 5: `T014`, `T015`, `T016`, `T017` (Charts & KPIs) can be built in parallel.
- Within Phase 6: `T019`, `T020`, `T021`, `T022`, `T023` (Charts & KPIs) can be built in parallel.
- Within Phase 7: `T025` (E-Commerce filters) and `T026` (Hospital filters) can be built in parallel.

---

## Implementation Strategy

### MVP First (Phases 1, 2, 3 & 4)
1. Complete Phase 1 (Setup: Types + Data Sync).
2. Complete Phase 2 (Foundational: i18n + Hook).
3. Complete Phase 3 (US1: Homepage section with video and CTA).
4. Complete Phase 4 (US2: Dedicated route with dataset switcher).
5. **STOP and VALIDATE**: Test navigation from homepage to `/data-analysis` and dataset toggle.

### Incremental Delivery
1. Add Phase 5 (US3: E-Commerce analytics, charts & table) $\rightarrow$ Validate commercial BI.
2. Add Phase 6 (US4: Hospital analytics, charts & table) $\rightarrow$ Validate clinical BI.
3. Add Phase 7 (US5: Multi-filtering, table sorting, reset) $\rightarrow$ Validate full interactivity.
4. Add Phase 8 (US6: Full i18n & WCAG AA accessibility audit).
5. Run Phase 9 (Verification: TypeScript, lint, build pass).
