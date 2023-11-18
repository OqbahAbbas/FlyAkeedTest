import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { useRecoilValue } from 'recoil'
import { Button } from '@mui/material'

const CorporateButton = () => {
	const { corporate } = useRecoilValue(LabelsAtom).layout.header
	return (
		<StyledButton color="primary" variant="contained" size="large">
			{corporate}
		</StyledButton>
	)
}

const StyledButton = styled(Button)`
	margin-left: 8px;
	text-transform: none !important;
	border-radius: 0;
	height: 100%;
	width: 120px;
	color: ${({ theme }) => theme.colors.white};
	font-size: 12px;
`

export default CorporateButton
