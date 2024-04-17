<script lang="ts">
	import '../app.postcss';
	import Navbar from '$components/Navigation/Navbar.svelte';
	import NewSidebar from  '$components/Navigation/NewSidebar.svelte';
	import NewSidebar from '$components/Navigation/NewSidebar.svelte';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Sidebar from '$components/Navigation/Sidebar.svelte';

	//modal stuff
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import NewModel from '$components/Modal/NewModel.svelte';
	import NewDataset from '$components/Modal/NewDataset.svelte';
	initializeStores();
	const modalRegistry: Record<string, ModalComponent> = {
	// Set a unique modal ID, then pass the component reference
	NewModel: { ref: NewModel },
	NewDataset: { ref: NewDataset },
	// ...
	};
	


	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);
</script>


<Modal components={modalRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<NewSidebar />
	</svelte:fragment>

	<slot />
</AppShell>

