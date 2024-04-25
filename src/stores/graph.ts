import { type Node, type Edge } from '@xyflow/svelte'
import { writable, get } from 'svelte/store'
import { defaultEdgeOptions } from '$routes/proc/testing/Dataset'
// import { MarkerType } from '@xyflow/svelte'

export const nodes = writable<Node[]>([])
export const edges = writable<Edge[]>([])

export const graphId = writable<string>()
export const graphName = writable<string>()

export const pathMode = writable(false)
export const nodePath = writable<string[]>([])
export const edgePath = writable<string[]>([])

export const selectedNode = writable<string | null>(null)

export const deleteNode = (id: string) => {
	nodes.update((nodes) => nodes.filter((node) => node.id !== id))
	edges.update((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id))
}

export const removeEdgeToPath = (edgeId: string) => {
	edgePath.update((path) => path.filter((id) => id !== edgeId))
}

export const updateEdgePath = () => {
	const edgesArr = get(edges),
		nodePathArr = get(nodePath)
	let edgePathArr = get(edgePath)

	// updates edgePath and edge(s) styling
	let resetStyle = false
	edgesArr.forEach((edge) => {
		if (edgePathArr.includes(edge.id)) {
			const { id, target } = edge
			// if edge's target no longer in nodePath, remove edge from edgePath
			if (!nodePathArr.includes(target)) {
				edgePathArr = edgePathArr.slice(0, edgePathArr.indexOf(id))
				resetStyle = true
			}
		}

		if (resetStyle) {
			edge.style = defaultEdgeOptions.style
		}
	})
	edges.set(edgesArr)
	edgePath.set(edgePathArr)
}

// edges.subscribe((edges) => {
// 	console.log('edges updated', edges)
// 	const path = get(pathMode)
// 	if (!path)
// 		edges.forEach((edge) => {
// 			edge.style = 'stroke-width: 3px; stroke: #eee'
// 		})
// 	return edges
// })

nodes.set([
	{
		id: '1',
		type: 'modelNode',
		position: { x: 600, y: 200 },
		data: {
			repoId: 'huggingface/transformers',
			inFeatures: [
				{ label: 'question', dtype: 'string' },
				{ label: 'input...', dtype: 'string' }
			],
			outFeatures: [
				{ label: 'answer', dtype: 'string' },
				{ label: 'dogs', dtype: 'image' }
			],
			displayName: 'google-bert/bert-large-cased-whole-word-masking-finetuned-squad'
		}
	},
	{
		id: '2',
		type: 'modelNode',
		position: { x: 1100, y: 200 },
		data: {
			repoId: 'huggingface/transformers',
			inFeatures: [
				{ label: 'text', dtype: 'string' },
				{ label: 'input...', dtype: 'string' }
			],
			outFeatures: [
				{ label: 'result', dtype: 'string' },
				{ label: 'hyenas', dtype: 'image' }
			],
			displayName: 'google-bert/bert-large-cased-whole-word-masking-finetuned-squad'
		}
	},
	{
		id: '3',
		type: 'datasetNode',
		position: { x: 100, y: 200 },
		data: {
			repoId: 'openai/transformers',
			outFeatures: [
				{ label: 'result', dtype: 'string' },
				{ label: 'cats', dtype: 'image' }
			],
			displayName: 'random-dataset'
		}
	}
])

edges.set([
	{
		id: '3-1',
		source: '3',
		sourceHandle: 'result',
		target: '1',
		targetHandle: 'question'
	},
	{
		id: '1-2',
		source: '1',
		sourceHandle: 'answer',
		target: '2',
		targetHandle: 'text'
	}
])
