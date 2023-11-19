import styled from '@emotion/styled'
import { Button, Dialog, DialogProps, paperClasses } from '@mui/material'
import { ReactComponent as ModalCloseIcon } from '@svg/pages/flights/close.svg'
import { ReactComponent as FlightCompany } from '@svg/pages/flights/flightCompany.svg'
import { ReactComponent as ArrowRight } from '@svg/pages/flights/arrowRight.svg'
import { ReactComponent as ArrowLeft } from '@svg/pages/flights/arrowLeft.svg'
import { Flight } from '@api/Models/Flight/types'
import { useEffect, useState } from 'react'
import { AirlinesAtom, CheapestPriceAtom, FlightDetailsAtom } from '@atoms/Flight'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import formatCurrency from '@utils/basic/formatCurrency'
import { useRouter } from 'next/router'
import convertToTime from '@utils/basic/convertToTime'
import { DateObject } from 'react-multi-date-picker'
import convertToDate from '@utils/basic/convertToDate'
import convertToTimeFormat from '@utils/basic/convertToTimeFormat'

export interface ModalProps extends DialogProps {
	flight: Flight
}

const Modal = (props: ModalProps) => {
	const { onClose, flight, ...other } = props
	const { segments } = flight
	const router = useRouter()
	const { query } = router
	const locale = router.locale ?? 'en'
	const { currency } = query ?? 'SAR'
	const { card } = useRecoilValue(LabelsAtom).pages.flights.list
	const cheapestPrice = useRecoilValue(CheapestPriceAtom)
	const [cheapest, setCheapest] = useState(false)
	const airportsDetails = useRecoilValue(FlightDetailsAtom)
	const airLines = useRecoilValue(AirlinesAtom)

	useEffect(() => {
		setCheapest(Number(flight.price) === Number(cheapestPrice))
	}, [cheapestPrice, flight])

	const handleClose = () => onClose?.({}, 'escapeKeyDown')

	return (
		<StyledDialog {...other}>
			<IconContainer>
				<ModalCloseIcon onClick={handleClose} />
			</IconContainer>
			<div className="body">
				<div className="segments">
					<div className="wrapper">
						{segments.map(seg => {
							const sourceAirport = airportsDetails[seg.from]
							const sourceTranslation =
								locale === 'en' ? sourceAirport.en : sourceAirport.ar
							const depDate = new DateObject(convertToDate(seg.depDate))

							const destinationAirport = airportsDetails[seg.to]
							const destinationTranslation =
								locale === 'en' ? destinationAirport?.en : destinationAirport?.ar
							const arrDate = new DateObject(convertToDate(seg.depDate))
							const airLine = airLines[seg.operatingCode]
							const airLineTranslation = locale === 'en' ? airLine?.en : airLine?.ar
							return (
								<SegmentContainer key={flight.flightID}>
									<div className="SegmentInfo">
										<div className="segmentSection">
											<div className="airportCode">{seg.from}</div>
											<div className="depTime">
												{convertToTime(seg.depTime)}
											</div>
											<div className="extraData">
												{depDate.day} {depDate.month.name}
											</div>
											<div className="extraData">
												{sourceTranslation.name}
											</div>
											<div className="extraData">
												{sourceTranslation.address},{' '}
												{sourceTranslation.country}
											</div>
										</div>
										<div className="segmentSection">
											<div className="company">
												<FlightCompany />
											</div>
											<div className="extraData">{airLineTranslation}</div>
											<div className="extraData">
												{flight.marketCode}
												{flight.flightNumber}
											</div>
											<div className="extraData">
												{card.modal.airLine.class[
													flight.cabin as keyof typeof card.modal.airLine.class
												] ?? '-'}
											</div>
											<div className="arrowDirection">
												{locale === 'en' && <ArrowRight />}
												{locale === 'ar' && <ArrowLeft />}
											</div>
											<div className="extraData">
												{convertToTimeFormat(seg.duration)}
											</div>
										</div>
										<div className="segmentSection">
											<div className="airportCode">{seg.to}</div>
											<div className="depTime">
												{convertToTime(seg.arrTime)}
											</div>
											<div className="extraData">
												{arrDate.day} {arrDate.month.name}
											</div>
											<div className="extraData">
												{destinationTranslation.name}
											</div>
											<div className="extraData">
												{destinationTranslation.address},{' '}
												{destinationTranslation.country}
											</div>
										</div>
									</div>
									<div className={seg.layOver ? 'layOver' : 'lastSegment '}>
										{seg.layOver && (
											<>
												{convertToTimeFormat(seg.layOver)} &nbsp;
												{card.modal.layOver}
											</>
										)}
									</div>
								</SegmentContainer>
							)
						})}
					</div>
				</div>
				<Footer>
					<div className="info">
						<div className="seats">
							{cheapest && <img src="/CheapSeat.png" alt="" width={50} height={34} />}
							{!cheapest && <img src="/Seat.png" alt="" width={50} height={34} />}
							<div className={cheapest ? 'cheapestText' : 'availableText'}>
								{cheapest
									? card.mainInfo.seats.cheapest
									: card.mainInfo.seats.available}
							</div>
						</div>
						<Price>
							<div className="price">
								<div>
									<span className={cheapest ? 'val cheapest' : 'val'}>
										{formatCurrency(flight.price)}
									</span>
									&nbsp;
									<span className={cheapest ? 'currency cheapest' : 'currency'}>
										{
											card.price.currency[
												(
													currency as string
												).toLowerCase() as keyof typeof card.price.currency
											]
										}
									</span>
								</div>
								<div className="priceInfo">{card.modal.footer.price.roundTrip}</div>
								<div className="priceInfo">{card.modal.footer.price.vat}</div>
							</div>
						</Price>
					</div>
					<Button variant="contained" color="primary">
						{card.modal.footer.select}
					</Button>
				</Footer>
			</div>
		</StyledDialog>
	)
}

