"use client";
import Image from "next/image"

export default function Footer(){
    return(
       
        
       <div className=" items-center justify-items-center  p-8  sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
        <h5
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={30}
            height={30}
          />
          “The good thing about computers is that they do what you tell them to do. 
          <br/>
          The bad news is that they do what you tell them to do.” 
          <br/>– Ted Nelson
        </h5>
      </footer>

       </div>
    )

}