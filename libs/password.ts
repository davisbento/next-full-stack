import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string) => {
	const passwordHashed = await bcryptjs.hash(password, 10);
	return passwordHashed;
};

export const comparePassword = async (password: string, passwordHashed: string) => {
	const passwordMatch = await bcryptjs.compare(password, passwordHashed);
	return passwordMatch;
};
