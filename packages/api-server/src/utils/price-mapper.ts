import { HistoricalPrice } from 'src/domain-models/historical-price';
import { FromSymbol, ToSymbol } from 'src/domain-models/price';
import { GetHisoricalDataResponse } from 'src/services/cryptocompare-service';

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
        price: data.open,
      },
    }));
  }
  return [];
};
