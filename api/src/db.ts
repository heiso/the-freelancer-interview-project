import { Language } from '../generated/graphql'

/**
 * Use this object mock as if it was retrieved from a database.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MOCK_FREELANCER = {
  id: 'a6af7583-ff4b-44b5-abc7-daf5444f3b9b',
  avatar: {
    '64x64': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/64x64.png',
    '256x256': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/256x256.png',
    '512x512': '/avatar/a6af7583-ff4b-44b5-abc7-daf5444f3b9b/512x512.png',
  },
  firstname: 'Gordon',
  lastname: 'Champlin',
  language: Language.KLINGON,
  birthDate: new Date(1990, 12, 31).toISOString(),
  isVisible: false,
  retribution: 500,
}
