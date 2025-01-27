"use client";
type atributos = {
  imagen: string;
  titulo: string;
 
};

const Tecnology = ({ imagen, titulo }: atributos) => {
  return (
    <div className="w-32 h-32 md:w-36 md:h-36 md:mx-10">
      <div  className="w-32 h-32 md:w-32 md:h-32 group relative block bg-black">
        <img
          alt=""
          src={imagen}
          
          className="absolute inset-0 h-24 w-24 object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-4 sm:p-6 lg:p-8 ">
          

          <p className="text-xl font-bold text-white sm:text-2xl font-[family-name:var(--font-geist-sans)]">{titulo}</p>

          
        </div>
      </div>
    </div>
  );
};

export default Tecnology;
