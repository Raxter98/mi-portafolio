"use client";
import Aos from "aos";
import "aos/dist/aos";
import { useEffect, useRef, useState } from "react";
import Card from "../card/page";
import Scroll from "../scroll/page";


const MyProjects = () => {

  const [linkVideo, setLinkVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationRef = useRef <HTMLDivElement | null>(null)

  const closing = ()=>{
    if(animationRef.current){
      animationRef.current.classList.add('ScreenAnimationReverse') 
      animationRef.current.classList.remove('ScreenAnimation') 
        setTimeout(()=>{
          if(animationRef.current){
          animationRef.current.classList.add('hidden') 
          /* videoRef.current= null; de esta forma ya no aparece el recuadro de imagen en imagen, pero me tira un error*/
          setLinkVideo("")}
      },100) 
      
     }
  }


  useEffect(()=>{
    if (videoRef.current) {
      videoRef.current.load(); // Recarga el video
      if(animationRef.current){
        animationRef.current.classList.remove('hidden') 
        animationRef.current.classList.remove('ScreenAnimationReverse') 
        animationRef.current.classList.add('ScreenAnimation')
        setTimeout(()=>{
          if(animationRef.current){
          animationRef.current.classList.remove('ScreenAnimation') }
        },100)
      }

    } else {
      console.error("Referencia del video no inicializada.");
    }
  },[linkVideo])

  useEffect(() => {
    Aos.init({ duration: 1000, delay: 100, mirror: true, offset: 500 });
  }, []);

  return (
    <div id="projects" className="w-full  mt-36 text-center" data-aos="zoom-out">
      <h2 className=" text-4xl md:mb-11 text-white md:text-5xl ">
        My projects
      </h2>
      <section
        
        className="relative md:flex justify-center gap-8 items-center sm:items-start z-10 "
      >
        {/* Pantalla de reproduccion */}
        <div className=" md:w-2/4 md:h-[600px] item-center md:items-end flex flex-col ">
      
          <div className="mt-5 md:mt-20 h-[400px]    md:w-[400px] flex  md:rounded-l-xl items-center" ref={animationRef} >
                 {linkVideo && <button onClick={closing} className="bg-white animate-pulse    z-40 transform active:scale-75 transition-transform  rounded-l-lg"><p className="text-2xl  text-black     transform active:scale-75 transition-transform mb-1"> →</p></button> }
                  <video ref={videoRef} autoPlay muted loop className="h-[300px] md:h-[400px]">
                     {linkVideo && <source src={linkVideo} />}
                  </video>
            </div>
        </div>
        
        {/* Pantalla de cartas */}
        <div className="flex-col flex items-center mt-20 md:mt-0  md:w-2/4 md:h-[600px] overflow-y-scroll md:scroll">
            
            
            {/* Animación */}
            <Scroll/>

            

            <Card
            titulo ={"Website & CRUD Archbishopric of La Serena"}
            imagen={"/arzobispado.webp"}
            texto={"I updated and created a new website for the Archbishopric of La Serena along with an internal business system to create, read, update and delete various sections of the site including news for the institution's journalistic department."}
            tecnologias={["React", "Next.js", "Express","MySQL","Redux","+5"]}
            pais="Chile"
            video="/arzobispado_preview.mp4"
            setLinkVideo= {setLinkVideo}
            />

<Card
            titulo ={"Worldker"}
            imagen={"/arzobispado.webp"}
            texto={"Android application to search for work and offer services. Pre-Alpha stage"}
            tecnologias={["React-Native", "Firebase","i18n","MySQL","Git","+3"]}
            pais={"Chile"}
            video="/video2.mp4"
            setLinkVideo= {setLinkVideo}
            />
        </div>
      </section>
    </div>
  );
};

export default MyProjects;
