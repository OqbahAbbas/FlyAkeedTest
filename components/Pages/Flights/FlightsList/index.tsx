import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { FlightsAtom } from '@atoms/Flight'
import FlightCard from './FlightCard'

const FlightsLit = () => {
	const flights = useRecoilValue(FlightsAtom)
	return (
		<Container>
			{flights.map(flight => (
				<FlightCard flight={flight} key={flight.flightNumber} />
			))}
		</Container>
	)
}

const Container = styled.div`
	width: 75%;
`

export default FlightsLit
