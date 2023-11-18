import request from '@api/Methods/Request'
import apiPrefixes from '@constants/apiPrefixes'
import { FlightsData } from './types'

export interface FlightSearch {
	from: string
	to: string
	city_search: string
	date: string
	ret_date: string
	currency: string
	adult: string
	child: string
	infant: string
	trip_type: string
	n: string
	'cabin[]': string
}

const searchFlights = async (data: FlightSearch) =>
	request<FlightSearch, FlightsData>(`${apiPrefixes.flight}`, {
		method: 'POST',
		authorization: false,
		data,
	})

export default {
	searchFlights,
}
