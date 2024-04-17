//NOTE: this file is to fetch info from database

import { db } from "$lib/server/db"
import { graph } from "$lib/server/db/schema"
import { eq } from "drizzle-orm"
import type { Graph as APIGraph, Node as APINode, Edge as APIEdge } from "../apiTypes"
import type { Author } from "$lib/data/graph_types"



export const fetchTestGraph = async (): Promise<APIGraph> => {

    const testGraphId = "8d15884b-f58c-4953-9096-f8cf46e5482d"

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

// Function to convert original graph type to new graph type
export function convertGraph(originalGraph: Graph): APIGraph {
    const newNodes: APINode[] = originalGraph.nodes.map((node: Node) => {
        const { id, type, posX, posY, displayName, repoId, inFeatures, outFeatures } = node;
        return {
            id,
            type,
            position: { x: posX, y: posY },
            data: {
                displayName,
                repoId,
                inFeatures,
                outFeatures
            }
        };
    });

    const newEdges: APIEdge[] = originalGraph.edges.map((edge: Edge) => {
        const { id, sourceNodeId, targetNodeId, sourceFeature, targetFeature } = edge;
        return {
            id,
            source: sourceNodeId,
            target: targetNodeId,
            sourceHandle: sourceFeature.label,
            targetHandle: targetFeature.label
        };
    });

    return {
        // id: originalGraph.id,
        // authorId: originalGraph.authorId,
        // likes: originalGraph.likes,
        // forks: originalGraph.forks,
        // name: originalGraph.name,
        // author: originalGraph.author,
        ...originalGraph,
        nodes: newNodes,
        edges: newEdges
    };
}

// export const graphById = async (id: string): Promise<Graph> => {
//
//     const dbGraph = await db.query.graph.findFirst({
//         where: eq(graph.id, id),
//         with: {
//             author: true,
//             nodes: {
//                 with: {
//                     outputs: {
//                         with: {
//                             edge: true
//                         }
//                     },
//                     inputs: {
//                         with: {
//                             edge: true
//                         }
//                     }
//                 }
//             }
//         }
//     })
//
//     if (!dbGraph) {
//         throw new Error("deal with it later lmao")
//     }
//     return dbGraph as Graph
// }

// export const modelById = async (id: string): Promise<Node> => {
//
// }
//
