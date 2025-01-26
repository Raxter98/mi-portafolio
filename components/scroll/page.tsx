import lottie from "lottie-web";
import { useRef, useEffect } from "react";
const Scroll = () => {
  const animationContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current as Element, // Type assertion aquí
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/scroll.json",
      });
    }
    return () => {
      lottie.destroy(); // Limpia la animación al desmontar el componente
    };
  }, []);

  return (
    <div
      ref={animationContainer}
      className="w-10 h-10 absolute  transition  delay-100 ease-in-out 
                       

                       "
    ></div>
  );
};

export default Scroll;
