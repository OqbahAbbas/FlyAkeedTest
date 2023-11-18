import { ChecksType } from '@forms/utils/checks/types'
import pluralize from 'pluralize'

const arrayMax: ChecksType['arrayMax'] = (value, options = {}) => {
	const { value: maxValue = Infinity } = options
	if (!value) return
	if (!Array.isArray(value)) return
	if (value.length <= Number(maxValue)) return
	const needed = Number(maxValue) - value.length

	const { message = `Please remove ${needed} ${pluralize('value', Number(needed))}` } = options
	return typeof message === 'string' ? message : message(needed)
}
export default arrayMax
