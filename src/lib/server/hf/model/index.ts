import { HF_TOKEN } from "$env/static/private";
// Create your Hugging Face Token: https://huggingface.co/settings/tokens
// Set your Hugging Face Token: https://scrimba.com/dashboard#env
// Learn more: https://scrimba.com/links/env-variables
const token = HF_TOKEN

if (!token) {
    throw new Error("need hf token ")
}

export async function searchModels(query: string) {

    const limit = 5;

    const response = await fetch(
        `https://huggingface.co/api/models?search=${query}&limit=${limit}&full=true&config=true`,
        {
            method: "GET",
            headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        }
    )


    let models = await response.json()


    return models

}


// need to fetch indepth data of model
export async function getModelInfo(id: string) {

    let repo = "NexaAIDev/Octopus-v2"

    const chosen_response = await fetch(
        // `https://huggingface.co/api/datasets/${chosen_one}`,
        `https://huggingface.co/api/models/${repo}`,
        {
            method: "GET",
            headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        }

    )
    const model = await chosen_response.json()

    const pipeline_tag = model.pipeline_tag;

    // const io = getIo(pipeline_tag);

    return model

}


export type Model = {
    id: string,
    author: string,
    input: 2
    pipeline_tag: string,
    downloads: string,
    likes: number,
    createdAt: string
}

