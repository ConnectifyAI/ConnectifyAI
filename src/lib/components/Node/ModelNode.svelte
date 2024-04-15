<script lang="ts">
	// @ts-nocheck
	import type { Writable } from 'svelte/store';
	import { Handle, Position, type NodeProps, useEdges, useNodes } from '@xyflow/svelte';
	import { Boxes, X } from 'lucide-svelte';
	import OutputFeatures from '$components/Node/OutputFeatures.svelte';
	import { deleteNode } from '$components/Node/Dataset';

	type $$Props = NodeProps;

	export let data: { color: Writable<string>; text: string } | $$Props['data'];

	const { text } = data;

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
	<!-- style="background: {$color} -->

	<Handle type="target" position={Position.Left} />
	<Handle type="source" position={Position.Right} />

	<div class="container">
		<!-- title -->
		<section class="flex justify-between items-center">
			<span class="flex gap-1 py-1 items-center">
				<Boxes size={23} />
				<h1 class="text-lg">Model 1</h1>
			</span>

			<button
				class="btn-icon hover:bg-blue-50 rounded-md nodrag"
				on:click={() => {
					deleteNode(selectedNodeId);
				}}
			>
				<X size={25} />
			</button>
		</section>
		<hr class="opacity-30" />

		<!-- source/dataset name -->
		<h2 class="py-2">{text ? text : 'dataset not found'}</h2>

		<h2>Outputs (4)</h2>

		<section class="flex gap-3 overflow-x-auto nowheel">
			<OutputFeatures />
			<OutputFeatures />
			<OutputFeatures />
			<OutputFeatures />
		</section>
	</div>
</div>
