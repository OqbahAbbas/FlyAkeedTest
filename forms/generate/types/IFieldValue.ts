import { Dayjs } from 'dayjs'
import { SomeObject } from '@admixltd/admix-component-library'
import { LatLngExpression } from 'leaflet'
import { AttachmentFile } from '@api/Types/General'

export type IFieldValue =
	| string
	| number
	| number[]
	| boolean
	| undefined
	| string[]
	| Dayjs
	| SomeObject
	| SomeObject[]
	| {
			[key: string]: IFieldValue
	  }
	| File
	| File[]
	| LatLngExpression
	| AttachmentFile[]
	| (AttachmentFile | File)[]
