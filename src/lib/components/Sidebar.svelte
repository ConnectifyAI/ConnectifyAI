<script lang="ts">;
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { Zap } from 'lucide-svelte';
    import { Users } from 'lucide-svelte';
    import { Settings } from 'lucide-svelte';

    let tag1: boolean=false;
    let tag2: boolean=false;
    let tag3: boolean=false;
    
    function change( x:string )
    {
        if (x == "tag1")
        {
            tag1=true;
            tag2=false;
            tag3=false;
        }
        if (x == "tag2")
        {
            tag1=false;
            tag2=true;
            tag3=false;
        }
        if (x == "tag3")
        {
            tag1=false;
            tag2=false;
            tag3=true;
        }

    }
    
    
</script>

<AppRail width="w-52" background="bg-slate-100" height="h-screen" spacing="space-y-1"  aspectRatio="aspect-[8/3]" class="py-10" active="bg-blue-500 text-white" hover="hover:bg-blue-200">
	<AppRailAnchor href=""  title="Create" selected={tag1} on:click={()=>{change("tag1")}}>
		<svelte:fragment slot="lead">
            <div class="flex space-x-3">
                <Zap/>
                <span>Create</span>
            </div>
        </svelte:fragment>
	</AppRailAnchor>
<AppRailAnchor href=""  title="Communtiy" selected={tag2} on:click={()=>{change("tag2")}}> 
		<svelte:fragment slot="lead">
            <div class="flex space-x-3">
                <Users/>
                <span>Communtiy</span>
            </div>
        </svelte:fragment>

	</AppRailAnchor>
	<AppRailAnchor href=""  title="Account" selected={tag3} on:click={()=>{change("tag3")}}>
		<svelte:fragment slot="lead">
            <div class="flex space-x-3">
            <Settings/>
            <span>Account</span>
            </div>  
        </svelte:fragment>
	</AppRailAnchor>

</AppRail>
