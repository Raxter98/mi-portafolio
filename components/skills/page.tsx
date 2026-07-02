import { FunctionComponent } from 'react';

import Text from '../Common/Text';
import { Badge } from 'flowbite-react';
import Profile from '../../public/me.jpg';
import SkillsIcons from './SkillsIcons';
import { Fade, Slide } from 'react-awesome-reveal';
import { useTranslation } from '../../hooks/useTranslation';

const Skills: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div
      id="aboutme"
      className="flex w-full flex-col items-center justify-center gap-10 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-5 shadow-2xl shadow-black/10 dark:shadow-black/30 backdrop-blur lg:flex-row md:p-8 transition-all duration-300"
    >
      {/* Left — Photo + Title */}
      <div className="lg:py-10 md:flex md:flex-col justify-center items-center h-[30%] lg:w-1/2 space-y-16">
        <div className="flex justify-start items-start">
          <div className="mt-10 z-10 flex flex-wrap md:flex-col gap-y-4 justify-start">
            <div className="flex flex-col gap-y-2 items-start">
              <Text className="bg-red-500 text-white text-4xl md:text-5xl font-normal px-2 py-1 rounded">
                {t.skills.about}
              </Text>
              <Text className="px-2 text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">
                <Fade
                  className="underline underline-offset-4 decoration-red-500"
                  direction="up"
                  duration={150}
                  cascade
                  triggerOnce
                >
                  {'Marcos Valero'}
                </Fade>
              </Text>
              <div className="flex flex-wrap gap-2 mt-4">
                <Fade
                  direction="up"
                  duration={300}
                  cascade
                  triggerOnce
                >
                  <Badge color="primary">{t.skills.fullStack}</Badge>
                  <Badge color="primary">{t.skills.mobileDev}</Badge>
                </Fade>
              </div>
            </div>

            <Slide direction="left" triggerOnce className="flex items-center justify-end w-full">
              <div className="md:mt-4 pt-2 md:ml-24 max-w-[300px] h-[450px] relative overflow-hidden">
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={Profile.src}
                  alt="Foto de Marcos Valero"
                  loading="lazy"
                />
              </div>
            </Slide>
          </div>

          <div className="z-0 hidden md:flex absolute items-center justify-center left-0 h-[60%]">
            <div className="h-[100%] w-[500px] rounded-r-xl bg-red-500/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Right — Description + Icons */}
      <div className="md:flex md:flex-col justify-center h-[70%] lg:w-1/2 space-y-5 lg:max-w-[700px]">
        <div className="lg:mt-10 z-10 flex flex-col gap-y-5 items-center md:items-start">
          <span className="text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed">
            {t.skills.description}
          </span>
        </div>

        <div className="pt-10 pb-5 flex flex-row gap-2 items-end">
          <span className="text-4xl font-black underline underline-offset-4 decoration-red-500 text-zinc-900 dark:text-white">
            {t.skills.my}
          </span>
          <span className="bg-red-500 text-white font-normal text-4xl px-2 py-1 rounded">
            {t.skills.skillsTitle}
          </span>
        </div>
        <SkillsIcons />
      </div>
    </div>
  );
};

export default Skills;
