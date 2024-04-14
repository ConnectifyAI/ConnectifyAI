<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { Sun, X } from 'lucide-svelte';
	import OutputField from '$components/Node/OutputField.svelte';

	export let data: {
		color: Writable<string>;
		text?: string;
	};

	const { color, text } = data;
</script>

<!-- dimension of card -->
<div class="bg-[#eee] p-5 rounded-md w-[25rem]">
	<Handle type="target" position={Position.Left} />
	<Handle type="source" position={Position.Right} />

	<!-- <div>
		mix color: <strong>{$color}</strong>
	</div>
	<input
		class="nodrag"
		type="color"
		on:input={(evt) => data.color.set(evt.target?.value)}
		value={$color}
	/>
	{#if data.text}
		<div>{data.text}</div>
	{/if} -->
	<div class="container">
		<!-- title -->
		<section class="flex justify-between items-center">
			<span class="flex gap-1 py-1 items-center">
				<Sun size={23} />
				<h1 class="text-lg">Dataset 1</h1>
			</span>

			<button class="btn-icon hover:bg-blue-50 rounded-md nodrag">
				<X size={25} />
			</button>
		</section>
		<hr class="opacity-30" />

		<!-- source/dataset name -->
		<h2 class="py-2">openai/text_library</h2>

		<h2>Outputs (4)</h2>

		<section class="flex gap-3 overflow-x-auto nowheel">
			<OutputField />
			<OutputField />
			<OutputField />
		</section>
	</div>
</div>

<style>
	.colorpicker {
		padding: 1rem;
		background: #eee;
		border-radius: 0.125rem;
		font-size: 0.7rem;
	}
</style>
