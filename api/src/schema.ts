import { gql } from 'graphql-tag'
import { Resolvers } from '../generated/graphql'
import { MOCK_FREELANCER } from './db'

export const typeDefs = gql`
  type Avatar {
    smallUrl: String!
    largeUrl: String!
    xLargeUrl: String!
  }

  enum Language {
    FRENCH
    ENGLISH
    KLINGON
  }

  # Type for the freelancer's profile
  type Profile {
    id: ID!
    firstname: String!
    lastname: String!
    isVisible: Boolean
    retribution: Int
    birthDate: String
    avatar: Avatar
    language: Language
  }

  # Retrieve the current freelancer's profile
  type Query {
    myProfile: Profile!
  }

  # Todo: Write a mutation to update the current freelancer's profile.
  # type Mutation {
  #   ...
  # }
`

function formatAvatar(avatar?: typeof MOCK_FREELANCER.avatar) {
  if (!avatar) return null
  return {
    smallUrl: avatar['64x64'],
    largeUrl: avatar['256x256'],
    xLargeUrl: avatar['512x512'],
  }
}

export const resolvers: Resolvers = {
  Query: {
    /**
     * @Todo
     * Implement the query to retrieve the current freelancer's profile.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    myProfile(root, args, context) {
      const avatar = formatAvatar(MOCK_FREELANCER.avatar)
      return {
        ...MOCK_FREELANCER,
        avatar,
      }
    },
  },

  /**
   * @Todo
   * Implement the mutation to update the current freelancer's profile.
   */
  // Mutation: {},
}
