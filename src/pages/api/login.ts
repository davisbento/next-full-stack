import Cookies from 'cookies'

import { generateToken } from '../../libs/token'
import { login } from '../../services/auth/login'
import prisma from '../../prisma/prisma-client'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const methodsAllowed = ['POST']

  if (!methodsAllowed.includes(req?.method || '')) {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  const { email, password } = req.body

  try {
    const user = await login(email, password)

    const authToken = generateToken()

    await prisma.session.create({
      data: {
        token: authToken,
        userId: user.id,
      },
    })

    const cookies = new Cookies(req, res)

    // Set the authToken as an HTTP-only cookie.
    // We'll also set the SameSite attribute to
    // 'lax' for some additional CSRF protection.
    cookies.set('auth-token', authToken, {
      httpOnly: true,
      sameSite: 'lax',
    })

    // Our response to the client won't contain
    // the actual authToken. This way the auth token
    // never gets exposed to the client.
    res.status(200).json({ message: 'Login successful' })
  } catch (error: any) {
    res.status(401).json({ message: error.message })
  }
}
