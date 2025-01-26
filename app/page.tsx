"use client";
import Footer from "@/components/footer/page";
import AboutMe from "@/components/about/page";
import Welcome from "@/components/welcome/page";
import MyProjects from "@/components/myProjects/page";
import Skills from "@/components/skills/page";
import Contact from "@/components/contact/page";

export default function Home() {
  
  return (
    <div className="md:flex md:flex-col md:items-center ">
      {/* Imagen de fondo */}
   
      {/* Contenido principal */}
        <div id="home"></div>


        <div className="md:w-[600] ">

          <Welcome/>
        </div>

  
        <div id="about"></div>
      {/* Sección about me */}
    
        
        <div  className="md:w-[968] md: mt-28">
          <AboutMe/>
        </div>

      {/* Sección my projects */}
<div className="md:w-[968] ">

        <MyProjects/>
</div>

  {/* Sección Aboutme */}

  <div id="skills" >

        </div>
<div className="md:w-[968] ">

        <Skills/>
</div>

<div className="md:w-[968] ">

      <Contact/>
</div>

<Footer /> 
    </div>
  );
}
