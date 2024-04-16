import { writable } from 'svelte/store'
import { Position, type Node, type Edge } from '@xyflow/svelte'
import type { Dataset } from '$lib/server/hf/dataset'
import { DatasetNode, ModelNode } from '$components/Node'

export const bgColor = writable('#1A192B')

// INITIAL NODES AND EDGES
const initialNodes: Node[] = [
	{
		id: '1',
		type: 'modelNode',
		data: {
			datasetInfo: {
				id: 'testing model',
				out_features: [
					{ name: 'model_out_feature', dtype: 'string' },
					{ name: 'dataset out 2', dtype: 'int' }
				],
				in_features: [{ name: 'model_in_feature', dtype: 'string' }],
				author: 'me'
			}
		},
		position: { x: 0, y: 50 },
		sourcePosition: Position.Right
	},
	{
		id: '2',
		type: 'datasetNode',
		data: {
			datasetInfo: {
				id: 'testing dataset',
				features: [{ name: 'dataset name', dtype: 'int' }],
				author: 'me'
			}
		},
		style: 'border: 1px solid #999; padding: 10px;',
		position: { x: 300, y: 50 }
	}
]

const initialEdges: Edge[] = [
	{
		id: 'e1-2',
		type: 'smoothstep',
		source: '1',
		target: '2',
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