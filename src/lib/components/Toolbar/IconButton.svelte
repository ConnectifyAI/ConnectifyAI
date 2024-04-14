<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';

	export let icon: ComponentType<Icon>;
	export let text: string;
</script>

<button class="flex flex-col items-center p-5 rounded-md border border-slate-300">
	<svelte:component this={icon} class="size-6" />
	<span>{text}</span>
</button>
