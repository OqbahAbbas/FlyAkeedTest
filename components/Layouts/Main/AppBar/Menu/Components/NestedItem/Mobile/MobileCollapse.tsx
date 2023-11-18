import { cloneElement, MouseEvent, PropsWithChildren, ReactElement, useState } from 'react'
import { Collapse, CollapseProps } from '@mui/material'
import { ButtonProps } from '@admixltd/admix-component-library'
import { useTheme } from '@emotion/react'
import classnames from 'classnames'

interface MobileCollapseProps extends CollapseProps {
	button: ReactElement
	toggleProps?: ButtonProps
}

const MobileCollapse = ({
	button,
	children,
	toggleProps,
	...props
}: PropsWithChildren<MobileCollapseProps>) => {
	const [open, setOpen] = useState(false)
	const { easing } = useTheme()
	return (
		<>
			{cloneElement(button, {
				...toggleProps,
				className: classnames(toggleProps?.className, 'collapseToggle', { open }),
				onClick: (event: MouseEvent<HTMLButtonElement>) => {
					setOpen(!open)
					if (!toggleProps) return
					if (!toggleProps.onClick) return
					toggleProps.onClick(event)
				},
			})}
			<Collapse in={open} className="collapseContainer" easing={easing} {...props}>
				{children}
			</Collapse>
		</>
	)
}

export default MobileCollapse
