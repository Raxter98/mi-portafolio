"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Switcher from "../switcher/switcher";
import Select from "../select/select";
import { useTranslation } from "../../hooks/useTranslation";

export default function DashboardNavbar() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200/50 dark:border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        {/* Back Link & Brand Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/#data-analysis"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-200 bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 hover:border-red-500 hover:text-red-500 dark:hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={t.dataDashboard.backButton}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.dataDashboard.backButton}</span>
          </Link>

          <Link
            href="/"
            className="hidden sm:flex items-center group focus:outline-none"
            aria-label="Marcos Valero Logo"
          >
            <Image
              src="/logoMarcos.svg"
              alt="Marcos Valero Logo"
              width={140}
              height={32}
              className="w-auto h-7 md:h-8 dark:invert transition-all duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center / Title Badge on large screens */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
            {t.dataDashboard.title}
          </span>
        </div>

        {/* Controls: Language, Theme */}
        <div className="flex items-center gap-3">
          <div className="sm:flex items-center bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg p-1">
            <Select />
          </div>

          <div className="flex items-center">
            <Switcher />
          </div>
        </div>
      </div>
    </header>
  );
}
