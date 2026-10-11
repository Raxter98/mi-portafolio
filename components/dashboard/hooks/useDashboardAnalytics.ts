"use client";

import { useState, useMemo, useCallback } from "react";
import ecommerceDataRaw from "@/data/ecommerce-orders.json";
import hospitalDataRaw from "@/data/hospital-patients.json";
import {
  DatasetId,
  ECommerceOrder,
  HospitalPatient,
  ECommerceFilterState,
  HospitalFilterState,
  DashboardKPICard,
  SortConfig,
  PaginationConfig,
} from "@/types/data-analysis";

const initialEcommerceFilters: ECommerceFilterState = {
  category: "all",
  region: "all",
  shipMode: "all",
  year: "all",
};

const initialHospitalFilters: HospitalFilterState = {
  department: "all",
  paymentStatus: "all",
  gender: "all",
  ageGroup: "all",
};

export function useDashboardAnalytics() {
  const [activeDataset, setActiveDataset] = useState<DatasetId>("ecommerce");

  // E-Commerce State
  const [ecommerceFilters, setEcommerceFiltersState] = useState<ECommerceFilterState>(initialEcommerceFilters);
  const [ecommerceSort, setEcommerceSort] = useState<SortConfig<ECommerceOrder>>({
    key: "orderDate",
    direction: "desc",
  });
  const [ecommercePage, setEcommercePage] = useState<number>(1);
  const [ecommercePageSize] = useState<number>(15);

  // Hospital State
  const [hospitalFilters, setHospitalFiltersState] = useState<HospitalFilterState>(initialHospitalFilters);
  const [hospitalSort, setHospitalSort] = useState<SortConfig<HospitalPatient>>({
    key: "admissionDate",
    direction: "desc",
  });
  const [hospitalPage, setHospitalPage] = useState<number>(1);
  const [hospitalPageSize] = useState<number>(15);

  // Switch Dataset Guard (resets active filters and pages)
  const handleDatasetChange = useCallback((newDataset: DatasetId) => {
    setActiveDataset(newDataset);
    if (newDataset === "ecommerce") {
      setEcommerceFiltersState(initialEcommerceFilters);
      setEcommercePage(1);
    } else {
      setHospitalFiltersState(initialHospitalFilters);
      setHospitalPage(1);
    }
  }, []);

  // Set individual or partial filters
  const setEcommerceFilters = useCallback((updates: Partial<ECommerceFilterState>) => {
    setEcommerceFiltersState((prev) => ({ ...prev, ...updates }));
    setEcommercePage(1);
  }, []);

  const resetEcommerceFilters = useCallback(() => {
    setEcommerceFiltersState(initialEcommerceFilters);
    setEcommercePage(1);
  }, []);

  const setHospitalFilters = useCallback((updates: Partial<HospitalFilterState>) => {
    setHospitalFiltersState((prev) => ({ ...prev, ...updates }));
    setHospitalPage(1);
  }, []);

  const resetHospitalFilters = useCallback(() => {
    setHospitalFiltersState(initialHospitalFilters);
    setHospitalPage(1);
  }, []);

  // Filter E-Commerce Data
  const filteredEcommerceOrders = useMemo(() => {
    const list = ecommerceDataRaw as ECommerceOrder[];
    return list.filter((item) => {
      if (ecommerceFilters.category !== "all" && item.category !== ecommerceFilters.category) return false;
      if (ecommerceFilters.region !== "all" && item.region !== ecommerceFilters.region) return false;
      if (ecommerceFilters.shipMode !== "all" && item.shipMode !== ecommerceFilters.shipMode) return false;
      if (ecommerceFilters.year !== "all") {
        const itemYear = item.orderDate.slice(0, 4);
        if (itemYear !== ecommerceFilters.year) return false;
      }
      return true;
    });
  }, [ecommerceFilters]);

  // Sort E-Commerce Data
  const sortedEcommerceOrders = useMemo(() => {
    const sorted = [...filteredEcommerceOrders];
    sorted.sort((a, b) => {
      const aVal = a[ecommerceSort.key];
      const bVal = b[ecommerceSort.key];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return ecommerceSort.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      return ecommerceSort.direction === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    return sorted;
  }, [filteredEcommerceOrders, ecommerceSort]);

  // Paginated E-Commerce Slices
  const paginatedEcommerceOrders = useMemo(() => {
    const start = (ecommercePage - 1) * ecommercePageSize;
    return sortedEcommerceOrders.slice(start, start + ecommercePageSize);
  }, [sortedEcommerceOrders, ecommercePage, ecommercePageSize]);

  const ecommercePagination: PaginationConfig = useMemo(() => {
    const total = sortedEcommerceOrders.length;
    return {
      currentPage: ecommercePage,
      pageSize: ecommercePageSize,
      totalItems: total,
      totalPages: Math.max(1, Math.ceil(total / ecommercePageSize)),
    };
  }, [sortedEcommerceOrders.length, ecommercePage, ecommercePageSize]);

  // E-Commerce Computed KPIs
  const ecommerceKPIs: DashboardKPICard[] = useMemo(() => {
    const count = filteredEcommerceOrders.length;
    const revenue = filteredEcommerceOrders.reduce((acc, o) => acc + o.totalRevenue, 0);
    const profit = filteredEcommerceOrders.reduce((acc, o) => acc + o.profit, 0);
    const units = filteredEcommerceOrders.reduce((acc, o) => acc + o.quantity, 0);
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const aov = count > 0 ? revenue / count : 0;

    return [
      {
        id: "revenue",
        titleKey: "dataDashboard.ecommerce.kpis.revenue",
        value: `$${revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        rawNumericValue: revenue,
        format: "currency",
        iconName: "DollarSign",
      },
      {
        id: "profit",
        titleKey: "dataDashboard.ecommerce.kpis.profit",
        value: `$${profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        rawNumericValue: profit,
        format: "currency",
        iconName: "TrendingUp",
      },
      {
        id: "margin",
        titleKey: "dataDashboard.ecommerce.kpis.margin",
        value: `${margin.toFixed(1)}%`,
        rawNumericValue: margin,
        format: "percentage",
        iconName: "Percent",
      },
      {
        id: "units",
        titleKey: "dataDashboard.ecommerce.kpis.units",
        value: units.toLocaleString("en-US"),
        rawNumericValue: units,
        format: "number",
        iconName: "Package",
      },
      {
        id: "aov",
        titleKey: "dataDashboard.ecommerce.kpis.aov",
        value: `$${aov.toFixed(2)}`,
        rawNumericValue: aov,
        format: "currency",
        iconName: "ShoppingBag",
      },
    ];
  }, [filteredEcommerceOrders]);

  // Filter Hospital Data
  const filteredHospitalPatients = useMemo(() => {
    const list = hospitalDataRaw as HospitalPatient[];
    return list.filter((p) => {
      if (hospitalFilters.department !== "all" && p.department !== hospitalFilters.department) return false;
      if (hospitalFilters.paymentStatus !== "all" && p.paymentStatus !== hospitalFilters.paymentStatus) return false;
      if (hospitalFilters.gender !== "all" && p.gender !== hospitalFilters.gender) return false;
      if (hospitalFilters.ageGroup !== "all") {
        if (hospitalFilters.ageGroup === "pediatric" && p.age >= 18) return false;
        if (hospitalFilters.ageGroup === "young_adult" && (p.age < 18 || p.age > 35)) return false;
        if (hospitalFilters.ageGroup === "middle_age" && (p.age < 36 || p.age > 55)) return false;
        if (hospitalFilters.ageGroup === "senior" && (p.age < 56 || p.age > 70)) return false;
        if (hospitalFilters.ageGroup === "elderly" && p.age < 71) return false;
      }
      return true;
    });
  }, [hospitalFilters]);

  // Sort Hospital Data
  const sortedHospitalPatients = useMemo(() => {
    const sorted = [...filteredHospitalPatients];
    sorted.sort((a, b) => {
      const aVal = a[hospitalSort.key];
      const bVal = b[hospitalSort.key];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return hospitalSort.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal);
      const bStr = String(bVal);
      return hospitalSort.direction === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    return sorted;
  }, [filteredHospitalPatients, hospitalSort]);

  // Paginated Hospital Slices
  const paginatedHospitalPatients = useMemo(() => {
    const start = (hospitalPage - 1) * hospitalPageSize;
    return sortedHospitalPatients.slice(start, start + hospitalPageSize);
  }, [sortedHospitalPatients, hospitalPage, hospitalPageSize]);

  const hospitalPagination: PaginationConfig = useMemo(() => {
    const total = sortedHospitalPatients.length;
    return {
      currentPage: hospitalPage,
      pageSize: hospitalPageSize,
      totalItems: total,
      totalPages: Math.max(1, Math.ceil(total / hospitalPageSize)),
    };
  }, [sortedHospitalPatients.length, hospitalPage, hospitalPageSize]);

  // Hospital Computed KPIs
  const hospitalKPIs: DashboardKPICard[] = useMemo(() => {
    const count = filteredHospitalPatients.length;
    const totalLos = filteredHospitalPatients.reduce((acc, p) => acc + p.lengthOfStayDays, 0);
    const avgLos = count > 0 ? totalLos / count : 0;
    const totalBill = filteredHospitalPatients.reduce((acc, p) => acc + p.totalBillAmount, 0);
    const totalCoverage = filteredHospitalPatients.reduce((acc, p) => acc + p.insuranceCoveragePercent, 0);
    const avgCoverage = count > 0 ? totalCoverage / count : 0;
    const outstanding = filteredHospitalPatients
      .filter((p) => p.paymentStatus !== "Paid")
      .reduce((acc, p) => acc + p.totalBillAmount, 0);

    return [
      {
        id: "admissions",
        titleKey: "dataDashboard.hospital.kpis.admissions",
        value: count.toLocaleString("en-US"),
        rawNumericValue: count,
        format: "number",
        iconName: "Users",
      },
      {
        id: "los",
        titleKey: "dataDashboard.hospital.kpis.los",
        value: `${avgLos.toFixed(2)} d`,
        rawNumericValue: avgLos,
        format: "days",
        iconName: "Clock",
      },
      {
        id: "billing",
        titleKey: "dataDashboard.hospital.kpis.billing",
        value: `$${totalBill.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        rawNumericValue: totalBill,
        format: "currency",
        iconName: "Receipt",
      },
      {
        id: "coverage",
        titleKey: "dataDashboard.hospital.kpis.coverage",
        value: `${avgCoverage.toFixed(1)}%`,
        rawNumericValue: avgCoverage,
        format: "percentage",
        iconName: "ShieldCheck",
      },
      {
        id: "outstanding",
        titleKey: "dataDashboard.hospital.kpis.outstanding",
        value: `$${outstanding.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        rawNumericValue: outstanding,
        format: "currency",
        iconName: "AlertCircle",
      },
    ];
  }, [filteredHospitalPatients]);

  return {
    activeDataset,
    setActiveDataset: handleDatasetChange,

    // E-Commerce
    ecommerceOrders: ecommerceDataRaw as ECommerceOrder[],
    filteredEcommerceOrders,
    sortedEcommerceOrders,
    paginatedEcommerceOrders,
    ecommerceFilters,
    setEcommerceFilters,
    resetEcommerceFilters,
    ecommerceKPIs,
    ecommerceSort,
    setEcommerceSort,
    ecommercePagination,
    setEcommercePage,

    // Hospital
    hospitalPatients: hospitalDataRaw as HospitalPatient[],
    filteredHospitalPatients,
    sortedHospitalPatients,
    paginatedHospitalPatients,
    hospitalFilters,
    setHospitalFilters,
    resetHospitalFilters,
    hospitalKPIs,
    hospitalSort,
    setHospitalSort,
    hospitalPagination,
    setHospitalPage,
  };
}
