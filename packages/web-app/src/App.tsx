import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { wsLink, createWSClient } from '@trpc/client/links/wsLink';
import { trpc } from './trpc';

const client = new QueryClient();

// ToDo infer this later
enum FromSymbol {
  BTC = 'BTC',
  ETH = 'ETH',
}

enum ToSymbol {
  USD = 'USD',
}

export interface Price {
  fromSymbol: FromSymbol;
  toSymbol: ToSymbol;
  price: number;
}

type PriceDisaplay = { [key in FromSymbol]: Price };

const priceDisaplayOrder = [FromSymbol.BTC, FromSymbol.ETH];

const AppContent = () => {
  const getMessages = trpc.useQuery(['getMessages']);

  const [realtimePrices, setRealtimePrices] = useState<PriceDisaplay>({} as PriceDisaplay);

  trpc.useSubscription(['onAddMessage'], {
    onNext(data) {
      // setNewMessage(data);
      console.log('data', data);
    },
  });

  trpc.useSubscription(['onUpdatePrice'], {
    onNext(data) {
      setRealtimePrices((currVal) => ({ ...currVal, [data.fromSymbol]: data }));
    },
  });

  return (
    <div>
      {priceDisaplayOrder.map((priceToDisplay) => (
        <div key={priceToDisplay}>
          {realtimePrices[priceToDisplay] && (
            <div>{`${priceToDisplay} ${realtimePrices[priceToDisplay].price} ${realtimePrices[priceToDisplay].toSymbol}`}</div>
          )}
        </div>
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
