<script lang="ts">
	import type { Icon } from 'lucide-svelte'
	import type { ComponentType } from 'svelte'

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
</script>

<button
	on:dragstart={(event) => onDragStart(event, type.toLowerCase() + 'Node')}
	class={draggable ? 'bg-slate-50 cursor-move' : 'no-drag'}
	{draggable}
>
	<svelte:component this={icon} class="size-7" />
	<span>Add {type}</span>
</button>

<style>
	button {
		@apply flex flex-col gap-1 items-center p-5 rounded-md border border-slate-300 w-36;
	}

	.no-drag {
		@apply bg-slate-200;
	}
</style>
