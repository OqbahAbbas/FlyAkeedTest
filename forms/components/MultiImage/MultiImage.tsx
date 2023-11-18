/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from 'react'
import { IField } from '@forms/generate/types/IField'
import styled from '@emotion/styled'
import { FileRejection, useDropzone } from 'react-dropzone'
import { ReactComponent as CameraIcon } from '@svg/camera.svg'
import { ReactComponent as CloseIcon } from '@svg/close.svg'
import { Button as ACLButton, Button, handleBlur } from '@admixltd/admix-component-library'
import { Snackbar } from '@admixltd/admix-component-library/Snackbar'
import { buttonBaseClasses } from '@mui/material'
import { AttachmentFile } from '@api/Types/General'
import { IFieldValue } from '@forms/generate/types/IFieldValue'
import { IMultiImage } from './IMultiImage'

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

const MultiImage: FC<IField> = ({ field, value, handleChange, error }) => {
	const [images, setImages] = useState<AttachmentFile[]>(value ? (value as AttachmentFile[]) : [])
	field = field as IMultiImage
	const { label, textError, requiredLabel, height, ...other } = field.props ?? {}

	const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
		if (fileRejections.length) {
			Snackbar.error(textError)
			return
		}
		if (acceptedFiles.length) {
			preview(acceptedFiles)
			handleChange(
				name,
				(value
					? [...(value as (File | AttachmentFile)[]), ...acceptedFiles]
					: acceptedFiles) as IFieldValue
			)
		}
		handleBlur()
	}

	useEffect(() => {
		const fileImages = images.filter(img => !img.id)
		const attachedImages = images.filter(img => img.id)
		Promise.all(fileImages.map(image => fileBase64(image as unknown as File))).then(
			base64Data => {
				const base64Images: AttachmentFile[] = base64Data.map(elem => ({
					id: 0,
					lowResolutionPhotoUrl: elem as string,
					url: elem as string,
				}))
				setImages([...base64Images, ...attachedImages])
			}
		)
	}, [])

	const handleRemoveImage = (index: number) => {
		const copyImages = [...images]
		copyImages.splice(index, 1)
		setImages(copyImages)
		const copyValue = [...(value as (AttachmentFile | File)[])]
		copyValue.splice(index, 1)
		handleChange(name, copyValue)
	}

	const preview = async (imageSrc: File[]) => {
		Promise.all(imageSrc.map(image => fileBase64(image))).then(base64Data => {
			const base64Images: AttachmentFile[] = base64Data.map(elem => ({
				id: 0,
				lowResolutionPhotoUrl: elem as string,
				url: elem as string,
			}))
			setImages([...images, ...base64Images])
		})
	}

	const { open, getRootProps, getInputProps } = useDropzone({
		onDrop,
		...other,
	})
	const { name = '' } = field
	return (
		<Container borderColor={error ? 'error' : ''}>
			<ImagesContainer>
				<DropzoneContainer
					{...getRootProps()}
					onClick={open}
					variant="outlined"
					color={error ? 'error500' : 'gray300'}
				>
					<input {...getInputProps()} />
					<CameraIcon />
				</DropzoneContainer>
				{images &&
					images.map((image, index) => (
						<div className="image" key={Math.random()}>
							<img src={image.url} width={200} height={150} alt={index.toString()} />
							<Button className="close" onClick={() => handleRemoveImage(index)}>
								<CloseIcon />
							</Button>
						</div>
					))}
			</ImagesContainer>
			<Error>{error}</Error>
		</Container>
	)
}

const Container = styled.div<{ borderColor: string }>`
	display: grid;
	grid-auto-flow: row;
	width: fit-content;
	border-color: ${({ borderColor }) => borderColor};
`

const ImagesContainer = styled.div`
	display: grid;
	grid-auto-flow: column;
	align-items: center;
	height: 170px;
	gap: 16px;
	max-width: 100%;
	overflow-x: auto;

	img {
		border-radius: 8px !important;
	}

	.image {
		position: relative;
		width: fit-content;
		height: fit-content;
		
		.${buttonBaseClasses.root} {
			padding: 0;
		}
	}

	.close {
		position: absolute;
		top: 8px;
		right: 8px;
		cursor: pointer;

		svg {
			height: 20px;
			width: 20px;

			[stroke] {
				stroke: ${({ theme }) => theme.colors.gray300};
			}

			[fill] {
				fill: ${({ theme }) => theme.colors.gray300};
			}
		}
	}

	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
	  display: none;
`

const DropzoneContainer = styled(ACLButton)<{
	height: string
	color: string
}>`
	width: 200px;
	height: 150px;
	border-radius: 8px !important;

	.${buttonBaseClasses.root} {
		border-radius: 8px;
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

const Error = styled.div`
	color: ${({ theme }) => theme.colors.error};
	font-weight: 500;
	font-size: 11px;
	line-height: 150%;
	letter-spacing: unset;
	padding-left: 0;
	margin-left: 0;
	margin-top: 4px;
	margin-right: 0;
`

export default MultiImage
