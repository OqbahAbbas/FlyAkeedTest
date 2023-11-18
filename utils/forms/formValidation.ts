import { handleBlur, SomeObject } from '@admixltd/admix-component-library'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import formFieldsValidation from './formFieldsValidation'

interface IFormValidation {
	data: SomeObject<IFieldValue>
	dataPrefix: string
	fieldsList?: string[]
}

const formValidation = async ({ data, dataPrefix, fieldsList }: IFormValidation) => {
	handleBlur()
	const validationFields: string[] = fieldsList ?? []
	if (!fieldsList) Object.keys(data).forEach(key => validationFields.push(key))

	const valid = await formFieldsValidation({
		fieldsList: validationFields,
		dataPrefix,
	})

	return valid
}

export default formValidation
