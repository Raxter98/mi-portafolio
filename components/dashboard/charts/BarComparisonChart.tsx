"use client";

import { useState } from "react";

interface BarItem {
  label: string;
  value: number;
  percentage?: number;
}

interface BarComparisonChartProps {
  data: BarItem[];
  color?: "red" | "blue" | "emerald" | "purple";
  currency?: boolean;
}

export default function BarComparisonChart({
  data,
  color = "red",
  currency = true,
}: BarComparisonChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-44 text-xs text-zinc-400">
        Sin datos disponibles
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const getBarColor = (isHovered: boolean) => {
    switch (color) {
      case "red":
        return isHovered ? "bg-red-500" : "bg-red-500/80";
      case "emerald":
        return isHovered ? "bg-emerald-500" : "bg-emerald-500/80";
      case "blue":
        return isHovered ? "bg-blue-500" : "bg-blue-500/80";
      case "purple":
        return isHovered ? "bg-purple-500" : "bg-purple-500/80";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 py-1">
      {data.map((item, idx) => {
        const pct = Math.max(4, Math.round((item.value / maxValue) * 100));
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={item.label}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="flex flex-col gap-1 text-xs cursor-pointer group"
          >
            <div className="flex items-center justify-between font-semibold">
              <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-red-500 dark:group-hover:text-white transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-zinc-900 dark:text-zinc-100">
                {currency ? `$${item.value.toLocaleString()}` : item.value.toLocaleString()}
                {item.percentage !== undefined && (
                  <span className="ml-1.5 text-[10px] text-zinc-400">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                )}
              </span>
            </div>

            <div className="relative w-full h-3.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 overflow-hidden">
              <div
                style={{ width: `${pct}%` }}
                className={`h-full rounded-full transition-all duration-500 ${getBarColor(
                  isHovered
                )}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
