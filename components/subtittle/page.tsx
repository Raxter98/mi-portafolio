"use client";
import { useTranslation } from "../../hooks/useTranslation";

const Subtitle = () => {
  const { t } = useTranslation();

  return (
    <p className="font-light text-base md:text-lg xl:text-xl text-zinc-600 dark:text-zinc-300 mt-4 max-w-2xl leading-relaxed animate-fadeIn">
      {t.subtitle.text}
    </p>
  );
};

export default Subtitle;
