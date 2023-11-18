import global from './global'
import dashboard from './pages/dashboard'
import header from './layout/header'
import footer from './layout/footer'
import flights from './pages/flights'

const labels = {
	global,
	pages: {
		dashboard,
		flights,
	},
	layout: {
		header,
		footer,
	},
}

export default labels
