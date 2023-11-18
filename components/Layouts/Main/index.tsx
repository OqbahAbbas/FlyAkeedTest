/* eslint-disable @next/next/next-script-for-ga,react/no-danger */
import { FC, PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import AppBar from '@components/Layouts/Main/AppBar'

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
	<StyledLayout>
		<AppBar />
		<Content>{children}</Content>
	</StyledLayout>
)

const Content = styled.div`
	flex-grow: 2;
	margin-top: 61px !important;
`
const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 2;
`

export default MainLayout
