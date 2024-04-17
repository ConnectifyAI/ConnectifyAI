<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte'
	export let label: string
	export let dtype: string
	export let pos: number
	export let featureType: 'Input' | 'Output'

	export let isSelected = false
	// add function to sync selected features
</script>

<!-- on button toggle, get dataset id and field label -->
<div class="relative inline-block my-2">
	<button
		type="button"
		class="
		{isSelected ? 'bg-slate-300' : 'bg-white'}"
		on:click={() => {
			isSelected = !isSelected
		}}
	>
		<h1>{label}</h1>
		<p class="text-sm text-left opacity-70">{dtype} • etc</p>
	</button>
</div>

<Handle
	id={label}
	type={featureType == 'Input' ? 'target' : 'source'}
	position={featureType == 'Input' ? Position.Left : Position.Right}
	style="top: {pos}%; background: {isSelected ? 'green' : 'beige'};"
	class="w-10 h-10"
	onconnect={(e) => {
		console.log('...', e)
	}}
/>

<style>
	button {
		@apply flex-col border rounded-md border-[#bbb] active:bg-slate-200 items-start p-4 hover:cursor-pointer;
	}
</style>
