"use client";

import { useLanguage } from "../../context/LanguageContext";

const Select = () => {
    const { language, setLanguage } = useLanguage();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as "en" | "es");
    };

    return(
        <select value={language} onChange={handleChange} className="appearance-none bg-transparent border border-gray-400 rounded-md px-4  focus:outline-none cursor-pointer">
            <option value="en">EN</option>
            <option value="es">ES</option>
        </select>
    )
}

export default Select;