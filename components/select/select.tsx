"use client";

import { useLanguage } from "../../context/LanguageContext";

const Select = () => {
    const { language, setLanguage } = useLanguage();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as "en" | "es");
    };

    return(
        <div className="relative flex items-center group">
            <select 
                value={language} 
                onChange={handleChange} 
                className="appearance-none bg-transparent border-none text-sm font-semibold tracking-wide text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white focus:outline-none cursor-pointer pl-2 pr-6 py-1 transition-colors"
                aria-label="Seleccionar idioma"
            >
                <option value="en" className="text-zinc-900 bg-white dark:bg-zinc-900 dark:text-white">EN</option>
                <option value="es" className="text-zinc-900 bg-white dark:bg-zinc-900 dark:text-white">ES</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-1 pointer-events-none text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    )
}

export default Select;