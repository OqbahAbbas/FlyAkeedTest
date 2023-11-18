import { Skeleton } from '@mui/material'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./Map'), {
	ssr: false,
	loading: () => <Skeleton width="100%" height={400} />,
})

export default Map
