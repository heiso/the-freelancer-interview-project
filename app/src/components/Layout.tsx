import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
