export interface QueryParams {
	pageIndex: number
	pageSize: number
	search?: string
	filter?: Record<string, string | string[]>
}

const queryParams = (params: QueryParams) => {
	let query = `?MaxResultCount=${params.pageSize}&SkipCount=${params.pageIndex * params.pageSize}`
	query = params.search ? `${query}&Keyword=${params.search}` : query
	const { filter } = params ?? {}
	if (!filter || !Object.keys(filter).length) return query
	const filterQueryArray = Object.keys(filter).map(key => {
		const item = filter[key]
		if (Array.isArray(item)) {
			const arrayItemQueries = item.map((elem: string) => `&${key}=${elem}`)
			return arrayItemQueries.join('')
		}
		return `&${key}=${item}`
	})
	const filterQuery = filterQueryArray.join('')
	return query + filterQuery
}

export default queryParams
