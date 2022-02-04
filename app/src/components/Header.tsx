import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="bg-gray-200 p-6 mb-6">
      <h1 className="font-semibold text-xl tracking-tight">
        <Link to={'/'}>Comet</Link>
      </h1>
    </nav>
  )
}

export default Header
