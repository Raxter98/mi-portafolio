"use client";

import dynamic from "next/dynamic";
import { useTranslation } from "../hooks/useTranslation";

const Education = dynamic(() => import("@/components/Education/page"), {
  ssr: false,
});

const MyProjects = dynamic(() => import("@/components/myProjects/page"), {
  ssr: false,
});

const Logos = dynamic(() => import("@/components/logos/page"), {
  ssr: false,
});

const Companies = dynamic(() => import("@/components/companies/page"), {
  ssr: false,
});

const Tags = dynamic(() => import("@/components/tags/page"), {
  ssr: false,
});

const TagsTwo = dynamic(() => import("@/components/tagsTwo/page"), {
  ssr: false,
});

const Subtitle = dynamic(() => import("@/components/subtittle/page"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/footer/page"), {
  ssr: false,
});

const Welcome = dynamic(() => import("@/components/welcome/page"), {
  ssr: false,
});

const Skills = dynamic(() => import("@/components/skills/page"), {
  ssr: false,
});

const Contact = dynamic(() => import("@/components/contact/page"), {
  ssr: false,
});

const Navbar = dynamic(() => import("@/components/nav/page"), {
  ssr: false,
});

const ThreeHero = dynamic(() => import("@/components/threeHero/page"), {
  ssr: false,
});

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="portfolio-shell flex flex-col items-center overflow-x-hidden bg-zinc-950 dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <Navbar />

      <div id="home" />

      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden px-5 pt-28 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(239,68,68,0.28),transparent_34%),linear-gradient(135deg,#09090b_0%,#111113_50%,#18181b_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-zinc-950 to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-[0.92fr_1.08fr]">
          <div className="max-w-3xl">
          <Welcome />
          <Subtitle />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:marcos@marcosvalero.com"
                className="w-fit rounded-md bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400"
              >
                marcos@marcosvalero.com
              </a>
              <a
                href="https://wa.me/56935264725"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-red-300 hover:bg-white/15"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="relative -mx-5 md:mx-0">
            <ThreeHero />
          </div>
        </div>
      </section>

      <div id="about" />

      {/* TITULO EXPERIENCIA */}
      <section className="text-start w-full mt-24 max-w-7xl px-5 md:px-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
          Experiencia
        </p>
        <h1 className="text-zinc-900 dark:text-white text-3xl md:text-5xl flex flex-wrap">
          <span className="bg-red-500 px-3 py-2">
            {t.companies.title1}
          </span>
        </h1>

        <h1 className="text-zinc-900 dark:text-white text-3xl md:text-5xl mt-4">
          <span className="border-b-2 border-red-500">
            {t.companies.title2}
          </span>
        </h1>
      </section>

      {/* EXPERIENCIA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-10 w-full max-w-7xl px-5 md:px-10 mt-16">
        {/* MIDLEVEL */}
        <div className="flex flex-col">
          <Companies
            position={t.companies.jobs.midlevel.position}
            enterprise={t.companies.jobs.midlevel.enterprise}
            date={t.companies.jobs.midlevel.date}
            description={t.companies.jobs.midlevel.description}
          />

          <Tags />

          <div className="hidden md:block ml-2 w-2 h-20 rounded-2xl bg-slate-600 mt-6" />
        </div>

        <div className="relative flex justify-center items-center min-h-[350px] h-full">
          {/* decoracion */}
          <div className="hidden md:block absolute right-10 top-0 -bottom-20 w-4 bg-red-500 rounded-t-2xl z-10" />

          <div className="hidden md:block absolute right-0 top-10 w-64 h-64 bg-gray-400/20 rounded-3xl blur-2xl animate-pulse" />

          <div className="relative z-20">
            <Logos image={"/freelance.png"} />
          </div>

          <div className="block md:hidden absolute top-full left-1/2 -translate-x-1/2 w-2 h-16 bg-slate-600 rounded-b-xl z-0" />
        </div>

        {/* ARZOBISPADO */}
        <div className="flex flex-col">
          <Companies
            position={t.companies.jobs.archbishopric.position}
            enterprise={t.companies.jobs.archbishopric.enterprise}
            date={t.companies.jobs.archbishopric.date}
            description={t.companies.jobs.archbishopric.description}
          />

          <Tags />

          <div className="hidden md:block ml-2 w-2 h-20 rounded-2xl bg-slate-600 mt-6" />
        </div>

        <div className="relative flex justify-center items-center min-h-[350px] h-full">
          {/* decoracion */}
          <div className="hidden md:block absolute right-10 top-0 -bottom-20 w-4 bg-red-500 z-10" />

          <div className="hidden md:block absolute right-0 top-10 w-64 h-64 bg-gray-400/20 rounded-3xl blur-2xl animate-pulse" />

          <div className="relative z-20">
            <Logos image={"/logo_arzobispado.svg"} />
          </div>

          <div className="block md:hidden absolute top-full left-1/2 -translate-x-1/2 w-2 h-16 bg-slate-600 rounded-b-xl z-0" />
        </div>

        {/* FREELANCE */}
        <div className="flex flex-col">
          <Companies
            position={t.companies.jobs.freelance.position}
            enterprise={t.companies.jobs.freelance.enterprise}
            date={t.companies.jobs.freelance.date}
            description={t.companies.jobs.freelance.description}
          />

          <TagsTwo />
        </div>

        <div className="relative flex justify-center items-center min-h-[350px] h-full">
          {/* decoracion */}
          <div className="hidden md:block absolute right-10 top-0 bottom-0 w-4 bg-red-500 rounded-b-2xl z-10" />

          <div className="hidden md:block absolute right-0 top-10 w-64 h-64 bg-gray-400/20 rounded-3xl blur-2xl animate-pulse" />

          <div className="relative z-20">
            <Logos image={"/freelance.png"} />
          </div>
        </div>
      </section>

      <div id="projects" />

      {/* PROYECTOS (Interactive 3D Cube) */}
      <section className="w-full max-w-7xl px-5 md:px-10 mb-20">
        <MyProjects />
      </section>

      <div id="skills" />

      {/* SKILLS */}
      <section className="w-full max-w-7xl px-5 md:px-10 mt-36 rounded-none">
        <Skills />
      </section>

      <div id="education" />

      {/* EDUCATION */}
      <section className="w-full">
        <Education />
      </section>

      <div id="contact" />

      {/* CONTACT */}
      <section className="w-full">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}
