"use client";

import { useTranslation } from "../../hooks/useTranslation";
import { Code, Smartphone, Server, Database, GitBranch, Network } from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";

export default function SoftwareSection() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Code,
      data: t.software.pillars.web,
    },
    {
      icon: Smartphone,
      data: t.software.pillars.mobile,
    },
    {
      icon: Server,
      data: t.software.pillars.api,
    },
    {
      icon: Database,
      data: t.software.pillars.database,
    },
    {
      icon: GitBranch,
      data: t.software.pillars.sdd,
    },
    {
      icon: Network,
      data: t.software.pillars.it,
    },
  ];

  return (
    <section id="software" className="w-full max-w-7xl px-5 md:px-10 mt-28">
      {/* Section Header */}
      <Slide direction="down" triggerOnce>
        <div className="text-start mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
            {t.software.badge}
          </p>
          <h2 className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-bold flex flex-wrap gap-2">
            <span className="bg-red-500 text-white px-3 py-1 rounded">
              {t.software.title1}
            </span>
          </h2>
          <h3 className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-bold mt-2">
            <span className="border-b-2 border-red-500">
              {t.software.title2}
            </span>
          </h3>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-base max-w-3xl leading-relaxed">
            {t.software.subtitle}
          </p>
        </div>
      </Slide>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <Fade key={index} delay={index * 100} triggerOnce>
              <div className="group h-full flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 shadow-xl shadow-black/5 dark:shadow-black/30 backdrop-blur transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/10 hover:-translate-y-1">
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center text-red-500 transition-colors group-hover:bg-red-500 group-hover:text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors">
                    {pillar.data.title}
                  </h4>

                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                    {pillar.data.desc}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-white/5">
                  {pillar.data.badges.map((badge: string, bIdx: number) => (
                    <span
                      key={bIdx}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </Fade>
          );
        })}
      </div>
    </section>
  );
}
