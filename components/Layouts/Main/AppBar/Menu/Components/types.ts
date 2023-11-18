import { BoxProps, CollapseProps } from '@mui/material'
import { ButtonProps, MenuProps } from '@admixltd/admix-component-library'
import { ReactElement } from 'react'

export interface BaseParamsProps {
	url?: string
	routerKey?: 'asPath' | 'pathname'
	condition?: 'startsWith' | 'equal'
}

export type MenuContentItem = BoxProps | ElementProps | NestedItemProps

export interface ElementProps extends ButtonProps {
	active: boolean
	locale?: 'en' | 'ar'
}

export interface NestedItemProps {
	itemId: string
	toggleProps?: Partial<ButtonProps>
	menuProps?: Partial<MenuProps>
	collapseProps?: Partial<CollapseProps>
	title: ReactElement
	icon?: ReactElement
	easing?: string
	items: MenuContentItem[]
}
