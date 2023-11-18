import { NextRouter, useRouter } from 'next/router'

interface Nexus {
	get: NextRouter
}

const nexus: Nexus = {
	get: {} as NextRouter,
}

export default function RouterNexus() {
	nexus.get = useRouter()
	return null
}

export function getRouter() {
	return nexus.get
}
