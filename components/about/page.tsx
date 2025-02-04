"use client";
import Image from "next/image";
import Ball from "../bootingBall/page";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const AboutMe = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, delay: 100 });
  }, []);

  return (
    <div
      data-aos="fade-left"
      className=" overflow-x-hidden md:w-full md:overflow-hidden mt-14 md:mt-0 "
    >
      <Ball />

      <section className=" md:flex   w-full  justify-center">
        <div className="mb-9 md:mb-0 md:ml-16 flex flex-col items-center  md:block   md:w-1/3">
          <h2 className=" text-4xl md:mb-11 md:text-5xl text-white">
            About me
          </h2>

          <div className="relative  h-48 w-48 md:w-[90%] md:h-[300px]  ">
            <Image
              aria-hidden
              src="/me.jpg"
              alt="image"
              layout="fill"
              className="md:object-cover md:object-top rounded-xl "
            />
          </div>
          <div className="block md:hidden">
            <a href="/cv.pdf" download="cv.pdf">
              <button className="bg-red-500 opacity-45 p-3 mt-4 rounded-md hover:opacity-100 transition ease-in-out delay-150">
                <p className="text-white">Download CV ↴</p>
              </button>
            </a>
          </div>
        </div>
        <div className="md:w-[700px] md:mt-10  flex flex-col">
          <p className="text-white text-xl z-10 font-[family-name:var(--font-geist-sans)]  md:mr-6">
            <span className=" md:text-3xl">Full Stack Developer</span>
            <br />
            <br />
            <span className="md:text-2xl">
              Higher Level Technician in Computer Science{" "}
            </span>
            <br />
            <span className="md:text-xl">
              {" "}
              Higher Institute of Communication Arts and Sciences{" "}
            </span>
            <br />
            <span>2021-2023 Santiago, Chile</span>
            <br />
            <br />
            <span className="md:text-2xl">
              Bachelor of Multimedia Computing{" "}
            </span>
            <br />
            <span className="md:text-xl">
              {" "}
              University of Arts, Sciences and Communications
            </span>
            <br />
            <span>2023-2026 Santiago, Chile</span>
            <br />
          </p>
          <div className="hidden md:block">
            <a href="/cv.pdf" download="cv.pdf">
              <button className="bg-red-500 opacity-45 p-3 mt-4 rounded-md hover:opacity-100 transition ease-in-out delay-150">
                <p className="text-white">Download CV ↴</p>
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
