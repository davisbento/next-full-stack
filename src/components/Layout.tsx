import { useRouter } from 'next/router'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  const path = useRouter().pathname

  if (path === '/login') {
    return (
      <main className="h-full bg-slate-100" style={{ height: '100vh' }}>
        {children}
      </main>
    )
  }

  return <main className="main">{children}</main>
}
