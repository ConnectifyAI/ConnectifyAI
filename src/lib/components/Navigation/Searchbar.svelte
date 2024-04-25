<script lang="ts">
	export let width: string
	export let presearch: string
	import { Search } from 'lucide-svelte'
</script>

<form class="max-w-{width} mx-auto">
	<label for="default-search" class="mb-2 text-sm font-medium font-dmMono text-gris sr-only"
		>Search</label
	>
	<div class="relative">
		<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
			<Search />
		</div>
		<input
			type="search"
			id="default-search"
			class="text-[18] block w-full p-4 ps-10 text-sm text-gris border border-[#CFCFCF] rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue"
			placeholder={presearch}
			required
		/>
	</div>
</form>
