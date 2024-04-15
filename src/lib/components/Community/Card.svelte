<script lang="ts">
	import { FileBox, Codepen } from 'lucide-svelte';
	export let modelType: string, author: string, name: string, in1: string, out: string;
	// export let viewCount: number;
	// export let downloadCount: number;
</script>

<div
	class="bg-slate-100 flex-col h-40 w-96 rounded-lg border-solid border-slate-300 ml-11 mt-11 border"
>
	<div class="h-1/5 border-b border-slate-300 flex justify-start items-center px-2">
		<FileBox size="20" />
		<h1 class="ml-1">{modelType}</h1>
	</div>
	<div class="h-4/5 flex-col">
		<div class="flex ml-auto px-2 py-2">
			<Codepen />
			<h1 class="ml-2">{author}/{name}</h1>
		</div>
		<div class="flex ml-auto px-2 py-2 space-x-10">
			<div class="flex justify-center px-3 w-40 h-10 bg-slate-300 rounded-lg py-2">
				in {' < '}{in1}
			</div>
			<div class="flex justify-center px-3 w-40 h-10 bg-slate-300 rounded-lg py-2">
				out {' > '}{out}
			</div>
		</div>
	</div>
</div>
