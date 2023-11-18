/* eslint-disable @typescript-eslint/no-empty-interface */
import { ITheme } from 'styles/theme'

declare module '@emotion/react' {
	export interface Theme extends ITheme {}
}
