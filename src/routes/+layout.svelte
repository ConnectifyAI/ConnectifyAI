<script lang="ts">
	import '../app.postcss'
	import { Navbar, Sidebar } from '$components/Navigation'

	import { initializeStores } from '@skeletonlabs/skeleton'
	import { AppShell } from '@skeletonlabs/skeleton'

	// MODAL
	import { Modal, getModalStore } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton'
	
	import NewModel from '$components/Modal/NewModel.svelte'
	import NewDataset from '$components/Modal/NewDataset.svelte'
	initializeStores()
	const modalRegistry: Record<string, ModalComponent> = {
		// Set unique modal ID, pass component reference
		NewModel: { ref: NewModel },
		NewDataset: { ref: NewDataset }
	}
</script>

<Modal components={modalRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>

	<slot />
</AppShell>
