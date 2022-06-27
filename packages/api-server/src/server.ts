import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { closeConnection, setupConnection } from './services/cryptocompare-ws';
import { appRouter } from './app-router';
import { ee } from './events';
import { Price } from './domain-models/price';
import { priceUpdateWsEventToPrice } from './utils/mapper-util';

const createContext = () => null;

export const setupServer = () => {
  const app = express();

  app.use(cors());
  const port = 8080;

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

  const expressServer = app.listen(port, () => {
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

  console.log('✅ WebSocket Server listening on ws://localhost:3001');

  setupConnection({
    onUpdatePrice: (data) => {
      ee.emit('updatePrice', priceUpdateWsEventToPrice(data));
    },
  });

  process.on('SIGINT', () => {
    console.log('Got SIGINT. Press Control-C to exit.');
    handler.broadcastReconnectNotification();
    wss.close();
    expressServer.close();
    closeConnection();
  });
};
