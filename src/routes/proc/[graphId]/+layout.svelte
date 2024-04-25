<script>
	import { SvelteFlowProvider } from '@xyflow/svelte'
</script>

<div class="h-full">
	<SvelteFlowProvider>
		<slot />
	</SvelteFlowProvider>
</div>
