# Phase 0: Research & Architecture Decisions (Interactive Data Analysis & Visualization)

**Feature Directory**: `specs/004-interactive-data-analysis`  
**Date**: 2026-10-11  
**Status**: Complete  

---

## 1. Technical Decisions & Rationale

### Decision 1: Pre-Compiled Static JSON Transformation vs Client-Side Excel Parsing
* **Decision**: Extract and normalize the raw data from `public/E-Commerce-orders.xlsx` and `public/Hospital-Patients.xlsx` into strongly typed, optimized static JSON datasets (`data/ecommerce-orders.json` and `data/hospital-patients.json`) using a repeatable Node.js/TypeScript script. The client application imports and operates directly on these JSON structures.
* **Rationale**:
  - Binary `.xlsx` files require heavy client-side parsing libraries (e.g. `xlsx` or `exceljs`), adding 350KB–800KB to the client JavaScript bundle.
  - Parsing 1,000 Excel rows in the browser introduces 250ms–600ms of main-thread blocking time on mobile devices, degrading Core Web Vitals (INP and TBT).
  - Pre-normalizing data guarantees instant dataset switching (<10ms), zero client-side parsing latency, and enables strict build-time schema validation and type safety.
  - Preserves the original `.xlsx` files in `public/` so visitors can download or inspect the raw source files if desired.
* **Alternatives Considered**:
  - *Dynamic client-side xlsx parsing with Web Workers*: Rejected because it adds substantial runtime complexity, requires Web Worker bundling configuration, and balloons bundle size for static benchmark data.
  - *Server-side API routes (`/api/data`) on every request*: Rejected because it introduces unnecessary server roundtrips and latency for datasets that are completely static.

---

### Decision 2: Tailored Responsive SVG & Canvas Visualizations vs External Heavy Chart Libraries
* **Decision**: Implement a modular, reusable React SVG-based charting component suite styled with Tailwind CSS (supporting dark/light theme tokens, tooltips, responsive viewBox scaling, and animated transitions), with clear interfaces. If complex charts require external primitives, utilize lightweight, modular visual components.
* **Rationale**:
  - External charting libraries (like Chart.js or large bundle-heavy chart packages) often suffer from theme mismatch in dark mode, require Canvas resizing workarounds in flex containers, and add significant bundle weight.
  - Native SVG components constructed with React and Tailwind CSS have 0 external runtime dependencies, 0 bundle overhead, render cleanly across all device pixel ratios, integrate natively with Tailwind classes (`text-red-500`, `fill-zinc-800`, `stroke-zinc-400`), and provide accessible DOM nodes with semantic ARIA labels.
  - The required chart types (Monthly Trend Lines, Categorical Bar Charts, Demographic Histograms, and Segmented Donut/Pie visualizers) are straightforward to implement cleanly in SVG with fluid viewBox responsiveness.
* **Alternatives Considered**:
  - *Recharts*: Evaluated. While convenient, it adds ~450KB to the bundle, has known React 18/19 hydration warning quirks, and can conflict with Next.js Turbopack setups.
  - *Chart.js with react-chartjs-2*: Evaluated. Uses HTML5 Canvas which makes accessibility labels and custom tooltip theming harder to synchronize with Tailwind dark mode.

---

### Decision 3: Looping Video Showcase Container with Poster Fallback & Reduced-Motion
* **Decision**: Build a dedicated component `DataAnalysisSection.tsx` on the homepage featuring:
  - An HTML5 `<video>` element with attributes: `autoPlay`, `loop`, `muted`, `playsInline`, `preload="metadata"`.
  - Configurable asset path via constant/prop (defaulting to `/videos/data-preview.mp4` with a styled visual fallback or poster image at `/projects/data-preview-poster.webp`).
  - An intersection observer to pause playback when the section is not in the active viewport (saving CPU/GPU cycles).
  - CSS media query `prefers-reduced-motion: reduce` listener that stops autoplay and displays the static poster image.
  - Primary call-to-action button linking directly to `/data-analysis` using Next.js client-side navigation (`Link`).
* **Rationale**: Meets all homepage performance and accessibility criteria defined in FR-005 through FR-008, preventing video playback from hurting page performance or distracting motion-sensitive users.
* **Alternatives Considered**:
  - *GIF animation*: Rejected due to poor compression, lack of pause controls, large file size, and visual artifacting.
  - *Third-party video iframe*: Rejected because local or static video playback with muted loop provides smoother, ad-free rendering with lower latency.

