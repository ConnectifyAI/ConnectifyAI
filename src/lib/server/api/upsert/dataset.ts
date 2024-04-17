import { db } from "$lib/server/db";
import { node, outFeature } from "$lib/server/db/schema";
import type { Node as APINode, Feature as APINode, DatasetInfo } from "../apiTypes";


export async function createDatasetNode(datasetInfo: APINode, graphId: string): Promise<APINode> {



    const newNode = (await db.insert(node).values({
        repoId: datasetInfo.data.repoId,
        displayName: datasetInfo.data.repoId,
        parentGraphId: graphId,
        type: datasetInfo.type,
        posX: datasetInfo.position.x,
        posY: datasetInfo.position.y,
    }).returning())[0]

    //2 features
    let outs: Feature[] = []
    for (const out of ) {
        outs.push({
            isSelected: false,
            label: out.label,
            dtype: out.dtype,
            parentNodeId: newNode.id,

        })

    }
}
