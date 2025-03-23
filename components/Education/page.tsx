"use client"

import { FunctionComponent } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import Text from '../Common/Text';
import { universities } from './universities';
import UniversityItem from './UniversityItem';
import GraduatedAnimation from '../../public/graduate.json';
import { Fade } from 'react-awesome-reveal';
import Lottie from "lottie-react";

const Education: FunctionComponent = () => {
	

return (
    <div id="education" className="flex justify-center text-black dark:text-white">
        <div className="flex flex-col py-10 space-y-10">
            <div className="pt-10 flex flex-wrap gap-2 items-end z-10">
                <Text className="bg-red-500 text-black dark:text-white  font-normal text-4xl md:text-5xl px-2 py-1">MY EDUCATION</Text>
                <Text className="text-4xl md:text-5xl font-black text-black dark:text-white">
                    <Fade
                        className="underline underline-offset-4 decoration-red-500"
                        direction="up"
                        duration={160}
                        cascade
                        triggerOnce
                    >
                        College
                    </Fade>
                </Text>
            </div>
            <div className="flex flex-col md:flex-row justify-between space-y-5 z-10 text-black dark:text-white">
                <div className="flex flex-col gap-8 items-start lg:w-[60%] lg:max-w-[600px]">
                    {universities.map((university, index) => (
                        <UniversityItem key={index} university={university} />
                    ))}
                </div>
                <div className="hidden lg:flex lg:w-[40%] items-start">
                    <div id="playerAnimation" className="-mt-20">
                        <Lottie loop={true} 
      autoplay={true}  animationData={GraduatedAnimation} className="w-[100%] max-w-[800px]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Education;