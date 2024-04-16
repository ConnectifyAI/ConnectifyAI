<script lang="ts">
	import { writable, type Writable } from 'svelte/store'
	export let name: string
	export let dtype: string
	// export let badgeNum: number
	export let isSelected = false
</script>

<!-- on button toggle, get dataset id and field name -->
<div class="relative inline-block my-2">
	<button
		type="button"
		class="border-[#bbb] active:bg-slate-200
		{isSelected ? 'bg-slate-300' : 'bg-white'} hover:cursor-pointer"
		on:click={() => {
			isSelected = !isSelected
		}}
	>
		<!-- <span class="badge-icon bg-blue-50 absolute -top-2 -right-2 z-10">{badgeNum}</span> -->

		<h1>{name}</h1>
		<p class="text-sm text-left opacity-70">{dtype} • etc</p>
	</button>
</div>

<style>
	button {
		@apply flex-col border rounded-md;
		align-items: flex-start;
		padding: 1rem;
	}
</style>
