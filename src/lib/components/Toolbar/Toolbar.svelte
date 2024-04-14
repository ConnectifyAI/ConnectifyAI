<script lang="ts">
	import IconButton from '$components/Toolbar/IconButton.svelte';
	import { Boxes, Database } from 'lucide-svelte';
</script>

<div class="flex flex-col bg-slate-50 p-3 gap-3 rounded-md">
	<IconButton icon={Boxes} text="Add Model" />
	<IconButton icon={Database} text="Add Dataset" />
</div>
