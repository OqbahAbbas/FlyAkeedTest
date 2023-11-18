const footer = {
	keyFinderDescription:
		'KeyFinder is a Syria-based digital marketplace that aims to provide users with better car and property (buying, selling, and renting) experiences.',
	lists: [
		{
			title: 'Areas',
			options: ['Damascus', 'Aleppo', 'Latakia', 'Daraa', 'Hama', 'Homs'],
		},
		{
			title: 'Recommendations',
			options: ['Malki', 'Mazzeh', 'Barzeh', 'Reken Aldeen'],
		},
		{
			title: 'Latest Developers',
			options: ['EY', 'ItLand', 'TW'],
		},
	],
	ready: () => (
		<>
			<span className="primary">Ready to try </span>
			<span className="secondary">KeyFinder</span>
		</>
	),
	copyRight: '© Copyright',
	keyFinder: 'KeyFinder',
}

export default footer
