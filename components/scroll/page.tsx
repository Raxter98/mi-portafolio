"use client";
import lottie, { AnimationItem } from "lottie-web";
import { useRef, useEffect } from "react";

const Scroll = () => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  const animationInstance = useRef<AnimationItem | null>(null); // 🔹 Instancia propia

  useEffect(() => {
    if (animationContainer.current) {
      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/scroll.json",
      });
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy(); // 🔹 Solo destruye esta animación
      }
    };
  }, []);

  return (
    <div
      ref={animationContainer}
      className="w-10 h-10 absolute transition delay-100 ease-in-out"
    ></div>
  );
};

export default Scroll;