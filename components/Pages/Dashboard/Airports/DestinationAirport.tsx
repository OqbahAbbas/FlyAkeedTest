import LabelsAtom from '@atoms/Labels'
import styled from '@emotion/styled'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ReactComponent as PlaneArrival } from '@svg/pages/dashboard/planeArrival.svg'
import { Autocomplete, TextField, inputBaseClasses, outlinedInputClasses } from '@mui/material'
import AirportService from '@api/Models/Airport'
import { useRouter } from 'next/router'
import { DestinationAirportAtom, SourceAirportAtom } from '@atoms/Dashboard'
import { useEffect, useState } from 'react'
import { AirportFilter } from '@api/Models/Airport/types'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { SomeObject } from '@admixltd/admix-component-library'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

const DestinationAirport = () => {
	const router = useRouter()
	const locale = router.locale ?? 'en'
	const { to, placeHolder, fetchError } = useRecoilValue(LabelsAtom).pages.dashboard.airports
	const [destinationAirport, setDestinationAirport] = useRecoilState(DestinationAirportAtom)
	const sourceAirport = useRecoilValue(SourceAirportAtom)
	const [options, setOptions] = useState<AirportFilter[]>([])

	useEffect(() => {
		if (!destinationAirport) return
		if (options.find(elem => elem.code === destinationAirport?.code)) return
		setOptions([...options, destinationAirport])
	}, [destinationAirport, options])

	const getAirports = async (searchValue: string) => {
		const request = await AirportService.searchAirports({
			keyword: searchValue,
			offset: 0,
		})

		if (!request || 'error' in request) {
			Snackbar.error(fetchError)
			return
		}

		const airPorts = request.filter(elem => elem.type === 'airport')

		const uniqueAirPorts: AirportFilter[] = Object.values(
			airPorts.reduce((uniqueMap: SomeObject<AirportFilter>, obj) => {
				uniqueMap[obj.code] = obj
				return uniqueMap
			}, {})
		)

		setOptions(uniqueAirPorts)
	}

	const getAirportsDebounced = AwesomeDebouncePromise(getAirports, 500)

	return (
		<Container>
			<div className="airport">
				<PlaneArrival />
				<span className="text">{to}</span>
			</div>
			<Autocomplete
				value={destinationAirport}
				onChange={(e, val) => setDestinationAirport(val)}
				onInputChange={(_: unknown, inputValue: string, reason: string) => {
					if (reason !== 'input') return
					getAirportsDebounced(inputValue)
				}}
				options={options}
				getOptionDisabled={option => option.code === sourceAirport?.code}
				renderOption={(props, option: AirportFilter) => {
					const { en, ar } = option
					const translation =
						locale === 'en' || (locale === 'ar' && Array.isArray(ar)) ? en : ar
					return (
						<li {...props} key={`${option.code}`}>
							<CustomOption>
								<div className="mainInfo">
									<div className="name">{translation.name}</div>
									<div className="code">{option.code}</div>
								</div>
								<div className="address">
									{translation.address}, {translation.country}
								</div>
							</CustomOption>
						</li>
					)
				}}
				renderInput={params => <TextField {...params} placeholder={placeHolder} />}
				popupIcon={null}
				clearIcon={null}
				getOptionLabel={option => {
					const { en, ar } = option
					const translation =
						locale === 'en' || (locale === 'ar' && Array.isArray(ar)) ? en : ar
					return `${translation.address} (${option.code})`
				}}
			/>
		</Container>
	)
}

const CustomOption = styled.div`
	display: grid;
	grid-auto-flow: row;
	align-items: center;
	width: 100%;

	.mainInfo {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.name {
			color: ${({ theme }) => theme.colors.black};
			font-size: 13px;
		}

		.code {
			color: ${({ theme }) => theme.colors.black};
			font-size: 16px;
			font-weight: bold;
		}
	}

	.address {
		color: #b8b8b8;
		font-size: 11px;
	}
`

const Container = styled.div`
	display: grid;
	grid-auto-flow: row;
	align-items: center;
	width: 100%;
	max-width: 430px;
	padding: 8px 0;
	margin: 0;
	color: #ff56a1;
	background: #f1f1f1;

	${({ theme }) => theme.adaptive.md} {
		width: 100%;
	}

	input,
	fieldset,
	.${inputBaseClasses.root} {
		padding-bottom: 0 !important;
		border: none;
		box-shadow: none;
		&:focus {
			fieldset.${outlinedInputClasses.notchedOutline} {
				border: none !important;
				box-shadow: none !important;
			}
		}
		&:focus-within {
			fieldset.${outlinedInputClasses.notchedOutline} {
				box-shadow: none !important;
				border: none !important;
			}
		}
	}

	.airport {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		justify-content: start;
		padding: 0 12px;

		svg {
			width: 12px;
			height: 12px;

			stroke: #ff56a1 !important;
			fill: #ff56a1 !important;
		}

		.text {
			margin: 0 4px;
			font-size: 16px;
		}
	}
`

export default DestinationAirport
