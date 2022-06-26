export type FromSymbol = 'BTC' | 'ETH';

export type ToSymbol = 'USD';

export interface Price {
  fromSymbol: FromSymbol;
  toSymbol: ToSymbol;
  ammount: number;
}
