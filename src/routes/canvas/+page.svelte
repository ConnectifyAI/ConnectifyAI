<script lang="ts">
	// @ts-nocheck
	import { writable } from 'svelte/store';
	import '@xyflow/svelte/dist/style.css';
	import { SvelteFlow, Background, Controls, MiniMap, Panel } from '@xyflow/svelte';
	import AddCard from '$components/AddCard.svelte';

	const nodeTypes = {
		addCard: AddCard
	};

	const nodes = writable<Node[]>([
		{
			id: '1',
			type: 'addCard',
			position: { x: 0, y: 50 }
		},
		{
			id: '2',
			type: 'input',
			data: { label: 'An input node' },
			position: { x: 0, y: 50 }
		}
	]);
	const edges = writable([]);

	const defaultEdgeOptions = {
		type: 'smoothstep'
	};
</script>

<div style="height:100vh;">
	<SvelteFlow {nodes} {edges} {nodeTypes} {defaultEdgeOptions} fitView>
		<Background />
		<Controls />
	</SvelteFlow>
</div>
