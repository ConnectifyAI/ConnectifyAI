<script lang="ts">
	import { Step } from '@skeletonlabs/skeleton'
    import { FileDropzone } from '@skeletonlabs/skeleton';
</script>

<Step class="px-10">
<svelte:fragment slot="header">
    <div class="flex justify-center">
        <h1 class="font-dmMono text-gris ml-2 font-medium">New Graph</h1>
    </div>
</svelte:fragment>
<div class="flex-col rounded-lg space-y-5">
    <div class="flex space-x-3 items-center">
        <div class="font-dmMono text-white rounded-full bg-blu flex items-center justify-center w-7 h-7" >2</div>
        <h1 class="font-dmMono text-gris">{"Step 2 – Modify all required files. Then upload the modified ZIP file."}</h1>
    </div>
    <FileDropzone name="files" class="flex rounded-lg border-2 border-blue-800 border-dashed">
        <svelte:fragment slot="lead">(icon)</svelte:fragment>
        <svelte:fragment slot="message">(message)</svelte:fragment>
        <svelte:fragment slot="meta">(meta)</svelte:fragment>
    </FileDropzone>
</div>
</Step>