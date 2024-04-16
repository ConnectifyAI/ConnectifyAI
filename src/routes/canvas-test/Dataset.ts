import { writable } from 'svelte/store'
import { type Node, type Edge } from '@xyflow/svelte'
import type { Dataset } from '$lib/server/hf/dataset'
import { DatasetNode, ModelNode } from '$components/Node'

export const bgColor = writable('#1A192B')

// INITIAL NODES AND EDGES
const initialNodes: Node[] = [
	{
		id: 'dataset-1',
		type: 'datasetNode',
		data: {
			datasetInfo: {
				id: 'testing dataset',
				features: [
					{ name: 'output-1', dtype: 'int' },
					{ name: 'output-2', dtype: 'int' }
				],
				author: 'me'
			}
		},
		style: 'border: 1px solid #999; padding: 10px;',
		position: { x: 0, y: 50 }
	},
	{
		id: 'dataset-2',
		type: 'datasetNode',
		data: {
			datasetInfo: {
				id: 'testing dataset 2',
				features: [{ name: 'output-2', dtype: 'int' }],
				author: 'me'
			}
		},
		style: 'border: 1px solid #999; padding: 10px;',
		position: { x: 0, y: 350 }
	},
	{
		id: 'model-1',
		type: 'modelNode',
		data: {
			datasetInfo: {
				id: 'testing model',
				out_features: [
					{ name: 'output-1', dtype: 'string' },
					{ name: 'output-2', dtype: 'int' }
				],
				in_features: [
					{ name: 'input-1', dtype: 'string' },
					{ name: 'input-2', dtype: 'string' }
				],
				author: 'me'
			}
		},
		position: { x: 500, y: 50 }
	}
]

const initialEdges: Edge[] = [
	{
		id: 'e_d1-m1',
		source: 'dataset-1',
		sourceHandle: 'output-1',
		target: 'model-1',
		targetHandle: 'input-1',

		type: 'smoothstep',
		animated: true,
		style: 'stroke: #fff;'
	}
]

// DEFAULT CONFIG
export const nodeTypes = {
	datasetNode: DatasetNode,
	modelNode: ModelNode
}

export const defaultNodeOptions = {
	type: 'datasetNode',
	data: {},

	style: 'border: 1px solid #777; padding: 10px;',
	position: { x: 300, y: 200 }
}

export const defaultEdgeOptions = {
	type: 'smoothstep',
	animated: true,
	interactionWidth: 50
}

// UTIL FUNCTIONS
export const onDragOver = (event: DragEvent) => {
	event.preventDefault()

	if (event.dataTransfer) {
		event.dataTransfer.dropEffect = 'move'
	}
}

// NODE AND EDGES FUNCTION
export const addNode = (datasetInfo: Dataset) => {
	// use built in updateNode
	nodes.update((nodes) => [
		...nodes,
		{
			id: Date.now().toString(),
			type: 'datasetNode',
			data: { datasetInfo },
			style: 'border: 1px solid #777; padding: 10px;',
			position: { x: 300, y: 200 }
		}
	])
}

// export const deleteNode = (id: string) => {
// use built in node destory
// };

export const nodes = writable<Node[]>(initialNodes)
export const edges = writable(initialEdges)
