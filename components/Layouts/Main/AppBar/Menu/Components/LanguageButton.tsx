import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { useRecoilValue } from 'recoil'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const LanguageButton = () => {
	const { en, ar } = useRecoilValue(LabelsAtom).layout.header.language
	const router = useRouter()
	const locale = router.locale ?? 'en'
	return (
		<StyledButton
			color="primary"
			variant="text"
			size="large"
			onClick={() => {
				const updatedUrl = `/${locale === 'en' ? 'ar' : 'en'}${router.asPath}`
				if (window) window.location.href = updatedUrl
			}}
		>
			{locale === 'en' ? ar : en}
		</StyledButton>
	)
}

const StyledButton = styled(Button)`
	margin-left: 8px;
	text-transform: none !important;
	border-radius: 45%;
	color: ${({ theme }) => theme.colors.white} !important;
	font-size: 12px;

	&:hover {
		background: ${({ theme }) => theme.colors.primary};
	}
`

export default LanguageButton
