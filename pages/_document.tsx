import Document, { Head, Html, Main, NextScript } from 'next/document'
import Fonts from '@components/Layouts/Fonts'
import { isProd } from '@constants/envs'

export default class MyDocument extends Document {
	render() {
		const { locale } = this.props
		const dir = locale === 'ar' ? 'rtl' : 'ltr'
		return (
			<Html dir={dir}>
				<Head>
					{!isProd && <meta name="robots" content="noindex" />}
					<Fonts />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
