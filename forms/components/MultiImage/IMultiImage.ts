import { IBasicField } from '@forms/components/IBasicField'
import { CSSProperties, ReactElement } from 'react'
import { DropzoneOptions } from 'react-dropzone'

export interface IMultiImage extends IBasicField {
	type: 'MultiImage'
	props?: DropzoneOptions & {
		label: ReactElement | string
		labelStyles?: CSSProperties
		requiredLabel?: boolean
		textError: string
		height?: number
		width?: number
	}
}
