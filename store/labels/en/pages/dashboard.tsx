const dashboard = {
	bookingTypeToggleOptions: {
		flights: 'Flights',
		hotels: 'Hotels',
	},
	directionToggleButton: {
		oneWay: 'Oneway',
		roundTrip: 'Roundtrip',
		multiCity: 'Multi City',
	},
	airports: {
		from: 'From',
		to: 'To',
		placeHolder: 'City or Airport',
		fetchError: 'An error happened while fetching the airports, please try again later',
	},
	passengers: {
		adult: 'Adult',
		child: 'Child',
		infant: 'Infant',
		maxError: 'Maximum passengers reached',
	},
	flightClassToggleButton: {
		economy: 'Economy',
		business: 'Business',
		firstClass: 'First Class',
	},
	search: {
		label: 'Search Flight',
		invalidDates: 'You should select a return date',
		invalidAirports: 'You should select source and destination airports',
	},
	dates: {
		departure: 'Departure Date',
		return: 'Return Date',
		addReturnDate: 'Add Return Date',
	},
}

export default dashboard
