<script lang="ts">
	import type { Icon } from 'lucide-svelte'
	import type { ComponentType } from 'svelte'
	import { pathMode, nodePath, edgePath, edges } from '$stores/graph'
	import { defaultEdgeOptions } from '$routes/proc/testing/Dataset'

	export let icon: ComponentType<Icon>
	export let type: 'Model' | 'Dataset' | 'Path'

	const draggable = type != 'Path'

	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) {
			return null
		}

		event.dataTransfer.setData('application/svelteflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
	}

	const resetPath = () => {
		;($nodePath = []), ($edgePath = [])
		$edges.forEach((edge) => {
			edge.style = defaultEdgeOptions.style
		})
		$edges = $edges
	}
</script>

<button
	on:dragstart={(event) => onDragStart(event, type.toLowerCase() + 'Node')}
	class={draggable ? 'bg-slate-50 cursor-move' : 'no-drag'}
	{draggable}
	on:click={() => {
		if (draggable) return
		$pathMode = !$pathMode
		if (!$pathMode) {
			resetPath()
		}
	}}
>
	{#if $pathMode && type === 'Path'}
		path mode...
	{:else}
		<svelte:component this={icon} class="size-7" />
		<span>Add {type}</span>
	{/if}
</button>

<style>
	button {
		@apply flex flex-col gap-1 items-center p-5 rounded-md border border-slate-300 w-36;
	}

	.no-drag {
		@apply bg-slate-200;
	}
</style>
