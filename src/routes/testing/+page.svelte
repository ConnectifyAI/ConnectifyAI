<script lang="ts">
	import { trpc } from '$lib/trpc/client.js'
	import type { RouterOutputs } from '$lib/trpc/router.js'
	import { TRPCClientError } from '@trpc/client'

	export let data

	let query = ''

	let testGraph: RouterOutputs['graph']['testGraph'] = []
	let models: RouterOutputs['node']['searchForModels'] = []

	const testTRPC = async () => {
		console.log('running')
		testGraph = await trpc().graph.testGraph.query()
		console.log(testGraph)
	}

	const search = async () => {
		console.log('running')
		models = await trpc().node.searchForModels.query({
			query
		})
		console.log(models)
	}
</script>

<form on:submit={search}>
	<label>
		query from db
		<input type="checkbox" checked={false} />
		<input name="query" bind:value={query} />
	</label>
	<button> send query </button>
</form>
<button on:click|preventDefault={testTRPC}> get trpc </button>
