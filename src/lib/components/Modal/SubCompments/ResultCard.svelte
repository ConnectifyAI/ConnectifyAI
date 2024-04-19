<script lang="ts">
	// @ts-nocheck
	import { ThumbsUp, Download } from 'lucide-svelte'
	import type { DatasetInfo, ModelInfo } from '$lib/server/helpers/apiTypes'
	export let info: DatasetInfo | ModelInfo
	export let inFeatures: any = []

	// Model | Dataset
	const { author, repoId, outFeatures, downloads, likes, createdAt } = info
	import { getModalStore } from '@skeletonlabs/skeleton'
	import { nodes, graphId } from '$stores/graph'
	import { trpc } from '$lib/trpc/client'

	const modalStore = getModalStore()

	export let nodeId: string
	export let nodeType: 'datasetNode' | 'modelNode'
	$: console.log(nodeType)

	//handleSelect
	const handleClick = async () => {
		let position = $nodes.filter((node) => {
			return node.id === nodeId
		})[0].position

		if (nodeType === 'datasetNode') {
			console.log()
			let insertedNode = await trpc().nodes.newDatasetNode.mutate({
				position: position,
				datasetInfo: info,
				graphId: $graphId
			})

			$nodes.splice($nodes.length - 1, 1, insertedNode)

			$nodes = $nodes
		} else {
			let insertedNode = await trpc().nodes.newModelNode.mutate({
				position: position,
				modelInfo: info,
				graphId: $graphId
			})

			$nodes.splice($nodes.length - 1, 1, insertedNode)

			$nodes = $nodes
		}
		modalStore.close()
	}
</script>

<div class="wrapper">
	<section class="flex gap-2 justify-between items-center h-fit py-2">
		<aside class="overflow-auto overflow-x-scroll flex-1">
			<h1>{repoId}</h1>
			<p class="opacity-30 flex-auto">by {author ? author : 'unknown'}</p>
		</aside>

		<button
			on:click={handleClick}
			class="btn-md variant-outline rounded-md border-2 border-blue-500 h-12 w-40"
		>
			Add {nodeType === 'datasetNode' ? 'Dataset' : 'Model'}
		</button>
	</section>
	<section class="flex gap-2 text-sm overflow-x-auto overflow-hidden">
		{#if inFeatures}
			<p class="labels">
				{'Outputs:'}
			</p>
		{/if}
		{#each outFeatures as feature}
			<p class="p-3 bg-slate-100 rounded-sm flex justify-center items-center text-sm">
				{feature.label}
			</p>
		{/each}
		{#if inFeatures}
			<p class="labels">
				{'Outputs:'}
			</p>
			{#each inFeatures as feature}
				<p class="p-3 bg-slate-100 rounded-sm flex justify-center items-center text-sm">
					{feature.label}
				</p>
			{/each}
		{/if}
	</section>

	<!-- stats -->
	<section class="flex justify-between opacity-30 py-2">
		<aside class="flex justify-normal items-center gap-1">
			<ThumbsUp size={20} />
			{likes}
		</aside>
		<aside class="flex justify-center items-center gap-1">
			<Download size={20} />
			{downloads}
		</aside>
	</section>
</div>

<style>
	.wrapper {
		@apply w-full h-44 bg-slate-200 px-5 py-2 rounded-md flex flex-col justify-between;
	}
</style>
