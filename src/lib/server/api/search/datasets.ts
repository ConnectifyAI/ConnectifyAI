import { HF_TOKEN } from "$env/static/private";
import { db } from "$lib/server/db";
import { node, outFeature } from "$lib/server/db/schema";
import type { DatasetInfo, Node } from "../apiTypes";

export async function searchDatasets(query: string, take: number): Promise<Dataset[]> {

    const response = await fetch(
        `https://huggingface.co/api/datasets?search=${query}&limit=${take}&full=full&config=true`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${HF_TOKEN}` }
    })

    let datasets = await response.json() as Array<any>

    //TODO: filter out based on what is availible
    let filtered = datasets.filter((dataset) => dataset?.cardData?.dataset_info?.features)

    var cleaned: DatasetInfo[] = [];
    for (const dataset of filtered) {

        const cleanDataset: DatasetInfo = {
            features: dataset.cardData.dataset_info.features,
            ...dataset
        }

        cleaned.push(cleanDataset)
    }

    return cleaned
}

//TODO: make sure this works
export async function getDatasetNodeByRepoId(input: Node, graphId: string): Node {

    const response = await fetch(
        // `https://huggingface.co/api/datasets/${chosen_one}`,
        `https://huggingface.co/api/datasets/${input.id}`,
        {
            method: "GET",
            headers: { "Authorization": `Bearer ${HF_TOKEN}` }
        }

    )
    const dataset = await response.json()

    const cleanDataset: DatasetInfo = {
        features: dataset.cardData.dataset_info.features,
        ...dataset
    }

    //TODO: Make a db call to create it in the db first
    // const returnedNode = await db.insert(node).values({
    //     repoId: input.id,
    //     displayName: input.id,
    //     parentGraphId: graphId,
    //     type: 'datasetNode',
    //     posX: input.position.x,
    //     posY: input.position.y,
    // })
    
    //TODO: create the and out features
    
    const returnedOutFeatures = await db.insert(outFeature).values({

    })

    return cleanDataset
}

