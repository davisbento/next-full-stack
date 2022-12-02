import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const Layout = ({ children }: IProps) => {
  return <main className="main">{children}</main>
}
