import * as trpc from '@trpc/server';

/**
 * Helper function to create a router, customisation can go here
 */
export function createRouter() {
  return trpc.router();
}
