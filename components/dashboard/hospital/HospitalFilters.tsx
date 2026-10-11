"use client";

import { RotateCcw, Filter } from "lucide-react";
import {
  HospitalFilterState,
  HospitalDepartment,
  HospitalPaymentStatus,
  HospitalGender,
  HospitalAgeGroup,
} from "@/types/data-analysis";
import { useTranslation } from "@/hooks/useTranslation";

interface HospitalFiltersProps {
  filters: HospitalFilterState;
  onChange: (updates: Partial<HospitalFilterState>) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function HospitalFilters({
  filters,
  onChange,
  onReset,
  hasActiveFilters,
}: HospitalFiltersProps) {
  const { t } = useTranslation();

  const departments: HospitalDepartment[] = [
    "General",
    "Emergency",
    "Orthopedics",
    "Pediatrics",
    "Cardiology",
    "Neurology",
  ];
  const paymentStatuses: HospitalPaymentStatus[] = ["Paid", "Pending", "Partially Paid"];
  const genders: HospitalGender[] = ["Female", "Male"];
  const ageGroups: { id: HospitalAgeGroup; label: string }[] = [
    { id: "all", label: t.dataDashboard.common.all },
    { id: "pediatric", label: "Pediatría (<18)" },
    { id: "young_adult", label: "Adulto Joven (18-35)" },
    { id: "middle_age", label: "Adulto Medio (36-55)" },
    { id: "senior", label: "Adulto Mayor (56-70)" },
    { id: "elderly", label: "Tercera Edad (71+)" },
  ];

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
        {/* Department Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.hospital.filters.department}
          </label>
          <select
            value={filters.department}
            onChange={(e) => onChange({ department: e.target.value as HospitalDepartment | "all" })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{t.dataDashboard.common.all}</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Status Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.hospital.filters.paymentStatus}
          </label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => onChange({ paymentStatus: e.target.value as HospitalPaymentStatus | "all" })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{t.dataDashboard.common.all}</option>
            {paymentStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.hospital.filters.gender}
          </label>
          <select
            value={filters.gender}
            onChange={(e) => onChange({ gender: e.target.value as HospitalGender | "all" })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">{t.dataDashboard.common.all}</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Age Group Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.hospital.filters.ageGroup}
          </label>
          <select
            value={filters.ageGroup}
            onChange={(e) => onChange({ ageGroup: e.target.value as HospitalAgeGroup })}
            className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {ageGroups.map((ag) => (
              <option key={ag.id} value={ag.id}>
                {ag.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
