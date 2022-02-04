import { Link } from 'react-router-dom'
import { OutlinedButton } from '../../components/Buttons'
import { Loader } from '../../components/Loader'
import useProfile from '../../hooks/useProfile'
import { translateLanguagesToFrench } from '../../utils/wording'

function ProfilePage() {
  const { status, data, error } = useProfile()
  const dobValue = data?.birthDate
  const dob = dobValue?.slice(0, 10).split('-').reverse().join(' / ')

  const displayAvailability = (visibility) => {
    if (visibility) return 'Oui'
    return 'Non'
  }

  if (status === 'loading') {
    return <Loader />
  }
  if (status === 'error') {
    return <div>Error: {error?.message}</div>
  }
  if (!data) {
    return <div>Error : data is missing</div>
  }
  return (
    <div className="flex flex-col">
      <div className="container mx-auto p-12 md:p-32">
        <div className="flex justify-between">
          <div className="self-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profil</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Vos informations personnelles</p>
          </div>
          <div>
            <img
              className="object-cover rounded-full"
              srcSet={`${`../..${data.avatar?.smallUrl}`} 64w, ${`../..${data.avatar?.largeUrl}`} 256w, ${`../..${data.avatar?.xLargeUrl}`} 512w`}
              sizes="(max-width: 768px) 64px, 128px"
              alt={`${data.firstname} ${data.lastname} avatar`}
            />
          </div>
        </div>
        <div className="mt-5 mb-10 border-t border-gray-200">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`${data.firstname} ${data.lastname}`}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dob}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Taux journalier</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data.retribution}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Langues</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {translateLanguagesToFrench(data.language)?.toLowerCase()}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Disponibilité</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {displayAvailability(data.isVisible)}
              </dd>
            </div>
          </dl>
        </div>
        <Link to="/profile/edit">
          <OutlinedButton type="button">Modifier</OutlinedButton>
        </Link>
      </div>
    </div>
  )
}

export default ProfilePage
