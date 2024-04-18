<script lang="ts">
	import ResultCard from '$components/Modal/SubCompments/ResultCard.svelte'
	import Search from '$components/Community/Search.svelte'

	export let parent: any
	console.log('parent', parent)
	const type = 'dataset'

	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

	const obj = {
		repoId: '123',
		author: 'author',
		outputFeatures: [],
		downloads: 0,
		likes: 0,
		createdAt: '2021-10-10'
	}
</script>

<div class="wrapper">
	<Search />
	<section class="results">
		{#each arr as _}
			<ResultCard info={obj} />
		{/each}
	</section>
</div>

<style>
	.wrapper {
		@apply flex flex-col items-center justify-center gap-5;
		@apply min-w-[1069px] min-h-[30rem] w-5/6 bg-slate-100 p-7 rounded-md border-slate-700 border-4;
	}

	.results {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[32rem] w-full overflow-y-auto p-3;
	}
</style>
