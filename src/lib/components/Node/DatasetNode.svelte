<script lang="ts">
	// @ts-nocheck
	import { Database, Plus, Trash } from 'lucide-svelte'
	import { Handle, Position, type Position, useSvelteFlow, getConnectedEdges } from '@xyflow/svelte'

	import Accordion from '$components/Node/Accordion.svelte'
	import { getModalStore } from '@skeletonlabs/skeleton'

	import { deleteNode, pathMode, path, nodes, edges } from '$stores/graph'

	const modalStore = getModalStore()

	const modal: ModalSettings = {
		type: 'component',
		component: 'datasetModal',

		backdropClasses: '!bg-slate-800/50',
		// modalClasses: '!bg-red-500',
		response: (r) => console.log('response:', r)
	}

	const openModal = () => {
		modalStore.trigger(modal)
	}

	// const modal: ModalSettings = {
	// 	// Provide arbitrary metadata to your modal instance:
	// 	meta: { foo: 'bar', fizz: 'buzz', fn: myCustomFunction }
	// }

	export let data: DatasetNodeData | ModelNodeData
	export let id: string
	// export let type: any
	// console.log('DatasetNode', data, id, type)

	let repoName, author, outFeatures, outFeaturesLen, displayName

	$: {
		repoName = data?.repoId
		author = data?.author
		outFeatures = data?.outFeatures
		outFeaturesLen = outFeatures ? outFeatures.length : 0
	}

	const { getNode } = useSvelteFlow()
	let nodeSelected = false

	path.subscribe((value) => {
		if (value == id) {
			nodeSelected = true
		}
	})
	const connectedEdges = getConnectedEdges($nodes, $edges)
	$: console.log('connectedEdges', connectedEdges)

	const selectNode = () => {
		console.log('select node', id, $pathMode, nodeSelected)
		if ($pathMode) {
			if (nodeSelected) {
				console.log('ID', id)
				$path.forEach((nodeId, index) => {
					// remove node from path
					if (nodeId === id) {
						if ((index = 0)) {
							$path = []
						} else {
							$path = $path.slice(0, index)
						}
					}
				})

				console.log('node already selected, remove from path', $path)
			} else {
				console.log('here', id)
				const last = $path.length - 1
				let prevNodeData = getNode(last)
				let currNodeData = getNode(id)

				console.log('Sselect node')
			}

			nodeSelected = !nodeSelected
		}
		// 	// uncheck node if already selected
		// 	if (nodeSelected) {
		// 		$path.forEach((nodeId, index) => {
		// 			if (nodeId === id) {
		// 				$path = $path.slice(0, index)
		// 			}
		// 		})
		// 	} else {
		// 		// node not selected
		// 		const len = $path.length
		// 		if (len == 0 && getNode(id).type == 'dataset') {
		// 			$path.push(id)
		// 		} else {
		// 			let prevNodeData = getNode($path[len - 1])
		// 			let currNodeData = getNode(id)
		// 			const connectedEdges = getConnectedEdges([prevNodeData, currNodeData], $edges)
		// 			console.log('prevNodeData:', prevNodeData, 'currNodeid', id)
		// 			console.log('connectedEdges', connectedEdges)
		// 			// if (prevNodeId !== id) {
		// 			// 	$path.push(id)
		// 			// 	nodeSelected = !nodeSelected
		// 			// }
		// 		}
		// 	}
		// }
	}

	pathMode.subscribe((value) => {
		if (value) {
			nodeSelected = false
		}
	})
</script>

<!-- IF NODE INTIALIZED -->
{#if repoName}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="wrapper bg-[#eee] {$pathMode ? 'bg-blue-300' : ''} {nodeSelected
			? 'bg-green-300 bg-opacity-100'
			: ''}"
		on:click={selectNode}
	>
		<!-- dataset/model display name -->
		<section class="flex gap-1 py-1 items-center text-lg">
			<Database size={23} />
			Dataset 1
		</section>

		<hr class="opacity-30" />

		<!-- repoName -->
		<section class="py-2">{repoName}</section>

		<Accordion featuresType="Outputs" features={outFeatures} featuresLen={outFeaturesLen} />
	</div>
{:else}
	<aside class="flex">
		<button on:click={openModal}>
			<Plus size={23} />
			Add Dataset Here
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
