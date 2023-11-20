import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { FlightsAtom } from '@atoms/Flight'
import LabelsAtom from '@atoms/Labels'
import { useState } from 'react'
import { ButtonBase } from '@mui/material'
import { ReactComponent as PlaneDeparture } from '@svg/pages/flights/planeDeparture.svg'
import FlightCard from './FlightCard'
import Filters from './Filters'

const FlightsLit = () => {
	const flights = useRecoilValue(FlightsAtom)
	const { HideNonDirect, showNonDirect, title } = useRecoilValue(LabelsAtom).pages.flights.list
	const directFlights = flights.filter(flight => flight.stops === '0')
	const nonDirectFlights = flights.filter(flight => flight.stops !== '0')
	const [nonDirectVisible, setNonDirectVisible] = useState(!(directFlights.length > 0))
	return (
		<Container>
			<Filters />
			<div className="cards">
				<div className="header">
					<PlaneDeparture />
					{title(nonDirectVisible ? flights.length : directFlights.length)}
				</div>
				{directFlights.map(flight => (
					<FlightCard flight={flight} key={flight.flightID} />
				))}
				{directFlights.length > 0 && (
					<ButtonBase
						className="showNonDirect"
						onClick={() => setNonDirectVisible(!nonDirectVisible)}
					>
						{!nonDirectVisible ? showNonDirect : HideNonDirect}
					</ButtonBase>
				)}
				{nonDirectVisible &&
					nonDirectFlights.map(flight => (
						<FlightCard flight={flight} key={flight.flightID} />
					))}
			</div>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 25% 75%;
	justify-content: center;
	align-items: start;

	${({ theme }) => theme.adaptive.md} {
		grid-auto-flow: row;
		grid-template-columns: 1fr;
	}

	.cards {
		display: grid;
		grid-auto-flow: row;
		gap: 24px;

		.header {
			display: grid;
			grid-auto-flow: column;
			justify-content: start;
			align-items: top;
			color: ${({ theme }) => theme.colors.secondary};
			font-size: 20px;
			font-weight: 400;
			padding: 0 8px;

			svg {
				width: 50px;
				height: 32px;

				stroke: #fc53a1 !important;
				fill: none !important;
				stroke-width: 30px;
			}
		}

		.showNonDirect {
			display: grid;
			align-items: center;
			justify-content: center;
			align-text: center;
			height: 40px;
			background: #b3b3b3;
			color: white;
			font-size: 14px;
			font-weight: 400;
			width: 100%;
			border-radius: 3px;

			&:hover {
				background: #909090;
			}
		}
	}
`

export default FlightsLit
