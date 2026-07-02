"use client";

import { useState, useEffect } from "react";
import Switcher from "../switcher/switcher";
import Select from "../select/select";
import { useTranslation } from "../../hooks/useTranslation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: t.nav.home, id: "home" },
    { name: t.nav.experience, id: "about" },
    { name: t.nav.projects, id: "projects" },
    { name: t.nav.skills, id: "skills" },
    { name: t.nav.education, id: "education" },
    { name: t.nav.contact, id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200/50 dark:border-white/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => scrollToSection("home")} 
          className="flex items-center flex-shrink-0 group focus:outline-none"
        >
          <img
            src="/logoMarcos.svg"
            alt="Marcos Valero Logo"
            className="w-auto h-7 md:h-9 dark:invert transition-all duration-300 group-hover:scale-105"
          />
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 flex-1 justify-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="px-4 py-2 text-sm font-semibold tracking-wide text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-white transition-colors relative group focus:outline-none"
            >
              {link.name}
              <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4 rounded-full" />
            </button>
          ))}
        </nav>

        {/* Actions (Language, Theme, Mobile Toggle) */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          <div className="hidden sm:flex items-center bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg p-1">
            <Select />
          </div>
          
          <div className="flex items-center">
            <Switcher />
          </div>
          
          <button
            className="lg:hidden p-2 -mr-2 text-zinc-800 dark:text-zinc-200 hover:text-red-500 transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/10 shadow-xl transition-all duration-300 ease-in-out origin-top overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 px-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="w-full py-3 text-base font-medium text-zinc-800 dark:text-zinc-200 hover:text-red-500 dark:hover:text-red-400 hover:bg-zinc-50 dark:hover:bg-white/5 rounded-xl transition-colors focus:outline-none"
            >
              {link.name}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-white/10 w-full flex justify-center sm:hidden">
            <div className="bg-zinc-100/50 dark:bg-zinc-900/50 rounded-lg p-2">
              <Select />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
