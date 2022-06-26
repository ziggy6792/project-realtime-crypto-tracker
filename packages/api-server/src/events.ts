import { EventEmitter } from 'ws';
// import { PriceUpdate } from './connection';

// create a global event emitter (could be replaced by redis, etc)
// export const ee = new EventEmitter();

// export const createUpdateFunction = (emit: trpc.SubscriptionEmit<Price>) => (data: Price) => {
//   // emit data to client
//   emit.data(data);
// };

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

interface MyEvents {
  updatePrice: (data: Price) => void;
  add: (data: any) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface MyEventEmitter {
  on<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  off<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  once<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  emit<U extends keyof MyEvents>(event: U, ...args: Parameters<MyEvents[U]>): boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyEventEmitter extends EventEmitter {}

export const ee = new MyEventEmitter();
