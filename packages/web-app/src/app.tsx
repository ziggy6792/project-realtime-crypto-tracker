import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { wsLink, createWSClient } from '@trpc/client/links/wsLink';
import superjson from 'superjson';
import { FromSymbol, Price } from '@gsg-code-assignment/api-server';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpLink } from '@trpc/client/links/httpLink';
import { splitLink } from '@trpc/client/links/splitLink';
import { trpc } from './trpc';
import DashboardSceeen from './screens/dashboard-screen';
import { useTrpcClient } from './hooks/useTrpcClient';

const client = new QueryClient();

const App = () => {
  const trpcClient = useTrpcClient();

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <DashboardSceeen />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
