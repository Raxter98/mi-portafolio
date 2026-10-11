"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2, Sparkles } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { ProjectRecord } from "./projectsData";

export interface LocalizedProject extends ProjectRecord {
  title: string;
  description: string;
  categoryLabel: string;
  indexString: string;
}

export interface ProjectSpotlightStageProps {
  project: LocalizedProject;
  onOpenDetails: () => void;
}

export const ProjectSpotlightStage = ({
  project,
  onOpenDetails,
}: ProjectSpotlightStageProps) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [project.id]);

  const tViewDetails = t.projects?.showcase?.actions?.viewDetails || "Ver Detalles";

  return (
    <div className="relative w-full group">
      {/* Ambient background glow */}
      <div
        className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-red-600/30 via-red-500/10 to-amber-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main cinematic stage frame */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-white/10 shadow-2xl shadow-black/40">
        {/* Loading skeleton placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-zinc-600 animate-spin" />
          </div>
        )}

        {/* High-Resolution Visual Mockup */}
        <div
          className="relative w-full h-full cursor-pointer overflow-hidden"
          onClick={onOpenDetails}
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            unoptimized
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Subtle cinematic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent pointer-events-none" />
        </div>

        {/* Quick action overlay button */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={onOpenDetails}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-white dark:hover:bg-zinc-800 text-white dark:hover:text-white hover:text-zinc-900 text-xs font-medium backdrop-blur-md border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label={`${tViewDetails}: ${project.title}`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tViewDetails}</span>
          </button>
        </div>

        {/* Category & Status Badge in top right */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-md text-red-400 border border-red-500/30">
            {project.categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
};
