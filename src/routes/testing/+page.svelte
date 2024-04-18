<script lang="ts">
	import { trpc } from '$lib/trpc/client.js'
	import { TRPCClientError } from '@trpc/client'

	export let data

	let testLol: string
	let lmfao

	const testTRPC = async () => {
		console.log('running')
		testLol = await trpc().something.query('hello')
		console.log(testLol)
		lmfao = await trpc().newSomething.query({
			query: 'bert',
			take: 100
		})
		console.log(lmfao)
	}
</script>

<form method="POST" action="?/search">
	<label>
		query from db
		<input name="query" />
	</label>
	<button> send query </button>
</form>
<button on:click|preventDefault={testTRPC}> get trpc </button>
