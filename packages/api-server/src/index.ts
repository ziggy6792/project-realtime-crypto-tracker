import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { closeConnection, setupConnection } from './connection';
import { ee } from './events';

import * as cryptocompareService from './services/cryptocompare-service';
import { getHisoricalDataValidator } from './validators/validators';
import { Price } from './domain-models/price';
import { getHisoricalDataResponseToHistoricalPrices } from './utils/price-mapper';

export const appRouter = trpc
  .router()
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

export type AppRouter = typeof appRouter;

const app = express();

const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(options));
const port = 8080;

export const createContext = () => null;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get('/', (req, res) => {
  res.send('Hello from api-server');
});

const mainServer = app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});

// Create WebSocket

const wss = new ws.Server({
  port: 3001,
});
const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on('connection', (ws) => {
  console.log(`Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`Connection (${wss.clients.size})`);
  });
});
//
console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGINT', () => {
  console.log('Got SIGINT.  Press Control-C to exit.');
  handler.broadcastReconnectNotification();
  wss.close();
  mainServer.close();
  closeConnection();
});

setupConnection();
