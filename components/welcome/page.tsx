"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Welcome = () =>{
    const speaking = [
        "Software",
        " Web",
        " Mobile",
        " Full Stack |",
      ];
      const [render, setRender] = useState("");
      const [welcomeTittle, setWelcome] = useState(false);
    
     
    
      const welcome = (key: number, array: number) => {
        // Verificar que speaking[array] y speaking[array][key] existan
        if (!speaking[array] || speaking[array][key] == null) {
          // Verificar si ya estamos en el último array
          if (array === speaking.length - 1) {
            return console.log("Fin del contenido en el último array");
          }
    
          array++; // Avanza al siguiente array si el actual terminó
    
          // Llama de nuevo a welcome para empezar desde el primer elemento del nuevo array
          return setTimeout(() => {
            welcome(0, array);
            setRender(""); // Limpia el render para comenzar desde el nuevo array
          }, 2000);
        }
    
        // Si el contenido de speaking[array][key] existe, lo añade al render
        setRender((prev) => prev + speaking[array][key]);
    
        if (speaking[array] === " Welcome.") {
          setWelcome(true);
          console.log({welcomeTittle})
        }
        // Verifica que haya más elementos en speaking[array] para continuar la recursión
        if (key < speaking[array].length - 1) {
          setTimeout(() => {
            welcome(key + 1, array); // Avanza al siguiente elemento dentro del mismo array
          }, 150);
        } else {
          // Si llegaste al final del array actual y este es el último array, detente
          if (array === speaking.length - 1) {
            const interval = setInterval(() => {
              setRender((prev) => {
                if (prev.endsWith("|")) {
                  return prev.substring(0, prev.length - 1);
                } else {
                  // Si no, añadimos un punto
                  return prev + "|";
                }
              });
            }, 3000);
    
            return () => clearInterval(interval);
          }
    
          // Si hay más arrays, avanza al siguiente array
          setTimeout(() => {
            welcome(0, array + 1); // Reinicia key y avanza el array
            setRender(""); // Limpia el render para el nuevo array
          }, 3000);
        }
      };
    
      useEffect(() => {
        welcome(0, 0);
      }, []);
    
return (
  <main
    
    className="overflow-hidden relative   md:mt-52 mt-32   items-center sm:items-start z-10 overflow-x-hidden " // La animación desaparece en dispositivos moviles porque el overflo-hidden esta activado
  >

     <div className="w-full h-10 flex justify-between items-end mb-3">
        
        <div className="flex gap-2">
        <a href="https://www.linkedin.com/in/marcos-valero-50800525a/" ><Image className="hover:w-7  transition-all duration-500 bg-black rounded-md" src={"/linkedin.png"} alt={"linkedin"} width={24} height={24} /></a>
        <br />
        <a href="https://github.com/Raxter98"><Image className="hover:w-7 transition-all duration-500 bg-black rounded-full" src={"/github.png"} alt={"github"} width={24} height={24} /></a>

        </div>
       
        
            <a href="/cv.pdf" download="cv.pdf" className="mr-16">
              <button className="bg-red-500 opacity-45 p-1 px-3 rounded-md hover:opacity-100 transition ease-in-out delay-150">
                <p className="text-white">Download CV ↴</p>
              </button>
            </a>
        

      </div>
      
   
     

      
    <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">Hi,</p>
    <p className="text-2xl md:text-3xl lg:text-4xl mb-2">My name is <span className="bg-red-500 p-1">Marcos Valero</span></p>
    <section className="   md:flex">
      <h1
        className={
          " text-5xl    md:text-7xl 2xl:text-9xl bg-clip-text text-black dark:text-white animate-pulse"
        }
      >
        {render} <p className="border-b-4 border-red-500 inline-block">Developer.</p>
      </h1>
    </section>
  </main>
);

}


export default Welcome;