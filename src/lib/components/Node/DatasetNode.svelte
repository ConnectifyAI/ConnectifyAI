<script lang="ts">
	// @ts-nocheck
	import type { Writable } from 'svelte/store'
	import { tick } from 'svelte'
	import {
		Handle,
		Position,
		type NodeProps,
		useEdges,
		useConnection,
		useNodes
	} from '@xyflow/svelte'
	import { Database, X, MoveRight } from 'lucide-svelte'

	import OutputFeatures from '$components/Node/OutputFeatures.svelte'
	import { onMount } from 'svelte'
	import Accordion from '$components/Accordion.svelte'

	export let data: {
		datasetInfo: {
			id: string // dataset repo name
			author: string // dataset author
			features: string[] // dataset features
		}
	}

	let repo_name, author, features, feature_len, displayName

	onMount(async () => {
		repo_name = displayName = data.datasetInfo?.id
		author = data.datasetInfo?.author
		features = data.datasetInfo?.features
		feature_len = data.datasetInfo?.features.length
	})

	// call this function when displayName changes
	// $: updateDisplayName(displayName)

	// $: console.log('datasetInfo: DatasetNode.sv', data.datasetInfo?.id);

	// const { id } = data?.datasetInfo;
	// $: console.log('id: DatasetNode.sv', id);
	// $: console.log(text);

	const edges = useEdges()
	edges.subscribe((v) => console.log(v))
	// const nodes = useNodes()

	// let selectedNodeId = ''
	// nodes.subscribe((v) => {
	// 	v.forEach((node) => {
	// 		if (node.selected) {
	// 			selectedNodeId = node.id
	// 		}
	// 	})
	// })

	// const connection = useConnection();
	// connection.subscribe((v) => console.log(v));

	let inputElement: HTMLInputElement
	let isEditing = false
	const toggleEditing = async () => {
		isEditing = !isEditing
		if (isEditing) {
			await tick()
			inputElement.focus()
		}
	}

	const DEFAULT_HANDLE_STYLE = 'width: 10px; height: 10px; bottom: -5px;'
</script>

<!-- dimension of card -->
<div class="bg-[#eee] p-5 rounded-md w-[26rem]">
	<!-- HANDLES -->
	<Handle type="target" position={Position.Left} />
	<Handle type="source" position={Position.Right} />

	<Handle
		id="abcd"
		type="target"
		position={Position.Bottom}
		style="{DEFAULT_HANDLE_STYLE}; left: 15%; background: red;"
	/>
	<Handle
		id="blue"
		type="target"
		position={Position.Bottom}
		style="{DEFAULT_HANDLE_STYLE}; left: 50%; background: blue;"
	/>

	<div class="container">
		<!-- dataset/model display name -->
		<section class="flex gap-1 py-1 items-center">
			<Database size={23} />

			{#if isEditing}
				<form on:submit={toggleEditing} on:focusout={toggleEditing}>
					<input
						type="text"
						bind:value={displayName}
						bind:this={inputElement}
						class="p-2 w-[21rem] rounded-md text-left selection:bg-fuchsia-300 selection:text-fuchsia-900 nodrag nowheel "
					/>
					<button type="submit" class="hidden">Submit</button>
				</form>
			{:else}
				<button class="p-2 w-[21rem] rounded-md text-left hover:bg-slate-100" on:click={toggleEditing}>{displayName}</button>
			{/if}
		</section>

		<hr class="opacity-30" />

		<!-- repo_name -->
		<section class="py-2">{repo_name}</section>

		<Accordion>
			<span slot="head">
				<h2 class="flex items-centerp p-1 gap-3">
					<MoveRight size={20} />
					Outputs ({feature_len})
				</h2>
			</span>
			<div slot="details">
				<section class="flex gap-3 overflow-x-auto nowheel">
					{#if features}
						{#each features as feature}
							<OutputFeatures name={feature?.name} type={feature.dtype} />
						{/each}
					{/if}
				</section>
			</div>
		</Accordion>
	</div>
</div>
