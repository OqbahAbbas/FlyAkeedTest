const getMediaQuery = (query: string, defaultResponse = false) => {
	if (!query) return defaultResponse
	if (typeof window === 'undefined') return defaultResponse
	return window.matchMedia(query.replace(/^@media( ?)/m, '')).matches
}

export default getMediaQuery
