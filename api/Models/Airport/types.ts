export interface Details {
	address: string
	country: string
	name: string
}

export interface AirportDetail {
	[key: string]: {
		en: Details
		ar: Details
		lat: number
		lan: number
		is_arabic: number
	}
}

export interface AirportFilter {
	ar: Details
	en: Details
	city_code: string
	code: string
	is_arabic: number
	is_sub: string
	percent: number
	type: string
}

export type Airport = AirportFilter
