// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: import('lucia').User | null
		session: import('lucia').Session | null
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface ModelNodeData {
	datasetInfo: {
		id: string
		out_features: Array<{ name: string; dtype: string }>
		in_features: Array<{ name: string; dtype: string }>
		author: string
	}
}

interface DatasetNodeData {
	datasetInfo: {
		id: string
		features: Array<{ name: string; dtype: string }>
		author: string
	}
}
