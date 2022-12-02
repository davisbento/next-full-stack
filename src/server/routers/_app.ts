import { z } from 'zod'

import { procedure, router } from '../trpc'
import { coffeeRouter } from './coffees'

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      }
    }),
  coffee: coffeeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
