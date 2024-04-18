<script lang="ts">
	// @ts-nocheck
	import { writable } from 'svelte/store'
	import '@xyflow/svelte/dist/style.css'
	import { SvelteFlow, Controls, Background, useSvelteFlow, Panel } from '@xyflow/svelte'
	import type { IsValidConnection, Node } from '@xyflow/svelte'
	import Toolbar from '$components/Toolbar/Toolbar.svelte'

	import {
		nodeTypes,
		defaultEdgeOptions,
		defaultNodeOptions,
		onDragOver,
		bgColor
	} from '$routes/proc/canvas-test/Dataset.js'

	import { nodes, edges } from '$stores/graph'

	export let data

	nodes.set(data.graph.nodes)
	edges.set(data.graph.edges)

	// $: console.log('data', data.graph.nodes)
	// $: console.log('edges', data.graph.edges)

	// export let form;
	// $: console.log(form);

	// drag and drop functionality
	const { screenToFlowPosition } = useSvelteFlow()
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
		console.log(newNode)

		$nodes.push(newNode)
		$nodes = $nodes
	}

	const isValidConnection: IsValidConnection = (c) => {
		console.log('valid?', c)
		let sourceDtype = ''
		let targetDtype = ''
		$nodes.forEach((node) => {
			if (node.id === c.source) {
				node.data.outFeatures.forEach((f) => {
					if (f.label == c.sourceHandle) {
						sourceDtype = f.dtype
					}
				})
			} else if (node.id === c.target) {
				node.data.inFeatures.forEach((f) => {
					if (f.label == c.targetHandle) {
						targetDtype = f.dtype
					}
				})
			}
		})
		return sourceDtype == targetDtype
	}

	// // context menu, if needed
	// on:nodecontextmenu={handleContextMenu}
	// function handleContextMenu({ detail: { event, node } }) {
	// 	event.preventDefault()
	// 	console.log('main: node context menu', event)
	// }
</script>

<SvelteFlow
	{nodes}
	{edges}
	{nodeTypes}
	{defaultEdgeOptions}
	{defaultNodeOptions}
	{isValidConnection}
	style="background: {$bgColor}"
	fitView
	on:dragover={onDragOver}
	on:drop={onDrop}
	on:edgeclick={(event) => console.log('main: edge click', event)}
>
	<Background />

	<Panel position="top-left">
		<Toolbar />
	</Panel>
	<Controls />
</SvelteFlow>

<!-- <Panel>
		<form
			on:submit={() => {
				addNode(data)
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
	</Panel> -->
