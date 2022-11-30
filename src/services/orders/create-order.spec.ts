import prisma from '../../prisma/prisma-client'
import { CreateOrder, createOrder } from './create-order'

describe('CreateOrder', () => {
  it('should throws an error on invalid quantity', async () => {
    try {
      const model: CreateOrder = {
        quantity: -1,
        coffeeId: 1,
        userId: 1,
      }

      await createOrder(model)
      // just to make sure that the test is not passing when it should fail
      expect(true).toBe(false)
    } catch (error) {
      expect(error.message).toBe('Quantity is required')
    }
  })

  it('should create an order with the first random user and first random coffee found', async () => {
    try {
      const userCount = await prisma.user.count()

      const userSkip = Math.floor(Math.random() * userCount)

      const randomUser = await prisma.user.findFirst({
        skip: userSkip,
      })

      if (!randomUser) {
        throw new Error('No user found')
      }

      const coffeeRandom = await prisma.coffee.count()

      const coffeeSkip = Math.floor(Math.random() * coffeeRandom)

      const randomCoffee = await prisma.coffee.findFirst({
        skip: coffeeSkip,
      })

      if (!randomCoffee) {
        throw new Error('No coffee found')
      }

      const model: CreateOrder = {
        quantity: 1,
        coffeeId: randomCoffee.id,
        userId: randomUser.id,
      }

      const order = await createOrder(model)
      expect(order).toHaveProperty('id')
      expect(order).toHaveProperty('createdAt')
      expect(order).toHaveProperty('updatedAt')
      expect(order).toHaveProperty('status')
      expect(order.status).toBe('pending')
      expect(order.userId).toBe(randomUser.id)
      expect(order.coffeeId).toBe(randomCoffee.id)
    } catch (error) {
      expect(error.message).toBe(null)
    }
  })
})
