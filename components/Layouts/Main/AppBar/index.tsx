import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@admixltd/admix-component-library'
import pages from '@constants/pages'
import { rgba } from 'polished'
import MenuContent from '@components/Layouts/Main/AppBar/Menu/MenuContent'
import { buttonClasses } from '@mui/material/Button'
import { Collapse, collapseClasses } from '@mui/material'
import { useTheme } from '@emotion/react'
import { ReactComponent as CloseIcon } from '@svg/layout/AppBar/close.svg'
import { ReactComponent as MenuIcon } from '@svg/layout/AppBar/menu.svg'
import { useRouter } from 'next/router'
import ContainerFluid from '@components/Layouts/Main/ContainerFluid'

const AppBar = () => {
	const { easing } = useTheme()
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const { locale } = useRouter()
	useEffect(() => {
		const handleCloseToggle = () => {
			setOpen(false)
		}
		router.events.on('routeChangeComplete', handleCloseToggle)
		return () => {
			router.events.off('routeChangeComplete', handleCloseToggle)
		}
	}, [])

	return (
		<Container>
			<Grid locale={locale}>
				<CloseButton
					color="primary"
					onClick={() => {
						setOpen(!open)
					}}
				>
					{open ? <CloseIcon /> : <MenuIcon />}
				</CloseButton>
				<Link href={pages.dashboard.url} passHref>
					<LogoContainer>
						<img
							src={locale === 'ar' ? '/LogoAr.png' : '/LogoEn.png'}
							alt=""
							height={25}
						/>
					</LogoContainer>
				</Link>
				<Collapse in={open} className="menuContainer" easing={easing}>
					<MenuContent />
				</Collapse>
			</Grid>
		</Container>
	)
}

const CloseButton = styled(Button)`
	&& {
		border-radius: 8px;
		position: absolute;
		right: 15px;
		top: 15px;

		${({ theme }) => theme.adaptive.mobileFirst.lg} {
			display: none;
		}

		svg,
		img {
			width: 20px;
			height: 20px;
			[stroke] {
				stroke: ${({ theme }) => theme.colors.primary} !important;
			}
			[fill] {
				fill: ${({ theme }) => theme.colors.primary} !important;
			}
		}

		padding: 14px;
	}
`

const Container = styled(ContainerFluid)`
	z-index: 2;
	background: ${({ theme }) => theme.colors.secondary};
	display: grid;
	position: fixed;
    width: 100%;	

	> div {
		position: relative;

		&:after {
			content: '';
			display: block;
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;

			${({ theme }) => theme.adaptive.md} {
				bottom: 2px;
			}
		}
`

const LogoContainer = styled(Button)`
	box-shadow: none !important;

	${({ theme }) => theme.adaptive.mobileFirst.lg} {
		margin-left: -16px;
	}

	> div > span {
		padding: 5px 0;
		align-items: center;

		svg {
			width: auto;
			height: 32px;
		}
	}

	${({ theme }) => theme.adaptive.md} {
		margin-right: auto;
		margin-left: 5px;
	}
`

const Grid = styled.div<{ locale: string | undefined }>`
	padding: 12px 0;
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
	align-items: center;
	box-shadow: 0 2px 0 ${({ theme }) => rgba(theme.colors.primary, 0.04)}!important;

	.menuContainer {
		.currencyMenuToggle {
			height: 100%;
			background: none;

			${({ theme }) => theme.adaptive.mobileFirst.md} {
				margin-left: 12px;
			}

			${({ theme }) => theme.adaptive.md} {
				margin-left: 0;
			}

			> div > span {
				color: ${({ theme }) => theme.colors.white};
				font-size: 12px;
				font-weight: 700;
				line-height: 31px;
			}

			${({ theme }) => theme.adaptive.mobileFirst.lg} {
				padding: 0 4px !important;
				div span {
					max-width: 130px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		${({ theme }) => theme.adaptive.mobileFirst.lg} {
			min-height: unset !important;
			height: unset !important;
			overflow: unset !important;
			visibility: unset !important;
		}

		.${collapseClasses.wrapperInner} {
			width: 100%;
			display: flex;
			justify-content: space-between;

			> div {
				${({ theme }) => theme.adaptive.mobileFirst.lg} {
					display: flex;
				}

				.${buttonClasses.root} {
					svg,
					img {
						width: 16px;
						height: 16px;
					}

					> div > span {
						font-size: 12px;
						line-height: 31px;
					}
				}

				.MuiFormControl-root {
					margin-left: 6px;

					${({ theme }) => theme.adaptive.lg} {
						margin-left: 20px;
					}
				}
			}
		}
	}

	${({ theme }) => theme.adaptive.md} {
		grid-template-columns: 1fr;
		gap: 0;

		.menuContainer {
			> .${collapseClasses.wrapper} > .${collapseClasses.wrapperInner} {
				padding-top: 32px;
				display: grid;
				position: relative;
				grid-template-columns: 1fr;

				&:after {
					content: '';
					display: block;
					width: 100%;
					border-top: 1px solid ${({ theme }) => rgba(theme.colors.primary, 0.1)};
					position: absolute;
					top: 16px;
					left: 0;
				}

				> div {
					.${buttonClasses.root} {
						box-shadow: none !important;
						padding: 12px 24px;
						width: auto !important;

						:not(.actionButton) {
							background: none !important;
							width: 100% !important;
						}

						> div > span {
							font-size: 14px !important;
							font-weight: 700;
							line-height: 31px;
						}

						&.${buttonClasses.contained} {
							margin-top: 16px;
							margin-left: 24px;
						}

						&:not(.${buttonClasses.contained}) {
							border-radius: 0;

							> div {
								margin-right: auto;
							}
						}

						> div {
							max-width: 100%;
							position: relative;

							> span {
								font-weight: 700;
								font-size: 16px;
								line-height: initial;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
								max-width: 100%;
							}
						}
					}

					.${collapseClasses.root} {
						width: calc(100% - 24px);
						margin-left: 24px;
						border-left: 1px solid ${({ theme }) => rgba(theme.colors.primary, 0.2)};

						.${collapseClasses.wrapperInner} {
							grid-template-columns: 1fr;
							gap: 0;
						}
					}
				}
			}
		}
	}
`

export default AppBar
