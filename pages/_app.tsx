import { CssBaseline } from '@mui/material'
import { RecoilRoot } from 'recoil'
import NProgress from 'nprogress'
import Router from 'next/router'
import { CacheProvider, Global } from '@emotion/react'
import { SnackbarProvider } from 'notistack'
import theme from 'styles/theme'
import GlobalStyles from 'styles/global'
import { WithRouterProps } from 'next/dist/client/with-router'
import labels, { Labels } from '@labels'
import LabelsAtom from '@atoms/Labels'
import Meta from '@components/Layouts/Meta'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { RecoilNexus } from '@admixltd/admix-component-library/RecoilNexus'
import { SnackbarUtilsConfigurator as SnackbarNexus } from '@admixltd/admix-component-library/Snackbar'
import { AdmixThemeProvider, ignoreRecoilErrors } from '@admixltd/admix-component-library'
import { AppPropsWithLayout } from '@interfaces/NextPage'
import ModalProvider from 'mui-modal-provider'
import HooksNexus from '@helpers/HooksNexus'
import RouterNexus from '@helpers/RouterNexus'

/**
 * Fix for annoying recoil messages
 * because of hot module replacement on development mode
 */

ignoreRecoilErrors()

/**
 * Show line on top of the page on loading
 * between screens
 */
let timeout: ReturnType<typeof setTimeout>
NProgress.configure({ showSpinner: false })
Router.events.on(`routeChangeStart`, () => {
	clearTimeout(timeout)
	timeout = setTimeout(() => {
		NProgress.start()
	}, 300)
})
Router.events.on(`routeChangeComplete`, () => {
	clearTimeout(timeout)
	NProgress.done()
})
Router.events.on(`routeChangeError`, () => {
	clearTimeout(timeout)
	NProgress.done()
})

export default function MyApp({
	Component,
	pageProps,
	router,
}: AppPropsWithLayout & WithRouterProps) {
	const currentLocale = (router.locale ?? 'en') as keyof Labels

	const getLayout = Component.getLayout ?? (page => page)
	const { recoilSetter } = Component
	const cacheRtl = createCache({
		key: 'muirtl',
		stylisPlugins: currentLocale === 'ar' ? [prefixer, rtlPlugin] : [prefixer],
	})

	return (
		<CacheProvider value={cacheRtl}>
			<AdmixThemeProvider theme={theme}>
				<CssBaseline />
				<Global styles={GlobalStyles({ theme, locale: currentLocale })} />
				<RecoilRoot
					initializeState={mutableSnapshot => {
						const { set } = mutableSnapshot
						if (recoilSetter) recoilSetter(mutableSnapshot, pageProps)
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						set(LabelsAtom, labels[currentLocale] as any)
					}}
				>
					<ModalProvider>
						<SnackbarProvider
							maxSnack={10}
							hideIconVariant
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
						>
							<Meta />
							<SnackbarNexus />
							<RecoilNexus />
							<RouterNexus />
							<HooksNexus />
							{getLayout(<Component {...pageProps} key={router.route} />)}
						</SnackbarProvider>
					</ModalProvider>
				</RecoilRoot>
			</AdmixThemeProvider>
		</CacheProvider>
	)
}
