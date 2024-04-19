import type { PageServerLoad, Actions } from './$types'
import { fetchGraphById, fetchTestGraph } from '$lib/server/api/fetch'
import { error } from '@sveltejs/kit'
import type { Graph } from '$lib/server/helpers/apiTypes'

export const load: PageServerLoad = async ({ params, locals }) => {
	//TODO: load their latest

	const graphId = params.graphId



	try {
		const graph: Graph = await fetchGraphById(graphId)
		const isUser = graph.authorId === locals.user?.id

		return { graph, isUser }

	} catch (e) {
		error(404, "not found")
	}

}

