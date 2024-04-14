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

        let specialOne = await getDatasetInfo("soemthing")


        //TODO: do the creation of nodes that you need?

		return {
            datasets: [specialOne]
		}

	},
} satisfies Actions;



