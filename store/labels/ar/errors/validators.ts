import { Validators } from '@forms'
import pluralize from 'pluralize'

export default {
	arrayMax: (value: string | number) => `يجب اختيار ${value} خيارات على الأكثر`,
	arrayMin: (value: string | number) => `يجب اختيار ${value} خيارات على الأقل`,
	digitsOnly: 'يجب استخدام الأعداد فقط',
	email: 'يرجى إدخال بريد الكتروني ذو صيغة صحيحة',
	includeDigits: (value: string | number) => `يجب استخدام ${value} أرقام على الأقل`,
	includeSpecialCharacters: (value: string | number) =>
		`Please add ${value} special ${pluralize('symbol', Number(value))} or a capital ${pluralize(
			'letter',
			Number(value)
		)}`,
	maxLength: (value: string | number) => `يجب أن تكون القيمة بطول ${value} محارف على الأكثر`,
	maxValue: (value: string | number) => `يجب إدخال قيمة أصغر من ${value}`,
	minLength: (value: string | number) => `يجب أن تكون بطول ${value} محارف على الأقل`,
	minValue: (value: string | number) => `يجب إدخال قيمة أكبر من ${value}`,
	positiveDigitsOnly: 'يجب استخدام الأعداد الموجبة فقط',
	required: `يجب تعبئة هذا الحقل`,
	dateValid: 'هذا التاريخ غير صالح',
	dateShouldBeBefore: (value: string | number) => `يجب أن يكون التاريخ قبل ${value}`,
	dateShouldBeAfter: (value: string | number) => `يجب أن يكون التاريخ بعد ${value}`,
	countryCode: `يرجى استخدام صيغة صحيحة لرمز البلد`,
	url: `يرجى استخدام رابط ذو صيغة صحيحة`,
	noZeroFirst: `لا يجب أن يبدأ بصفر`,
} as unknown as {
	[key in Validators]: string | ((value?: string | number) => string)
}
