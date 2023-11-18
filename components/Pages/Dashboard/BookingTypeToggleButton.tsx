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
import { BookingTypeAtom } from '@atoms/Dashboard'

const BookingTypeToggleButton = () => {
	const locale = useRouter().locale ?? 'en'
	const { flights, hotels } = useRecoilValue(LabelsAtom).pages.dashboard.bookingTypeToggleOptions

	const [selected, setSelected] = useRecoilState(BookingTypeAtom)

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
				<ToggleButton value={1} key={flights}>
					<img src="/Flights.png" width={28} height={28} alt="" />
					{flights}
				</ToggleButton>
				<ToggleButton value={2} key={hotels}>
					<img src="/Hotels.png" width={28} height={28} alt="" />
					{hotels}
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

export default BookingTypeToggleButton
