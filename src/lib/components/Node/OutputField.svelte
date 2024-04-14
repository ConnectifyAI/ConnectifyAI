<script lang="ts">
	let bgColor = '#bbb';
</script>

<div class="relative inline-block my-2">
	<span class="badge-icon bg-blue-50 absolute -top-2 -right-2 z-10">2</span>

	<button type="button" class={`border-[#bbb] hover:bg-[${bgColor}]`}>
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
