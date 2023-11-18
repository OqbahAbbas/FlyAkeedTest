import { Filter, SearchableColumns } from '@api/Types/FilteredRequest'
import { SomeObject } from '@admixltd/admix-component-library'

/**
 * Adjust filters to API format
 */
const searchFilters = <T = SomeObject>(search: string, searchableColumns: SearchableColumns<T>) =>
	searchableColumns.map(item => {
		let filter: Partial<Filter<T>> = {}
		let name: keyof T | undefined
		let value: string | number = search
		if (typeof item === 'string') {
			name = item
		} else if (typeof item === 'object') {
			filter = { ...item }
			value = item.type === 'number' ? parseFloat(search) : search
		}
		return {
			name,
			value,
			operator: 'like',
			...filter,
		} as Filter<T>
	})

export default searchFilters
