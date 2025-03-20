"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Aos from "aos";

const Programing = dynamic(() => import('@/components/programing/page'), {
  ssr: false,
});

const Footer = dynamic(() => import('@/components/footer/page'), {
  ssr: false,
});

const AboutMe = dynamic(() => import('@/components/about/page'), {
  ssr: false,
});

const Welcome = dynamic(() => import('@/components/welcome/page'), {
  ssr: false,
});

const MyProjects = dynamic(() => import('@/components/myProjects/page'), {
  ssr: false,
});

const  Skills = dynamic(() => import('@/components/skills/page'), {
  ssr: false,
});

const Contact = dynamic(() => import('@/components/contact/page'), {
  ssr: false,
});

const Navbar = dynamic(() => import('@/components/nav/page'), {
  ssr: false,
});


export default function Home() {
  
const subtitle = useRef<HTMLParagraphElement | null>(null);

useEffect(()=>{

  setTimeout(()=>{
    subtitle.current?.classList.remove("hidden")
    subtitle.current?.setAttribute("data-aos","zoom-out")
    Aos.init({ duration: 1000, delay: 0, once: true,mirror: false, offset: -90009,easing: "ease-out-back" });
  }, 33000)

},[])



  return (
    <div className="md:flex md:flex-col md:items-center ">
     
 <Navbar/>
     

     
        <div id="home"></div>


   /** justify-center  items-end*/ */
        <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-rows-1   mx-10">

          
          <div className="">
          <Welcome/>
            
            <p  ref={subtitle} className="hidden font-light lg:text-xl xl:text-2xl mt-3">Having accumulated over four years of experience in designing, developing, and maintaining websites, online systems, and mobile applications, I have worked with a wide range of technologies. My versatility has enabled me to tackle projects across various platforms and environments, always striving to provide high-quality and high-performance solutions</p>
          </div>
          
          <div className=" hidden md:block md:mt-64 lg:mt-32 xl:mt-16 2xl:mt-8  ">

          <div className="rounded-full shadow-lg shadow-red-500">
            
          <Programing/>
          </div>
          </div>

        </div>

        <div id="about"></div>
    
    
        
        <div  className="md:w-[968px] md: mt-28">
          <AboutMe/>
        </div>

    
<div className="md:w-[968px] ">

        <MyProjects/>
</div>


 
  <div id="skills" >

        </div>

      
<div className="md:w-[968px] ">

        <Skills/>
</div>

<div className="md:w-[968px] ">

      <Contact/>
</div>

<Footer />  
    </div>
  );
}
