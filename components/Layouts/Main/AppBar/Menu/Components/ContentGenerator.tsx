import { Button } from '@admixltd/admix-component-library'
import { Box } from '@mui/material'
import NestedItem from '@components/Layouts/Main/AppBar/Menu/Components/NestedItem'
import Link from 'next/link'
import {
	ElementProps,
	MenuContentItem,
} from '@components/Layouts/Main/AppBar/Menu/Components/types'
import { getRouter } from '@helpers/RouterNexus'

interface ContentToElementOptions {
	key?: string
	handleMenuClose?: () => void
}

const ContentGenerator = (
	Content: MenuContentItem[],
	{ key: parentKey = '' }: ContentToElementOptions | undefined = {}
) =>
	Content.map((item, index) => {
		const key = `${parentKey}menu-item-${index}`
		/**
		 * Render any type of component
		 */
		if ('component' in item) {
			return <Box key={key} {...item} />
		}

		/**
		 * Render dropdown
		 */
		if ('items' in item) {
			const { items } = item
			return (
				<NestedItem
					{...{
						key: `${key}-nested-`,
						itemId: `${key}-nested`,
					}}
					{...item}
				>
					{ContentGenerator(items, { key: `${key}-nested-` })}
				</NestedItem>
			)
		}

		/**
		 * Render clickable item
		 */
		const { title, href, className, active, ...props } = item as ElementProps

		const currentLocale = getRouter().locale ?? 'en'

		const buttonProps: ElementProps = {
			color: active ? 'primary' : 'gray900',
			active,
			variant: 'text',
			...props,
			children: title,
			style: { boxShadow: 'none', border: 'none' },
		}
		if (!href) return <Button key={key} {...buttonProps} />
		return (
			<Link href={href} key={key} passHref locale={props?.locale ?? currentLocale}>
				<Button {...buttonProps} />
			</Link>
		)
	})

export default ContentGenerator
