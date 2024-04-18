<script lang="ts">
	// @ts-nocheck
	import { Boxes, Plus, Trash } from 'lucide-svelte'
	import Accordion from '$components/Node/Accordion.svelte'

	import { Handle, Position, useNodesData } from '@xyflow/svelte'

	export let data: ModelNodeData | DatasetNodeData
	// create a writable

	let repoName, author, inFeatures, inFeaturesLen, outFeatures, outFeaturesLen, displayName

	$: {
		repoName = data?.repoId
		outFeatures = data?.outFeatures
		inFeatures = data?.inFeatures
		author = data?.author

		inFeaturesLen = inFeatures ? inFeatures.length : 0
		outFeaturesLen = outFeatures ? outFeatures.length : 0
		// console.log('empty model_node data', repoName)
	}

	// const nodeData = useNodesData(['dataset-1', 'dataset-2'])

	// $: {
	// 	// nodeData changes whenever the data of the passed node ids get updated
	// 	console.log($nodeData)
	// }
</script>

<!-- IF NODE INTIALIZED -->
{#if repoName}
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
		<section class="py-2">{repoName}</section>

		<Accordion featuresType="Inputs" features={inFeatures} featuresLen={inFeaturesLen} />

		<Accordion featuresType="Outputs" features={outFeatures} featuresLen={outFeaturesLen} />
	</div>
{:else}
	<aside class="flex">
		<button on:click={() => console.log('open modal')}>
			<Plus size={23} />
			Add Model Here
		</button>
		<Trash size={32} class="bg-slate-50 p-1 rounded-md border-red-500 border-2" />
	</aside>
{/if}

<style>
	.wrapper {
		@apply bg-[#eee] p-5 rounded-md w-[26rem] min-h-20;
	}

	button {
		@apply flex flex-col justify-between items-center gap-2 bg-slate-100 py-5 px-16 rounded-md border-blue-500 border-2;
	}
</style>
