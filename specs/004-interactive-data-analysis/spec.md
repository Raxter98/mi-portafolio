# Feature Specification: Interactive Data Analysis and Visualization

**Feature Branch / Directory**: `specs/004-interactive-data-analysis`

**Created**: 2026-10-11

**Status**: Draft

**Input**: User description: "/speckit-specify Create a specification for a new feature in my existing personal portfolio website. Feature name: Interactive Data Analysis and Visualization. Add a new section to the existing portfolio homepage introducing an interactive data analysis and visualization project with a looping video animation. Navigate to a dedicated page with two selectable datasets: 'Público e-commerce' and 'Hospital-patients'. Display dataset-specific KPIs, interactive charts, multi-filtering, data tables, and ensure complete bilingual i18n and accessibility."

---

## 1. Executive Summary & Architecture Fit

This feature introduces an interactive Data Analysis and Visualization showcase to Marcos Valero's personal portfolio. As a Multimedia Computer Engineer, this addition complements software engineering and multimedia production by demonstrating data engineering, business intelligence, analytical computation, and responsive visualization capabilities.

The feature consists of two complementary user touchpoints:
1. **Homepage Showcase Section (`#data-analysis`)**: A prominent, visually engaging section on the portfolio homepage featuring bilingual descriptions, a call-to-action button, and a dedicated container for an infinitely looping, muted video animation with accessible fallback and reduced-motion support.
2. **Dedicated Interactive Data Visualization Route (`/data-analysis`)**: An independent, dedicated route providing a full-width dashboard environment. Visitors can toggle between two distinct real-world datasets:
   - **Público e-commerce** (sourced from `public/E-Commerce-orders.xlsx`, sheet `'E-Commerce Orders'`)
   - **Hospital-patients** (sourced from `public/Hospital-Patients.xlsx`, sheet `'Hospital Patients'`)

Each dataset powers an isolated analytical experience featuring dynamic KPI cards, interactive multi-dimensional charts, combined multi-attribute filters with automatic recalculation, an accessible paginated data table, and a clean return navigation mechanism to the portfolio homepage.

All user-facing strings are 100% localized in both Spanish and English using the portfolio's established internationalization architecture (`locales/es.json` and `locales/en.json`).

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Homepage Showcase Section with Looping Animation (Priority: P1) 🎯 MVP

As a portfolio visitor (client, recruiter, or peer), I want to see a dedicated showcase section on the homepage introducing the Interactive Data Analysis and Visualization project with an eye-catching looping animation, so that I immediately understand the project scope and can navigate to the full interactive dashboard.

**Why this priority**: Serves as the primary entry point and discovery vehicle on the portfolio homepage, bridging visitors to the deep analytical experience.

**Independent Test**: Can be verified by loading the portfolio homepage (`/`), scrolling to the Data Analysis section, observing video playback with poster fallback, testing the CTA button to confirm navigation to `/data-analysis`, and toggling theme and language.

**Acceptance Scenarios**:

1. **Given** a visitor scrolling through the portfolio homepage, **When** they reach the Data Analysis section, **Then** they see the localized section title ("Análisis y visualización de datos" in ES / "Interactive Data Analysis and Visualization" in EN), introductory description, and a prominent call-to-action ("Explorar visualizaciones" / "Explore Visualizations").
2. **Given** a modern web browser, **When** the section enters the viewport, **Then** the preview video plays automatically, loops seamlessly, and remains muted by default without blocking page rendering or layout shifts.
3. **Given** a visitor with `prefers-reduced-motion: reduce` enabled in system settings, **When** viewing the section, **Then** autoplay is disabled and a high-resolution static poster image or paused preview is displayed instead.
4. **Given** a visitor clicking the primary CTA button or video card, **When** activated, **Then** the application navigates smoothly to the dedicated visualization route (`/data-analysis`).
5. **Given** existing homepage sections (Hero, Experience, Software, Projects, Multimedia, Skills, Education, Contact), **When** the new section is rendered, **Then** all existing layout structures, responsive grids, and anchor navigation links remain fully functional.

---

### User Story 2 - Dedicated Visualization Route with Dataset Selector (Priority: P1) 🎯 MVP

As an analyst or recruiter visiting `/data-analysis`, I want an intuitive dataset selector that allows me to switch seamlessly between "Público e-commerce" and "Hospital-patients", so that I can independently inspect analytics for two distinct business domains without page reloads.

**Why this priority**: Logical separation and reliable dataset switching represent the structural foundation of the dedicated analytics workspace.

