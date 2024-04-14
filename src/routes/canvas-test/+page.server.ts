import { searchDatasets } from '$lib/server/hf/';

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { downloadFile } from '@huggingface/hub';

export const load: PageServerLoad = async ({ params }) => {
    const asyncDatasets = await searchDatasets("bert")
    const datasets = []

    for await (const dataset of asyncDatasets) {

        console.log(dataset)
        const response = await fetch(
            `https://huggingface.co/api/datasets/${dataset.name}?full=true`,
            {
                method: "GET",
                headers: { "Authorization": "Bearer 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" }
            }
        )


        datasets.push(await response.json())

        // downloadFile({
        //     repo: dataset.name,
        //     path: "datase"
        // })
        

    }
    return {
        datasets
    }
};
