"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import dynamic from "next/dynamic";

const ProjectCube = dynamic(() => import("../ProjectCube/page"), { ssr: false });

interface Project {
  title: string;
  text: string;
  imageUrl: string;
  technologies: string[];
  video?: string;
}

const MyProjects = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // We memoize the projects array based on translations so it updates on language switch
  // But ProjectCube uses an empty dependency array for WebGL initialization to prevent reloading textures.
  const projects: Project[] = [
    {
      title: t.projects.items.worldker.title,
      text: t.projects.items.worldker.text,
      imageUrl: "/worldker.png",
      technologies: ["React Native", "Firebase", "i18n", "MySQL", "Git"],
      video: "/video2.mp4",
    },
    {
      title: t.projects.items.arzobispadoWeb.title,
      text: t.projects.items.arzobispadoWeb.text,
      imageUrl: "/arzobispado.webp",
      technologies: ["React", "Next.js", "CSS", "SEO"],
    },
    {
      title: t.projects.items.arzobispadoCrud.title,
      text: t.projects.items.arzobispadoCrud.text,
      imageUrl: "/crud.webp",
      technologies: ["Node.js", "MySQL", "Express", "React"],
    },
    {
      title: t.projects.items.alcaldia.title,
      text: t.projects.items.alcaldia.text,
      imageUrl: "/projects/Alcaldia.webp",
      technologies: ["React", "Node.js", "PostgreSQL"],
    },
    {
      title: t.projects.items.autovidrios.title,
      text: t.projects.items.autovidrios.text,
      imageUrl: "/projects/AutoVidrios.webp",
      technologies: ["React", "Node.js"],
    },
    {
      title: t.projects.items.fiado.title,
      text: t.projects.items.fiado.text,
      imageUrl: "/projects/Fiado.webp",
      technologies: ["PWA", "React", "Node.js"],
    },
    {
      title: t.projects.items.jccrp.title,
      text: t.projects.items.jccrp.text,
      imageUrl: "/projects/Jccrp.webp",
      technologies: ["React", "Node.js"],
    },
    {
      title: t.projects.items.perfecttrainer.title,
      text: t.projects.items.perfecttrainer.text,
      imageUrl: "/projects/perfecttrainer.webp",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      title: t.projects.items.tourtrack.title,
      text: t.projects.items.tourtrack.text,
      imageUrl: "/projects/TourTrack.webp",
      technologies: ["React Native", "Firebase"],
    }
  ];

  const selectedProject = projects[selectedIndex] || projects[0];

  const handleSelectProject = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
    setIsVideoPlaying(false);
  }, []);

  const handlePrev = () => {
    const prev = (selectedIndex - 1 + projects.length) % projects.length;
    setSelectedIndex(prev);
    setIsVideoPlaying(false);
  };

  const handleNext = () => {
    const next = (selectedIndex + 1) % projects.length;
    setSelectedIndex(next);
    setIsVideoPlaying(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    if (videoRef.current && isVideoPlaying && selectedProject.video) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [isVideoPlaying, selectedIndex, selectedProject]);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleCloseModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Safe fallbacks for translations
  const tDemo = t.cube?.demo || "Demo Interactiva";
  const tDragHint = t.cube?.dragHint || "Arrastra el elemento 3D o haz clic en una cara para ver los detalles del proyecto";
  const tTech = t.cube?.technologies || "Tecnologías";
  const tPrev = t.cube?.prev || "Anterior";
  const tNext = t.cube?.next || "Siguiente";
  const tStop = t.cube?.stop || "Detener";
  const tViewProject = t.cube?.viewProject || "Ver Proyecto";

  return (
    <div className="w-full mt-16">
      {/* Section heading */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400 mb-3">
          {tDemo}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">
          {t.projects.myProjects}
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
          {tDragHint}
        </p>
      </div>

      {/* Cube + Navigation */}
      <div className="relative flex flex-col items-center">
        {/* Nav arrows */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-white hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 shadow-md"
            aria-label={tPrev}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex">
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-white hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 shadow-md"
            aria-label={tNext}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 3D Carousel (Replacing Cube) */}
        <div className="w-full max-w-[600px] px-4 md:px-14">
          <ProjectCube
            projects={projects}
            onSelectProject={handleSelectProject}
            selectedIndex={selectedIndex}
          />
        </div>

        {/* Mobile nav arrows */}
        <div className="flex gap-4 mt-4 md:hidden">
          <button onClick={handlePrev} className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-white hover:bg-red-500 hover:text-white transition-all duration-200" aria-label={tPrev}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handleSelectProject(selectedIndex)}
            className="flex items-center justify-center px-5 h-11 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-400 transition-all duration-200"
          >
            {tViewProject}
          </button>
          <button onClick={handleNext} className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-white hover:bg-red-500 hover:text-white transition-all duration-200" aria-label={tNext}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Project dots indicator */}
        <div className="flex gap-2 mt-6 flex-wrap justify-center max-w-[80%]">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelectProject(i)}
              className={`transition-all duration-300 rounded-full ${
                i === selectedIndex
                  ? "w-6 h-2 bg-red-500"
                  : "w-2 h-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-red-400"
              }`}
              aria-label={`Proyecto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal de detalles del proyecto */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal card */}
          <div
            className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden
              bg-white dark:bg-zinc-900
              border border-zinc-200 dark:border-white/10
              shadow-2xl shadow-black/40
              animate-[fadeInScale_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeInScale 0.25s ease-out both" }}
          >
            {/* Image / Video header */}
            <div className="relative h-52 md:h-64 overflow-hidden">
              {isVideoPlaying && selectedProject.video ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                >
                  <source src={selectedProject.video} />
                </video>
              ) : (
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play button */}
              {selectedProject.video && !isVideoPlaying && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur border border-white/30 group-hover:bg-red-500/80 group-hover:border-red-400 transition-all duration-300">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Stop video */}
              {isVideoPlaying && (
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur border border-white/20 text-white text-xs px-3 py-1.5 rounded-full hover:bg-red-500/70 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" strokeWidth={2} />
                    <rect x="14" y="4" width="4" height="16" rx="1" strokeWidth={2} />
                  </svg>
                  {tStop}
                </button>
              )}

              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur border border-white/20 text-white hover:bg-red-500 hover:border-red-400 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Title over image */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg line-clamp-2">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Description */}
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                {selectedProject.text}
              </p>

              {/* Technologies */}
              <div>
                <p className="text-xs uppercase tracking-widest text-red-500 font-semibold mb-2">{tTech}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 rounded-full
                        bg-zinc-100 dark:bg-zinc-800
                        text-zinc-700 dark:text-zinc-300
                        border border-zinc-200 dark:border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation between projects */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {tPrev}
                </button>

                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {selectedIndex + 1} / {projects.length}
                </span>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  {tNext}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
