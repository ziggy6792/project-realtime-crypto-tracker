import { setupServer } from './server';
import { appRouter } from './app-router';

setupServer();

export type AppRouter = typeof appRouter;
