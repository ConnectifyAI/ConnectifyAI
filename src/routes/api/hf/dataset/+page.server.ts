import { HF_TOKEN } from '$env/static/private';
import type { Actions } from './$types';

export const actions = {
    search: async ({ locals, request }) => {
        //search lmfao
        const formData = await request.formData()
        const query = formData.get('query')

        const res = await fetch(
            `https://huggingface.co/api/datasets/${query}?full=true`,
            {
                method: "GET",
                headers: { "Authorization": `Bearer ${HF_TOKEN}` }
            }
        )

        const dataset = await res.json()
        
        console.log(dataset)

        return {
            dataset
        }


    },
} satisfies Actions;
