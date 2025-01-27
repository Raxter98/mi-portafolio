"use client";
import Image from "next/image"

const Contact = () =>{

    return(
      <div id="contact" className="rounded-md md:mt-20 md:h-96 bg-gradient-to-b from-gray-900    to-black text-white flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        ¡Contact!
      </h1>

      <div className="flex flex-col  md:flex-row items-center gap-8 ">
        <div className="text-center ">
          <a
            href="https://www.linkedin.com/in/marcos-valero-50800525a/"
            className="group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-gray-800 p-4 rounded-full transition-transform transform group-hover:scale-110">
              <Image
                aria-hidden
                src="/lin.png"
                width={60}
                height={60}
                alt="LinkedIn Icon"
              />
            </div>
          </a>
          <p className="mt-4 text-xl font-medium group-hover:text-gray-400">
            LinkedIn
          </p>
        </div>

        <div className="text-center md:w-24 ">
          <a
            href="mailto:soymarcos354@gmail.com?subject=I%20saw%20your%20portfolio,"
            className="group"
          >
            <div className="bg-gray-800 p-4 rounded-full   transition-transform transform group-hover:scale-110">
              <Image
                aria-hidden
                src="/gmail.webp"
                width={60}
                height={60}
                alt="Gmail Icon"
              />
            </div>
          </a>
          <p className="mt-4 text-xl font-medium group-hover:text-gray-400">
            Email
          </p>
        </div>
      </div>
    </div>
    )


}

export default Contact;