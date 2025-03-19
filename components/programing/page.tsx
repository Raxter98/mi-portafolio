"use client";
import lottie, { AnimationItem } from "lottie-web";
import { useRef, useEffect } from "react";

const Programing = () => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null); // 🔹 Guarda la instancia de esta animación

  useEffect(() => {
    if (animationContainer.current) {
      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/programing.json",
      });
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy(); // 🔹 Solo destruye ESTA animación
      }
    };
  }, []);

  return (
    <div
      ref={animationContainer}
      className="w-64  opacity-100 transition duration-300 z-50 delay-100 ease-in-out"
    ></div>
  );
};

export default Programing;