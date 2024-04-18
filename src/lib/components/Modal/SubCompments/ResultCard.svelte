<script lang="ts">
	import { ThumbsUp, Download } from 'lucide-svelte'
	import type { DatasetInfo, ModelInfo } from '$lib/server/api/apiTypes'
	export let info: DatasetInfo | ModelInfo
	// Model | Dataset

	const { repoId, author, outputFeatures, downloads, likes, createdAt } = info

	// repoId: string,
	// author: string,
	// outputFeatures: Feature[]
	// downloads: number,
	// likes: number,
	// createdAt: string
</script>

<div class="wrapper">
	<section class="flex justify-between items-center">
		<aside class="">
			<h1>{repoId}</h1>
			<p class="opacity-30">by {author}</p>
		</aside>

		<button class="btn-md variant-outline rounded-md border-2 border-blue-500">Add Dataset</button>
	</section>
	<section>
		<!-- fields -->
		fields...
	</section>

	<!-- stats -->
	<section class="flex justify-between opacity-30">
		<aside class="flex justify-normal items-center gap-1" >
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
		@apply w-full h-40 bg-slate-200 p-5 rounded-md flex flex-col justify-between;
	}
</style>
