import { SomeObject } from '@admixltd/admix-component-library'
import { AirportDetail } from '@api/Models/Airport/types'
import { Flight } from '@api/Models/Flight/types'
import { atom } from 'recoil'

const prefix = 'Dashboard'

export const FlightsAtom = atom<Flight[]>({
	key: `${prefix}flights`,
	default: [],
})

export const CheapestFlightAtom = atom<Flight>({
	key: `${prefix}cheapestFlight`,
	default: {} as Flight,
})

export const CheapestPriceAtom = atom<string>({
	key: `${prefix}cheapestPrice`,
	default: '',
})

export const AirlinesAtom = atom<SomeObject<{ en: string; ar: string }>>({
	key: `${prefix}airlines`,
	default: {},
})

export const FlightDetailsAtom = atom<AirportDetail>({
	key: `${prefix}flightDetails`,
	default: {} as AirportDetail,
})
