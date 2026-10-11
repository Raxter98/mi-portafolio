# Phase 1: Data Model & Schema Definitions (Interactive Data Analysis & Visualization)

**Feature Directory**: `specs/004-interactive-data-analysis`  
**Date**: 2026-10-11  
**Status**: Complete  

---

## 1. Domain Entities

### Entity 1: ECommerceOrder
Represents a commercial order transaction record sourced from `public/E-Commerce-orders.xlsx` (sheet `'E-Commerce Orders'`).

* **Fields**:
  * `orderId`: Unique order identifier (e.g. `"ORD-10001"`). Format: `/^ORD-\d{5}$/`.
  * `orderDate`: Calendar date string in ISO format (e.g. `"2024-07-03"`). Converted from Excel serial date.
  * `customerName`: Full customer name (e.g. `"Betty Miller"`).
  * `region`: Geographic sales territory (`"Central" | "North" | "South" | "East" | "West"`).
  * `productName`: Commercial name of the item sold (50 distinct items, e.g. `"Portable Charger"`).
  * `category`: Product market category (`"Beauty" | "Sports" | "Home" | "Clothing" | "Electronics"`).
  * `quantity`: Units purchased (integer $1$ to $5$).
  * `unitPrice`: Base price per unit in USD ($7.17$ to $149.78$).
  * `discountPercent`: Applied discount rate ($0, 5, 10, 15, 20, 25$).
  * `totalRevenue`: Net transaction total in USD. Verified formula: $\text{Quantity} \times \text{UnitPrice} \times (1 - \text{Discount}/100)$.
  * `profit`: Net dollar profit on the sale ($1.83$ to $166.62$).
  * `shipMode`: Delivery logistics speed (`"Standard" | "Express" | "Same Day"`).

---

### Entity 2: HospitalPatient
Represents a clinical inpatient hospital admission record sourced from `public/Hospital-Patients.xlsx` (sheet `'Hospital Patients'`).

* **Fields**:
  * `patientId`: Unique patient identifier (e.g. `"PAT-3001"`). Format: `/^PAT-\d{4}$/`.
  * `patientName`: Patient full name (e.g. `"Thomas Martin"`).
  * `age`: Patient age in years (integer $1$ to $85$).
  * `gender`: Clinical sex (`"Female" | "Male"`).
  * `admissionDate`: Inpatient admission date in ISO format (e.g. `"2024-07-15"`).
  * `dischargeDate`: Inpatient discharge date in ISO format (e.g. `"2024-07-23"`).
  * `lengthOfStayDays`: Duration of inpatient stay in days (integer $1$ to $14$). Verified formula: $\text{Discharge Date} - \text{Admission Date}$.
  * `department`: Medical specialty ward (`"General" | "Emergency" | "Orthopedics" | "Pediatrics" | "Cardiology" | "Neurology"`).
  * `diagnosis`: Specific clinical diagnosis (38 distinct classifications, e.g. `"Atrial Fibrillation"`, `"Hip Fracture"`).
  * `totalBillAmount`: Total gross hospital invoice in USD ($534.38$ to $38,501.90$).
  * `insuranceCoveragePercent`: Insurer coverage percentage ($0, 50, 60, 70, 80, 90, 100$).
  * `coveredAmount`: Estimated dollar amount covered by insurance. Formula: $\text{TotalBill} \times (\text{Coverage} / 100)$.
  * `outOfPocketAmount`: Estimated patient direct obligation. Formula: $\text{TotalBill} \times (1 - \text{Coverage} / 100)$.
  * `paymentStatus`: Invoice settlement status (`"Paid" | "Pending" | "Partially Paid"`).

---

### Entity 3: DashboardKPI
Represents a computed analytical metric card.

* **Fields**:
  * `id`: Metric identifier string (e.g. `"total_revenue"`, `"avg_los"`).
  * `titleKey`: Translation dictionary key path.
  * `value`: Formatted string or numeric value.
  * `rawNumericValue`: Unformatted numeric value for sorting/comparisons.
  * `format`: Display format type (`"currency" | "number" | "percentage" | "days"`).
  * `subtitleKey`: Optional explanation or formula indicator.
  * `icon`: Lucide icon identifier.

---

### Entity 4: FilterState & Aggregations

#### ECommerceFilterState
* `category`: `"all" | "Beauty" | "Sports" | "Home" | "Clothing" | "Electronics"`
* `region`: `"all" | "Central" | "North" | "South" | "East" | "West"`
* `shipMode`: `"all" | "Standard" | "Express" | "Same Day"`
* `year`: `"all" | "2024" | "2025"`

#### HospitalFilterState
* `department`: `"all" | "General" | "Emergency" | "Orthopedics" | "Pediatrics" | "Cardiology" | "Neurology"`
* `paymentStatus`: `"all" | "Paid" | "Pending" | "Partially Paid"`
* `gender`: `"all" | "Female" | "Male"`
* `ageGroup`: `"all" | "pediatric" | "young_adult" | "middle_age" | "senior" | "elderly"`
  * Definitions:
    - `"pediatric"`: $\text{Age} < 18$
    - `"young_adult"`: $18 \le \text{Age} \le 35$
    - `"middle_age"`: $36 \le \text{Age} \le 55$
    - `"senior"`: $56 \le \text{Age} \le 70$
    - `"elderly"`: $\text{Age} \ge 71$

