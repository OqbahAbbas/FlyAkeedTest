import {
	ToggleButton,
	ToggleButtonGroup,
	buttonBaseClasses,
	toggleButtonGroupClasses,
} from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { DirectionAtom } from '@atoms/Dashboard'

const DirectionToggleButton = () => {
	const locale = useRouter().locale ?? 'en'
	const { oneWay, roundTrip, multiCity } =
		useRecoilValue(LabelsAtom).pages.dashboard.directionToggleButton

	const [selected, setSelected] = useRecoilState(DirectionAtom)

	const handleChange = (event: React.MouseEvent<HTMLElement>, newParam: string) => {
		setSelected(parseInt(newParam, 10))
	}

	return (
		<Container locale={locale}>
			<ToggleButtonGroup
				{...{
					value: selected,
					onChange: handleChange,
					size: 'small',
					exclusive: true,
				}}
			>
				<ToggleButton value={1} key={oneWay}>
					{oneWay}
				</ToggleButton>
				<ToggleButton value={2} key={roundTrip}>
					{roundTrip}
				</ToggleButton>
				<ToggleButton value={3} key={multiCity}>
					{multiCity}
				</ToggleButton>
			</ToggleButtonGroup>
		</Container>
	)
}

const Container = styled.div<{ locale: string | undefined }>`
	display: grid;
	align-items: center;
	width: 50%;
	max-width: 430px;
	height: fit-content;
	padding: 4px;
	margin: 5px 0;
	border-radius: 50px;
	background: ${({ theme }) => theme.colors.white};

	${({ theme }) => theme.adaptive.md} {
		width: 100%;
	}

	.${toggleButtonGroupClasses.root} {
		display: flex;
		justify-content: space-around;
		align-items: center;

		.${buttonBaseClasses.root} {
			border: none;
			width: 50%;
			height: 36px;
			border-radius: 20px !important;
			font-size: 14px;
			line-height: 16px;
			color: ${({ theme }) => theme.colors.gray500};
			text-transform: none !important;
			&.Mui-selected {
				background: ${({ theme }) => theme.colors.primary} !important;
				color: ${({ theme }) => theme.colors.white};
			}
			img {
				margin: 0 8px;
			}
		}
	}
`

export default DirectionToggleButton
