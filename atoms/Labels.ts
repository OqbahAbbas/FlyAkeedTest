import { atom } from 'recoil'
import labels from '@labels'

export const LabelsCookieName = `Labels`

const LabelsAtom = atom<(typeof labels)['en']>({
	key: 'Labels',
	default: labels.en,
})

export default LabelsAtom
