<script lang="ts">
	import { Handle, Position, type Connection } from '@xyflow/svelte'
	import { nodes } from '$routes/proc/canvas-test/Dataset'

	export let feature: Feature
	export let relativePos: number
	export let featureType: 'Input' | 'Output'

	let { label, dtype, isSelected } = feature

	const toggleFeature = (e: any) => {
		isSelected = !isSelected
		const c = e[0]
		console.log('toggleFeature', c)
		$nodes.forEach((node) => {
			if (node.id === c.source) {
				;(node.data.outFeatures as Feature[]).forEach((f: Feature) => {
					if (f.label == c.sourceHandle) {
						f.isSelected = isSelected
					}
				})
			}
		})
	}
</script>

<aside class="my-2 bg-[#d1eafb]">
	<h1>{label}</h1>
	<p class="text-sm text-left opacity-70">{dtype} • etc</p>
</aside>

<Handle
	id={label}
	type={featureType == 'Input' ? 'target' : 'source'}
	position={featureType == 'Input' ? Position.Left : Position.Right}
	style="top: {relativePos}%; background: #d1eafb; width: 16px; height: 16px; border: 2px solid black"
/>

<style>
	aside {
		@apply flex-col border rounded-md border-[#bbb] items-start p-4;
	}
</style>
