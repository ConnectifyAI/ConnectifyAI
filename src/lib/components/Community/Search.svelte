
<script lang="ts">
	import { Card, DatasetCard, Dropdown } from '$components/Community';
	import { ChevronDown } from 'lucide-svelte';
	import Searchbar from '$components/Navigation/Searchbar.svelte';
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
			
		</div>
		<div class="flex space-x-6">
			<Dropdown title="Owner" contents={['asdfd', 'adfsdf']} />
			<Dropdown title="Function" contents={['asdfd', 'adfsdf']} />
			<Dropdown title="Upload Date" contents={['asdfd', 'adfsdf']} />
		</div>
	</div>
	
</div>

<style>
	.wrapper {
		@apply flex-col w-1/3;
	}
</style>
