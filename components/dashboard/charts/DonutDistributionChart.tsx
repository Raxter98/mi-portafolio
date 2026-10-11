"use client";

import { useState } from "react";

interface DonutItem {
  label: string;
  value: number;
  color: string;
}

interface DonutDistributionChartProps {
  data: DonutItem[];
  centerLabel?: string;
}

export default function DonutDistributionChart({
  data,
  centerLabel = "Total",
}: DonutDistributionChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = data.reduce((acc, d) => acc + d.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-44 text-xs text-zinc-400">
        Sin datos para la distribución
      </div>
    );
  }

  // Pre-calculate segments
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  const segments = data.map((item) => {
    const percent = item.value / total;
    const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
    const strokeDashoffset = -circumference * accumulatedPercent;
    accumulatedPercent += percent;

    return {
      ...item,
      percent: percent * 100,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const activeItem = hoveredIdx !== null ? segments[hoveredIdx] : null;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
      {/* SVG Donut Ring */}
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 select-none"
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-zinc-100 dark:text-zinc-800"
          />

          {segments.map((seg, idx) => (
            <circle
              key={seg.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={hoveredIdx === idx ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={seg.strokeDasharray}
              strokeDashoffset={seg.strokeDashoffset}
              strokeLinecap="butt"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer transition-all duration-300"
            />
          ))}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
            {activeItem ? activeItem.label : centerLabel}
          </span>
          <span className="text-base font-extrabold text-zinc-900 dark:text-white">
            {activeItem
              ? `${activeItem.percent.toFixed(1)}%`
              : total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        {segments.map((seg, idx) => (
          <div
            key={seg.label}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center justify-between gap-4 text-xs p-1.5 rounded-lg transition-colors cursor-pointer ${
              hoveredIdx === idx ? "bg-zinc-100 dark:bg-zinc-800" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: seg.color }}
              />
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {seg.label}
              </span>
            </div>
            <span className="font-mono text-zinc-500 dark:text-zinc-400">
              {seg.value.toLocaleString()} ({seg.percent.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
