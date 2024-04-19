<script lang="ts">
	// @ts-nocheck
	import '@xyflow/svelte/dist/style.css'
	import {
		SvelteFlow,
		Controls,
		Background,
		useSvelteFlow,
		Panel,
		getOutgoers,
		getIncomers
	} from '@xyflow/svelte'
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
	import { trpc } from '$lib/trpc/client.js'
	import CollabTool from '$components/CollabTools/CollabTool.svelte'

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
		const node = e.detail.node

		// if node already in nodePath
		if ($nodePath.includes(node.id)) {
			$nodePath = $nodePath.slice(0, $nodePath.indexOf(node.id))
			$nodePath = $nodePath
		} else {
			// if node not in nodePath
			if ($nodePath.length == 0) {
				$nodePath.push(node.id)
			}

			const incomers = getIncomers(node, $nodes, $edges)

			incomers &&
				incomers.forEach((incomer) => {
					if (incomer.id == $nodePath[$nodePath.length - 1]) {
						$nodePath.push(node.id)
					}
				})
		}
		$nodePath = $nodePath
		console.log('hi')
	}

	const updatePosition = async (e) => {
		console.log(e.detail)

		let sent = {
			x: e.detail.targetNode.position.x,
			y: e.detail.targetNode.position.y,
			nodeId: e.detail.targetNode.id
		}

		console.log(sent)
		await trpc().nodes.updatePosition.mutate(sent)
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
	on:nodedragstop={(e) => updatePosition(e)}
	on:dragover={onDragOver}
	on:drop={onDrop}
	on:nodeclick={(e) => $pathMode && validateNodePath(e)}
	nodesDraggable={data.isAuthor}
	nodesConnectable={data.isAuthor}
 elementsSelectable={data.isAuthor}
>
	<Background />

	{#if data.isAuthor}
		<!-- content here -->
		<Panel position="top-left">
			<Toolbar />
		</Panel>
	{:else}

		<Panel position="top-right">
			<CollabTool />
		</Panel>
		<!-- else content here -->
	{/if}

	<Controls />
</SvelteFlow>
