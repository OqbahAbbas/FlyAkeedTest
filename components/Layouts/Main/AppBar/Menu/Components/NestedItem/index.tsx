import { Button, SomeObject } from '@admixltd/admix-component-library'
import {
	MenuContentItem,
	NestedItemProps,
} from '@components/Layouts/Main/AppBar/Menu/Components/types'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { collapseClasses, useMediaQuery } from '@mui/material'
import { buttonClasses } from '@mui/material/Button'
import { ReactComponent as Arrow } from '@svg/layout/AppBar/arrowDown.svg'
import DesktopMenu from 'components/Layouts/Main/AppBar/Menu/Components/NestedItem/Desktop/DesktopMenu'
import MobileCollapse from 'components/Layouts/Main/AppBar/Menu/Components/NestedItem/Mobile/MobileCollapse'
import { FC, memo, PropsWithChildren, ReactElement, useMemo } from 'react'

const checkIfItemsActive: (items: MenuContentItem[]) => boolean = items =>
	items.filter(item => {
		if ('items' in item) return checkIfItemsActive(item.items)
		if ('active' in item) return item.active
		return false
	}).length > 0

const NestedItem: FC<PropsWithChildren<NestedItemProps>> = ({
	title,
	items,
	children,
	toggleProps,
	collapseProps,
	menuProps,
	itemId,
	...props
}) => {
	const active = checkIfItemsActive(items)

	/**
	 * We are able to use it here because menu items are not visible by default
	 */
	const theme = useTheme()
	const desktop = !useMediaQuery(theme.adaptive.md)

	const ButtonComponent = useMemo(
		() => (
			<Button color="white" data-testid={itemId} iconEnd icon={<Arrow />} {...toggleProps}>
				{title}
			</Button>
		),
		[toggleProps]
	)

	let content: ReactElement

	if (desktop) {
		content = (
			<DesktopMenu
				{...{
					popupId: `${itemId}-popup`,
					anchor: ButtonComponent,
					anchorProps: {
						...toggleProps,
						active,
					},
				}}
				{...(menuProps as SomeObject)}
			>
				{children}
			</DesktopMenu>
		)
	} else {
		content = (
			<MobileCollapse
				{...{
					button: ButtonComponent,
					toggleProps: {
						...toggleProps,
						active,
					},
					...collapseProps,
				}}
			>
				{children}
			</MobileCollapse>
		)
	}

	return <Container {...props}>{content}</Container>
}

const Container = styled.div`
	&&& {
		.${collapseClasses.wrapperInner} {
			display: grid;
			gap: 4px;
		}

		.${buttonClasses.root} {
			svg,
			img {
				transition: transform ${({ theme }) => theme.basicTransition};
			}

			&.open {
				img {
					transform: scaleY(-1);
				}
			}
		}
	}
`

export default memo(NestedItem)
