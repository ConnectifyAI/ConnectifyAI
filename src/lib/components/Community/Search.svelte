<script lang="ts">
	import { Dropdown } from '$components/Community'
	let searchTerm = ''

	function searchSomething() {}
</script>

<div class="wrapper">
	<section class="flex-col">
		<h1 class="font-dmMono text-[27px]">Discover</h1>
		<div class="flex">
			<input
				type="text"
				bind:value={searchTerm}
				on:input={searchSomething}
				class="focus:ring-2 focus:ring-blu rounded-lg font-dmMono h-16 w-2/3"
				placeholder="Type here"
			/>
			<section class="flex w-1/3">
				<Dropdown title="Input" contents={['asdfd', 'adfsdf']} />
				<Dropdown title="Output" contents={['asdfd', 'adfsdf']} />
				<Dropdown title="Function" contents={['asdfd', 'adfsdf']} />
				<Dropdown title="Owner" contents={['asdfd', 'adfsdf']} />
			</section>
		</div>
	</section>
</div>

<style>
	.wrapper {
		@apply h-1/4 w-full border-b flex bg-slate-300 p-10 min-w-[1069px];
	}
</style>
