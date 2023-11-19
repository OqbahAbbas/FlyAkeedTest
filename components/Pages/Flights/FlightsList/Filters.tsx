import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { AirlinesAtom, FlightsAtom } from '@atoms/Flight'
import LabelsAtom from '@atoms/Labels'
import {
	Checkbox,
	FormControlLabel,
	Slider,
	formControlLabelClasses,
	sliderClasses,
	typographyClasses,
} from '@mui/material'
import { useRouter } from 'next/router'
import formatCurrency from '@utils/basic/formatCurrency'
import { flexGap } from '@admixltd/admix-component-library'

const Filters = () => {
	const flights = useRecoilValue(FlightsAtom)
	const airLines = useRecoilValue(AirlinesAtom)
	const router = useRouter()
	const locale = router.locale ?? 'en'
	const {
		airlines,
		departureTime,
		flights: filterFlights,
		price,
		stop,
	} = useRecoilValue(LabelsAtom).pages.flights.list.filters
	const stopsValues = [...new Set(flights.map(flight => flight.stops))]
	const prices = flights.map(flight => Number(flight.price))
	const { query } = router
	const currency = query.currency ?? 'SAR'
	return (
		<Container>
			<div className="filterSection">
				<div>{stop}</div>
				{stopsValues.map(val => (
					<div key={val}>
						<FormControlLabel
							control={<Checkbox defaultChecked />}
							label={`${val} ${stop}`}
						/>
					</div>
				))}
			</div>
			<div className="filterSection">
				<div>{airlines}</div>
				{airLines &&
					Object.keys(airLines).map(airLine => {
						const airlineTranslate = airLines[airLine][locale as 'en' | 'ar']
						return (
							<div key={airlineTranslate}>
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label={airlineTranslate}
								/>
							</div>
						)
					})}
			</div>
			<div className="filterSection">
				<div>{price.label}</div>
				<div className="prices">
					<div className="val">
						{formatCurrency(Math.min(...prices).toString())}&nbsp;
						{price[(currency as string).toLowerCase() as keyof typeof price]}
					</div>
					<div className="val">
						{formatCurrency(Math.max(...prices).toString())}&nbsp;
						{price[(currency as string).toLowerCase() as keyof typeof price]}
					</div>
				</div>
				<SliderContainer locale={locale}>
					<Slider
						min={Math.min(...prices) ?? 0}
						max={Math.max(...prices) ?? 100}
						defaultValue={[Math.min(...prices) ?? 0, Math.max(...prices) ?? 100]}
						valueLabelDisplay="on"
					/>
				</SliderContainer>
			</div>
			<div className="filterSection">
				<div>{departureTime.label}</div>
				{airLines &&
					Object.keys(departureTime.times).map(time => (
						<div className="time" key={time}>
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label={
									departureTime.times[time as keyof typeof departureTime.times]
								}
							/>
						</div>
					))}
			</div>
			<div className="filterSection">
				<div>{filterFlights.label}</div>
				<FormControlLabel
					control={<Checkbox defaultChecked />}
					label={
						<div className="flightsLabel cheapest">
							<img src="/CheapSeat.png" alt="" width={50} height={34} />
							{filterFlights.Cheapest}
						</div>
					}
				/>
				<FormControlLabel
					control={<Checkbox defaultChecked />}
					label={
						<div className="flightsLabel available">
							<img src="/Seat.png" alt="" width={50} height={34} />
							{filterFlights.available}
						</div>
					}
				/>
			</div>
		</Container>
	)
}

const Container = styled.div`
	justify-content: start;
	padding-right: 30px;

	.filterSection {
		display: grid;
		grid-auto-flow: row;
		color: ${({ theme }) => theme.colors.primary};
		font-size: 15px;
		padding-bottom: 16px;
		margin-bottom: 16px;
		border-bottom: 1px solid ${({ theme }) => theme.colors.primary} !important;

		.${formControlLabelClasses.root} .${typographyClasses.root} {
			color: #4d4d4e;
			font-size: 15px !important;
		}

		.prices {
			display: grid;
			grid-auto-flow: column;
			justify-content: space-between;
			margin-bottom: 36px;

			.val {
				color: #4d4d4e;
			}
		}

		.time {
			font-size: 15px;
		}

		.flightsLabel {
			display: grid;
			grid-auto-flow: column;
			justify-content: start;
			align-items: center;
			gap: 16px;

			&.cheapest {
				font-size: 15px;
				color: #5915a0;
			}

			&.available {
				font-size: 15px;
				color: #1f9ea5;
			}
		}
	}
`

const SliderContainer = styled.div<{ locale?: string }>`
	align-items: center;
	justify-content: center;
	text-align: center;

	margin-left: ${({ locale }) => (locale === 'ar' ? '0' : 'none')} !important;
	${({ theme }) => flexGap(theme.slider.labelGap)}

	.${sliderClasses.root} {
		width: 90%;
	}

	.${sliderClasses.thumb} {
		margin-right: -10px;
	}
`

export default Filters
