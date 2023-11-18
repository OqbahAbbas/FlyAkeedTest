const flights = {
	list: {
		card: {
			price: {
				select: 'اختيار',
				currency: {
					sar: 'ريال',
					usd: 'دولار',
				},
			},
			mainInfo: {
				timeSection: {
					duration: {
						stop: (num: number) =>
							num === 0 ? 'رحلة مباشرة (بدون توقف)' : ` (${num} توقف)`,
					},
				},
				seats: {
					available: 'متوفر',
					cheapest: 'الأقل سعراُ',
				},
			},
		},
	},
}

export default flights
