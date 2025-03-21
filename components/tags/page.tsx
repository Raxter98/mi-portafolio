import { motion } from "framer-motion";

const TechStack = () => {
  const technologies = [
    { text: "HTML5", color: "bg-orange-600" },
    { text: "CSS3", color: "bg-blue-600" },
    { text: "JavaScript", color: "bg-yellow-300" },
    { text: "TypeScript", color: "bg-blue-500" },
    { text: "Tailwind CSS", color: "bg-blue-400" },
    { text: "Bootstrap", color: "bg-purple-700" },
    { text: "ReactJS", color: "bg-blue-700" },
    { text: "React Native", color: "bg-blue-700" },
    { text: "NodeJS", color: "bg-green-600" },
    { text: "Firebase", color: "bg-red-600" },
    { text: "Git", color: "bg-orange-700" },
    { text: "Express", color: "bg-slate-500" },
    { text: "MySQL", color: "bg-orange-300" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-wrap gap-2 mt-3"
    >
      {technologies.map((tech, index) => (
        <motion.span
          key={index}
          className={`text-sm text-white p-1 rounded-md opacity-0 ${tech.color}`}
          initial={{ opacity: 0, y: 20 }}  // Inicialmente oculto y desplazado
          whileInView={{
            opacity: 1,
            y: 0,
          }}   // Cuando está en vista, va a su estado visible
          transition={{ 
            delay: index * 0.1,             // Retraso progresivo
            duration: 0.5,                 // Duración de la animación
            type: "spring",                // Tipo de animación
          }}
          viewport={{ once: true, amount: 0.2 }} // Se activa solo cuando entra en la vista
        >
          {tech.text}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TechStack;