<script lang="ts">
	import GraphCard from '$components/LandingPage/GraphCard.svelte'
	import { CirclePlus } from 'lucide-svelte'

    export let data

	let userGraphList = data.userGraphs
	let overallGraphList = data.allGraphs
</script>

<div class="p-10 flex-col space-y-5">
	<h1 class="heading">Your Graphs</h1>
	<!-- Personal Graph Section -->
    <section>
		<a class="wrapper" href="/proc/canvas-test">
			<aside class="opgg">
				Create New
				<CirclePlus />
			</aside>
		</a>
		{#if userGraphList}
			{#each userGraphList as graph}
				<GraphCard
					name={graph.name}
					author={graph.authorId}
					likes={graph.likes}
					forks={graph.forks}
				/>
			{/each}
		{/if}
	</section>
    <!-- Community Graphs Sections -->
	<h1 class="heading">Community Graphs</h1>
	<section>
		{#each overallGraphList as graph}
			<GraphCard
				name={graph.name}
				author={graph.authorId}
				likes={graph.likes}
				forks={graph.forks}
			/>
		{/each}
	</section>
</div>

<style>
	.heading {
		@apply text-4xl font-bold font-dmMono bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-950;
	}
	.wrapper {
		@apply flex-col bg-gradient-to-r from-blue-200 to-slate-400 p-3 rounded-xl min-w-56 h-44 justify-center items-center space-y-4 font-dmMono;
	}
	section {
		@apply flex overflow-x-auto;
	}
	.opgg {
		@apply flex w-full h-full bg-slate-100 rounded-xl justify-evenly items-center font-dmMono;
	}
</style>
