import styled from '@emotion/styled'

const Header = styled.div`
	display: grid;
	gap: 16px;

	h2,
	h1 {
		margin: 0;
		color: ${({ theme }) => theme.colors.text};
		font-size: 60px;

		line-height: 87px;

		${({ theme }) => theme.adaptive.md} {
			font-size: 40px;
			line-height: 58px;
		}

		${({ theme }) => theme.adaptive.sm} {
			line-height: 41px;
		}

		text-align: center;
		font-weight: 700;

		span {
			color: ${({ theme }) => theme.colors.primary};
		}
	}

	p {
		color: #9e9dab;
		line-height: 117%;
		font-weight: 400;
		font-size: 24px;
		text-align: center;

		${({ theme }) => theme.adaptive.md} {
			font-size: 18px;
		}

		margin: 0 auto;
	}
`

export default Header
