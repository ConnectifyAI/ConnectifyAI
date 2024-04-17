<!-- NEED TO FIGURE OUT MODEL ZIPING  -->
<script lang="ts">
    import Sample from '$lib/assets/sample.png';
	import { Step } from '@skeletonlabs/skeleton'
    import { Download } from 'lucide-svelte';
</script>

<Step class="px-10">
<svelte:fragment slot="header">
    <div class="flex space-x-2">
        <h1 class="font-dmMono text-gris ml-2 font-medium">New</h1>
        <h1 class=" font-dmMono text-blu ml-2 font-medium">Graph</h1>
    </div>
</svelte:fragment>
<div class="flex-col rounded-lg space-y-5">
    <div class="flex space-x-3 items-center">
        <div class="font-dmMono text-white rounded-full bg-blu flex items-center justify-center w-7 h-7" >1</div>
        <h1 class="font-dmMono text-gris">{"Step 1 - Download this tempalte ( if you dont allready have it )"}</h1>
    </div>
    <a download="sample.png" target="_blank" href={Sample} class="flex space-x-4 w-full px-10 py-5 border-2 mb-5 border-blu rounded-xl text-blu font-dmMono justify-center">
        <Download/>
        <h1>Download Model Zip Template</h1>
    </a>
</div>
</Step>

