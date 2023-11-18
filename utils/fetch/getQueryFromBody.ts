import { SomeObject } from '@admixltd/admix-component-library'

function getQueryFromBody(data: SomeObject) {
	let searchQuery = '?'
	Object.keys(data).forEach(property => {
		if (typeof data[property] === 'undefined') return
		searchQuery += `${property}=${data[property]}&`
	})
	return searchQuery.substring(0, searchQuery.length - 1)
}

export default getQueryFromBody
