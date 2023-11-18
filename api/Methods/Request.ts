import url from '@utils/basic/url'
import getQueryFromBody from '@utils/basic/getQueryFromBody'
import { getRouter } from 'helpers/RouterNexus'
import { SomeObject } from '@admixltd/admix-component-library'
import { UNHID_HOSTNAME } from '@constants/envs'
import { RequestOptions, RequestProps } from '@api/Types/Request'

const request = async <T = SomeObject, P = SomeObject>(
	path: string,
	requestProps?: RequestProps<T>
) => {
	const {
		method = 'GET',
		data,
		formattedResponse = true,
		returnBody = false,
		locale,
	} = requestProps ?? {}

	path = url(`${UNHID_HOSTNAME}${path}`)
	const requestUrl = new URL(path)

	const currentLocale = locale ?? getRouter()?.locale ?? 'en'

	const headers: HeadersInit = new Headers()
	headers.set('Accept', 'application/json')
	headers.set('Accept-Language', currentLocale)
	headers.set('Content-Type', 'application/x-www-form-urlencoded')

	const options: RequestOptions = {
		headers,
		method,
	}

	if (data) {
		if (['GET', 'HEAD'].includes(method)) {
			requestUrl.search = getQueryFromBody(data as never)
		} else {
			const formData: string[] = []
			Object.keys(data).forEach(key => {
				const encodedKey = encodeURIComponent(key)
				const encodedValue = encodeURIComponent(
					(data as SomeObject)[key] as string | number
				)
				formData.push(`${encodedKey}=${encodedValue}`)
			})
			const formBody = formData.join('&')
			options.body = formBody
		}
	}

	let responseData

	try {
		const response = await fetch(requestUrl.toString(), options)

		responseData = await response.json()

		let responseSuccess = response.ok

		if (formattedResponse && responseData.error) {
			responseSuccess = false
		}
		if (!responseSuccess) {
			const { error } = responseData

			return {
				error: error as number,
			}
		}

		if (formattedResponse && !returnBody) {
			const { data: receivedData } = responseData
			responseData = receivedData
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err)
		return { error: err }
	}

	return responseData as P
}

export default request
