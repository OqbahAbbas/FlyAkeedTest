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
import { rgba } from 'polished'
import { FlightClassAtom } from '@atoms/Dashboard'

const FlightClassToggleButton = () => {
	const locale = useRouter().locale ?? 'en'
	const { economy, business, firstClass } =
		useRecoilValue(LabelsAtom).pages.dashboard.flightClassToggleButton

	const [selected, setSelected] = useRecoilState(FlightClassAtom)

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
				<ToggleButton value={1} key={economy}>
					<span className="classTitle">{economy}</span>
				</ToggleButton>
				<ToggleButton value={2} key={business}>
					<span className="classTitle">{business}</span>
				</ToggleButton>
				<ToggleButton value={3} key={firstClass}>
					<span className="classTitle">{firstClass}</span>
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
	height: 50px;
	border-radius: 0;
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
			height: 50px;
			border-radius: 0 !important;
			font-size: 14px;
			line-height: 16px;
			color: ${({ theme }) => theme.colors.gray500};
			text-transform: none !important;
			padding: 10px 0;

			.classTitle {
				display: grid;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				border-left: solid 1px ${({ theme }) => rgba(theme.colors.primary, 0.1)} !important;
			}

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

export default FlightClassToggleButton
