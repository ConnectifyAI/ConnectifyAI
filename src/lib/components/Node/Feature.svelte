<script lang="ts">
	import { Handle, Position, type Connection } from '@xyflow/svelte'
	import { createEventDispatcher } from 'svelte'

	export let feature: Feature
	export let relativePos: number
	export let featureType: 'Input' | 'Output'

	let { label, dtype, isSelected } = feature

	const dispatch = createEventDispatcher()
</script>

<!-- on button toggle, get dataset id and field label -->
<div class="relative inline-block my-2">
	<button
		type="button"
		class="
		{isSelected ? 'bg-slate-300' : 'bg-white'}"
	>
		<h1>{label}</h1>
		<p class="text-sm text-left opacity-70">{dtype} • etc</p>
	</button>
</div>

<Handle
	id={label}
	type={featureType == 'Input' ? 'target' : 'source'}
	position={featureType == 'Input' ? Position.Left : Position.Right}
	style="top: {relativePos}%; background: {isSelected ? 'green' : 'beige'};"
	class="w-10 h-10"
	onconnect={(connection) => {
		isSelected = !isSelected
		dispatch('toggleFeature', {
			connection: connection,
			isSelected: isSelected
		})
	}}
	ondisconnect={(connection) => {
		isSelected = !isSelected
		dispatch('toggleFeature', {
			connection: connection,
			isSelected: isSelected
		})
	}}
/>

<style>
	button {
		@apply flex-col border rounded-md border-[#bbb] items-start p-4 hover:cursor-pointer;
	}
</style>
