<script lang="ts">
	import { Step } from '@skeletonlabs/skeleton'
	import { FileDropzone } from '@skeletonlabs/skeleton'
	import { CloudUpload } from 'lucide-svelte'

	let files: FileList
	//manages where file goes on upload needs to be changed later
	function onChangeHandler(e: Event): void {
		console.log('file data:', e)
		const colorDiv = document.getElementById('colorDiv')
	}
</script>

<Step class="px-10">
	<svelte:fragment slot="header">
		<div class="flex justify-center">
			<h1 class="font-dmMono text-gris ml-2 font-medium">New Graph</h1>
		</div>
	</svelte:fragment>
	<div class="flex-col rounded-lg space-y-5">
		<div class="flex space-x-3 items-center">
			<div
				class="font-dmMono text-white rounded-full bg-blu flex items-center justify-center w-7 h-7"
			>
				2
			</div>
			<h1 class="font-dmMono text-gris">
				{'Step 2 – Modify all required files. Then upload the modified ZIP file.'}
			</h1>
		</div>
		<FileDropzone
			bind:files
			on:change={onChangeHandler}
			name="files"
			border="border-2 border-gris border-dashed"
			rounded="rounded-xl"
		>
			<svelte:fragment slot="lead">
				<div class="flex justify-center"><CloudUpload size="30" /></div>
			</svelte:fragment>
			<svelte:fragment slot="message">
				<h1>Upload Modified ZIP Template</h1>
			</svelte:fragment>
			<svelte:fragment slot="meta">(must be .zip)</svelte:fragment>
		</FileDropzone>
	</div>
</Step>
