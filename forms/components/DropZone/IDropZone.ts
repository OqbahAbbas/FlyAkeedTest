import { IBasicField } from '@forms/components/IBasicField'
import { CSSProperties, ReactElement } from 'react'
import { DropzoneOptions } from 'react-dropzone'

export interface IDropZone extends IBasicField {
	type: 'DropZone'
	props?: DropzoneOptions & {
		label: ReactElement | string
		labelStyles?: CSSProperties
		requiredLabel?: boolean
		mainText?: string
		extraText?: string
		textError: string
		height: number
	}
}
