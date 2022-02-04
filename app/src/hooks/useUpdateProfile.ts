import { gql } from 'graphql-request'
import { useMutation } from 'react-query'
import { ProfileInput } from '../generated/graphql'
import { graphQLClient } from '../utils/graphql'

const mutation = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      firstname
      lastname
      birthDate
      retribution
      language
      isVisible
    }
  }
`

function useUpdateProfile() {
  return useMutation(async (variables: ProfileInput) => {
    const { updateProfile } = await graphQLClient.request(mutation, { input: variables })
    return updateProfile
  })
}

export default useUpdateProfile
