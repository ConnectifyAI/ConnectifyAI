<script lang="ts">
    import { FileBox } from 'lucide-svelte';
    import { Codepen } from 'lucide-svelte';
    export let modelType: string;
    export let author: string;
    export let name:string;
    // export let viewCont: number;
    // export let downloadCount: number;
    export let in1: string;
    export let out: string;
</script>


<div class="bg-slate-100 flex-col h-1/6 w-1/3 rounded-lg border-solid border-slate-300 ml-11 mt-11 border">
    <div class="h-1/5 border-b border-slate-300 flex justify-start items-center px-2">
        <FileBox size=20/>
        <h1 class="ml-1">{modelType}</h1>
    </div>
    <div class="h-4/5 flex-col">
        <div class="flex ml-auto px-2 py-2">
            <Codepen/>
            <h1 class="ml-2">{author}/{name}</h1>
        </div>
        <div class="flex ml-auto px-2 py-2 space-x-10">
            <div class="flex justify-center px-3 w-32 h-10 bg-slate-300 rounded-lg py-2">in {" < "}{in1} </div>
            <div class="flex justify-center px-3 w-32 h-10 bg-slate-300 rounded-lg py-2">out {" > "}{out}</div>
        </div>
    </div>
</div>