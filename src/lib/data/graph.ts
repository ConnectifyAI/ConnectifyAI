import { db } from '$lib/server/db'
import { graph } from '$lib/server/db/schema'
import { getDatasetByRepoId, type Dataset } from '$lib/server/hf/dataset'
import { getModelByRepoId, getModelInfo, type Model } from '$lib/server/hf/model'
import { eq } from 'drizzle-orm'


export const createGraph = async (data: {
    //TODO: figure out shape
}) => {

}

// the id should be our id inside database
export const getGraph = async (id: string) => {
    const dbGraph = await db.query.graph.findFirst({
        where: eq(graph.id, id),
        with: {
            nodes: {
                with: {
                }
            }
        }
    })

    //TODO: for each node, we need to grab information for that node
    //ask kenny for help
    if (!dbGraph) {
        throw new Error("invalid id")
    }

    //TODO: think about dataset / model id and how kenric wants it to be done

    let datasets: Dataset[] = []
    let models: Model[] = []

    for (const node of dbGraph.nodes) {
        // how are edges being represented? are they constructed seperately?
        switch (node.nodeType) {

            case 'dataset': {

                let dataset = await getDatasetByRepoId(node.repoId)
                datasets.push(dataset)

            }

            case 'model': {
                let model = await getModelByRepoId(node.repoId)
                models.push(model)

            }

        }

        //TODO: what if a node has multiple inputs? how would we differentiate

         

        node.incomingEdges
        node.outgoingEdges
    }
    
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

