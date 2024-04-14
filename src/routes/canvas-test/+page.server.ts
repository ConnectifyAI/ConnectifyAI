import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { getDatasetInfo } from '$lib/server/hf/dataset';

export const load: PageServerLoad = async ({ params }) => {
    //TODO: load their latest

	const datasetInfo = await getDatasetInfo("change later")

	return { datasetInfo }
}




export const actions = {
	searchForDataset: async ({ request }) => {
		//search lmfao
		const formData = await request.formData();
		const query = formData.get('query');

		if (!query) {
			throw new Error('query not provided');
		}

		// let datasets = await searchDatasets(query.toString())

		const specialOne = await getDatasetInfo('soemthing');

		//TODO: do the creation of nodes that you need?

		return {
			datasets: [specialOne]
		};
	}
} satisfies Actions;
