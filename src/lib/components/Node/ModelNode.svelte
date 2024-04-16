<script lang="ts">
	// @ts-nocheck
	import { Boxes, MoveRight } from 'lucide-svelte'
	import Accordion from '$components/Accordion.svelte'

	import { Handle, Position, useEdges, useNodes } from '@xyflow/svelte'
	import { OutputFeature, InputFeature } from '$components/Node'
	import { onMount } from 'svelte'

	export let data: ModelNodeData

	let repo_name, author, in_features, in_features_len, out_features, out_features_len, displayName

	$: {
		repo_name = data.datasetInfo?.id
		author = data.datasetInfo?.author
		in_features = data.datasetInfo?.in_features
		out_features = data.datasetInfo?.out_features

		in_features_len = in_features.length
		out_features_len = out_features.length
	}

	// generate unique id for each handle
	const generateId = () => Math.random().toString()

	const DEFAULT_HANDLE_STYLE = 'width: 10px; height: 10px; bottom: -5px;'
</script>

<!-- UI FOR NODE -->
<div class="bg-[#eee] p-5 rounded-md w-[25rem]">
		<!-- dataset/model display name -->
		<section class="flex justify-between items-center">
			<span class="flex gap-1 py-1 items-center">
				<Boxes size={23} />
				<h1 class="text-lg">Model Display Name</h1>
			</span>
		</section>

		<hr class="opacity-30" />

		<!-- model repo name -->
		<section class="py-2">{repo_name}</section>

		<Accordion
			text="Inputs"
			FeatureComponent={InputFeature}
			features={in_features}
			len={in_features_len}
		/>

		<Accordion
			text="Outputs"
			FeatureComponent={OutputFeature}
			features={out_features}
			len={out_features_len}
		/>
</div>

<!-- HANDLES -->
{#if in_features}
	{#each in_features as _, index}
		<Handle
			id={generateId()}
			+
			{index}
			type="target"
			position={Position.Left}
			style="{DEFAULT_HANDLE_STYLE}; top: {((index + 1) * 100) /
				(in_features_len + 1)}%; background: red;"
		/>
	{/each}
{/if}

{#if out_features}
	{#each out_features as _, index}
		<Handle
			id={generateId()}
			+
			{index}
			type="source"
			position={Position.Right}
			style="{DEFAULT_HANDLE_STYLE}; top: {((index + 1) * 100) /
				(out_features_len + 1)}%; background: blue;"
		/>
	{/each}
{/if}
