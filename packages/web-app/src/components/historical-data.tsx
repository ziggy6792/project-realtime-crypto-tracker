import React, { Suspense } from 'react';

import { trpc } from 'src/trpc';

// ToDo infer this later
export type FromSymbol = 'BTC' | 'ETH';

interface IHistoricalPriceProps {
  fromSymbol: FromSymbol;
}

const HistoricalPriceChart: React.FC<IHistoricalPriceProps> = ({ fromSymbol }) => {
  const getHistoricalPrice = trpc.useQuery(['getHistoricalPrice', { fromSymbol, toSymbol: 'USD' }], { suspense: true });

  return <div>{JSON.stringify(getHistoricalPrice.data)}</div>;
};

export const HistoricalPrice: React.FC<IHistoricalPriceProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HistoricalPriceChart {...props}></HistoricalPriceChart>
  </Suspense>
);
