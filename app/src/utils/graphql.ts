import { gql, GraphQLClient } from 'graphql-request'

const endpoint = '/api/graphql'

export const graphQLClient = new GraphQLClient(endpoint)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AvatarExampleFragmentDocument = gql`
  fragment AvatarExample on Avatar {
    smallUrl
    largeUrl
    xLargeUrl
  }
`
