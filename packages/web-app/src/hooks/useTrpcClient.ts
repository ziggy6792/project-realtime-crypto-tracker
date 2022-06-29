import { useState } from 'react';
import { wsLink, createWSClient } from '@trpc/client/links/wsLink';
import superjson from 'superjson';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpLink } from '@trpc/client/links/httpLink';
import { splitLink } from '@trpc/client/links/splitLink';
import { trpc } from 'src/trpc';

export const useTrpcClient = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        // call subscriptions through websockets and the rest over http
        loggerLink({ enabled: () => true }),
        splitLink({
          condition(op) {
            return op.type === 'subscription';
          },
          true: wsLink({
            client: createWSClient({
              url: process.env.REACT_APP_API_GSG_INTERNAL_WS_URL,
            }),
          }),
          false: httpLink({
            url: process.env.REACT_APP_API_GSG_INTERNAL_URL,
          }),
        }),
      ],
      transformer: superjson,
    })
  );
  return trpcClient;
};
