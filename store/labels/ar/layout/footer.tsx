const footer = {
	keyFinderDescription:
		'كي فايندر هو سوق رقمية تنشط في سوريا، وتهدف لتزويد مستخدميها بأفضل العروض بما يخص السيارات والعقارات (شراء وبيع وأجار).',
	lists: [
		{
			title: 'المناطق',
			options: ['دمشق', 'حلب', 'اللاذقية', 'درعا', 'حماه', 'حمص'],
		},
		{
			title: 'الترشيحات',
			options: ['المالكي', 'المزة', 'برزة', 'ركن الدين'],
		},
		{
			title: 'آخر المنضمين',
			options: ['EY', 'ItLand', 'TW'],
		},
	],
	ready: () => (
		<>
			<span className="primary">جاهز تجرّب </span>
			<span className="secondary">كي فايندر</span>
		</>
	),
	copyRight: '© حقوق النشر',
	keyFinder: 'كي فايندر',
}

export default footer
