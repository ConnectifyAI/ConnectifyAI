<script lang="ts">
	import { Handle, Position, type Connection } from '@xyflow/svelte'
	import { nodes } from '$routes/canvas-test/Dataset'

	export let feature: Feature
	export let relativePos: number
	export let featureType: 'Input' | 'Output'

	// add function to sync selected features
	// const updateFeature = () => {
	// 	isSelected = !isSelected
	// }
	const updateFeature = (connection: Connection) => {
		$nodes.forEach((node) => {
			if (node.id === connection.source || node.id === connection.target) {
				node.data.isSelected = !feature.isSelected
			}
		})
	}
</script>

<!-- on button toggle, get dataset id and field label -->
<div class="relative inline-block my-2">
	<button
		type="button"
		class="
		{feature.isSelected ? 'bg-slate-300' : 'bg-white'}"
	>
		<h1>{feature.label}</h1>
		<p class="text-sm text-left opacity-70">{feature.dtype} • etc</p>
	</button>
</div>

<Handle
	id={feature.label}
	type={featureType == 'Input' ? 'target' : 'source'}
	position={featureType == 'Input' ? Position.Left : Position.Right}
	style="top: {relativePos}%; background: {feature.isSelected ? 'green' : 'beige'};"
	class="w-10 h-10"
	onconnect={(e) => {
		console.log(e[0])
		updateFeature(e[0])
	}}
/>

<style>
	button {
		@apply flex-col border rounded-md border-[#bbb] items-start p-4 hover:cursor-pointer;
	}
</style>
