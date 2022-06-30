/* eslint-disable no-lone-blocks */
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query';
import { useTrpcClient } from 'src/hooks/useTrpcClient';
import { trpc } from 'src/trpc';

type IRenderWithApiOptions = Omit<RenderOptions, 'queries'> & {
  queryClientConfig?: QueryClientConfig;
};

export const renderWithAllProviders = (ui: React.ReactElement, customOptions: IRenderWithApiOptions = {}) => {
  const { queryClientConfig = {}, ...renderOptions } = customOptions;

  const client = new QueryClient(queryClientConfig);

  const AllTheProviders: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    // It would be nice it Trpc made a mock provider, instead I used the real client and mock the rest/ws requests/responses
    const trpcClient = useTrpcClient();

    return (
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </trpc.Provider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};
