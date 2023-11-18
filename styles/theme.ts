import { AdmixLibraryTheme } from '@admixltd/admix-component-library'
import '@emotion/react'

/**
 * Red
 */

const red500 = `#B01010`
const red400 = '#CF595F'
const tomatoRed = '#FB6F43'
const salmonRed = '#FC7B7B'
const glamPink = '#FC4DE4'

/**
 * White
 */
const white = `#ffffff`

/**
 * Black
 */
const black = `#151617`
const black50 = `#262628`
const black850 = '#1e1e1c'
const vulkan = '#363738'

/**
 * Blue
 */
const blue400 = '#6CAAF8'

/**
 * Gray
 */
const gray50 = '#F6F7FA'
const gray100 = '#EAEDF5'
const gray150 = `#F4F6F9`
const gray200 = `#f7f8f9`
const gray500 = '#999999'
const gray600 = '#666666'
const gray650 = '#5E6064'
const gray700 = '#4D4D4D'
const gray750 = '#343433'
const gray800 = '#333333'
const gray900 = '#000000'

/**
 * Green
 */

const green = '#1CCA7D'

/**
 * Purple
 */

const purple = '#BD4DFC'

const orange = '#FC9A7B'

/**
 * Blue
 */

const blue500 = '#644DFC'

/**
 * Main Colors
 */

const primary = '#196dfb'
const secondary = '#1a1f71'
const navy = '#13314E'

const breakpointValues = {
	xs: 375,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
}

const maxWidthXxs = `(max-width: ${breakpointValues.xs - 1}px)`
const maxWidthXs = `(max-width: ${breakpointValues.sm - 1}px)`
const maxWidthSm = `(max-width: ${breakpointValues.md - 1}px)`
const maxWidthMd = `(max-width: ${breakpointValues.lg - 1}px)`
const maxWidthLg = `(max-width: ${breakpointValues.xl - 1}px)`
const maxWidthXl = `(max-width: ${breakpointValues.xxl - 1}px)`

const minWidthXs = `(min-width: ${breakpointValues.xs}px)`
const minWidthSm = `(min-width: ${breakpointValues.sm}px)`
const minWidthMd = `(min-width: ${breakpointValues.md}px)`
const minWidthLg = `(min-width: ${breakpointValues.lg}px)`
const minWidthXl = `(min-width: ${breakpointValues.xl}px)`
const minWidthXXl = `(min-width: ${breakpointValues.xxl}px)`

/**
 * Project level styles
 */

const projectTheme = {
	...AdmixLibraryTheme,
	adaptive: {
		...AdmixLibraryTheme.adaptive,
		breakpointValues: {
			...AdmixLibraryTheme.adaptive.breakpointValues,
			...breakpointValues,
		},
		mobileFirst: {
			xs: `@media ${minWidthXs}`,
			sm: `@media ${minWidthSm}`,
			md: `@media ${minWidthMd}`,
			lg: `@media ${minWidthLg}`,
			xl: `@media ${minWidthXl}`,
			xxl: `@media ${minWidthXXl}`,
		},
		/**
		 * Desktop first
		 */
		xxs: `@media ${maxWidthXxs}`,
		xs: `@media ${maxWidthXs}`,
		sm: `@media ${maxWidthSm}`,
		md: `@media ${maxWidthMd}`,
		lg: `@media ${maxWidthLg}`,
		xl: `@media ${maxWidthXl}`,
		xxl: `@media ${minWidthXXl}`,
		/**
		 * Specific range
		 */
		xxsOnly: `@media ${maxWidthXxs}`,
		xsOnly: `@media ${minWidthXs} and ${maxWidthXs}`,
		smOnly: `@media ${minWidthSm} and ${maxWidthSm}`,
		mdOnly: `@media ${minWidthMd} and ${maxWidthMd}`,
		lgOnly: `@media ${minWidthLg} and ${maxWidthLg}`,
		xlOnly: `@media ${minWidthXl} and ${maxWidthXl}`,
		xxlOnly: `@media ${minWidthXXl}`,
		container: {
			xxs: '100%',
			xs: '100%',
			sm: '540px',
			md: '720px',
			lg: '960px',
			xl: '1140px',
			xxl: '1320px',
		},
	},
	fontFamily: {
		en: 'Poppins',
		ar: 'Poppins',
	},
	checkBox: {
		labelGap: 10,
	},
	slider: {
		labelGap: 24,
	},
	switch: {
		labelGap: 10,
	},
}

const mainTheme = {
	...projectTheme,
	colors: {
		...AdmixLibraryTheme.colors,
		black,
		black850,
		black50,
		vulkan,
		text: black,
		red: red500,
		red400,
		gray: gray650,
		gray50,
		gray100,
		gray150,
		gray200,
		gray500,
		gray600,
		gray650,
		gray700,
		gray750,
		gray800,
		gray900,
		blue400,
		green,
		white,
		primary,
		secondary,
		blue500,
		tomatoRed,
		salmonRed,
		glamPink,
		orange,
		purple,
		pageBackground: white,
		navy,
	},
}

const theme = {
	...mainTheme,
}

/**
 * Extend style-components with theme type
 */

export type ITheme = typeof theme

export type PropsWithTheme<T = unknown> = T & {
	theme: ITheme
}

export default theme
