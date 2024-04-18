<script lang="ts">
	import ResultCard from '$components/Modal/SubCompments/ResultCard.svelte'
	import Filter from '$components/Modal/SubCompments/Filter.svelte'
	import Dropdown from '$components/Community/Dropdown.svelte'
	import type { RouterOutputs } from '$lib/trpc/router'
	import { trpc } from '$lib/trpc/client'

	export let parent: any
	console.log('parent', parent)
	const type = 'dataset'

	let searchTerm = ''
	let isSearching = false

	let results: RouterOutputs['node']['searchForDatasets'] = []

	async function search(term: string) {
		console.log('searching', term)
		results = await trpc().node.searchForDatasets.query({
			query: searchTerm,
			take: 100
		})

		console.log(results)
	}

	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

	// arr of obj, pass into result card
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
	<h1 class="text-2xl">Discover</h1>
	<!-- <Search /> -->
	<form
		on:submit={() => {
			search(searchTerm)
			searchTerm = 'Searching...'
			isSearching = true
		}}
		class="flex gap-3 h-12 w-full"
	>
		<input
			type="text"
			bind:value={searchTerm}
			class="focus:ring-2 focus:ring-blu rounded-lg w-full"
			placeholder="Type here"
			disabled={isSearching}
		/>

		<!-- <Filter /> -->
		<Dropdown title="Input" contents={['opt 1', 'opt 2']} />
		<Dropdown title="Output" contents={['opt 1', 'opt 2']} />
		<Dropdown title="Function" contents={['opt 1', 'opt 2']} />
		<Dropdown title="Owner" contents={['opt 1', 'opt 2']} />

		<button type="submit"></button>
	</form>

	<section class="results">
		{#each arr as _}
			<ResultCard info={obj} />
		{/each}
	</section>
</div>

<style>
	* {
		@apply font-dmMono;
	}

	.wrapper {
		@apply flex flex-col items-center justify-center gap-5;
		@apply min-w-[1200px] min-h-[30rem] w-5/6 bg-slate-100 p-7 rounded-md border-slate-700 border-4;
	}

	.results {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[32rem] w-full overflow-y-auto;
	}
</style>
