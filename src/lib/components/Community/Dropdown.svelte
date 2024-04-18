<script lang="ts">
	export let contents: Array<string>
	export let title: string
</script>

<form method="GET" action="/login">
	<select name={title} id={title} class="rounded-lg outline-gris w-28 h-full">
		<option>{title}</option>
		{#each contents as value}
			<option {value} class="text-gris font-dmMono">{value}</option>
		{/each}
	</select>
</form>
