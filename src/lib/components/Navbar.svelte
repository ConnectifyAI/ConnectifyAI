<script lang="ts">
    import { TreeView, TreeViewItem, RecursiveTreeView, type TreeViewNode } from '@skeletonlabs/skeleton';
    import { Blend } from 'lucide-svelte';
 </script>
 
 
 <div class="flex-col h-screen bg-blue-900 w-1/5">
    <div class="flex text-3xl px-10 py-10 h-30 ">
        <Blend size=30 class="mt-1"/>
        <h1 class="ml-5">ConnectifyAI</h1>
    </div>
    <TreeView>
        <TreeViewItem>
            <span>Create</span>
            <svelte:fragment slot="children">
                <TreeViewItem>
                    <span>New Model</span>
                </TreeViewItem>
                <TreeViewItem>
                    <span>New Dataset</span>
                </TreeViewItem>
            </svelte:fragment>
        </TreeViewItem>
        <TreeViewItem>
            <span>Discover</span>
            <svelte:fragment slot="children">
                <TreeViewItem>
                    <span>Graph</span>
                </TreeViewItem>
                <TreeViewItem>
                    <span>Datasets</span>
                </TreeViewItem>
                <TreeViewItem>
                    <span>Algorithms</span>
                </TreeViewItem>
            </svelte:fragment>
        </TreeViewItem>
    </TreeView>
 </div>
 