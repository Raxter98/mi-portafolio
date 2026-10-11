"use client";

import { Users, Clock, Receipt, ShieldCheck, AlertCircle } from "lucide-react";
import { DashboardKPICard } from "@/types/data-analysis";
import { useTranslation } from "@/hooks/useTranslation";

interface HospitalKPIsProps {
  kpis: DashboardKPICard[];
}

export default function HospitalKPIs({ kpis }: HospitalKPIsProps) {
  const { t } = useTranslation();

  const getTranslation = (key: string): string => {
    const parts = key.split(".");
    let curr: Record<string, unknown> | unknown = t;
    for (const p of parts) {
      if (curr && typeof curr === "object" && p in (curr as Record<string, unknown>)) {
        curr = (curr as Record<string, unknown>)[p];
      } else {
        return key;
      }
    }
    return typeof curr === "string" ? curr : key;
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Users":
        return <Users className="w-5 h-5 text-blue-500" />;
      case "Clock":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "Receipt":
        return <Receipt className="w-5 h-5 text-red-500" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case "AlertCircle":
        return <AlertCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Users className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-900/60 p-4 md:p-5 shadow-sm dark:shadow-none backdrop-blur flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 truncate">
              {getTranslation(kpi.titleKey)}
            </span>
            <div className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 flex-shrink-0">
              {getIcon(kpi.iconName)}
            </div>
          </div>

          <div>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {kpi.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
