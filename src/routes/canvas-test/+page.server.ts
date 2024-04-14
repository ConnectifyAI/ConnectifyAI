import type { PageServerLoad } from './$types';
import { downloadFile } from '@huggingface/hub';
import type { Actions } from './$types';
import { searchModels } from '$lib/server/hf/model';
import { getDatasetInfo, searchDatasets } from '$lib/server/hf/dataset';


export const load: PageServerLoad = async ({ params }) => {
    //TODO: load their latest

}

export const actions = {
	searchForDataset: async ({ locals, request }) => {
		//search lmfao
		const formData = await request.formData()
		const query = formData.get('query')

		if (!query) {
			throw new Error("query not provided")
		}

		let datasets = await searchDatasets(query.toString())


        //TODO: do the filtering here

		return {
			datasets,
		}

	},
} satisfies Actions;



