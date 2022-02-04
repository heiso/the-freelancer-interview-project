import { Link } from 'react-router-dom'
import { OutlinedButton } from '../components/Buttons'

function Home() {
  return (
    <div className="fixed top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center items-center">
        <div className="mt-4 sm:mt-6 md:mt-8">
          {' '}
          <Link to="/profile/">
            <OutlinedButton type="button">Mon profil</OutlinedButton>
          </Link>
        </div>
        <div className="mt-4 sm:mt-6 md:mt-8">
          {' '}
          <Link to="/profile/edit">
            <OutlinedButton type="button">Modifier mon profil</OutlinedButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
