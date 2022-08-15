import { ReactNode } from 'react';

interface IProps {
	children: ReactNode;
}

export const Layout = ({ children }: IProps) => {
	return <main className='main bg-slate-700'>{children}</main>;
};
