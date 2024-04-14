<script lang="ts">
	let bgColor = '#bbb';
	let isSelected = false;

	let buttonConfig = {
		// Colors
		primary: {
			bgColor: 'bg-primary-500',
			color: 'text-white',
			outline: 'border-primary-500 text-primary-500 bg-opacity-0 hover:bg-opacity-10'
		},
		secondary: {
			bgColor: 'bg-secondary-500',
			color: 'text-white',
			outline: 'border-secondary-500 text-secondary-500 bg-opacity-0 hover:bg-opacity-10'
		},

		// Sizes
		small: 'px-3 py-2',
		medium: 'px-4 py-2 hover:bg-slate-500',
		large: 'px-5 py-2'
	};
</script>

<div class="relative inline-block my-2">
	<button
		type="button"
		class="border-[#bbb] active:bg-slate-300
		{isSelected ? 'bg-slate-200' : 'bg-white'}"
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
