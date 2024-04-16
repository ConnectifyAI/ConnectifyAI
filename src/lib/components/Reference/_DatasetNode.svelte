<script lang="ts">
	// @ts-nocheck
	import { tick } from 'svelte'
	import { Handle, Position, useEdges, useConnection, useNodes } from '@xyflow/svelte'
	import { onMount } from 'svelte'
	import { Database, MoveRight } from 'lucide-svelte'

	import OutputFeature from '$components/Node/Feature.svelte'
	import Accordion from '$components/Node/Accordion.svelte'

	export let data: DatasetNodeData

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

	// call this function when displayName changes
	// $: updateDisplayName(displayName)

	// $: console.log('datasetInfo: DatasetNode.sv', data.datasetInfo?.id);

	// const { id } = data?.datasetInfo;
	// $: console.log('id: DatasetNode.sv', id);
	// $: console.log(text);

	const edges = useEdges()
	edges.subscribe((v) => console.log('edges', v))
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

	// editable display name
	let inputElement: HTMLInputElement
	let isEditing = false
	const toggleEditing = async () => {
		isEditing = !isEditing
		if (isEditing) {
			await tick()
			inputElement.focus()
		}
	}

	const DEFAULT_HANDLE_STYLE = 'width: 15px; height: 15px; bottom: -5px;'
</script>

<!-- dimension of card -->
<div class="bg-[#eee] p-5 rounded-md w-[26rem]">
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
						class="p-2 w-[21rem] rounded-md text-left selection:bg-fuchsia-300 selection:text-fuchsia-900 nodrag nowheel"
					/>
					<button type="submit" class="hidden">Submit</button>
				</form>
			{:else}
				<button
					class="p-2 w-[21rem] rounded-md text-left hover:bg-slate-100"
					on:click={toggleEditing}>{displayName}</button
				>
			{/if}
		</section>

		<hr class="opacity-30" />

		<!-- repo_name -->
		<section class="py-2">{repo_name}</section>

		<Accordion features_type="Outputs" features={out_features} features_len={out_features_len} />
	</div>
</div>
