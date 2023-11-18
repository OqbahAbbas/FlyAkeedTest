import { AirportFilter } from '@api/Models/Airport/types'
import { DateObject } from 'react-multi-date-picker'
import { atom } from 'recoil'

const prefix = 'Dashboard'

export const PassengersAtom = atom<{
	adult: number
	child: number
	infant: number
}>({
	key: `${prefix}passengrs`,
	default: {
		adult: 1,
		child: 0,
		infant: 0,
	},
})

export const FlightClassAtom = atom<number>({
	key: `${prefix}flightClass`,
	default: 1,
})

export const BookingTypeAtom = atom<number>({
	key: `${prefix}bookingType`,
	default: 1,
})

export const DirectionAtom = atom<number>({
	key: `${prefix}direction`,
	default: 1,
})

export const DatesAtom = atom<DateObject[]>({
	key: `${prefix}dates`,
	default: [new DateObject(), new DateObject()],
})

export const SourceAirportAtom = atom<AirportFilter | null>({
	key: `${prefix}sourceAirport`,
	default: null,
})

export const DestinationAirportAtom = atom<AirportFilter | null>({
	key: `${prefix}destinationAirport`,
	default: null,
})
