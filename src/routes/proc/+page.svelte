<script lang="ts">
	// @ts-nocheck
	import { CirclePlus } from 'lucide-svelte'
	import GraphCard from '$components/LandingPage/GraphCard.svelte'
	import { getModalStore, Modal } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton'
	import { trpc } from '$lib/trpc/client.js'
	import { goto } from '$app/navigation'

	const modalStore = getModalStore()

	export let data

	let userGraphList = data.userGraphs
	let overallGraphList = data.allGraphs

	//const modal: ModalSettings = {
	//type: 'prompt',
	//backdropClasses: '!bg-slate-800/70',
	//modalClasses: '!bg-slate-500',
	//
	// Data
	//title: 'Create New',
	//body: 'Provide your name in the field below.',
	// Populates the input value and attributes
	//value: '',
	//valueAttr: { type: 'text', required: true },
	// Returns the updated response value
	//response: async (r: string) => {
	//let x = await trpc().graphs.newGraph.mutate({
	//authorId: data.user.id,
	//name: r
	//})

	//}
	//}

	const createNewGraph = async () => {
		//modalStore.trigger(modal)
		//TODO: can only run this after resetting dbmodalplz
		let x = await trpc().graphs.newGraph.mutate({
			authorId: data.user.id,
			name: 'Undefined'
		})
		goto(`/proc/${x.id}`)
	}
</script>

<div class="p-10 flex-col space-y-5">
	<h1 class="heading">Your Graphs</h1>

	<!-- Personal Graph Section -->
	<section>
		<button class="wrapper" on:click={createNewGraph}>
			<aside class="opgg">
				Create New
				<CirclePlus />
			</aside>
		</button>

		{#if userGraphList}
			{#each userGraphList as graph}
				<GraphCard {graph} />
			{/each}
		{/if}
	</section>
	<!-- Community Graphs Sections -->
	<h1 class="heading">Community Graphs</h1>
	<section>
		{#each overallGraphList as graph}
			<a href={`/proc/${graph.id}`}>
				<GraphCard
					name={graph.name}
					author={graph.author.firstName}
					likes={graph.likes}
					forks={graph.forks}
				/>
			</a>
		{/each}
	</section>
</div>

<style>
	* {
		@apply font-dmSans;
	}

	.heading {
		@apply text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-950;
	}
	.wrapper {
		@apply flex-col-3 min-w-56 h-44 justify-center items-center space-y-4;
		@apply bg-gradient-to-r from-blue-200 to-slate-400 rounded-xl;
	}
	section {
		@apply flex overflow-x-auto;
	}
	.opgg {
		@apply flex w-full h-full bg-slate-100 rounded-xl justify-evenly items-center;
	}
</style>
