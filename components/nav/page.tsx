"use client";

import { useEffect, useState } from "react"
import AplicacionIcon from "@/components/menuButton/page";
import Switcher from "../switcher/switcher";


export default function Navbar(){

    const [toggle, setToggle] = useState(false)
    
    const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

    
    const hidden =() =>{

        if(toggle=== true){
            setToggle(false)
        }else if(toggle === false){
            setToggle(true);
        }

    }

    const scrollView = (section: string) => {
      
        const aboutSection = document.getElementById(section);
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
   
    };


    return (
      <div className="fixed z-50 bg-white dark:bg-black text-black  dark:text-white w-full">


        <div className="hidden mt-4 md:flex  justify-between items-center w-full px-8">
<div>

        <img
          alt=""
          src={"logoMarcos.svg"}
          width={200}
          height={200}
          className=""
          />
</div>
        

        <div>

        
              <ul className="md:inline-flex whitespace-nowrap md:gap-x-6">

             
                <li className="text-black  dark:text-white transition transform  md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("home")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Home
                    </span>
                  </button>
                </li>

                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded  hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("about")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      About me
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded  hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("projects")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      My projects
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded  hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50md:p-1 p-1">
                  <button onClick={() => scrollView("skills")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Skills
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded  hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("contact")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Contact me
                    </span>
                  </button>
                </li>
              </ul>
              </div>


<div>

  
</div>
              <Switcher/>

              
          </div>
          
      




          <div className="md:hidden fixed z-50">
<div className=" text-black  dark:text-white   hover:text-[#1a1a1a]">
<button onClick={()=>hidden()}>

          <AplicacionIcon/>
</button>
</div>
              <ul className={toggle ? "md:inline-flex": "hidden"}>
                <li className="text-black  dark:text-white transition transform  md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12 hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50md:p-1 p-1">
                  <button onClick={() => scrollView("home")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Home
                    </span>
                  </button>
                </li>

                <li className="text-black  dark:text-white transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12 hhover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("about")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      About me
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12 hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("projects")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      My projects
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12 hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("skills")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Skills
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12 hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("contact")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Contact me
                    </span>
                  </button>
                </li>
              </ul>
          </div>
          
      </div>
    );
}

