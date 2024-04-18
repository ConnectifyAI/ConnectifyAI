import { HF_TOKEN } from "$env/static/private";
import type { DatasetInfo, ModelInfo } from "$lib/server/helpers/apiTypes";
import { modelTypes } from "./modelTypes";

export async function searchDatasets(query: string, take: number): Promise<DatasetInfo[]> {

    const response = await fetch(
        `https://huggingface.co/api/datasets?search=${query}&limit=${take}&full=full&config=true`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${HF_TOKEN}` }
    })

    let datasets = await response.json() as Array<any>

    let filtered = datasets.filter((dataset) => dataset?.cardData?.dataset_info?.features)

    var cleaned: DatasetInfo[] = [];
    for (const dataset of filtered) {

        dataset.repoId = dataset.id

        const features = dataset.cardData.dataset_info.features;

        // continue if feature doesnt exist
        if (!features) {
            continue
        }

        try {
            for (const feature of features) {
                if (feature.sequence && typeof feature.sequence !== 'string') {
                    throw new Error("yo this dataset is wack")
                } else {
                    // sequence is now a type





                    feature.dtype = feature.sequence
                    // feature.sequence = null
                }

                if (feature.name) {
                    feature.label = feature.name
                }

                if (!feature.dtype) {
                    feature.dtype = "string"
                }
            }
        } catch (e) {
            continue
        }

        const cleanDataset: DatasetInfo = {
            outputFeatures: dataset.cardData.dataset_info.features,
            ...dataset
        }

        cleaned.push(cleanDataset)
    }


    return cleaned

}


export async function searchModels(query: string, take: number) {

    const response = await fetch(
        `https://huggingface.co/api/models?search=${query}&limit=${take}&full=true&config=true`,
        {
            method: "GET",
            headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        }
    )

    let modelInfos = await response.json()

    let cleaned: ModelInfo[] = []

    for (const modelInfo of modelInfos) {

        //@ts-ignore, im not strictly typing modelinfo bro
        let io = modelTypes[modelInfo.pipeline_tag]

        // Meaning it isnt supported
        if (!io) {
            continue
        }

        const model: ModelInfo = {
            ...modelInfo,
            inputFeatures: io['inputs'],
            outputFeatures: io['outputs'],
        }

        cleaned.push(model)
    }


    return cleaned

}

