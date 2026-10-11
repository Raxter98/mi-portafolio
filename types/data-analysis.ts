/**
 * TypeScript Data Models and Interfaces for Interactive Data Analysis & Visualization
 */

export type DatasetId = "ecommerce" | "hospital";

export type ECommerceCategory =
  | "Beauty"
  | "Sports"
  | "Home"
  | "Clothing"
  | "Electronics";

export type ECommerceRegion =
  | "Central"
  | "North"
  | "South"
  | "East"
  | "West";

export type ECommerceShipMode =
  | "Standard"
  | "Express"
  | "Same Day";

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

export type HospitalAgeGroup =
  | "all"
  | "pediatric"
  | "young_adult"
  | "middle_age"
  | "senior"
  | "elderly";

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