**Independent Test**: Can be tested by navigating directly to `/data-analysis`, clicking between dataset tabs, and verifying that the page header, KPIs, charts, filters, and data tables update immediately while retaining zero data residue from the previous dataset.

**Acceptance Scenarios**:

1. **Given** a visitor loading `/data-analysis`, **When** the page initializes, **Then** the default dataset ("Público e-commerce") is selected and visually highlighted with active states and accessible ARIA attributes.
2. **Given** an active dataset selection, **When** the visitor clicks the alternative dataset button ("Hospital-patients"), **Then** all visible KPI cards, charts, filters, and table rows transition to hospital clinical data within 200ms.
3. **Given** active filter selections applied to the current dataset, **When** switching to the alternative dataset, **Then** the filter state resets to default baseline for the incoming dataset, preventing cross-dataset metric contamination.
4. **Given** a visitor exploring `/data-analysis`, **When** clicking the "Volver al inicio" / "Back to Portfolio" navigation control, **Then** they are navigated back to the portfolio homepage.

---

### User Story 3 - "Público e-commerce" Interactive Analytics & KPI Recalculation (Priority: P2)

As a commercial analyst or hiring manager, I want to explore e-commerce sales performance, profitability trends, regional distributions, and product categories, so that I can evaluate commercial health and profit margins across 2024 and 2025.

**Why this priority**: Delivers core commercial business intelligence capabilities supported by 1,000 verified sales records across 12 structured dimensions.

**Independent Test**: Can be tested by selecting "Público e-commerce", observing baseline KPIs (Total Revenue, Total Profit, Profit Margin %, Total Units Sold, Average Order Value), filtering by Category ("Electronics") or Region ("West"), and verifying that all metrics, timelines, and distributions recalculate mathematically.

**Acceptance Scenarios**:

1. **Given** baseline e-commerce data (1,000 records), **When** no filters are active, **Then** the KPI cards display: Total Revenue (\$90,201.27), Total Profit (\$28,153.38), Overall Profit Margin (31.2%), Units Sold (2,030), and Average Order Value (\$90.20).
2. **Given** the monthly sales timeline chart, **When** inspecting data points from January 2024 to December 2025, **Then** monthly revenue and profit trends are clearly contrasted with responsive tooltips displaying exact monetary values.
3. **Given** the category breakdown chart, **When** rendered, **Then** revenue and unit volume are segmented across the 5 verified categories: Beauty, Sports, Home, Clothing, and Electronics.
4. **Given** the regional distribution chart, **When** rendered, **Then** sales share is compared across Central, North, South, East, and West regions.
5. **Given** the shipping mode breakdown, **When** viewed, **Then** orders are categorized across Standard, Express, and Same Day delivery methods.

---

### User Story 4 - "Hospital-patients" Clinical Operations & Financial Breakdown (Priority: P2)

As a healthcare manager or data reviewer, I want to analyze patient demographics, length of stay, clinical department volumes, and billing/insurance coverage, so that I can understand clinical utilization and financial outstanding balances.

**Why this priority**: Demonstrates healthcare data analysis and multi-variable clinical metrics across 1,000 verified inpatient records.

**Independent Test**: Can be tested by selecting "Hospital-patients", inspecting department admissions, average length of stay (LOS), billing totals, and filtering by Department ("Cardiology") or Payment Status ("Pending") to verify synchronized KPI updates.

**Acceptance Scenarios**:

1. **Given** baseline hospital data (1,000 records), **When** no filters are active, **Then** the KPI cards display: Total Admissions (1,000), Average Length of Stay (4.81 days), Total Hospital Billing (\$8,053,143.03), Average Insurance Coverage (74.9%), and Total Pending/Unpaid Balance (\$2,042,437.89).
2. **Given** the department volume and LOS chart, **When** viewed, **Then** each department (General, Emergency, Orthopedics, Pediatrics, Cardiology, Neurology) displays its patient volume alongside its corresponding average stay duration.
3. **Given** the financial comparison chart, **When** rendered, **Then** total billing amounts are visually compared against covered insurance amounts and out-of-pocket patient responsibility per department.
4. **Given** the patient demographic charts, **When** inspected, **Then** patients are categorized by gender (512 Female, 488 Male) and age brackets (0-17, 18-35, 36-55, 56-70, 71+).
5. **Given** the payment status breakdown, **When** viewed, **Then** distribution across Paid (564), Pending (257), and Partially Paid (179) records is displayed with corresponding percentages.

