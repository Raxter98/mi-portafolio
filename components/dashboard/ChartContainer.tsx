"use client";

import React from "react";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function ChartContainer({
  title,
  subtitle,
  children,
  className = "",
  action,
}: ChartContainerProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-900/60 p-5 md:p-6 shadow-sm dark:shadow-none backdrop-blur flex flex-col justify-between ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="w-full flex-1 min-h-[220px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
