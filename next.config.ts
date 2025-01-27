import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Modo estricto de React
  images: {
    domains: ["example.com"], // Reemplaza "example.com" con los dominios de tus imágenes
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint en la construcción
  },
  typescript: {
    ignoreBuildErrors: true, // Ignora errores de TypeScript en la construcción
  },
};

export default nextConfig;
