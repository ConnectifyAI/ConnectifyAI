<script lang="ts">
	// @ts-nocheck
	import { slide } from 'svelte/transition'
	import { ChevronDown, ChevronUp, MoveRight } from 'lucide-svelte'
	import Feature from '$components/Node/Feature.svelte'

	export let open = true
	const handleClick = () => (open = !open)

	export let featuresType: 'Inputs' | 'Outputs'
	export let features
	export let featuresLen = 0
</script>

<!-- TAKES INPUT / OUTPUT FEATURES -->
<div class="accordion">
	<!-- HEAD -->
	<head class="flex justify-between">
		<h2 class="flex items-centerp p-1 gap-3">
			<MoveRight size={20} />
			{featuresType} ({featuresLen})
		</h2>

		{#if open}
			<button on:click={handleClick}><ChevronUp /></button>
		{:else}
			<button on:click={handleClick}><ChevronDown /></button>
		{/if}
	</head>

	<!-- FEATURES & CORRESPONDING HANDLES -->
	{#if open}
		<section class="flex gap-3 overflow-x-auto nowheel" transition:slide>
			{#if features}
				{#each features as feature, index}
					<Feature
						{feature}
						relativePos={((index + 1) * 100) / (featuresLen + 1)}
						featureType={featuresType === 'Inputs' ? 'Input' : 'Output'}
					/>
				{/each}
			{/if}
		</section>
	{/if}
</div>

<style>
	button {
		@apply p-1 hover:bg-slate-200 rounded-md;
	}
</style>
