/* eslint-disable no-restricted-imports */
import * as cryptocompareService from 'src/services/cryptocompare-api';
import { getHisoricalDataRequestValidator } from 'src/validators';
import { getHisoricalDataResponseToHistoricalPrices } from 'src/utils/mapper-util';
import { createRouter } from 'src/createRouter';

export const historicalPriceRouter = createRouter().query('getHistoricalPrice', {
  input: getHisoricalDataRequestValidator,
  async resolve({ input }) {
    const apiResponse = await cryptocompareService.getHisoricalData(input);
    const historicalPrices = getHisoricalDataResponseToHistoricalPrices(apiResponse, input.fromSymbol, input.toSymbol);
    return historicalPrices;
  },
});
