import { searchDatasets, searchModels } from '$lib/server/api/search';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {


	let datasets = await searchDatasets("bert", 200)
	let models = await searchModels("bert", 200)
	
	return {
		datasets,
		models
	}



}


export const actions = {
	search: async ({ locals, request }) => {
		//search lmfao
		const formData = await request.formData()
		const query = formData.get('query')

		if (!query) {
			throw new Error("query not provided")
		}

	},
} satisfies Actions;


