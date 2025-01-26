import { useEffect, useState } from "react";
import Image from "next/image";

const Welcome = () =>{
    const speaking = [
        "A journey through my creative process.",
        " Creative solutions for your projects.",
        " Creating unique digital experiences.",
        " Hi, I'm Marcos — a Web & Mobile Developer.",
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
                if (prev.endsWith(".")) {
                  return prev.substring(0, prev.length - 1);
                } else {
                  // Si no, añadimos un punto
                  return prev + ".";
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
    
    className=" relative flex  md:mt-52 mt-20   items-center sm:items-start z-10 overflow-x-hidden " // La animación desaparece en dispositivos moviles porque el overflo-hidden esta activado
  >

     <div className="w-24 h-24 ">
        <a href="https://www.linkedin.com/in/marcos-valero-50800525a/" ><Image className="hover:w-7  transition-all duration-500" src={"/linkedin.png"} alt={"linkedin"} width={24} height={24} /></a>
        <br />
        <a href="https://github.com/Raxter98"><Image className="hover:w-7 transition-all duration-500" src={"/github.png"} alt={"github"} width={24} height={24} /></a>
       
      </div>
      
   
     

      

    <section className="   md:flex">
      
      <h1
        className={
          "text-4xl h-[10rem]   md:h-[20rem] md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white to-black animate-pulse"
        }
      >
        {render}
      </h1>
    </section>
  </main>
);

}


export default Welcome;