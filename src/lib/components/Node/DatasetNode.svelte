<script lang="ts">
	// @ts-nocheck
	import { Database, Plus } from 'lucide-svelte'
	import { onMount } from 'svelte'

	import Accordion from '$components/Node/Accordion.svelte'
	import { Handle, Position } from '@xyflow/svelte'

	export let data: DatasetNodeData

	let outputsOpen = true
	let repo_name, author, out_features, out_features_len, displayName

	$: {
		repo_name = data?.repo_id
		author = data?.author
		out_features = data?.features
		out_features_len = out_features ? out_features.length : 0
	}

	onMount(() => {
		if (data) {
			displayName = data.id
		}
	})
</script>

<!-- IF NODE INTIALIZED -->
{#if repo_name}
	<div class="wrapper">
		<!-- dataset/model display name -->
		<section class="flex gap-1 py-1 items-center text-lg">
			<Database size={23} />
			Dataset 1
		</section>

		<hr class="opacity-30" />

		<!-- repo_name -->
		<section class="py-2">{repo_name}</section>

		<Accordion
			features_type="Outputs"
			features={out_features}
			features_len={out_features_len}
			on:updateOpen={() => (outputsOpen = !outputsOpen)}
		/>
	</div>

	{#if !outputsOpen}
		<Handle type="source" position={Position.Right} />
	{/if}
{:else}
	<button
		class="flex flex-col justify-between items-center gap-2 bg-slate-100 py-5 px-16 rounded-md"
		on:click={() => console.log('open modal')}
	>
		<Plus size={23} />
		Add Dataset Here
	</button>
{/if}

<style>
	.wrapper {
		@apply bg-[#eee] p-5 rounded-md w-[26rem] min-h-20;
	}
</style>
