import { procedure, router } from '../trpc'
import { listCoffees } from '../../services/coffees/list-coffees'

export const coffeeRouter = router({
  listCoffees: procedure.query(({}) => {
    return listCoffees()
  }),
})
