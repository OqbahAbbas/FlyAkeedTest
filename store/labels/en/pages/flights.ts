import pluralize from 'pluralize'

const flights = {
	list: {
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
