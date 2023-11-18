import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { MutableSnapshot } from 'recoil'
import { AppProps } from 'next/app'
import { SomeObject } from '@admixltd/admix-component-library'

export type NextPageWithProps<P = SomeObject, IP = P> = NextPage<P, IP> & {
	/**
	 * Layout type
	 */
	getLayout?: (page: ReactElement) => ReactNode
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	recoilSetter?: (mutableSnapshot: MutableSnapshot, pageProps?: any) => void
}
export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithProps
}
