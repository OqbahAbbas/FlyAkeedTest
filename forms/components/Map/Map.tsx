import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import mapPositions from '@constants/map'
import L, { Control, LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { IField } from '@forms/generate/types/IField'
import { FC, useEffect } from 'react'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import 'node_modules/leaflet-geosearch/dist/geosearch.css'
import { useRecoilValue } from 'recoil'
import styled from '@emotion/styled'
import { SomeObject } from '@admixltd/admix-component-library'
import LabelsAtom from '@atoms/Labels'

const Map: FC<IField> = ({ field, value, handleChange }) => {
	const { search } = useRecoilValue(LabelsAtom).map
	const { name = '' } = field
	const { height, center, zoom } = field.props as SomeObject

	const customIcon = L.icon({
		iconUrl: '/logo.png',
		iconSize: [32, 32],
	})

	const SearchControl = () => {
		const map = useMap()
		const handleMapClick = (e: L.LeafletMouseEvent) => {
			const { lat, lng } = e.latlng
			handleChange(name, [lat, lng])
			map.setView([lat, lng])
		}
		map.on('click', handleMapClick)

		useEffect(() => {
			const searchControl: Control = GeoSearchControl({
				provider: new OpenStreetMapProvider(),
				style: 'bar',
				autoCompleteDelay: 250,
				searchLabel: search,
				position: 'topright',
				showPopup: true,
				showMarker: false,
				autoClose: true,
				animateZoom: true,
				keepResult: true,
				marker: { icon: customIcon },
			})
			map.addControl(searchControl)

			return () => {
				map.removeControl(searchControl)
			}
		}, [map])

		return null
	}

	return (
		<StyledMapContainer
			center={(value as LatLngExpression) ?? center ?? mapPositions.damascusPosition}
			zoom={(zoom as number) ?? 13}
			scrollWheelZoom
			style={{ height: `${height}px` }}
		>
			<TileLayer
				attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<SearchControl />
			{value && <Marker position={value as LatLngExpression} icon={customIcon} />}
		</StyledMapContainer>
	)
}

const StyledMapContainer = styled(MapContainer)`
	.leaflet-marker-icon {
		object-fit: contain;
	}
	.leaflet-geosearch-bar {
		form {
			display: grid;
			grid-auto-flow: column;
			justify-content: space-between;
			grid-template-columns: 1fr 30px;

			.reset {
				position: relative;
			}
		}
	}
`

export default Map
