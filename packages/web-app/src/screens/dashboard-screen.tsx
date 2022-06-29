import React, { useState } from 'react';
import { FromSymbol, Price } from '@gsg-code-assignment/api-server';
import { trpc } from 'src/trpc';
import { HistoricalPrice } from 'src/components/historical-price';

type PriceDisaplay = { [key in FromSymbol]: Price };

const priceDisaplayOrder: FromSymbol[] = ['BTC', 'ETH'];

const DashboardSceeen: React.FC = () => {
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

export default DashboardSceeen;
