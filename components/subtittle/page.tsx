"use client";
import { useEffect, useRef } from "react";
import Aos from "aos";
import { useTranslation } from "../../hooks/useTranslation";

const Subtitle = () => {
  const { t } = useTranslation();
  const subtitle = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      subtitle.current?.classList.remove("hidden");
      subtitle.current?.setAttribute("data-aos", "zoom-out");
      Aos.init({ duration: 1000, delay: 0, once: true, mirror: false, offset: -1000000, easing: "ease-out-back" });

      setTimeout(() => {
        Aos.refreshHard();
        Aos.init({ duration: 1000, delay: 100, offset: 100, mirror: true, once: false });
      }, 500);
    }, 14000);
  }, []);

  return (
    <p
      ref={subtitle}
      className="hidden font-light text-base lg:text-lg xl:text-xl text-zinc-600 dark:text-zinc-400 mt-4 max-w-lg leading-relaxed"
    >
      {t.subtitle.text}
    </p>
  );
};

export default Subtitle;
