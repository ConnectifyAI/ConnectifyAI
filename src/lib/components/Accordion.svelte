<script>
	import { slide } from 'svelte/transition';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	export let open = false;
	const handleClick = () => (open = !open);
</script>

<div class="accordion">
	<div class="flex justify-between">
		<div class="text">
			<slot name="head"></slot>
		</div>

		{#if open}
			<button on:click={handleClick}><ChevronUp /> </button>
		{:else}
			<button on:click={handleClick}><ChevronDown /></button>
		{/if}
	</div>

	{#if open}
		<div class="details" transition:slide>
			<slot name="details"></slot>
		</div>
	{/if}
</div>
