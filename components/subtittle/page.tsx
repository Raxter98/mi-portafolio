"use client";
import { useEffect, useRef } from "react";
import Aos from "aos";
import { useTranslation } from "../../hooks/useTranslation";


const subtittle = () =>{
const { t } = useTranslation();

const subtitle = useRef<HTMLParagraphElement | null>(null);

useEffect(()=>{

  setTimeout(()=>{
    subtitle.current?.classList.remove("hidden")
    subtitle.current?.setAttribute("data-aos","zoom-out")
    Aos.init({ duration: 1000, delay: 0, once: true,mirror: false, offset: -1000000,easing: "ease-out-back" });
  
    setTimeout(() => {
        
        Aos.refreshHard(); // Vuelve a analizar las animaciones activas
        Aos.init({ duration: 1000, delay: 100,offset: 100, mirror:true, once:false });
      }, 500);
  
  }, 14000)

},[])




    return(
        <p  ref={subtitle} className="hidden font-light lg:text-xl xl:text-2xl  mt-3">{t.subtitle.text}</p>
    )
}

export default subtittle;

// Removed the local useRef function declaration to avoid conflict with the imported useRef from React.
