import React, { Suspense, useMemo } from 'react';
import { trpc } from 'src/trpc';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import { format } from 'date-fns';
import { FromSymbol } from '@gsg-code-assignment/api-server';
import _ from 'lodash';

interface IHistoricalPriceProps {
  fromSymbol: FromSymbol;
}

const HistoricalPriceChart: React.FC<IHistoricalPriceProps> = ({ fromSymbol }) => {
  const getHistoricalPrice = trpc.useQuery(['getHistoricalPrice', { fromSymbol, toSymbol: 'USD' }], { suspense: true });

  const { data, error } = getHistoricalPrice;

  const chartData = useMemo(() => {
    if (data) {
      return data.map(({ price, date }) => ({ hour: format(date, 'HH:mm'), price: price.ammount }));
    }
    return [];
  }, [data]);

  // https://github.com/recharts/recharts/issues/953#issuecomment-506772381
  const { min, max } = useMemo(
    () => ({ min: _.min(data?.map((d) => d.price.ammount)) as number, max: _.max(data?.map((d) => d.price.ammount)) as number as number }),
    [data]
  );

  if (error) return <div>{error.message}</div>;

  return (
    <LineChart width={1200} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 25, left: 60 }}>
      <Line type='monotone' dataKey='price' stroke='#8884d8' dot={false} />
      <XAxis dataKey='hour' dy={8}>
        <Label value='Hour' position='bottom' offset={10} />
      </XAxis>
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      <YAxis dataKey='price' dx={-6} type='number' domain={['dataMin', 'dataMax']} ticks={[min, max]} tickFormatter={(tick) => tick.toLocaleString()}>
        <Label value='Price in USD' position='left' angle={-90} style={{ textAnchor: 'middle' }} offset={40} />
      </YAxis>
    </LineChart>
  );
};

export const HistoricalPrice: React.FC<IHistoricalPriceProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <HistoricalPriceChart {...props}></HistoricalPriceChart>
  </Suspense>
);
