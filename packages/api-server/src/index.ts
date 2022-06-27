import { setupServer } from './server';
import { appRouter } from './app-router';

export type { Price, FromSymbol } from './domain-models/price';

setupServer();

export type AppRouter = typeof appRouter;
