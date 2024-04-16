//NOTE: this file is to fetch info from database

import { db } from "$lib/server/db"
import { graph } from "$lib/server/db/schema"
import { eq } from "drizzle-orm"
import type { Graph, Node } from "../apiTypes"


export const graphById = async (id: string): Promise<Graph> => {

    const dbGraph = await db.query.graph.findFirst({
        where: eq(graph.id, id),
        with: {
            author: true,
            nodes: {
                with: {
                    outputs: {
                        with: {
                            edge: true
                        }
                    },
                    inputs: {
                        with: {
                            edge: true
                        }
                    }
                }
            }
        }
    })

    if (!dbGraph) {
        throw new Error("deal with it later lmao")
    }
    return dbGraph as Graph
}

// export const modelById = async (id: string): Promise<Node> => {
//
// }
//
