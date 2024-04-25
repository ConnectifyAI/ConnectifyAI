import type { PageServerLoad, Actions } from './$types'
import { fetchGraphById, fetchTestGraph } from '$lib/server/api/fetch'
import { error } from '@sveltejs/kit'
import type { Graph } from '$lib/server/helpers/apiTypes'

export const load: PageServerLoad = async ({ params, locals }) => {
	//TODO: load their latest

	const graphId = '1dc6bc75-2d27-47f8-9846-14822e761b9e'

	try {
		const graph: Graph = await fetchGraphById(graphId)
		const isAuthor = true
		console.log(isAuthor)

		return { graph, isAuthor }
	} catch (e) {
		error(404, 'not found')
	}
}
