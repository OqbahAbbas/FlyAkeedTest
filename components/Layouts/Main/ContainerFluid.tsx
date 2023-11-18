import styled from '@emotion/styled'

const ContainerFluid = styled.div`
	position: relative;
	padding: 0 6rem;

	@media only screen and (min-width: 360px) and (max-width: ${425 - 0.02}px) {
		padding: 0 20px;
	}
	@media only screen and (min-width: 425px) and (max-width: ${768 - 0.02}px) {
		padding: 0 40px;
	}
	@media only screen and (min-width: 768px) and (max-width: ${900 - 0.02}px) {
		padding: 0 50px;
	}
	@media only screen and (min-width: 900px) and (max-width: ${1200 - 0.02}px) {
		padding: 0 60px;
	}
	@media only screen and (min-width: 1200px) and (max-width: ${1350 - 0.02}px) {
		padding: 0 90px;
	}
`

export default ContainerFluid
