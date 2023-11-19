const flights = {
	list: {
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
