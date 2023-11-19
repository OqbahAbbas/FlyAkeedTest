import Meta from '@components/Layouts/Meta'
import BaseContainer from '@components/Layouts/Main/Container'
import styled from '@emotion/styled'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'
import FlightService, { FlightSearch } from '@api/Models/Flight'
import { useRecoilValue } from 'recoil'
import { AirlinesAtom, CheapestFlightAtom, CheapestPriceAtom, FlightsAtom } from '@atoms/Flight'
import FlightsList from '@components/Pages/Flights/FlightsList'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import LabelsAtom from '@atoms/Labels'
import { getRouter } from '@helpers/RouterNexus'
import pages from '@constants/pages'
import { useEffect } from 'react'

const Page: NextPageWithProps = () => {
	const { noFlights } = useRecoilValue(LabelsAtom).pages.flights
	const router = getRouter()
	const flights = useRecoilValue(FlightsAtom)

	useEffect(() => {
		if (flights.length === 0) {
			Snackbar.error(noFlights)
			router.push(pages.dashboard.url)
		}
	}, [])

	return (
		<>
			<Meta />
			<Container>
				<FlightsList />
			</Container>
		</>
	)
}

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
