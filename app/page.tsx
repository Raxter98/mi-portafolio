"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";


const Education =dynamic(()=> import("@/components/Education/page"), {ssr: false})

const Projects =dynamic(()=> import("@/components/projects/page"), {ssr: false})

const Logos =dynamic(()=> import("@/components/logos/page"), {ssr: false})

const Companies =dynamic(()=> import("@/components/companies/page"), {ssr: false})

const Tags =dynamic(()=> import("@/components/tags/page"), {ssr: false})

const TagsTwo =dynamic(()=> import("@/components/tagsTwo/page"), {ssr: false})

const Subtitle = dynamic(()=> import("@/components/subtittle/page"), {ssr:false})

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
  const { t } = useTranslation();
  



  return (
    <div className="md:flex md:flex-col md:items-center ">
     
 <Navbar/>
     

     
        <div id="home"></div>


   /** justify-center  items-end*/ */
        <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-rows-1   md:mx-10">

          
          <div>
            
          <Welcome/>
            
            <Subtitle/>
          </div>
          
          <div className=" hidden md:block md:mt-64 lg:mt-32 xl:mt-16 2xl:mt-8  ">

          <div  className="rounded-full shadow-lg shadow-red-500">
            
          <Programing/>
          </div>
          </div>

        <div id="about"></div>
        </div>



      <div className="text-start w-full  mt-36">

        <h1 className="bg-red-500 p-2 md:p-0 md:bg-transparent md:mx-10 text-black dark:text-white block flex-wrap text-3xl   md:text-5xl "> <span className="md:bg-red-500  md:p-2 md:text-nowrap">{t.companies.title1}</span>  </h1>

        <h1 className=" md:mx-10 text-black dark:text-white  block text-3xl    md:text-5xl mt-3"> <span className="border-b-2 border-red-500 ">{t.companies.title2}</span> </h1>
      </div>


      <div className="grid grid-cols-1 Usa auto-rows-auto md:grid-cols-2 md:grid-rows-2 mt-20 md:ml-10">


        <div>
          <Companies
            position={t.companies.jobs.archbishopric.position}
            enterprise={t.companies.jobs.archbishopric.enterprise}
            date={t.companies.jobs.archbishopric.date}
            description={t.companies.jobs.archbishopric.description}
          />

          

          
        <Tags/>

        <div className="w-2 bg-slate-600 h-20 rounded-2xl mt-4 hidden md:block mb-4"></div>

        </div>


        <div className="relative flex flex-col mt-10 md:mt-0 md:justify-center items-center ">
          
         
          <div className="hidden md:block absolute bottom-0 right-0  h-3/4 bg-red-500 z-10 rounded-t-2xl w-4  mr-10">

          </div>

          <div className="hidden md:block absolute bottom-0 right-0 rounded-tl-3xl animate-pulse  bg-gray-400 opacity-30 w-64  h-full">

         </div>
          

      

          <Logos
          image={"/logo_arzobispado.svg"}
          />
          
          <div className=" w-2 bg-slate-600 h-20 rounded-2xl mt-4 md:hidden block mb-4"></div>

        </div>


        <div>
          <Companies
            position={t.companies.jobs.freelance.position}
            enterprise={t.companies.jobs.freelance.enterprise}
            date={t.companies.jobs.freelance.date}
            description={t.companies.jobs.freelance.description}
          />

          

          
        <TagsTwo/>

       

        </div>


        <div className="relative  flex flex-col mt-10 md:mt-0 md:justify-center items-center">
         
        
        <div className="hidden md:block absolute top-0 right-0  h-3/4 bg-red-500 z-10 rounded-b-2xl w-4  mr-10">

</div>
        <div  className="hidden md:block  absolute bottom-0 right-0 rounded-bl-3xl animate-pulse bg-gray-400 opacity-30 w-64  h-full">

        </div>
          <Logos
          image={"/freelance.png"}
          
          />
          
         

        </div>

      </div>
     
<div id="projects"></div>
    
      <div className="text-start w-full  mt-36 mb-6">

        <h1 className="bg-red-500 p-2 md:p-0 md:bg-transparent md:mx-10 text-black dark:text-white block flex-wrap text-3xl   md:text-5xl "> <span className="md:bg-red-500  md:p-2 md:text-nowrap">{t.projects.title1}</span>  </h1>

        <h1 className=" md:mx-10 text-black dark:text-white  block text-3xl    md:text-5xl mt-3"> <span className="border-b-2 border-red-500 ">{t.projects.title2}</span> </h1>
      </div>

     
      <div className="relative grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 w-full max-w-6xl  min-h-[600px]">
  {/* Proyecto grande a la izquierda, ocupa dos filas */}
  <div className="row-span-2 z-10">
  <div className="h-full md:ml-10">
    <Projects
      enterpriseName="Freelancer"
      appName="Worldker mobile App"
      imageUrl="/worldker.png"
    />
  </div>
  </div>

  {/* Primer proyecto a la derecha */}
  <div className="h-full md:mr-10 z-10">
    <Projects
      enterpriseName="Archdiocese of La Serena"
      appName="Website"
      imageUrl="/arzobispado.webp"
    />
  </div>

  {/* Segundo proyecto a la derecha */}
  <div className="h-full md:mr-10 z-10">
    <Projects
      enterpriseName="Archdiocese of La Serena"
      appName="CRUD System"
      imageUrl="/crud.webp"
    />
  </div>

  <div className="h-full md:ml-10 z-10 min-h-[300px]">
    <Projects
      enterpriseName={t.projects.items.alcaldia.title}
      appName={t.projects.items.alcaldia.text}
      imageUrl="/projects/Alcaldia.webp"
    />
  </div>

  <div className="h-full md:mr-10 z-10 min-h-[300px]">
    <Projects
      enterpriseName={t.projects.items.autovidrios.title}
      appName={t.projects.items.autovidrios.text}
      imageUrl="/projects/AutoVidrios.webp"
    />
  </div>

  <div className="h-full md:ml-10 z-10 min-h-[300px]">
    <Projects
      enterpriseName={t.projects.items.fiado.title}
      appName={t.projects.items.fiado.text}
      imageUrl="/projects/Fiado.webp"
    />
  </div>

  <div className="h-full md:mr-10 z-10 min-h-[300px]">
    <Projects
      enterpriseName={t.projects.items.jccrp.title}
      appName={t.projects.items.jccrp.text}
      imageUrl="/projects/Jccrp.webp"
    />
  </div>

  <div className="h-full md:ml-10 z-10 min-h-[300px]">
    <Projects
      enterpriseName={t.projects.items.perfecttrainer.title}
      appName={t.projects.items.perfecttrainer.text}
      imageUrl="/projects/perfecttrainer.webp"
    />
  </div>

  <div className="h-full md:mr-10 z-10 min-h-[300px]">
    <Projects
      enterpriseName={t.projects.items.tourtrack.title}
      appName={t.projects.items.tourtrack.text}
      imageUrl="/projects/TourTrack.webp"
    />
  </div>

  <div className=" right-0 -bottom-16 left-0 z-5 hidden md:flex absolute items-center justify-center">
						<div className="bg-gray-300/40 dark:bg-gray-600/40 rounded-3xl h-[150px] w-[700px] flex items-end justify-center pb-5 animate-pulse">
							<div className="bg-red-500 rounded-xl h-[15px] w-[50%] flex items-center justify-center"></div>
						</div>
					</div>
</div>



 
  <div id="skills" >

        </div>

      
        
<div className="mx-10 mt-36">

        <Skills/>
        
</div>

<div id="education"></div>


<Education/>


<div id="contact" >

</div>
      <Contact/>


<Footer />  
    </div>
  );
}
