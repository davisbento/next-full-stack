import type { GetServerSideProps, NextPage } from 'next'
import Cookies from 'cookies'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Bem-vindo a nossa Coffee Store</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req, res } = ctx
  const cookies = Cookies(req, res)
  const token = cookies.get('auth-token')

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Home
