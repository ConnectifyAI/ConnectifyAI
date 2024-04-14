<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let icon: ComponentType<Icon>, type: 'Model' | 'Dataset';

	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		event.dataTransfer.setData('application/svelteflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};
</script>

<div
	class="input-node node"
	on:dragstart={(event) => onDragStart(event, type.toLowerCase() + 'Node')}
	draggable={true}
	role="button"
	tabindex={0}
>
	<button class="flex flex-col items-center p-5 rounded-md border border-slate-300 w-36">
		<svelte:component this={icon} class="size-6" />
		<span>Add {type}</span>
	</button>
</div>
