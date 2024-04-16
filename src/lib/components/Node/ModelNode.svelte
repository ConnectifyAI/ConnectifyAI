<script lang="ts">
	// @ts-nocheck
	import { Boxes } from 'lucide-svelte'
	import Accordion from '$components/Node/Accordion.svelte'

	import { Handle, Position, useNodesData } from '@xyflow/svelte'

	export let data: ModelNodeData | DatasetNodeData
	// create a writable
	let inputsOpen = true
	let outputsOpen = true

	let repo_name, author, in_features, in_features_len, out_features, out_features_len, displayName

	$: {
		repo_name = data.datasetInfo?.id
		author = data.datasetInfo?.author
		in_features = data.datasetInfo?.in_features
		out_features = data.datasetInfo?.out_features

		in_features_len = in_features.length
		out_features_len = out_features.length
	}

	// on connect, extract output of other nodes connected to this node
	let inputFeatures = []

	const nodeData = useNodesData(['dataset-1', 'dataset-2'])

	$: {
		// nodeData changes whenever the data of the passed node ids get updated
		console.log($nodeData)
	}
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
		features_type="Inputs"
		features={in_features}
		features_len={in_features_len}
		on:updateOpen={() => (inputsOpen = !inputsOpen)}
	/>

	<Accordion
		features_type="Outputs"
		features={out_features}
		features_len={out_features_len}
		on:updateOpen={() => (outputsOpen = !outputsOpen)}
	/>
</div>

{#if !inputsOpen}
	<Handle
		type="target"
		position={Position.Left}
		onconnect={(e) => {
			console.log('.', e)
		}}
	/>
{/if}

{#if !outputsOpen}
	<Handle type="source" position={Position.Right} />
{/if}
