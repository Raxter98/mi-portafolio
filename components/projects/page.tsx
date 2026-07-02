"use client";

import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import Aos from "aos";


interface Propiedades {
  enterpriseName: string;
  appName: string;
  imageUrl: string;
}

const Projects = ({ enterpriseName, appName, imageUrl }: Propiedades) => {
  const [hovered, setHovered] = useState(false);

useEffect(() => {
    Aos.init({ duration: 1000, delay: 100, mirror: true, offset: 500 });
  }, []);

  return (
    <div
      className="group relative w-full aspect-[16/10] h-full overflow-hidden rounded-lg border border-white/10 bg-cover bg-no-repeat bg-left-top cursor-pointer shadow-2xl shadow-black/30"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-aos="fade-up"
    >
      {/* Overlay Oscuro */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent transition-opacity duration-300 group-hover:from-red-950/80" />

      {/* Información (Aparece en Hover en PC, siempre visible o adaptado en Móvil) */}
      <div
        className={`absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 backdrop-blur-md bg-zinc-950/78 border border-red-500/30 text-white p-3 md:p-5 rounded-lg shadow-xl shadow-red-900/20 transform transition-all duration-300 ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-2 md:translate-y-4 opacity-100 md:opacity-0"
        }`}
      >
        <h3 className="text-base md:text-xl font-bold mb-0.5 md:mb-1 truncate">{enterpriseName}</h3>
        <p className="text-xs md:text-sm text-gray-100 leading-tight md:leading-relaxed line-clamp-2 md:line-clamp-none">{appName}</p>
      </div>
    </div>
  );
};

export default Projects;
