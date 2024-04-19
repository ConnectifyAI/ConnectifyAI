
<script lang="ts">
	import { Zap, Users, Settings } from 'lucide-svelte'
	import { page } from '$app/stores'
	$: url = $page.url.pathname
	let visblity: string = 'hidden'
	function minimize() {
		visblity = 'hidden'
	}

	function maxmize() {
		visblity = 'block'
	}

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex-col h-full overflow-hidden">
	<div
		class="w-28 h-full transition-width duration-300 hover:w-52 bg-slate-100"
		on:mouseenter={maxmize}
		on:mouseleave={minimize}
	>
		<a href="/proc/" class={url === '/proc' ? 'lit' : ''}>
			<Zap />
			<h1 class={visblity}>Create</h1>
		</a>

		<a href="/proc/community" class={$page.url.pathname === '/proc/community' ? 'lit' : ''}>
			<Users />
			<h1 class={visblity}>Community</h1>
		</a>

		<a href="/proc/account" class={url === '/proc/account' ? 'lit' : ''}>
			<Settings />
			<h1 class={visblity}>Account</h1>
		</a>
	</div>
</div>

<style>
	.lit {
		@apply bg-blue-100 border-blue-500 border-2;
	}

	a {
		@apply flex justify-center items-center gap-2 text-base p-7 m-2 border-b border-2 rounded-md font-normal shadow-blue-300 shadow-md active:translate-y-1 active:shadow-none;
	}
</style>
