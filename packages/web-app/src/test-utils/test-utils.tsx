/* eslint-disable no-lone-blocks */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
import { useTrpcClient } from 'src/hooks/useTrpcClient';
import { trpc } from 'src/trpc';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { splitLink } from '@trpc/client/links/splitLink';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import { httpLink } from '@trpc/client/links/httpLink';
import superjson from 'superjson';

type IRenderWithApiOptions = Omit<RenderOptions, 'queries'> & {
  queryClientConfig?: QueryClientConfig;
};

export const renderWithAllProviders = (ui: React.ReactElement, customOptions: IRenderWithApiOptions = {}) => {
  const { queryClientConfig = {}, ...renderOptions } = customOptions;

  const client = new QueryClient(queryClientConfig);

  const AllTheProviders: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    // It would be nice it Trpc made a mock provider, instead I used the real client and mock the rest/ws requests/responses
    const trpcClient = trpc.createClient({
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
    });

    return (
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </trpc.Provider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};
