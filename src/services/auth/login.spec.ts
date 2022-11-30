import { login } from './login'
import { faker } from '@faker-js/faker'
import prisma from '../../prisma/prisma-client'
import { hashPassword } from '../../libs/password'

describe('Login', () => {
  it('should throws an error on missing fields', async () => {
    try {
      const model = {
        email: '',
        password: '',
      }

      await login(model.email, model.password)
      // just to make sure that the test is not passing when it should fail
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Missing required fields')
    }
  })

  it('should throws an error on user email not found', async () => {
    try {
      const model = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      await login(model.email, model.password)
      // just to make sure that the test is not passing when it should fail
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('User not found')
      expect(error.status).toBe(401)
    }
  })

  it('should throws an error on invalid password', async () => {
    try {
      const email = faker.internet.email()

      await prisma.user.create({
        data: {
          email,
          password: await hashPassword(faker.internet.password()),
          name: faker.name.fullName(),
        },
      })

      const model = {
        email,
        password: 'invalid-password',
      }

      await login(model.email, model.password)

      // just to make sure that the test is not passing when it should fail
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Invalid credentials')
      expect(error.status).toBe(401)
    }
  })

  it('should return user on success', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        name: faker.name.fullName(),
      },
    })

    const model = {
      email,
      password,
    }

    const user = await login(model.email, model.password)
    expect(user).toBeDefined()
    expect(user.email).toBe(model.email)
  })
})
