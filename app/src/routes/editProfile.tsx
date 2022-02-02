import { gql, request } from 'graphql-request'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Language, Profile } from '../generated/graphql'

export const endpoint = '/api/graphql'

function useProfile() {
  return useQuery<Profile, Error>('myProfile', async () => {
    const { myProfile } = await request(
      endpoint,
      gql`
        query {
          myProfile {
            id
            firstname
            lastname
            avatar {
              smallUrl
              largeUrl
              xLargeUrl
            }
            language
            birthDate
            retribution
            isVisible
          }
        }
      `
    )
    return myProfile
  })
}

type Inputs = {
  firstname: string
  lastname: string
  dob: string
  retribution: number
  language: Language
  availability: boolean
}

function EditProfileForm() {
  const { status, data, error } = useProfile()
  const dobValue = data?.birthDate
  console.log(dobValue?.slice(0, 10))
  const dob = dobValue?.slice(0, 10)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  console.log(watch('firstname'))
  console.log(watch('lastname'))
  console.log(watch('dob'))
  console.log(watch('language'))
  console.log(watch('availability'))
  console.log(watch('retribution'))
  if (!data) {
    return <div>Error : data is missing</div>
  }
  return (
    <div className="container mx-auto p-12 md:p-32">
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Modifier vos informations personnelles
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    <img
                      src={`../..${data.avatar?.smallUrl}`}
                      className="h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                    ></img>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Prénom
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    defaultValue={data?.firstname}
                    {...register('firstname')}
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="given-name"
                    className="block max-w-lg w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Nom
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    defaultValue={data?.lastname}
                    {...register('lastname')}
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="family-name"
                    className="block max-w-lg w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Date of birth
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    defaultValue={dob}
                    {...register('dob')}
                    type="date"
                    id="dob"
                    name="dob"
                    autoComplete="bday"
                    className="max-w-lg block w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Langue
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    {...register('language')}
                    id="language"
                    name="language"
                    autoComplete="language"
                    className="max-w-lg block focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="ENGLISH">Anglais</option>
                    <option value="FRENCH">Français</option>
                    <option value="KLINGON">Klingon</option>
                  </select>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="retribution"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Taux journalier
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    defaultValue={data.retribution}
                    {...register('retribution')}
                    type="number"
                    name="retribution"
                    id="retribution"
                    className="block max-w-lg w-full shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Disponibilité
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    {...register('availability')}
                    id="availability"
                    name="availability"
                    autoComplete="availability-name"
                    className="max-w-lg block focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-center">
          <div className="flex justify-end">
            <Link className="font-medium underline self-center" to="/profile">
              Annuler
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm
