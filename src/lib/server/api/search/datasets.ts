import { HF_TOKEN } from "$env/static/private";

export async function searchDatasets(query: string, take: number): Promise<Dataset[]> {

    const response = await fetch(
        `https://huggingface.co/api/datasets?search=${query}&limit=${take}&full=full&config=true`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${HF_TOKEN}` }
    })

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

//TODO: does this actually give more info or what?
async function getDatasetInfo() {

    let repo = "Baidicoot/adverserial_training_evil_mistral"

    const response = await fetch(
        // `https://huggingface.co/api/datasets/${chosen_one}`,
        `https://huggingface.co/api/datasets/${repo}`,
        {
            method: "GET",
            headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        }

    )
    const dataset = await response.json()

    const cleanDataset: Dataset = {
        features: dataset.cardData.dataset_info.features,
        ...dataset
    }
    return cleanDataset
}

type Dataset = {
    author: string,
    id: string,
    downloads: number,
    likes: number,
    features: {
        id: string, // just match it with the id?
        name: string,
        dtype: string
    }[]

}
