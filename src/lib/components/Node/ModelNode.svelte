<script lang="ts">
	// @ts-nocheck
	import { Boxes, Plus } from 'lucide-svelte'
	import Accordion from '$components/Node/Accordion.svelte'

	import { Handle, Position, useNodesData } from '@xyflow/svelte'

	export let data: ModelNodeData | DatasetNodeData
	// create a writable
	let inputsOpen = true
	let outputsOpen = true

	let repo_name, author, in_features, in_features_len, out_features, out_features_len, displayName

	$: {
		repo_name = data?.repo_id
		author = data?.author
		in_features = data?.in_features
		out_features = data?.out_features

		in_features_len = in_features ? in_features.length : 0
		out_features_len = out_features ? out_features.length : 0
		console.log('empty model_node data', repo_name)
	}

	// on connect, extract output of other nodes connected to this node
	let inputFeatures = []

	const nodeData = useNodesData(['dataset-1', 'dataset-2'])

	$: {
		// nodeData changes whenever the data of the passed node ids get updated
		console.log($nodeData)
	}
</script>

<!-- IF NODE INTIALIZED -->
{#if repo_name}
	<!-- UI FOR NODE -->
	<div class="wrapper">
		<!-- dataset/model display name -->
		<section class="flex justify-between items-center">
			<span class="flex gap-1 py-1 items-center text-lg">
				<Boxes size={23} />
				Model Display Name
			</span>
		</section>

		<hr class="opacity-30" />

		<!-- model repo name -->
		<section class="py-2">{repo_name}</section>

		<Accordion
			features_type="Inputs"
			features={in_features}
			features_len={in_features_len}
		/>

		<Accordion
			features_type="Outputs"
			features={out_features}
			features_len={out_features_len}
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
{:else}
	<button
		class="flex flex-col justify-between items-center gap-2 bg-slate-100 py-5 px-16 rounded-md"
		on:click={() => console.log('open modal')}
	>
		<Plus size={23} />
		Add Model Here
	</button>
{/if}

<style>
	.wrapper {
		@apply bg-[#eee] p-5 rounded-md w-[26rem] min-h-20;
	}
</style>
