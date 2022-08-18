import { signup } from '.';

import { faker } from '@faker-js/faker';
import prisma from '../../prisma/prisma-client';
import { hashPassword } from '../../libs/password';

describe('Sign Up', () => {
	it('should throws an error on missing fields', async () => {
		try {
			const model = {
				email: '',
				password: '',
				name: ''
			};
			await signup(model);
			// just to make sure that the test is not passing when it should fail
			expect(true).toBe(false);
		} catch (error) {
			expect(error.message).toBe('Missing required fields');
		}
	});

	it('should throws an error on user already exists', async () => {
		try {
			const email = faker.internet.email();
			const password = faker.internet.password();

			await prisma.user.create({
				data: {
					email,
					password: await hashPassword(password),
					name: faker.name.fullName()
				}
			});

			const model = {
				email,
				password,
				name: faker.internet.userName()
			};
			await signup(model);
			// just to make sure that the test is not passing when it should fail
			expect(true).toBe(false);
		} catch (error) {
			expect(error.message).toBe('User already exists');
		}
	});

	it('should create a new user', async () => {
		const model = {
			email: faker.internet.email(),
			password: faker.internet.password(),
			name: faker.name.fullName()
		};

		const response = await signup(model);
		expect(response).toBeDefined();
		expect(response.email).toBe(model.email);
	});
});
