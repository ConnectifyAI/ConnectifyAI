import { searchDatasets } from '$lib/server/hf/';

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { downloadFile } from '@huggingface/hub';

export const load: PageServerLoad = async ({ params }) => {

};

import type { Actions } from './$types';

export const actions = {
    search: async ({ locals, request }) => {
        //search lmfao
        const formData = await request.formData()
        const query = formData.get('query')

        if (!query) {
            throw new Error("query not provided")
        }

        let datasets = await searchDatasets(query.toString())

        return { datasets }
    },
} satisfies Actions;
