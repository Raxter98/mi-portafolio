"use client";

import { useEffect, useState } from "react"
import AplicacionIcon from "@/components/menuButton/page";



export default function Navbar(){

    const [toggle, setToggle] = useState(false)
    
    
    
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
      <div>
        <div className="hidden md:flex mt-4">
              <ul className="md:inline-flex    ">
                <li className="text-white transition transform  md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("home")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Home
                    </span>
                  </button>
                </li>

                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("about")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      About me
                    </span>
                  </button>
                </li>
                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("projects")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      My projects
                    </span>
                  </button>
                </li>
                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("skills")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Skills
                    </span>
                  </button>
                </li>
                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("contact")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Contact me
                    </span>
                  </button>
                </li>
              </ul>
          </div>
          
      




          <div className="md:hidden fixed z-50">
<div className=" text-white hover:text-[#1a1a1a]">
<button onClick={()=>hidden()}>

          <AplicacionIcon/>
</button>
</div>
              <ul className={toggle ? "md:inline-flex": "hidden"}>
                <li className="text-white transition transform  md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("home")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Home
                    </span>
                  </button>
                </li>

                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("about")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      About me
                    </span>
                  </button>
                </li>
                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("projects")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      My projects
                    </span>
                  </button>
                </li>
                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
                  <button onClick={() => scrollView("skills")}>
                    <span className="block hover:translate-x-4 transition transform motion-reduce:transition-none motion-reduce:hover:transform-none md:hover:translate-x-0">
                      Skills
                    </span>
                  </button>
                </li>
                <li className="text-white transition transform md:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none font-[family-name:var(--font-geist-mono)] rounded md:mr-12 hover:text-black hover:bg-gray-50 md:p-1 p-1">
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

