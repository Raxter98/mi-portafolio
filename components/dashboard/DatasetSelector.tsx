"use client";

import { ShoppingCart, Activity } from "lucide-react";
import { DatasetId } from "@/types/data-analysis";
import { useTranslation } from "@/hooks/useTranslation";

interface DatasetSelectorProps {
  activeDataset: DatasetId;
  onSelectDataset: (dataset: DatasetId) => void;
}

export default function DatasetSelector({
  activeDataset,
  onSelectDataset,
}: DatasetSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-500 dark:text-zinc-400">
          {t.dataDashboard.datasetSelector.label}
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Selección de dataset analítico"
        className="inline-flex p-1.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-950/80 border border-zinc-300/40 dark:border-white/5"
      >
        {/* E-Commerce Tab */}
        <button
          role="tab"
          id="tab-ecommerce"
          aria-selected={activeDataset === "ecommerce"}
          aria-controls="panel-ecommerce"
          onClick={() => onSelectDataset("ecommerce")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
            activeDataset === "ecommerce"
              ? "bg-red-600 text-white shadow-md shadow-red-600/20"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{t.dataDashboard.datasetSelector.ecommerceTab}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              activeDataset === "ecommerce"
                ? "bg-black/20 text-white"
                : "bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            1.000
          </span>
        </button>

        {/* Hospital Patients Tab */}
        <button
          role="tab"
          id="tab-hospital"
          aria-selected={activeDataset === "hospital"}
          aria-controls="panel-hospital"
          onClick={() => onSelectDataset("hospital")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
            activeDataset === "hospital"
              ? "bg-red-600 text-white shadow-md shadow-red-600/20"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t.dataDashboard.datasetSelector.hospitalTab}</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
              activeDataset === "hospital"
                ? "bg-black/20 text-white"
                : "bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            1.000
          </span>
        </button>
      </div>
    </div>
  );
}
