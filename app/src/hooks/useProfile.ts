import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { Profile } from '../generated/graphql'
import { graphQLClient } from '../utils/graphql'

const query = gql`
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

function useProfile() {
  return useQuery<Profile, Error>('myProfile', async () => {
    const { myProfile } = await graphQLClient.request(query)
    return myProfile
  })
}

export default useProfile
