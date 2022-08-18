import HttpException from '../../exceptions/http-exception';
import { comparePassword, hashPassword } from '../../libs/password';
import prisma from '../../prisma/prisma-client';

interface ISignup {
	email: string;
	password: string;
	name: string;
}

export const login = async (email: string, password: string) => {
	if (!email || !password) {
		throw new HttpException('Missing required fields', 422);
	}

	const user = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (!user) {
		throw new HttpException('User not found', 401);
	}

	const isValid = await comparePassword(password, user.password);

	if (!isValid) {
		throw new HttpException('Invalid credentials', 401);
	}

	return user;
};

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
