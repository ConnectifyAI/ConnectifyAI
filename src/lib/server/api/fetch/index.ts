//NOTE: this file is to fetch info from database
import { db } from "$lib/server/db"
import { graph } from "$lib/server/db/schema"
import { eq } from "drizzle-orm"
import type { Graph as APIGraph } from "../../helpers/apiTypes"
import { convertGraph } from "$lib/server/helpers/convert"

export const fetchTestGraph = async (): Promise<APIGraph> => {
    const testGraphId = "926a93eb-b60d-4075-a0bc-fcca9fa3c060"

    const testGraph = await db.query.graph.findFirst({

        where: eq(graph.id, testGraphId),

        with: {
            author: true,
            nodes: {
                with: {
                    inFeatures: true,
                    outFeatures: true,
                }
            },
            edges: {
                with: {
                    sourceFeature: true,
                    targetFeature: true,
                }
            }
        }

    })

    if (!testGraph) {
        throw new Error("could not retrieve test graph")

    }

    //@ts-ignore okay node is predifed, i think we need a new name later
    const convertedGraph = convertGraph(testGraph);

    return convertedGraph
}


export async function fetchGraphById(graphId: string) {

    const dbGraph = await db.query.graph.findFirst({

        where: eq(graph.id, graphId),

        with: {
            author: true,
            nodes: {
                with: {
                    inFeatures: true,
                    outFeatures: true,
                }
            },
            edges: {
                with: {
                    sourceFeature: true,
                    targetFeature: true,
                }
            }
        }

    })

    if (!dbGraph) {
        throw new Error("Invalid Id")
    }

    //@ts-ignore okay node is predifed, i think we need a new name later
    const convertedGraph = convertGraph(dbGraph);

    return convertedGraph
}
