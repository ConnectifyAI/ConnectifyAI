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
	repoId: string
	outFeatures: Array<Feature>
	inFeatures: Array<Feature>
	author: string
}

interface DatasetNodeData {
	repoId: string
	outFeatures: Array<Feature>
	author: string
}

interface Feature {
	label: string
	dtype: string
	isSelected: boolean
}
