"use client";

import { useState } from "react";

interface FinancialItem {
  department: string;
  totalBill: number;
  coveredAmount: number;
  outOfPocketAmount: number;
}

interface FinancialComparisonChartProps {
  data: FinancialItem[];
}

export default function FinancialComparisonChart({ data }: FinancialComparisonChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-zinc-400">
        Sin datos financieros disponibles
      </div>
    );
  }

  const maxBill = Math.max(...data.map((d) => d.totalBill), 1);

  return (
    <div className="w-full flex flex-col gap-3 py-1">
      {/* Legend */}
      <div className="flex items-center justify-end gap-4 text-[11px] mb-1 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          <span className="text-zinc-600 dark:text-zinc-400">Cubierto (Seguro)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
          <span className="text-zinc-600 dark:text-zinc-400">Copago Paciente</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((item, idx) => {
          const totalPct = Math.round((item.totalBill / maxBill) * 100);
          const coveredPctOfBar =
            item.totalBill > 0 ? (item.coveredAmount / item.totalBill) * 100 : 0;
          const oopPctOfBar = 100 - coveredPctOfBar;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.department}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex flex-col gap-1.5 text-xs p-1.5 rounded-xl transition-colors cursor-pointer group hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
            >
              <div className="flex items-center justify-between font-semibold">
                <span className="text-zinc-800 dark:text-zinc-200 group-hover:text-red-500 transition-colors">
                  {item.department}
                </span>
                <span className="font-mono text-zinc-900 dark:text-white">
                  ${item.totalBill.toLocaleString()}
                </span>
              </div>

              {/* Segmented Stacked Bar inside relative container */}
              <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                <div
                  style={{ width: `${totalPct}%` }}
                  className="h-full flex rounded-full overflow-hidden transition-all duration-500"
                >
                  <div
                    style={{ width: `${coveredPctOfBar}%` }}
                    className={`h-full ${isHovered ? "bg-emerald-400" : "bg-emerald-500"}`}
                  />
                  <div
                    style={{ width: `${oopPctOfBar}%` }}
                    className={`h-full ${isHovered ? "bg-red-400" : "bg-red-500"}`}
                  />
                </div>
              </div>

              {isHovered && (
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mt-0.5">
                  <span className="text-emerald-500">
                    Seguro: ${item.coveredAmount.toLocaleString()} ({coveredPctOfBar.toFixed(1)}%)
                  </span>
                  <span className="text-red-400">
                    Paciente: ${item.outOfPocketAmount.toLocaleString()} ({oopPctOfBar.toFixed(1)}%)
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
