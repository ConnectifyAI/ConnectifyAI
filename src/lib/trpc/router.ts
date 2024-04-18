import { fetchTestGraph } from '$lib/server/api/fetch';
import { searchDatasets } from '$lib/server/api/search';
import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import delay from 'delay';
import { z } from 'zod';

export const t = initTRPC.context<Context>().create();

export const router = t.router({
  greeting: t.procedure.query(async () => {
    await delay(500); // 👈 simulate an expensive operation
    return `Hello tRPC v11 @ ${new Date().toLocaleTimeString()}`;
  }),
  something: t.procedure.
  input(z.string()).query(async ({ input }) => {
    await delay(500);
    let x = await fetchTestGraph() 

    return x
  }),
  newSomething: t.procedure
  .input(z.object({
    query: z.string(),
    take: z.number()
  })).query(async ({input}) => {
    let x = await searchDatasets(input.query, input.take)

    return x

  })

});

export const createCaller = t.createCallerFactory(router);

export type Router = typeof router;
