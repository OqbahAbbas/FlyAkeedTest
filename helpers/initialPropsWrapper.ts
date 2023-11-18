import { NextPageContext } from 'next'
import { NextPageWithProps } from '@interfaces/NextPage'
import { resetRecoil, setRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import { MutableSnapshot } from 'recoil'

interface RedirectResult {
	redirect: string
}

/**
 * Wrapper for initial props that allow to run
 * recoilSetter and getInitialProps in correct order
 */
const initialPropsWrapper = async <T>(
	getInitialProps: (context: NextPageContext) => T | RedirectResult | Promise<T | RedirectResult>,
	Page: NextPageWithProps<T>,
	context: NextPageContext
) => {
	const pageProps = await getInitialProps(context)
	if (pageProps && typeof pageProps === 'object' && 'redirect' in pageProps) {
		if (context.res) {
			context.res.writeHead(301, {
				Location: pageProps.redirect,
			})
			context.res.end()
		}
		return {} as T
	}
	if (typeof window === 'undefined') return pageProps

	/**
	 * Cache response
	 */
	if (context.res)
		context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

	const { recoilSetter } = Page
	if (recoilSetter)
		recoilSetter({ set: setRecoil, reset: resetRecoil } as MutableSnapshot, pageProps)

	return pageProps
}

export default initialPropsWrapper
