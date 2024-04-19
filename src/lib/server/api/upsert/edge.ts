import { db } from "$lib/server/db";
import { edge, inFeature, outFeature } from "$lib/server/db/schema";
import type { UUID } from "crypto";
import type { Node as APINode, Edge as APIEdge, Feature as APIFeature } from "$lib/server/helpers/apiTypes";
import { time } from "console";
import { convertEdge } from "$lib/server/helpers/convert";
import { eq } from "drizzle-orm";

export async function createEdge(
    sourceNodeId: string,
    targetNodeId: string,
    sourceFeatureId: string,
    targetFeatureId: string,
    graphId: UUID
): Promise<APIEdge> {


    const edgeToInsert = {

        parentGraphId: graphId,

        sourceNodeId,
        targetNodeId,

        sourceFeatureId,
        targetFeatureId

    }

    const insertedEdge = (await db.insert(edge).values(edgeToInsert).returning())[0]

    const dbEdge = await db.query.edge.findFirst({
        where: eq(edge.id, insertedEdge.id),

        with: {
            sourceFeature: true,
            targetFeature: true
        }
    })

    if (!dbEdge) {
        throw new Error("error with creating edge")
    }

    const selectTarget = await db.update(inFeature).set({
        isSelected: true
    }).where(eq(inFeature.id, dbEdge.targetFeatureId))

    const selectSource = await db.update(outFeature).set({
        isSelected: true
    }).where(eq(outFeature.id, dbEdge.sourceFeatureId))

    return convertEdge(dbEdge)

}
