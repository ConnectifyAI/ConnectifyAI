type NodeType = 'datasetNode' | 'modelNode'

interface Author {
	id: string
	provider: string
	providerId: string
	firstName: string
	lastName: string
	isAdmin: boolean
	email: string
}

interface Feature {
	id?: string | undefined
	parentNodeId: string
	isSelected: boolean
	label: string
	dtype: string
}

interface Node {
	id: string
	repoId: string
	displayName: string
	parentGraphId: string
	//@ts-ignore nodeType is alr refined, dw abt it
	type: NodeType
	posX: number
	posY: number
	inFeatures: Feature[]
	outFeatures: Feature[]
}

interface Edge {
	id: string
	parentGraphId: string
	sourceNodeId: string
	targetNodeId: string
	sourceFeatureId: string
	targetFeatureId: string
	sourceFeature: Feature
	targetFeature: Feature
}

interface Graph {
	id: string
	authorId: string
	likes: number
	forks: number
	name: string
	author: Author
	nodes: Node[]
	edges: Edge[]
}
