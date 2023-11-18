import { ChecksType } from '@forms/utils/checks/types'

const noZeroFirst: ChecksType['noZeroFirst'] = (value, options = {}) => {
	if (!value) return
	const { message = `Shouldn't start with zero` } = options
	const error = typeof message === 'string' ? message : message()
	if (Array.isArray(value) && value[0] === '0') return error
}

export default noZeroFirst
