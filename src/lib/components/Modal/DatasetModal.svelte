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

		isSearching = false
	}

	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

	// arr of obj, pass into result card
</script>

<div class="wrapper">
	<h1 class="text-2xl">Discover</h1>
	<!-- <Search /> -->
	<form
		on:submit={() => {
			search(searchTerm)
			isSearching = true
			searchTerm = ''
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
		{#if isSearching}
			<p>Searching...</p>
		{:else}
			<aside class="h-fit grid grid-cols-1 lg:grid-cols-2 gap-4">
				{#each results as result}
					<ResultCard info={result} />
				{/each}
			</aside>
		{/if}
	</section>
</div>

<style>
	* {
		@apply font-dmMono;
	}

	.wrapper {
		@apply flex flex-col justify-center gap-5;
		@apply min-w-[30rem] h-[40rem] w-5/6 bg-slate-100 p-12 rounded-md;
	}

	.results {
		@apply h-[32rem] w-full overflow-y-auto;
	}
</style>
