/* eslint-disable react/no-danger */
import { fontLoader } from '@admixltd/admix-component-library'
import { BASE_PATH } from '@constants/envs'
import { useMemo } from 'react'

const fontFile = `${BASE_PATH}/fonts.css`
const fontFamily = `Poppins`
const Fonts = () =>
	useMemo(
		() => (
			<script
				dangerouslySetInnerHTML={{
					/**
					 * Save font into localstorage for fast refresh
					 */
					__html: fontLoader({ fontFile, fontFamily }),
				}}
			/>
		),
		[]
	)

export default Fonts
