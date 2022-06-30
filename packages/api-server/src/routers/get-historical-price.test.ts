// /* eslint-disable no-useless-escape */
// import * as cryptocompareApi from 'src/services/cryptocompare-api';
// import { appRouter } from 'src/app-router';

// const mockResponse = {
//   Response: 'Success',
//   Message: '',
//   HasWarning: false,
//   Type: 100,
//   RateLimit: {},
//   Data: {
//     Aggregated: false,
//     TimeFrom: 1656475200,
//     TimeTo: 1656561600,
//     Data: [
//       {
//         time: 1656475200,
//         high: 20335.62,
//         low: 20227.11,
//         open: 20268.71,
//         volumefrom: 1062.13,
//         volumeto: 21543715.45,
//         close: 20280.03,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656478800,
//         high: 20321.59,
//         low: 20043.53,
//         open: 20280.03,
//         volumefrom: 1784.47,
//         volumeto: 36002282.72,
//         close: 20151.19,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656482400,
//         high: 20181.44,
//         low: 19893.19,
//         open: 20151.19,
//         volumefrom: 2892.3,
//         volumeto: 57849759.05,
//         close: 19917.77,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656486000,
//         high: 20092.99,
//         low: 19879.37,
//         open: 19917.77,
//         volumefrom: 1635.11,
//         volumeto: 32690399.32,
//         close: 20065.42,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656489600,
//         high: 20118.51,
//         low: 19941.34,
//         open: 20065.42,
//         volumefrom: 1075.99,
//         volumeto: 21565107.52,
//         close: 19963.63,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656493200,
//         high: 20198.25,
//         low: 19946.29,
//         open: 19963.63,
//         volumefrom: 1390.6,
//         volumeto: 27930775.35,
//         close: 20039.98,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656496800,
//         high: 20115.25,
//         low: 20007.06,
//         open: 20039.98,
//         volumefrom: 1252.08,
//         volumeto: 25120288.46,
//         close: 20074.38,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656500400,
//         high: 20091.28,
//         low: 19844.86,
//         open: 20074.38,
//         volumefrom: 2431.65,
//         volumeto: 48601862.67,
//         close: 20080.26,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656504000,
//         high: 20151.04,
//         low: 19957.36,
//         open: 20080.26,
//         volumefrom: 2174.14,
//         volumeto: 43587300.72,
//         close: 19988.38,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656507600,
//         high: 20111.72,
//         low: 19869.24,
//         open: 19988.38,
//         volumefrom: 2697.84,
//         volumeto: 54019278.23,
//         close: 20057.03,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656511200,
//         high: 20153.3,
//         low: 20018.54,
//         open: 20057.03,
//         volumefrom: 2581.37,
//         volumeto: 51864908.71,
//         close: 20103.41,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656514800,
//         high: 20115.13,
//         low: 19976.88,
//         open: 20103.41,
//         volumefrom: 1290.53,
//         volumeto: 25874170.44,
//         close: 20061.37,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656518400,
//         high: 20080.39,
//         low: 19935.98,
//         open: 20061.37,
//         volumefrom: 1545.23,
//         volumeto: 30903646,
//         close: 19997.43,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656522000,
//         high: 20052.51,
//         low: 19908.45,
//         open: 19997.43,
//         volumefrom: 1336.34,
//         volumeto: 26696388.76,
//         close: 20052.51,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656525600,
//         high: 20093.35,
//         low: 20014.4,
//         open: 20052.51,
//         volumefrom: 1099.03,
//         volumeto: 22048854.37,
//         close: 20030.43,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656529200,
//         high: 20223.04,
//         low: 20012.71,
//         open: 20030.43,
//         volumefrom: 1538.74,
//         volumeto: 30956522.16,
//         close: 20198.06,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656532800,
//         high: 20402.7,
//         low: 20102.94,
//         open: 20198.06,
//         volumefrom: 2265.61,
//         volumeto: 45889674.61,
//         close: 20194.72,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656536400,
//         high: 20326.72,
//         low: 20171.18,
//         open: 20194.72,
//         volumefrom: 935.1,
//         volumeto: 18947661.14,
//         close: 20277.59,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656540000,
//         high: 20303.46,
//         low: 20132.24,
//         open: 20277.59,
//         volumefrom: 940.05,
//         volumeto: 18990347.42,
//         close: 20194.52,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656543600,
//         high: 20196.31,
//         low: 20031.78,
//         open: 20194.52,
//         volumefrom: 1141.71,
//         volumeto: 22938853.3,
//         close: 20094.16,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656547200,
//         high: 20138.96,
//         low: 19992.14,
//         open: 20094.16,
//         volumefrom: 1462.59,
//         volumeto: 29344655.26,
//         close: 20016.12,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656550800,
//         high: 20060.34,
//         low: 19931.72,
//         open: 20016.12,
//         volumefrom: 1113.39,
//         volumeto: 22269997.4,
//         close: 19998.3,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656554400,
//         high: 20096.65,
//         low: 19986.15,
//         open: 19998.3,
//         volumefrom: 749.04,
//         volumeto: 15018367.55,
//         close: 20059.8,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656558000,
//         high: 20074.39,
//         low: 20024.04,
//         open: 20059.8,
//         volumefrom: 720.34,
//         volumeto: 14439653.66,
//         close: 20051.91,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//       {
//         time: 1656561600,
//         high: 20065.23,
//         low: 20023.51,
//         open: 20051.91,
//         volumefrom: 460.37,
//         volumeto: 9227687.52,
//         close: 20045.62,
//         conversionType: 'direct',
//         conversionSymbol: '',
//       },
//     ],
//   },
// };

