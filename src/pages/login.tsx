import type { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const router = useRouter()

  const [model, setModel] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { email, password } = model
    try {
      await axios.post('/api/login', { email, password })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setModel({
      ...model,
      [name]: value,
    })
  }

  const inputStyle = (name: 'password' | 'email') => {
    if (errors[name].length) {
      return 'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
    }

    return 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
  }

  return (
    <div className="flex justify-center flex-col items-center h-full">
      <h1 className="text-2xl mb-8">Login</h1>

      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className={inputStyle('email')}
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className={inputStyle('password')}
              type="password"
              placeholder="******************"
              name="password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Acessar
            </button>
            <a
              className="align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Coffee Shop. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login
