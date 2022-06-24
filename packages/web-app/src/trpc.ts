import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '@gsg-code-assignment/api-server';

export const trpc = createReactQueryHooks<AppRouter>();
