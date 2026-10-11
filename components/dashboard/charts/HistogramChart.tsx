"use client";

import { useState } from "react";

interface HistogramBin {
  bracket: string;
  rangeLabel: string;
  count: number;
}

interface HistogramChartProps {
  data: HistogramBin[];
}

export default function HistogramChart({ data }: HistogramChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-zinc-400">
        Sin datos demográficos disponibles
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((a, b) => a + b.count, 0);

  return (
    <div className="w-full flex flex-col items-center justify-between gap-4 py-2">
      {/* Bars container */}
      <div className="w-full flex items-end justify-between gap-2 h-36 px-2 border-b border-zinc-200 dark:border-white/10">
        {data.map((bin, idx) => {
          const heightPct = Math.max(6, Math.round((bin.count / maxCount) * 100));
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={bin.bracket}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
            >
              {/* Tooltip badge on hover */}
              <span
                className={`text-[10px] font-mono font-bold mb-1 transition-opacity ${
                  isHovered ? "opacity-100 text-red-500" : "opacity-0"
                }`}
              >
                {bin.count}
              </span>

              {/* Vertical Bar */}
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 ${
                  isHovered
                    ? "bg-red-500 shadow-md shadow-red-500/30"
                    : "bg-red-500/70 group-hover:bg-red-500"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Labels below bars */}
      <div className="w-full flex items-center justify-between gap-2 px-2">
        {data.map((bin, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={bin.bracket}
              className={`flex-1 text-center transition-colors ${
                isHovered ? "text-red-500 font-bold" : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              <div className="text-[11px] font-bold truncate">{bin.rangeLabel}</div>
              <div className="text-[10px] font-mono text-zinc-400">
                {bin.count} ({total > 0 ? ((bin.count / total) * 100).toFixed(0) : 0}%)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
