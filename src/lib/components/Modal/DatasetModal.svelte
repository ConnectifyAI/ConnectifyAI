<script lang="ts">
	import ResultCard from '$components/Modal/SubCompments/ResultCard.svelte'
	import Search from '$components/Community/Search.svelte'
	import { Dropdown } from '$components/Community'

	export let parent: any
	console.log('parent', parent)
	const type = 'dataset'

	let searchTerm = ''
	let isSearching = false

	function search(term: string) {
		console.log('searching', term)
	}

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

		<Dropdown title="Input" contents={['asdfd', 'adfsdf']} />
		<Dropdown title="Output" contents={['asdfd', 'adfsdf']} />
		<Dropdown title="Function" contents={['asdfd', 'adfsdf']} />
		<Dropdown title="Owner" contents={['asdfd', 'adfsdf']} />

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
		@apply flex flex-col justify-center gap-5;
		@apply min-w-[30rem] min-h-[30rem] w-5/6 bg-slate-100 p-9 rounded-xl;
	}

	.results {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[32rem] w-full overflow-y-auto;
	}
</style>