---

### User Story 5 - Multi-Filter Engine, Sorting, Pagination & Filter Reset (Priority: P3)

As an interactive dashboard user, I want multi-criteria filter controls (dropdowns/selects, date spans), sortable table columns, and pagination, with a one-click filter reset button, so that I can isolate micro-segments of data effortlessly.

**Why this priority**: Interactivity distinguishes real analytical dashboards from static infographics, giving visitors tactile control over the data.

**Independent Test**: Applying combined filters (e.g. Region = "North" + Category = "Beauty" + Ship Mode = "Express"), verifying table row count and KPI recalculations, sorting by "Total Revenue" descending, paging forward, and clicking "Reset Filters" to return to baseline state.

**Acceptance Scenarios**:

1. **Given** active filter controls, **When** a user selects one or more filter criteria, **Then** all KPI cards, charts, and table rows update simultaneously based on the intersection (logical AND) of all active filters.
2. **Given** an active filter combination, **When** clicking column headers in the data table (e.g., Order Date, Revenue, Patient Age, Bill Amount), **Then** rows sort alternately in ascending and descending order.
3. **Given** a filtered dataset exceeding page size (e.g., 20 rows per page), **When** clicking pagination buttons, **Then** the table navigates between pages smoothly while preserving sort order and filter state.
4. **Given** any combination of active filters, **When** clicking "Limpiar filtros" / "Reset Filters", **Then** all filter selectors reset to "All" / baseline values, and the dashboard displays full dataset totals.
5. **Given** a filter combination yielding zero matching records, **When** rendered, **Then** the dashboard displays an informative empty state ("No se encontraron registros para los filtros seleccionados") with an actionable button to reset filters.

---

### User Story 6 - Bilingual Internationalization & WCAG 2.2 AA Accessibility (Priority: P4)

As an international recruiter or visitor using assistive technologies, I want all titles, chart tooltips, table headers, KPI labels, filter placeholders, and status indicators localized in Spanish and English with keyboard navigation and high-contrast styling.

**Why this priority**: Compliance with the Portfolio Constitution (Principles 4, 5, and 6) and global readability standards.

**Independent Test**: Running the bilingual key parity check between `locales/es.json` and `locales/en.json`, navigating the dashboard using keyboard only (`Tab`, `Shift+Tab`, `Enter`, `Space`), and validating screen reader announcements.

**Acceptance Scenarios**:

1. **Given** the language switcher set to Spanish or English, **When** viewing the homepage section or `/data-analysis` page, **Then** 100% of text elements render in the selected language without untranslated fallback strings.
2. **Given** keyboard navigation, **When** pressing `Tab`, **Then** focus moves sequentially through dataset tabs, filter selects, chart tooltips/focus points, table sort headers, pagination controls, and return buttons with high-visibility focus rings.
3. **Given** color vision deficiency or high-contrast settings, **When** viewing charts, **Then** visual distinctions do not rely solely on color hue; patterns, borders, explicit data labels, and tooltips provide clear quantitative differentiation.

---

### Edge Cases

- **Filter Combination Yields Zero Records**: When an improbable combination is selected (e.g., Department = "Neurology" + Age < 18 + Status = "Partially Paid" if no records match), the system MUST display a clear empty state with an immediate "Restablecer filtros" / "Reset Filters" action, rather than crashing or displaying `NaN` / `undefined` in KPI cards.
- **Video Playback Failure / Blocked Media**: If the video asset is missing, network is throttled, or autoplay policy blocks video playback, the container MUST display a styled fallback poster card with a subtle data-themed animated gradient or graphic placeholder.
- **Reduced Motion Settings**: If the user's OS has `prefers-reduced-motion: reduce`, the homepage preview video MUST pause automatically or render a static poster, and chart animation transitions MUST be instant (0ms duration).
- **Extreme Display Dimensions**: On mobile screens ($320\text{px}-420\text{px}$), complex charts must remain readable via horizontal scroll wrappers or stacked responsive views, and data tables must provide horizontal scrolling with fixed column headers rather than causing page-level layout blowout.
- **Dataset Switching Mid-Session**: When switching from E-Commerce to Hospital Patients while filters are active, any lingering filter criteria (such as Category or Region) MUST NOT be carried over to the incoming dataset.
- **Data Integrity and Malformed Inputs**: Data normalization must validate numbers, dates, and non-empty strings. Any unexpected `null` or invalid numeric string must gracefully fallback to zero or "N/A" without halting the rendering engine.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

