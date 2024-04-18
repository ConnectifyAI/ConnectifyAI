<script lang="ts">
	import IconButton from '$components/Toolbar/IconButton.svelte'
	import { Boxes, Database, Route } from 'lucide-svelte'
</script>

<div class="flex flex-col bg-slate-50 p-3 gap-4 rounded-md">
	<IconButton icon={Boxes} type="Model" />
	<IconButton icon={Database} type="Dataset" />
	<IconButton icon={Route} type="Path" />
</div>
