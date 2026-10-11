"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { PROJECTS_DATA, ProjectCategory } from "./projectsData";
import { ProjectSpotlightStage, LocalizedProject } from "./ProjectSpotlightStage";
import { ProjectDeck } from "./ProjectDeck";
import { ProjectFilters, CategoryFilterItem } from "./ProjectFilters";
import { ProjectDetailModal } from "./ProjectDetailModal";

const MyProjects = () => {
  const { t } = useTranslation();

  const [activeProjectId, setActiveProjectId] = useState<string>("worldker");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Reduced motion media query listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Map raw catalog to localized project records
  const localizedProjects: LocalizedProject[] = useMemo(() => {
    return PROJECTS_DATA.map((record, index) => {
      const itemKey = record.id as keyof typeof t.projects.items;
      const translation = t.projects?.items?.[itemKey] as { title?: string; text?: string } | undefined;

      const title = translation?.title || record.id;
      const description = translation?.text || "";

      let categoryLabel = "Proyecto";
      if (record.category === "mobile") {
        categoryLabel = t.projects?.showcase?.categories?.mobile || "Apps Móviles";
      } else if (record.category === "web") {
        categoryLabel = t.projects?.showcase?.categories?.web || "Plataformas Web";
      } else if (record.category === "enterprise_pwa") {
        categoryLabel = t.projects?.showcase?.categories?.enterprise_pwa || "Sistemas y PWAs";
      }

      return {
        ...record,
        title,
        description,
        categoryLabel,
        indexString: String(index + 1).padStart(2, "0"),
      };
    });
  }, [t]);

  // Compute categories array with live counts
  const categories: CategoryFilterItem[] = useMemo(() => {
    const allCount = localizedProjects.length;
    const mobileCount = localizedProjects.filter((p) => p.category === "mobile").length;
    const webCount = localizedProjects.filter((p) => p.category === "web").length;
    const enterpriseCount = localizedProjects.filter((p) => p.category === "enterprise_pwa").length;

    return [
      {
        id: "all",
        label: t.projects?.showcase?.categories?.all || "Todos",
        count: allCount,
        ariaLabel: `Ver todos los proyectos (${allCount})`,
      },
      {
        id: "mobile",
        label: t.projects?.showcase?.categories?.mobile || "Apps Móviles",
        count: mobileCount,
        ariaLabel: `Ver aplicaciones móviles (${mobileCount})`,
      },
      {
        id: "web",
        label: t.projects?.showcase?.categories?.web || "Plataformas Web",
        count: webCount,
        ariaLabel: `Ver plataformas web (${webCount})`,
      },
      {
        id: "enterprise_pwa",
        label: t.projects?.showcase?.categories?.enterprise_pwa || "Sistemas y PWAs",
        count: enterpriseCount,
        ariaLabel: `Ver sistemas empresariales y PWAs (${enterpriseCount})`,
      },
    ];
  }, [localizedProjects, t]);

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return localizedProjects;
    return localizedProjects.filter((p) => p.category === selectedCategory);
  }, [localizedProjects, selectedCategory]);

  // Determine currently spotlighted project
  const currentProject = useMemo(() => {
    const found = filteredProjects.find((p) => p.id === activeProjectId);
    return found || filteredProjects[0] || localizedProjects[0];
  }, [filteredProjects, activeProjectId, localizedProjects]);

  const currentIndex = useMemo(() => {
    const idx = filteredProjects.findIndex((p) => p.id === currentProject.id);
    return idx >= 0 ? idx : 0;
  }, [filteredProjects, currentProject]);

  // Select category and auto-synchronize active project
  const handleSelectCategory = useCallback(
    (category: ProjectCategory) => {
      setSelectedCategory(category);

      const targetSubset =
        category === "all"
          ? localizedProjects
          : localizedProjects.filter((p) => p.category === category);

      if (targetSubset.length > 0 && !targetSubset.some((p) => p.id === activeProjectId)) {
        setActiveProjectId(targetSubset[0].id);
      }
    },
    [localizedProjects, activeProjectId]
  );

  // Navigation handlers
  const handleSelectProject = useCallback((id: string) => {
    setActiveProjectId(id);
  }, []);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    const prevProject = filteredProjects[prevIdx];
    if (prevProject) {
      setActiveProjectId(prevProject.id);
    }
  }, [currentIndex, filteredProjects]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    const nextProject = filteredProjects[nextIdx];
    if (nextProject) {
      setActiveProjectId(nextProject.id);
    }
  }, [currentIndex, filteredProjects]);

  const handleOpenDetails = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Keyboard navigation for section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, isModalOpen]);

  const tBadge = t.projects?.showcase?.badge || "Portafolio de Ingeniería";
  const tTitle1 = t.projects?.title1 || "PROYECTOS DESTACADOS Y";
  const tTitle2 = t.projects?.title2 || "TRABAJO DE INGENIERÍA";
  const tSubtitle =
    t.projects?.subtitle ||
    "Exploración interactiva de proyectos destacados en desarrollo móvil, plataformas web y sistemas empresariales.";

  return (
    <div className={`w-full mt-16 ${prefersReducedMotion ? "motion-reduce" : ""}`}>
      {/* Section Header */}
      <div className="text-start mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-red-500 bg-red-500/10 border border-red-500/20 mb-3">
          <span>{tBadge}</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex flex-wrap gap-x-3 gap-y-1">
          <span>{tTitle1}</span>
          <span className="text-red-500">{tTitle2}</span>
        </h2>

        <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
          {tSubtitle}
        </p>
      </div>

      {/* Discipline Category Filter Tabs */}
      <ProjectFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Interactive Editorial Showcase Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-zinc-50/50 dark:bg-zinc-900/40 p-5 sm:p-8 md:p-10 rounded-3xl border border-zinc-200/80 dark:border-white/5 shadow-xl shadow-black/5">
        {/* Left Column: Project Deck & Index */}
        <div className="lg:col-span-5 w-full">
          <ProjectDeck
            project={currentProject}
            currentIndex={currentIndex}
            totalCount={filteredProjects.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onOpenDetails={handleOpenDetails}
            projectsList={filteredProjects}
            onSelectProject={handleSelectProject}
          />
        </div>

        {/* Right Column: Cinematic Focus Stage */}
        <div className="lg:col-span-7 w-full">
          <ProjectSpotlightStage
            project={currentProject}
            onOpenDetails={handleOpenDetails}
          />
        </div>
      </div>

      {/* Accessible In-Depth Inspection Modal */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        project={currentProject}
        currentIndex={currentIndex}
        totalCount={filteredProjects.length}
        onClose={handleCloseModal}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default MyProjects;
