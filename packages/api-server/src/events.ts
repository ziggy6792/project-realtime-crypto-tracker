import { EventEmitter } from 'ws';
import { Price } from './domain-models/price';

interface MyEvents {
  updatePrice: (data: Price) => void;
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
