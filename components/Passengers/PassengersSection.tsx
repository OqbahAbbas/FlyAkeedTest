import styled from '@emotion/styled'
import { ReactComponent as ArrowDown } from '@svg/pages/dashboard/downArrow.svg'
import { ReactComponent as ArrowUp } from '@svg/pages/dashboard/upArrow.svg'
import { ButtonBase } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { PassengersAtom } from '@atoms/Dashboard'

interface PassengersSectionProps {
	title: string
	min: number
	withBorder: boolean
	atomKey: string
}

const PassengersSection = ({ title, min, withBorder, atomKey }: PassengersSectionProps) => {
	const { maxError } = useRecoilValue(LabelsAtom).pages.dashboard.passengers
	const [count, setCount] = useRecoilState(PassengersAtom)

	const onAdd = () => {
		if (count.adult + count.child + count.infant === 9) {
			Snackbar.error(maxError)
			return
		}
		if (count.adult + count.child + count.infant < 9) {
			setCount({
				...count,
				[atomKey]: count[atomKey as keyof typeof count] + 1,
			})
		}
	}

	const onSub = () => {
		if (count[atomKey as keyof typeof count] > min) {
			setCount({
				...count,
				[atomKey]: count[atomKey as keyof typeof count] - 1,
			})
		}
	}

	return (
		<Container withBorder={withBorder}>
			<div className="sectionTitle">{title}</div>
			<div className="countSection">
				<div className="count">
					{count[atomKey as keyof typeof count]}
					<ArrowUpButton onClick={onAdd}>
						<ArrowUp />
					</ArrowUpButton>
					<ArrowDownButton onClick={onSub}>
						<ArrowDown />
					</ArrowDownButton>
				</div>
			</div>
		</Container>
	)
}

const Container = styled.div<{ withBorder: boolean }>`
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: 1fr;
	align-items: center;
	justify-content: center;
	width: 100%;
	border-left: solid ${({ withBorder }) => (withBorder ? '1px' : '0')} #f0eeee;

	.sectionTitle {
		display: grid;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme.colors.primary};
		font-size: 14px;
	}

	.countSection {
		position: relative;
		display: grid;
		align-items: center;
		justify-content: center;

		.count {
			font-size: 30px;
			color: ${({ theme }) => theme.colors.secondary};
		}
	}
`

const ArrowDownButton = styled(ButtonBase)`
	position: absolute;
	display: grid;
	justify-content: center;
	align-items: center;
	bottom: 0;
	right: 10%;
	width: 23px;
	height: 23px;
	padding: 0;
	margin: 0;

	svg {
		width: 23px;
		height: 23px;

		stroke: #ff56a1 !important;
		fill: #ff56a1 !important;
	}
`

const ArrowUpButton = styled(ButtonBase)`
	position: absolute;
	display: grid;
	justify-content: center;
	align-items: center;
	top: 0;
	right: 10%;
	width: 23px;
	height: 23px;
	padding: 0;
	margin: 0;

	svg {
		width: 23px;
		height: 23px;

		stroke: #ff56a1 !important;
		fill: #ff56a1 !important;
	}
`

export default PassengersSection
