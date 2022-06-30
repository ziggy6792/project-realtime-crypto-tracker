/* eslint-disable no-restricted-imports */
import * as trpc from '@trpc/server';
import { ee } from 'src/utils/event-emiter';
import { Price } from 'src/domain-models/price';
import { createRouter } from 'src/createRouter';

export const updatePriceRouter = createRouter().subscription('onUpdatePrice', {
  resolve() {
    // `resolve()` is triggered for each client when they start subscribing `onUpdatePrice`

    // return a `Subscription` with a callback which is triggered immediately
    return new trpc.Subscription<Price>((emit) => {
      const onUpdate = (data: Price) => emit.data(data);

      // trigger `onUpdate()` when `updatePrice` is triggered in our event emitter
      ee.on('updatePrice', onUpdate);

      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('updatePrice', onUpdate);
      };
    });
  },
});
