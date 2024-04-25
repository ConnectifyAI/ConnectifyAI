import type { PageServerLoad, Actions } from './$types'
import { fetchGraphById, fetchTestGraph } from '$lib/server/api/fetch'
import { error } from '@sveltejs/kit'
import type { Graph } from '$lib/server/helpers/apiTypes'

import { graphId, graphName, edges } from '$stores/graph'

export const load: PageServerLoad = async ({ params, locals }) => {
	//TODO: load their latest

	const graphId = params.graphId

	let graph: Graph
	let isAuthor: boolean
	try {
		graph = await fetchGraphById(graphId)
		isAuthor = graph.authorId === locals.user?.id
	} catch (e) {
		error(404, 'not found')
	}
	console.log(isAuthor)

	return { graph, isAuthor }
}
