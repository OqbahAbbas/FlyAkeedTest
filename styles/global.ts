import { css } from '@emotion/react'
import { PropsWithTheme } from 'styles/theme'
import { rgba } from 'polished'
import nProgressStyles from '@styles/nprogress'
import resetStyles from '@styles/reset'

const GlobalStyles = ({ theme, locale }: PropsWithTheme<{ locale: string }>) => css`
	${nProgressStyles({ theme })}
	${resetStyles()}
	@font-face {
		font-family: 'Zahra';
		src: url('/ZahraArabicRegular.ttf') format('truetype');
	}
	:root {
		//disable zoom
		touch-action: pan-x pan-y;
		height: 100%;
	}

	* {
		box-sizing: border-box;
		font-family: ${locale === 'en' ? theme.fontFamily.en : theme.fontFamily.ar} !important;
	}

	body {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: ${theme.colors.pageBackground};
		color: ${theme.colors.text};

		#__next {
			flex-grow: 2;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		-webkit-tap-highlight-color: ${rgba(theme.colors.primary, 0.1)};
		@media only screen and (max-width: 470px) {
			#feedback-widget {
				left: 0;
			}
			#feedback-widget_iframe {
				width: 100vw !important;
			}
		}
	}
`

export default GlobalStyles
