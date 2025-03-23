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
        className={`absolute top-4 left-4 bg-red-500 bg-opacity-80 text-white p-3 rounded-md transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-lg font-semibold">{enterpriseName}</h3>
        <p className="text-sm">{appName}</p>
      </div>
    </div>
  );
};

export default Projects;