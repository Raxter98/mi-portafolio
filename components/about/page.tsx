"use client";

import { motion } from "framer-motion";


const AboutMe = () => {


  return (
    <motion.div 
    initial={{ opacity: 0, y: 50 }} // Estado inicial (oculto y desplazado)
    whileInView={{ opacity: 1, y: 0 }} // Se ejecuta cuando entra en pantalla
    transition={{ duration: 0.5, delay: 0.5 }} // Ajusta velocidad y retraso
    viewport={{ once: true, amount: 0.2 }}
    
   className="flex flex-wrap gap-2 mt-3">
       <span  className="animate-fade-up animate-delay-500 text-sm bg-orange-600 p-1 rounded-md">HTML5</span>
       <span className="text-sm bg-blue-600 p-1 rounded-md">CSS3</span>
       <span className="text-sm bg-yellow-300 p-1 rounded-md">JavaScript</span>
       <span className="text-sm bg-blue-500 p-1 rounded-md">TypeScript</span>
       <span className="text-sm bg-blue-400 p-1 rounded-md">Tailwind CSS</span>
       <span className="text-sm bg-purple-700 p-1 rounded-md">Bootstrap</span>
       <span className="text-sm bg-blue-700 p-1 rounded-md">ReactJS</span>
       <span className="text-sm bg-blue-700 p-1 rounded-md">React Native</span>
       <span className="text-sm bg-green-600 p-1 rounded-md">NodeJS</span>
       <span className="text-sm bg-red-600 p-1 rounded-md">Firebase</span>
       <span className="text-sm bg-orange-700 p-1 rounded-md">Git</span>
       <span className="text-sm bg-slate-500 p-1 rounded-md">Express</span>
       <span className="text-sm bg-orange-300 p-1 rounded-md">MySQL</span>
   </motion.div>
  );
};

export default AboutMe;