---

## 2. Derived Metrics & Mathematical Formulas

| Metric Name | Dataset | Mathematical Formula | Baseline Unfiltered Value |
|---|---|---|---|
| **Total Revenue** | E-Commerce | $\sum_{i=1}^N \text{totalRevenue}_i$ | $\$90,201.27$ |
| **Total Profit** | E-Commerce | $\sum_{i=1}^N \text{profit}_i$ | $\$28,153.38$ |
| **Profit Margin %** | E-Commerce | $\frac{\sum \text{profit}}{\sum \text{totalRevenue}} \times 100$ | $31.2\%$ |
| **Total Units Sold** | E-Commerce | $\sum_{i=1}^N \text{quantity}_i$ | $2,030$ units |
| **Average Order Value (AOV)** | E-Commerce | $\frac{\sum \text{totalRevenue}}{N}$ | $\$90.20$ |
| **Total Admissions** | Hospital | $N$ (Total patient records) | $1,000$ admissions |
| **Average Length of Stay (LOS)** | Hospital | $\frac{1}{N} \sum_{i=1}^N (\text{dischargeDate}_i - \text{admissionDate}_i)$ | $4.81$ days |
| **Total Hospital Billing** | Hospital | $\sum_{i=1}^N \text{totalBillAmount}_i$ | $\$8,053,143.03$ |
| **Average Insurance Coverage %** | Hospital | $\frac{1}{N} \sum_{i=1}^N \text{insuranceCoveragePercent}_i$ | $74.9\%$ |
| **Outstanding Balance** | Hospital | $\sum_{i \in \text{Pending} \cup \text{Partially Paid}} \text{totalBillAmount}_i$ | $\$2,042,437.89$ |

---

## 3. TypeScript Interfaces (`types/data-analysis.ts`)

```typescript
export type DatasetId = "ecommerce" | "hospital";

export type ECommerceCategory = "Beauty" | "Sports" | "Home" | "Clothing" | "Electronics";
export type ECommerceRegion = "Central" | "North" | "South" | "East" | "West";
export type ECommerceShipMode = "Standard" | "Express" | "Same Day";

export interface ECommerceOrder {
  orderId: string;
  orderDate: string; // ISO YYYY-MM-DD
  customerName: string;
  region: ECommerceRegion;
  productName: string;
  category: ECommerceCategory;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  totalRevenue: number;
  profit: number;
  shipMode: ECommerceShipMode;
}

export type HospitalDepartment =
  | "General"
  | "Emergency"
  | "Orthopedics"
  | "Pediatrics"
  | "Cardiology"
  | "Neurology";

export type HospitalGender = "Female" | "Male";
export type HospitalPaymentStatus = "Paid" | "Pending" | "Partially Paid";
export type HospitalAgeGroup = "all" | "pediatric" | "young_adult" | "middle_age" | "senior" | "elderly";

export interface HospitalPatient {
  patientId: string;
  patientName: string;
  age: number;
  gender: HospitalGender;
  admissionDate: string; // ISO YYYY-MM-DD
  dischargeDate: string; // ISO YYYY-MM-DD
  lengthOfStayDays: number;
  department: HospitalDepartment;
  diagnosis: string;
  totalBillAmount: number;
  insuranceCoveragePercent: number;
  coveredAmount: number;
  outOfPocketAmount: number;
  paymentStatus: HospitalPaymentStatus;
}

export interface ECommerceFilterState {
  category: ECommerceCategory | "all";
  region: ECommerceRegion | "all";
  shipMode: ECommerceShipMode | "all";
  year: "2024" | "2025" | "all";
}

export interface HospitalFilterState {
  department: HospitalDepartment | "all";
  paymentStatus: HospitalPaymentStatus | "all";
  gender: HospitalGender | "all";
  ageGroup: HospitalAgeGroup;
}

export interface DashboardKPICard {
  id: string;
  titleKey: string;
  value: string;
  rawNumericValue: number;
  format: "currency" | "number" | "percentage" | "days";
  subtitleKey?: string;
  iconName: string;
}

export interface SortConfig<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
```

---

## 4. Validation & Sanitization Rules

1. **Excel Serial Date Conversion**:
   - Dates stored as serial integers $S$ must be converted using the formula:
     $$\text{Days since } 1899\text{-}12\text{-}30 = S$$
   - Format resulting dates into zero-padded ISO strings `YYYY-MM-DD`.
   - Reject any serial $< 40,000$ or $> 60,000$ as out-of-bounds.
2. **Monetary Precision**:
   - Currency numbers must be rounded to exactly 2 decimal places: `Number(val.toFixed(2))`.
   - Percentages rounded to 1 decimal place.
3. **Data Completeness Gate**:
   - Both datasets must contain exactly 1,000 validated records with zero empty/null required fields.
