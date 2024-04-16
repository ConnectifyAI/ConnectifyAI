import { db } from '$lib/server/db'
import { node } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const createNode = async (data: {
    //TODO: figure out shape
}) => {

}
export type NodeType = 'dataset' | 'model'



export const getNode = async (id: string) => {

    const returnedNode = await db.query.node.findFirst({
        where: eq(node.id, id),
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
    })
    return returnedNode

}

export const updateNode = async (data: {
    //TODO: figure out shape
}) => {

}

export const deleteNode = async (id: string) => {
    const deleted = await db.delete(node).where(eq(node.id, id)).returning()
    if (deleted.length == 0) {
        throw new Error("invalid id to delete node")
    }
}


