import { db } from '$lib/server/db'
import { edge } from '$lib/server/db/schema'
import { eq } from 'drizzle-orm'

export const createEdge = async (data: {
    //TODO: figure out shape
}) => {

}

export const getEdge = async (id: string) => {
    const returnedEdge = await db.query.edge.findFirst({
        where: eq(edge.id, id),
    })

    return returnedEdge
}

export const updateEdge = async (data: {
    //TODO: figure out shape
}) => {

}

export const deleteEdge = async (id: string) => {
    const deleted = await db.delete(edge).where(eq(edge.id, id)).returning()
    if (deleted.length == 0) {
        throw new Error("invalid id to delete edge")
    }
}