#### Homepage Section (`#data-analysis`)
- **FR-001**: System MUST render a dedicated Data Analysis section on the homepage (`app/page.tsx`), anchored with `id="data-analysis"`.
- **FR-002**: Section MUST display localized title (`t.dataAnalysis.title`), subtitle/description (`t.dataAnalysis.description`), and badge indicator.
- **FR-003**: Suggested Spanish title MUST be `"Análisis y visualización de datos"` and description MUST be `"Explora conjuntos de datos mediante dashboards interactivos, indicadores y visualizaciones diseñadas para convertir datos en información comprensible."`.
- **FR-004**: Section MUST provide a primary call-to-action button with localized text `"Explorar visualizaciones"` (ES) / `"Explore Visualizations"` (EN) that navigates to `/data-analysis`.
- **FR-005**: Section MUST feature a dedicated video container configured for an infinitely looping preview animation (`autoplay`, `loop`, `muted`, `playsInline`).
- **FR-006**: Video component MUST support a configurable asset path (via configuration constant or component prop, e.g. `/videos/data-preview.mp4`) with an image poster fallback (e.g. `/images/data-preview-poster.webp`).
- **FR-007**: Video container MUST respect `prefers-reduced-motion: reduce`, pausing playback or displaying the static poster when enabled.
- **FR-008**: Section MUST maintain full responsiveness, keyboard accessibility, visible focus indicators, and visual cohesion with the portfolio's zinc/red design system.

#### Dedicated Route (`/data-analysis`)
- **FR-009**: System MUST provide an independently accessible Next.js route at `/data-analysis` with server-side layout wrapping and localized document metadata.
- **FR-010**: Page MUST render a navigation header featuring a "Volver al inicio" / "Back to Portfolio" link returning to `/` or `/#data-analysis`, alongside the language and theme toggles.
- **FR-011**: Page MUST render an introductory header with a title, descriptive summary, and data source disclosure.
- **FR-012**: Page MUST provide a segmented dataset selector allowing toggle between `"Público e-commerce"` and `"Hospital-patients"`.
- **FR-013**: Active dataset selection MUST be visually distinct and communicated semantically via ARIA attributes (`role="tab"`, `aria-selected="true"`).
- **FR-014**: System MUST ensure complete logical separation between datasets: toggling between datasets MUST clear active filters and re-render only the relevant KPIs, charts, and table columns.
- **FR-015**: System MUST provide loading, empty, and error fallback states for all dashboard components.

#### Dataset Integrity & Data Handling
- **FR-016**: System MUST source data exclusively from verified repository assets:
  - Dataset 1: `public/E-Commerce-orders.xlsx` (Worksheet: `'E-Commerce Orders'`)
  - Dataset 2: `public/Hospital-Patients.xlsx` (Worksheet: `'Hospital Patients'`)
- **FR-017**: System MUST NOT invent columns, synthesize fake records, or hardcode fictional KPI values.
- **FR-018**: Date fields stored as Excel serial integers (e.g. `45292` through `46025`) MUST be parsed into standardized ISO calendar dates (`YYYY-MM-DD`) based on the 1900 date system (offset: December 30, 1899).
- **FR-019**: All numeric strings for monetary values and percentages MUST be parsed safely into floating-point numbers with rounding to 2 decimal places for currency and 1 decimal place for percentages.
- **FR-020**: System MUST validate records upon ingestion: any record with missing mandatory fields or invalid dates MUST be flagged or filtered safely without crashing the dashboard.
- **FR-021**: System MUST explicitly document that files bundled in `public/` are publicly accessible static assets, confirming that all records contain synthetic, non-confidential sample data.
- **FR-022**: Architecture MUST strictly separate data extraction/normalization, analytical calculation engines, and presentation components.
- **FR-023**: Dashboard computations MUST execute immutably: filtering operations MUST produce derived subsets without altering raw cached dataset collections.

#### E-Commerce Dashboard Capabilities
- **FR-024**: E-Commerce dashboard MUST calculate and display 5 dynamic KPI cards:
  - **Total Revenue**: Sum of `Total Revenue` ($\sum \text{Total Revenue}$)
  - **Total Profit**: Sum of `Profit` ($\sum \text{Profit}$)
  - **Profit Margin %**: $(\sum \text{Profit} / \sum \text{Total Revenue}) \times 100$
  - **Total Units Sold**: Sum of `Quantity` ($\sum \text{Quantity}$)
  - **Average Order Value (AOV)**: $\sum \text{Total Revenue} / \text{Order Count}$
