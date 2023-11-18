import { SomeObject } from '@admixltd/admix-component-library'

export interface Segment {
	depDate: string
	depTime: string
	arrDate: string
	arrTime: string
	from: string
	fromTerminal: string
	to: string
	toTerminal: number
	marketCode: string
	operatingCode: string
	flightNumber: string
	equipment: string
	inFlightSrv: number[]
	layOver: string
	duration: string
	isCodeShare: number
}

export interface Flight {
	fromName: string
	fromAddress: string
	fromState: string
	fromCountry: string
	toName: string
	toAddress: string
	toState: string
	toCountry: string
	flightType: string
	flightID: string
	depDate: string
	depTime: string
	arrDate: string
	arrTime: string
	from: string
	fromTerminal: string
	to: string
	toTerminal: number
	marketCode: string
	operatingCode: string
	flightNumber: string
	equipment: string
	cabin: string
	price: string
	currency: string
	duration: string
	stops: string
	isAvailable: number
	userPromoCodes: number
	isCodeShare: number
	segments: Segment[]
}

export interface FlightsData {
	airlines: SomeObject<{ en: string; ar: string }>
	cabins: string[]
	cheapest_flight: Flight
	cheapest_price: string
	flights: {
		error: string
		render: Flight[]
	}
}

export const FlightClass = new Map([
	[1, 'E'],
	[2, 'B'],
	[3, 'F'],
])
