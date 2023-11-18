import { Button } from '@admixltd/admix-component-library'
import styled from '@emotion/styled'
import { Dialog, DialogProps, paperClasses } from '@mui/material'
import { useState } from 'react'
import { ReactComponent as ModalCloseIcon } from '@svg/close.svg'

export enum ModalTypes {
	delete = 'delete',
	confirm = 'confirm',
}

export interface ModalProps extends DialogProps {
	type: ModalTypes
	labels: {
		title: string
		description: string
		cancel: string
		confirm: string
	}
	onConfirm: () => Promise<boolean>
}

const Modal = (props: ModalProps) => {
	const [loading, setLoading] = useState(false)

	const { onClose, type, labels, onConfirm, ...other } = props

	const handleClose = () => onClose?.({}, 'escapeKeyDown')

	return (
		<StyledDialog {...other}>
			<IconContainer>
				<ModalCloseIcon onClick={handleClose} />
			</IconContainer>
			<div className="heading">{labels.title}</div>
			<div className="body">
				<p>{labels.description}</p>
				<ActionsContainer>
					<Button
						size="large"
						color="gray500"
						variant="contained"
						round
						onClick={handleClose}
					>
						{labels.cancel}
					</Button>
					<Button
						size="large"
						variant="contained"
						round
						loading={loading}
						onClick={async () => {
							setLoading(true)
							const result = await onConfirm()
							setLoading(false)
							if (result) handleClose()
						}}
						color={type === ModalTypes.delete ? 'error' : 'primary'}
					>
						{labels.confirm}
					</Button>
				</ActionsContainer>
			</div>
		</StyledDialog>
	)
}

const StyledDialog = styled(Dialog)`
	.${paperClasses.root} {
		border-radius: 12px;
		max-width: 680px;
		width: 100%;
	}

	.heading {
		padding: 33px 28px;
		font-weight: 600;
		font-size: 18px;
		line-height: 22px;
		color: ${({ theme }) => theme.colors.gray800};
		border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
	}

	.body {
		padding: 24px 28px;

		.description {
			font-weight: 500;
			font-size: 14px;
			line-height: 17px;
			color: ${({ theme }) => theme.colors.gray800};
		}
	}
`

const IconContainer = styled.div`
	position: absolute;
	top: 35px;
	right: 28px;
	svg {
		width: 20px;
		height: 20px;
		cursor: pointer;
		[fill]:not([fill='none']) {
			fill: ${({ theme }) => theme.colors.gray500};
		}
		[stroke] {
			stroke: ${({ theme }) => theme.colors.gray500};
		}
	}
`

const ActionsContainer = styled.div`
	display: flex;
	gap: 8px;
	justify-content: flex-end;
	width: 100%;
	margin-top: 24px;
`

export default Modal
