import superjson from 'superjson';
import { createRouter } from './create-router';
import { historicalPriceRouter } from './routers/get-historical-price';
import { updatePriceRouter } from './routers/on-update-price';

export const appRouter = createRouter()
  .query('helloWorld', {
    async resolve() {
      return 'helloWorld!';
    },
  })
  .transformer(superjson)
  .merge(historicalPriceRouter)
  .merge(updatePriceRouter);
