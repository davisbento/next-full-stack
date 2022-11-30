import HttpException from '../../exceptions/http-exception'
import { comparePassword } from '../../libs/password'
import prisma from '../../prisma/prisma-client'

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new HttpException('Missing required fields', 422)
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    throw new HttpException('User not found', 401)
  }

  const isValid = await comparePassword(password, user.password)

  if (!isValid) {
    throw new HttpException('Invalid credentials', 401)
  }

  return user
}
