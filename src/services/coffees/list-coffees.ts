import prisma from '../../prisma/prisma-client'

type CoffeeList = {
  id: number
  name: string
  description: string
  price: number
  ordersCount: number
}

export const listCoffees = async (): Promise<CoffeeList[]> => {
  const coffees = await prisma.coffee.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      valueInCents: true,
      Order: true,
    },
  })

  if (coffees.length === 0) {
    return []
  }

  const coffeeList: CoffeeList[] = coffees.map(coffee => {
    return {
      id: coffee.id,
      name: coffee.name,
      description: coffee.description,
      price: coffee.valueInCents / 100,
      ordersCount: coffee.Order.length,
    }
  })

  return coffeeList
}
