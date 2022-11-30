import prisma from "../prisma-client"

import { faker } from "@faker-js/faker"

export const coffeeSeed = async () => {
  const fakeData = new Array(10).fill(null).map(() => ({
    name: faker.commerce.productName(),
    valueInCents: parseFloat(faker.commerce.price(1, 10, 2)) * 100,
    description: faker.lorem.paragraph(1),
  }))

  try {
    await prisma.coffee.deleteMany({})

    await prisma.coffee.createMany({
      data: fakeData,
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    prisma.$disconnect()
  }
}
