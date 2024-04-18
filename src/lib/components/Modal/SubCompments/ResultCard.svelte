<script lang="ts">
	import { ThumbsUp, Download } from 'lucide-svelte'
	import type { DatasetInfo, ModelInfo } from '$lib/server/helpers/apiTypes'
	export let info: DatasetInfo | ModelInfo
	// Model | Dataset
	const { author, repoId , outputFeatures, downloads, likes, createdAt } = info

</script>

<div class="wrapper">
	<section class="flex justify-between items-center">
		<aside class="">
			<h1>{repoId}</h1>
			<p class="opacity-30">by {author}</p>
		</aside>

		<button class="btn-md variant-outline rounded-md border-2 border-blue-500">Add Dataset</button>
	</section>
	<section class="= grid grid-row-1 grid-cols-2 gap-2 text-sm p-2">
		{#each outputFeatures as feature}
			<p class=" px-1 min-w-24 bg-slate-100 rounded-sm flex justify-center items-center text-[14px]">{feature.label+": "+feature.dtype}</p>
		{/each}

	</section>

	<!-- stats -->
	<section class="flex justify-between opacity-30">
		<aside class="flex justify-normal items-center gap-1">
			<ThumbsUp size={20} />
			{likes}
		</aside>
		<aside class="flex justify-center items-center gap-1">
			<Download size={20} />
			{downloads}
		</aside>
	</section>
</div>

<style>
	.wrapper {
		@apply w-full bg-slate-200 p-5 rounded-md flex flex-col justify-between;
	}
</style>
