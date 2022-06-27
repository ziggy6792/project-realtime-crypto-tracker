/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { setupServer } from './server';
import { appRouter } from './app-router';

export type { Price, FromSymbol } from './domain-models/price';

export type AppRouter = typeof appRouter;

setupServer();
