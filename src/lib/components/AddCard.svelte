<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
</script>

<div>
	<Handle type="target" position={Position.Left} onconnect={(target) => console.log(target)} />
	Add Card: Say Cheese!
	<Handle type="source" position={Position.Right} isConnectable={false} />
</div>
