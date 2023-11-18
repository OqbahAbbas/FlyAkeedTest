import { FC } from 'react'
import { flexGap } from '@admixltd/admix-component-library'
import { IField } from '@forms/generate/types/IField'
import styled from '@emotion/styled'
import { ITheme } from '@styles/theme'
import { Slider as MUISlider, sliderClasses } from '@mui/material'
import { NumericInput } from '@admixltd/admix-component-library/NumericInput'
import { useRouter } from 'next/router'
import { ISlider } from './ISlider'

const Slider: FC<IField> = ({ field, index, handleChange, value }) => {
	const currentLocale = useRouter().locale ?? 'en'
	field = field as unknown as ISlider
	const { label, labelStyles, hideLabel, limits, mode, color, ...other } = field.props ?? {}
	const { name = '' } = field
	const min = limits && limits.length > 0 ? limits[0] : 0
	const max = limits && limits.length > 0 ? limits[1] : 1000000
	return (
		<SliderContainer locale={currentLocale}>
			<SliderContent locale={currentLocale} color={color as keyof ITheme['colors']}>
				{!hideLabel && <LabelContainer style={labelStyles}>{label}</LabelContainer>}
				<MUISlider
					valueLabelDisplay="auto"
					onChange={(_e: Event, newValue: number | number[]) => {
						handleChange(name, newValue)
					}}
					{...other}
					min={min}
					max={max}
					key={`${name}_${index}`}
					name={name}
					color={color ?? 'primary'}
					value={
						mode === 'single'
							? (value as number) ?? min
							: (value as number[]) ?? [min, max]
					}
				/>
			</SliderContent>
			{mode === 'single' && (
				<div className="inputs">
					<NumericInput
						value={(value as number) ?? min}
						color={color ?? 'primary'}
						onBlur={e => {
							let val = parseInt(e.target.value, 10)
							if (val < min || val > max) val = min
							handleChange(name, val)
						}}
					/>
				</div>
			)}
			{mode === 'double' && (
				<div className="inputs">
					<NumericInput
						value={Array.isArray(value) ? (value[0] as number) : min}
						color={color ?? 'primary'}
						onBlur={e => {
							let val = parseInt(e.target.value, 10)
							if (val < min || val > max) val = min
							handleChange(name, [
								val,
								Array.isArray(value) ? (value[1] as number) : max,
							] as number[])
						}}
					/>
					<NumericInput
						value={Array.isArray(value) ? (value[1] as number) : max}
						color={color ?? 'primary'}
						onBlur={e => {
							let val = parseInt(e.target.value, 10)
							if (val < min || val > max) val = max
							handleChange(name, [
								Array.isArray(value) ? (value[0] as number) : min,
								val,
							] as number[])
						}}
					/>
				</div>
			)}
		</SliderContainer>
	)
}

const LabelContainer = styled.div<{
	$color?: keyof ITheme['colors']
}>`
	color: ${({ theme, $color = 'text' }) => theme.colors[$color]};
`
const SliderContent = styled.div<{ color?: keyof ITheme['colors']; locale?: string }>`
	align-items: center;
	justify-content: center;
	text-align: center;

	margin-left: ${({ locale }) => (locale === 'ar' ? '0' : 'none')} !important;
	${({ theme }) => flexGap(theme.slider.labelGap)}

	.${sliderClasses.root} {
		width: 90%;
		color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.primary)};
	}

	.${sliderClasses.thumb} {
		margin-right: -10px;
	}
`

const SliderContainer = styled.div<{ locale?: string }>`
	display: grid;

	.inputs {
		display: grid;
		margin-top: 16px;
		grid-auto-flow: column;
		gap: 16px;

		direction: ${({ locale }) => (locale === 'ar' ? 'rtl' : 'ltr')};
	}
`

export default Slider
