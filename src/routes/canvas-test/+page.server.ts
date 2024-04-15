import type { PageServerLoad, Actions } from './$types';
import { getDatasetInfo, searchDatasets } from '$lib/server/hf/dataset';
import { getModelInfo } from '$lib/server/hf/model';

export const load: PageServerLoad = async ({ params }) => {
	//TODO: load their latest

	const datasetInfo = await getDatasetInfo('change later');
	const modelInfo = await getModelInfo('change later');

	return { datasetInfo, modelInfo };

};

export const actions = {
	searchForDataset: async ({ request }) => {
		//search lmfao
		const formData = await request.formData();
		const query = formData.get('query');

		if (!query) {
			throw new Error('query not provided');
		}

		const specialOne = await getDatasetInfo('soemthing');

		//TODO: do the creation of nodes that you need?

		return {
			datasets: [specialOne]
		};
	},

	searchForModel: async ({ request }) => {
		//search lmfao
		const formData = await request.formData();
		const query = formData.get('query');

		if (!query) {
			throw new Error('query not provided');
		}

		let datasets = await searchDatasets(query.toString())

		// //TODO: do the creation of nodes that you need?

		return {
			datasets
		};
	}

} satisfies Actions;
