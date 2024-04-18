<script lang="ts">
	export let contents: Array<string>
	export let title: string
</script>

<form method="GET" action="/login">
	<div class="flex space-x-4 items-center">
		<select name={title} id={title} class="rounded-lg outline-gris w-32 h-16">
			<option>{title}</option>
			{#each contents as value}
				<option {value} class="text-gris font-dmMono">{value}</option>
			{/each}
		</select>
	</div>
</form>
