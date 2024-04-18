import { fetchGraphById, fetchTestGraph } from '$lib/server/api/fetch';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { searchDatasets, searchModels } from '$lib/server/api/search';
import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import delay from 'delay';
import { z } from 'zod';
import type { Graph as APIGraph, DatasetInfo, ModelInfo } from '$lib/server/helpers/apiTypes';
import { createEdge } from '$lib/server/api/upsert/edge';

export const t = initTRPC.context<Context>().create();

export const graph = t.router({
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

export const node = t.router({
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
})

export const edge = t.router({
  newEdge: t.procedure
    .input(z.object({
    //TODO: im way too lazy to zod type these, can just do this later
      sourceNode: z.any(),
      targetNode: z.any(),
      sourceFeature: z.any(),
      targetFeature: z.any(),
      graphId: z.any()

    })).mutation(async ({ input }) => {

      let x = await createEdge(input.sourceNode, input.targetNode, input.sourceFeature, input.targetFeature, input.graphId)
      
      return x;
    })
})




export const router = t.router({

  graph,
  node

});



export const createCaller = t.createCallerFactory(router);

export type Router = typeof router;
// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
