import Paper, { PaperProps } from '@mui/material/Paper'
import styled from '@emotion/styled'
import { FC, forwardRef } from 'react'
import { rgba } from 'polished'

const PaperComponent: FC<PaperProps> = forwardRef((props, ref) => (
	<StyledPaper
		{...{
			ref,
		}}
		{...props}
	/>
))

const StyledPaper = styled(Paper)`
	&&& {
		padding: 8px;
		border-radius: 8px !important;
		border: 0;
		box-shadow: 0 4px 12px ${({ theme }) => rgba(theme.colors.black, 0.4)}!important;
	}
`

export default PaperComponent