---

### Decision 4: Immutable Reactive Analytical State & Filtering Engine
* **Decision**: Implement a custom React hook `useDashboardAnalytics` that manages:
  - Active dataset selection (`'ecommerce' | 'hospital'`).
  - Active filter state (multi-dimensional criteria).
  - Sorting and pagination configuration.
  - Pure memoized calculation pipelines (`useMemo`) that compute KPIs, aggregated chart series, and filtered row slices from immutable cached datasets in $< 5\text{ms}$.
  - A clean reset action (`resetFilters()`) that restores baseline state.
* **Rationale**:
  - Guarantees zero data mutation of the underlying dataset.
  - Prevents state cross-contamination when switching datasets by isolating filter models and resetting active criteria upon dataset change.
  - Keeps presentation components completely decoupled from calculation math.

---

### Decision 5: Routing Conventions & Bilingual Navigation Architecture
* **Decision**:
  - Create the dedicated page at route `app/data-analysis/page.tsx` using Next.js App Router conventions.
  - Add a dedicated navigation item to `components/nav/page.tsx` and navbar links, localized as `"Datos"` / `"Data Analysis"`.
  - Ensure the navbar on the dedicated page correctly navigates back to the homepage sections (`/#home`, `/#about`, etc.) instead of attempting local scroll operations on the subpage.
  - Centralize all new translation keys under two structured namespaces in `locales/es.json` and `locales/en.json`:
    - `dataAnalysis`: Homepage spotlight section strings.
    - `dataDashboard`: Dedicated dashboard titles, dataset labels, KPI names, filter labels, chart titles, table headers, and empty/error states.

---

## 2. Component Composition Diagram

```
app/
├── page.tsx                             # Portfolio Homepage
│   └── components/dataAnalysis/
│       └── DataAnalysisSection.tsx      # Homepage Spotlight Section (#data-analysis)
│           ├── LoopingVideoPlayer.tsx   # Video container with poster fallback & reduced motion
│           └── CtaButton.tsx            # Navigation link to /data-analysis
│
└── data-analysis/
    └── page.tsx                         # Dedicated Analytics Dashboard Route (/data-analysis)
        ├── DashboardNavbar.tsx          # Dedicated header with Back to Portfolio, Theme, i18n
        ├── DatasetSelector.tsx          # Segmented control: [Público e-commerce] | [Hospital-patients]
        │
        ├── ECommerceDashboard/          # Active when Dataset = 'ecommerce'
        │   ├── ECommerceKPIs.tsx        # Revenue, Profit, Margin %, Units, AOV
        │   ├── ECommerceFilters.tsx     # Category, Region, Ship Mode, Year selects + Reset button
        │   ├── ECommerceCharts.tsx      # Monthly Timeline, Category Bar, Regional Map/Bar, Ship Donut
        │   └── ECommerceTable.tsx       # Paginated sortable order records
        │
        └── HospitalDashboard/           # Active when Dataset = 'hospital'
            ├── HospitalKPIs.tsx         # Admissions, Avg LOS, Billing, Coverage %, Outstanding
            ├── HospitalFilters.tsx      # Department, Payment Status, Gender, Age Group + Reset
            ├── HospitalCharts.tsx       # Dept Volume & LOS, Financial Comparison, Demographics, Payment Status
            └── HospitalTable.tsx        # Paginated sortable patient records
```

---

## 3. Data Flow Architecture

```
Raw Excel Workbooks (public/*.xlsx)
         │
         ▼ (Build/Sync Script: scripts/sync-datasets.ts)
Normalized JSON Data (data/*.json)
         │
         ▼ (Client Import & Typing)
useDashboardAnalytics Hook (Immutable React State)
         │
   ┌─────┴─────────────────────────┐
   ▼                               ▼
Active Filter Pipeline          Dataset Switching Guard
   │                               │ (Clears active filters &
   ▼ (Pure useMemo Reduction)      │  resets table pagination)
Derived Metrics & Aggregations     │
   ├── Recalculated KPI Values     │
   ├── Grouped Chart Series        │
   └── Filtered/Sorted Table Rows  ▼
         │                 Isolated Target View
         └─────────────────────────┘
```
