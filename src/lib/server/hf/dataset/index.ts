import { downloadFile, listDatasets, listFiles, listModels } from "@huggingface/hub";
import { HF_TOKEN } from "$env/static/private";
// Create your Hugging Face Token: https://huggingface.co/settings/tokens
// Set your Hugging Face Token: https://scrimba.com/dashboard#env
// Learn more: https://scrimba.com/links/env-variables
const token = HF_TOKEN

if (!token) {
    throw new Error("need hf token ")
}

export async function searchDatasets(query: string): Promise<Dataset[]> {

    const limit = 20;

    const response = await fetch(
        `https://huggingface.co/api/datasets?search=${query}&limit=${limit}&full=full&config=true`,
        {
            method: "GET",
            headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        }
    )

    let datasets = await response.json() as Array<any>

    //TODO: filter out based on what is availible
    let filtered = datasets.filter((dataset) => dataset?.cardData?.dataset_info?.features)

    var cleaned: Dataset[] = [];
    for (const dataset of filtered) {
        const cleanDataset: Dataset = {
            features: dataset.cardData.dataset_info.features,
            ...dataset
        }

        cleaned.push(cleanDataset)
    }

    return cleaned
}

export type Dataset = {
    author: string,
    id: string,
    downloads: number,
    likes: number,
    features: {
        name: string,
        dtype: string
    }[]

}


// // need to fetch indepth data of dataset
export async function getDatasetInfo(id: string) {

    let repo = "Baidicoot/adverserial_training_evil_mistral"

    const chosen_response = await fetch(
        // `https://huggingface.co/api/datasets/${chosen_one}`,
        `https://huggingface.co/api/datasets/${repo}`,
        {
            method: "GET",
            headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        }

    )
    const dataset = await chosen_response.json()

    const cleanDataset: Dataset = {
        features: dataset.cardData.dataset_info.features,
        ...dataset
    }




    return cleanDataset
}

