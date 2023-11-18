const convertToTime = (number: string) => {
	const padded = String(number).padStart(4, '0')
	const formattedTime = `${padded.slice(0, 2)}:${padded.slice(2)}`
	return formattedTime
}

export default convertToTime
