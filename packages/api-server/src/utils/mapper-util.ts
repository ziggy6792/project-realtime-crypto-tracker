import { PriceUpdateWsEvent } from 'src/services/cryptocompare-ws';
import { HistoricalPrice } from 'src/domain-models/historical-price';
import { FromSymbol, Price, ToSymbol } from 'src/domain-models/price';
import { GetHisoricalDataResponse } from 'src/services/cryptocompare-api';

export const getHisoricalDataResponseToHistoricalPrices = (
  apiResponse: GetHisoricalDataResponse,
  fromSymbol: FromSymbol,
  toSymbol: ToSymbol
): HistoricalPrice[] => {
  if (apiResponse?.Data?.Data) {
    return apiResponse.Data.Data.map((data) => ({
      date: new Date(data.time * 1000),
      price: {
        fromSymbol,
        toSymbol,
        ammount: data.open,
      },
    }));
  }
  return [];
};

export const priceUpdateWsEventToPrice = (wsEvent: PriceUpdateWsEvent) =>
  ({ fromSymbol: wsEvent.FROMSYMBOL, toSymbol: wsEvent.TOSYMBOL, ammount: wsEvent.PRICE } as Price);
