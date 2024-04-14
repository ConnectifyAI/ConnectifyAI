import { writable } from 'svelte/store';
import { Position, type Node, type Edge } from '@xyflow/svelte';

export const bgColor = writable('#1A192B');

// INITIAL NODES AND EDGES
const initialNodes: Node[] = [
	{
		id: '1',
		type: 'input',
		data: { label: 'An input node' },
		position: { x: 0, y: 50 },
		sourcePosition: Position.Right
	},
	{
		id: '2',
		type: 'datasetNode',
		data: { color: bgColor, text: 'library name here' },
		style: 'border: 1px solid #999; padding: 10px;',
		position: { x: 300, y: 50 }
	}
];

const initialEdges: Edge[] = [
	{
		id: 'e1-2',
		source: '1',
		target: '2',
		animated: true,
		style: 'stroke: #fff;'
	}
];

// NODE AND EDGES FUNCTION
export const addNode = (text: string) => {
	nodes.update((nodes) => [
		...nodes,
		{
			id: Math.random().toString(),
			type: 'datasetNode',
			data: { color: bgColor, text },
			style: 'border: 1px solid #777; padding: 10px;',
			position: { x: 300, y: 200 }
		}
	]);
};

export const nodes = writable<Node[]>(initialNodes);
export const edges = writable(initialEdges);
