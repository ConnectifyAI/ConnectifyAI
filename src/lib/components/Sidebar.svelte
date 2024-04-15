<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { Zap } from 'lucide-svelte';
	import { Users } from 'lucide-svelte';
	import { Settings } from 'lucide-svelte';
	import { MoveHorizontal } from 'lucide-svelte';

        //NOTE: surely theres a better way to do this
	let tag1: boolean = false;
	let tag2: boolean = true;
	let tag3: boolean = false;
	let abc: string= "w-32"
	let flipflop: boolean= true;
	let visblity: string= "hidden"
	
	function change(x: string) {
		if (x == 'tag1') {
			tag1 = true;
			tag2 = false;
			tag3 = false;
		}
		if (x == 'tag2') {
			tag1 = false;
			tag2 = true;
			tag3 = false;
		}
		if (x == 'tag3') {
			tag1 = false;
			tag2 = false;
			tag3 = true;
		}
	}

	function minimize()
	{
			abc="w-32";
			flipflop=false;
			visblity="hidden"
	}

	function maxmize()
	{
		abc="w-52";
			flipflop=true;
			visblity="block"
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mouseenter={maxmize} on:mouseleave={minimize}>
<AppRail
	width={abc}
	background="bg-slate-100"
	height="h-screen"
	spacing="space-y-1"
	aspectRatio="aspect-[8/3]"
	class="py-10"
	active="bg-blue-500 hover text-white "
	shadow="shadow-md"
	border="border-r "
	hover="bg"	
>
	<AppRailAnchor
		href="/canvas-test"
		title="Create"
		selected={tag1}
		on:click={() => {
			change('tag1');
		}}
	>
		<svelte:fragment slot="lead">
			<div class="flex space-x-3">
				<Zap />
				<span class={visblity}>Create</span>
			</div>
		</svelte:fragment>
	</AppRailAnchor>
	<AppRailAnchor
		href="/community"
		title="Communtiy"
		selected={tag2}
		on:click={() => {
			change('tag2');
		}}
	>
		<svelte:fragment slot="lead">
			<div class="flex space-x-3">
				<Users />
				<span class={visblity}>Communtiy</span>
			</div>
		</svelte:fragment>
	</AppRailAnchor>
	<AppRailAnchor
		href="/auth/account"
		title="Account"
		selected={tag3}
		on:click={() => {
			change('tag3');
		}}
	>
		<svelte:fragment slot="lead">
			<div class="flex space-x-3">
				<Settings />
				<span class={visblity}>Account</span>
			</div>
		</svelte:fragment>
	</AppRailAnchor>
</AppRail>
</div>