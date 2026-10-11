"use client";

import { ChevronLeft, ChevronRight, ExternalLink, Layers } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { LocalizedProject } from "./ProjectSpotlightStage";

export interface ProjectDeckProps {
  project: LocalizedProject;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenDetails: () => void;
  projectsList: LocalizedProject[];
  onSelectProject: (id: string) => void;
}

export const ProjectDeck = ({
  project,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  onOpenDetails,
  projectsList,
  onSelectProject,
}: ProjectDeckProps) => {
  const { t } = useTranslation();

  const tViewDetails = t.projects?.showcase?.actions?.viewDetails || "Ver Detalles";
  const tPrevProject = t.projects?.showcase?.actions?.prevProject || "Proyecto Anterior";
  const tNextProject = t.projects?.showcase?.actions?.nextProject || "Proyecto Siguiente";
  const tTech = t.projects?.showcase?.meta?.technologies || "Tecnologías";
  const tOf = t.projects?.showcase?.meta?.of || "de";

  const formattedCurrent = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalCount).padStart(2, "0");

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Top Meta: Ordinal counter & category */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-red-500 font-mono">
              {formattedCurrent}
            </span>
            <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 font-mono">
              / {formattedTotal}
            </span>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
            {project.categoryLabel}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
          {project.title}
        </h3>

        {/* Narrative Description */}
        <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies List */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-red-500" />
            <span>{tTech}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 transition-colors hover:border-red-400/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons & Project Selector Strip */}
      <div className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
        {/* Buttons Row */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenDetails}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{tViewDetails}</span>
          </button>

          {/* Stepper navigation arrows */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={onPrev}
              className="p-3 rounded-xl bg-zinc-100 hover:bg-red-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-red-500 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label={tPrevProject}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              className="p-3 rounded-xl bg-zinc-100 hover:bg-red-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-red-500 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label={tNextProject}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive project selector strip */}
        <div className="pt-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {projectsList.map((p, idx) => {
              const isActive = p.id === project.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProject(p.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                    isActive
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30 scale-105"
                      : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700/60 hover:border-red-400 hover:text-red-500"
                  }`}
                  aria-label={`${p.title} (${idx + 1} ${tOf} ${projectsList.length})`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="font-mono mr-1.5">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="truncate max-w-[120px] inline-block align-bottom">{p.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
