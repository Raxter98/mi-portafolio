"use client";

import { ProjectCategory } from "./projectsData";

export interface CategoryFilterItem {
  id: ProjectCategory;
  label: string;
  count: number;
  ariaLabel: string;
}

export interface ProjectFiltersProps {
  categories: CategoryFilterItem[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

export const ProjectFilters = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProjectFiltersProps) => {
  return (
    <div
      role="tablist"
      aria-label="Filtro de proyectos por disciplina"
      className="flex flex-wrap items-center gap-2 mb-8"
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isSelected}
            aria-label={cat.ariaLabel}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 border ${
              isSelected
                ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/25"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-red-400 dark:hover:border-red-500/50 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
