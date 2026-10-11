"use client";

import { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useDashboardAnalytics } from "../hooks/useDashboardAnalytics";
import ECommerceKPIs from "./ECommerceKPIs";
import ECommerceFilters from "./ECommerceFilters";
import ECommerceTable from "./ECommerceTable";
import ChartContainer from "../ChartContainer";
import LineTimelineChart from "../charts/LineTimelineChart";
import BarComparisonChart from "../charts/BarComparisonChart";
import DonutDistributionChart from "../charts/DonutDistributionChart";
import EmptyFilterState from "../EmptyFilterState";

interface ECommerceDashboardViewProps {
  analytics: ReturnType<typeof useDashboardAnalytics>;
}

export default function ECommerceDashboardView({ analytics }: ECommerceDashboardViewProps) {
  const { t } = useTranslation();

  const hasActiveFilters = useMemo(() => {
    const f = analytics.ecommerceFilters;
    return f.category !== "all" || f.region !== "all" || f.shipMode !== "all" || f.year !== "all";
  }, [analytics.ecommerceFilters]);

  // Aggregate Category Data
  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    for (const ord of analytics.filteredEcommerceOrders) {
      map.set(ord.category, (map.get(ord.category) || 0) + ord.totalRevenue);
    }
    const totalRev = Array.from(map.values()).reduce((a, b) => a + b, 0);
    return Array.from(map.entries())
      .map(([label, value]) => ({
        label,
        value: Math.round(value),
        percentage: totalRev > 0 ? (value / totalRev) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [analytics.filteredEcommerceOrders]);

  // Aggregate Regional Data
  const regionData = useMemo(() => {
    const map = new Map<string, number>();
    for (const ord of analytics.filteredEcommerceOrders) {
      map.set(ord.region, (map.get(ord.region) || 0) + ord.totalRevenue);
    }
    const totalRev = Array.from(map.values()).reduce((a, b) => a + b, 0);
    return Array.from(map.entries())
      .map(([label, value]) => ({
        label,
        value: Math.round(value),
        percentage: totalRev > 0 ? (value / totalRev) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [analytics.filteredEcommerceOrders]);

  // Aggregate Ship Mode Data
  const shipModeData = useMemo(() => {
    const map = new Map<string, number>();
    for (const ord of analytics.filteredEcommerceOrders) {
      map.set(ord.shipMode, (map.get(ord.shipMode) || 0) + 1);
    }
    const colors: Record<string, string> = {
      Standard: "#ef4444", // red-500
      Express: "#3b82f6", // blue-500
      "Same Day": "#10b981", // emerald-500
    };
    return Array.from(map.entries()).map(([label, value]) => ({
      label,
      value,
      color: colors[label] || "#ef4444",
    }));
  }, [analytics.filteredEcommerceOrders]);

  const isEmpty = analytics.filteredEcommerceOrders.length === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards Header */}
      <ECommerceKPIs kpis={analytics.ecommerceKPIs} />

      {/* Filter Toolbar */}
      <ECommerceFilters
        filters={analytics.ecommerceFilters}
        onChange={analytics.setEcommerceFilters}
        onReset={analytics.resetEcommerceFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {isEmpty ? (
        <EmptyFilterState onReset={analytics.resetEcommerceFilters} />
      ) : (
        <>
          {/* Main Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Monthly Timeline Chart (Span 12 cols on mobile/tablet, 12 on desktop for full width trend view) */}
            <div className="lg:col-span-12">
              <ChartContainer
                title={t.dataDashboard.ecommerce.charts.timelineTitle}
                subtitle="Seguimiento de ingresos brutos y beneficios netos agrupados por mes"
              >
                <LineTimelineChart orders={analytics.filteredEcommerceOrders} />
              </ChartContainer>
            </div>

            {/* Category Comparison (Span 4) */}
            <div className="lg:col-span-4">
              <ChartContainer
                title={t.dataDashboard.ecommerce.charts.categoryTitle}
                subtitle="Ingresos por categoría de producto"
              >
                <BarComparisonChart data={categoryData} color="red" currency={true} />
              </ChartContainer>
            </div>

            {/* Regional Distribution (Span 4) */}
            <div className="lg:col-span-4">
              <ChartContainer
                title={t.dataDashboard.ecommerce.charts.regionTitle}
                subtitle="Desglose comercial por territorio geográfico"
              >
                <BarComparisonChart data={regionData} color="blue" currency={true} />
              </ChartContainer>
            </div>

            {/* Shipping Mode Donut (Span 4) */}
            <div className="lg:col-span-4">
              <ChartContainer
                title={t.dataDashboard.ecommerce.charts.shipModeTitle}
                subtitle="Volumen de pedidos por método logístico"
              >
                <DonutDistributionChart data={shipModeData} centerLabel="Pedidos" />
              </ChartContainer>
            </div>
          </div>

          {/* Interactive Data Table */}
          <ECommerceTable
            orders={analytics.paginatedEcommerceOrders}
            sort={analytics.ecommerceSort}
            onSort={analytics.setEcommerceSort}
            pagination={analytics.ecommercePagination}
            onPageChange={analytics.setEcommercePage}
          />
        </>
      )}
    </div>
  );
}
