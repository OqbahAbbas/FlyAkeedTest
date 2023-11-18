import { IBasicField } from '@forms/components/IBasicField'
import { CheckBoxProps } from '@admixltd/admix-component-library'
import { CSSProperties, ReactElement } from 'react'
import { ITheme } from '@admixltd/admix-component-library/styles/theme'

export interface ICheckBox extends IBasicField {
	type: 'CheckBox'
	props?: CheckBoxProps & {
		label?: ReactElement | string
		labelStyles?: CSSProperties
		color?: keyof ITheme['colors']
	}
}
