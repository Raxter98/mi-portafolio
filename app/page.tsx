"use client";

import dynamic from "next/dynamic";
import { useTranslation } from "../hooks/useTranslation";

const Education = dynamic(() => import("@/components/Education/page"), {
  ssr: false,
});

const Projects = dynamic(() => import("@/components/projects/page"), {
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

const Programing = dynamic(() => import("@/components/programing/page"), {
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

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <Navbar />

      <div id="home" />

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-7xl px-5 md:px-10 pt-10">
        <div>
          <Welcome />
          <Subtitle />
        </div>

        <div className="hidden md:flex justify-center items-center">
          <div className="rounded-full shadow-lg shadow-red-500/50">
            <Programing />
          </div>
        </div>
      </section>

      <div id="about" />

      {/* TITULO EXPERIENCIA */}
      <section className="text-start w-full mt-32 max-w-7xl px-5 md:px-10">
        <h1 className="text-black dark:text-white text-3xl md:text-5xl flex flex-wrap">
          <span className="bg-red-500 p-2">
            {t.companies.title1}
          </span>
        </h1>

        <h1 className="text-black dark:text-white text-3xl md:text-5xl mt-4">
          <span className="border-b-2 border-red-500">
            {t.companies.title2}
          </span>
        </h1>
      </section>

      {/* EXPERIENCIA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-10 w-full max-w-7xl px-5 md:px-10 mt-20">
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

      {/* TITULO PROYECTOS */}
      <section className="text-start w-full mt-36 mb-10 max-w-7xl px-5 md:px-10">
        <h1 className="text-black dark:text-white text-3xl md:text-5xl flex flex-wrap">
          <span className="bg-red-500 p-2">
            {t.projects.title1}
          </span>
        </h1>

        <h1 className="text-black dark:text-white text-3xl md:text-5xl mt-4">
          <span className="border-b-2 border-red-500">
            {t.projects.title2}
          </span>
        </h1>
      </section>

      {/* PROYECTOS */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl px-5 md:px-10">
        {/* principal */}
        <div className="md:row-span-2 z-10">
          <Projects
            enterpriseName={t.projects.items.worldker.title}
            appName={t.projects.items.worldker.text}
            imageUrl="/worldker.png"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.arzobispadoWeb.title}
            appName={t.projects.items.arzobispadoWeb.text}
            imageUrl="/arzobispado.webp"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.arzobispadoCrud.title}
            appName={t.projects.items.arzobispadoCrud.text}
            imageUrl="/crud.webp"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.alcaldia.title}
            appName={t.projects.items.alcaldia.text}
            imageUrl="/projects/Alcaldia.webp"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.autovidrios.title}
            appName={t.projects.items.autovidrios.text}
            imageUrl="/projects/AutoVidrios.webp"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.fiado.title}
            appName={t.projects.items.fiado.text}
            imageUrl="/projects/Fiado.webp"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.jccrp.title}
            appName={t.projects.items.jccrp.text}
            imageUrl="/projects/Jccrp.webp"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.perfecttrainer.title}
            appName={t.projects.items.perfecttrainer.text}
            imageUrl="/projects/perfecttrainer.webp"
          />
        </div>

        <div className="z-10">
          <Projects
            enterpriseName={t.projects.items.tourtrack.title}
            appName={t.projects.items.tourtrack.text}
            imageUrl="/projects/TourTrack.webp"
          />
        </div>

        {/* decoracion */}
        <div className="hidden md:flex absolute left-0 right-0 -bottom-16 justify-center items-center z-0">
          <div className="bg-gray-300/20 dark:bg-gray-600/20 rounded-3xl h-[150px] w-[700px] flex items-end justify-center pb-5 animate-pulse backdrop-blur-sm">
            <div className="bg-red-500 rounded-xl h-[15px] w-1/2" />
          </div>
        </div>
      </section>

      <div id="skills" />

      {/* SKILLS */}
      <section className="w-full max-w-7xl px-5 md:px-10 mt-36">
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