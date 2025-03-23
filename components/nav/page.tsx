"use client";

import { useEffect, useState } from "react"
import AplicacionIcon from "@/components/menuButton/page";
import Switcher from "../switcher/switcher";
import Select from "../select/select";

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

    const scrollViewMobile = (section: string) => {
      
      const aboutSection = document.getElementById(section);
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }

      setToggle(false)
 
  };

    return (
      <div className= {toggle ? "fixed top-0 left-0 h-full flex justify-between  z-50 bg-white dark:bg-black text-black  dark:text-white w-full ": "fixed top-0 left-0 h-24 flex justify-between  z-50 bg-white dark:bg-black text-black  dark:text-white w-full "}>


        <div className="hidden mt-4 md:flex h-24  justify-between items-center w-full px-8">
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

             
                <li className="text-black  dark:text-white transition transform  md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom  hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("home")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Home
                    </span>
                  </button>
                </li>

                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom  hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("about")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Experience
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom  hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("projects")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      My projects
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom   hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50md:p-1 p-1">
                  <button onClick={() => scrollView("skills")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Skills
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom   hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50md:p-1 p-1">
                  <button onClick={() => scrollView("education")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Education
                    </span>
                  </button>
                </li>
                <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom   hover:bg-gray-50 dark:hover:text-black dark:hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("contact")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Contact me
                    </span>
                  </button>
                </li>
              </ul>
              </div>


          <div className="flex gap-x-2">

            <Select />
            <Switcher />
          </div>

              
          </div>
          
      

          


        <div className="md:hidden flex justify-between  h-10 z-50 bg-white dark:bg-black text-black  dark:text-white m-4 w-full">
        
        <div className="md:hidden m-4  z-20">

<img
  alt=""
  src={"logoMarcos.svg"}
  width={200}
  height={200}
  className=""
  />
</div>


          <div className=" z-20 text-black  dark:text-white   hover:text-[#1a1a1a]">
            <button className="" onClick={() => hidden()}>

              <AplicacionIcon />
            </button>
          </div>
          
        </div>

        <ul className={toggle ? "md:hidden absolute w-full h-full mt-16 text-center bg-white dark:bg-black z-10 flex flex-col gap-y-5" : "hidden"}>
            <li className="text-black   dark:text-white transition transform  md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12  dark:hover:text-black  md:p-1 p-1">
              <button onClick={() => scrollViewMobile("home")}>
                <span className="p-2 flex hover:bg-gray-50 dark:hover:bg-gray-50 transition transform motion-reduce:transition-colors motion-reduce:hover:transform-none md:hover:translate-x-0">
                  Home
                </span>
              </button>
            </li>

            <li className=" text-black  dark:text-white transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12  dark:hover:text-black  md:p-1 p-1">
              <button onClick={() => scrollViewMobile("about")}>
                <span className="p-2 block hover:bg-gray-50 dark:hover:bg-gray-50 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                Experience
                </span>
              </button>
            </li>
            <li className="text-black  dark:text-white transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12  dark:hover:text-black  md:p-1 p-1">
              <button onClick={() => scrollViewMobile("projects")}>
                <span className="p-2 block hover:bg-gray-50 dark:hover:bg-gray-50 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                  My projects
                </span>
              </button>
            </li>
            <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12  dark:hover:text-black  md:p-1 p-1">
              <button onClick={() => scrollViewMobile("skills")}>
                <span className=" p-2 block hover:bg-gray-50 dark:hover:bg-gray-50 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                  Skills
                </span>
              </button>
            </li>
            <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12  dark:hover:text-black  md:p-1 p-1">
              <button onClick={() => scrollViewMobile("education")}>
                <span className=" p-2 block hover:bg-gray-50 dark:hover:bg-gray-50 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                  Education
                </span>
              </button>
            </li>
            <li className="text-black  dark:text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none text-custom rounded md:mr-12  dark:hover:text-black  md:p-1 p-1">
              <button onClick={() => scrollViewMobile("contact")}>
                <span className="p-2 block hover:bg-gray-50 dark:hover:bg-gray-50 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                  Contact me
                </span>
              </button>
            </li>

            <li>
              <Select />

            </li>

            <li>
              <Switcher /></li>
          </ul>

      </div>
    );
}

