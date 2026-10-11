"use client";

import { useMemo, useState } from "react";
import { ECommerceOrder } from "@/types/data-analysis";

interface LineTimelineChartProps {
  orders: ECommerceOrder[];
}

export default function LineTimelineChart({ orders }: LineTimelineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Group by YYYY-MM
  const timelineData = useMemo(() => {
    const monthlyMap = new Map<string, { revenue: number; profit: number }>();

    // Sort order dates
    const sorted = [...orders].sort((a, b) => a.orderDate.localeCompare(b.orderDate));
    for (const ord of sorted) {
      const month = ord.orderDate.slice(0, 7); // YYYY-MM
      const current = monthlyMap.get(month) || { revenue: 0, profit: 0 };
      current.revenue += ord.totalRevenue;
      current.profit += ord.profit;
      monthlyMap.set(month, current);
    }

    const labels = Array.from(monthlyMap.keys()).sort();
    return labels.map((label) => ({
      label,
      revenue: Math.round(monthlyMap.get(label)!.revenue),
      profit: Math.round(monthlyMap.get(label)!.profit),
    }));
  }, [orders]);

  if (timelineData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-zinc-400">
        No hay datos disponibles para el rango seleccionado
      </div>
    );
  }

  const maxVal = Math.max(...timelineData.map((d) => d.revenue), 100);
  const width = 650;
  const height = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const getX = (idx: number) => {
    if (timelineData.length === 1) return padLeft + chartW / 2;
    return padLeft + (idx / (timelineData.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    return padTop + chartH - (val / maxVal) * chartH;
  };

  // Build SVG path
  const revenuePoints = timelineData.map((d, i) => `${getX(i)},${getY(d.revenue)}`).join(" ");
  const profitPoints = timelineData.map((d, i) => `${getX(i)},${getY(d.profit)}`).join(" ");

  return (
    <div className="w-full flex flex-col">
      {/* Legend */}
      <div className="flex items-center justify-end gap-4 mb-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-zinc-600 dark:text-zinc-300 font-medium">Ingresos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-zinc-600 dark:text-zinc-300 font-medium">Beneficio</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padTop + chartH * (1 - pct);
            const val = Math.round(maxVal * pct);
            return (
              <g key={i}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  className="text-zinc-200 dark:text-zinc-800"
                />
                <text
                  x={padLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-zinc-400 font-mono"
                >
                  ${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Area fill for revenue */}
          {timelineData.length > 1 && (
            <polygon
              points={`${getX(0)},${padTop + chartH} ${revenuePoints} ${getX(timelineData.length - 1)},${padTop + chartH}`}
              className="fill-red-500/10 dark:fill-red-500/15"
            />
          )}

          {/* Revenue Polyline */}
          <polyline
            fill="none"
            stroke="rgb(239, 68, 68)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={revenuePoints}
          />

          {/* Profit Polyline */}
          <polyline
            fill="none"
            stroke="rgb(16, 185, 129)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={profitPoints}
          />

          {/* Hover interactive vertical line and points */}
          {timelineData.map((d, i) => {
            const x = getX(i);
            const yRev = getY(d.revenue);
            const yProf = getY(d.profit);
            const isHovered = hoveredIndex === i;

            // Show label every few steps to avoid clutter
            const showLabel =
              timelineData.length <= 12 ||
              i === 0 ||
              i === timelineData.length - 1 ||
              i % Math.ceil(timelineData.length / 6) === 0;

            return (
              <g
                key={d.label}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Invisible hover bar */}
                <rect
                  x={x - 12}
                  y={padTop}
                  width={24}
                  height={chartH}
                  fill="transparent"
                />

                {isHovered && (
                  <line
                    x1={x}
                    y1={padTop}
                    x2={x}
                    y2={padTop + chartH}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-zinc-400 dark:text-zinc-600"
                  />
                )}

                {/* Revenue circle */}
                <circle
                  cx={x}
                  cy={yRev}
                  r={isHovered ? 5 : 3}
                  className="fill-red-500 stroke-white dark:stroke-zinc-950 transition-all"
                  strokeWidth="2"
                />

                {/* Profit circle */}
                <circle
                  cx={x}
                  cy={yProf}
                  r={isHovered ? 4.5 : 2.5}
                  className="fill-emerald-500 stroke-white dark:stroke-zinc-950 transition-all"
                  strokeWidth="2"
                />

                {/* X Axis Label */}
                {showLabel && (
                  <text
                    x={x}
                    y={height - 8}
                    textAnchor="middle"
                    className="text-[9px] fill-zinc-500 dark:text-zinc-400 font-mono"
                  >
                    {d.label.slice(2)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip Box */}
        {hoveredIndex !== null && timelineData[hoveredIndex] && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-zinc-900/90 text-white text-xs border border-white/10 shadow-xl backdrop-blur pointer-events-none flex items-center gap-3 z-20"
          >
            <span className="font-bold text-zinc-300 font-mono">
              {timelineData[hoveredIndex].label}
            </span>
            <span className="text-red-400 font-semibold">
              Rev: ${timelineData[hoveredIndex].revenue.toLocaleString()}
            </span>
            <span className="text-emerald-400 font-semibold">
              Prof: ${timelineData[hoveredIndex].profit.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
