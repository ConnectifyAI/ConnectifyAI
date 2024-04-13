<script lang='ts'>

	import { fetchModel } from '$lib/client/hf';
	import { onMount } from 'svelte';

	onMount(async () => {
		await fetchModel('djoaidjwoi');
	});



</script>
