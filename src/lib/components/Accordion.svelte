<script lang="ts">
	// @ts-nocheck
	import type { ComponentType } from 'svelte'
	import { slide } from 'svelte/transition'
	import { ChevronDown, ChevronUp, MoveRight } from 'lucide-svelte'
	export let open = false
	const handleClick = () => (open = !open)

	export let text = ''
	export let FeatureComponent: ComponentType<any>
	export let len = 0
	export let features
</script>

<div class="accordion">
	<div class="flex justify-between">
		<div class="text">
			<slot name="head">
				<h2 class="flex items-centerp p-1 gap-3">
					<MoveRight size={20} />
					{text} ({len})
				</h2>
			</slot>
		</div>

		{#if open}
			<button on:click={handleClick}><ChevronUp /></button>
		{:else}
			<button on:click={handleClick}><ChevronDown /></button>
		{/if}
	</div>

	{#if open}
		<div class="details" transition:slide>
			<slot name="details">
				<section class="flex gap-3 overflow-x-auto nowheel">
					{#if features}
						{#each features as feature}
							<svelte:component this={FeatureComponent} name={feature.name} dtype={feature.dtype} />
						{/each}
					{/if}
				</section>
			</slot>
		</div>
	{/if}
</div>

<style>
	button {
		@apply p-1 hover:bg-slate-200 rounded-md;
	}
</style>
