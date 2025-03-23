import { FunctionComponent, ReactNode } from 'react';

interface TextProps {
	children: ReactNode;
	className?: string;
}

const Text: FunctionComponent<TextProps> = ({ children, className }) => {
	return <span className={`${className ?? 'text-black'} dark:text-white`}>{children}</span>;
};

export default Text;