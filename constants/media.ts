export const BREAKPOINTS = {
	xs: 360,
	sm: 568,
	md: 768,
	lg: 992,
	xl: 1280,
	xxl: 1920,
} as const

export interface MediaInterface {
	xxs: string
	xs: string
	sm: string
	md: string
	lg: string
	xl: string
	xxl: string
	xxxl: string
}

const getMedia = <T extends number>(breakpoint: T): `(min-width: ${T}px)` =>
	`(min-width: ${breakpoint}px)`

export const media = {
	xs: getMedia(BREAKPOINTS.xs),
	sm: getMedia(BREAKPOINTS.sm),
	md: getMedia(BREAKPOINTS.md),
	lg: getMedia(BREAKPOINTS.lg),
	xl: getMedia(BREAKPOINTS.xl),
	xxl: getMedia(BREAKPOINTS.xxl),
}

export const FONT_SIZE = {
	xxs: '0.75rem',
	xs: '0.875rem',
	sm: '0.925rem',
	md: '1rem',
	xm: '1.0875rem',
	lg: '1.125rem',
	xl: '1.25rem',
	xxl: '1.5rem',
	xxxl: '1.625rem',
}

export const LocaleFontSize: (locale: string) => MediaInterface = locale => ({
	xxs: locale === 'ar' ? '0.75rem' : '0.75rem',
	xs: locale === 'ar' ? '0.875rem' : '0.875rem',
	sm: locale === 'ar' ? '0.925rem' : '0.925rem',
	md: locale === 'ar' ? '1rem' : '1rem',
	xm: locale === 'ar' ? '1.0875rem' : '1.0875rem',
	lg: locale === 'ar' ? '1.125rem' : '1.125rem',
	xl: locale === 'ar' ? '1.25rem' : '1.25rem',
	xxl: locale === 'ar' ? '1.5rem' : '1.5rem',
	xxxl: locale === 'ar' ? '1.625rem' : '1.625rem',
})

export const FONT_WEIGHT = {
	thin: '100',
	extraLight: '200',
	light: '300',
	regular: '400',
	medium: '500',
	semibold: '600',
	bold: '700',
	extraBold: '800',
	black: '900',
}

export const FONT_FAMILY = {
	en: 'Poppins',
	ar: 'Zahra',
}
