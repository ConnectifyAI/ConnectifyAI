<!-- <script lang="ts">
import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
import NewDataset from '$lib/components/Modal/NewDataset.svelte'


const modalStore = getModalStore();

const modalRegistry: Record<string, ModalComponent> = {
	// Set a unique modal ID, then pass the component reference
    NewDataset : {ref: NewDataset}
	// ...
};
    
const modal: ModalSettings = {
	type: 'component',
	component: 'NewDataset',
    backdropClasses: '!bg-white !bg-opacity-35',
    modalClasses: "!px-5 !py-5 !bg-black ",
    
};

function a(){
    modalStore.trigger(modal);
}
</script>

<button  on:click={a}>
    Make modal
</button>
 -->
