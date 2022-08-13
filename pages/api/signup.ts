import Cookies from 'cookies';

import { generateToken } from '../../libs/token';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const methodsAllowed = ['POST'];

	if (!methodsAllowed.includes(req?.method || '')) {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	const cookies = new Cookies(req, res);

	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		res.status(401).json({ message: 'No email or password' });
		return;
	}

	// create user using the pruisma client
	const user = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (user) {
		res.status(401).json({ message: 'User already exists' });
		return;
	}

	await prisma.user.create({
		data: {
			email,
			password,
			name
		}
	});

	const authToken = generateToken();

	// Set the authToken as an HTTP-only cookie.
	// We'll also set the SameSite attribute to
	// 'lax' for some additional CSRF protection.
	cookies.set('auth-token', authToken, {
		httpOnly: true,
		sameSite: 'lax'
	});

	// Our response to the client won't contain
	// the actual authToken. This way the auth token
	// never gets exposed to the client.
	res.status(200).json({ loggedIn: true });
}
