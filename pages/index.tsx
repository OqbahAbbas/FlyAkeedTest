import Meta from '@components/Layouts/Meta'
import BaseContainer from '@components/Layouts/Main/Container'
import styled from '@emotion/styled'
import MainLayout from '@components/Layouts/Main'
import initialPropsWrapper from '@helpers/initialPropsWrapper'
import { NextPageWithProps } from '@interfaces/NextPage'
import { useRouter } from 'next/router'
import BookingTypeToggleButton from '@components/Pages/Dashboard/BookingTypeToggleButton'
import DirectionToggleButton from '@components/Pages/Dashboard/DirectionToggleButton'
import Airports from '@components/Pages/Dashboard/Airports'
import Passengers from '@components/Passengers'
import FlightClassToggleButton from '@components/Pages/Dashboard/FlightClassToggleButton'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Button } from '@mui/material'
import FlightDates from '@components/Pages/Dashboard/FlightDates'
import pages from '@constants/pages'
import {
	DatesAtom,
	DestinationAirportAtom,
	FlightClassAtom,
	PassengersAtom,
	SourceAirportAtom,
} from '@atoms/Dashboard'
import { FlightClass } from '@api/Models/Flight/types'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { getCookie } from 'cookies-next'
import { CurrencyCookieName } from '@atoms/Header'

const Page: NextPageWithProps = () => {
	const router = useRouter()
	const { label, invalidAirports, invalidDates } =
		useRecoilValue(LabelsAtom).pages.dashboard.search
	const locale = router.locale ?? 'en'

	const sourceAirport = useRecoilValue(SourceAirportAtom)
	const destinationAirport = useRecoilValue(DestinationAirportAtom)
	const dates = useRecoilValue(DatesAtom)
	const passengers = useRecoilValue(PassengersAtom)
	const flightClass = useRecoilValue(FlightClassAtom)
	const currency = (getCookie(CurrencyCookieName) ?? 'SAR') as string

	const onSearch = () => {
		if (!sourceAirport || !destinationAirport) {
			Snackbar.error(invalidAirports)
			return
		}
		if (dates.length < 2) {
			Snackbar.error(invalidDates)
			return
		}
		router.push(
			`${pages.flights.url}?from=${sourceAirport?.code}&to=${
				destinationAirport?.code
			}&city_search=0&date=${dates[0].format('YYYY-MM-DD')}&ret_date=${dates[1].format(
				'YYYY-MM-DD'
			)}&currency=${currency.toUpperCase()}&adult=${passengers.adult}&child=${
				passengers.child
			}&infant=${passengers.infant}&trip_type=R&n=true&cabin[]=${FlightClass.get(
				flightClass
			)}`
		)
	}
	return (
		<>
			<Meta />
			<Container locale={locale}>
				<BookingTypeToggleButton />
				<DirectionToggleButton />
				<Airports />
				<FlightDates />
				<Passengers />
				<FlightClassToggleButton />
				<StyledButton variant="contained" color="primary" onClick={onSearch}>
					{label}
				</StyledButton>
			</Container>
		</>
	)
}

const Container = styled(BaseContainer)<{ locale: string }>`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 32px 100px;
	background-image: ${({ locale }) =>
		locale === 'en' ? "url('/BGEn.jpg')" : "url('/BGAr.jpg')"};
	background-size: cover;
	background-color: #e8efff;
	min-height: 100vh;
`

const StyledButton = styled(Button)`
	width: 50%;
	max-width: 430px;
	text-transform: none !important;
	height: 60px !important;

	${({ theme }) => theme.adaptive.md} {
		width: 100%;
	}
`

Page.getInitialProps = context =>
	initialPropsWrapper(
		async () => ({
			props: {},
		}),
		Page,
		context
	)

Page.getLayout = page => <MainLayout>{page}</MainLayout>

export default Page
