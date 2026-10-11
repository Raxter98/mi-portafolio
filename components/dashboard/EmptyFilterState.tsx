"use client";

import { FilterX, RotateCcw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyFilterStateProps {
  onReset: () => void;
}

export default function EmptyFilterState({ onReset }: EmptyFilterStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center p-12 my-6 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-900/40 text-center backdrop-blur">
      <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 text-zinc-400 mb-4">
        <FilterX className="w-8 h-8" />
      </div>

      <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
        {t.dataDashboard.common.noResults}
      </h3>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
        Intenta ajustar o limpiar los criterios de filtrado para visualizar registros del conjunto de datos.
      </p>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>{t.dataDashboard.common.resetFilters}</span>
      </button>
    </div>
  );
}
