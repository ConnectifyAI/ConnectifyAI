<script lang="ts">
    import { ThumbsUp, LucideGitFork } from 'lucide-svelte'
    export let name:string;
    export let author:string;
    export let likes:number;
    export let forks:number;
</script>


<div class="wrapper">
    <h1>Name:{' ' + name}</h1>
    <h1>Author:{' ' + author}</h1>
    <div class="flex justify-evenly space-x-3">
        <aside><ThumbsUp />{likes}</aside>
        <aside><LucideGitFork />{forks}</aside>
    </div>
</div>

<style>

	aside {
		@apply flex space-x-7 p-2 bg-slate-100 rounded-xl w-full justify-evenly font-dmMono;
	}
    .wrapper {
		@apply flex-col bg-gradient-to-r from-blue-200 to-slate-400 p-3 rounded-xl min-w-56 h-44 justify-center items-center space-y-4 font-dmMono mx-2;
	}
    h1 {
		@apply flex p-2 bg-slate-100 rounded-lg font-dmMono;
	}
    
</style>