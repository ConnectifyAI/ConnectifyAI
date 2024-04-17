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
</script>

<div class="w-36 transition-all hover:w-48">
	<a href="/canvas-test" class={url === '/canvas-test' ? 'lit' : ''}>
		<Zap size={64} />
		<h1 class=" hidden hover:inline">
			hello
		</h1>
	</a>

	<a href="/community" class={$page.url.pathname === '/community' ? 'lit' : ''}>
		<Users size={64} />
		<h1>asdlkjfds;f</h1>
	</a>

	<a href="/auth/account" class={url === '/auth/account' ? 'lit' : ''}>
		<Settings size={32} />
	</a>
</div>

<style>
	.lit {
		@apply bg-blue-100 border-blue-500 border-2;
	}

	a {
		@apply flex justify-center items-center gap-2 text-base p-7 m-2 border-b border-2 rounded-md font-normal shadow-blue-300 shadow-md active:translate-y-1 active:shadow-none;
	}
	
	

</style>
