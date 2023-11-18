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
			},
			mainInfo: {
				timeSection: {
					duration: {
						stop: (num: number) =>
							num === 0
								? 'Direct flight (no stops)'
								: ` (${num} ${pluralize('stop', num)})`,
					},
				},
				seats: {
					available: 'Available',
					cheapest: 'Cheapest',
				},
			},
		},
	},
}

export default flights
