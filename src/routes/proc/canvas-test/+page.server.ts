import type { PageServerLoad, Actions } from './$types'
import { fetchTestGraph } from '$lib/server/api/fetch'

export const load: PageServerLoad = async () => {
	//TODO: load their latest
	const graph = await fetchTestGraph()
	return { graph }
}

export const actions = {
	// searchForDataset: async ({ request }) => {
	// 	//search lmfao
	// 	const formData = await request.formData()
	// 	const query = formData.get('query')

	// 	if (!query) {
	// 		throw new Error('query not provided')
	// 	}

	// 	// const specialOne = await getDatasetInfo('soemthing')

	// 	//TODO: do the creation of nodes that you need?

	// 	return {
	// 		datasets: [specialOne]
	// 	}
	// },

	// searchForModel: async ({ request }) => {
	// 	//search lmfao
	// 	const formData = await request.formData()
	// 	const query = formData.get('query')

	// 	if (!query) {
	// 		throw new Error('query not provided')
	// 	}

	// 	let datasets = await searchDatasets(query.toString())

	// 	// //TODO: do the creation of nodes that you need?

	// 	return {
	// 		datasets
	// 	}
	// }
} satisfies Actions
