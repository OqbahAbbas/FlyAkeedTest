import { getRouter } from '@helpers/RouterNexus'

const convertToTimeFormat = (number: string) => {
	const locale = getRouter().locale ?? 'en'
	const padded = String(number).padStart(4, '0')
	const hours = padded.slice(0, 2)
	const minutes = padded.slice(2)
	const formattedTime = locale === 'en' ? `${hours}h ${minutes}m` : `${hours}س ${minutes}د`
	return formattedTime
}

export default convertToTimeFormat
