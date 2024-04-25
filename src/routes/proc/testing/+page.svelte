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
		getIncomers,
		updateEdge,
		MarkerType,
		addEdge
	} from '@xyflow/svelte'
	import type { IsValidConnection, Node } from '@xyflow/svelte'
	import Toolbar from '$components/Toolbar/Toolbar.svelte'

	import {
		nodeTypes,
		defaultEdgeOptions,
		defaultNodeOptions,
		onDragOver,
		bgColor
	} from '$routes/proc/testing/Dataset.ts'

	import {
		nodes,
		edges,
		graphId,
		pathMode,
		nodePath,
		edgePath,
		updateEdgePath
	} from '$stores/graph'
	import { trpc } from '$lib/trpc/client.js'
	import CollabTool from '$components/CollabTools/CollabTool.svelte'

	export let data

	$: console.log('data', data)

	// nodes.set(data.graph.nodes)
	// edges.set(data.graph.edges)
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
		console.log(e.detail)
		const node = e.detail.node

		// if node already in nodePath
		if ($nodePath.includes(node.id)) {
			$nodePath = $nodePath.slice(0, $nodePath.indexOf(node.id))

			// check for invalid edges, updateEdgePath
			updateEdgePath()
		} else {
			// if node not in nodePath
			if ($nodePath.length == 0) {
				$nodePath.push(node.id)
			}

			getIncomers(node, $nodes, $edges).forEach((incomer) => {
				if (incomer.id == $nodePath[$nodePath.length - 1]) {
					$nodePath.push(node.id)
				}
			})
		}
		$nodePath = $nodePath
	}

	// const updateEdgePath = () => {
	// 	// updates edgePath and edge(s) styling
	// 	let resetStyle = false
	// 	$edges.forEach((edge) => {
	// 		if ($edgePath.includes(edge.id)) {
	// 			const { id, target } = edge
	// 			// if edge's target no longer in nodePath, remove edge from edgePath
	// 			if (!$nodePath.includes(target)) {
	// 				$edgePath = $edgePath.slice(0, $edgePath.indexOf(id))
	// 				resetStyle = true
	// 			}
	// 		}

	// 		if (resetStyle) {
	// 			edge.style = defaultEdgeOptions.style
	// 		}
	// 	})
	// 	$edges = $edges
	// }

	const validateEdgePath = (e): string[] => {
		// updates edgePath and edge(s) styling
		console.log(e)
		const edge = e.detail.edge
		const { id, source, target } = edge
		const index = $edges.findIndex((edge) => edge.id === e.detail.edge.id)

		if ($edgePath.includes(id)) {
			$edgePath = $edgePath.slice(0, $edgePath.indexOf(id))

			$edges[index].style = defaultEdgeOptions.style
			console.log('already selected, deselecting', $edgePath)
		} else if ($nodePath.includes(source) && $nodePath.includes(target)) {
			$edgePath.push(id)

			$edges[index].style = 'stroke-width: 7px; stroke: #f0f'
			console.log('selected success!', $edgePath)
		} else {
			console.log('edge not valid')
		}

		// $edges[index].style =
		// 	$edges[index].style == defaultEdgeOptions.style
		// 		? 'stroke-width: 7px; stroke: #f0f'
		// 		: defaultEdgeOptions.style
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

	const handleDelete = async (params: { nodes: flowNode[]; edges: flowNode[] }) => {
		params.nodes.forEach(async (node) => {
			await trpc().nodes.deleteNode.mutate(node.id)
		})

		params.edges.forEach(async (edge) => {
			console.log('delete this edge', edge)

			let sourceFeatureId: string = ''
			let targetFeatureId: string = ''

			$nodes.forEach((node) => {
				if (node.id === edge.source) {
					;(node.data.outFeatures as Feature[]).forEach((f: Feature) => {
						if (f.label === edge.sourceHandle) {
							sourceFeatureId = f.id!
						}
					})
				}

				if (node.id === edge.target) {
					;(node.data.inFeatures as Feature[]).forEach((f: Feature) => {
						if (f.label === edge.targetHandle) {
							targetFeatureId = f.id!
						}
					})
				}
			})

			// that means one of the nodes got deleted, which means we casade that node
			// delete to edges
			if (!sourceFeatureId || !targetFeatureId) {
				return
			}

			let x = await trpc().edges.deleteEdge.mutate({
				targetFeatureId,
				sourceFeatureId
			})
		})
	}
</script>

<SvelteFlow
	{nodes}
	{edges}
	{nodeTypes}
	{defaultEdgeOptions}
	{defaultNodeOptions}
	connectionLineType="smoothstep"
	{isValidConnection}
	style="background: {$bgColor}"
	fitView
	on:dragover={onDragOver}
	on:drop={onDrop}
	on:nodeclick={(e) => console.log('node clicked') || ($pathMode && validateNodePath(e))}
	on:edgeclick={(e) => $pathMode && validateEdgePath(e)}
	nodesDraggable={data.isAuthor}
	nodesConnectable={data.isAuthor}
	elementsSelectable={data.isAuthor}
	ondelete={handleDelete}
	zoomOnDoubleClick={false}
	connectionRadius={30}
>
	<!-- on:nodedragstop={(e) => updatePosition(e)} -->
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
