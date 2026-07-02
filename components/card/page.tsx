"use client";

import { useTranslation } from "../../hooks/useTranslation";

type contenido = {
  titulo: string;
  imagen: string;
  texto: string;
  tecnologias: string[];
  pais: string;
  video: string;
  setLinkVideo: React.Dispatch<React.SetStateAction<string | null>>;
};

const Card = ({ titulo, imagen, texto, tecnologias, pais, video, setLinkVideo }: contenido) => {
  const { t } = useTranslation();

  const display = (section: string) => {
    const aboutSection = document.getElementById(section);
    setLinkVideo(video);
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="card">
      <div className="flex justify-center items-center mt-12 px-4">
        <div className="w-full max-w-sm group">
          {/* Card container */}
          <div className="relative flex flex-col rounded-2xl overflow-hidden
            bg-white dark:bg-zinc-900
            border border-zinc-200 dark:border-white/10
            shadow-xl shadow-black/10 dark:shadow-black/40
            transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 dark:hover:shadow-red-500/20
            hover:-translate-y-1"
          >
            {/* Image section */}
            <div className="relative overflow-hidden h-52">
              <img
                src={imagen}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                alt={titulo}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Country badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                {pais}
              </div>

              {/* Red accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-transparent" />
            </div>

            {/* Content section */}
            <div className="p-5 flex flex-col gap-4">
              {/* Title */}
              <h5 className="text-lg font-bold leading-tight
                text-zinc-900 dark:text-white
                group-hover:text-red-600 dark:group-hover:text-red-400
                transition-colors duration-300"
              >
                {titulo}
              </h5>

              {/* Description */}
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {texto}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {tecnologias.filter(Boolean).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-full
                      bg-zinc-100 dark:bg-zinc-800
                      text-zinc-700 dark:text-zinc-300
                      border border-zinc-200 dark:border-zinc-700
                      hover:border-red-400 hover:text-red-600 dark:hover:text-red-400
                      transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="px-5 pb-5">
              <button
                className="w-full py-3 px-6 rounded-xl text-sm font-bold uppercase tracking-wide
                  bg-zinc-900 dark:bg-white
                  text-white dark:text-zinc-900
                  hover:bg-red-600 dark:hover:bg-red-500
                  hover:text-white dark:hover:text-white
                  border border-transparent hover:border-red-500
                  shadow-md hover:shadow-red-500/30
                  transform active:scale-95 transition-all duration-200"
                type="button"
                onClick={() => display("projects")}
              >
                {t.card.display}
              </button>
            </div>

            {/* Decorative glow on hover */}
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, transparent 60%, rgba(239,68,68,0.15) 100%)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
