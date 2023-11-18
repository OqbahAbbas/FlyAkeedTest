import { MapContainerProps } from 'react-leaflet'
import L from 'leaflet'
import { IBasicField } from '../IBasicField'

export interface IMap extends IBasicField {
	type: 'Map'
	props: MapContainerProps & {
		zoom?: number
		center?: L.LatLngExpression
		height?: number
	}
}
