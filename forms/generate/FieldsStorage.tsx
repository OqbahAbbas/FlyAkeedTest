import { ComponentType } from 'react'
import { SomeObject } from '@admixltd/admix-component-library'
import { IField } from '@forms/generate/types/IField'
import RegularInput from '@forms/components/RegularInput/RegularInput'
import PasswordInput from '@forms/components/PasswordInput/PasswordInput'
import Block from '@forms/components/Block/Block'
import CheckBox from '@forms/components/CheckBox/CheckBox'
import Switch from '@forms/components/Switch/Switch'
import NumericInput from '@forms/components/NumericInput/NumericInput'
import PercentageInput from '@forms/components/PercentageInput/PercentageInput'
import AutocompleteMultipleClientSide from '@forms/components/Autocomplete/Multiple/ClientSide/AutocompleteMultipleClientSide'
import TextArea from '@forms/components/TextArea/TextArea'
import AutocompleteMultipleAsync from '@forms/components/Autocomplete/Multiple/Async/AutocompleteMultipleAsync'
import AutocompleteSingleAsync from '@forms/components/Autocomplete/Single/Async/AutocompleteSingleAsync'
import Slider from '@forms/components/Slider/Slider'
import Map from '@forms/components/Map'
import DropZone from '@forms/components/DropZone/DropZone'
import RadioGroup from '@forms/components/RadioButton/RadioGroup'
import MultiImage from '@forms/components/MultiImage/MultiImage'

const FieldsStorage: SomeObject<ComponentType<IField>> = {
	PasswordInput,
	RegularInput,
	Block,
	CheckBox,
	Switch,
	Slider,
	NumericInput,
	PercentageInput,
	AutocompleteMultipleClientSide,
	TextArea,
	AutocompleteMultipleAsync,
	AutocompleteSingleAsync,
	Map,
	DropZone,
	RadioGroup,
	MultiImage,
}

export default FieldsStorage
