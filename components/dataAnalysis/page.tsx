"use client";

import Link from "next/link";
import { ArrowRight, BarChart2, Database, Sparkles } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import LoopingVideoPlayer from "./LoopingVideoPlayer";

export default function DataAnalysisSection() {
  const { t } = useTranslation();

  return (
    <section
      id="data-analysis"
      className="relative w-full max-w-7xl px-5 md:px-10 mt-28 scroll-mt-24"
      aria-label={t.dataAnalysis.title}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          {t.dataAnalysis.badge}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Context, Features & CTA */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              {t.dataAnalysis.title}
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
            {t.dataAnalysis.description}
          </p>

          {/* Quick Highlight Badges */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200">
              <Database className="w-3.5 h-3.5 text-red-500" />
              Público e-commerce (1.000 pedidos)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200">
              <BarChart2 className="w-3.5 h-3.5 text-red-500" />
              Hospital-patients (1.000 pacientes)
            </span>
          </div>

          {/* Action CTA Button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/data-analysis"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
            >
              <span>{t.dataAnalysis.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Looping Video Showcase Container */}
        <div className="lg:col-span-6 w-full">
          <div className="relative group">
            {/* Ambient accent card background border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-500/20 via-zinc-500/10 to-red-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500 -z-10" />

            <div className="rounded-2xl">
              <LoopingVideoPlayer
                src="/videos/data-preview.mp4"
                href="/data-analysis"
                alt={t.dataAnalysis.videoFallbackAlt}
                className="w-full aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
