<script lang="ts">
	// @ts-nocheck
	import { writable } from 'svelte/store';
	import '@xyflow/svelte/dist/style.css';
	import {
		SvelteFlow,
		Controls,
		Background,
		BackgroundVariant,
		useSvelteFlow,
		Panel,
		type Node
	} from '@xyflow/svelte';
	import Toolbar from '$components/Toolbar/Toolbar.svelte';

	import DatasetNode from '$components/Node/DatasetNode.svelte';
	import { nodes, edges, addNode, bgColor } from '$components/Node/Dataset';

	const nodeTypes = {
		datasetNode: DatasetNode
		// modelNode: ModelCard
	};

	const defaultNodeOptions = {
		type: 'datasetNode',
		data: {
			color: writable('#f00'),
			text: 'default text'
		},

		style: 'border: 1px solid #777; padding: 10px;',
		position: { x: 300, y: 200 }
	};

	const defaultEdgeOptions = {
		type: 'smoothstep',
		animated: true,
		interactionWidth: 30
	};


	let nodeText = '';

	const { screenToFlowPosition } = useSvelteFlow();
	const onDragOver = (event: DragEvent) => {
		event.preventDefault();

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();

		if (!event.dataTransfer) {
			return null;
		}

		const type = event.dataTransfer.getData('application/svelteflow');

		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY
		});

		const newNode = {
			id: `${Math.random()}`,
			type,
			position,
			data: { label: `${type} node` },
			origin: [0.5, 0.0]
		} satisfies Node;

		$nodes.push(newNode);
		$nodes = $nodes;
	};
</script>

<SvelteFlow
	{nodes}
	{edges}
	{nodeTypes}
	{defaultEdgeOptions}
	{defaultNodeOptions}
	style="background: {$bgColor}"
	fitView
	on:dragover={onDragOver}
	on:drop={onDrop}
>
	<Background />

	<Panel position="top-left">
		<Toolbar />
	</Panel>
	<Panel>
		<form
			on:submit={() => {
				addNode(nodeText);
				nodeText = '';
			}}
			class="bg-slate-100 p-5"
		>
			<label class="label">
				Test input
				<input bind:value={nodeText} class="input" type="text" placeholder="Node Text Here!" />
			</label>
			<button type="submit" class="btn variant-filled">
				<span>(icon)</span>
				<span>Add Node</span>
			</button>
		</form>
	</Panel>
	<Controls />
</SvelteFlow>
