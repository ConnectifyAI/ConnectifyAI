<!-- NEED TO FIGURE OUT MODEL ZIPING  -->
<script lang="ts">
    import Sample from '$lib/assets/sample.png';
	import { Step } from '@skeletonlabs/skeleton'
    import { Download } from 'lucide-svelte';
</script>

<Step class="px-10">
<svelte:fragment slot="header">
    <div class="flex space-x-2">
        <h1 class="font-dmMono text-gris ml-2 font-medium">New DataSet</h1>
    </div>
</svelte:fragment>
<div class="flex-col rounded-lg space-y-5">
    <div class="flex space-x-3 items-center">
        <div class="font-dmMono text-white rounded-full bg-blu flex items-center justify-center w-7 h-7" >3</div>
        <h1 class="font-dmMono text-gris">{"Name your Dataset"}</h1>
    </div>
    <form>
        <label class="font-dmMono text-gris">Name:</label><br>
        <input type="text" class="text-[18] block w-96 p-4 ps-10 text-sm text-gris border border-[#CFCFCF] rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue" placeholder="Enter Name" required>
    </form>
</div>
</Step>

