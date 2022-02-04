import { gql } from 'graphql-tag'
import { Language, Resolvers } from '../generated/graphql'
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
    retribution: Int!
    birthDate: String
    avatar: Avatar
    language: Language
  }

  input ProfileInput {
    firstname: String!
    lastname: String!
    isVisible: Boolean
    retribution: String
    birthDate: String
    language: Language
  }

  # Retrieve the current freelancer's profile
  type Query {
    myProfile: Profile!
  }

  # Mutation to update the current freelancer's profile.
  type Mutation {
    updateProfile(input: ProfileInput!): Profile!
  }
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
     * Query to retrieve the current freelancer's profile.
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
   * Mutation to update the current freelancer's profile.
   */
  Mutation: {
    updateProfile(root, { input }) {
      MOCK_FREELANCER.firstname = input.firstname
      MOCK_FREELANCER.lastname = input.lastname
      MOCK_FREELANCER.birthDate = input.birthDate || ''
      MOCK_FREELANCER.retribution = parseInt(input.retribution || '0')
      MOCK_FREELANCER.language = input.language || Language.KLINGON
      MOCK_FREELANCER.isVisible = input.isVisible || false
      const avatar = formatAvatar(MOCK_FREELANCER.avatar)
      return {
        ...MOCK_FREELANCER,
        avatar,
      }
    },
  },
}
