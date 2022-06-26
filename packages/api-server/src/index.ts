import express from 'express';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';

import { EventEmitter } from 'events';

import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { closeConnection, PriceUpdate, setupConnection } from './connection';
import { ee } from './events';
// import { createUpdateFunction } from './events';

// create a global event emitter (could be replaced by redis, etc)
// const ee = new EventEmitter();

interface ChatMessage {
  user: string;
  message: string;
}
//
const messages: ChatMessage[] = [
  { user: 'user1', message: 'Hello' },
  { user: 'user2', message: 'Hi' },
];

export const appRouter = trpc
  .router()
  .subscription('onUpdatePrice', {
    resolve({ ctx }) {
      // `resolve()` is triggered for each client when they start subscribing `onAdd`

      // return a `Subscription` with a callback which is triggered immediately
      return new trpc.Subscription<PriceUpdate>((emit) => {
        const onUpdate = (data: PriceUpdate) => emit.data(data);

        // trigger `onAdd()` when `add` is triggered in our event emitter
        ee.on('updatePrice', onUpdate);

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off('updatePrice', onUpdate);
        };
      });
    },
  })
  .subscription('onAddMessage', {
    resolve({ ctx }) {
      // `resolve()` is triggered for each client when they start subscribing `onAdd`

      // return a `Subscription` with a callback which is triggered immediately
      return new trpc.Subscription<ChatMessage>((emit) => {
        const onAdd = (data: ChatMessage) => {
          // emit data to client
          emit.data(data);
        };

        // trigger `onAdd()` when `add` is triggered in our event emitter
        ee.on('add', onAdd);

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off('add', onAdd);
        };
      });
    },
  })
  .query('hello', {
    resolve() {
      return 'Hello world III';
    },
  })
  .query('getMessages', {
    input: z.number().default(10),
    resolve({ input }) {
      return messages.slice(-input);
    },
  })
  .mutation('addMessage', {
    input: z.object({
      user: z.string(),
      message: z.string(),
    }),
    resolve({ input }) {
      messages.push(input);
      ee.emit('add', input);
      return input;
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
