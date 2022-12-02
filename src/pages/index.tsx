import type { NextPage } from 'next'
import Link from 'next/link'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const hello = trpc.hello.useQuery({ text: 'clientdadsa' })

  if (!hello.data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>{hello.data.greeting}</p>

      <Link href="/coffees">Coffees</Link>
    </div>
  )
}

export default Home
