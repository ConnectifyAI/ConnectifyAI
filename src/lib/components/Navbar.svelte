<script>
    import { AppBar } from '@skeletonlabs/skeleton';
    import { SendToBack } from 'lucide-svelte';
    import { SquareUserRound } from 'lucide-svelte';
    import { Download } from 'lucide-svelte';
</script>
<div >
<!-- shadow not working -->
<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" background="bg-slate-200" shadow="shadow-xl">
	<svelte:fragment slot="lead">
        <div class="flex text-3xl px-10 py-3 h-13 ">
            <div class="bg-blue-700 px-2 py-2 rounded-xl"><SendToBack size=30 color="white"/></div>
            <h1 class="ml-5 mt-1 text-black">ConnectifyAI</h1>
        </div>  
    </svelte:fragment>
	<svelte:fragment slot="trail">
        <div class="flex space-x-5">
            <div class="flex justify-between">
                <Download size=30 class="" color="black"/>
                <h1 class="text-2xl ml-3 text-black">Download</h1>
            </div>
            <div class="flex">
                <div class="w-0.5 h-fulle bg-black mr-5"></div>
                <SquareUserRound size=35 class="" color="black"/>
            </div>
        </div>
    </svelte:fragment>
</AppBar>
</div>