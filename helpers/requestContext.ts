import { GetInitialPropsContextWithSession } from '@api/Types/Request'

export type RequestContextType = GetInitialPropsContextWithSession

let requestContext: Partial<RequestContextType> = {}

const get = () => requestContext

const set = (newContext: Partial<RequestContextType>) => {
	requestContext = { ...requestContext, ...newContext }
}

export default {
	get,
	set,
}