- **FR-025**: E-Commerce dashboard MUST render a **Monthly Revenue & Profit Timeline** chart grouping records by year-month (`YYYY-MM`) across 2024–2025.
- **FR-026**: E-Commerce dashboard MUST render a **Revenue by Product Category** chart comparing sales across Beauty, Sports, Home, Clothing, and Electronics.
- **FR-027**: E-Commerce dashboard MUST render a **Regional Distribution** chart comparing Central, North, South, East, and West performance.
- **FR-028**: E-Commerce dashboard MUST render a **Shipping Mode Distribution** chart comparing Standard, Express, and Same Day orders.
- **FR-029**: E-Commerce dashboard MUST provide multi-filter selectors for:
  - Category (All, Beauty, Sports, Home, Clothing, Electronics)
  - Region (All, Central, North, South, East, West)
  - Ship Mode (All, Standard, Express, Same Day)
  - Year / Date Range (All, 2024, 2025)
- **FR-030**: E-Commerce dashboard MUST render an interactive data table with columns: `Order ID`, `Date`, `Customer`, `Region`, `Product`, `Category`, `Qty`, `Unit Price`, `Discount`, `Revenue`, `Profit`, `Ship Mode`, with ascending/descending sorting and pagination (10/20/50 rows per page).

#### Hospital Patients Dashboard Capabilities
- **FR-031**: Hospital dashboard MUST calculate and display 5 dynamic KPI cards:
  - **Total Admissions**: Count of patient records ($N$)
  - **Average Length of Stay (LOS)**: Average of $(\text{Discharge Date} - \text{Admission Date})$ in days
  - **Total Hospital Billing**: Sum of `Total Bill Amount` ($\sum \text{Total Bill Amount}$)
  - **Average Insurance Coverage %**: Average of `Insurance Coverage %`
  - **Outstanding / Pending Balance**: Sum of `Total Bill Amount` for patients with `Payment Status` $\in \{\text{"Pending"}, \text{"Partially Paid"}\}$
- **FR-032**: Hospital dashboard MUST render an **Admissions & Avg LOS by Department** chart comparing General, Emergency, Orthopedics, Pediatrics, Cardiology, and Neurology.
- **FR-033**: Hospital dashboard MUST render a **Financial Comparison by Department** chart showing Total Billing alongside estimated Insurance Coverage versus Patient Out-of-Pocket share.
- **FR-034**: Hospital dashboard MUST render an **Age Demographic Distribution** chart grouping patients into brackets: Pediatric ($<18$), Young Adult ($18-35$), Middle Age ($36-55$), Senior ($56-70$), and Elderly ($71+$).
- **FR-035**: Hospital dashboard MUST render a **Payment Status Breakdown** chart comparing Paid, Pending, and Partially Paid distributions.
- **FR-036**: Hospital dashboard MUST provide multi-filter selectors for:
  - Department (All, General, Emergency, Orthopedics, Pediatrics, Cardiology, Neurology)
  - Payment Status (All, Paid, Pending, Partially Paid)
  - Gender (All, Female, Male)
  - Age Group (All, $<18$, $18-35$, $36-55$, $56-70$, $71+$)
- **FR-037**: Hospital dashboard MUST render an interactive data table with columns: `Patient ID`, `Patient Name`, `Age`, `Gender`, `Admission`, `Discharge`, `LOS (days)`, `Department`, `Diagnosis`, `Total Bill`, `Coverage %`, `Status`, with sorting and pagination.

#### Interactivity & State Management
- **FR-038**: Modifying any filter MUST reactively recalculate all visible KPI cards, update chart series distributions, and filter table rows in real time.
- **FR-039**: System MUST provide a prominent "Limpiar filtros" / "Reset Filters" button that clears all active filters to baseline.
- **FR-040**: Filtering operations MUST execute efficiently in the client without page stuttering or UI blocking.
- **FR-041**: All charts MUST display interactive tooltips upon hover/touch with formatted numeric/currency values.
- **FR-042**: All charts MUST include clear legends identifying series and color codes.

