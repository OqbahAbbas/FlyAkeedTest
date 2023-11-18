import styled from '@emotion/styled'
import { Flight } from '@api/Models/Flight/types'
import { useRouter } from 'next/router'
import formatCurrency from '@utils/basic/formatCurrency'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { ReactComponent as AddIcon } from '@svg/pages/flights/add.svg'
import { ReactComponent as FlightCompany } from '@svg/pages/flights/flightCompany.svg'
import { ReactComponent as ArrowRight } from '@svg/pages/flights/arrowRight.svg'
import { ReactComponent as ArrowLeft } from '@svg/pages/flights/arrowLeft.svg'
import { Button, buttonBaseClasses } from '@mui/material'
import convertToTime from '@utils/basic/convertToTime'
import convertToTimeFormat from '@utils/basic/convertToTimeFormat'
import { CheapestPriceAtom } from '@atoms/Flight'
import { useEffect, useState } from 'react'

const FlightCard = ({ flight }: { flight: Flight }) => {
	const { card } = useRecoilValue(LabelsAtom).pages.flights.list
	const router = useRouter()
	const { query } = router
	const locale = useRouter().locale ?? 'en'
	const { currency } = query ?? 'SAR'
	const cheapestPrice = useRecoilValue(CheapestPriceAtom)
	const [cheapest, setCheapest] = useState(false)

	useEffect(() => {
		setCheapest(Number(flight.price) === Number(cheapestPrice))
	}, [cheapestPrice, flight])

	return (
		<Container>
			<MainInfo>
				<div className="company">
					<FlightCompany />
					<div className="flightNumber">
						{flight.marketCode}
						{flight.flightNumber}
					</div>
				</div>
				<div className="timeSection">
					<div className="schedule">
						{convertToTime(flight.depTime)}
						{locale === 'en' && <ArrowRight />}
						{locale === 'ar' && <ArrowLeft />}
						{convertToTime(flight.arrTime)}
					</div>
					<div className="duration">
						{convertToTimeFormat(flight.duration)}
						{card.mainInfo.timeSection.duration.stop(Number(flight.stops))}
					</div>
					<div className="flightNumber">
						{flight.marketCode}
						{flight.flightNumber}
					</div>
				</div>
				<div className="seats">
					{cheapest && <img src="/CheapSeat.png" alt="" width={50} height={34} />}
					{!cheapest && <img src="/Seat.png" alt="" width={50} height={34} />}
					<div className={cheapest ? 'cheapestText' : 'availableText'}>
						{cheapest ? card.mainInfo.seats.cheapest : card.mainInfo.seats.available}
					</div>
				</div>
			</MainInfo>
			<Price>
				<div className="price">
					<span className="val">{formatCurrency(flight.price)}</span>
					&nbsp;
					<span className="currency">
						{
							card.price.currency[
								(
									currency as string
								).toLowerCase() as keyof typeof card.price.currency
							]
						}
					</span>
				</div>
				<Button variant="contained" color="primary">
					{card.price.select}
				</Button>
				<AddIcon className="top" />
				<AddIcon className="bottom" />
			</Price>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 75% 25%;
	width: 100%;
	background: ${({ theme }) => theme.colors.white};
	border-radius: 3px;
	margin-bottom: 20px;
	padding: 20px 0;
`

const MainInfo = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 25% 50% 25%;
	gap: 12px;
	padding: 10px 20px;

	.company {
		display: grid;
		grid-auto-flow: row;
		gap: 4px;
		align-items: center;
		justify-content: center;

		svg {
			width: 50px !important;
			height: 50px !important;
		}

		.flightNumber {
			font-size: 14px;
		}
	}

	.timeSection {
		display: grid;
		grid-auto-flow: row;
		align-items: center;
		justify-content: start;

		.schedule {
			display: grid;
			grid-auto-flow: column;
			align-items: center;
			gap: 16px;
			font-size: 24px;
			color: #114aaf;
			font-weight: 400;

			svg {
				width: 16px;
				height: 16px;

				stroke: #b8b8b8 !important;
				fill: #b8b8b8 !important;
				stroke-width: 2px;
			}
		}

		.duration {
			color: #b3b3b3;
			font-size: 14px;
		}

		.flightNumber {
			color: #b3b3b3;
			font-size: 14px;
		}
	}

	.seats {
		display: grid;
		grid-auto-flow: row;
		justify-content: center;
		align-items: center;

		.cheapestSeat .MuiBadge-badge {
			background: #5915a0;
		}

		.normalSeat .MuiBadge-badge {
			background: #1f9ea5;
		}

		.cheapestText {
			font-size: 15px;
			color: #5915a0;
		}

		.availableText {
			font-size: 15px;
			color: #1f9ea5;
		}
	}
`

const Price = styled.div`
	position: relative;
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: 1fr;
	justify-content: center;
	align-items: center;
	padding: 10px 20px 0;
	border-left: 1px dashed #c1c1c1;

	.price {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		justify-content: center;

		.val {
			color: ${({ theme }) => theme.colors.primary};
			font-size: 26px;
			font-weight: 400;
		}

		.currency {
			color: ${({ theme }) => theme.colors.primary};
			font-size: 14px;
		}
	}

	.${buttonBaseClasses.root} {
		width: 100% !important;
	}

	svg {
		position: absolute;
		width: 16px;
		height: 16px;
		left: -8px;

		&:first-of-type {
			top: -28px;
		}

		&:last-of-type {
			bottom: -28px;
		}

		[stroke] {
			stroke: #e8efff !important;
		}
		[fill] {
			fill: #e8efff !important;
		}
	}
`

export default FlightCard
