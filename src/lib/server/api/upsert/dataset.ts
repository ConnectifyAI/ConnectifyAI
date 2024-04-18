import { db } from "$lib/server/db";
import { node, outFeature } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Node as APINode, Feature as APIFeature, DatasetInfo } from "../apiTypes";
import { convertNode } from "$lib/server/helpers/convert";


export async function createDatasetNode(datasetInfo: DatasetInfo, graphId: string, position: {
    x: number,
    y: number
}): Promise<APINode> {

    const newNode = (await db.insert(node).values({
        repoId: datasetInfo.repoId,
        displayName: datasetInfo.repoId,
        parentGraphId: graphId,
        type: 'datasetNode',
        posX: position.x,
        posY: position.y,
    }).returning())[0]


    //2 features
    let outs: Feature[] = []
    for (const out of datasetInfo.outputFeatures) {
        outs.push({
            isSelected: false,
            label: out.label,
            dtype: out.dtype,
            parentNodeId: newNode.id,

        })
    }

    const outFeatures = await db.insert(outFeature).values(outs).returning();

    const returnedNode = await db.query.node.findFirst({
        where: eq(node.id, newNode.id),
        with: {
            inFeatures: true,
            outFeatures: true
        }
    })

    if (!returnedNode) {
        throw new Error("was not able to send node to db")
    }

    //@ts-ignore WE NEED A NEW NAME OTHER THAN NODES BRO
    return convertNode(returnedNode);




}
