import Cookies from 'cookies'

import { generateToken } from '../../libs/token'
import { login } from '../../services/auth/login'
import prisma from '../../prisma/prisma-client'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const methodsAllowed = ['GET']

  if (!methodsAllowed.includes(req?.method || '')) {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  try {
    const cookies = new Cookies(req, res)
    // Get the authToken from the HTTP-only cookie.
    const authToken = cookies.get('auth-token')

    if (!authToken) {
      res.status(401).json({ message: 'Not authorized' })
      return
    }

    const session = await prisma.session.findFirst({
      where: {
        token: authToken,
      },
      include: {
        User: true,
      },
    })

    if (!session || !session.User) {
      res.status(401).json({ message: 'Not authorized' })
      return
    }

    res.status(200).json({
      user: {
        id: session.User.id,
      },
    })
  } catch (error: any) {
    res.status(401).json({ message: error.message })
  }
}
