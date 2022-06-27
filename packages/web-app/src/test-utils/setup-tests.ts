/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// For async tests
import 'regenerator-runtime/runtime';
import { WebSocket, Server } from 'mock-socket';

require('jest-fetch-mock').enableMocks();

process.env.REACT_APP_API_GSG_INTERNAL_URL = 'http://mock/api';
process.env.REACT_APP_API_GSG_INTERNAL_WS_URL = 'ws://localhost:1234';

/*
 * By default the global WebSocket object is stubbed out when
 * a new Server instance is created and is restored when you stop
 * the server.
 * However, you can disable this behavior by passing `mock: false`
 * to the options and manually mock the socket when you need it.
 */
// const server = new Server(process.env.REACT_APP_API_GSG_INTERNAL_WS_URL, { mock: true });

// server.on('connection', (socket) => {
//   console.log('connection');
//   socket.on('message', (bla) => {
//     console.log('message', bla);
//     server.emit('onUpdatePrice', { id: 4, result: { type: 'data', data: { json: { fromSymbol: 'BTC', toSymbol: 'USD', ammount: 20701.07 } } } });
//     return { id: 4, result: { type: 'data', data: { json: { fromSymbol: 'BTC', toSymbol: 'USD', ammount: 20701.07 } } } };
//     // socket.send(
//     //   JSON.stringify({
//     //     result: {
//     //       type: 'started',
//     //     },
//     //     elapsedMs: 11,
//     //     context: {},
//     //   })
//     // );
//     // socket.send(JSON.stringify({ id: 4, result: { type: 'data', data: { json: { fromSymbol: 'BTC', toSymbol: 'USD', ammount: 20701.07 } } } }));
//   });
//   socket.send(JSON.stringify({ id: 4, result: { type: 'data', data: { json: { fromSymbol: 'BTC', toSymbol: 'USD', ammount: 20701.07 } } } }));

//   socket.on('close', () => {});

// });

// window.WebSocket = WebSocket; // Here we stub out the window object
