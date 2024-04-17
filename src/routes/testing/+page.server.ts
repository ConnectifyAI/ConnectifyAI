import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fetchTestGraph } from '$lib/server/api/fetch';

export const load: PageServerLoad = async ({ params }) => {

	// const datasetInfo = await getDatasetInfo('change later');
	// const modelInfo = await getModelInfo('change later');
	//
	// return { datasetInfo, modelInfo };
	//

	const graph = await fetchTestGraph();

	return { graph }
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


