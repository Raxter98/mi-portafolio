import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '../app/styles/style.css'
import { Providers } from "@/components/providers/Providers";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Marcos Valero | Multimedia Computer Engineer & Software Developer",
  description: "Personal Portfolio of Marcos Valero — Multimedia Computer Engineer specializing in web & mobile development, software architecture, AI-assisted workflows, and process automation.",
  keywords: ["Marcos Valero", "Multimedia Computer Engineer", "Software Developer", "Full Stack", "React Native", "Next.js", "AI Workflows", "Spec-Driven Development"],
  authors: [{ name: "Marcos Valero" }],
  openGraph: {
    title: "Marcos Valero | Multimedia Computer Engineer & Software Developer",
    description: "Architecting scalable web apps, mobile solutions, AI workflows, and multimedia engineering.",
    url: "https://marcosvalero.com",
    siteName: "Marcos Valero Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Valero | Multimedia Computer Engineer",
    description: "Full-Stack Software Development, AI Workflows & Multimedia Production.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="dark">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      >
        
        <Providers>
          {children}
        </Providers>
  
        

        
      </body>
    </html>
  );
}
