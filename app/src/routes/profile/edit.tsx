import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FullButton } from '../../components/Buttons'
import { Loader } from '../../components/Loader'
import { Language } from '../../generated/graphql'
import useProfile from '../../hooks/useProfile'
import useUpdateProfile from '../../hooks/useUpdateProfile'

type FormInputs = {
  firstname: string
  lastname: string
  birthDate: string
  retribution: number
  language: Language
  isVisible: boolean
}

function EditProfileForm() {
  const { status, data, error } = useProfile()
  const { mutate } = useUpdateProfile()
  const [formError, setFormError] = useState<null | string>(null)
  const [formSuccess, setFormSuccess] = useState<null | string>(null)
  const dobValue = data?.birthDate
  const birthDate = dobValue?.slice(0, 10)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>()

  const changeValueToBoolean = (value) => {
    if (value === 'oui') return true
    return false
  }

  const changeBooleanToValue = (bool) => {
    if (bool === true) return 'oui'
    return 'non'
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formValues = {
      firstname: getValues('firstname'),
      lastname: getValues('lastname'),
      birthDate: getValues('birthDate'),
      retribution: getValues('retribution').toString(),
      language: getValues('language'),
      isVisible: changeValueToBoolean(getValues('isVisible')),
    }

    await mutate(formValues, {
      onError: () => {
        setFormError('an error occured while saving you profile')
      },
      onSuccess: () => {
        setFormSuccess('Votre profil a été modifié avec succès')
      },
    })
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
              {/* NOTE: Change avatar picture not available */}
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
                      disabled
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
                    defaultValue={data.firstname}
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
                    defaultValue={data.lastname}
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
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Date of birth
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    defaultValue={birthDate}
                    {...register('birthDate')}
                    type="date"
                    id="birthDate"
                    name="birthDate"
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
                    defaultValue={data.language || Language.FRENCH}
                    {...register('language')}
                    id="language"
                    name="language"
                    autoComplete="language"
                    className="max-w-lg block focus:ring-gray-500 focus:border-gray-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value={Language.ENGLISH}>Anglais</option>
                    <option value={Language.FRENCH}>Français</option>
                    <option value={Language.KLINGON}>Klingon</option>
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
                  htmlFor="isVisible"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Disponibilité
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    defaultValue={changeBooleanToValue(data.isVisible)}
                    {...register('isVisible')}
                    id="isVisible"
                    name="isVisible"
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
              Retourner à mon profil
            </Link>
            <FullButton type="submit">Sauvegarder</FullButton>
          </div>
        </div>
        {formError && <div className="text-red-500 text-center border-none">{formError}</div>}
        {formSuccess && (
          <div className="text-emerald-400 text-center border-none">{formSuccess}</div>
        )}
      </form>
    </div>
  )
}

export default EditProfileForm
