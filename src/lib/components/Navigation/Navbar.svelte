<script lang="ts">
	import { graphName } from '$stores/graph'
	import { AppBar } from '@skeletonlabs/skeleton'
	import { SendToBack } from 'lucide-svelte'
	import { SquareUserRound } from 'lucide-svelte'
	import { Download } from 'lucide-svelte'
</script>

<div class="">
	<AppBar
		gridColumns="grid-cols-3"
		slotDefault="place-self-center"
		slotTrail="place-content-end"
		background="bg-slate-200"
		shadow="shadow-xl"
	>
		<svelte:fragment slot="lead">
			<div class="flex items-center px-10 py-2 h-13">
				<a class="bg-blue-700 px-2 py-2 rounded-xl" href="/proc/"
					><SendToBack size="30" color="white" /></a
				>
				<h3 class="heading ml-5">ConnectifyAI</h3>
			</div>
		</svelte:fragment>

		<div class="font-dmMono text-3xl">
			<!--TODO fix this later -->
			<!-- {$graphName} -->
		</div>

		<svelte:fragment slot="trail">
			<div class="flex space-x-5">
				<div class="flex justify-between">
					<Download size="30" class="" color="black" />
					<h1 class="text-lg ml-3 font-dmMono text-black">Download</h1>
				</div>
				<div class="flex">
					<div class="w-0.5 h-full bg-black mr-5"></div>
					<SquareUserRound size="30" class="" color="black" />
				</div>
			</div>
		</svelte:fragment>
	</AppBar>
</div>

<style>
	.heading {
		color: black;
		font-family: Poppins;
		font-size: 24px;
		font-weight: 600;
		line-height: 29px;
		letter-spacing: 0em;
		text-align: left;
	}
</style>
