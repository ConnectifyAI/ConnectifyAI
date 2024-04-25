import { writable } from 'svelte/store'
import { DatasetNode, ModelNode } from '$components/Node'

export const bgColor = writable('#1A192B')

// INITIAL NODES AND EDGES
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
	interactionWidth: 10,
	style: 'stroke-width: 3px; stroke: #eee'
}

// UTIL FUNCTIONS
export const onDragOver = (event: DragEvent) => {
	event.preventDefault()

	if (event.dataTransfer) {
		event.dataTransfer.dropEffect = 'move'
	}
}

// NODE AND EDGES FUNCTION
// export const addNode = (datasetInfo) => {
// 	// use built in updateNode
// 	nodes.update((nodes) => [
// 		...nodes,
// 		{
// 			id: Date.now().toString(),
// 			type: 'datasetNode',
// 			data: { datasetInfo },
// 			style: 'border: 1px solid #777; padding: 10px;',
// 			position: { x: 300, y: 200 }
// 		}
// 	])
// }

// export const deleteNode = (id: string) => {
// use built in node destory
// };