#### Internationalization & Accessibility
- **FR-043**: 100% of user-facing strings (section titles, CTA labels, dataset names, KPI titles, chart labels, filter options, table headers, empty states, error messages) MUST be stored in `locales/es.json` and `locales/en.json`.
- **FR-044**: Monetary values MUST be formatted using standard currency formatting (`$XX,XXX.XX`).
- **FR-045**: Dates MUST be formatted using locale-aware conventions (`DD/MM/YYYY` in ES, `MM/DD/YYYY` in EN).
- **FR-046**: All interactive buttons, tabs, select menus, and table headers MUST feature visible focus indicators meeting WCAG 2.2 AA contrast requirements ($> 3:1$ for UI controls, $> 4.5:1$ for text).
- **FR-047**: Data tables MUST use semantic HTML elements (`<table>`, `<thead>`, `<th>`, `<tbody>`, `<tr>`, `<td>`) with appropriate `scope="col"` attributes and accessible labels for sorting actions.
- **FR-048**: Charts MUST include accessible alternative text descriptions or accessible summary tables for screen reader users.

---

### Key Entities

- **DatasetId**: `'ecommerce' | 'hospital'`
  * Unique identifier distinguishing the two isolated analytical domains.

- **ECommerceRecord**:
  * `orderId`: string (Format: `ORD-XXXXX`)
  * `orderDate`: string (ISO `YYYY-MM-DD`)
  * `customerName`: string
  * `region`: `'Central' | 'North' | 'South' | 'East' | 'West'`
  * `productName`: string
  * `category`: `'Beauty' | 'Sports' | 'Home' | 'Clothing' | 'Electronics'`
  * `quantity`: number (integer $1$ to $5$)
  * `unitPrice`: number
  * `discountPercent`: number ($0, 5, 10, 15, 20, 25$)
  * `totalRevenue`: number ($Quantity \times UnitPrice \times (1 - Discount/100)$)
  * `profit`: number
  * `shipMode`: `'Standard' | 'Express' | 'Same Day'`

- **HospitalPatientRecord**:
  * `patientId`: string (Format: `PAT-XXXX`)
  * `patientName`: string
  * `age`: number (integer $1$ to $85$)
  * `gender`: `'Female' | 'Male'`
  * `admissionDate`: string (ISO `YYYY-MM-DD`)
  * `dischargeDate`: string (ISO `YYYY-MM-DD`)
  * `lengthOfStayDays`: number (integer $1$ to $14$, computed as `dischargeDate - admissionDate`)
  * `department`: `'General' | 'Emergency' | 'Orthopedics' | 'Pediatrics' | 'Cardiology' | 'Neurology'`
  * `diagnosis`: string (38 distinct clinical classifications)
  * `totalBillAmount`: number
  * `insuranceCoveragePercent`: number ($0, 50, 60, 70, 80, 90, 100$)
  * `coveredAmount`: number ($TotalBill \times (Coverage / 100)$)
  * `outOfPocketAmount`: number ($TotalBill \times (1 - Coverage / 100)$)
  * `paymentStatus`: `'Paid' | 'Pending' | 'Partially Paid'`

- **DashboardKPICard**:
  * `id`: string
  * `labelKey`: string (i18n key)
  * `value`: string | number
  * `format`: `'currency' | 'number' | 'percentage' | 'days'`
  * `helperKey`: string (optional i18n description or formula hint)
  * `icon`: string (Lucide icon identifier)

- **FilterState**:
  * `ecommerce`:
    - `category`: string | `'all'`
    - `region`: string | `'all'`
    - `shipMode`: string | `'all'`
    - `year`: string | `'all'`
  * `hospital`:
    - `department`: string | `'all'`
    - `paymentStatus`: string | `'all'`
    - `gender`: string | `'all'`
    - `ageGroup`: string | `'all'`

---

## 4. Dataset Discovery & Schema Findings

A direct inspection of the physical Excel workbooks present in `public/` was conducted to establish verified schemas, actual worksheet names, and empirical distributions:

