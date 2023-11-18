import LabelsAtom from '@atoms/Labels'
import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { useRecoilState, useRecoilValue } from 'recoil'
import arabic_ar from 'react-date-object/locales/gregorian_ar'
import english_en from 'react-date-object/locales/gregorian_en'
import { useRouter } from 'next/router'
import { ReactComponent as CloseIcon } from '@svg/pages/dashboard/close.svg'
import { ReactComponent as AddIcon } from '@svg/pages/dashboard/add.svg'
import { DatesAtom } from '@atoms/Dashboard'
import { ButtonBase } from '@mui/material'

const FlightDates = () => {
	const router = useRouter()
	const locale = router.locale ?? 'en'
	const datePickerRef = useRef()
	const [dates, setDates] = useRecoilState(DatesAtom)
	const [hideReturnDate, setHideReturnDate] = useState(false)
	const {
		departure,
		return: returnDate,
		addReturnDate,
	} = useRecoilValue(LabelsAtom).pages.dashboard.dates

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const openCalendar = () => (datePickerRef?.current as any)?.openCalendar()

	const onDateChange = (val: DateObject[]) => {
		setDates(val)
		setHideReturnDate(false)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const removeReturnDate = (e: any) => {
		e.stopPropagation()
		setDates([dates[0]])
		setHideReturnDate(true)
	}

	return (
		<Container>
			<div className="dateContainer departure" onClick={openCalendar}>
				<div className="dateTitle">{departure}</div>
				<div className="dateValue">
					<div className="day">{dates[0].day}</div>
					<div className="monthYear">
						<div className="month">
							{locale === 'ar' ? dates[0].month.name : dates[0].month.shortName}
						</div>
						<div className="year">{dates[0].year}</div>
					</div>
				</div>
			</div>
			{!hideReturnDate && (
				<div className="dateContainer return" onClick={openCalendar}>
					<CloseButton onClick={e => removeReturnDate(e)}>
						<CloseIcon />
					</CloseButton>
					<div className="dateTitle">{returnDate}</div>
					<div className="dateValue">
						<div className="day">{dates.length > 1 ? dates[1].day : dates[0].day}</div>
						<div className="monthYear">
							<div className="month">
								{dates.length > 1
									? dates[1].month[locale === 'ar' ? 'name' : 'shortName']
									: dates[0].month[locale === 'ar' ? 'name' : 'shortName']}
							</div>
							<div className="year">
								{dates.length > 1 ? dates[1].year : dates[0].year}
							</div>
						</div>
					</div>
				</div>
			)}
			{hideReturnDate && (
				<div className="addReturnDate" onClick={openCalendar}>
					<AddIcon />
					{addReturnDate}
				</div>
			)}
			<DatePicker
				className="datePicker"
				value={dates}
				onChange={onDateChange}
				ref={datePickerRef}
				arrow={false}
				calendarPosition={locale === 'en' ? 'right-center' : 'left-center'}
				range
				rangeHover
				locale={locale === 'en' ? english_en : arabic_ar}
				minDate={new DateObject()}
				format="DD/MM/YYYY"
				inputMode="none"
			/>
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: calc(50% - 6.5px) calc(50% - 6.5px) 10px;
	align-items: center;
	gap: 13px;
	width: 50%;
	max-width: 430px;

	.rmdp-input {
		display: none;
	}

	${({ theme }) => theme.adaptive.md} {
		width: 100%;
	}

	.addReturnDate {
		display: grid;
		grid-auto-flow: column;
		align-items: stretch;
		gap: 4px;
		align-self: stretch;
		justify-content: center;
		border-radius: 3px;
		cursor: pointer;
		align-items: center;
		background: ${({ theme }) => theme.colors.white};
		color: ${({ theme }) => theme.colors.primary};
		font-size: 14px;

		svg {
			width: 14px;
			height: 14px;
		}

		&:hover {
			background: #f1f1f1;
		}
	}

	.dateContainer {
		position: relative;
		display: grid;
		grid-auto-flow: row;
		padding: 10px 15px;
		border-radius: 3px;
		cursor: pointer;
		position: relative;

		.dateTitle {
			font-size: 14px;
			color: ${({ theme }) => theme.colors.primary};
		}

		.dateValue {
			display: grid;
			grid-auto-flow: column;
			align-items: center;

			.day {
				display: grid;
				align-items: center;
				justify-content: center;
				font-size: 40px;
				color: ${({ theme }) => theme.colors.secondary};
			}

			.monthYear {
				display: grid;
				height: fit-content;
				grid-auto-flow: row;
				justify-content: center;
				align-items: center;
				font-size: 15px;
				color: ${({ theme }) => theme.colors.secondary};
			}

			.month,
			.year {
				display: grid;
				justify-content: center;
			}
		}

		.datePicker {
			position: absolute;
		}
	}

	.departure {
		background: ${({ theme }) => theme.colors.white};
	}

	.return {
		background: #f1f1f1;
	}
`

const CloseButton = styled(ButtonBase)`
	position: absolute;
	display: grid;
	justify-content: center;
	align-items: center;
	top: 5px;
	right: 5px;
	background: transparent;
	width: 20px;
	height: 20px;
	padding: 0;
	margin: 0;

	svg {
		width: 20px;
		height: 20px;

		[stroke] {
			stroke: ${({ theme }) => theme.colors.gray500} !important;
		}
		[fill] {
			fill: ${({ theme }) => theme.colors.gray500} !important;
		}
	}
`

export default FlightDates
