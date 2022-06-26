import { z } from 'zod';

export const getHisoricalDataValidator = z.object({
  fromSymbol: z.enum(['BTC', 'ETH']),
  toSymbol: z.enum(['USD']),
});
