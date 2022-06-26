import React, { Suspense, useMemo } from 'react';

import { trpc } from 'src/trpc';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format } from 'date-fns';
import _ from 'lodash';

// ToDo infer this later
export type FromSymbol = 'BTC' | 'ETH';

interface IHistoricalPriceProps {
  fromSymbol: FromSymbol;
}

// const data: any[] | undefined = [];

// const rand = 300;
// for (let i = 0; i < 7; i++) {
//   const d = {
//     year: 2000 + i,
//     value: Math.random() * (rand + 50) + 100,
//   };

//   data.push(d);
// }

const HistoricalPriceChart: React.FC<IHistoricalPriceProps> = ({ fromSymbol }) => {
  const getHistoricalPrice = trpc.useQuery(['getHistoricalPrice', { fromSymbol, toSymbol: 'USD' }], { suspense: true });

  const { data } = getHistoricalPrice;

  const chartData = useMemo(() => {
    if (data) {
      return data.map(({ price, date }) => ({ hour: format(date, 'HH:mm'), price: price.ammount }));
    }
    return [];
  }, [data]);

  return (
    <LineChart width={1200} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 30 }}>
      <Line type='monotone' dataKey='price' stroke='#8884d8' dot={false} />
      <XAxis dataKey='hour' />
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      <YAxis dataKey='price' type='number' domain={['dataMin', 'dataMax']} tickCount={3} tickFormatter={(tick) => tick.toLocaleString()} />
    </LineChart>
  );
};

export const HistoricalPrice: React.FC<IHistoricalPriceProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HistoricalPriceChart {...props}></HistoricalPriceChart>
  </Suspense>
);