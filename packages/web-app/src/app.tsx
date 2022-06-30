import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { trpc } from './trpc';
import DashboardSceeen from './screens/dashboard-screen';
import { useTrpcClient } from './hooks/useTrpcClient';

const client = new QueryClient();

interface IErrorFallbackProps {
  error: Error;
}

const ErrorFallback: React.FC<IErrorFallbackProps> = ({ error }) => <div>{JSON.stringify(error)}</div>;

const App = () => {
  const trpcClient = useTrpcClient();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>
          <DashboardSceeen />
        </QueryClientProvider>
      </trpc.Provider>
    </ErrorBoundary>
  );
};

export default App;
