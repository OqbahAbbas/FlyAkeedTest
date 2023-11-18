import { cloneElement, PropsWithChildren, ReactElement, useEffect, useRef } from 'react'
import { ButtonProps, Menu, MenuProps, SomeObject } from '@admixltd/admix-component-library'
import classnames from 'classnames'
import styled from '@emotion/styled'
import { buttonClasses } from '@mui/material/Button'
import { useRouter } from 'next/router'
import PaperComponent from './PaperComponent'
import MenuContext, { MenuContextNexus } from './MenuContext'

interface DesktopMenuProps extends Omit<MenuProps, 'anchor' | 'children'> {
	anchor: ReactElement
	anchorProps?: ButtonProps
}

/**
 * Render Menu component
 */
const DesktopMenu = ({
	anchor,
	anchorProps = {},
	children,
	...props
}: PropsWithChildren<DesktopMenuProps>) => {
	const closeRef = useRef(() => {})
	const router = useRouter()
	useEffect(() => {
		/**
		 * Close menu on route change
		 */
		const handleCloseMenu = () => {
			closeRef.current?.()
		}
		router.events.on('routeChangeComplete', handleCloseMenu)
		return () => {
			router.events.off('routeChangeComplete', handleCloseMenu)
		}
	}, [])

	return (
		<Menu
			PaperProps={{
				...({
					component: PaperComponent,
				} as SomeObject),
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			anchor={({ popupState, bindTrigger }) => {
				const triggerProps = bindTrigger(popupState)
				return cloneElement(anchor, {
					...anchorProps,
					...triggerProps,
					className: classnames(anchorProps?.className, 'menuToggle', {
						active: anchorProps.active,
						open: popupState.isOpen,
					}),
				})
			}}
			{...props}
		>
			{({ close }) => {
				/**
				 * Store close in ref to route change event
				 */
				closeRef.current = close
				return (
					<MenuGroup>
						<MenuContext.Provider
							value={
								// We are ok with below
								// eslint-disable-next-line react/jsx-no-constructed-context-values
								{
									handleMenuClose: close,
								}
							}
						>
							<MenuContextNexus
							/**
							 * Nexus used to access menu state outside of components
							 */
							/>
							{children}
						</MenuContext.Provider>
					</MenuGroup>
				)
			}}
		</Menu>
	)
}

const MenuGroup = styled.div`
	width: 100%;
	display: grid;
	gap: 7px;
	padding: 0;
	max-width: 280px;
	max-height: 400px;
	overflow: auto;

	&& .${buttonClasses.root} {
		overflow: hidden;
		box-shadow: none !important;
		border-radius: 4px;
		text-align: left;
		justify-content: flex-start;

		> div {
			position: relative;
			max-width: 100%;

			> span {
				font-weight: 600;
				font-size: 14px;
				line-height: 36px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				max-width: 100%;
			}
		}
	}
`

export default DesktopMenu
