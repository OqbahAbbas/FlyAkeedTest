const convertToDate = (number: string) => {
	const padded = String(number).padStart(6, '0')
	const formattedTime = `${padded.slice(0, 2)}/${padded.slice(2, 4)}/${padded.slice(4)}`
	return formattedTime
}

export default convertToDate
