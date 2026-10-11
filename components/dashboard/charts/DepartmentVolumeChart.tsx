"use client";

import { useState } from "react";

interface DeptItem {
  department: string;
  count: number;
  avgLos: number;
}

interface DepartmentVolumeChartProps {
  data: DeptItem[];
}

export default function DepartmentVolumeChart({ data }: DepartmentVolumeChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-xs text-zinc-400">
        Sin datos disponibles
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const maxLos = Math.max(...data.map((d) => d.avgLos), 1);

  return (
    <div className="w-full flex flex-col gap-3 py-1">
      {/* Legend */}
      <div className="flex items-center justify-end gap-4 text-[11px] mb-1 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
          <span className="text-zinc-600 dark:text-zinc-400">Pacientes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
          <span className="text-zinc-600 dark:text-zinc-400">Estancia Media (días)</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((item, idx) => {
          const countPct = Math.round((item.count / maxCount) * 100);
          const losPct = Math.round((item.avgLos / maxLos) * 100);
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
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-blue-500 font-bold">{item.count} pac.</span>
                  <span className="text-amber-500 font-bold">{item.avgLos.toFixed(1)} d</span>
                </div>
              </div>

              {/* Dual bar rows */}
              <div className="flex flex-col gap-1">
                {/* Admissions bar */}
                <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    style={{ width: `${countPct}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHovered ? "bg-blue-400" : "bg-blue-500"
                    }`}
                  />
                </div>

                {/* LOS bar */}
                <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    style={{ width: `${losPct}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHovered ? "bg-amber-400" : "bg-amber-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
