<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let icon: ComponentType<Icon>;
	export let text: string;

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
	on:dragstart={(event) => onDragStart(event, 'input')}
	draggable={true}
	role="button"
	tabindex={0}
>
	<button class="flex flex-col items-center p-5 rounded-md border border-slate-300">
		<svelte:component this={icon} class="size-6" />
		<span>{text}</span>
	</button>
</div>
