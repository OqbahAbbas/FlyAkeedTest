import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import PassengersSection from './PassengersSection'

const Passengers = () => {
	const locale = useRouter().locale ?? 'en'
	const { adult, child, infant } = useRecoilValue(LabelsAtom).pages.dashboard.passengers

	return (
		<Container locale={locale}>
			<PassengersSection {...{ title: adult, min: 1, withBorder: false, atomKey: 'adult' }} />
			<PassengersSection {...{ title: child, min: 0, withBorder: true, atomKey: 'child' }} />
			<PassengersSection
				{...{ title: infant, min: 0, withBorder: true, atomKey: 'infant' }}
			/>
		</Container>
	)
}

const Container = styled.div<{ locale: string | undefined }>`
	display: grid;
	grid-auto-flow: column;
	align-items: center;
	width: 50%;
	max-width: 430px;
	padding: 10px 0;
	margin: 5px 0;
	background: ${({ theme }) => theme.colors.white};

	${({ theme }) => theme.adaptive.md} {
		width: 100%;
	}
`

export default Passengers
