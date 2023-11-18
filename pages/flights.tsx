import Meta from '@components/Layouts/Meta'
import BaseContainer from '@components/Layouts/Main/Container'
import styled from '@emotion/styled'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'
import FlightService, { FlightSearch } from '@api/Models/Flight'
import { AirlinesAtom, CheapestFlightAtom, CheapestPriceAtom, FlightsAtom } from '@atoms/Flight'
import FlightsList from '@components/Pages/Flights/FlightsList'

const Page: NextPageWithProps = () => (
	<>
		<Meta />
		<Container>
			<FlightsList />
		</Container>
	</>
)

const Container = styled(BaseContainer)`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 32px 100px;
	background-color: #e8efff;
	min-height: 100vh;
`

Page.getInitialProps = context =>
	initialPropsWrapper(
		async ({ query }) => {
			const {
				from,
				to,
				city_search: citySearch,
				date,
				ret_date: retDate,
				adult,
				child,
				infant,
				trip_type: tripType,
				n,
				'cabin[]': cabin,
				currency,
			} = query

			const request = await FlightService.searchFlights({
				from,
				to,
				city_search: citySearch,
				date,
				ret_date: retDate,
				adult,
				child,
				infant,
				trip_type: tripType,
				n,
				currency,
				'cabin[]': cabin,
			} as FlightSearch)

			if (request && !('error' in request)) {
				const {
					airlines,
					cabins,
					cheapest_flight: cheapestFlight,
					cheapest_price: cheapestPrice,
					flights,
				} = request
				return {
					airlines,
					cabins,
					cheapestFlight,
					cheapestPrice,
					flights,
				}
			}

			return { props: {} }
		},
		Page,
		context
	)

Page.getLayout = page => <MainLayout>{page}</MainLayout>

Page.recoilSetter = ({ set }, { airlines, cheapestFlight, cheapestPrice, flights }) => {
	const render = flights?.render ?? []
	set(FlightsAtom, render)
	set(CheapestFlightAtom, cheapestFlight)
	set(CheapestPriceAtom, cheapestPrice)
	set(AirlinesAtom, airlines)
}

export default Page
