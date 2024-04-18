<script lang="ts">
	export let parent: any
	console.log('parent', parent)
	const arr = [1, 2, 3, 4, 5]
	import Search from '$components/Community/Search.svelte'
</script>

<div
	class="flex-col min-w-[1553px] min-h-[85vh] bg-slate-100 border-slate-700 border-4 rounded-xl "
>
	<Search />
	<div>
		{#each arr as item}
			<p>{item}</p>
		{/each}
	</div>
</div>
