<script lang="ts">
	import '../app.postcss'
	import { Navbar, NewSidebar } from '$components/Navigation'
	import { AppShell } from '@skeletonlabs/skeleton'

	// MODAL
	import { Modal, getModalStore, initializeStores } from '@skeletonlabs/skeleton'
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton'
	import { ModelModal, DatasetModal } from '$components/Modal'

	initializeStores()
	const modalRegistry: Record<string, ModalComponent> = {
		// Set unique modal ID, pass component reference
		modelModal: { ref: ModelModal },
		datasetModal: { ref: DatasetModal }
	}
</script>

<Modal components={modalRegistry} background="bg-purple-500" />

<AppShell>
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<NewSidebar />
	</svelte:fragment>

	<slot />
</AppShell>
