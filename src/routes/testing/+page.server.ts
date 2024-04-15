import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { getModelInfo } from '$lib/server/hf/model';
import { getDatasetInfo } from '$lib/server/hf/dataset';

export const load: PageServerLoad = async ({ params }) => {

	const datasetInfo = await getDatasetInfo('change later');
	const modelInfo = await getModelInfo('change later');

	return { datasetInfo, modelInfo };
}


export const actions = {
	search: async ({ locals, request }) => {
		//search lmfao
		const formData = await request.formData()
		const query = formData.get('query')

		if (!query) {
			throw new Error("query not provided")
		}

		// let datasets = await searchDatasets(query.toString())
		// const datasets = "something";
		//

		// let x = datasets[0]
		// x.

		// let models = await searchModels(query.toString())

		const models = await getModelInfo('a');

		return {
			// datasets,
			models
		}

	},
} satisfies Actions;


