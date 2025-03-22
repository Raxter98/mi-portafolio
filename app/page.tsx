"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

        <h1 className="bg-red-500 p-2 md:p-0 md:bg-transparent md:mx-10 text-black dark:text-white block flex-wrap text-3xl   md:text-5xl "> <span className="md:bg-red-500  md:p-2 md:text-nowrap">COMPANIES IN WHICH HAVE</span>  </h1>

        <h1 className=" md:mx-10 text-black dark:text-white  block text-3xl    md:text-5xl mt-3"> <span className="border-b-2 border-red-500 ">COLLABORATED</span> </h1>
      </div>


      <div className="grid grid-cols-1 Usa auto-rows-auto md:grid-cols-2 md:grid-rows-2 mt-20 md:ml-10">


        <div>
          <Companies
            position={"Web Master"}
            enterprise={"Archbishopricf of La Serena"}
            date={"2022 (February) - Present"}
            description={"As a web master developer at Archbishopricf of La Serena, a prominent technology development company, I utilized my skills in React.js, Tailwind CSS, MySQL, to design, develop, and maintain high-quality web and mobile applications. I implemented innovative solutions, creating interactive and engaging interfaces with modern and scalable styles. Handling server logic and database management with Express and MySQL, I integrated payment services using WebPay and ensured optimal performance. At Archbishopricf of La Serena, I actively participated in successful projects, demonstrating my ability to leverage modern technologies and contribute to the success of technological initiatives."}
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
            position={"Junior"}
            enterprise={"Freelancer"}
            date={"2020 (January) - 2022 (February)"}
            description={"As a junior freelance developer, I designed and optimized web solutions for entrepreneurs and startups using technologies like React.js, Python, Node.js, and MongoDB, focusing on building efficient and scalable interfaces. I developed static sites with HTML/CSS and JavaScript, enhancing SEO and performance, and managed server logic while collaborating on applications such as a task manager, learning to troubleshoot real-time errors and communicate technical requirements clearly to clients. Every project, from e-commerce platforms to basic APIs, strengthened my adaptability and ability to deliver results with modern tools, even under tight deadlines and unexpected technical challenges."}
          />

          

          
        <TagsTwo/>

       

        </div>


        <div className="relative  flex flex-col mt-10 md:mt-0 md:justify-center items-center">
         
        
        <div className="hidden md:block absolute top-0 right-0  h-3/4 bg-red-500 z-10 rounded-b-2xl w-4  mr-10">

</div>
        <div className="hidden md:block  absolute bottom-0 right-0 rounded-bl-3xl animate-pulse bg-gray-400 opacity-30 w-64  h-full">

        </div>
          <Logos
          image={"/freelance.png"}
          />
          
         

        </div>

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
