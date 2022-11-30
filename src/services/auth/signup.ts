import HttpException from '../../exceptions/http-exception';
import { hashPassword } from '../../libs/password';
import prisma from '../../prisma/prisma-client';

interface ISignup {
	email: string;
	password: string;
	name: string;
}

export const signup = async (model: ISignup) => {
	const { email, password, name } = model;

	if (!email || !password || !name) {
		throw new HttpException('Missing required fields', 422);
	}

	const user = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (user) {
		throw new HttpException('User already exists', 404);
	}

	const passwordHashed = await hashPassword(password);

	const userCreated = await prisma.user.create({
		data: {
			email,
			password: passwordHashed,
			name
		}
	});

	return userCreated;
};
