<script lang="ts">
	export let parent: any
	console.log('parent', parent)

	const arr = [1, 2, 3, 4, 5]
</script>

<div
	class="flex min-w-[50rem] min-h-[30rem] bg-slate-100 p-16 rounded-md border-slate-700 border-4"
>
	hello
	<div>
		{#each arr as item}
			<p>{item}</p>
		{/each}
	</div>
</div>
