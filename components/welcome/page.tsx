"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../../hooks/useTranslation";

const Welcome = () => {
  const { t } = useTranslation();
  const speaking = t.welcome.speaking;
  const [render, setRender] = useState("");
  const [welcomeTittle, setWelcome] = useState(false);
  const started = useRef(false);

  const welcome = (key: number, array: number) => {
    if (!speaking[array] || speaking[array][key] == null) {
      if (array === speaking.length - 1) {
        return console.log("Fin del contenido en el último array");
      }
      array++;
      return setTimeout(() => {
        welcome(0, array);
        setRender("");
      }, 2000);
    }
    setRender((prev) => prev + speaking[array][key]);
    if (speaking[array] === " Welcome.") {
      setWelcome(true);
    }
    if (key < speaking[array].length - 1) {
      setTimeout(() => {
        welcome(key + 1, array);
      }, 150);
    } else {
      if (array === speaking.length - 1) {
        const interval = setInterval(() => {
          setRender((prev) => {
            if (prev.endsWith(".")) return prev;
            return prev + ".";
          });
        }, 3000);
        return () => clearInterval(interval);
      }
      setTimeout(() => {
        welcome(0, array + 1);
        setRender("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    welcome(0, 0);
  }, []);

  return (
    <main className="overflow-hidden relative items-center sm:items-start z-10 overflow-x-hidden">
      {/* Top bar — social links + CV */}
      <div className="w-full h-10 flex md:justify-between items-end mb-6">
        <div className="flex gap-3 items-center">
          <a
            href="https://www.linkedin.com/in/marcos-valero-50800525a/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all duration-300"
          >
            <Image
              className="rounded-sm"
              src="/linkedin.png"
              alt="LinkedIn"
              width={16}
              height={16}
            />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              LinkedIn
            </span>
          </a>

          <a
            href="https://github.com/Raxter98"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 hover:border-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300"
          >
            <Image
              className="rounded-full dark:invert"
              src="/github.png"
              alt="GitHub"
              width={16}
              height={16}
            />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              GitHub
            </span>
          </a>
        </div>

        <a href="/cv.pdf" download="cv.pdf" className="ml-3 md:ml-0">
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-400 active:scale-95 px-4 py-1.5 rounded-full transition-all duration-200 shadow-md shadow-red-500/30">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <p className="text-white text-xs font-semibold">{t.welcome.downloadCv}</p>
          </button>
        </a>
      </div>

      {/* Greeting */}
      <p className="text-xl text-zinc-600 dark:text-zinc-400 md:text-2xl lg:text-3xl xl:text-4xl tracking-wide mb-1">
        {t.welcome.hi}
      </p>

      {/* Name line */}
      <p className="text-2xl text-zinc-900 dark:text-white md:text-3xl lg:text-4xl mb-4 font-light">
        {t.welcome.myNameIs}
        <span className="bg-red-500 text-white px-2 py-0.5 ml-1 rounded font-bold">
          Marcos Valero
        </span>
      </p>

      {/* Animated title */}
      <section className="md:flex">
        <h1 className="flex flex-wrap text-4xl md:text-6xl lg:text-7xl bg-clip-text text-zinc-900 dark:text-white">
          {render.split(" ").map((word, index) => (
            <span key={index} className="border-b-4 border-red-500 mr-2 mb-1">
              {word}
            </span>
          ))}
          <p className="opacity-0 animate-[pulse_1s_infinite] text-4xl md:text-6xl lg:text-7xl">|</p>
        </h1>
      </section>

      {/* Developer label */}
      <p className="inline-block text-4xl md:text-6xl lg:text-7xl text-zinc-900 dark:text-white mt-1">
        {t.welcome.developer}
      </p>
    </main>
  );
};

export default Welcome;
