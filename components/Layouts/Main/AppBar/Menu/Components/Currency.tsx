import { CurrencyAtom, CurrencyCookieName } from '@atoms/Header'
import LabelsAtom from '@atoms/Labels'
import { MenuContentItem } from '@components/Layouts/Main/AppBar/Menu/Components/types'
import { setCookie } from 'cookies-next'
import { useRecoilValue } from 'recoil'
import { ReactComponent as KSAFlag } from '@svg/layout/AppBar/KSAFlag.svg'
import { ReactComponent as USAFlag } from '@svg/layout/AppBar/USAFlag.svg'
import styled from '@emotion/styled'
import { setRecoil } from '@admixltd/admix-component-library/RecoilNexus'

const CurrencyOption = styled.div`
	width: fit-content;
	display: grid;
	grid-auto-flow: column;
	align-items: center;
	justify-content: space-between;

	svg {
		width: 20px;
		height: 20px;
	}
`

const Currency = ({ currency }: { currency: string }) => {
	const { sar, usd } = useRecoilValue(LabelsAtom).layout.header.currency

	return {
		title: (
			<div>
				{currency === 'sar' ? (
					<CurrencyOption>
						<KSAFlag className="outerSVG" /> &nbsp; {sar}
					</CurrencyOption>
				) : (
					<CurrencyOption>
						<USAFlag className="outerSVG" /> &nbsp; {usd}
					</CurrencyOption>
				)}
			</div>
		),
		menuProps: {
			transformOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'right',
			},
		},
		toggleProps: {
			title: currency,
			className: 'currencyMenuToggle',
		},
		items: [
			{
				title: (
					<CurrencyOption>
						<KSAFlag /> &nbsp; {sar}
					</CurrencyOption>
				),
				active: currency === 'sar',
				onClick: () => {
					setCookie(CurrencyCookieName, 'sar')
					setRecoil(CurrencyAtom, 'sar')
				},
			},
			{
				title: (
					<CurrencyOption>
						<USAFlag /> &nbsp; {usd}
					</CurrencyOption>
				),
				active: currency === 'usd',
				onClick: () => {
					setCookie(CurrencyCookieName, 'usd')
					setRecoil(CurrencyAtom, 'usd')
				},
			},
		],
	} as unknown as MenuContentItem
}

export default Currency
