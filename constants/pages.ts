import url from '@utils/basic/url'

interface PageProtectProps {
	protected?: boolean
	protectedChildren?: boolean
}

export interface Page extends PageProtectProps {
	url: string
}

const pages = {
	dashboard: {
		...({
			url: url('/'),
		} as Page),
	},
	flights: {
		...({
			url: url('/flights'),
		} as Page),
	},
}

export default pages
