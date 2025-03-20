"use client";
import { useEffect, useRef } from "react";
import Aos from "aos";


const subtittle = () =>{

const subtitle = useRef<HTMLParagraphElement | null>(null);

useEffect(()=>{

  setTimeout(()=>{
    subtitle.current?.classList.remove("hidden")
    subtitle.current?.setAttribute("data-aos","zoom-out")
    Aos.init({ duration: 1000, delay: 0, once: true,mirror: false, offset: -90009,easing: "ease-out-back" });
  
    setTimeout(() => {
        
        Aos.refreshHard(); // Vuelve a analizar las animaciones activas
        Aos.init({ duration: 1000, delay: 100,offset: 100, mirror:true, once:false });
      }, 100);
  
  }, 33000)

},[])




    return(
        <p  ref={subtitle} className="hidden font-light lg:text-xl xl:text-2xl mt-3">Having accumulated over four years of experience in designing, developing, and maintaining websites, online systems, and mobile applications, I have worked with a wide range of technologies. My versatility has enabled me to tackle projects across various platforms and environments, always striving to provide high-quality and high-performance solutions</p>
    )
}

export default subtittle;

// Removed the local useRef function declaration to avoid conflict with the imported useRef from React.
