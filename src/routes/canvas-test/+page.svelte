<script lang="ts">
	// @ts-nocheck
	import '@xyflow/svelte/dist/style.css'
	import { SvelteFlow, Controls, Background, useSvelteFlow, Panel, type Node } from '@xyflow/svelte'
	import Toolbar from '$components/Toolbar/Toolbar.svelte'

	import {
		nodes,
		edges,
		nodeTypes,
		defaultEdgeOptions,
		defaultNodeOptions,
		onDragOver,
		addNode,
		bgColor
	} from '$routes/canvas-test/Dataset'

	export let data
	$: console.log(data.datasetInfo)

	// export let form;
	// $: console.log(form);

	let nodeText = ''

	const { screenToFlowPosition } = useSvelteFlow()

	// drag and drop functionality

	const onDrop = (event: DragEvent) => {
		event.preventDefault()

		if (!event.dataTransfer) {
			return null
		}

		const type = event.dataTransfer.getData('application/svelteflow')

		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY
		})

		const newNode = {
			id: `${Math.random()}`,
			type,
			position,
			data: { label: `${type} node` },
			origin: [0.5, 0.0]
		} satisfies Node

		$nodes.push(newNode)
		$nodes = $nodes
	}
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
	on:edgeclick={(event) => console.log('edge click', event)}
	on:nodeclick={(event) => console.log('node click', event)}
>
	<Background />

	<Panel position="top-left">
		<Toolbar />
	</Panel>
	<Panel>
		<form
			on:submit={() => {
				addNode(data.datasetInfo)
				nodeText = ''
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

		<form method="POST" action="?/searchForDataset">
			<label class="bg-slate-300">
				<input name="query" type="search" />
			</label>
		</form>
	</Panel>
	<Controls />
</SvelteFlow>
