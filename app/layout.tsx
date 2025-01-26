import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import '../app/styles/style.css'
import Navbar from "@/components/nav/page"; 
import Footer from "@/components/footer/page";


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
  title: "Marcos Valero",
  description: "If you need a developer, contact me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-10 md:mx-16`}

      >
        <Navbar/>
        {children}
        {/* <Footer/>   */}
        

        
      </body>
    </html>
  );
}
