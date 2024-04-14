<script lang="ts">
    import { FileBox } from 'lucide-svelte';
    import { Codepen } from 'lucide-svelte';
	import type { Integer } from 'neo4j-driver';
    export let author: string;
    export let id: string;
    export let downloads: Integer;
    export let likes: number;
    export let features: {name: string, dtype: string};
</script>


<div class="bg-slate-100 flex-col h-40 w-96 rounded-lg border-solid border-slate-300 ml-11 mt-11 border">
    <div class="h-1/5 border-b border-slate-300 flex justify-start items-center px-2">
        <FileBox size=20/>
        <h1 class="ml-1 font-dmMono text-gris">Dataset</h1>
    </div>
    <div class="h-4/5 flex-col">
        <div class="flex ml-auto px-2 py-2">
            <Codepen/>
            <h1 class="ml-2">{author}/{id}</h1>
        </div>
        <div class="flex ml-auto px-2 py-2 space-x-10">
            <div class="flex justify-center px-3 w-40 h-10 bg-slate-300 rounded-lg py-2">downloads: {" "}{downloads} </div>
            <div class="flex justify-center px-3 w-40 h-10 bg-slate-300 rounded-lg py-2">likes {" "}{likes}</div>
        </div>
    </div>
</div>