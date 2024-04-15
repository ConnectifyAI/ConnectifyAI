<script lang="ts">
	// @ts-nocheck
	import type { Writable } from 'svelte/store';
	import {
		Handle,
		Position,
		type NodeProps,
		useEdges,
		useConnection,
		useNodes
	} from '@xyflow/svelte';
	import { Database, X, MoveRight } from 'lucide-svelte';

	import OutputFeatures from '$components/Node/OutputFeatures.svelte';
	import { onMount } from 'svelte';
	import Accordion from '$components/Accordion.svelte';
	// import { deleteNode } from '$components/Node/Dataset';

	export let data: {
		datasetInfo: {
			id: string; // dataset repo name
			author: string; // dataset author
			features: string[]; // dataset features
		};
	};

	let repo_name = '',
		author = '',
		features = [],
		feature_len = 0;

	onMount(async () => {
		repo_name = data.datasetInfo?.id;
		author = data.datasetInfo?.author;
		features = data.datasetInfo?.features;
		feature_len = data.datasetInfo?.features.length;
	});
	// $: console.log('datasetInfo: DatasetNode.sv', data.datasetInfo?.id);

	// const { id } = data?.datasetInfo;
	// $: console.log('id: DatasetNode.sv', id);
	// $: console.log(text);
	let text = 'hi';

	const edges = useEdges();
	// edges.subscribe((v) => console.log(v));
	const nodes = useNodes();

	let selectedNodeId = '';
	nodes.subscribe((v) => {
		v.forEach((node) => {
			if (node.selected) {
				selectedNodeId = node.id;
			}
		});
	});
	// const connection = useConnection();
	// connection.subscribe((v) => console.log(v));
</script>

<!-- dimension of card -->
<div class="bg-[#eee] p-5 rounded-md w-[25rem]">
	<Handle type="target" position={Position.Left} />
	<Handle type="source" position={Position.Right} />

	<div class="container">
		<!-- <h1>{data.datasetInfo.id}</h1> -->
		<!-- <h2>{data.datasetInfo.author}</h2>
		<ul>
			{#each data.datasetInfo.features as feature (feature)}
				<li>{feature}</li>
			{/each}
		</ul> -->

		<!-- title -->
		<section class="flex justify-between items-center">
			<span class="flex gap-1 py-1 items-center">
				<Database size={23} />
				<h1 class="text-lg">Dataset</h1>
			</span>

			<!-- delete button -->
			<!-- <button
				class="btn-icon hover:bg-blue-50 rounded-md nodrag"
				on:click={() => {
					deleteNode(selectedNodeId);
				}}
			>
				<X size={25} />
			</button> -->
		</section>
		<hr class="opacity-30" />

		<!-- source/dataset name -->
		<h2 class="py-2">{repo_name}</h2>

		<Accordion>
			<span slot="head">
				<h2 class="flex items-center gap-3">
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
