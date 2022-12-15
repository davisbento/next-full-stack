import type { GetServerSideProps, NextPage } from 'next'
import Cookies from 'cookies'
import { useCallback, useEffect } from 'react'
import axios from 'axios'

const Home: NextPage = () => {
  const getProfile = useCallback(async () => {
    const response = await axios.get('/api/profile')
    console.log(response.data)
  }, [])

  useEffect(() => {
    getProfile()
  }, [getProfile])

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