### Dataset 1: E-Commerce Orders
- **File path**: `public/E-Commerce-orders.xlsx`
- **Worksheet name**: `'E-Commerce Orders'` (Sheet ID: 1)
- **Record count**: 1,000 order records (Row 2 through Row 1001)
- **Null values**: 0 missing fields across all 12 columns ($100\%$ completeness).
- **Column Schema & Verified Types**:
  1. `Order ID` (Col A): string, unique identifiers (`ORD-10001` to `ORD-11000`).
  2. `Order Date` (Col B): Excel date serial, range $45,292$ to $46,021$ $\rightarrow$ **2024-01-01 to 2025-12-30** (536 distinct dates).
  3. `Customer Name` (Col C): string, 674 distinct customer names.
  4. `Region` (Col D): string, 5 distinct regions:
     - Central: 215 orders ($21.5\%$)
     - North: 206 orders ($20.6\%$)
     - South: 203 orders ($20.3\%$)
     - East: 195 orders ($19.5\%$)
     - West: 181 orders ($18.1\%$)
  5. `Product Name` (Col E): string, 50 distinct consumer products.
  6. `Category` (Col F): string, 5 distinct categories:
     - Beauty: 232 orders ($23.2\%$)
     - Sports: 213 orders ($21.3\%$)
     - Home: 196 orders ($19.6\%$)
     - Clothing: 192 orders ($19.2\%$)
     - Electronics: 167 orders ($16.7\%$)
  7. `Quantity` (Col G): integer, min $1$, max $5$, average $2.03$.
  8. `Unit Price` (Col H): numeric float, min $\$7.17$, max $\$149.78$, average $\$48.11$.
  9. `Discount %` (Col I): integer percentage ($0\%, 5\%, 10\%, 15\%, 20\%, 25\%$), average $7.87\%$.
  10. `Total Revenue` (Col J): numeric float, min $\$6.43$, max $\$619.75$, total sum $\$90,201.27$, average $\$90.20$.
      * *Formula verified*: $\text{Total Revenue} = \text{Quantity} \times \text{Unit Price} \times (1 - \text{Discount}/100)$.
  11. `Profit` (Col K): numeric float, min $\$1.83$, max $\$166.62$, total sum $\$28,153.38$, average $\$28.15$.
      * *Profit margin*: Overall profit margin is $31.2\%$.
  12. `Ship Mode` (Col L): string, 3 distinct options:
      - Standard: 554 orders ($55.4\%$)
      - Express: 353 orders ($35.3\%$)
      - Same Day: 93 orders ($9.3\%$)

### Dataset 2: Hospital Patients
- **File path**: `public/Hospital-Patients.xlsx`
- **Worksheet name**: `'Hospital Patients'` (Sheet ID: 1)
- **Record count**: 1,000 inpatient records (Row 2 through Row 1001)
- **Null values**: 0 missing fields across all 11 columns ($100\%$ completeness).
- **Column Schema & Verified Types**:
  1. `Patient ID` (Col A): string, unique identifiers (`PAT-3001` to `PAT-4000`).
  2. `Patient Name` (Col B): string, 684 distinct names.
  3. `Age` (Col C): integer, range $1$ to $85$ years old, average $46.07$ years.
  4. `Gender` (Col D): string, 2 categories:
     - Female: 512 patients ($51.2\%$)
     - Male: 488 patients ($48.8\%$)
  5. `Admission Date` (Col E): Excel serial, range $45,292$ to $46,019$ $\rightarrow$ **2024-01-01 to 2025-12-28**.
  6. `Discharge Date` (Col F): Excel serial, range $45,293$ to $46,025$ $\rightarrow$ **2024-01-02 to 2026-01-03**.
     * *Derived Metric (Length of Stay)*: $\text{Discharge Date} - \text{Admission Date}$. Range $1$ to $14$ days, average $4.81$ days. Zero negative durations.
  7. `Department` (Col G): string, 6 clinical departments:
     - General: 252 patients ($25.2\%$), Total Bill $\$993,026.92$, Avg Bill $\$3,940.58$
     - Emergency: 190 patients ($19.0\%$), Total Bill $\$622,525.28$, Avg Bill $\$3,276.45$
     - Orthopedics: 159 patients ($15.9\%$), Total Bill $\$2,553,862.32$, Avg Bill $\$16,062.03$
     - Pediatrics: 153 patients ($15.3\%$), Total Bill $\$572,987.96$, Avg Bill $\$3,745.02$
     - Cardiology: 152 patients ($15.2\%$), Total Bill $\$2,095,437.97$, Avg Bill $\$13,785.78$
     - Neurology: 94 patients ($9.4\%$), Total Bill $\$1,215,302.99$, Avg Bill $\$12,928.76$
  8. `Diagnosis` (Col H): string, 38 specific clinical conditions (e.g. Acute Appendicitis, Angina, Migraine, Hip Fracture, Atrial Fibrillation).
  9. `Total Bill Amount` (Col I): numeric float, range $\$534.38$ to $\$38,501.90$, total sum $\$8,053,143.03$, average $\$8,053.14$.
  10. `Insurance Coverage %` (Col J): numeric integer ($0\%, 50\%, 60\%, 70\%, 80\%, 90\%, 100\%$), average $74.86\%$.
  11. `Payment Status` (Col K): string, 3 categories:
      - Paid: 564 patients ($56.4\%$)
      - Pending: 257 patients ($25.7\%$)
      - Partially Paid: 179 patients ($17.9\%$)

