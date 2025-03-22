"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface Propiedades {
  image: string;
}

const Logos = ({ image }: Propiedades) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Se activa cuando el 20% del componente es visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500 transform ${
        isVisible ? "z-20 animate-fade-left animate-delay-150" : "opacity-0 translate-x-10"
      }`}
    >
      <Image src={image} alt="Logo" width={300} height={300} />
    </div>
  );
};

export default Logos;