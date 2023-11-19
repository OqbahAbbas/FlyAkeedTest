const flights = {
	list: {
		filters: {
			stop: 'توقف',
			airlines: 'خطوط الطيران',
			price: {
				label: 'السعر',
				sar: 'ريال',
				usd: 'دولار',
			},
			departureTime: {
				label: 'وقت المغادرة',
				times: {
					midNight: '12.00 ليلاً - 4.59 فجراً',
					morning: '5.00 فجراً - 11.59 ظهراً',
					midDay: '12.00 ظهراً - 4.59 عصراً',
					night: '05.00 عصراً - 11.59 ليلاً',
				},
			},
			journyDuration: 'مدة الرحلة',
			flights: {
				label: 'الرحلات',
				Cheapest: 'الأقل سعراً',
				available: 'اختر',
			},
		},
		showNonDirect: 'إظهار الرحلات غير المباشرة',
		HideNonDirect: 'إخفاء الرحلات غير المباشرة',
		title: (num: number) => `رحلة الذهاب (${num}) النتاائج`,
		card: {
			price: {
				select: 'اختيار',
				currency: {
					sar: 'ريال',
					usd: 'دولار',
				},
				fetchError: 'حصل خطأ أثناء محاولة جلب تفاصيل الرحلة، يرجى المحاولة لاحقاً',
				loading: 'الرجاء الانتظار...',
			},
			mainInfo: {
				timeSection: {
					duration: {
						stop: (num: number) => (num === 0 ? ' (رحلة مباشرة)' : ` (${num} توقف)`),
					},
				},
				seats: {
					available: 'متوفر',
					cheapest: 'الأقل سعراُ',
				},
			},
			modal: {
				footer: {
					price: {
						roundTrip: 'سعر التذاكر للذهاب والعودة',
						vat: 'شاملة الضريبة دون رسوم الخدمة',
					},
					select: 'اختر الرحلة',
				},
				airLine: {
					class: {
						E: 'السياحية',
						B: 'الأعمال',
						F: 'الأولى',
					},
				},
				layOver: 'توقف',
			},
		},
	},
}

export default flights
