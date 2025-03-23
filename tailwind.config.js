import animated from "tailwindcss-animated";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}',flowbite.content(),],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animated"), flowbite.plugin()],
};
