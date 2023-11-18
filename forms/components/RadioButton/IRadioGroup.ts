import { ITheme } from '@admixltd/admix-component-library/styles/theme'
import { AttributeChoice } from '@api/Models/Attributes/AttributeChoices/types'
import { IBasicField } from '@forms/components/IBasicField'
import { RadioGroupProps } from '@mui/material'
import { ReactElement } from 'react'

export interface IRadioGroup extends IBasicField {
	type: 'RadioGroup'
	props?: RadioGroupProps & {
		label: ReactElement | string
		options: AttributeChoice[]
		color?: keyof ITheme['colors']
	}
}
