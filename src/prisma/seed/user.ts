import prisma from "../prisma-client"

import { faker } from "@faker-js/faker"
import { hashPassword } from "../../libs/password"

export const userSeed = async () => {
  const fakeData = await Promise.all(
    new Array(30).fill(null).map(async () => ({
      email: faker.internet.email(),
      password: await hashPassword(faker.internet.password()),
      name: faker.name.fullName(),
    }))
  )

  try {
    await prisma.user.deleteMany({})

    await prisma.user.createMany({
      data: fakeData,
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    prisma.$disconnect()
  }
}
