<script lang="ts">
	// @ts-nocheck
	import { tick } from 'svelte'
	import { Handle, Position, useEdges, useConnection, useNodes } from '@xyflow/svelte'
	import { onMount } from 'svelte'
	import { Database, MoveRight } from 'lucide-svelte'

	import OutputFeature from '$components/Node/OutputFeature.svelte'
	import Accordion from '$components/Accordion.svelte'

	export let data: DatasetNodeData

	let repo_name, author, features, features_len, displayName

	$: {
		repo_name = data.datasetInfo?.id
		author = data.datasetInfo?.author
		features = data.datasetInfo?.features
		features_len = data.datasetInfo?.features.length
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

	// generate unique id for each handle
	const generateId = () => Math.random().toString()

	const DEFAULT_HANDLE_STYLE = 'width: 10px; height: 10px; bottom: -5px;'
</script>

<!-- dimension of card -->
<div class="bg-[#eee] p-5 rounded-md w-[26rem]">
	<!-- HANDLES -->
	{#if features}
		{#each features as _, index}
			<Handle
				id={generateId()}
				+
				{index}
				type="source"
				position={Position.Right}
				style="{DEFAULT_HANDLE_STYLE}; top: {((index + 1) * 100) /
					(features_len + 1)}%; background: red;"
			/>
		{/each}
	{/if}

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

		<Accordion>
			<span slot="head">
				<h2 class="flex items-centerp p-1 gap-3">
					<MoveRight size={20} />
					Outputs ({features_len})
				</h2>
			</span>
			<div slot="details">
				<section class="flex gap-3 overflow-x-auto nowheel">
					{#if features}
						{#each features as feature}
							<OutputFeature name={feature?.name} type={feature.dtype} />
						{/each}
					{/if}
				</section>
			</div>
		</Accordion>
	</div>
</div>
