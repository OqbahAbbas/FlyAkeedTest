import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { useRecoilValue } from 'recoil'
import { Button } from '@mui/material'

const LoginButton = () => {
	const { login } = useRecoilValue(LabelsAtom).layout.header
	return (
		<StyledButton color="inherit" variant="contained" size="large">
			{login}
		</StyledButton>
	)
}

const StyledButton = styled(Button)`
	margin-left: 8px;
	backgorund: #fff !important;
	text-transform: none !important;
	border-radius: 0;
	height: 100%;
	width: 120px;
	color: ${({ theme }) => theme.colors.primary};
	font-size: 12px;
`

export default LoginButton
