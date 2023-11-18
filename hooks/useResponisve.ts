/* eslint-disable import/prefer-default-export */
import { BREAKPOINTS, media } from '@constants/media'
import { useMediaQuery } from './useMediaQuery'

interface ResponsiveReturnValues {
	isXXS: boolean
	isXS: boolean
	isSM: boolean
	isMD: boolean
	isXM: boolean
	isXXM: boolean
	isLG: boolean
	isXLG: boolean
	isXXLG: boolean
	isMobile: boolean
	isMobileOnly: boolean
	isTablet: boolean
	isDesktop: boolean
	isBigScreen: boolean
	mobileOnly: boolean
	tabletOnly: boolean
	desktopOnly: boolean
}

export const useResponsive = (): ResponsiveReturnValues => {
	const isMobile = useMediaQuery(media.xs)
	const isTablet = useMediaQuery(media.md)
	const isDesktop = useMediaQuery(media.xl)
	const isBigScreen = useMediaQuery(media.xxl)

	const mobileOnly = useMediaQuery(`(max-width: ${BREAKPOINTS.md - 0.02}px)`)
	const isMobileOnly = useMediaQuery(
		`(min-width: 275px) and (max-width: ${BREAKPOINTS.sm - 0.02}px)`
	)
	const isXXS = useMediaQuery(`(min-width: 275px) and (max-width: ${400 - 0.02}px)`)
	const isXS = useMediaQuery(`(min-width: 400px) and (max-width: ${475 - 0.02}px)`)
	const isSM = useMediaQuery(`(min-width: 475px) and (max-width: ${550 - 0.02}px)`)
	const isMD = useMediaQuery(`(min-width: 550px) and (max-width: ${700 - 0.02}px)`)
	const isXM = useMediaQuery(`(min-width: 700px) and (max-width: ${1200 - 0.02}px)`)
	const isXXM = useMediaQuery(`(min-width: ${1100}px)`)
	const isLG = useMediaQuery(`(max-width: ${1200 - 1}px)`)
	const isXLG = useMediaQuery(`(max-width: ${1325 - 0.02}px)`)
	const isXXLG = useMediaQuery(`(min-width: 1325px)`)
	const tabletOnly = useMediaQuery(
		`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.xl - 0.02}px)`
	)

	const desktopOnly = useMediaQuery(
		`(min-width: ${BREAKPOINTS.xl}px) and (max-width: ${BREAKPOINTS.xxl - 0.02}px)`
	)

	return {
		isXXS,
		isSM,
		isXS,
		isMD,
		isXM,
		isXXM,
		isLG,
		isXLG,
		isXXLG,
		isMobile,
		isMobileOnly,
		isTablet,
		isDesktop,
		isBigScreen,
		mobileOnly,
		tabletOnly,
		desktopOnly,
	}
}
