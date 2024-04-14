<!-- Page where Communtiy is going for now -->
<script lang="ts">
    import Card from "$components/Card.svelte";
    import { ChevronDown } from 'lucide-svelte';
    import Searchbar from '$components/Searchbar.svelte';

</script>

<div class="h-full w-full ">
    <div class="h-1/4 w-full border-b px-20 py-32">
        <div class="flex">
            <div class="flex font-dmMono text-[27px]">
                <h1>Discover</h1>
                <button>
                    <div class="flex space-x-0">
                        <h1 class="text-blu ml-2 font-medium">Graphs</h1> 
                        <ChevronDown size=28 color="#1B59F8" />
                    </div>
                </button>
            </div>
        </div>
        <div class="py-4">
            <Searchbar presearch="search" width="1297" />
        </div>
        <div>
            
        </div>
    </div>
    <div class="h-4/5 w-fill">
        adsfja;ldsf
    </div>
</div>

