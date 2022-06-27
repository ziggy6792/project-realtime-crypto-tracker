import axios from 'axios';
import { getHisoricalDataRequestValidator } from 'src/validators';
import { z } from 'zod';

const cryptocompareRestApi = axios.create({ baseURL: process.env.API_CRYPTOCOMPARE_URL });

type GetHisoricalDataRequest = z.infer<typeof getHisoricalDataRequestValidator>;

export interface GetHisoricalDataResponse {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  Data: Data;
}

export interface Data {
  Aggregated: boolean;
  TimeFrom: number;
  TimeTo: number;
  Data?: DataEntity[] | null;
}
export interface DataEntity {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: string;
  conversionSymbol: string;
}

export const getHisoricalData = async ({ fromSymbol }: GetHisoricalDataRequest) => {
  const response = await cryptocompareRestApi.get('/histohour', { params: { fsym: fromSymbol, tsym: 'USD', limit: 24 } });
  return response.data as GetHisoricalDataResponse;
};
