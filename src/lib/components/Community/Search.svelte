<script lang="ts">
	import { Card, DatasetCard, Dropdown } from '$components/Community'
	import { ChevronDown } from 'lucide-svelte'
	import Search from './Search.svelte'
	import { SearchSlash } from 'lucide-svelte'
	let searchTerm = ''

	function searchSomething() {}
</script>

<div class="h-1/4 w-full border-b flex space-x-10 bg-slate-300 p-10 ">
	<div class="flex-col justify-center">
		<div class="flex font-dmMono text-[27px]">
			<h1>Discover</h1>
		</div>
		<div class="py-5">
			<input
				type="text"
				bind:value={searchTerm}
				on:input={searchSomething}
				class="focus:ring-2 focus:ring-blu rounded-lg font-dmMono w-[900px] h-16"
				placeholder="Type here"
			/>
		</div>
	</div>
	<div class="flex space-x-3 mt-11">
		<Dropdown title="Input" contents={['asdfd', 'adfsdf']} />
		<Dropdown title="Output" contents={['asdfd', 'adfsdf']} />
		<Dropdown title="Function" contents={['asdfd', 'adfsdf']} />
		<Dropdown title="Owner" contents={['asdfd', 'adfsdf']} />
	</div>
</div>

<style>
	.wrapper {
		@apply flex-col w-1/3;
	}
</style>
