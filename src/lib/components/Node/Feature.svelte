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
<aside
	class="my-2
	{isSelected ? 'bg-[#30a0ef]' : 'bg-[#d1eafb]'}"
>
	<h1>{label}</h1>
	<p class="text-sm text-left opacity-70">{dtype} • etc</p>
</aside>

<Handle
	id={label}
	type={featureType == 'Input' ? 'target' : 'source'}
	position={featureType == 'Input' ? Position.Left : Position.Right}
	style="top: {relativePos}%; background: {isSelected
		? '#30a0ef'
		: '#d1eafb'}; width: 16px; height: 16px; border: 2px solid black"
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
	aside {
		@apply flex-col border rounded-md border-[#bbb] items-start p-4;
	}
</style>
