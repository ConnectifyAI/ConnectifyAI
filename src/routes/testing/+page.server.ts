import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {

	// const datasetInfo = await getDatasetInfo('change later');
	// const modelInfo = await getModelInfo('change later');
	//
	// return { datasetInfo, modelInfo };
	//

	// const dataset = await searchDatasets('bert', 100);
	// console.log(dataset)
	// const deepInfo = await getDatasetByRepoId(dataset[0].id)
	//
	// return {
	// 	dataset,
	// 	deepInfo
	// }
	//


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


