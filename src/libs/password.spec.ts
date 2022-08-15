import { hashPassword, comparePassword } from './password';

describe('Password', () => {
	it('should hash a password, compare it and returns true for correct pass', async () => {
		const password = 'password123';
		const passwordHashed = await hashPassword(password);
		const passwordMatch = await comparePassword(password, passwordHashed);
		expect(passwordMatch).toBe(true);
	});

	it('should hash a password, compare it and returns false for wrong pass', async () => {
		const rightPassword = 'password123';
		const wrongPassword = 'password1234';
		const passwordHashed = await hashPassword(rightPassword);
		const passwordMatch = await comparePassword(wrongPassword, passwordHashed);
		expect(passwordMatch).toBe(false);
	});
});
