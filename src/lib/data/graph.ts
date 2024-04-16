import { db } from '$lib/server/db'
import { graph } from '$lib/server/db/schema'
import { getDatasetByRepoId, type Dataset } from '$lib/server/hf/dataset'
import { getModelByRepoId, getModelInfo, type Model } from '$lib/server/hf/model'
import { eq } from 'drizzle-orm'
import type { Graph, Author, Node, Input, Output, Edge } from './graph_types'


export const createGraph = async (data: {
    //TODO: figure out shape
}) => {

}

export const testGetGraph = async (): Promise<Graph> => {

    const dbGraph = await db.query.graph.findFirst({
        where: eq(graph.id, '0dc01d20-3339-4f1a-8892-10102bd04cd3'),
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




// the id should be our id inside database







//TODO: figure out what to do
export const getGraph = async (id: string): Promise<Graph> => {
    const dbGraph = await db.query.graph.findFirst({
        where: eq(graph.id, id),
        with: {
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

    //TODO: for each node, we need to grab information for that node
    //ask kenny for help
    if (!dbGraph) {
        throw new Error("invalid id")
    }

    //TODO: think about dataset / model id 
    //and how kenric wants it to be done

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

                // TODO: ask kenny what he wants , also ask him for how the 
                // "state" of the application looks like
                //
                // maybe this isnt necessary?, just needed upon creating a dataset.
                // what about source of truth though, wouldnt we want that to be huggingface
                // i think it would be easier to just create different tables maybe? 

                let model = await getModelByRepoId(node.repoId);
                models.push(model)

            }

        }

        //TODO: how would we bind the value of an output to the 
        //name associated with the model / dataset output

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

