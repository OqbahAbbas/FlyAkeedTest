import request from '@api/Methods/Request'
import apiPrefixes from '@constants/apiPrefixes'
import { AirportDetail, AirportFilter } from './types'

export interface AirportSearch {
	keyword: string
	offset: number
}

const searchAirports = async (data: AirportSearch) =>
	request<AirportSearch, AirportFilter[]>(`${apiPrefixes.airport}/search`, {
		method: 'POST',
		authorization: false,
		data,
	})

const airportDetails = async (data: { airline_code: string }) =>
	request<{ airline_code: string }, AirportDetail>(`${apiPrefixes.airport}/details`, {
		method: 'POST',
		authorization: false,
		data,
	})

export default {
	searchAirports,
	airportDetails,
}
