import { ChecksType } from '@forms/utils/checks/types'
import pluralize from 'pluralize'

const maxLength: ChecksType['maxLength'] = (value, options = {}) => {
	const { value: max = Infinity } = options
	if (!value) return
	if (`${value ?? ''}`.length <= (max as number)) return

	const { message = `Should be ${max} maximum ${pluralize('character', Number(max))} long` } =
		options
	return typeof message === 'string' ? message : message(max)
}

export default maxLength