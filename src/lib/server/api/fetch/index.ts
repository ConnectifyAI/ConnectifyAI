//NOTE: this file is to fetch info from database

import { db } from "$lib/server/db"
import { graph } from "$lib/server/db/schema"
import { eq } from "drizzle-orm"
import type { Graph, Node } from "../apiTypes"


export const fetchTestGraph = async () => {

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
                    sourceNode: true,
                    targetNode: true,

                }
            }


        }
    })

    return testGraph


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
