import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { wsLink, createWSClient } from '@trpc/client/links/wsLink';
import superjson from 'superjson';
import { FromSymbol, Price } from '@gsg-code-assignment/api-server';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { trpc } from './trpc';
import { HistoricalPrice } from './components/historical-price';

const client = new QueryClient();

type PriceDisaplay = { [key in FromSymbol]: Price };

const priceDisaplayOrder: FromSymbol[] = ['BTC', 'ETH'];

const AppContent: React.FC = () => {
  const [realtimePrices, setRealtimePrices] = useState<PriceDisaplay>({} as PriceDisaplay);

  trpc.useSubscription(['onUpdatePrice'], {
    onNext(data) {
      setRealtimePrices((currVal) => ({ ...currVal, [data.fromSymbol]: data }));
    },
  });

  const getTitle = (fromSymbol: FromSymbol) => {
    if (!realtimePrices[fromSymbol]) return fromSymbol;
    return `${fromSymbol} ${realtimePrices[fromSymbol].ammount.toLocaleString()} ${realtimePrices[fromSymbol].toSymbol}`;
  };

  return (
    <div>
      {priceDisaplayOrder.map((fromSymbol) => (
        <div key={fromSymbol}>
          <h3>{getTitle(fromSymbol)}</h3>
          <HistoricalPrice fromSymbol={fromSymbol} />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: process.env.REACT_APP_API_GSG_INTERNAL_URL,
      links: [
        loggerLink({ enabled: () => true }),
        wsLink({
          client: createWSClient({
            url: process.env.REACT_APP_API_GSG_INTERNAL_WS_URL,
          }),
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
