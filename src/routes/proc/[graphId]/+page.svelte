<script lang="ts">
	// @ts-nocheck
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
	} from '$routes/proc/[graphId]/Dataset.ts'

	import { nodes, edges, graphId, pathMode, nodePath } from '$stores/graph'

	export let data

	console.log(data)

	nodes.set(data.graph.nodes)
	edges.set(data.graph.edges)
	graphId.set(data.graph.id)

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

		$nodes.push(newNode)
		$nodes = $nodes
	}

	const isValidConnection: IsValidConnection = (c) => {
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

	const validateNodePath = (e) => {
		const nodeId = e.detail.node.id
		if ($nodePath.includes(nodeId)) {
			$nodePath = $nodePath.slice(0, $nodePath.indexOf(nodeId))
			$nodePath = $nodePath
		} else {
			$nodePath.push(nodeId)
		}
		$nodePath = $nodePath
		console.log('validateNodePath', $nodePath)
	}
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
	on:nodeclick={(e) => $pathMode && validateNodePath(e)}
	nodesDraggable={data.isUser}
	nodesConnectable={data.isUser}
>
	<Background />

	<Panel position="top-left">
		<Toolbar />
	</Panel>
	<Controls />
</SvelteFlow>
