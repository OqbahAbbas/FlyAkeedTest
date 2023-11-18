import styled from '@emotion/styled'
import { ReactComponent as Arrows } from '@svg/pages/dashboard/arrows.svg'
import { ButtonBase } from '@mui/material'
import { useRecoilState } from 'recoil'
import { DestinationAirportAtom, SourceAirportAtom } from '@atoms/Dashboard'
import DestinationAirport from './DestinationAirport'
import SourceAirport from './SourceAirport'

const Airports = () => {
	const [sourceAirport, setSourceAirport] = useRecoilState(SourceAirportAtom)
	const [destinationAirport, setDestinationAirport] = useRecoilState(DestinationAirportAtom)

	const onSwitch = () => {
		if (!sourceAirport || !destinationAirport) return
		const copySourceAirport = sourceAirport
		setSourceAirport(destinationAirport)
		setDestinationAirport(copySourceAirport)
	}

	return (
		<Container>
			<SourceAirport />
			<DestinationAirport />
			<SwichButton disabled={!sourceAirport || !destinationAirport} onClick={onSwitch}>
				<Arrows />
			</SwichButton>
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	width: 50%;
	max-width: 430px;

	${({ theme }) => theme.adaptive.md} {
		width: 100%;
	}
`

const SwichButton = styled(ButtonBase)`
	position: absolute;
	display: grid;
	justify-content: center;
	align-items: center;
	top: 50%;
	transform: translate(-50%, -50%);
	right: 10px;
	background: #fff;
	width: 30px;
	height: 30px;
	padding: 0;
	margin: 0;

	svg {
		width: 15px;
		height: 15px;

		stroke: #ff56a1 !important;
		fill: #ff56a1 !important;
		stroke-width: 0.1px !important;
	}
`

export default Airports
