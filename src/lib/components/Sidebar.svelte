<script lang="ts">
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { Zap } from 'lucide-svelte';
    import { Users } from 'lucide-svelte';
    import { Settings } from 'lucide-svelte';
    let currentTile: number = 0;

</script>

<AppRail width="w-52" background="bg-slate-100" height="h-screen" spacing="space-y-1"  aspectRatio="aspect-[8/3]" class="py-10" active="bg-blue-200" hover="bg-blue-100">
	<AppRailAnchor href="/" target="_blank" title="Create" selected={false}>
		<svelte:fragment slot="lead">
            <div class="flex space-x-3">
                <Zap/>
                <span>Create</span>
            </div>
        </svelte:fragment>
	</AppRailAnchor>
<AppRailAnchor href="/" target="_blank" title="Communtiy" selected={false}>
		<svelte:fragment slot="lead">
            <div class="flex space-x-3">
                <Users/>
                <span>Communtiy</span>
            </div>
        </svelte:fragment>

	</AppRailAnchor>
	<AppRailAnchor href="/" target="_blank" title="Account" selected={true}>
		<svelte:fragment slot="lead">
            <div class="flex space-x-3">
            <Settings/>
            <span>Account</span>
            </div>  
        </svelte:fragment>
	</AppRailAnchor>

</AppRail>
