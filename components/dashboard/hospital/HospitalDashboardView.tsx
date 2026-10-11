"use client";

import { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useDashboardAnalytics } from "../hooks/useDashboardAnalytics";
import HospitalKPIs from "./HospitalKPIs";
import HospitalFilters from "./HospitalFilters";
import HospitalTable from "./HospitalTable";
import ChartContainer from "../ChartContainer";
import DepartmentVolumeChart from "../charts/DepartmentVolumeChart";
import FinancialComparisonChart from "../charts/FinancialComparisonChart";
import HistogramChart from "../charts/HistogramChart";
import PaymentStatusChart from "../charts/PaymentStatusChart";
import EmptyFilterState from "../EmptyFilterState";

interface HospitalDashboardViewProps {
  analytics: ReturnType<typeof useDashboardAnalytics>;
}

export default function HospitalDashboardView({ analytics }: HospitalDashboardViewProps) {
  const { t } = useTranslation();

  const hasActiveFilters = useMemo(() => {
    const f = analytics.hospitalFilters;
    return f.department !== "all" || f.paymentStatus !== "all" || f.gender !== "all" || f.ageGroup !== "all";
  }, [analytics.hospitalFilters]);

  // Aggregate Department Admissions & LOS
  const deptVolumeData = useMemo(() => {
    const map = new Map<string, { count: number; totalLos: number }>();
    for (const p of analytics.filteredHospitalPatients) {
      const cur = map.get(p.department) || { count: 0, totalLos: 0 };
      cur.count += 1;
      cur.totalLos += p.lengthOfStayDays;
      map.set(p.department, cur);
    }
    return Array.from(map.entries())
      .map(([department, val]) => ({
        department,
        count: val.count,
        avgLos: val.count > 0 ? val.totalLos / val.count : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [analytics.filteredHospitalPatients]);

  // Aggregate Financial Breakdown per department
  const financialData = useMemo(() => {
    const map = new Map<string, { totalBill: number; coveredAmount: number; outOfPocketAmount: number }>();
    for (const p of analytics.filteredHospitalPatients) {
      const cur = map.get(p.department) || { totalBill: 0, coveredAmount: 0, outOfPocketAmount: 0 };
      cur.totalBill += p.totalBillAmount;
      cur.coveredAmount += p.coveredAmount;
      cur.outOfPocketAmount += p.outOfPocketAmount;
      map.set(p.department, cur);
    }
    return Array.from(map.entries())
      .map(([department, val]) => ({
        department,
        totalBill: Math.round(val.totalBill),
        coveredAmount: Math.round(val.coveredAmount),
        outOfPocketAmount: Math.round(val.outOfPocketAmount),
      }))
      .sort((a, b) => b.totalBill - a.totalBill);
  }, [analytics.filteredHospitalPatients]);

  // Aggregate Demographic Bins
  const demographicData = useMemo(() => {
    const bins = [
      { bracket: "pediatric", rangeLabel: "Pediatría (<18)", count: 0 },
      { bracket: "young_adult", rangeLabel: "Joven (18-35)", count: 0 },
      { bracket: "middle_age", rangeLabel: "Medio (36-55)", count: 0 },
      { bracket: "senior", rangeLabel: "Mayor (56-70)", count: 0 },
      { bracket: "elderly", rangeLabel: "Tercera Edad (71+)", count: 0 },
    ];

    for (const p of analytics.filteredHospitalPatients) {
      if (p.age < 18) bins[0].count++;
      else if (p.age <= 35) bins[1].count++;
      else if (p.age <= 55) bins[2].count++;
      else if (p.age <= 70) bins[3].count++;
      else bins[4].count++;
    }

    return bins;
  }, [analytics.filteredHospitalPatients]);

  // Aggregate Payment Status
  const paymentStatusData = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of analytics.filteredHospitalPatients) {
      map.set(p.paymentStatus, (map.get(p.paymentStatus) || 0) + 1);
    }
    return Array.from(map.entries()).map(([label, value]) => ({
      label,
      value,
    }));
  }, [analytics.filteredHospitalPatients]);

  const isEmpty = analytics.filteredHospitalPatients.length === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards Header */}
      <HospitalKPIs kpis={analytics.hospitalKPIs} />

      {/* Filter Toolbar */}
      <HospitalFilters
        filters={analytics.hospitalFilters}
        onChange={analytics.setHospitalFilters}
        onReset={analytics.resetHospitalFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {isEmpty ? (
        <EmptyFilterState onReset={analytics.resetHospitalFilters} />
      ) : (
        <>
          {/* Main Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Department Volume and LOS (Span 6) */}
            <div className="lg:col-span-6">
              <ChartContainer
                title={t.dataDashboard.hospital.charts.deptVolumeTitle}
                subtitle="Volumen de admisiones y duración media de estancia en días"
              >
                <DepartmentVolumeChart data={deptVolumeData} />
              </ChartContainer>
            </div>

            {/* Financial Comparison (Span 6) */}
            <div className="lg:col-span-6">
              <ChartContainer
                title={t.dataDashboard.hospital.charts.billingDeptTitle}
                subtitle="Desglose de facturación total, cobertura aseguradora y copago"
              >
                <FinancialComparisonChart data={financialData} />
              </ChartContainer>
            </div>

            {/* Demographics Histogram (Span 6) */}
            <div className="lg:col-span-6">
              <ChartContainer
                title={t.dataDashboard.hospital.charts.demographicsTitle}
                subtitle="Distribución de pacientes agrupados por rangos etarios"
              >
                <HistogramChart data={demographicData} />
              </ChartContainer>
            </div>

            {/* Payment Status Donut (Span 6) */}
            <div className="lg:col-span-6">
              <ChartContainer
                title={t.dataDashboard.hospital.charts.paymentStatusTitle}
                subtitle="Distribución porcentual de liquidación de facturas clínicas"
              >
                <PaymentStatusChart data={paymentStatusData} />
              </ChartContainer>
            </div>
          </div>

          {/* Interactive Patients Data Table */}
          <HospitalTable
            patients={analytics.paginatedHospitalPatients}
            sort={analytics.hospitalSort}
            onSort={analytics.setHospitalSort}
            pagination={analytics.hospitalPagination}
            onPageChange={analytics.setHospitalPage}
          />
        </>
      )}
    </div>
  );
}
