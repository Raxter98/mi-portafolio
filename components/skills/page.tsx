import Tecnology from "@/components/tecnology/page";
import data from "../../public/data.json";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";

const Skills = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, delay: 100, mirror: true, offset: 500 });
  }, []);
  return (
    <div className="mt-40 " data-aos="fade-up">
      <section
       
        className=" md:relative md:flex md:flex-col gap-8 md:items-center  z-10"
      >
        <div className="text-center w-full">
          <h2 className="text-4xl md:text-5xl">My skills</h2>
        </div>

        <div className="flex flex-wrap justify-center">
          {data.map((datos, index) => (
            <Tecnology
              key={index}
              imagen={datos.imagen}
              titulo={datos.nombre}
             
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;
