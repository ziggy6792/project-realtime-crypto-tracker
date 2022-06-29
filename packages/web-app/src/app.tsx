import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
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
