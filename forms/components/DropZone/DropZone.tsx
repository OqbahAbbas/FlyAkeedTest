import { FC, useState } from 'react'
import { IField } from '@forms/generate/types/IField'
import styled from '@emotion/styled'
import { FileRejection, useDropzone } from 'react-dropzone'
import { Button as ACLButton } from '@admixltd/admix-component-library'
import { ReactComponent as UploadIcon } from '@svg/addPhoto.svg'
import theme, { ITheme } from '@styles/theme'
import { Avatar } from '@mui/material'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { IDropZone } from './IDropZone'

const fileBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.onerror = reject
		fileReader.onload = () => {
			const base64 = fileReader.result?.toString()
			resolve(base64)
		}
		fileReader.readAsDataURL(file)
	})

const ImagesComponent: FC<IField> = ({ field, value, handleChange, error }) => {
	const [images, setImages] = useState<string[]>(value as string[])
	field = field as IDropZone
	const { label, mainText, extraText, textError, requiredLabel, height, ...other } =
		field.props ?? {}

	const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
		if (fileRejections.length) {
			Snackbar.error(textError)
			return
		}
		if (acceptedFiles.length) {
			preview(acceptedFiles)
			handleChange(name, acceptedFiles)
		}
	}

	const preview = async (imageSrc: File[]) => {
		Promise.all(imageSrc.map(image => fileBase64(image))).then(base64Data =>
			setImages(base64Data as string[])
		)
	}

	const { open, getRootProps, getInputProps } = useDropzone({
		onDrop,
		...other,
	})
	const { name = '' } = field
	return (
		<>
			<DropzoneContainer
				{...getRootProps()}
				onClick={open}
				variant="text"
				height={`${height}px`}
				color={error ? 'error500' : 'gray300'}
			>
				<input {...getInputProps()} />
				<LabelContainer $color={error ? 'error500' : undefined}>
					{label}
					{requiredLabel && <RequiredLabel>*</RequiredLabel>}
				</LabelContainer>
				{(!images || !images[0]) && (
					<div>
						<UploadIcon />
						{mainText && <MainText>{mainText}</MainText>}
						{extraText && <ExtraText>{extraText}</ExtraText>}
					</div>
				)}
				{/*
					To implement a multi image preview
				*/}
				{images && images[0] && <StyledAvatar src={images[0]} />}
			</DropzoneContainer>
			<Error>{error}</Error>
		</>
	)
}

const LabelContainer = styled.div<{
	$color?: keyof ITheme['colors']
}>`
	position: absolute;
	display: flex;
	top: -34px;
	left: -24px;
	font-size: 11px;
	color: ${({ $color = 'gray500' }) => theme.colors[$color]};
	font-weight: 500;
	background-color: ${() => theme.colors.gray100} !important;
	padding: 0 8px;
`

const RequiredLabel = styled.div`
	color: ${() => theme.colors.error};
	font-weight: bold;
	line-height: 36px;
	padding-left: 3px;
	font-size: 8px;
`

const DropzoneContainer = styled(ACLButton)<{
	height: string
	color: string
}>`
	width: 100%;
	height: ${({ height }) => height};
	border: 1px dashed ${({ color }) => theme.colors[color]};
	border-radius: 4px;

	&:hover {
		background-color: ${() => theme.colors.gray100} !important;
	}

	> div {
		width: 100%;
		height: 100%;
		padding: 16px;
		> span {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
		}
	}

	svg {
		margin: 0 auto;
		width: 30px;
	}
`

const MainText = styled.div`
	color: ${() => theme.colors.text};
	font-weight: 500;
	font-size: 14px;
	line-height: 15px;
	margin-bottom: 4px;
`

const ExtraText = styled.div`
	color: ${() => theme.colors.gray500};
	font-weight: 500;
	font-size: 13px;
	line-height: 13px;
`

const StyledAvatar = styled(Avatar)`
	width: 100%;
	height: 100%;
	border-radius: 4px;
	padding: 4px;
	& > img {
		object-fit: contain;
	}
`

const Error = styled.div`
	color: ${() => theme.colors.error};
	font-weight: 500;
	font-size: 11px;
	line-height: 150%;
	letter-spacing: unset;
	padding-left: 0;
	margin-left: 0;
	margin-top: 4px;
	margin-right: 0;
`

export default ImagesComponent
