import styled from '@emotion/styled'
import React from 'react'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import BaseContainer from '@components/Layouts/Main/Container'
import { ReactComponent as Logo } from '@svg/layout/Footer/logo.svg'
import { ReactComponent as EmailIcon } from '@svg/layout/Footer/email.svg'
import { ReactComponent as FacebookIcon } from '@svg/layout/Footer/facebook.svg'
import { ReactComponent as InstaIcon } from '@svg/layout/Footer/insta.svg'
import { ReactComponent as LinkedinIcon } from '@svg/layout/Footer/linkedin.svg'
import { ReactComponent as YoutubeIcon } from '@svg/layout/Footer/youtube.svg'
import dayjs from 'dayjs'

const Footer = () => {
	const { keyFinderDescription, lists, copyRight, keyFinder, ready } =
		useRecoilValue(LabelsAtom).layout.footer
	return (
		<Container>
			<UpperSection>
				<LogoSection>
					<Logo />
					<p>{keyFinderDescription}</p>
				</LogoSection>
				<DetailsSection>
					{lists.map(list => (
						<div className="listContainer" key={list.title}>
							<h2>{list.title}</h2>
							{list.options.map(option => (
								<p key={option}>{option}</p>
							))}
						</div>
					))}
				</DetailsSection>
			</UpperSection>
			<LowerSection>
				<div className="copyRights">
					<div className="iconsContainer">
						<EmailIcon />
						<FacebookIcon />
						<InstaIcon />
						<YoutubeIcon />
						<LinkedinIcon />
					</div>
					<div className="copyRightText">
						{copyRight} {dayjs().year()} - {keyFinder}
					</div>
				</div>
				<div>{ready()}</div>
			</LowerSection>
		</Container>
	)
}

const Container = styled(BaseContainer)`
	width: 100%;
	padding: 40px 100px;
	background: ${({ theme }) => theme.colors.gray100};

	display: grid;
	gap: 100px;
`

const UpperSection = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 75px;
	grid-template-columns: 300px 1fr;

	svg {
		width: 148px;
		height: 60px;
	}

	${({ theme }) => theme.adaptive.md} {
		grid-auto-flow: row;
		grid-template-columns: 1fr;
		gap: 30px;
	}
`

const LowerSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	${({ theme }) => theme.adaptive.md} {
		flex-direction: column;
		gap: 30px;
	}

	.copyRights {
		display: grid;
		gap: 12px;

		.iconsContainer {
			display: grid;
			grid-auto-flow: column;
			gap: 8px;

			${({ theme }) => theme.adaptive.xxs} {
				grid-auto-flow: row;
				justify-content: center;
				gap: 16px;
			}

			svg {
				width: 30px;
				height: 30px;

				[stroke] {
					stroke: ${({ theme }) => theme.colors.gray500} !important;
				}
				[fill] {
					fill: ${({ theme }) => theme.colors.gray500} !important;
				}
			}
		}

		.copyRightText {
			font-weight: 300;
			font-size: 14px;
			line-height: 14px;
			color: ${({ theme }) => theme.colors.gray500};

			${({ theme }) => theme.adaptive.xxs} {
				text-align: center;
			}
		}
	}

	.primary {
		font-weight: 700;
		font-size: 27.464px;
		line-height: 33px;
		color: ${({ theme }) => theme.colors.primary};
	}

	.secondary {
		font-weight: 700;
		font-size: 27.464px;
		line-height: 33px;
		color: ${({ theme }) => theme.colors.secondary};
	}
`

const LogoSection = styled.div`
	display: grid;
	gap: 24px;

	p {
		font-weight: 400;
		font-size: 16px;
		color: ${({ theme }) => theme.colors.gray600};
	}
`

const DetailsSection = styled.div`
	display: grid;
	grid-auto-flow: column;

	${({ theme }) => theme.adaptive.md} {
		grid-auto-flow: row;
		gap: 30px;
	}

	.listContainer {
		h2 {
			font-weight: 600;
			font-size: 16px;
			color: ${({ theme }) => theme.colors.black};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100px;
		}

		p {
			font-weight: 400;
			font-size: 16px;
			color: ${({ theme }) => theme.colors.gray600};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100px;
		}
	}
`

export default Footer
