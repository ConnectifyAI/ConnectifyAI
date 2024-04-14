<script lang="ts">
	// @ts-nocheck
	import { writable } from 'svelte/store';
	import '@xyflow/svelte/dist/style.css';
	import { SvelteFlow, Background, Controls, MiniMap, Panel } from '@xyflow/svelte';

	import DatasetCard from '$components/Node/DatasetCard.svelte';
	import { nodes, edges, addNode, bgColor } from '$components/Node/Dataset';

	const nodeTypes = {
		datasetNode: DatasetCard
		// modelNode: ModelCard
	};

	export let data;

	console.log(data)

	let nodeText = '';
</script>

<div style="height:100vh;">
	<SvelteFlow {nodes} {edges} {nodeTypes} style="background: {$bgColor}" fitView>
		<Background />
		<Panel>
			<form on:submit={() => addNode(nodeText)} class="bg-slate-100 p-5">
				<label class="label">
					Test input
					<input
						bind:value={nodeText}
						class="input text-slate-50"
						type="text"
						placeholder="Input"
					/>
				</label>
				<button type="submit" class="btn variant-filled">
					<span>(icon)</span>
					<span>Add Node</span>
				</button>
			</form>
		</Panel>
		<Controls />
		<MiniMap />
	</SvelteFlow>
</div>
