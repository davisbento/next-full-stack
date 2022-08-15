import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface ISignup {
	email: string;
	password: string;
	name: string;
}

export const signup = async (model: ISignup) => {
	const user = await prisma.user.findFirst({
		where: {
			email: model.email
		}
	});

	if (user) {
		throw new Error('User already exists');
	}

	return;
};
