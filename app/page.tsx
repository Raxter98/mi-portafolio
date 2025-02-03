"use client";

import dynamic from "next/dynamic";

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


   
        <div className="md:w-[600] ">

          <Welcome/>
        </div>

        <div id="about"></div>
    
    
        
        <div  className="md:w-[968] md: mt-28">
          <AboutMe/>
        </div>

    
<div className="md:w-[968] ">

        <MyProjects/>
</div>


 
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
