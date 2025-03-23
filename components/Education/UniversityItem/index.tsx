import { FunctionComponent } from 'react';
import Text from '../../Common/Text';
import { UniversityItemProps } from '../../../types/education';

const UniversityItem: FunctionComponent<UniversityItemProps> = ({ university }) => {
	return (
		<div className="flex flex-col gap-2 items-start">
			<Text className="text-3xl font-semibold underline underline-offset-4 decoration-red-500">
				{university.title}
			</Text>
			<Text className="text-xl font-medium text-gray-500">{university.university}</Text>
			<Text className="bg-red-500 text-white text-xl font-medium px-2 py-1">
				{university.date.start} - {university.date.end}
			</Text>
		</div>
	);
};

export default UniversityItem;