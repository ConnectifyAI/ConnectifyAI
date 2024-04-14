import { listDatasets, listModels } from "@huggingface/hub";
import { HF_TOKEN } from "$env/static/private";
// Create your Hugging Face Token: https://huggingface.co/settings/tokens
// Set your Hugging Face Token: https://scrimba.com/dashboard#env
// Learn more: https://scrimba.com/links/env-variables
const token = HF_TOKEN

if (!token) {
    throw new Error("need hf token ")
}

export async function searchDatasets(query: string) {
    const results = listDatasets({
        credentials: {
            accessToken: token
        },
        search: {
            query,
        },
        limit: 20,


    })

    console.log(results)

    return results
}

export async function searchModels(query: string) {
    const results = listModels({
        credentials: {
            accessToken: token
        },
        search: {
            query
        },
        limit: 20,

    })

    console.log(results)

    //TODO: figure out shape of this
    return results

}
