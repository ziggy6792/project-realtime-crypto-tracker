import { z } from 'zod';

export const getHisoricalDataRequestValidator = z.object({
  fromSymbol: z.enum(['BTC', 'ETH']),
  toSymbol: z.enum(['USD']),
});
