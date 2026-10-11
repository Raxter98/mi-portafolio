"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { LocalizedProject } from "./ProjectSpotlightStage";

export interface ProjectDetailModalProps {
  isOpen: boolean;
  project: LocalizedProject;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ProjectDetailModal = ({
  isOpen,
  project,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: ProjectDetailModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [project.id]);

  // Keyboard navigation & Escape handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const tCloseModal = t.projects?.showcase?.actions?.closeModal || "Cerrar";
  const tPrevProject = t.projects?.showcase?.actions?.prevProject || "Proyecto Anterior";
  const tNextProject = t.projects?.showcase?.actions?.nextProject || "Proyecto Siguiente";
  const tTech = t.projects?.showcase?.meta?.technologies || "Tecnologías";
  const tOverview = t.projects?.showcase?.meta?.overview || "Resumen del Proyecto";

  const formattedCurrent = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalCount).padStart(2, "0");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-2xl shadow-black/60 my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Media Banner Section */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 bg-zinc-950 overflow-hidden">
          {/* Skeleton while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-zinc-600 animate-spin" />
            </div>
          )}

          <div className="relative w-full h-full">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              unoptimized
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label={tCloseModal}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title and tags positioned over the banner gradient */}
          <div className="absolute bottom-4 left-6 right-6 pointer-events-none">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-600 text-white">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono font-bold text-white/80">
                {formattedCurrent} / {formattedTotal}
              </span>
            </div>
            <h2
              id="modal-project-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md"
            >
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Narrative Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
              {tOverview}
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Full Technologies Architecture */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span>{tTech}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-red-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-red-500 text-zinc-700 dark:text-zinc-200 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label={tPrevProject}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{tPrevProject}</span>
              </button>

              <button
                onClick={onNext}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-red-500 hover:text-white dark:bg-zinc-800 dark:hover:bg-red-500 text-zinc-700 dark:text-zinc-200 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label={tNextProject}
              >
                <span className="hidden sm:inline">{tNextProject}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              {tCloseModal}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