// const expectedResponse = [
//   {
//     date: new Date('2022-06-29T04:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20268.71 },
//   },
//   {
//     date: new Date('2022-06-29T05:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20280.03 },
//   },
//   {
//     date: new Date('2022-06-29T06:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20151.19 },
//   },
//   {
//     date: new Date('2022-06-29T07:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 19917.77 },
//   },
//   {
//     date: new Date('2022-06-29T08:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20065.42 },
//   },
//   {
//     date: new Date('2022-06-29T09:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 19963.63 },
//   },
//   {
//     date: new Date('2022-06-29T10:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20039.98 },
//   },
//   {
//     date: new Date('2022-06-29T11:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20074.38 },
//   },
//   {
//     date: new Date('2022-06-29T12:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20080.26 },
//   },
//   {
//     date: new Date('2022-06-29T13:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 19988.38 },
//   },
//   {
//     date: new Date('2022-06-29T14:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20057.03 },
//   },
//   {
//     date: new Date('2022-06-29T15:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20103.41 },
//   },
//   {
//     date: new Date('2022-06-29T16:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20061.37 },
//   },
//   {
//     date: new Date('2022-06-29T17:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 19997.43 },
//   },
//   {
//     date: new Date('2022-06-29T18:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20052.51 },
//   },
//   {
//     date: new Date('2022-06-29T19:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20030.43 },
//   },
//   {
//     date: new Date('2022-06-29T20:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20198.06 },
//   },
//   {
//     date: new Date('2022-06-29T21:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20194.72 },
//   },
//   {
//     date: new Date('2022-06-29T22:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20277.59 },
//   },
//   {
//     date: new Date('2022-06-29T23:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20194.52 },
//   },
//   {
//     date: new Date('2022-06-30T00:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20094.16 },
//   },
//   {
//     date: new Date('2022-06-30T01:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20016.12 },
//   },
//   {
//     date: new Date('2022-06-30T02:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 19998.3 },
//   },
//   {
//     date: new Date('2022-06-30T03:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20059.8 },
//   },
//   {
//     date: new Date('2022-06-30T04:00:00.000Z'),
//     price: { fromSymbol: 'ETH', toSymbol: 'USD', ammount: 20051.91 },
//   },
// ];

// const testCaller = appRouter.createCaller({});

// const mockValdInput = { fromSymbol: 'ETH', toSymbol: 'USD' } as cryptocompareApi.GetHisoricalDataRequest;

// beforeEach(() => {
//   jest.clearAllMocks();
// });

// describe('App Router', () => {
//   it('getHistoricalPrice gets historical price', async () => {
//     const mockGetHisoricalData = jest.spyOn(cryptocompareApi, 'getHisoricalData').mockResolvedValue(mockResponse);

//     const actualResponse = await testCaller.query('getHistoricalPrice', mockValdInput);
//     expect(mockGetHisoricalData).toHaveBeenLastCalledWith(mockValdInput);
//     expect(actualResponse).toEqual(expectedResponse);
//   });

//   it('getHistoricalPrice does not accept invalid input', async () => {
//     const sendInvalidInput = async () => {
//       await testCaller.query('getHistoricalPrice', { fromSymbol: 'ETH', toSymbol: 'NOOPE' } as any);
//     };
//     await expect(sendInvalidInput()).rejects.toThrow(`Invalid enum value. Expected 'USD', received 'NOOPE'`);
//   });

//   // This test is a bit useless. Really I should call over rest and assert that I get a 500
//   // Trpc does map this error for a 500 response for me
//   it('getHistoricalPrice throws error if the downstream service does', async () => {
//     jest.spyOn(cryptocompareApi, 'getHisoricalData').mockRejectedValue('downstream service error');
//     const callService = async () => {
//       await testCaller.query('getHistoricalPrice', mockValdInput);
//     };
//     await expect(callService()).rejects.toThrow(`downstream service error`);
//   });
// });

export {};
