import { Language } from '../generated/graphql'

export const translateLanguagesToFrench = (lang?: Language | null): string => {
  if (lang === 'ENGLISH') return 'anglais'
  if (lang === 'KLINGON') return 'klingon'
  if (lang === 'FRENCH') return 'français'
  return 'français'
}
