import { FunctionComponent } from 'react';
import { SkillsIconsProps } from '../../../types/skills';
import { icons } from './icons';
import { Tooltip } from 'flowbite-react';
import { Fade } from 'react-awesome-reveal';

const SkillsIcons: FunctionComponent = () => {
	const iconZoom =
		'transition-transform duration-500 hover:scale-125 ease-in-out p-2 bg-gray-200 dark:bg-gray-700 rounded-md';

	return (
		<div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
			<Fade direction="up" duration={120} cascade triggerOnce>
				{icons.map((icon: SkillsIconsProps, index: number) => (
					<div key={index}>
						<Tooltip content={icon.name}>
							<icon.icon className={`${iconZoom} text-5xl`} style={{ color: icon.color }} />
						</Tooltip>
					</div>
				))}
			</Fade>
		</div>
	);
};

export default SkillsIcons;