"use client";

import { useTranslation } from "../../hooks/useTranslation";

interface atributos {
  position: String;
  enterprise: String;
  date: String;
  description: String;
}

const Companies = ({ position, enterprise, date, description }: atributos) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 shadow-xl shadow-black/10 dark:shadow-black/30 backdrop-blur transition-all duration-300 hover:border-red-500/40 hover:shadow-red-500/10">
      {/* Position + Role */}
      <div className="flex gap-2 flex-wrap mb-5">
        <h1 className="text-zinc-900 dark:text-white text-2xl lg:text-3xl">
          <span className="border-b-2 border-red-500">{position}</span>
        </h1>
        <p className="text-zinc-900 dark:text-white text-2xl lg:text-3xl">
          <span className="bg-red-500 text-white px-2 py-0.5 rounded">{t.companies.developer}</span>
        </p>
      </div>

      {/* Enterprise + Date */}
      <h2 className="text-zinc-700 dark:text-zinc-200 text-xl lg:text-2xl mb-4 flex flex-wrap items-center gap-2">
        <span className="border-b-2 border-red-500">{enterprise}</span>
        <span className="text-zinc-400 dark:text-zinc-500 text-base font-normal">/ {date}</span>
      </h2>

      {/* Description */}
      <h3 className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base md:text-base lg:text-lg leading-relaxed">
        {description}
      </h3>
    </div>
  );
};

export default Companies;
