import { db } from '$lib/server/db'
import { graph } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

//NOTE: low level interactions with the database happen here

export const createGraph = async (data: {
    //TODO: figure out shape
}) => {

}

export const getGraph = async (id: string) => {
    const returnedGraph = await db.query.graph.findFirst({
        where: eq(graph.id, id),
        with: {
            nodes: {
                with: {
                    outgoingEdges: {
                        with: {
                            head: true,
                            tail: true
                        }
                    },
                    incomingEdges: {
                        with: {
                            head: true,
                            tail: true
                        }
                    }
                }
            }
        }
    })

    return returnedGraph

}

export const updateGraph = async (data: {
    //TODO: figure out shape

}) => {

}

export const deleteGraph = async (id: string) => {
    const deleted = await db.delete(graph).where(eq(graph.id, id)).returning()
    if (deleted.length == 0) {
        throw new Error("invalid id to delete graph")
    }
}

