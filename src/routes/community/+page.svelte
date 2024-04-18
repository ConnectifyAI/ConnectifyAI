<!-- Page where Communtiy is going for now -->
<script lang="ts">
	import { Card, DatasetCard, Dropdown } from '$components/Community'
	import { ChevronDown } from 'lucide-svelte'
	import Searchbar from '$components/Navigation/Searchbar.svelte'
</script>

<div class="h-full w-full">
	<div class="h-1/4 w-full border-b px-20 flex-col justify-center py-8">
		<div class="flex">
			<div class="flex font-dmMono text-[27px]">
				<h1>Discover</h1>
				<button>
					<div class="flex space-x-0">
						<h1 class="text-blu ml-2 font-medium">Graphs</h1>
						<ChevronDown size="28" color="#1B59F8" />
					</div>
				</button>
			</div>
		</div>
		<div class="py-4">
			<Searchbar presearch="search" width="1297" />
		</div>
		<div class="flex space-x-6">
			<Dropdown title="Owner" contents={['asdfd', 'adfsdf']} />
			<Dropdown title="Function" contents={['asdfd', 'adfsdf']} />
			<Dropdown title="Upload Date" contents={['asdfd', 'adfsdf']} />
		</div>
	</div>

	<div class="h-3/4 w-full flex">
		<div class="wrapper">
			<Card modelType="RAG" author="bert" name="cool AI model" in1="data" out="cool data" />
			<Card modelType="RAG" author="bert" name="cool AI model" in1="data" out="cool data" />
			<Card modelType="RAG" author="bert" name="cool AI model" in1="data" out="cool data" />
		</div>
		<div class="wrapper">
			<DatasetCard author="albert" id="Chipolte" downloads="123" likes="123" />
		</div>
		<div class="wrapper">
			<Card modelType="RAG" author="bert" name="cool AI model" in1="data" out="cool data" />
			<Card modelType="RAG" author="bert" name="cool AI model" in1="data" out="cool data" />
			<Card modelType="RAG" author="bert" name="cool AI model" in1="data" out="cool data" />
		</div>
	</div>
</div>

<style>
	.wrapper {
		@apply flex-col w-1/3;
	}
</style>
