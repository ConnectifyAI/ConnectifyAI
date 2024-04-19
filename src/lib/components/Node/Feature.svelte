<script lang="ts">
	import { Handle, Position, type Connection } from '@xyflow/svelte'
	import { nodes } from '$stores/graph'
	import { trpc } from '$lib/trpc/client'
	import { graphId } from '$stores/graph'

	export let nodeId: string
	export let feature: Feature
	export let relativePos: number // Handle offset
	export let featureType: 'Input' | 'Output'

	let { label, dtype, isSelected } = feature
	// $: {
	// 	console.log('feature', feature)
	// }

	const toggleFeature = (e: any) => {
		console.log('toggle', e)
		isSelected = !isSelected
		// const c = e[0]
		// $nodes.forEach((node) => {
		// 	if (node.id === c.source) {
		// 		;(node.data.outFeatures as Feature[]).forEach((f: Feature) => {
		// 			if (f.label == c.sourceHandle) {
		// 				f.isSelected = isSelected
		// 			}
		// 		})
		// 	}
		// })
	}

	const addEdgeToDb = async (e: Connection[]) => {
		const c = e[0]

		let sourceFeatureId: string = ''
		let targetFeatureId: string = ''

		$nodes.forEach((node) => {
			if (node.id === c.source) {
				;(node.data.outFeatures as Feature[]).forEach((f: Feature) => {
					if (f.label === c.sourceHandle) {
						sourceFeatureId = f.id!
					}
				})
			}

			if (node.id === c.target) {
				;(node.data.inFeatures as Feature[]).forEach((f: Feature) => {
					if (f.label === c.targetHandle) {
						targetFeatureId = f.id!
					}
				})
			}
		})

		let x = await trpc().edges.newEdge.mutate({
			graphId: $graphId,
			sourceNodeId: c.source,
			targetNodeId: c.target,
			targetFeatureId,
			sourceFeatureId
		})
	}

	if (featureType == 'Input') {
		// if (nodeId == target)
		// target: '6d25ae5e-db7c-4950-8eab-d23a6e345134'
		// targetHandle: 'Question'
	} else if (featureType == 'Output') {
		// source: '6d25ae5e-db7c-4950-8eab-d23a6e345134'
		// sourceHandle: 'Question'
	}
</script>

<button class={isSelected ? 'bg-[#d1eafb]' : 'bg-purple-300'}>
	<h1>{label}</h1>
	<p class="text-sm text-left opacity-70">{dtype}</p>
</button>

<Handle
	id={label}
	type={featureType == 'Input' ? 'target' : 'source'}
	position={featureType == 'Input' ? Position.Left : Position.Right}
	style="top: {relativePos}%; background: #d1eafb; width: 16px; height: 16px; border: 2px solid black"
	onconnect={(e) => {
		toggleFeature(e)
		addEdgeToDb(e)
	}}
	ondisconnect={(e) => {
		toggleFeature(e)
	}}
/>

<style>
	button {
		@apply flex-col border rounded-md border-[#bbb] items-start p-3 px-5 my-2;
	}
</style>
