import { Order } from '@prisma/client'
import HttpException from '../../exceptions/http-exception'
import prisma from '../../prisma/prisma-client'

export type CreateOrder = Omit<
  Order,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>

export const createOrder = async (model: CreateOrder) => {
  if (!model.userId) {
    throw new HttpException('userId is required', 400)
  }

  if (!model.coffeeId) {
    throw new HttpException('coffeeId is required', 400)
  }

  if (!model.quantity || model.quantity < 1) {
    throw new HttpException('Quantity is required', 400)
  }

  const order = await prisma.order.create({
    data: model,
  })

  return order
}
