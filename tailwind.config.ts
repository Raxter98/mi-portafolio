import type { Config } from "tailwindcss";
import animated from "tailwindcss-animated";
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [animated , flowbite.plugin()],
} satisfies Config;
