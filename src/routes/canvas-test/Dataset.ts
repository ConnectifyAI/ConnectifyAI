import { writable } from 'svelte/store'
import { type Node, type Edge } from '@xyflow/svelte'
import type { Dataset } from '$lib/server/hf/dataset'
import { DatasetNode, ModelNode } from '$components/Node'

export const bgColor = writable('#1A192B')

// INITIAL NODES AND EDGES
export const nodes = writable<Node[]>([
	{
		id: 'dataset-1',
		type: 'datasetNode',
		data: {
			repoId: 'testing dataset',
			outFeatures: [
				{ label: 'output-1', dtype: 'int', isSelected: true },
				{ label: 'output-2', dtype: 'int', isSelected: false }
			],
			author: 'me'
		},
		style: 'border: 1px solid #999; padding: 10px;',
		position: { x: 0, y: 50 }
	},
	{
		id: 'dataset-2',
		type: 'datasetNode',
		data: {
			repoId: 'testing dataset 2',
			outFeatures: [{ label: 'output-22', dtype: 'int', isSelected: false }],
			author: 'me'
		},
		style: 'border: 1px solid #999; padding: 10px;',
		position: { x: 0, y: 350 }
	},
	{
		id: 'model-1',
		type: 'modelNode',
		data: {
			repoId: 'testing model',
			outFeatures: [
				{ label: 'output-1', dtype: 'string', isSelected: false },
				{ label: 'output-2', dtype: 'int', isSelected: false }
			],
			inFeatures: [
				{ label: 'input-1', dtype: 'string', isSelected: true },
				{ label: 'input-2', dtype: 'string', isSelected: false }
			],
			author: 'me'
		},
		position: { x: 500, y: 50 }
	}
])

export const edges = writable<Edge[]>([
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
])

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
