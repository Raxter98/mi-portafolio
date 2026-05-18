"use client";

import { useLanguage } from "../context/LanguageContext";
import en from "../locales/en.json";
import es from "../locales/es.json";

const translations = {
  en,
  es,
};

export const useTranslation = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return { t, language };
};
