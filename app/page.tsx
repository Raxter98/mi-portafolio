"use client";

import dynamic from "next/dynamic";
import Programing from "@/components/programing/page";

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
  
  return (
    <div className="md:flex md:flex-col md:items-center ">
     
 <Navbar/>
     

     
        <div id="home"></div>


   
        <div className="md:w-full flex justify-center">

          
          <div className="md:w-[601px]">
          <Welcome/>

            <p className="text-custom mt-3">Having accumulated over four years of experience in designing, developing, and maintaining websites, online systems, and mobile applications, I have worked with a wide range of technologies. My versatility has enabled me to tackle projects across various platforms and environments, always striving to provide high-quality and high-performance solutions.</p>
          </div>
          
          <div className="md:w-[601px]">

          <Programing/>
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
