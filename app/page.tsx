"use client";

import dynamic from "next/dynamic";



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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-rows-1   mx-10">

          
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

        <h1 className="bg-red-500 p-2 md:p-0 md:bg-transparent mx-10 text-black dark:text-white block flex-wrap text-3xl   md:text-5xl "> <span className="md:bg-red-500  md:p-2 md:text-nowrap">COMPANIES IN WHICH HAVE</span>  </h1>

        <h1 className=" mx-10 text-black dark:text-white  block text-3xl    md:text-5xl mt-3"> <span className="border-b-2 border-red-500 ">COLLABORATED</span> </h1>
      </div>



      <div className="md:w-[968px] md: mt-28">
        <AboutMe />
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
