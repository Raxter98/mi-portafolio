"use client";
import Image from "next/image"
import { useTranslation } from "../../hooks/useTranslation";

export default function Footer(){
    const { t } = useTranslation();
    return(
       
        
       <div className=" items-center justify-items-center  p-8  sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
       
        <h5
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-black dark:text-white"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={30}
            height={30}
          />
          {t.footer.quote1} 
          <br/>
          {t.footer.quote2} 
          <br/>{t.footer.author}
        </h5>
      </footer>

       </div>
    )

}