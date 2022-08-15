import Cookies from 'cookies';

import { generateToken } from '../../libs/token';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../libs/password';
import { signup } from '../../services/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const methodsAllowed = ['POST'];

	if (!methodsAllowed.includes(req?.method || '')) {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		res.status(401).json({ message: 'No email or password' });
		return;
	}

	await signup({ email, password, name });

	const passwordHashed = await hashPassword(password);

	await prisma.user.create({
		data: {
			email,
			password: passwordHashed,
			name
		}
	});

	const authToken = generateToken();

	const cookies = new Cookies(req, res);

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
