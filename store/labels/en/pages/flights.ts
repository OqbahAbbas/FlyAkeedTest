import pluralize from 'pluralize'

const flights = {
	list: {
		filters: {
			stop: 'Stop',
			airlines: 'Airlines',
			price: {
				label: 'Price',
				sar: 'SAR',
				usd: 'USD',
			},
			departureTime: {
				label: 'Departure Time',
				times: {
					midNight: '12:00 MN - 4:59 AM',
					morning: '05:00 AM - 11:59 AM',
					midDay: '12:00 NN - 4:59 PM',
					night: '05:00 PM - 11:59 PM',
				},
			},
			journyDuration: 'Journy Duration',
			flights: {
				label: 'Flights',
				Cheapest: 'Cheapest',
				available: 'Available',
			},
		},
		showNonDirect: 'Show Non-Direct Flights',
		HideNonDirect: 'Hide Non-Direct Flights',
		title: (num: number) => `Departure Flight (${num}) ${pluralize('Result', num)}`,
		card: {
			price: {
				select: 'Select',
				currency: {
					sar: 'SAR',
					usd: 'USD',
				},
				fetchError:
					'An error happened while fetching the flight details, please try again later',
				loading: 'Loading',
			},
			mainInfo: {
				timeSection: {
					duration: {
						stop: (num: number) =>
							num === 0 ? ' (Direct flight)' : ` (${num} ${pluralize('stop', num)})`,
					},
				},
				seats: {
					available: 'Available',
					cheapest: 'Cheapest',
				},
			},
			modal: {
				footer: {
					price: {
						roundTrip: 'Round Trip Price',
						vat: 'Includes VAT. Service Fees may apply',
					},
					select: 'Select Flight',
				},
				airLine: {
					class: {
						E: 'Economy',
						B: 'Business',
						F: 'First Class',
					},
				},
				layOver: 'Lay Over',
			},
		},
	},
}

export default flights
