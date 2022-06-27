import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import superjson from 'superjson';
import { closeConnection, setupConnection } from './services/cryptocompare-ws';
import { ee } from './events';

import * as cryptocompareService from './services/cryptocompare-api';
import { getHisoricalDataValidator } from './validators/validators';
import { Price } from './domain-models/price';
import { getHisoricalDataResponseToHistoricalPrices } from './utils/mapper-util';

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .subscription('onUpdatePrice', {
    resolve({ ctx }) {
      // `resolve()` is triggered for each client when they start subscribing `onAdd`

      // return a `Subscription` with a callback which is triggered immediately
      return new trpc.Subscription<Price>((emit) => {
        const onUpdate = (data: Price) => emit.data(data);

        // trigger `onAdd()` when `add` is triggered in our event emitter
        ee.on('updatePrice', onUpdate);

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off('updatePrice', onUpdate);
        };
      });
    },
  })
  .query('getHistoricalPrice', {
    input: getHisoricalDataValidator,
    async resolve({ input }) {
      const apiResponse = await cryptocompareService.getHisoricalData(input);
      const historicalPrices = getHisoricalDataResponseToHistoricalPrices(apiResponse, input.fromSymbol, input.toSymbol);
      return historicalPrices;
    },
  });
