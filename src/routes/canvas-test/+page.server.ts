import type { Actions } from './$types';
import { getDatasetInfo, } from '$lib/server/hf/dataset';


// export const load: PageServerLoad = async ({ params }) => {
//     //TODO: load their latest
//
// }

export const actions = {
    searchForDataset: async ({ request }) => {
        //search lmfao
        const formData = await request.formData()
        const query = formData.get('query')

        if (!query) {
            throw new Error("query not provided")
        }

        // let datasets = await searchDatasets(query.toString())

        let specialOne = await getDatasetInfo("soemthing")


        //TODO: do the creation of nodes that you need?

        return {
            datasets: [specialOne]
        }

    },
} satisfies Actions;



