"use client";

import React, { useState, useEffect } from "react";

const Switcher = () => {
  // true = dark mode (default)
  const [isDark, setIsDark] = useState(true);

  // Apply initial class on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`
        relative inline-flex items-center h-8 w-[60px] rounded-full
        cursor-pointer select-none transition-all duration-300 focus:outline-none
        ${isDark ? "bg-zinc-700 shadow-inner shadow-zinc-900" : "bg-zinc-200 shadow-inner shadow-zinc-400"}
      `}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-[11px] select-none transition-opacity duration-200"
        style={{ opacity: isDark ? 0.4 : 0 }}>
        ☀️
      </span>
      <span className="absolute right-1.5 text-[11px] select-none transition-opacity duration-200"
        style={{ opacity: isDark ? 1 : 0.4 }}>
        🌙
      </span>

      {/* Thumb */}
      <span
        className={`
          absolute top-1 h-6 w-6 rounded-full shadow-md
          flex items-center justify-center text-sm
          transition-all duration-300 ease-in-out
          ${isDark
            ? "translate-x-[30px] bg-zinc-900 text-white"
            : "translate-x-1 bg-white text-yellow-500"
          }
        `}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default Switcher;
