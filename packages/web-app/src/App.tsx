import React, { Suspense, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { wsLink, createWSClient } from '@trpc/client/links/wsLink';
import superjson from 'superjson';
import { trpc } from './trpc';
import { HistoricalPrice } from './components/historical-price';

const client = new QueryClient();

// ToDo infer this later
export type FromSymbol = 'BTC' | 'ETH';

export type ToSymbol = 'USD';

export interface Price {
  fromSymbol: FromSymbol;
  toSymbol: ToSymbol;
  ammount: number;
}

type PriceDisaplay = { [key in FromSymbol]: Price };

const priceDisaplayOrder: FromSymbol[] = ['BTC', 'ETH'];

const AppContent: React.FC = () => {
  const [realtimePrices, setRealtimePrices] = useState<PriceDisaplay>({} as PriceDisaplay);

  trpc.useSubscription(['onUpdatePrice'], {
    onNext(data) {
      setRealtimePrices((currVal) => ({ ...currVal, [data.fromSymbol]: data }));
    },
  });

  return (
    <div>
      {priceDisaplayOrder.map((fromSymbol) => (
        <div key={fromSymbol}>
          {realtimePrices[fromSymbol] && <div>{`${fromSymbol} ${realtimePrices[fromSymbol].ammount} ${realtimePrices[fromSymbol].toSymbol}`}</div>}
        </div>
      ))}

      {priceDisaplayOrder.map((fromSymbol) => (
        <HistoricalPrice fromSymbol={fromSymbol} />
      ))}
    </div>
  );
};

const wsClient = createWSClient({
  url: `ws://localhost:3001`,
});

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:8080/trpc',
      links: [
        wsLink({
          client: wsClient,
        }),
      ],
      transformer: superjson,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
