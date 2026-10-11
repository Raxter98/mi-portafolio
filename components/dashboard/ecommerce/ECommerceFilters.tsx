"use client";

import { RotateCcw, Filter } from "lucide-react";
import { ECommerceFilterState, ECommerceCategory, ECommerceRegion, ECommerceShipMode } from "@/types/data-analysis";
import { useTranslation } from "@/hooks/useTranslation";

interface ECommerceFiltersProps {
  filters: ECommerceFilterState;
  onChange: (updates: Partial<ECommerceFilterState>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function ECommerceFilters({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
}: ECommerceFiltersProps) {
  const { t } = useTranslation();

  const categories: ECommerceCategory[] = ["Beauty", "Sports", "Home", "Clothing", "Electronics"];
  const regions: ECommerceRegion[] = ["Central", "North", "South", "East", "West"];
  const shipModes: ECommerceShipMode[] = ["Standard", "Express", "Same Day"];
  const years: ("2024" | "2025")[] = ["2024", "2025"];

  return (
    <div className="p-4 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-900/60 backdrop-blur mb-6 shadow-sm dark:shadow-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            {t.dataDashboard.common.filtersTitle}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.dataDashboard.common.resetFilters}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Category Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.ecommerce.filters.category}
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value as ECommerceCategory | "all" })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{t.dataDashboard.common.all}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.ecommerce.filters.region}
          </label>
          <select
            value={filters.region}
            onChange={(e) => onChange({ region: e.target.value as ECommerceRegion | "all" })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{t.dataDashboard.common.all}</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Ship Mode Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.ecommerce.filters.shipMode}
          </label>
          <select
            value={filters.shipMode}
            onChange={(e) => onChange({ shipMode: e.target.value as ECommerceShipMode | "all" })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{t.dataDashboard.common.all}</option>
            {shipModes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.ecommerce.filters.year}
          </label>
          <select
            value={filters.year}
            onChange={(e) => onChange({ year: e.target.value as "2024" | "2025" | "all" })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{t.dataDashboard.common.all}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
