<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
</script>

<div>
	<Handle type="target" position={Position.Left} onconnect={(target) => console.log(target)} />
	<!-- card structure -->
	<div class="container">
		Add Card: Say Cheese!

		<!-- output group -->
		<section class="flex">
			<button class="btn">Selectable</button>
			<button class="btn">Selectable</button>
			<button class="btn">Selectable</button>
		</section>
	</div>
	<Handle type="source" position={Position.Right} isConnectable={false} />
</div>
