import { signup } from '../../services/auth/signup';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const methodsAllowed = ['POST'];

	if (!methodsAllowed.includes(req?.method || '')) {
		res.status(405).json({ message: 'Method not allowed' });
		return;
	}

	const { email, password, name } = req.body;

	await signup({ email, password, name });

	res.status(200).json({
		message: 'User created successfully'
	});
}
