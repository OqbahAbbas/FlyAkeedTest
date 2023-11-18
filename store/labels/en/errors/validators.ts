import { Validators } from '@forms'
import pluralize from 'pluralize'

export default {
	arrayMax: (value: string | number) =>
		`Please select ${value} less ${pluralize('value', Number(value))}`,
	arrayMin: (value: string | number) =>
		`Please select ${value} more ${pluralize('value', Number(value))}`,
	digitsOnly: 'Please use digits only',
	email: 'Please enter a valid email',
	includeDigits: (value: string | number) =>
		`Please add ${value} ${pluralize('digit', Number(value))}`,
	includeSpecialCharacters: (value: string | number) =>
		`Please add ${value} special ${pluralize('symbol', Number(value))} or a capital ${pluralize(
			'letter',
			Number(value)
		)}`,
	maxLength: (value: string | number) =>
		`Should be ${value} maximum ${pluralize('character', Number(value))} long`,
	maxValue: (value: string | number) => `Please specify value less then ${value}`,
	minLength: (value: string | number) => `Should be ${value} minimum characters long`,
	minValue: (value: string | number) => `Please specify value more then ${value}`,
	positiveDigitsOnly: 'Please use only positive numbers',
	required: `Please fill it out`,
	dateValid: 'This date is invalid',
	dateShouldBeBefore: (value: string | number) => `This date should be before ${value}`,
	dateShouldBeAfter: (value: string | number) => `This date should be after ${value}`,
	countryCode: 'Please add a valid country code',
	url: 'Please use a valid url',
	noZeroFirst: `Shouldn't start with zero`,
} as unknown as {
	[key in Validators]: string | ((value?: string | number) => string)
}
