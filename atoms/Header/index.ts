import { atom } from 'recoil'

const prefix = 'Header'

export const CurrencyCookieName = `${prefix}Currency`

export const LanguageCookieName = `${prefix}Language`

export const CurrencyAtom = atom<string>({
	key: `${prefix}currency`,
	default: 'sar',
})
