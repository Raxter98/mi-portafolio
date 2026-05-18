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
      className="relative w-full aspect-[16/10] h-full bg-cover bg-no-repeat bg-left-top   overflow-hidden cursor-pointer"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-aos="fade-up"
    >
      {/* Overlay Oscuro */}
      <div className="absolute inset-0 bg-black hover:bg-gray-500 hover:bg-opacity-40 bg-opacity-40 transition-opacity duration-300" />

      {/* Información (Aparece en Hover) */}
      <div
        className={`absolute bottom-6 left-6 right-6 backdrop-blur-md bg-red-900/60 border border-red-500/30 text-white p-5 rounded-2xl shadow-xl shadow-red-900/20 transform transition-all duration-300 ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h3 className="text-xl font-bold mb-1">{enterpriseName}</h3>
        <p className="text-sm text-gray-100 leading-relaxed">{appName}</p>
      </div>
    </div>
  );
};

export default Projects;