### Data Integrity & Anonymity Disclosure
Both Excel files contain synthetic benchmarks without personal identifiable information (PII) or confidential patient records. Because the files are placed in `public/`, their contents are statically served and public.

---

## 5. Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of user-facing interface elements, KPI labels, filter controls, table headers, and error states are fully localized in Spanish (`locales/es.json`) and English (`locales/en.json`) with zero missing translation warnings.
- **SC-002**: Switching between datasets updates all visible KPIs, charts, and table rows in under 200 milliseconds without page refresh.
- **SC-003**: Applying or resetting filter combinations produces mathematically exact recalculations for all 5 KPI cards corresponding to the verified source data.
- **SC-004**: The homepage section loads without blocking initial page render, achieving a First Contentful Paint (FCP) and Largest Contentful Paint (LCP) impact of less than $0.1\text{s}$ change compared to baseline.
- **SC-005**: 100% of interactive controls (dataset selector, filter selects, table sort buttons, pagination controls, return navigation) are fully accessible via keyboard (`Tab`, `Space`, `Enter`) with visible focus rings.
- **SC-006**: The interactive visualization dashboard provides fluid responsiveness across mobile ($375\text{px}$), tablet ($768\text{px}$), and desktop ($1440\text{px}$) viewports without horizontal page overflow.
- **SC-007**: 0% data cross-contamination: selecting "Público e-commerce" displays zero patient or hospital metrics, and selecting "Hospital-patients" displays zero e-commerce orders or revenue metrics.
- **SC-008**: When `prefers-reduced-motion: reduce` is enabled, 100% of video animations are paused by default and chart render animations execute with 0ms transition delay.

---

## 6. Assumptions

1. **Static Data Ingestion**: The Excel files (`public/E-Commerce-orders.xlsx` and `public/Hospital-Patients.xlsx`) are static benchmark datasets (1,000 rows each). Rather than reading heavy `.xlsx` binary buffers dynamically in every visitor's client browser, data will be parsed during build or normalized into lightweight, typed JSON data files (or processed through a clean data access layer) to ensure fast initial page load.
2. **Video Asset Provisioning**: The final looping video file path is configurable (e.g. `/videos/data-preview.mp4`). A placeholder or fallback poster (e.g. `/images/data-preview-poster.webp` or existing video asset) will be supported gracefully until the user supplies the final video file.
3. **No External Backend or Database**: Since the datasets are static and read-only, all filtering, sorting, pagination, and KPI recalculations can be executed client-side without introducing an external server, database, or API layer.
4. **Design System Harmony**: The new homepage section and dedicated dashboard will reuse the portfolio's established Tailwind CSS palette (`zinc-900`/`zinc-950` dark backgrounds, white light backgrounds, `red-500`/`red-600` primary accents, Lucide React icons, and `LanguageContext` integration).
5. **Route Navigation**: A dedicated page route (`app/data-analysis/page.tsx` or `app/visualizaciones/page.tsx`) will be established using Next.js App Router conventions.
6. **Data Privacy**: All data within the Excel workbooks is synthetic sample data; no HIPAA or GDPR private data restrictions are violated by displaying these datasets.

---

## 7. Essential Decisions for Planning Phase (`/speckit-plan`)

Before executing `/speckit-plan`, the following architectural and implementation decisions are documented for resolution:

1. **Data Normalization Strategy**:
   - *Option A (Recommended)*: Pre-transform the two `.xlsx` sheets at build time into strongly typed static JSON files (`data/ecommerce-orders.json` and `data/hospital-patients.json`). This avoids bundling heavy xlsx parsers (e.g. `xlsx` or `exceljs`) into the client JavaScript bundle, guaranteeing blazing-fast loading and zero parsing latency.
   - *Option B*: Load the `.xlsx` files client-side using a dynamic import of a lightweight xlsx reader.
2. **Interactive Charting Engine**:
   - Evaluate whether to introduce a standard React charting library (such as `recharts`, `chart.js` with `react-chartjs-2`, or native responsive SVG charts) that meets strict bundle-size and Tailwind theme compatibility requirements.
3. **Route Slug**:
   - Standardize the URL route slug: `/data-analysis` (English convention consistent with codebase route naming) with bilingual internal presentation.
