<script lang="ts">
	// @ts-nocheck
	import { Database } from 'lucide-svelte'
	import { onMount } from 'svelte'

	import Accordion from '$components/Node/Accordion.svelte'
	import { Handle, Position } from '@xyflow/svelte'

	export let data: DatasetNodeData

	let outputsOpen = true
	let repo_name, author, out_features, out_features_len, displayName

	$: {
		repo_name = data.datasetInfo?.id
		author = data.datasetInfo?.author
		out_features = data.datasetInfo?.features
		out_features_len = out_features.length
	}

	onMount(() => {
		displayName = data.datasetInfo.id
	})
</script>

<div class="bg-[#eee] p-5 rounded-md w-[26rem]">
	<!-- dataset/model display name -->
	<section class="flex gap-1 py-1 items-center">
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
