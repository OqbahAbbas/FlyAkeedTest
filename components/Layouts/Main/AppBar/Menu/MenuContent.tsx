import { useEffect } from 'react'
import { CurrencyAtom, CurrencyCookieName } from '@atoms/Header'
import { getCookie } from 'cookies-next'
import { useRecoilState } from 'recoil'
import ContentGenerator from './Components/ContentGenerator'
import { MenuContentItem } from './Components/types'
import CorporateButton from './Components/CorporateButton'
import LoginButton from './Components/LoginButton'
import Currency from './Components/Currency'
import LanguageButton from './Components/LanguageButton'

const MenuContent = () => {
	const [currency, setCurrency] = useRecoilState(CurrencyAtom)
	useEffect(() => {
		setCurrency((getCookie(CurrencyCookieName) as string) ?? 'sar')
	}, [])
	const LeftContent: MenuContentItem[] = [
		{
			...Currency({ currency }),
		},
		{
			component: () => <LanguageButton />,
		},
	]

	const RightContent: MenuContentItem[] = [
		{
			component: () => <CorporateButton />,
		},
		{
			component: () => <LoginButton />,
		},
	]

	return (
		<>
			<div>{ContentGenerator(LeftContent)}</div>
			<div>{ContentGenerator(RightContent)}</div>
		</>
	)
}

export default MenuContent
