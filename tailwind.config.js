import animated from "tailwindcss-animated";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animated")],
};
