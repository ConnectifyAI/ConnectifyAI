
import { listDatasets, listModels } from "@huggingface/hub";
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

}

