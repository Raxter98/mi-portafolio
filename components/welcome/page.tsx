"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../../hooks/useTranslation";
import { Download, Github, Linkedin, Briefcase } from "lucide-react";

const Welcome = () => {
  const { t } = useTranslation();
  const speaking: string[] = t.welcome.speaking || [
    "Software Engineer",
    "Full Stack",
    "Web & Mobile",
    "AI Workflows",
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % speaking.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [speaking.length]);

  return (
    <main className="relative flex flex-col z-10 w-full mb-6">
      {/* Top bar — social links + CV */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <div className="flex gap-3 items-center">
          <a
            href="https://www.linkedin.com/in/marcos-valero-50800525a/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-300 shadow-sm"
          >
            <Linkedin className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              LinkedIn
            </span>
          </a>

          <a
            href="https://github.com/Raxter98"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm"
          >
            <Github className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              GitHub
            </span>
          </a>
        </div>

        <a href="/cv.pdf" download="cv.pdf" className="inline-block">
          <button className="group flex items-center gap-2 bg-red-600 hover:bg-red-500 active:scale-95 px-5 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950">
            <Download className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-white text-xs font-bold tracking-wide">
              {t.welcome.downloadCv?.replace(" ↴", "") || "Download CV"}
            </span>
          </button>
        </a>
      </div>

      {/* Greeting and Identity */}
      <div className="flex flex-col mb-4">
        <h2 className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium tracking-wide mb-2 flex items-center gap-2">
          <span className="text-red-500 animate-pulse">👋</span>
          {t.welcome.hi} {t.welcome.myNameIs}
        </h2>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-zinc-900 dark:text-white tracking-tight leading-none mb-6">
          Marcos
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
            Valero.
          </span>
        </h1>
      </div>

      {/* Dynamic Animated Roles */}
      <div className="flex items-center text-3xl md:text-5xl lg:text-6xl font-extrabold text-zinc-800 dark:text-zinc-200 mb-6">
        <span className="inline-grid text-left">
          {speaking.map((role, idx) => (
            <span
              key={idx}
              aria-hidden={idx !== activeIndex}
              className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out pb-2 ${
                idx === activeIndex
                  ? "opacity-100 translate-y-0 pointer-events-auto blur-none"
                  : "opacity-0 translate-y-8 pointer-events-none blur-sm"
              }`}
            >
              {role.trim()}
            </span>
          ))}
        </span>
        <span className="text-red-500 ml-1 animate-pulse">_</span>
      </div>

      {/* Main Profession Badge */}
      <div className="flex items-center mt-2">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-sm md:text-base font-semibold text-zinc-700 dark:text-zinc-300">
            {t.welcome.developer}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