const SegmentContainer = styled.div`
	display: grid;
	grid-auto-flow: row;
	gap: 36px;

	.SegmentInfo {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 24px;
	}

	.segmentSection {
		display: grid;
		grid-auto-flow: row;
		text-align: center;
		justify-content: center;
		align-items: center;

		.airportCode {
			font-size: 24px;
			font-weight: 400;
			color: ${({ theme }) => theme.colors.secondary};
		}

		.depTime {
			font-size: 16px;
			color: ${({ theme }) => theme.colors.primary};
		}

		.extraData {
			font-size: 12px;
			color: #4d4e4e;
		}

		.company {
			display: grid;
			align-items: center;
			justify-content: center;

			svg {
				width: 50px !important;
				height: 50px !important;
			}
		}

		.arrowDirection {
			display: grid;
			justify-content: center;
			svg {
				width: 16px;
				height: 16px;

				stroke: #b8b8b8 !important;
				fill: #b8b8b8 !important;
				stroke-width: 2px;
			}
		}
	}

	.layOver {
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 30px;
		padding: 8px;
		width: 100%;
		background: #edf4ff;
	}

	.lastSegment {
		min-height: 30px;
		padding: 8px;
		width: 100%;
		background: #a6caff;
		margin-bottom: 48px;
	}
`

const StyledDialog = styled(Dialog)`
	.${paperClasses.root} {
		border-radius: 12px;
		width: 90%;
		max-width: 800px;
	}

	.body {
		height: 400px;
		display: grid;
		grid-template-rows: 1fr auto;

		.segments {
			padding: 24px 28px 0;
			overflow-y: auto;
			height: 100%;
		}

		.wrapper {
			display: grid;
			grid-auto-flow: row;
			gap: 36px;
		}
	}
`

const IconContainer = styled.div`
	position: absolute;
	top: 10px;
	right: 28px;
	svg {
		width: 20px;
		height: 20px;
		cursor: pointer;
		[fill]:not([fill='none']) {
			fill: ${({ theme }) => theme.colors.gray500};
		}
		[stroke] {
			stroke: ${({ theme }) => theme.colors.gray500};
		}
	}
`

const Footer = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 70% 30%;
	justify-content: space-between;
	align-items: center;
	padding: 10px 24px 28px;

	${({ theme }) => theme.adaptive.md} {
		grid-auto-flow: row;
		grid-template-columns: 1fr;
		gap: 24px;
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

	.info {
		display: grid;
		grid-auto-flow: column;
		gap: 32px;
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

	.price {
		display: grid;
		grid-auto-flow: row;
		align-items: center;
		justify-content: center;

		.val,
		.currency {
			color: #1f9ea5;
			font-size: 26px;
			font-weight: 400;

			&.cheapest {
				color: #5915a0 !important;
			}
		}

		.priceInfo {
			font-size: 12px;
			color: #333;
		}
	}
`

export default Modal
