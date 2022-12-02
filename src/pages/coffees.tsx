import type { NextPage } from 'next'
import { formatCurrency } from '../utils/number'
import { trpc } from '../utils/trpc'

const Coffees: NextPage = () => {
  const coffees = trpc.coffee.listCoffees.useQuery()

  if (!coffees.data?.length) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {coffees.data.map(coffee => (
        <div key={coffee.id} className="flex items-center gap-4">
          <h2>{coffee.name}</h2>
          <p>{formatCurrency(coffee.price)}</p>
        </div>
      ))}
    </div>
  )
}

export default Coffees
