<script lang="ts">
	// @ts-nocheck
	import { Boxes, Plus, Trash } from 'lucide-svelte'
	import { type Position } from '@xyflow/svelte'

	import Accordion from '$components/Node/Accordion.svelte'
	import { getModalStore } from '@skeletonlabs/skeleton'

	import { deleteNode, pathMode, nodePath } from '$stores/graph'
	import { onDestroy } from 'svelte'
	import { trpc } from '$lib/trpc/client'

	export let data: ModelNodeData | DatasetNodeData
	export let id: string

	onDestroy(async () => {
		if (data.repoId) {
			console.log('destroying')
			//await trpc().nodes.deleteNode.mutate(id)
		}
	})

	// export let type: any
	// console.log('DatasetNode', data, id, type)

	const modalStore = getModalStore()

	const modal: ModalSettings = {
		type: 'component',
		component: 'modelModal',

		backdropClasses: '!bg-slate-800/50',
		// modalClasses: '!bg-red-500',
		response: (r) => console.log('response:', r),
		meta: {
			nodeId: id
		}
	}

	const openModal = () => {
		modalStore.trigger(modal)
	}

	let repoName, author, outFeatures, inFeatures, inFeaturesLen, outFeaturesLen, displayName

	$: {
		repoName = data?.repoId
		author = data?.author
		outFeatures = data?.outFeatures
		inFeatures = data?.inFeatures

		inFeaturesLen = inFeatures ? inFeatures.length : 0
		outFeaturesLen = outFeatures ? outFeatures.length : 0
	}

	let nodeSelected = false
	nodePath.subscribe((arr) => {
		console.log('nodePath', arr)
		nodeSelected = false
		arr.forEach((nodeId) => {
			if (nodeId == id) {
				nodeSelected = true
			}
		})
	})
</script>

<!-- IF NODE INTIALIZED, UI FOR NODE -->
{#if repoName}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="wrapper bg-[#eee] {$pathMode ? 'bg-blue-300' : ''} {nodeSelected
			? 'bg-green-300 bg-opacity-100'
			: ''}"
	>
		<!-- dataset/model display name -->
		<section class="flex gap-1 py-1 items-center text-lg">
			<Boxes size={23} />
			Model Display Name
		</section>

		<hr class="opacity-30" />

		<!-- repoName -->
		<section class="py-2">{repoName}</section>

		<Accordion featuresType="Inputs" features={inFeatures} featuresLen={inFeaturesLen} />

		<Accordion featuresType="Outputs" features={outFeatures} featuresLen={outFeaturesLen} />
	</div>
{:else}
	<aside class="flex">
		<button on:click={openModal}>
			<Plus size={23} />
			Add Model Here
		</button>
		<button on:click={() => deleteNode(id)} class="reset">
			<Trash size={32} class="bg-slate-50 p-1 rounded-md border-red-500 border-2" />
		</button>
	</aside>
{/if}

<style>
	.wrapper {
		@apply p-5 rounded-md w-[26rem] min-h-20;
	}

	aside > button {
		@apply flex flex-col justify-between items-center gap-2 bg-slate-100 py-5 px-16 rounded-md border-green-500 border-2;
	}

	.reset {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}
</style>
