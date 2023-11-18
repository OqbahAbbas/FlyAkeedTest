const formatCurrency = (number: string) =>
	Number(number)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,')

export default formatCurrency
