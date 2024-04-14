<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	// export let isSelected: Writable<boolean> = writable(false);
	export let isSelected = false;
</script>

<!-- on button toggle, get dataset id and field name -->
<div class="relative inline-block my-2">
	<button
		type="button"
		class="border-[#bbb] active:bg-slate-200
		{isSelected ? 'bg-slate-300' : 'bg-white'}"
		on:click={() => {
			isSelected = !isSelected;
		}}
	>
		<span class="badge-icon bg-blue-50 absolute -top-2 -right-2 z-10">2</span>

		<h1>MedlineCitation</h1>
		<p class="text-sm text-left opacity-70">dict • etc</p>
	</button>
</div>

<style>
	button {
		@apply flex-col border rounded-md;
		align-items: flex-start;
		padding: 1rem;
	}
</style>
