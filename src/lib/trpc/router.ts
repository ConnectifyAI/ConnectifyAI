import { fetchGraphById, fetchTestGraph } from '$lib/server/api/fetch';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { searchDatasets, searchModels } from '$lib/server/api/search';
import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import delay from 'delay';
import { z } from 'zod';
import type { Graph as APIGraph, Node as APINode, Edge as APIEdge, DatasetInfo, ModelInfo } from '$lib/server/helpers/apiTypes';
import { createEdge } from '$lib/server/api/upsert/edge';
import { createModelNode } from '$lib/server/api/upsert/model';
import { createDatasetNode } from '$lib/server/api/upsert/dataset';
import { db } from '$lib/server/db';
import { edge, node } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export const t = initTRPC.context<Context>().create();

export const graphs = t.router({
  testGraph: t.procedure
    .query(async () => {
      let x: APIGraph = await fetchTestGraph()

      return x
    }),
  graphById: t.procedure
    .input(z.object({
      graphId: z.string()
    })).query(async ({ input }) => {
      let x: APIGraph = await fetchGraphById(input.graphId)

      return x

    })
  //new Graph
})

export const nodes = t.router({
  searchForDatasets: t.procedure
    .input(z.object({
      query: z.string(),
      take: z.number().optional().default(30)
    })).query(async ({ input }) => {
      let x: DatasetInfo[] = await searchDatasets(input.query, input.take)
      return x
    }),

  searchForModels: t.procedure
    .input(z.object({
      query: z.string(),
      take: z.number().optional().default(30)
    })).query(async ({ input }) => {
      let x: ModelInfo[] = await searchModels(input.query, input.take)
      return x
    }),

  newModelNode: t.procedure
    .input(z.object({
      modelInfo: z.any(),
      graphId: z.string(),
      position: z.object({
        x: z.number(),
        y: z.number()
      })
    })).mutation(async ({ input }) => {
      let x: APINode = await createModelNode(
        input.modelInfo,
        input.graphId,
        input.position
      )

      return x
    }),
  newDatasetNode: t.procedure
    .input(z.object({
      datasetInfo: z.any(),
      graphId: z.string(),
      position: z.object({
        x: z.number(),
        y: z.number()
      })
    })).mutation(async ({ input }) => {
      let x: APINode = await createDatasetNode(
        input.datasetInfo,
        input.graphId,
        input.position
      )

      return x
    }),

  deleteDatasetNode: t.procedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await db.delete(node)
    }),
  deleteModelNode: t.procedure
    .input(z.string())
    .mutation(async ({ input }) => {
      let x = await db.delete(node).where(eq(node.id, input)).returning()

      if (x.length === 0) throw new Error("could not delete node")
      return x
    })

})

export const edges = t.router({
  newEdge: t.procedure
    .input(z.object({
      //TODO: im way too lazy to zod type these, can just do this later
      sourceNodeId: z.string(),
      targetNodeId: z.string(),
      sourceFeatureId: z.string(),
      targetFeatureId: z.string(),
      graphId: z.string()

    })).mutation(async ({ input }) => {

      let x: APIEdge = await createEdge(input.sourceNodeId, input.targetNodeId, input.sourceFeatureId, input.targetFeatureId, input.graphId)

      return x;

    }),
  deleteEdge: t.procedure
    .input(z.object({
      sourceFeatureId: z.string(),
      targetFeatureId: z.string(),
    })).mutation(async ({ input }) => {
      let x = await db.delete(edge).where(
        and(
          eq(edge.sourceFeatureId, input.sourceFeatureId),
          eq(edge.targetFeatureId, input.targetFeatureId)
        ))
      return x
    })
})




export const router = t.router({
  graphs,
  nodes,
  edges

});



export const createCaller = t.createCallerFactory(router);

export type Router = typeof router;
// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
