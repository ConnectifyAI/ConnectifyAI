<!-- variation 1: with AppRail -->
<!-- <script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton'
	import { Zap, Users, Settings } from 'lucide-svelte'

	import { page } from '$app/stores'
</script>

<AppRail
	aspectRatio="aspect-[7/3]"
	class="bg-slate-100 w-full border-r"
	active="bg-blue-500 text-white"
	hover=""
>
	<AppRailAnchor href="/canvas-test" selected={$page.url.pathname === '/canvas-test'}>
		<section>
			<Zap />
			Create
		</section>
	</AppRailAnchor>

	<AppRailAnchor href="/community" selected={$page.url.pathname === '/community'}>
		<section>
			<Users />
			Community
		</section>
	</AppRailAnchor>

	<AppRailAnchor href="/auth/account" selected={$page.url.pathname === '/auth/account'}>
		<section>
			<Settings />
			Account
		</section>
	</AppRailAnchor></AppRail
>

<style>
	section {
		@apply flex justify-center items-center gap-2 text-base font-normal p-7 px-9;
	}
</style> -->

<!-- variation 2: without AppRail -->
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

	console.log('what the hale')
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex-col h-full border border-black">
	<div
		class="w-28 h-full transition-width duration-300 hover:w-52 bg-slate-100"
		on:mouseenter={maxmize}
		on:mouseleave={minimize}
	>
		<a href="/canvas-test" class={url === '/canvas-test' ? 'lit' : ''}>
			<Zap />
			<h1 class={visblity}>Create</h1>
		</a>

		<a href="/community" class={$page.url.pathname === '/community' ? 'lit' : ''}>
			<Users />
			<h1 class={visblity}>Community</h1>
		</a>

		<a href="/auth/account" class={url === '/auth/account' ? 'lit' : ''}>
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
